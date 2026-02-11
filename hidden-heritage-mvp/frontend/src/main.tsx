import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import './index.css';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
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
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/pricing" element={<Pricing />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
