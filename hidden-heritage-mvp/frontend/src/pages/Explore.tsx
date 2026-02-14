import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, ArrowRight } from 'lucide-react';
import { getRegions } from '../services/api';

// Heritage Cinematic Assets
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

    // Parallax effect for the hero image
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

    // Motion variants for the grid
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    if (loading) {
        return (
            <div className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
                <NavBar />
                <div style={{ paddingTop: '10rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>
                    Loading regions...
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
            <NavBar />

            {/* Explore Hero Section with Cinematic Background */}
            <section style={{
                height: '80vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <motion.div 
                    style={{ position: 'absolute', inset: 0, y: yHero, zIndex: 0 }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), var(--color-bg-body))', zIndex: 1 }} />
                    <img 
                        src={gwaliorFort} 
                        alt="Gwalior Fort" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        style={{ maxWidth: '850px' }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }}></span>
                            <span style={{ 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3em', 
                                fontSize: '0.85rem', 
                                fontWeight: 800, 
                                color: 'var(--color-gold)' 
                            }}>
                                Deep Field Exploration
                            </span>
                        </div>
                        <h1 className="text-display" style={{ color: 'var(--color-charcoal)', marginBottom: '2.5rem' }}>
                            The Geography of <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}>Memory.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.7)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '640px' }}>
                            Our spatial archive is divided into curated regions, each containing thousands of years of architectural and cultural data. Choose a sector to begin your transmission.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Regions Grid */}
            <section style={{ padding: '120px 0' }}>
                <div className="container">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid-12"
                    >
                        {regions.map((region) => (
                            <motion.div 
                                key={region.id}
                                variants={itemVariants}
                                style={{ gridColumn: 'span 6', cursor: 'pointer' }}
                                onClick={() => navigate(`/region/${region.slug}`)}
                            >
                                <div style={{ 
                                    position: 'relative', 
                                    height: '400px', 
                                    borderRadius: '32px', 
                                    overflow: 'hidden',
                                    marginBottom: '2rem',
                                    boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15)'
                                }}>
                                    <img 
                                        src={region.banner_image || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200"} 
                                        alt={region.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                    <div className="glass-panel" style={{ 
                                        position: 'absolute', 
                                        bottom: '32px', 
                                        left: '32px', 
                                        padding: '16px 32px', 
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        borderRadius: '32px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.5)'
                                    }}>
                                        <MapPin size={18} color="var(--color-accent)" />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>{region.sites_count} Artifacts</span>
                                    </div>
                                </div>

                                <div style={{ padding: '0 8px' }}>
                                    <h3 className="text-h2" style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{region.name}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>{region.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        Enter Sector <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Explore;
