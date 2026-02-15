import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { getRegions } from '../services/api';

// Cinematic Assets
import gwaliorFort from '../assets/heritage/gwalior_fort.png';

interface Region {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner_image: string;
    sites_count?: number;
}

const Explore = () => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await getRegions();
                setRegions(response.data || []);
            } catch (error) {
                console.error('Failed to fetch regions', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    // Staggered entry for grid
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    if (loading) return <Loader />;

    return (
        <motion.div 
            ref={containerRef} 
            className="min-h-screen" 
            style={{ background: 'var(--color-spatial-bg)', perspective: '2000px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.5 } }}
        >
            <NavBar />

            {/* --- HERO: DEEP FIELD --- */}
            <section style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.4), var(--color-spatial-bg))', zIndex: 1 }} />
                    <img src={gwaliorFort} alt="Exploration" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, filter: 'grayscale(0.2)' }} />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                     >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <Compass size={20} color="var(--color-spatial-accent)" />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-spatial-accent)' }}>
                                Planetary Archive
                            </span>
                        </div>
                        <h1 className="text-display" style={{ color: 'var(--color-spatial-text)', maxWidth: '800px', marginBottom: '40px' }}>
                            Select a <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-spatial-accent)' }}>Coordinate.</span>
                        </h1>

                        {/* Floating Filter Pill */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'var(--material-glass)',
                                backdropFilter: 'blur(16px)',
                                padding: '8px 8px 8px 24px',
                                borderRadius: '100px',
                                border: 'var(--material-glass-border)',
                                boxShadow: 'var(--material-shadow-float)'
                            }}
                        >
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-spatial-text)', fontWeight: 500 }}>All Sectors</span>
                            <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.1)', margin: '0 8px' }} />
                            <button style={{ 
                                background: 'var(--color-spatial-text)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '100px', 
                                padding: '8px 20px', 
                                fontSize: '0.8rem', 
                                fontWeight: 600, 
                                cursor: 'pointer' 
                            }}>
                                FILTER
                            </button>
                        </motion.div>
                     </motion.div>
                </div>
            </section>

            {/* --- HOLOGRAPHIC GRID --- */}
            <section style={{ padding: '0 0 160px 0', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid-12"
                    >
                        {regions.map((region) => (
                            <HolographicCard key={region.id} region={region} navigate={navigate} />
                        ))}
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </motion.div>
    );
};

// --- HOLOGRAPHIC TILT CARD ---
const HolographicCard = ({ region, navigate }: { region: Region, navigate: any }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ gridColumn: 'span 6', perspective: '1200px', marginBottom: '64px' }}>
            <motion.div
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(`/region/${region.slug}`)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
            >
                <div style={{ 
                    position: 'relative', 
                    height: '500px', 
                    borderRadius: '32px', 
                    overflow: 'hidden',
                    background: 'var(--material-glass)',
                    backdropFilter: 'var(--material-blur)',
                    boxShadow: 'var(--material-shadow-float)',
                    border: 'var(--material-glass-border)'
                }}>
                    {/* Image Layer */}
                    <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
                        <img 
                            src={region.banner_image || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200"} 
                            alt={region.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                    </div>

                    {/* Content Layer (Glass) */}
                    <div style={{ 
                        padding: '32px', 
                        transform: 'translateZ(20px)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', opacity: 0.8 }}>
                                    <MapPin size={16} color="var(--color-spatial-text)" />
                                    <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-spatial-text)' }}>Region Sector</span>
                                </div>
                                <h3 className="text-h2" style={{ color: 'var(--color-spatial-text)', fontSize: '2rem', marginBottom: '12px' }}>{region.name}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5, fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {region.description}
                                </p>
                            </div>
                            
                            <motion.div 
                                whileHover={{ rotate: -45 }}
                                style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    borderRadius: '50%', 
                                    background: 'var(--color-spatial-text)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}
                            >
                                <ArrowRight size={20} color="white" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Explore;
