import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, Clock, ArrowLeft, Shield, Sparkles, Share2, Calendar, IndianRupee } from 'lucide-react';
import { getSiteBySlug, getSafetyScore, getAiStory } from '../services/api';
import { motion, useScroll, useTransform } from 'framer-motion';
import MapPreview from '../components/MapPreview';

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
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Parallax & Cinematic effects
    const yHero = useTransform(scrollY, [0, 600], ["0%", "25%"]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const siteData = await getSiteBySlug(slug);
                setSite(siteData.data || siteData);

                if (siteData) {
                    const [safetyRes, storyRes] = await Promise.all([
                        getSafetyScore(siteData.id || 1),
                        getAiStory({ siteName: siteData.name, persona: 'Tourist', slug: siteData.slug })
                    ]);
                    setSafety(safetyRes.data || safetyRes);
                    setAiStory(storyRes.data || storyRes);
                }
            } catch (error) {
                console.error("Failed to fetch details", error);
            } finally {
                setLoading(false);
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

    if (loading) {
        return (
            <div className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
                <NavBar />
                <div style={{ paddingTop: '10rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>
                    Loading Site Intel...
                </div>
            </div>
        );
    }

    if (!site) return <div>Site not found</div>;

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-body)' }}>
            <NavBar />

            {/* --- CINEMATIC SITE HERO --- */}
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <motion.div 
                    style={{ position: 'absolute', inset: 0, y: yHero }}
                >
                    <motion.img
                        src={heroImage}
                        alt={site.name}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 12, ease: "linear" }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 60%, var(--color-bg-body) 100%)',
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
                            onClick={() => navigate(-1)}
                            className="btn-cinematic"
                            style={{
                                color: 'white',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '8px 20px',
                                borderRadius: '32px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '2.5rem',
                                fontSize: '0.85rem',
                                fontWeight: 600
                            }}
                        >
                            <ArrowLeft size={16} /> Back to Region
                        </button>
                        
                        <h1 className="text-display" style={{ color: '#FFFFFF', marginBottom: '1.5rem', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', lineHeight: 1.1 }}>
                            {site.name}
                        </h1>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: '#FFFFFF', opacity: 0.95 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={20} color="var(--color-accent)" />
                                <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>Morena, Madhya Pradesh</span>
                            </div>
                            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Share2 size={20} />
                                <span style={{ fontSize: '1.25rem' }}>Share Story</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- CORE NARRATIVE LAYOUT --- */}
            <div className="container" style={{ position: 'relative', zIndex: 20, marginTop: '-80px' }}>
                <div className="grid-12">
                    
                    {/* Left: Preservation Narrative */}
                    <div style={{ gridColumn: 'span 8', paddingRight: '4rem' }}>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel" 
                            style={{ padding: '4rem', background: 'white', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.08)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                <Shield size={24} color="var(--color-gold)" />
                                <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, fontSize: '0.75rem', color: 'var(--color-gold)' }}>Verified Research</span>
                            </div>
                            
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Historical Context</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.7)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                {site.description}
                            </p>

                            <div style={{ background: 'linear-gradient(135deg, rgba(200, 163, 89, 0.05), rgba(0,0,0,0.02))', padding: '2.5rem', borderRadius: '32px', borderLeft: '4px solid var(--color-gold)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                    <Sparkles size={20} color="var(--color-gold)" />
                                    <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.9rem' }}>AI Narrated Legend</h4>
                                </div>
                                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.125rem', color: 'var(--color-primary)', opacity: 0.8, lineHeight: 1.6 }}>
                                    {aiStory?.story || "Connecting to neural archives for site-specific lore..."}
                                </p>
                            </div>
                        </motion.div>

                        {/* Spatial Data Preview */}
                        <div style={{ marginTop: '4rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 className="text-h2" style={{ margin: 0 }}>Spatial Mapping</h3>
                                <button onClick={() => setIsMapOpen(!isMapOpen)} className="btn-cinematic" style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)', borderRadius: '32px' }}>
                                    {isMapOpen ? 'Close View' : 'Launch Full Map'}
                                </button>
                             </div>
                             
                             <div style={{ height: '450px', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <MapPreview sites={[site]} />
                             </div>
                        </div>
                    </div>

                    {/* Right: Site Intelligence Panel */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <div style={{ position: 'sticky', top: '120px' }}>
                             {/* Safety Matrix */}
                             <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '32px', marginBottom: '2rem', background: 'var(--color-charcoal)', color: 'white' }}>
                                <h4 style={{ margin: '0 0 2rem 0', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 800 }}>Site Intelligence</h4>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                            <Shield size={16} /> Heritage Safety
                                        </div>
                                        <div style={{ fontWeight: 800, color: '#4ADE80' }}>{safety?.score || '9.8'}/10</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                            <Clock size={16} /> Peak Access
                                        </div>
                                        <div style={{ fontWeight: 700 }}>06:30 - 18:00</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                            <IndianRupee size={16} /> Access Fee
                                        </div>
                                        <div style={{ fontWeight: 700 }}>₹25.00</div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate('/trip-builder')}
                                    className="btn-cinematic btn-primary" 
                                    style={{ width: '100%', marginTop: '2.5rem', background: 'var(--color-gold)', color: 'var(--color-charcoal)', borderRadius: '32px' }}
                                >
                                    Add to Expedition
                                </button>
                             </div>

                             {/* Booking Context */}
                             <div style={{ padding: '2rem', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>
                                    <Calendar size={20} />
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Nearby Accommodations</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                                    Secure institutional-grade lodging through our curated heritage network.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '120px' }} />
            <Footer />
        </div>
    );
};

export default SiteDetail;
