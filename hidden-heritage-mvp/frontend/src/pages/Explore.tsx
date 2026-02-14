import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, ArrowRight, Layers, Compass } from 'lucide-react';
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
            style={{ background: 'var(--color-bg-body)', perspective: '2000px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.5 } }}
        >
            <NavBar />

            {/* --- HERO: DEEP FIELD --- */}
            <section style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.2), var(--color-bg-body))', zIndex: 1 }} />
                    <img src={gwaliorFort} alt="Exploration" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                     >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <Compass size={20} color="var(--color-gold)" />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                                Planetary Archive
                            </span>
                        </div>
                        <h1 className="text-display" style={{ color: 'var(--color-charcoal)', maxWidth: '800px' }}>
                            Select a <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-gold)' }}>Coordinate.</span>
                        </h1>
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

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

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
        <div style={{ gridColumn: 'span 6', perspective: '1000px', marginBottom: '64px' }}>
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
                    borderRadius: 'var(--radius-standard)', 
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: 'var(--shadow-warm)',
                    border: '1px solid rgba(255,255,255,0.8)'
                }}>
                    {/* Image Layer */}
                    <img 
                        src={region.banner_image || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200"} 
                        alt={region.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    
                    {/* Glass Overlay Layer */}
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' 
                    }} />

                    {/* Floating Content */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px', color: 'white', transform: 'translateZ(40px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', opacity: 0.8 }}>
                                    <MapPin size={16} />
                                    <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Region Sector</span>
                                </div>
                                <h3 className="text-h2" style={{ color: 'white', marginBottom: '16px' }}>{region.name}</h3>
                                <p style={{ maxWidth: '400px', opacity: 0.9, lineHeight: 1.5, fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {region.description}
                                </p>
                            </div>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                                <ArrowRight size={24} color="var(--color-charcoal)" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Data Badge */}
                    <div style={{ position: 'absolute', top: '32px', right: '32px', padding: '8px 16px', background: 'rgba(26, 26, 26, 0.4)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px', transform: 'translateZ(60px)' }}>
                          <Layers size={14} color="var(--color-gold)" />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{region.sites_count || 3} Sites</span>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default Explore;
