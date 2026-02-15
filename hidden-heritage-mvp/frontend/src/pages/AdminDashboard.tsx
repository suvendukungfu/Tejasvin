import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { LayoutDashboard, Users, CreditCard, AlertCircle, CheckCircle, Trash2, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import MapPreview from '../components/MapPreview';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [payouts, setPayouts] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('http://localhost:5001/api/admin/stats');
            setStats(statsRes.data);

            const reviewsRes = await axios.get('http://localhost:5001/api/admin/reviews');
            setReviews(reviewsRes.data);

            const payoutsRes = await axios.get('http://localhost:5001/api/admin/payouts');
            setPayouts(payoutsRes.data);
        } catch (e) {
            console.error(e);
            // Mock Data
            setStats({ totalUsers: 142, totalBookings: 89, totalRevenue: 450000, pendingPayouts: 12000 });
            setPayouts([{ id: 1, guide_name: 'Rameshwar', amount: 4000, status: 'pending' }]);
            setReviews([
                { id: 1, user_name: "Rahul", site_name: "Konark Sun Temple", comment: "Amazing architecture!", rating: 5 },
                { id: 2, user_name: "Anita", site_name: "Chilika Lake", comment: "Boat ride was too expensive.", rating: 3 }
            ]);
        }
    };

    return (
        <div className="min-h-screen bg-bg-body text-white relative overflow-hidden" style={{ background: '#0F0F12' }}>
            <NavBar />
            
             {/* Background Atmosphere */}
             <div className="spatial-texture" />
             <div className="bg-charcoal-radial" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

            <main className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '8rem', paddingBottom: '4rem' }}>
                <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{ padding: '12px', background: 'rgba(200, 163, 89, 0.1)', borderRadius: '32px', color: 'var(--color-gold)' }}>
                                <LayoutDashboard size={24} />
                            </div>
                            <span style={{ fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>System Overview</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: '2.5rem', color: 'white', margin: 0 }}>Mission <span className="text-gradient-gold">Control</span></h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontSize: '0.875rem' }}>
                             <Activity size={16} /> System Operational
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard
                        title="Total Explorers"
                        value={stats?.totalUsers}
                        icon={<Users size={20} />}
                        accent="var(--color-primary)"
                    />
                    <StatCard
                        title="Expeditions"
                        value={stats?.totalBookings}
                        icon={<CheckCircle size={20} />}
                        accent="var(--color-success)"
                    />
                    <StatCard
                        title="Guild Treasury"
                        value={`₹${stats?.totalRevenue?.toLocaleString()}`}
                        icon={<TrendingUp size={20} />}
                        accent="#D4AF37"
                    />
                    <StatCard
                        title="Pending Payouts"
                        value={`₹${stats?.pendingPayouts?.toLocaleString()}`}
                        icon={<AlertCircle size={20} />}
                        accent="var(--color-warning)"
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ 
                        padding: '0', 
                        height: '400px', 
                        borderRadius: '32px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--color-success)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-success)' }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'white' }}>LIVE FIELD OPERATIONS</span>
                        </div>
                        <MapPreview sites={[
                            { id: 101, name: "Agent Alpha", latitude: 26.2183, longitude: 78.1828, type: "Survey Team", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Gwalior_Fort_view.jpg/640px-Gwalior_Fort_view.jpg" },
                            { id: 102, name: "Agent Bravo", latitude: 26.61, longitude: 78.33, type: "Restoration Crew", image_url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Bateshwar_Hindu_temples_Morena_Madhya_Pradesh_9.jpg" },
                            { id: 103, name: "Drone Unit 4", latitude: 26.43, longitude: 78.22, type: "Aerial Recon", image_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg" },
                             { id: 104, name: "Logistics Convoy", latitude: 26.20, longitude: 78.15, type: "Transport", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Teli_Ka_Mandir.jpg" }
                        ]} />
                    </div>
                </div>

                <div className="grid-12" style={{ alignItems: 'start' }}>
                    {/* Guide Payouts Section */}
                    <div style={{ gridColumn: 'span 8' }}>
                        <div className="glass-panel" style={{ 
                            padding: '0', 
                            overflow: 'hidden', 
                            background: 'rgba(255,255,255,0.03)', 
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)'
                        }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>Guide Payouts</h3>
                                <CreditCard size={18} color="rgba(255,255,255,0.5)" />
                            </div>
                            
                            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
                                    <tr style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        <th style={{ padding: '1rem', fontWeight: 500 }}>Guide</th>
                                        <th style={{ padding: '1rem', fontWeight: 500 }}>Amount</th>
                                        <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                                        <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payouts.length > 0 ? payouts.map((p, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '1rem', color: 'white' }}>{p.guide_name}</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--color-accent)' }}>₹{p.amount.toLocaleString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    background: p.status === 'pending' ? 'rgba(239, 108, 0, 0.15)' : 'rgba(46, 125, 50, 0.15)',
                                                    color: p.status === 'pending' ? 'var(--color-warning)' : 'var(--color-success)',
                                                    border: `1px solid ${p.status === 'pending' ? 'rgba(239, 108, 0, 0.3)' : 'rgba(46, 125, 50, 0.3)'}`
                                                }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button
                                                    disabled={p.status !== 'pending'}
                                                    style={{ 
                                                        fontSize: '0.75rem', padding: '6px 16px', 
                                                        background: p.status === 'pending' ? 'white' : 'transparent',
                                                        color: p.status === 'pending' ? 'black' : 'rgba(255,255,255,0.3)',
                                                        borderRadius: '4px',
                                                        border: 'none',
                                                        cursor: p.status === 'pending' ? 'pointer' : 'default',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Process
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>All caught up. No pending payouts.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Review Moderation Section */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <div className="glass-panel" style={{ 
                            padding: '0', 
                            background: 'rgba(255,255,255,0.03)', 
                            height: '100%', 
                            minHeight: '400px',
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)'
                        }}>
                             <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>Recent Intel</h3>
                                <AlertCircle size={18} color="rgba(255,255,255,0.5)" />
                            </div>
                            
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {reviews.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No fresh intel.</p>
                                ) : (
                                    reviews.map(r => (
                                        <div key={r.id} style={{
                                            padding: '1.25rem',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.02)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <div>
                                                    <strong style={{ display: 'block', color: 'var(--color-accent)', fontSize: '0.9rem' }}>{r.user_name}</strong>
                                                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{r.site_name}</span>
                                                </div>
                                                <button
                                                    style={{ color: 'var(--color-error)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                    title="Remove Review"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '2px' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} style={{ color: i < r.rating ? '#D4AF37' : 'rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>★</span>
                                                ))}
                                            </div>
                                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.5 }}>"{r.comment}"</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ title, value, icon, accent }: { title: string, value: any, icon?: React.ReactNode, accent: string }) => (
    <motion.div 
        whileHover={{ y: -8, boxShadow: `0 40px 80px -20px ${accent}22` }}
        className="glass-panel"
        style={{ 
            padding: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem', 
            borderLeft: `5px solid ${accent}`, 
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '32px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</p>
            <div style={{ color: accent }}>{icon}</div>
        </div>
        <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'white' }}>{value || 0}</h2>
    </motion.div>
);

export default AdminDashboard;
