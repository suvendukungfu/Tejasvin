import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, Clock, ArrowLeft, Shield, Sparkles, Calendar, Box, ScanLine } from 'lucide-react';
import { getSiteBySlug, getSafetyScore, getAiStory } from '../services/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import holographicGrid from '../assets/textures/holographic_grid.png';

// Heritage Cinematic Assets
import bateshwar from '../assets/heritage/bateshwar.png';
import mitaoli from '../assets/heritage/mitaoli.png';
import gwaliorFort from '../assets/heritage/gwalior_fort.png';

const SiteDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    
    const [site, setSite] = useState<any>(null);
    const [safety, setSafety] = useState<any>(null);
    const [aiStory, setAiStory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [scanning, setScanning] = useState(true); // New Scanning State

    // Parallax & Cinematic effects
    const yHero = useTransform(scrollY, [0, 800], ["0%", "40%"]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            // Initiate "Scan"
            setLoading(true);
            setScanning(true);
            
            try {
                // Determine ID based on slug (Mock logic for demo)
                // Real app would get ID from slug response
                const siteDataRes = await getSiteBySlug(slug);
                const siteData = siteDataRes.data || siteDataRes;
                setSite(siteData);

                if (siteData) {
                     const [safetyRes, storyRes] = await Promise.all([
                        getSafetyScore(siteData.id || 1),
                        getAiStory({ siteName: siteData.name, persona: 'Archaeologist', slug: siteData.slug })
                    ]);
                    setSafety(safetyRes.data || safetyRes);
                    setAiStory(storyRes.data || storyRes);
                }
            } catch (error) {
                console.error("Failed to fetch details", error);
            } finally {
                setLoading(false);
                // Artificial scan delay for effect
                setTimeout(() => setScanning(false), 800);
            }
        };

        fetchData();
    }, [slug]);

    const heroImageMap: any = {
        'bateshwar-temples': bateshwar,
        'mitaoli-temple': mitaoli,
        'gwalior-fort': gwaliorFort
    };

    const heroImage = heroImageMap[slug || ''] || site?.image_url;

    // Scan Line Animation
    const scanVariants = {
        scanning: {
            top: ["0%", "100%"],
            opacity: [0, 1, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
        }
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', background: 'var(--color-spatial-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-spatial-accent)' }}>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ScanLine size={48} />
                    <div style={{ marginTop: '16px', letterSpacing: '0.2em', fontSize: '0.8rem' }}>INITIALIZING L.I.D.A.R. SCAN</div>
                </motion.div>
            </div>
        );
    }

    if (!site) return <div>Site not found</div>;

    return (
        <div className="min-h-screen" style={{ 
            background: 'var(--color-spatial-bg)', 
            color: 'var(--color-spatial-text)',
            backgroundImage: `url(${holographicGrid})`,
            backgroundSize: '500px',
            backgroundBlendMode: 'overlay'
        }}>
            <NavBar />

            {/* --- IMMERSIVE BACKDROP (GLOBAL) --- */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, opacity: opacityHero }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.3), var(--color-spatial-bg))', zIndex: 2 }} />
                    <img src={heroImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) contrast(1.1)' }} />
                </motion.div>
            </div>

            {/* --- HUD INTERFACE --- */}
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '100px' }}>
                
                {/* HUD Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
                     <motion.button 
                        onClick={() => navigate(-1)}
                        whileHover={{ x: -5 }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-spatial-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <ArrowLeft size={20} /> <span style={{ letterSpacing: '0.1em', fontSize: '0.85rem' }}>RETURN TO SECTOR</span>
                    </motion.button>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-spatial-accent)' }}>
                             <div style={{ width: '6px', height: '6px', background: 'var(--color-spatial-accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-spatial-accent)' }} />
                             <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em' }}>DATA STREAM ACTIVE</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                            LAT: {site.latitude?.toFixed(4) || '26.7577'} • LON: {site.longitude?.toFixed(4) || '78.1729'}
                        </div>
                    </motion.div>
                </div>

                <div className="grid-12">
                    {/* Left Data Column (Technical) */}
                    <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Data Crystal: Context */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ 
                                background: 'var(--material-glass)', 
                                backdropFilter: 'var(--material-blur)', 
                                border: 'var(--material-glass-border)', 
                                borderRadius: '16px', 
                                padding: '24px' 
                            }}
                        >
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>Classification</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>{site.type || 'Heritage Site'}</div>
                        </motion.div>

                         {/* Data Crystal: Era */}
                         <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ 
                                background: 'var(--material-glass)', 
                                backdropFilter: 'var(--material-blur)', 
                                border: 'var(--material-glass-border)', 
                                borderRadius: '16px', 
                                padding: '24px' 
                            }}
                        >
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>Est. Era</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>8th - 10th Century</div>
                        </motion.div>

                        {/* Data Crystal: Safety */}
                         <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ 
                                background: 'rgba(10, 20, 10, 0.3)', 
                                backdropFilter: 'blur(20px)', 
                                border: '1px solid rgba(100, 255, 100, 0.1)', 
                                borderRadius: '16px', 
                                padding: '24px' 
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ color: '#4ADE80', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Safety Index</div>
                                <Shield size={14} color="#4ADE80" />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4ADE80' }}>
                                {safety?.score || '9.8'} <span style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.7 }}>/ 10</span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Center: Main Viewport (Crystalline) */}
                    <div style={{ gridColumn: 'span 6', position: 'relative' }}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                             <h1 className="text-display" style={{ fontSize: '4.5rem', marginBottom: '16px', textShadow: '0 10px 30px rgba(0,0,0,0.5)', color: 'var(--color-spatial-text)' }}>{site.name}</h1>
                             <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MapPin size={16} color="var(--color-spatial-accent)" /> Madhya Pradesh
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Clock size={16} color="var(--color-spatial-accent)" /> 2h 30m Access
                                </div>
                             </div>
                        </motion.div>

                        {/* Narrative Glass Slab */}
                        <motion.div 
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="glass-panel"
                            style={{ 
                                padding: '48px', 
                                background: 'var(--material-glass)', 
                                backdropFilter: 'var(--material-blur)', 
                                borderRadius: '32px',
                                border: 'var(--material-glass-border)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Scanning Overlay Effect */}
                            <motion.div 
                                style={{ 
                                    position: 'absolute', 
                                    left: 0, 
                                    right: 0, 
                                    height: '2px', 
                                    background: 'linear-gradient(to right, transparent, var(--color-spatial-accent), transparent)', 
                                    pointerEvents: 'none',
                                    zIndex: 10
                                }}
                                variants={scanVariants}
                                animate={scanning ? "scanning" : { opacity: 0 }}
                            />

                            <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', fontFamily: 'var(--font-display)', color: 'var(--color-spatial-accent)' }}>Visual Analysis</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9, marginBottom: '32px', color: 'var(--color-spatial-text)' }}>
                                {site.description}
                            </p>

                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', borderLeft: '3px solid var(--color-spatial-accent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <Sparkles size={16} color="var(--color-spatial-accent)" /> 
                                    <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--color-spatial-accent)' }}>AI Reconstruction</span>
                                </div>
                                <p style={{ fontStyle: 'italic', opacity: 0.8 }}>
                                   "{aiStory?.story || 'Analyzing architectural patterns...'}"
                                </p>
                            </div>

                        </motion.div>
                    </div>

                    {/* Right: Actions (Control Panel) */}
                    <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                         <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ 
                                background: 'var(--material-glass)', 
                                backdropFilter: 'var(--material-blur)', 
                                border: 'var(--material-glass-border)', 
                                borderRadius: '16px', 
                                padding: '24px' 
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <Box size={20} color="var(--color-spatial-accent)" />
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AR Portal</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
                                View this site in 1:1 scale using the Antigravity engine.
                            </p>
                            <button 
                                onClick={() => navigate('/antigravity')}
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                            >
                                Launch AR Session
                            </button>
                        </motion.div>

                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                           style={{ 
                                background: 'white', 
                                borderRadius: '16px', 
                                padding: '24px',
                                color: 'var(--color-charcoal)' 
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <Calendar size={20} color="var(--color-charcoal)" />
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Mission Planning</span>
                            </div>
                             <button 
                                onClick={() => navigate('/trip-builder')}
                                className="btn-primary"
                                style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, background: 'var(--color-charcoal)', color: 'white' }}
                            >
                                Add to Expedition
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
            
            <div style={{ height: '120px' }} />
            <Footer />
        </div>
    );
};

export default SiteDetail;
