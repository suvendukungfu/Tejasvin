import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { MapPin, Clock, Info, ArrowLeft, Shield, Sparkles, Map as MapIcon } from 'lucide-react';
import { getSiteBySlug, getSafetyScore, getAiStory } from '../services/api';
import { motion } from 'framer-motion';
import MapPreview from '../components/MapPreview';

const SiteDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [site, setSite] = useState<any>(null);
    const [safety, setSafety] = useState<any>(null);
    const [aiStory, setAiStory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMapOpen, setIsMapOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // Parallel fetch for better performance
                const siteData = await getSiteBySlug(slug);
                setSite(siteData.data || siteData); // Handle potential axios wrap

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

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-body flex items-center justify-center">
                <NavBar />
                <div style={{ padding: '10rem', textAlign: 'center', color: 'var(--color-primary)' }}>Loading Heritage Site...</div>
            </div>
        );
    }

    if (!site) return <div>Site not found</div>;

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />

            {/* Hero Section */}
            <div style={{ position: 'relative', height: '70vh' }}>
                <img
                    src={site.image_url || site.image} // Fallback for transition
                    alt={site.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)'
                }} />

                <div className="container" style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', width: '100%', color: 'white', zIndex: 2 }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(12px)',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.7rem 1.5rem',
                            fontSize: '0.95rem',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Region
                    </button>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ 
                            fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                            marginBottom: '1rem', 
                            fontFamily: 'var(--font-heading)', 
                            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            lineHeight: 1.1
                        }}
                    >
                        {site.name}
                    </motion.h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', opacity: 0.95, fontWeight: 300 }}>
                        <MapPin size={22} color="var(--color-secondary)" />
                        <span>Morena District, Madhya Pradesh</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }} className="grid-responsive-layout">
                    {/* Main Content */}
                    <div>
                        <section style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>About the Site</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-text-main)', opacity: 0.9, marginBottom: '2rem' }}>
                                {site.full_description || site.description}
                            </p>
                            
                            {/* AI Story Section */}
                            {aiStory && (
                                <div className="card glass" style={{ padding: '2rem', borderLeft: '4px solid var(--color-accent)', marginBottom: '2rem', background: 'rgba(255,255,255,0.8)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <Sparkles size={24} color="var(--color-accent)" />
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>AI Historian</h3>
                                    </div>
                                    <div style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                                        "{aiStory.content}"
                                    </div>
                                    {aiStory.formatted_sections && aiStory.formatted_sections.map((sec: any, idx: number) => (
                                        <div key={idx} style={{ marginTop: '1rem' }}>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{sec.title}</h4>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{sec.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                         
                         {/* Map Preview Modal/Section */}
                         {isMapOpen && (
                            <div style={{ marginBottom: '4rem', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                                <MapPreview sites={[site]} />
                            </div>
                         )}

                         <section style={{ marginBottom: '4rem' }} id="gallery">
                             <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Gallery</h3>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {/* Gallery placeholder or dynamic images if available */}
                                <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
                                    <img src={site.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery 1" />
                                </div>
                                <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery 2" />
                                </div>
                             </div>
                         </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="sidebar">
                        <div className="card glass" style={{ padding: '2.5rem', position: 'sticky', top: '100px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Visitor Info</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Clock size={20} />
                                    <span style={{ fontWeight: 600 }}>Timings</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>{site.timings || "Sunrise to Sunset"}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Info size={20} />
                                    <span style={{ fontWeight: 600 }}>Entry Fee</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>₹{site.entry_fee}</p>
                            </div>
                            
                            {/* Safety Score Widget */}
                            {safety && (
                                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: safety.score >= 8 ? '#f0fdf4' : '#fff7ed', borderRadius: '12px', border: `1px solid ${safety.score >= 8 ? '#bbf7d0' : '#fed7aa'}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: safety.score >= 8 ? '#166534' : '#9a3412' }}>
                                        <Shield size={20} />
                                        <span style={{ fontWeight: 700 }}>Safety Score: {safety.score}/10</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {safety.details?.advisory} • {safety.details?.weather}
                                    </p>
                                </div>
                            )}

                            <button 
                                onClick={() => setIsMapOpen(!isMapOpen)}
                                className="btn btn-outline" 
                                style={{ width: '100%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <MapIcon size={18} /> {isMapOpen ? 'Hide Map' : 'View on Map'}
                            </button>

                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}>
                                Book a Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .grid-responsive-layout {
                        grid-template-columns: 1fr !important;
                    }
                     .sidebar {
                        order: -1;
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default SiteDetail;
