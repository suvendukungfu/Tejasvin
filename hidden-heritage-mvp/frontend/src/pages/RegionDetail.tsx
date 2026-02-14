import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { getSites } from '../services/api'; 
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers, Info, Box } from 'lucide-react';

// Using consistent cinematic asset for demo fallback
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
    
    // Parallax & Fade for Background
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                // Determine ID based on slug (Mock logic for demo, real app would have slug-based endpoint)
                // In a real scenario, the API would return region details + sites.
                // Here we fetch sites for a region ID. assuming mapping for MVP.
                let regionId = 1; 
                if (slug === 'chambal-valley') regionId = 1;
                if (slug === 'gwalior') regionId = 2; // Hypothetical

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
            style={{ background: 'var(--color-bg-body)', position: 'relative' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <NavBar />

             {/* --- IMMERSIVE BACKGROUND LAYER --- */}
             <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
                <motion.div style={{ height: '100%', width: '100%', y: yBg, opacity: opacityBg }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.8), rgba(10,10,10,0.4))', zIndex: 1 }} />
                    <img src={gwaliorFort} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
             </div>

            {/* --- HUD INTERFACE LAYER --- */}
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: '120px' }}>
                
                {/* HUD Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px' }}>
                    <motion.button 
                        onClick={() => navigate('/explore')}
                        whileHover={{ x: -5 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '1rem', fontWeight: 500 }}
                    >
                        <ArrowLeft size={20} /> Back to Sector Map
                    </motion.button>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 10px #00ff00' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>LIVE FEED</span>
                    </div>
                </div>

                {/* Region Title (Floating) */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '120px' }}
                >
                    <h1 className="text-display" style={{ fontSize: '6rem', color: 'white', marginBottom: '24px' }}>
                        {regionName}
                    </h1>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)' }}>
                            <Layers size={20} />
                            <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>{sites.length} Active Sites</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)' }}>
                            <Info size={20} />
                            <span style={{ fontWeight: 500 }}>Historical Density: High</span>
                        </div>
                    </div>
                </motion.div>

                {/* Site Cards (Glass HUD) */}
                <div className="grid-12">
                     <div style={{ gridColumn: 'span 12', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
                         <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>Detected Structures</span>
                     </div>

                    {sites.map((site, index) => (
                        <motion.div 
                            key={site.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ gridColumn: 'span 4' }}
                            onClick={() => navigate(`/site/${site.slug}`)}
                        >
                            <motion.div 
                                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.05)', 
                                    backdropFilter: 'blur(16px)', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '24px',
                                    padding: '32px',
                                    height: '320px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                                            <Box size={20} color="var(--color-gold)" />
                                        </div>
                                         <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>REF-{site.id.toString().padStart(3, '0')}</span>
                                    </div>
                                    <h3 className="text-h2" style={{ fontSize: '1.75rem', color: 'white', marginBottom: '12px' }}>{site.name}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {site.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Init Scan <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
            
            {/* HUD Footer Overlay */}
            <div style={{ position: 'relative', zIndex: 20 }}>
                <Footer />
            </div>

        </motion.div>
    );
};

export default RegionDetail;
