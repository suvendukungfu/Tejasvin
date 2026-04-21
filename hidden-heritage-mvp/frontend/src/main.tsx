import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import RegionDetail from './pages/RegionDetail';
import SiteDetail from './pages/SiteDetail';
import TripBuilder from './pages/TripBuilder';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import Pricing from './pages/Pricing';
import AntigravityPage from './pages/AntigravityPage';
import './index.css';
import 'leaflet/dist/leaflet.css';

// Admin Module Imports
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy Loaded Admin Pages
const AdminOverview = lazy(() => import('./pages/admin/Overview'));
const AdminSectors = lazy(() => import('./pages/admin/Sectors'));
const AdminMissions = lazy(() => import('./pages/admin/Missions'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminFinance = lazy(() => import('./pages/admin/Finance'));

import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const isAuth = ['/login', '/register'].includes(location.pathname);
    const showFooter = !isAdmin && !isAuth;

    return (
        <>
            <ScrollToTop />
            {children}
            {showFooter && <Footer />}
        </>
    );
};

import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/region/:slug" element={<RegionDetail />} />
                <Route path="/site/:slug" element={<SiteDetail />} />
                <Route path="/book" element={<TripBuilder />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/antigravity" element={<AntigravityPage />} />

                {/* Enterprise Admin Module (Mission Control) */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={
                        <Suspense fallback={<div className="admin-loading">Initializing HUD...</div>}>
                            <AdminOverview />
                        </Suspense>
                    } />
                    <Route path="sectors" element={
                        <Suspense fallback={<div className="admin-loading">Loading Sectors...</div>}>
                            <AdminSectors />
                        </Suspense>
                    } />
                    <Route path="missions" element={
                        <Suspense fallback={<div className="admin-loading">Syncing Missions...</div>}>
                            <AdminMissions />
                        </Suspense>
                    } />
                    <Route path="users" element={
                        <Suspense fallback={<div className="admin-loading">Accessing Registry...</div>}>
                            <AdminUsers />
                        </Suspense>
                    } />
                    <Route path="finance" element={
                        <Suspense fallback={<div className="admin-loading">Calculating Financials...</div>}>
                            <AdminFinance />
                        </Suspense>
                    } />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AuthProvider>
                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
