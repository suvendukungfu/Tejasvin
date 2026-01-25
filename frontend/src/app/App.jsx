import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import Dashboard from "../features/emergency/Dashboard";
import IncidentDetails from "../features/emergency/IncidentDetails";
import SOSButton from "../features/emergency/components/SOSButton";
import EmergencyOverlay from "../features/emergency/components/EmergencyOverlay";
import { useRecruiterLogic } from "../features/emergency/hooks/useRecruiterLogic";
import MissionModal from "../features/responders/components/MissionModal";
import NavigationOverlay from "../features/responders/components/NavigationOverlay";
import SuccessOverlay from "../features/responders/components/SuccessOverlay";
import OfflineBanner from "../components/feedback/OfflineBanner";
import socketService from "../services/socket";
import { useMissionStore, useUserStore, useEmergencyStore } from "./store";
import api from "../services/api";
import logger from "../utils/logger";

import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";
import ProfilePage from "../features/profile/ProfilePage";
import AdminDashboard from "../features/admin/AdminDashboard";

const VAPID_PUBLIC_KEY = "BPkSjTPzbzJQcK4_LegOuOnygUW3oT7MVcYZ4Cm5iVrn-aRc7VYd0qXkRVrC1dGfO6Jw5ptk9m586vtuT8CTvIM";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function App() {
  const { offerMission } = useMissionStore();
  const { isAuthenticated, user, logout, setUser } = useUserStore();
  const { updateResponderLocation } = useEmergencyStore();

  useRecruiterLogic(); // Active whenever Demo Mode is on

  useEffect(() => {
    // 1. Fetch User Profile if token exists but no user object
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token && !isAuthenticated) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          logger.error("Auth verify failed", err);
          logout();
        }
      }
    };

    fetchUser();

    // 2. Setup Socket
    socketService.connect();

    socketService.on("mission:offered", (incident) => {
      logger.info("REAL-TIME INCIDENT OFFERED", incident);
      offerMission(incident);
    });

    socketService.on("incident:responder_update", (data) => {
      logger.info("RESPONDER MOVING", data);
      updateResponderLocation(data);
    });

    socketService.on("incident:vitals_sync", (data) => {
      logger.info("VITALS SYNCED", data);
      // We can update the emergency store with the latest vitals
      useEmergencyStore.setState({ latestVitals: data.vitals });
    });

    // 3. Service Worker & Push
    if ('serviceWorker' in navigator && isAuthenticated) {
      const setupPush = async () => {
        try {
          const register = await navigator.serviceWorker.register('/sw.js');
          logger.info('SW Registered');

          const subscription = await register.pushManager.getSubscription();
          if (!subscription) {
            const newSubscription = await register.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
            await api.post('/auth/subscribe', newSubscription);
            logger.info('Push Subscribed');
          }
        } catch (err) {
          logger.error('Push setup failed', err);
        }
      };
      setupPush();
    }

    return () => socketService.disconnect();
  }, [offerMission, isAuthenticated, setUser, logout, updateResponderLocation]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
        <EmergencyOverlay />
        <MissionModal />
        <NavigationOverlay />
        <SuccessOverlay />
        <OfflineBanner />
        <SOSButton />
        <Navbar />
        <PageContainer>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/incident/:id"
              element={isAuthenticated ? <IncidentDetails /> : <Navigate to="/login" />}
            />
          </Routes>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

