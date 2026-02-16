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
                // Map slugs to curated cinematic assets (Unsplash High-Res)
                const regionImageMap: Record<string, string> = {
                    'chambal-valley': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop', // Mountainous/Ravine feel
                    'gwalior': 'https://images.unsplash.com/photo-1599661046289-e31897812906?q=80&w=1600&auto=format&fit=crop', // Fort walls
                    'bateshwar': 'https://images.unsplash.com/photo-1644917616149-165b4c48971f?q=80&w=1600&auto=format&fit=crop', // Stone Temples
                    'mitaoli': 'https://images.unsplash.com/photo-1591266042129-922649b5ae7d?q=80&w=1600&auto=format&fit=crop', // Circular/Architectural
                    'padavali': 'https://images.unsplash.com/photo-1628066532402-2c63677e52b2?q=80&w=1600&auto=format&fit=crop', // Ruins/Carvings
                    'kakanmath': 'https://images.unsplash.com/photo-1566324018374-c72064d5098d?q=80&w=1600&auto=format&fit=crop', // Isolated Temple Spire
                    'garh-kundar': 'https://images.unsplash.com/photo-1572883454114-1cf0031a026e?q=80&w=1600&auto=format&fit=crop', // Hill Fort Silhouette
                };

                // Inject images and mock coordinates
                const dataWithEnrichment = regionsRes.data.map((r: Region) => ({
                    ...r,
                    banner_image: regionImageMap[r.slug] || r.banner_image || gwaliorFort, // Fallback to Gwalior if no match
                    latitude: r.latitude || 26.2183 + (Math.random() * 0.5 - 0.25),
                    longitude: r.longitude || 78.1828 + (Math.random() * 0.5 - 0.25)
                }));
                
                setRegions(dataWithEnrichment || []);

                // Enrich sites with specific images for the Atlas Map (Using reliable Wikimedia Commons)
                const siteImageMap: Record<string, string> = {
                    'bateshwar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Bateshwar_Group_of_Temples_of_Morena%2C_Madhya_Pradesh.jpg/1024px-Bateshwar_Group_of_Temples_of_Morena%2C_Madhya_Pradesh.jpg',
                    'mitawali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chausath_Yogini_Temple%2C_Mitaoli%2C_Morena_006.jpg/1280px-Chausath_Yogini_Temple%2C_Mitaoli%2C_Morena_006.jpg',
                    'chausath': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chausath_Yogini_Temple%2C_Mitaoli%2C_Morena_006.jpg/1280px-Chausath_Yogini_Temple%2C_Mitaoli%2C_Morena_006.jpg', // Mitawali alias
                    'padavali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/The_grand_entrance_of_Garhi_Padavali.jpg/1024px-The_grand_entrance_of_Garhi_Padavali.jpg',
                    'kakanmath': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kakanmath_Temple_%2824143370669%29.JPG/1024px-Kakanmath_Temple_%2824143370669%29.JPG',
                    'garh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Garh_Kundar.JPG/1024px-Garh_Kundar.JPG', // Garh Kundar
                    'chambal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Chambal-river-gorge.jpg/1280px-Chambal-river-gorge.jpg',
                };

                const enrichedSites = (sitesRes.data || []).map((site: Site) => {
                    const lowerName = site.name.toLowerCase();
                    // Default Fallback (Gwalior Fort - Reliable Source)
                    let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gwalior_Fort_view.jpg/1280px-Gwalior_Fort_view.jpg'; 

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
            style={{ background: 'var(--color-spatial-bg)' }}
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
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-spatial-bg) 5%, transparent 60%)' }} />
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
                                <MapPreview sites={allSites} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            
            {/* <Footer /> removed - rendered globally in Layout */}
        </motion.div>
    );
};

// --- CINEMATIC VISIONOS TILE (Redesigned: Full-Bleed & Layered) ---
const CinematicTile = ({ region, index, navigate }: { region: Region, index: number, navigate: any }) => {
    return (
        <motion.div 
            style={{ gridColumn: 'span 6', cursor: 'pointer', position: 'relative', marginBottom: '40px' }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            whileHover="hover"
            onClick={() => navigate(`/region/${region.slug}`)}
        >
            <motion.div 
                style={{ 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    height: '500px', // Increased height for cinematic feel
                    background: '#EAE5D9', // Sandstone placeholder
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                    transformStyle: 'preserve-3d'
                }}
                variants={{
                    hover: { 
                        y: -12, 
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.25)'
                    }
                }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
                {/* 1. Full-Bleed Image Layer */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                     <motion.img 
                        src={region.banner_image} 
                        alt={region.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        variants={{
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    
                    {/* Sandstone Tint Overlay (Unified System) */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(200, 163, 89, 0.05)', mixBlendMode: 'multiply' }} />
                    
                    {/* Cinematic Text Gradient (Bottom Up) */}
                    <motion.div 
                        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)' }} 
                        variants={{ hover: { opacity: 1 } }}
                        initial={{ opacity: 0.8 }}
                    />
                </div>

                {/* 2. Content Layer (Floating) */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px' }}>
                    
                    {/* Top Detail: ID & Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                            <div style={{ width: '6px', height: '6px', background: 'var(--color-spatial-accent)', borderRadius: '50%' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>
                                Region 0{region.id}
                            </span>
                        </div>
                    </div>

                    {/* Title & Arrow Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <h3 className="text-display" style={{ fontSize: '2.5rem', color: 'white', margin: 0, lineHeight: 1.1, textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                            {region.name}
                        </h3>

                        <motion.div 
                            variants={{ 
                                hover: { scale: 1, opacity: 1, x: 0 },
                                initial: { scale: 0.9, opacity: 0.6, x: -10 }
                            }}
                            initial="initial"
                            style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,255,255,0.2)', 
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}
                        >
                            <ArrowRight size={20} color="white" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Explore;
