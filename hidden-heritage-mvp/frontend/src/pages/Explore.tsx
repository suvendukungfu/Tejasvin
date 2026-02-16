import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, ArrowRight, Compass, Map as MapIcon, Grid, Search, X } from 'lucide-react';
import { getRegions, getSites } from '../services/api'; 
import MapPreview from '../components/MapPreview';
import 'leaflet/dist/leaflet.css';

// Cinematic Assets
import gwaliorFort from '../assets/heritage/gwalior_fort.png';
import bateshwar from '../assets/heritage/bateshwar.png';
import mitaoli from '../assets/heritage/mitaoli.png';
import chambalValley from '../assets/heritage/chambal_valley.png';

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
                const regionImageMap: Record<string, string> = {
                    'chambal-valley': chambalValley,
                    'gwalior': gwaliorFort,
                    'bateshwar': bateshwar,
                    'mitaoli': mitaoli,
                    // Add more mappings as needed
                };

                // Inject images and mock coordinates
                const dataWithEnrichment = regionsRes.data.map((r: Region) => ({
                    ...r,
                    banner_image: regionImageMap[r.slug] || r.banner_image || gwaliorFort, // Fallback to Gwalior if no match
                    latitude: r.latitude || 26.2183 + (Math.random() * 0.5 - 0.25),
                    longitude: r.longitude || 78.1828 + (Math.random() * 0.5 - 0.25)
                }));
                
                setRegions(dataWithEnrichment || []);
                setAllSites(sitesRes.data || []);
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
            
            <Footer />
        </motion.div>
    );
};

// --- CINEMATIC VISIONOS TILE (Replaces Holographic) ---
const CinematicTile = ({ region, index, navigate }: { region: Region, index: number, navigate: any }) => {
    return (
        <motion.div 
            style={{ gridColumn: 'span 6', cursor: 'pointer', position: 'relative' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.2, 0, 0, 1] }}
            whileHover="hover"
            onClick={() => navigate(`/region/${region.slug}`)}
        >
            <motion.div 
                style={{ 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    height: '520px',
                    background: '#FFFFF8',
                    boxShadow: 'var(--material-shadow-float)'
                }}
                variants={{
                    hover: { 
                        y: -8, 
                        scale: 1.005,
                        boxShadow: 'var(--material-shadow-deep)'
                    }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Image Container with Zoom Effect */}
                <div style={{ height: '70%', overflow: 'hidden', position: 'relative' }}>
                     <motion.img 
                        src={region.banner_image} 
                        alt={region.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        variants={{
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    {/* Inner Shadow Gradient */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
                </div>

                {/* Content Block */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <MapPin size={14} color="var(--color-spatial-accent)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-spatial-accent)', textTransform: 'uppercase' }}>
                                    Region 0{region.id}
                                </span>
                            </div>
                            <h3 className="text-h2" style={{ fontSize: '2rem', marginBottom: '8px' }}>{region.name}</h3>
                        </div>
                        
                        <motion.div 
                            variants={{ hover: { x: 4, opacity: 1 } }}
                            initial={{ opacity: 0.5 }}
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                border: '1px solid rgba(0,0,0,0.1)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}
                        >
                            <ArrowRight size={18} color="var(--color-spatial-text)" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Explore;
