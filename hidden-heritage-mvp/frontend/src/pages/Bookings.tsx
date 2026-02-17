import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { Calendar, Eye, MapPin, Search, Compass } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getTripsByUser } from '../services/api';

const Bookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollY } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollY, [0, 400], [0, 150]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return;

            try {
                const res = await getTripsByUser(user.id); 
                const formatted = (res.data || []).map((trip: any) => {
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
                        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop", // Traveler map aesthetic
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
    }, [user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0, 0, 1] } }
    };

    return (
        <div ref={containerRef} className="min-h-screen" style={{ background: '#EAE5DB', color: '#1C1917' }}>
            <NavBar />
            
            {/* Cinematic Hero */}
            <section style={{ height: '60vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(234, 229, 219, 0.4), #EAE5DB)', zIndex: 1 }} />
                    <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
                        alt="Expedition Map" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.1)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', opacity: 0.7 }}>
                            <div style={{ width: '40px', height: '1px', background: '#1C1917' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: '#1C1917' }}>The Records Room</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', color: '#1C1917', lineHeight: 1 }}>
                            Expedition <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: '#B08D55' }}>Log.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '120px', position: 'relative', zIndex: 20, marginTop: '-100px' }}>
                
                {/* Search / Filter Utility - Glassmorphic Pill */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel"
                    style={{ 
                        padding: '1.25rem 2.5rem', 
                        borderRadius: '100px', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4rem',
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <Search size={20} color="#6D6D6D" />
                        <input 
                            type="text" 
                            placeholder="Search your chronicles..." 
                            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', color: '#1C1917' }}
                        />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#B08D55', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {bookings.length} JOURNEYS RECORDED
                    </div>
                </motion.div>

                {/* Bookings List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    style={{ display: 'grid', gap: '32px' }}
                >
                    {bookings.length === 0 && !loading ? (
                        <div style={{ 
                            padding: '6rem 2rem', 
                            textAlign: 'center', 
                            borderRadius: '32px',
                            background: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px'
                        }}>
                             <div style={{ padding: '24px', background: 'rgba(176, 141, 85, 0.1)', borderRadius: '50%', color: '#B08D55' }}>
                                <Compass size={48} />
                            </div>
                            <div>
                                <h3 className="text-h2" style={{ marginBottom: '16px', fontSize: '1.75rem', color: '#1C1917' }}>No journeys recorded yet.</h3>
                                <p style={{ color: '#6D6D6D', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>Your path through history remains unwritten. Begin your exploration today.</p>
                            </div>
                            <button 
                                onClick={() => window.location.href = '/explore'}
                                className="btn-cinema"
                                style={{ 
                                    marginTop: '24px', 
                                    background: '#1C1917', 
                                    color: 'white', 
                                    padding: '1rem 2.5rem', 
                                    borderRadius: '100px', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Start Expedition
                            </button>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <motion.div 
                                key={booking.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)' }}
                                className="glass-panel"
                                style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(200px, 1.5fr) 2fr 1fr auto',
                                    alignItems: 'center',
                                    gap: '3rem',
                                    padding: '2.5rem',
                                    background: 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '32px',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)'
                                }}
                            >
                                {/* Image & Title */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ width: '88px', height: '88px', borderRadius: '24px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 24px -4px rgba(0,0,0,0.1)' }}>
                                        <img src={booking.image} alt={booking.destination} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 800, color: '#B08D55', textTransform: 'uppercase', marginBottom: '8px' }}>{booking.id}</div>
                                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', margin: 0, color: '#1C1917', fontWeight: 500, lineHeight: 1.1 }}>{booking.destination}</h3>
                                    </div>
                                </div>

                                {/* Details */}
                                <div style={{ display: 'flex', gap: '4rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Date Inscribed</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1C1917', fontWeight: 500, fontSize: '1rem' }}>
                                            <Calendar size={18} color="#B08D55" /> {booking.date}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Locations</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1C1917', fontWeight: 500, fontSize: '1rem' }}>
                                            <MapPin size={18} color="#B08D55" /> {booking.sitesCount} Sites
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Amount */}
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#1C1917' }}>
                                        ₹{booking.amount.toLocaleString()}
                                    </div>
                                    <div style={{ 
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginTop: '8px',
                                        padding: '6px 14px', 
                                        borderRadius: '50px', 
                                        fontSize: '0.7rem', 
                                        fontWeight: 800, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.05em',
                                        background: '#F0FDF4', 
                                        color: '#166534', 
                                        border: '1px solid #BBF7D0' 
                                    }}>
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
                                        {booking.status}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <motion.button 
                                        whileHover={{ scale: 1.1, backgroundColor: '#1C1917', color: 'white' }}
                                        style={{ 
                                            width: '56px', 
                                            height: '56px', 
                                            borderRadius: '50%', 
                                            background: 'rgba(255,255,255,0.5)', 
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            color: '#1C1917',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Eye size={20} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Bookings;
