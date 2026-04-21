import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Map, Users, Settings, LogOut, 
    TrendingUp, Shield, Database, Activity, 
    Plus, Edit3, Trash2, 
    Search as SearchIcon, Bell 
} from 'lucide-react';
import { getSites } from '../services/api';
import { useAuth } from '../context/AuthContext';

// --- Design System Tokens ---
const T = {
    bg: '#0F0E0D',
    card: 'rgba(28, 25, 23, 0.6)',
    accent: '#B08D55',
    textPrimary: '#FFFFF8',
    textSecondary: 'rgba(255, 255, 248, 0.6)',
    border: 'rgba(255, 255, 248, 0.08)',
    success: '#2D8A56',
    warning: '#D97706',
    glass: 'rgba(255, 255, 248, 0.03)',
    shadow: '0 20px 40px rgba(0,0,0,0.4)',
    radius: '16px',
};

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [sites, setSites] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getSites();
                setSites(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const navItems = [
        { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
        { id: 'missions', label: 'Active Missions', icon: Activity },
        { id: 'sites', label: 'Sector Management', icon: Map },
        { id: 'users', label: 'Explorers', icon: Users },
        { id: 'config', label: 'Interface Settings', icon: Settings },
    ];

    const stats = [
        { label: 'Total Revenue', value: '₹1.2M', delta: '+12%', icon: TrendingUp },
        { label: 'Active Sites', value: sites.length, delta: 'Verified', icon: Shield },
        { label: 'Neural Mesh', value: '99.4%', delta: 'Optimal', icon: Database },
    ];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: T.bg, 
            color: T.textPrimary,
            display: 'flex',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* --- SIDEBAR --- */}
            <aside style={{
                width: '280px',
                borderRight: `1px solid ${T.border}`,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                position: 'sticky',
                top: 0,
                height: '100vh',
                background: 'rgba(15, 14, 13, 0.8)',
                backdropFilter: 'blur(20px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield color="#1C1917" size={20} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Command</h1>
                        <span style={{ fontSize: '0.65rem', color: T.accent, fontWeight: 700 }}>HIDDEN HERITAGE</span>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button 
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: isActive ? T.glass : 'transparent',
                                    color: isActive ? T.accent : T.textSecondary,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    textAlign: 'left'
                                }}
                            >
                                <Icon size={20} />
                                <span style={{ fontWeight: isActive ? 600 : 400, fontSize: '0.9rem' }}>{item.label}</span>
                                {isActive && <motion.div layoutId="nav-indicator" style={{ marginLeft: 'auto', width: '4px', height: '16px', background: T.accent, borderRadius: '2px' }} />}
                            </button>
                        );
                    })}
                </nav>

                <button 
                    onClick={() => logout()}
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.25rem',
                        color: '#FF4D4D',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 400, fontFamily: 'serif' }}>
                            {activeTab === 'overview' ? 'Operational Overview' : 'Sector Control'}
                        </h2>
                        <p style={{ color: T.textSecondary, marginTop: '0.5rem', fontSize: '0.9rem' }}>Accessing restricted archival parameters.</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <SearchIcon size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: T.textSecondary }} />
                            <input 
                                type="text"
                                placeholder="Search archival records..."
                                style={{
                                    background: T.glass,
                                    border: `1px solid ${T.border}`,
                                    color: 'white',
                                    padding: '1rem 1rem 1rem 3.5rem',
                                    borderRadius: '100px',
                                    width: '320px',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: T.glass, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.textSecondary, cursor: 'pointer' }}>
                            <Bell size={20} />
                        </div>
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=B08D55&color=1C1917`} 
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                                {stats.map(stat => (
                                    <div key={stat.label} style={{ background: T.card, padding: '2.5rem', borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: T.glass, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.accent }}>
                                                <stat.icon size={24} />
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.delta.includes('+') ? T.success : T.textSecondary }}>{stat.delta}</span>
                                        </div>
                                        <h3 style={{ margin: '1.5rem 0 0.5rem 0', fontSize: '2.5rem', fontWeight: 500 }}>{stat.value}</h3>
                                        <p style={{ color: T.textSecondary, margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Sector Table */}
                            <section style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
                                <div style={{ padding: '2rem', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>Regional Assets</h3>
                                    <button style={{ background: T.accent, border: 'none', color: '#1C1917', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Plus size={16} /> NEW ARCHIVE
                                    </button>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: `1px solid ${T.border}`, background: 'rgba(255,255,255,0.02)' }}>
                                            <th style={{ padding: '1.5rem 2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: T.textSecondary }}>Heritage Site</th>
                                            <th style={{ padding: '1.5rem 2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: T.textSecondary }}>Safety Score</th>
                                            <th style={{ padding: '1.5rem 2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: T.textSecondary }}>Logistics Status</th>
                                            <th style={{ padding: '1.5rem 2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: T.textSecondary }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sites.map(site => (
                                            <tr key={site.id} style={{ borderBottom: `1px solid ${T.border}`, transition: 'background 0.2s' }}>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <img src={site.image_url} style={{ width: '44px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                                                        <div>
                                                            <div style={{ fontWeight: 600 }}>{site.name}</div>
                                                            <div style={{ fontSize: '0.75rem', color: T.textSecondary }}>{site.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Shield size={14} color={site.safety_score > 7 ? T.success : T.warning} />
                                                        <span style={{ fontWeight: 600 }}>{site.safety_score}/10</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '100px', background: T.glass, fontSize: '0.7rem', fontWeight: 700, color: T.accent, border: `1px solid ${T.border}` }}>
                                                        {site.status || 'ACTIVE'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        <Edit3 size={16} style={{ cursor: 'pointer', color: T.textSecondary }} />
                                                        <Trash2 size={16} style={{ cursor: 'pointer', color: 'rgba(255, 77, 77, 0.6)' }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminDashboard;
