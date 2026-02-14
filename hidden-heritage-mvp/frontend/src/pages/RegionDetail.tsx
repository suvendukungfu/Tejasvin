import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getSites, getRegionBySlug } from '../services/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Heritage Cinematic Assets
import bateshwar from '../assets/heritage/bateshwar.png';
import mitaoli from '../assets/heritage/mitaoli.png';
import gwaliorFort from '../assets/heritage/gwalior_fort.png';
import chambalValley from '../assets/heritage/chambal_valley.png';

const RegionDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    
    // Parallax & Cinematic effects
    const yHero = useTransform(scrollY, [0, 600], ["0%", "25%"]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    const [region, setRegion] = useState<any>(null);
    const [sites, setSites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const regionRes = await getRegionBySlug(slug);
                const regionData = regionRes.data || regionRes || {};
                setRegion(regionData);

                if (regionData && regionData.id) {
                    const sitesRes = await getSites(regionData.id);
                    setSites(sitesRes.data || sitesRes || []);
                }
            } catch (err) {
                console.error("Failed to fetch region data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const heroImageMap: any = {
        'chambal-valley': chambalValley,
        'gwalior-region': gwaliorFort
    };

    const heroImage = heroImageMap[slug || ''] || chambalValley;

    if (loading) return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
            <NavBar />
            <div style={{ paddingTop: '10rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>
                Loading Region...
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
            <NavBar />

            {/* --- IMMERSIVE HERO WITH KEN BURNS --- */}
            <div style={{ position: 'relative', height: '85vh', overflow: 'hidden' }}>
                 <motion.div 
                    style={{ position: 'absolute', inset: 0, y: yHero }}
                >
                    <motion.img
                        src={heroImage}
                        alt={region?.name}
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 15, ease: "linear" }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, var(--color-bg-body) 100%)',
                        zIndex: 1
                    }} />
                </motion.div>

                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '140px', zIndex: 10 }}>
                    <motion.div 
                        style={{ width: '100%', opacity: opacityHero }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                         <button
                            onClick={() => navigate('/explore')}
                            className="btn-cinematic"
                            style={{ 
                                background: 'rgba(255,255,255,0.1)', 
                                backdropFilter: 'blur(12px)',
                                color: 'white', 
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '8px 24px',
                                borderRadius: '32px',
                                marginBottom: '2.5rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.85rem',
                                fontWeight: 600
                            }}
                        >
                            <ArrowLeft size={16} /> Back to Sectors
                        </button>
                        <h1 className="text-display" style={{ color: 'var(--color-charcoal)', marginBottom: '1.5rem', fontSize: 'clamp(4rem, 10vw, 7rem)', letterSpacing: '-0.03em' }}>
                            {region?.name}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.7)', maxWidth: '700px', lineHeight: 1.6 }}>
                            {region?.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* --- SITES GRID: THE SECTOR DATA --- */}
            <section style={{ padding: '120px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
                        <div>
                             <span style={{ color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '16px' }}>Available Sub-Portals</span>
                             <h2 className="text-h1" style={{ color: 'var(--color-charcoal)' }}>Regional Archive.</h2>
                        </div>
                        <div style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '0.9rem', fontWeight: 700 }}>VERIFIED BY ARCHAEOLOGICAL SURVEY</div>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid-12"
                    >
                        {sites.map((site: any) => (
                            <motion.div 
                                key={site.id}
                                variants={itemVariants}
                                style={{ gridColumn: 'span 12', marginBottom: '4rem' }}
                            >
                                <div 
                                    onClick={() => navigate(`/site/${site.slug}`)}
                                    className="heritage-tile-container"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="heritage-tile" style={{ height: '360px', marginBottom: '2rem', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
                                        <img 
                                            src={site.slug === 'bateshwar-temples' ? bateshwar : site.slug === 'mitaoli-temple' ? mitaoli : site.image_url} 
                                            alt={site.name} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                        <div className="glass-panel" style={{
                                            position: 'absolute',
                                            top: '32px',
                                            right: '32px',
                                            padding: '12px 24px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            background: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(20px)',
                                            color: 'var(--color-primary)',
                                            borderRadius: '32px',
                                            border: '1px solid rgba(255,255,255,0.5)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                        }}>
                                            {site.type || 'Heritage Site'}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 8px' }}>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                                            {site.name}
                                        </h3>
                                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '640px', lineHeight: 1.6 }}>{site.description}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Connect to Site <ArrowRight size={16} />
                                        </div>
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

export default RegionDetail;
