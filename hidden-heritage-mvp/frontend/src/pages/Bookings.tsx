import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Calendar, Eye, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTripsByUser } from '../services/api';

const Bookings = () => {
    // State for bookings
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Hardcoded user ID for MVP. In prod, get from AuthContext
                const res = await getTripsByUser(1); 
                
                // Transform backend data to UI format if needed, or use directly
                // Assuming backend returns: { id, name, total_cost, created_at, ... }
                const formatted = (res.data || []).map((trip: any) => ({
                    id: `TRIP-${trip.id.toString().padStart(3, '0')}`,
                    destination: trip.name,
                    date: new Date(trip.created_at).toLocaleDateString(),
                    amount: trip.total_cost,
                    status: 'Confirmed', // Default for now
                    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg' // Placeholder or derived from site_ids
                }));
                setBookings(formatted);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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
            
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(rgba(44, 36, 32, 0.9), rgba(44, 36, 32, 0.8)), url("https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 2rem 4rem',
                color: 'white',
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>My Bookings</h1>
                    <p style={{ fontSize: '1.2rem', color: '#FFFFFF', maxWidth: '600px', margin: '0 auto', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                        A record of your steps through time.
                    </p>
                </motion.div>
            </div>
            
            <div className="container" style={{ padding: '0 2rem 4rem' }}>


                <div className="card glass desktop-table-container" style={{ overflow: 'hidden', padding: 0, border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        {bookings.length === 0 && !loading ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                <p>No journeys recorded yet. Start your adventure today.</p>
                            </div>
                        ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                            <thead style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Destination</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Date</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Booking ID</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Amount</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Status</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <motion.tr 
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ borderBottom: '1px solid #eee' }}
                                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
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
                        )}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="mobile-bookings-list">

                    {bookings.map((booking) => (
                        <motion.div
                            key={`mobile-${booking.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card glass"
                            style={{ padding: '1.25rem', border: '1px solid rgba(255,255,255,0.6)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <img 
                                    src={booking.image} 
                                    alt={booking.destination} 
                                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} 
                                />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{booking.destination}</h3>
                                    <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                <div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Written On</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Calendar size={14} />
                                        {booking.date}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Tribute</div>
                                    <div style={{ fontWeight: 600 }}>₹{booking.amount}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <button className="btn btn-outline" style={{ flex: 1, borderRadius: '8px', padding: '0.6rem' }}>
                                    Read Scroll
                                </button>
                                {booking.status === 'Pending' && (
                                    <button className="btn btn-outline" style={{ borderRadius: '8px', padding: '0.6rem', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
                                        Annul
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookings;
