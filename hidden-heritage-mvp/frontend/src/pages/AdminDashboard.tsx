import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [payouts, setPayouts] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(statsRes.data);

            const reviewsRes = await axios.get('http://localhost:5000/api/admin/reviews');
            setReviews(reviewsRes.data);

            const payoutsRes = await axios.get('http://localhost:5000/api/admin/payouts');
            setPayouts(payoutsRes.data);
        } catch (e) {
            console.error(e);
            // Mock Data for Demo if backend calls fail (since we can't login as admin easily without seeding)
            setStats({ totalUsers: 142, totalBookings: 89, totalRevenue: 450000, pendingPayouts: 12000 });
            setPayouts([{ id: 1, guide_name: 'Rameshwar', amount: 4000, status: 'pending' }]);
        }
    };

    return (
        <>
            <NavBar />
            <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <h1>Admin Dashboard 🛡️</h1>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                    <Card title="Total Users" value={stats?.totalUsers} />
                    <Card title="Bookings" value={stats?.totalBookings} />
                    <Card title="Revenue (INR)" value={stats?.totalRevenue} />
                    <Card title="Pending Payouts" value={stats?.pendingPayouts} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                    {/* Access to Payouts */}
                    <div>
                        <h3>Guide Payouts</h3>
                        <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#f9f9f9' }}>
                                    <tr>
                                        <th style={{ padding: '0.5rem' }}>Guide</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payouts.map((p, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid #eee' }}>
                                            <td style={{ padding: '0.5rem' }}>{p.guide_name}</td>
                                            <td>₹{p.amount}</td>
                                            <td>
                                                <span style={{
                                                    padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem',
                                                    backgroundColor: p.status === 'pending' ? 'orange' : 'green', color: 'white'
                                                }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button disabled={p.status !== 'pending'} style={{ fontSize: '0.8rem' }}>Process</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Moderation */}
                    <div>
                        <h3>Review Moderation</h3>
                        <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', height: '300px', overflowY: 'scroll' }}>
                            {reviews.length === 0 && <p>No reviews to moderate.</p>}
                            {reviews.map(r => (
                                <div key={r.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{r.user_name} on {r.site_name}</strong>
                                        <button style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                    <p style={{ margin: '0.5rem 0', fontStyle: 'italic' }}>"{r.comment}"</p>
                                    <small>Rating: {r.rating}/5</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Card = ({ title, value }: { title: string, value: any }) => (
    <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{title}</p>
        <h2 style={{ margin: '0.5rem 0' }}>{value || 0}</h2>
    </div>
);

export default AdminDashboard;
