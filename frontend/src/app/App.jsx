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
import { useMissionStore, useUserStore } from "./store";
import api from "../services/api";

import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";

export default function App() {
  const { offerMission } = useMissionStore();
  const { isAuthenticated, login, logout, setUser } = useUserStore();

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
          console.error("Auth verify failed", err);
          logout();
        }
      }
    };

    fetchUser();

    // 2. Setup Socket
    socketService.connect();

    socketService.on("mission:offered", (incident) => {
      console.log("REAL-TIME INCIDENT OFFERED:", incident);
      offerMission(incident);
    });

    return () => socketService.disconnect();
  }, [offerMission, isAuthenticated, setUser, logout]);

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
              path="/incident/:id"
              element={isAuthenticated ? <IncidentDetails /> : <Navigate to="/login" />}
            />
          </Routes>
        </PageContainer>
      </div>
    </BrowserRouter>
  );
}

