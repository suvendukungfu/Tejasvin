import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapPin, ArrowRight, Compass, Map as MapIcon, Grid } from 'lucide-react';
import { getRegions } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet Icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Cinematic Assets
import gwaliorFort from '../assets/heritage/gwalior_fort.png';
// Import textures if available, otherwise fallback
import holographicGrid from '../assets/textures/holographic_grid.png';

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

const Explore = () => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await getRegions();
                // Mock coordinates for demo if not present
                const dataWithCoords = response.data.map((r: Region, _i: number) => ({
                    ...r,
                    latitude: r.latitude || 26.2183 + (Math.random() * 0.5 - 0.25),
                    longitude: r.longitude || 78.1828 + (Math.random() * 0.5 - 0.25)
                }));
                setRegions(dataWithCoords || []);
            } catch (error) {
                console.error('Failed to fetch regions', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    if (loading) return <Loader />;

    const featuredRegion = regions[0];

    return (
        <motion.div 
            ref={containerRef} 
            className="min-h-screen" 
            style={{ 
                background: 'var(--color-spatial-bg)', 
                perspective: '2000px',
                backgroundImage: `url(${holographicGrid})`,
                backgroundSize: '500px',
                backgroundBlendMode: 'overlay'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.5 } }}
        >
            <NavBar />

            {/* --- HERO: DEEP FIELD --- */}
            <section style={{ height: '60vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.2), var(--color-spatial-bg))', zIndex: 1 }} />
                    <img src={gwaliorFort} alt="Exploration" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, filter: 'grayscale(0.2)' }} />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                     >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <Compass size={20} color="var(--color-spatial-accent)" />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-spatial-accent)' }}>
                                Planetary Archive
                            </span>
                        </div>
                        <h1 className="text-display" style={{ color: 'var(--color-spatial-text)', maxWidth: '800px', marginBottom: '40px' }}>
                            Select a <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-spatial-accent)' }}>Coordinate.</span>
                        </h1>

                        {/* Controls Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                            {/* Filter Pill */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--material-glass)',
                                    backdropFilter: 'blur(16px)',
                                    padding: '8px 8px 8px 24px',
                                    borderRadius: '100px',
                                    border: 'var(--material-glass-border)',
                                    boxShadow: 'var(--material-shadow-float)'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-spatial-text)', fontWeight: 500 }}>All Sectors</span>
                                <div style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.1)', margin: '0 8px' }} />
                                <button style={{ 
                                    background: 'var(--color-spatial-text)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '100px', 
                                    padding: '8px 20px', 
                                    fontSize: '0.8rem', 
                                    fontWeight: 600, 
                                    cursor: 'pointer' 
                                }}>
                                    FILTER
                                </button>
                            </motion.div>

                            {/* View Toggle */}
                            <div style={{ 
                                display: 'flex', 
                                background: 'rgba(255,255,255,0.5)', 
                                backdropFilter: 'blur(10px)', 
                                borderRadius: '100px', 
                                padding: '4px',
                                border: '1px solid rgba(0,0,0,0.05)' 
                            }}>
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    style={{ 
                                        padding: '8px 16px', 
                                        borderRadius: '100px', 
                                        border: 'none', 
                                        background: viewMode === 'grid' ? 'var(--color-spatial-text)' : 'transparent', 
                                        color: viewMode === 'grid' ? 'white' : 'var(--color-spatial-text)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Grid size={16} /> Grid
                                </button>
                                <button 
                                    onClick={() => setViewMode('map')}
                                    style={{ 
                                        padding: '8px 16px', 
                                        borderRadius: '100px', 
                                        border: 'none', 
                                        background: viewMode === 'map' ? 'var(--color-spatial-text)' : 'transparent', 
                                        color: viewMode === 'map' ? 'white' : 'var(--color-spatial-text)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <MapIcon size={16} /> Map
                                </button>
                            </div>
                        </div>
                     </motion.div>
                </div>
            </section>

            {/* --- CONTENT AREA --- */}
            <section style={{ padding: '0 0 160px 0', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    
                    {/* Featured Section (Only in Grid View) */}
                    {viewMode === 'grid' && featuredRegion && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ marginBottom: '80px' }}
                        >
                            <div style={{ 
                                borderRadius: '32px', 
                                overflow: 'hidden', 
                                position: 'relative', 
                                height: '500px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                boxShadow: 'var(--material-shadow-float)'
                            }}>
                                <img 
                                    src={featuredRegion.banner_image} 
                                    alt={featuredRegion.name} 
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                                
                                <div style={{ position: 'relative', padding: '48px', color: 'white', maxWidth: '600px', zIndex: 10 }}>
                                    <span style={{ 
                                        background: 'var(--color-accent)', 
                                        color: 'var(--color-primary)', 
                                        padding: '6px 16px', 
                                        borderRadius: '100px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        marginBottom: '16px',
                                        display: 'inline-block'
                                    }}>
                                        Featured Sector
                                    </span>
                                    <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>{featuredRegion.name}</h2>
                                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '24px', lineHeight: 1.6 }}>{featuredRegion.description}</p>
                                    <button 
                                        onClick={() => navigate(`/region/${featuredRegion.slug}`)}
                                        style={{ 
                                            background: 'white', 
                                            color: 'black', 
                                            padding: '12px 32px', 
                                            borderRadius: '100px', 
                                            border: 'none', 
                                            fontSize: '0.9rem', 
                                            fontWeight: 700, 
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        Inspect Sector <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {viewMode === 'grid' ? (
                            <motion.div 
                                key="grid"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                className="grid-12"
                            >
                                {regions.map((region) => (
                                    <HolographicCard key={region.id} region={region} navigate={navigate} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="map"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                style={{ height: '70vh', borderRadius: '32px', overflow: 'hidden', boxShadow: 'var(--material-shadow-float)', border: '4px solid white' }}
                            >
                                <MapContainer center={[26.2183, 78.1828]} zoom={8} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution='Tiles &copy; Esri'
                                    />
                                    <TileLayer 
                                         url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png"
                                         attribution='Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                                         opacity={0.4}
                                    />
                                    {regions.map((region) => (
                                        <Marker 
                                            key={region.id} 
                                            position={[region.latitude || 26.2183, region.longitude || 78.1828]}
                                            eventHandlers={{
                                                click: () => {
                                                    navigate(`/region/${region.slug}`);
                                                },
                                            }}
                                        >
                                            <Popup>
                                                <div style={{ textAlign: 'center' }}>
                                                    <strong>{region.name}</strong><br/>
                                                    {region.sites_count} Sites
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            
            <Footer />
        </motion.div>
    );
};

// --- HOLOGRAPHIC TILT CARD ---
const HolographicCard = ({ region, navigate }: { region: Region, navigate: any }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ gridColumn: 'span 6', perspective: '1200px', marginBottom: '64px' }}>
            <motion.div
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(`/region/${region.slug}`)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
            >
                <div style={{ 
                    position: 'relative', 
                    height: '500px', 
                    borderRadius: '32px', 
                    overflow: 'hidden',
                    background: 'var(--material-glass)',
                    backdropFilter: 'var(--material-blur)',
                    boxShadow: 'var(--material-shadow-float)',
                    border: 'var(--material-glass-border)'
                }}>
                    {/* Image Layer */}
                    <div style={{ height: '65%', position: 'relative', overflow: 'hidden' }}>
                        <img 
                            src={region.banner_image || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200"} 
                            alt={region.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                    </div>

                    {/* Content Layer (Glass) */}
                    <div style={{ 
                        padding: '32px', 
                        transform: 'translateZ(20px)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', opacity: 0.8 }}>
                                    <MapPin size={16} color="var(--color-spatial-text)" />
                                    <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-spatial-text)' }}>Region Sector</span>
                                </div>
                                <h3 className="text-h2" style={{ color: 'var(--color-spatial-text)', fontSize: '2rem', marginBottom: '12px' }}>{region.name}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5, fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {region.description}
                                </p>
                            </div>
                            
                            <motion.div 
                                whileHover={{ rotate: -45 }}
                                style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    borderRadius: '50%', 
                                    background: 'var(--color-spatial-text)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}
                            >
                                <ArrowRight size={20} color="white" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Explore;
