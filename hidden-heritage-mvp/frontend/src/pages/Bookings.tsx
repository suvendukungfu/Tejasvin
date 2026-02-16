import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { Calendar, Eye, MapPin, Search, Compass, Archive } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getTripsByUser } from '../services/api';

// Heritage Cinematic Assets
import archivalHero from '../assets/heritage/archival_record.png';
import mitaoliThumb from '../assets/heritage/mitaoli.png';

const Bookings = () => {
    const { user } = useAuth();
    // State for bookings
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollY } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollY, [0, 400], [0, 100]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return;

            try {
                // Dynamic user ID from AuthContext
                const res = await getTripsByUser(user.id); 
                
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
    }, [user]);

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
        <div ref={containerRef} className="min-h-screen" style={{ background: 'var(--color-spatial-bg)' }}>
            <NavBar />
            
            {/* Cinematic Hero */}
            <section style={{ height: '50vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.2), var(--color-spatial-bg))', zIndex: 1 }} />
                    <img 
                        src={archivalHero} 
                        alt="Library" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3) contrast(1.1)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <Archive size={16} color="var(--color-spatial-accent)" />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-spatial-accent)' }}>The Records Room</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--color-spatial-text)', lineHeight: 1 }}>
                            Expedition <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-spatial-accent)' }}>Log.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '120px', position: 'relative', zIndex: 20 }}>
                
                {/* Search / Filter Utility */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ 
                        background: 'rgba(255, 255, 255, 0.6)', 
                        backdropFilter: 'blur(40px)', // High blur requested
                        padding: '24px 40px', 
                        borderRadius: '100px', 
                        boxShadow: 'var(--material-shadow-float)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '64px',
                        border: '1px solid rgba(255,255,255,0.4)',
                        marginTop: '-40px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                        <Search size={20} color="var(--color-text-secondary)" />
                        <input 
                            type="text" 
                            placeholder="Search your chronicles..." 
                            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', color: 'var(--color-spatial-text)' }}
                        />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {bookings.length} JOURNEYS RECORDED
                    </div>
                </motion.div>

                {/* Bookings List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    style={{ display: 'grid', gap: '24px' }}
                >
                    {bookings.length === 0 && !loading ? (
                        <div style={{ 
                            padding: '120px 40px', 
                            textAlign: 'center', 
                            background: 'white',
                            borderRadius: '32px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px'
                        }}>
                             <div style={{ padding: '24px', background: 'rgba(200, 163, 89, 0.1)', borderRadius: '50%', color: 'var(--color-spatial-accent)' }}>
                                <Compass size={48} />
                            </div>
                            <div>
                                <h3 className="text-h2" style={{ marginBottom: '16px', fontSize: '1.5rem' }}>No journeys recorded yet.</h3>
                                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>Your path through history remains unwritten. Begin your exploration today.</p>
                            </div>
                            <button 
                                onClick={() => window.location.href = '/explore'}
                                className="btn-neural" 
                                style={{ marginTop: '24px' }}
                            >
                                Start Expedition
                            </button>
                        </div>
                    ) : (
                        bookings.map((booking) => (
                            <motion.div 
                                key={booking.id}
                                variants={itemVariants}
                                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.8)' }}
                                style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(200px, 1.5fr) 2fr 1fr auto',
                                    alignItems: 'center',
                                    gap: '40px',
                                    padding: '32px 40px',
                                    background: 'var(--material-glass)',
                                    backdropFilter: 'var(--material-blur)',
                                    borderRadius: '32px',
                                    border: 'var(--material-glass-border)',
                                    boxShadow: 'var(--material-shadow-float)',
                                    transition: 'all 0.3s var(--ease-cinema)',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Image & Title */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                                        <img src={booking.image} alt={booking.destination} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 800, color: 'var(--color-spatial-accent)', textTransform: 'uppercase', marginBottom: '8px' }}>{booking.id}</div>
                                        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-spatial-text)', fontWeight: 600 }}>{booking.destination}</h3>
                                    </div>
                                </div>

                                {/* Details */}
                                <div style={{ display: 'flex', gap: '64px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Date Inscribed</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-spatial-text)', fontWeight: 500, fontSize: '0.95rem' }}>
                                            <Calendar size={16} color="var(--color-spatial-accent)" /> {booking.date}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Locations</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-spatial-text)', fontWeight: 500, fontSize: '0.95rem' }}>
                                            <MapPin size={16} color="var(--color-spatial-accent)" /> {booking.sitesCount} Sites
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Amount */}
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-spatial-text)' }}>
                                        ₹{booking.amount.toLocaleString()}
                                    </div>
                                    <div style={{ 
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        marginTop: '8px',
                                        padding: '4px 12px', 
                                        borderRadius: '50px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.05em',
                                        background: 'rgba(34, 197, 94, 0.1)', 
                                        color: '#16a34a', 
                                        border: '1px solid rgba(34, 197, 94, 0.2)' 
                                    }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                                        {booking.status}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <motion.button 
                                        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-spatial-text)', color: 'white' }}
                                        style={{ 
                                            width: '56px', 
                                            height: '56px', 
                                            borderRadius: '50%', 
                                            background: 'rgba(0,0,0,0.03)', 
                                            border: 'none',
                                            color: 'var(--color-spatial-text)',
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
            {/* <Footer /> removed - rendered globally in Layout */}
        </div>
    );
};

export default Bookings;
