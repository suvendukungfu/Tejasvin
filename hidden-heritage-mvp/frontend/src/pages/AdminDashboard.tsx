import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { LayoutDashboard, Users, CreditCard, AlertCircle, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [payouts, setPayouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(statsRes.data);

            const reviewsRes = await axios.get('http://localhost:5000/api/admin/reviews');
            setReviews(reviewsRes.data);

            const payoutsRes = await axios.get('http://localhost:5000/api/admin/payouts');
            setPayouts(payoutsRes.data);
        } catch (e) {
            console.error(e);
            // Mock Data for Demo
            setStats({ totalUsers: 142, totalBookings: 89, totalRevenue: 450000, pendingPayouts: 12000 });
            setPayouts([{ id: 1, guide_name: 'Rameshwar', amount: 4000, status: 'pending' }]);
            setReviews([
                { id: 1, user_name: "Rahul", site_name: "Konark Sun Temple", comment: "Amazing architecture!", rating: 5 },
                { id: 2, user_name: "Anita", site_name: "Chilika Lake", comment: "Boat ride was too expensive.", rating: 3 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            <main className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LayoutDashboard size={32} /> Admin Dashboard
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, Admin. Here's what's happening today.</p>
                </header>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <Card
                        title="Total Users"
                        value={stats?.totalUsers}
                        icon={<Users size={24} color="var(--color-primary)" />}
                    />
                    <Card
                        title="Total Bookings"
                        value={stats?.totalBookings}
                        icon={<CheckCircle size={24} color="var(--color-success)" />}
                    />
                    <Card
                        title="Total Revenue"
                        value={`₹${stats?.totalRevenue?.toLocaleString()}`}
                        icon={<CreditCard size={24} color="var(--color-warning)" />}
                    />
                    <Card
                        title="Pending Payouts"
                        value={`₹${stats?.pendingPayouts?.toLocaleString()}`}
                        icon={<AlertCircle size={24} color="var(--color-error)" />}
                    />
                </div>

                <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {/* Guide Payouts Section */}
                    <section>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={20} /> Guide Payouts
                        </h3>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid #eee' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', fontWeight: 600 }}>Guide</th>
                                            <th style={{ padding: '1rem', fontWeight: 600 }}>Amount</th>
                                            <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                            <th style={{ padding: '1rem', fontWeight: 600 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payouts.length > 0 ? payouts.map((p, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '1rem' }}>{p.guide_name}</td>
                                                <td style={{ padding: '1rem', fontWeight: 500 }}>₹{p.amount.toLocaleString()}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 500,
                                                        backgroundColor: p.status === 'pending' ? 'rgba(239, 108, 0, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                                                        color: p.status === 'pending' ? 'var(--color-warning)' : 'var(--color-success)'
                                                    }}>
                                                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <button
                                                        className="btn btn-primary"
                                                        disabled={p.status !== 'pending'}
                                                        style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', opacity: p.status !== 'pending' ? 0.5 : 1 }}
                                                    >
                                                        Process
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No pending payouts</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Review Moderation Section */}
                    <section>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} /> Review Moderation
                        </h3>
                        <div className="card" style={{ height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {reviews.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>No reviews to moderate.</p>
                            ) : (
                                reviews.map(r => (
                                    <div key={r.id} style={{
                                        padding: '1rem',
                                        border: '1px solid #eee',
                                        borderRadius: 'var(--border-radius-md)',
                                        backgroundColor: '#fff'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <div>
                                                <strong style={{ display: 'block', color: 'var(--color-primary)' }}>{r.user_name}</strong>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>on {r.site_name}</span>
                                            </div>
                                            <button
                                                style={{ color: 'var(--color-error)', padding: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                className="btn-outline"
                                            >
                                                <Trash2 size={16} /> <span style={{ fontSize: '0.8rem' }}>Delete</span>
                                            </button>
                                        </div>
                                        <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} style={{ color: i < r.rating ? '#FFC107' : '#E0E0E0', fontSize: '1.2rem' }}>★</span>
                                            ))}
                                        </div>
                                        <p style={{ margin: 0, color: 'var(--color-text-main)', fontStyle: 'italic', fontSize: '0.95rem' }}>"{r.comment}"</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

const Card = ({ title, value, icon }: { title: string, value: any, icon?: React.ReactNode }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{title}</p>
            {icon}
        </div>
        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{value || 0}</h2>
    </div>
);

export default AdminDashboard;
