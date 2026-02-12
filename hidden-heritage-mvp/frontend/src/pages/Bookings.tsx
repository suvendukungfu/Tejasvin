import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Calendar, Eye, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Bookings = () => {
    // Mock Data
    const [bookings] = useState([
        {
            id: 'BK-2023-001',
            destination: 'Gwalior Fort',
            date: '2023-11-15',
            amount: 4500,
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1644903526978-0cb9947849aa?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 'BK-2024-042',
            destination: 'Mitawali & Padavali',
            date: '2024-03-20',
            amount: 3200,
            status: 'Confirmed',
            image: 'https://images.unsplash.com/photo-1596525737222-77742d069909?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 'BK-2024-055',
            destination: 'Bateshwar Temples',
            date: '2024-04-10',
            amount: 2800,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1629219663738-92f588c7f21e?q=80&w=2070&auto=format&fit=crop'
        }
    ]);

    // Helper for inline styles since we can't use tailwind status classes directly if not configured
    const getStatusStyle = (status: string) => {
        const base = { padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 500 };
        switch (status) {
            case 'Confirmed': return { ...base, backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
            case 'Pending': return { ...base, backgroundColor: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' };
            case 'Completed': return { ...base, backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' };
            case 'Cancelled': return { ...base, backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
            default: return base;
        }
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            <div className="container" style={{ padding: '3rem 2rem' }}>
                <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>My Bookings</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Track your past and upcoming journeys.</p>
                    </div>
                </header>

                <div className="card glass" style={{ overflow: 'hidden', padding: 0, border: '1px solid rgba(255,255,255,0.6)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                            <thead style={{ backgroundColor: 'rgba(93, 64, 55, 0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Destination</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Date</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Booking ID</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Amount</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Status</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <motion.tr 
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ borderBottom: '1px solid #eee' }}
                                        whileHover={{ backgroundColor: '#fafafa' }}
                                    >
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img 
                                                    src={booking.image} 
                                                    alt={booking.destination} 
                                                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} 
                                                />
                                                <span style={{ fontWeight: 500 }}>{booking.destination}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={16} />
                                                {booking.date}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                            {booking.id}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                                            ₹{booking.amount}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={getStatusStyle(booking.status)}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }} title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                {booking.status === 'Pending' && (
                                                    <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px', color: 'var(--color-error)', borderColor: 'var(--color-error)' }} title="Cancel">
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
