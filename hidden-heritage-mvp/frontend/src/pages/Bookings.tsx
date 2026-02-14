import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Calendar, Eye, MapPin, Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getTripsByUser } from '../services/api';

// Heritage Cinematic Assets
import archivalHero from '../assets/heritage/archival_record.png';
import mitaoliThumb from '../assets/heritage/mitaoli.png';

const Bookings = () => {
    // State for bookings
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 400], [0, 100]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Hardcoded user ID for MVP. In prod, get from AuthContext
                const res = await getTripsByUser(1); 
                
                const formatted = (res.data || []).map((trip: any) => {
                    // Robust JSON parsing for MySQL return values
                    let sites = [];
                    try {
                        sites = typeof trip.site_ids === 'string' ? JSON.parse(trip.site_ids) : trip.site_ids;
                    } catch (e) {
                        sites = trip.site_ids || [];
                    }

                    return {
                        id: `EXP-${trip.id.toString().padStart(4, '0')}`,
                        destination: trip.name,
                        date: new Date(trip.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
                        amount: trip.total_cost,
                        status: 'Confirmed',
                        image: mitaoliThumb, // Future: specific site image lookup
                        sitesCount: Array.isArray(sites) ? sites.length : 0
                    };
                });
                setBookings(formatted);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            {/* Cinematic Hero */}
            <section style={{ height: '45vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                    <img 
                        src={archivalHero} 
                        alt="Library" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) contrast(1.1)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }}></span>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>The Records Room</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1 }}>
                            Expedition <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Log.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '6rem', marginTop: '-4rem', position: 'relative', zIndex: 20 }}>
                
                {/* Search / Filter Utility */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ 
                        background: 'white', 
                        padding: '1.5rem 2.5rem', 
                        borderRadius: '100px', 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <Search size={20} style={{ color: 'var(--color-text-tertiary)' }} />
                        <input 
                            type="text" 
                            placeholder="Search your chronicles..." 
                            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem' }}
                        />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {bookings.length} JOURNEYS RECORDED
                    </div>
                </motion.div>

                {/* Bookings List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    style={{ display: 'grid', gap: '1.5rem' }}
                >
                    {bookings.length === 0 && !loading ? (
                        <div style={{ 
                            padding: '8rem 2rem', 
                            textAlign: 'center', 
                            background: 'white',
                            borderRadius: '32px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                             <div style={{ padding: '24px', background: 'rgba(200, 163, 89, 0.05)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                                <MapPin size={48} />
                            </div>
                            <div>
                                <h3 className="text-h3" style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>No journeys recorded yet.</h3>
                                <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto' }}>Your path through history remains unwritten. Begin your exploration today.</p>
                            </div>
                            <button 
                                onClick={() => window.location.href = '/explore'}
                                className="btn btn-primary" 
                                style={{ marginTop: '1.5rem' }}
                            >
                                Start Expedition
                            </button>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <motion.div 
                                key={booking.id}
                                variants={itemVariants}
                                className="archival-dossier"
                                style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: '1.5fr 2fr 1fr auto',
                                    alignItems: 'center',
                                    gap: '2.5rem',
                                    padding: '2rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.04)',
                                    transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Image & Title */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                                        <img src={booking.image} alt={booking.destination} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{booking.id}</div>
                                        <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', margin: 0, color: 'var(--color-primary)', fontWeight: 600 }}>{booking.destination}</h3>
                                    </div>
                                </div>

                                {/* Details */}
                                <div style={{ display: 'flex', gap: '4rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Date Inscribed</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>
                                            <Calendar size={16} style={{ color: 'var(--color-accent)' }} /> {booking.date}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Locations</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>
                                            <MapPin size={16} style={{ color: 'var(--color-accent)' }} /> {booking.sitesCount} Sites
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Amount */}
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-primary)' }}>
                                        ₹{booking.amount.toLocaleString()}
                                    </div>
                                    <div style={{ 
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        marginTop: '0.5rem',
                                        padding: '4px 12px', 
                                        borderRadius: '50px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.05em',
                                        background: 'rgba(34, 197, 94, 0.08)', 
                                        color: '#16a34a', 
                                        border: '1px solid rgba(34, 197, 94, 0.2)' 
                                    }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                                        {booking.status}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button 
                                        className="btn-icon"
                                        style={{ 
                                            width: '64px', 
                                            height: '64px', 
                                            borderRadius: '20px', 
                                            background: 'rgba(0,0,0,0.03)', 
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            color: 'var(--color-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Eye size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
             <style>{`
                .archival-dossier:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    border-color: var(--color-accent) !important;
                }
                .btn-icon:hover {
                    background: var(--color-primary) !important;
                    color: white !important;
                    border-color: var(--color-primary) !important;
                }
                @media (max-width: 1100px) {
                    .archival-dossier {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                        padding: 2.5rem !important;
                    }
                    .archival-dossier > div {
                        justify-content: flex-start !important;
                        text-align: left !important;
                    }
                    .archival-dossier > div:last-child {
                        justify-content: flex-end !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Bookings;
