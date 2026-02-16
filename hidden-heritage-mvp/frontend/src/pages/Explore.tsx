import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';
import { ArrowRight, Compass, Map as MapIcon, Grid, Search, X } from 'lucide-react';
import { getRegions, getSites } from '../services/api'; 
import MapPreview from '../components/MapPreview';
import 'leaflet/dist/leaflet.css';

// Cinematic Assets
import gwaliorFort from '../assets/heritage/gwalior_fort.png';

interface Region {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner_image: string;
    sites_count?: number;
    latitude?: number; 
    longitude?: number;
}

interface Site {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    type: string;
    slug?: string;
    image_url?: string;
}

const Explore = () => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState<Region[]>([]);
    const [allSites, setAllSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // VisionOS Parallax: Image moves slower than UI
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [regionsRes, sitesRes] = await Promise.all([
                    getRegions(),
                    getSites() 
                ]);

                // Map slugs to local assets for diverse visuals
                // Map slugs to curated cinematic assets (Unsplash High-Res - Warm & Architectural)
                const regionImageMap: Record<string, string> = {
                    'chambal-valley': 'https://images.unsplash.com/photo-1504705759706-c5ee7158f8bb?q=80&w=1600&auto=format&fit=crop', // Aerial River/Canyon
                    'gwalior': 'https://images.unsplash.com/photo-1600667363406-8968037b0365?q=80&w=1600&auto=format&fit=crop', // Fort Silhouette Warm
                    'bateshwar': 'https://images.unsplash.com/photo-1622308644420-a94aa6be068c?q=80&w=1600&auto=format&fit=crop', // Stone Temples Warm
                    'mitaoli': 'https://images.unsplash.com/photo-1596547608821-42eb4dc32658?q=80&w=1600&auto=format&fit=crop', // Circular Architecture
                    'padavali': 'https://images.unsplash.com/photo-1628066532402-2c63677e52b2?q=80&w=1600&auto=format&fit=crop', // Carvings/Ruins
                    'kakanmath': 'https://images.unsplash.com/photo-1598535348423-42d4850a581e?q=80&w=1600&auto=format&fit=crop', // Isolated Temple
                    'garh-kundar': 'https://images.unsplash.com/photo-1522822459039-44474cc3f5c8?q=80&w=1600&auto=format&fit=crop', // Hill Fort
                };

                // Inject images and mock coordinates
                const dataWithEnrichment = regionsRes.data.map((r: Region) => ({
                    ...r,
                    banner_image: regionImageMap[r.slug] || r.banner_image || gwaliorFort, 
                    latitude: r.latitude || 26.2183 + (Math.random() * 0.5 - 0.25),
                    longitude: r.longitude || 78.1828 + (Math.random() * 0.5 - 0.25)
                }));
                
                setRegions(dataWithEnrichment || []);

                // Enrich sites with specific images for the Atlas Map (Using Cinematic Unsplash)
                const siteImageMap: Record<string, string> = {
                    'bateshwar': 'https://images.unsplash.com/photo-1622308644420-a94aa6be068c?q=80&w=800&auto=format&fit=crop',
                    'mitawali': 'https://images.unsplash.com/photo-1596547608821-42eb4dc32658?q=80&w=800&auto=format&fit=crop',
                    'chausath': 'https://images.unsplash.com/photo-1596547608821-42eb4dc32658?q=80&w=800&auto=format&fit=crop', 
                    'padavali': 'https://images.unsplash.com/photo-1628066532402-2c63677e52b2?q=80&w=800&auto=format&fit=crop',
                    'kakanmath': 'https://images.unsplash.com/photo-1598535348423-42d4850a581e?q=80&w=800&auto=format&fit=crop',
                    'garh': 'https://images.unsplash.com/photo-1522822459039-44474cc3f5c8?q=80&w=800&auto=format&fit=crop',
                    'chambal': 'https://images.unsplash.com/photo-1504705759706-c5ee7158f8bb?q=80&w=800&auto=format&fit=crop',
                };

                const enrichedSites = (sitesRes.data || []).map((site: Site) => {
                    const lowerName = site.name.toLowerCase();
                    // Default Fallback (Gwalior Fort - Warm/Cinematic)
                    let imageUrl = 'https://images.unsplash.com/photo-1533230626359-573e86c2e393?q=80&w=800&auto=format&fit=crop'; 

                    for (const [key, url] of Object.entries(siteImageMap)) {
                        if (lowerName.includes(key)) {
                            imageUrl = url;
                            break;
                        }
                    }
                    return { ...site, image_url: imageUrl };
                });

                setAllSites(enrichedSites);
            } catch (error) {
                console.error('Failed to fetch atlas data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loader />;

    const filteredRegions = regions.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div 
            ref={containerRef} 
            className="min-h-screen" 
            style={{ background: '#F0EFEA' }} // Slightly warmer/lighter than sandstone for contrast
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <NavBar />

            {/* --- 1. SPATIAL HERO: THE ATLAS --- */}
            <section style={{ height: '85vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '120px' }}>
                
                {/* Immersive Canvas */}
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, opacity: opacityHero, zIndex: 0 }}>
                    <img src={gwaliorFort} alt="Hero" style={{ width: '100%', height: '110%', objectFit: 'cover' }} />
                    {/* Frosted Glass Gradient from Bottom */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F0EFEA 5%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)' }} />
                </motion.div>

                {/* Floating Spatial Title Container */}
                <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                     <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }} // Cinema Ease
                        style={{ maxWidth: '800px' }}
                     >
                        <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '32px' }}>
                            Planetary Archive • Volume I
                        </div>
                        <div style={{ 
                            background: 'rgba(255, 255, 255, 0.1)', 
                            backdropFilter: 'blur(20px)', 
                            padding: '48px', 
                            borderRadius: '40px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                        }}>
                             <h1 className="text-display" style={{ color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                                The Atlas.
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, maxWidth: '500px' }}>
                                Decoded neural scans of the Chambal Valley. Select a sector to begin your analysis.
                            </p>
                        </div>
                     </motion.div>
                </div>
            </section>

            {/* --- 2. CONTROL HUD --- */}
            <div style={{ position: 'sticky', top: '100px', zIndex: 100, paddingBottom: '40px', pointerEvents: 'none' }}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            pointerEvents: 'auto',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            padding: '16px 24px',
                            borderRadius: '100px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        {/* Search Filter */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                            <Search size={20} color="var(--color-spatial-text)" opacity={0.5} />
                            <input 
                                type="text" 
                                placeholder="Filter sectors..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '1rem',
                                    color: 'var(--color-spatial-text)',
                                    width: '100%',
                                    fontFamily: 'var(--font-sans)',
                                    outline: 'none'
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={16} color="var(--color-spatial-text)" opacity={0.6} />
                                </button>
                            )}
                        </div>

                        {/* Divider */}
                        <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)', margin: '0 24px' }} />

                        {/* View Toggles */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => setViewMode('grid')}
                                style={{ 
                                    padding: '10px 20px', 
                                    borderRadius: '100px', 
                                    border: 'none', 
                                    background: viewMode === 'grid' ? 'var(--color-spatial-text)' : 'transparent', 
                                    color: viewMode === 'grid' ? 'white' : 'var(--color-spatial-text)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Grid size={16} /> Grid
                            </button>
                            <button 
                                onClick={() => setViewMode('map')}
                                style={{ 
                                    padding: '10px 20px', 
                                    borderRadius: '100px', 
                                    border: 'none', 
                                    background: viewMode === 'map' ? 'var(--color-spatial-text)' : 'transparent', 
                                    color: viewMode === 'map' ? 'white' : 'var(--color-spatial-text)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <MapIcon size={16} /> Map
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- 3. CONTENT AREA --- */}
            <section style={{ padding: '0 0 160px 0', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    
                    <AnimatePresence mode="wait">
                        {viewMode === 'grid' ? (
                            <motion.div 
                                key="grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="grid-12"
                            >
                                {filteredRegions.length > 0 ? (
                                    filteredRegions.map((region, idx) => (
                                        <CinematicTile key={region.id} region={region} index={idx} navigate={navigate} />
                                    ))
                                ) : (
                                    <div style={{ gridColumn: 'span 12', textAlign: 'center', padding: '120px 0', opacity: 0.5 }}>
                                        <Compass size={48} strokeWidth={1} />
                                        <p style={{ fontSize: '1.5rem', marginTop: '24px' }}>No sectors found.</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="map"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                                style={{ height: '75vh', borderRadius: '32px', overflow: 'hidden', boxShadow: 'var(--material-shadow-deep)', border: '4px solid white' }}
                            >
                                <MapPreview 
                                    sites={allSites} 
                                    selectedSiteIds={[]} 
                                    onToggleSite={() => {}} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            
            {/* <Footer /> removed - rendered globally in Layout */}
        </motion.div>
    );
};

// --- CINEMATIC VISIONOS TILE (Ultra-Premium Glass Edition) ---
const CinematicTile = ({ region, index, navigate }: { region: Region, index: number, navigate: any }) => {
    return (
        <motion.div 
            style={{ gridColumn: 'span 6', cursor: 'pointer', position: 'relative', marginBottom: '40px' }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            whileHover="hover"
            onClick={() => navigate(`/region/${region.slug}`)}
        >
            <motion.div 
                style={{ 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    height: '520px', 
                    background: '#F0EFEA', // Base for loading state
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    transformStyle: 'preserve-3d'
                }}
                variants={{
                    hover: { 
                        y: -8, 
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)'
                    }
                }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
                {/* 1. Full-Bleed Image Layer */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                     <motion.img 
                        src={region.banner_image} 
                        alt={region.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) contrast(1.05)' }} // Subtle cinematic warming
                        variants={{
                            hover: { scale: 1.05 } // Breathe effect
                        }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                </div>

                {/* 2. Glass Panel Layer (The Ultra-Premium Touch) */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                    <motion.div 
                        style={{ 
                            background: 'rgba(249, 247, 242, 0.6)', 
                            backdropFilter: 'blur(12px)', 
                            borderRadius: '20px', 
                            padding: '24px 32px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                        variants={{
                            hover: { 
                                backgroundColor: 'rgba(249, 247, 242, 0.85)',
                                backdropFilter: 'blur(16px)'
                            }
                        }}
                        transition={{ duration: 0.4 }}
                    >
                         {/* Top Detail: Cube Icon & ID */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                 <Grid size={12} color="var(--color-spatial-accent)" />
                                 <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-spatial-accent)', textTransform: 'uppercase' }}>
                                    Region 0{region.id}
                                </span>
                             </div>
                        </div>

                        {/* Title & Arrow Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <h3 className="text-display" style={{ fontSize: '2.2rem', color: '#1a1a1a', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', flex: 1 }}>
                                {region.name}
                            </h3>

                            <motion.div 
                                variants={{ 
                                    hover: { scale: 1, backgroundColor: 'rgba(26, 26, 26, 1)', x: 0 },
                                    initial: { scale: 1, backgroundColor: 'rgba(26, 26, 26, 0.1)', x: 0 }
                                }}
                                transition={{ duration: 0.4 }}
                                style={{ 
                                    width: '44px', 
                                    height: '44px', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginLeft: '16px'
                                }}
                            >
                                <ArrowRight size={18} color="white" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Explore;
