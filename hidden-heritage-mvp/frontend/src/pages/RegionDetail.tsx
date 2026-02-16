import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getSites } from '../services/api'; 
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers, Info, Box } from 'lucide-react';
import gwaliorFort from '../assets/heritage/gwalior_fort.png';

interface Site {
    id: number;
    name: string;
    description: string;
    slug: string;
    images?: string[];
    thumbnail?: string;
}

const RegionDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [sites, setSites] = useState<Site[]>([]);
    const [regionName, setRegionName] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    
    // VisionOS Parallax: Gentle movement
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                // Mock logic for demo
                let regionId = 1; 
                if (slug === 'chambal-valley') regionId = 1;
                if (slug === 'gwalior') regionId = 2; 

                const response = await getSites(regionId);
                setSites(response.data || []);
                setRegionName(slug ? slug.replace('-', ' ').toUpperCase() : 'UNKNOWN SECTOR');
            } catch (error) {
                console.error('Failed to fetch sites', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSites();
    }, [slug]);

    if (loading) return <Loader />;

    return (
        <motion.div 
            ref={containerRef}
            className="min-h-screen" 
            style={{ background: 'var(--color-spatial-bg)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <NavBar />

             {/* --- 1. SPATIAL HERO BACKGROUND --- */}
             <div style={{ position: 'fixed', inset: 0, zIndex: 0, height: '100vh', width: '100vw' }}>
                <motion.div style={{ height: '100%', width: '100%', y: yHero, opacity: opacityHero }}>
                    <img src={gwaliorFort} alt="Background" style={{ width: '100%', height: '110%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(234, 229, 219, 0.3)' }} /> {/* Warm tint */}
                </motion.div>
             </div>

            {/* --- 2. FLOAT UI LAYER --- */}
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '160px', paddingBottom: '160px' }}>
                
                {/* Back Link */}
                <motion.button 
                    onClick={() => navigate('/explore')}
                    whileHover={{ x: -4 }}
                    style={{ 
                        background: 'rgba(255,255,255,0.8)', 
                        backdropFilter: 'blur(12px)',
                        padding: '12px 24px',
                        borderRadius: '100px',
                        border: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        color: 'var(--color-spatial-text)', 
                        cursor: 'pointer', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        marginBottom: '40px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
                    }}
                >
                    <ArrowLeft size={18} /> BACK TO ATLAS
                </motion.button>

                {/* Floating Title Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                    className="glass-panel"
                    style={{ 
                        padding: '64px', 
                        backdropFilter: 'blur(40px)', 
                        backgroundColor: 'rgba(255, 255, 248, 0.75)',
                        marginBottom: '80px',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-spatial-accent)', fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '24px' }}>
                        <Layers size={16} /> HERITAGE SECTOR
                    </div>
                    <h1 className="text-display" style={{ marginBottom: '32px' }}>
                        {regionName}
                    </h1>
                     <p style={{ fontSize: '1.25rem', lineHeight: 1.7, margin: '0 auto', opacity: 0.8, maxWidth: '700px' }}>
                        Enter a region where history is not just remembered, but physically felt. This sector contains high-fidelity neural scans of architectural marvels.
                    </p>

                    <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-spatial-accent)' }} />
                            <span style={{ fontWeight: 600 }}>{sites.length} Active Sites</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                            <span style={{ fontWeight: 600 }}>Live Feed</span>
                        </div>
                    </div>
                </motion.div>

                {/* Site Cards Grid */}
                <div className="grid-12">
                     <div style={{ gridColumn: 'span 12', marginBottom: '32px', paddingLeft: '8px' }}>
                         <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Available Sites</span>
                     </div>

                    {sites.map((site, index) => (
                        <motion.div 
                            key={site.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 1, ease: [0.2, 0, 0, 1] }}
                            style={{ gridColumn: 'span 4' }}
                            whileHover="hover"
                            onClick={() => navigate(`/site/${site.slug}`)}
                        >
                            <motion.div 
                                className="glass-panel"
                                style={{ 
                                    padding: '32px', 
                                    minHeight: '280px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between', 
                                    cursor: 'pointer',
                                    backgroundColor: 'rgba(255, 255, 255, 0.6)' 
                                }}
                                variants={{ hover: { transform: 'translateY(-8px) scale(1.02)' } }}
                            >
                                <div>
                                    <div style={{ marginBottom: '24px', opacity: 0.5 }}>
                                        <Box size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', lineHeight: 1.1 }}>{site.name}</h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.5, opacity: 0.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {site.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                                    <motion.div 
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        variants={{ hover: { background: 'var(--color-spatial-text)', color: 'white' } }}
                                    >
                                        <ArrowRight size={18} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
            
            <Footer />
        </motion.div>
    );
};

export default RegionDetail;
