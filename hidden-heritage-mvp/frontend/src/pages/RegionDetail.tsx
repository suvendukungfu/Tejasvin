import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MapPreview from '../components/MapPreview';
import { getSites, getRegionBySlug } from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, Check } from 'lucide-react';

const RegionDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [region, setRegion] = useState<any>(null);
    const [sites, setSites] = useState<any[]>([]);
    const [selectedSites, setSelectedSites] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // 1. Fetch Region Details
                const regionRes = await getRegionBySlug(slug);
                const regionData = regionRes.data || regionRes || {};
                setRegion(regionData);

                // 2. Fetch Sites for this Region if we have an ID
                if (regionData && regionData.id) {
                    const sitesRes = await getSites(regionData.id);
                    setSites(sitesRes.data || sitesRes || []);
                } else {
                    // Fallback to all sites if region lookup failed (or mock)
                     const sitesRes = await getSites();
                     setSites(sitesRes.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch region data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const toggleSite = (id: number) => {
        if (selectedSites.includes(id)) {
            setSelectedSites(selectedSites.filter(s => s !== id));
        } else {
            setSelectedSites([...selectedSites, id]);
        }
    };

    const startTripPlanning = () => {
        navigate('/book', { state: { initialSelection: selectedSites } });
    };

    // Fallback image if region doesn't have one
    const heroImage = region?.banner_image || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg';

    if (loading) return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                Loading Region Details...
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />

            {/* Region Hero */}
            <div style={{
                height: '60vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginTop: '-70px',
                paddingTop: '70px',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -2,
                    filter: 'brightness(0.9)',
                    transition: 'background-image 0.5s ease-in-out'
                }} />
                {/* Professional Gradient Overlay - Clean & Premium */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)',
                    zIndex: -1
                }} />
                
                <div className="container" style={{ textAlign: 'center', zIndex: 1, paddingTop: '4rem' }}>
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                     >
                        <h1 style={{ 
                            fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1em',
                            marginBottom: '1rem', 
                            fontFamily: 'var(--font-heading)', 
                            color: '#FFFFFF',
                            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                            fontWeight: 600
                        }}>
                            {region?.name || slug?.replace('-', ' ')}
                        </h1>
                        <div style={{ width: '80px', height: '4px', background: 'var(--color-secondary)', margin: '0 auto 2rem auto', borderRadius: '2px', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }} />
                        <p style={{ 
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                            color: '#FFFFFF', 
                            maxWidth: '650px', 
                            margin: '0 auto', 
                            fontWeight: 400,
                            lineHeight: 1.8,
                            letterSpacing: '0.02em',
                            fontFamily: 'var(--font-heading)',
                            fontStyle: 'italic',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}>
                            "{region?.description || "Listen to the stories carved in stone."}"
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem', paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginTop: '2rem' }} className="grid-responsive-layout">

                    {/* List of Sites */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>Chapters of History ({sites.length})</h2>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                Collect stories to build your journey
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {sites.map((site, index) => (
                                <motion.div
                                    key={site.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="card glass"
                                    style={{
                                        padding: 0,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        borderRadius: 'var(--border-radius-lg)',
                                        border: selectedSites.includes(site.id) ? '2px solid var(--color-secondary)' : '1px solid rgba(255,255,255,0.8)',
                                        position: 'relative',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        background: 'white',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                    }}
                                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                >
                                    {selectedSites.includes(site.id) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: 'var(--color-secondary)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '4px',
                                            zIndex: 10
                                        }}>
                                            <Check size={16} />
                                        </div>
                                    )}
                                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                        <img
                                            src={site.image_url || heroImage}
                                            alt={site.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            className="card-image"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '40%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                            zIndex: 1
                                        }} />
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{site.name}</h4>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                backgroundColor: 'var(--color-bg-alt)',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                color: 'var(--color-text-secondary)'
                                            }}>{site.type}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                                            {site.short_description}
                                        </p>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => toggleSite(site.id)}
                                                className={`btn ${selectedSites.includes(site.id) ? 'btn-secondary' : 'btn-outline'}`}
                                                style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }}
                                            >
                                                {selectedSites.includes(site.id) ? 'Collected' : 'Collect'}
                                            </button>
                                            <button
                                                onClick={() => navigate(`/site/${site.slug}`)}
                                                className="btn"
                                                style={{
                                                    padding: '0.5rem',
                                                    color: 'var(--color-primary)',
                                                    backgroundColor: 'rgba(93, 64, 55, 0.05)'
                                                }}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Map & Sticky Sidebar */}
                    <div className="sidebar" style={{ minWidth: '300px' }}>
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '1.5rem', height: '250px' }}>
                                <MapPreview sites={sites} />
                            </div>

                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} /> Your Itinerary
                                </h3>
                                <div style={{
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-bg-alt)',
                                    borderRadius: 'var(--border-radius-sm)',
                                    marginBottom: '1rem'
                                }}>
                                    <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-primary)' }}>
                                        {selectedSites.length} sites selected
                                    </p>
                                </div>

                                {selectedSites.length > 0 ? (
                                    <div style={{ marginBottom: '1.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                                        {sites.filter(s => selectedSites.includes(s.id)).map(s => (
                                            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                <Check size={14} color="var(--color-success)" />
                                                <span>{s.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                        Select sites from the list to start planning your trip.
                                    </p>
                                )}

                                <button
                                    onClick={startTripPlanning}
                                    disabled={selectedSites.length === 0}
                                    className="btn btn-primary"
                                    style={{ width: '100%', opacity: selectedSites.length === 0 ? 0.6 : 1, cursor: selectedSites.length === 0 ? 'not-allowed' : 'pointer' }}
                                >
                                    Proceed to Trip Planner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Simple CSS for responsive grid layout switch */}
            <style>{`
                @media (max-width: 900px) {
                    .grid-responsive-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .sidebar {
                        order: -1; /* Show map first on mobile? Or maybe keeping it below is better. Let's keep distinct columns stack. */
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegionDetail;
