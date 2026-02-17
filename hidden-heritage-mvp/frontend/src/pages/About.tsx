import NavBar from '../components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Shield, History, Map, Database, Compass, BookOpen, ChevronRight, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';



const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Smooth Parallax for Hero
    // const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
    // const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div ref={containerRef} style={{ background: '#F9F7F2', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: '#2A2A2A' }}>
            <NavBar />

            {/* Global Film Grain & Ambient Gradient */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 10%, rgba(184, 149, 80, 0.08), transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* --- CHAPTER 01: ORIGIN (Spatial Split) --- */}
            <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                    <div className="grid-12" style={{ alignItems: 'center' }}>
                        {/* 1.1 Text Layer (Left) */}
                        <div style={{ gridColumn: 'span 5' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                            >
                                <span className="glass-pill" style={{ marginBottom: '2rem', display: 'inline-block' }}>
                                    Chapter 01 — Origin
                                </span>
                                <h1 className="text-display" style={{ marginBottom: '2.5rem', fontFamily: 'serif' }}>
                                    Born from <br/> <span className="text-gold" style={{ fontStyle: 'italic' }}>Dust & Data.</span>
                                </h1>
                                <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
                                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--color-spatial-text)' }}>
                                        "It started in the quiet of a crumbling stepwell. We realized that if we didn't document this now, the story would vanish with the stone. <strong style={{ fontWeight: 600 }}>Hidden Heritage is our vow to remember.</strong>"
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* 1.2 Cinematic Layer (Right) */}
                        <div style={{ gridColumn: '7 / span 6', height: '80vh', position: 'relative' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0, 0, 1] }}
                                style={{ height: '100%', width: '100%', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: 'var(--material-shadow-deep)' }}
                            >
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)', zIndex: 1 }} />
                                <motion.img 
                                    src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Ancient Texture" 
                                    style={{ width: '100%', height: '110%', objectFit: 'cover', transform: 'translateY(-5%)' }} 
                                    animate={{ y: ["-5%", "0%"] }} 
                                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                                />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 2 }}>
                                    <span style={{ fontSize: '0.75rem', color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>FIG. 01 — THE TEXTURE OF TIME</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Background Ambient Blur */}
                <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '50vw', height: '50vw', background: '#B08D55', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
            </section>

            {/* --- CHAPTER 02: THE PROBLEM ("DATA ROT") --- */}
            <section style={{ padding: '140px 0', position: 'relative' }}>
                <div className="container">
                    <div className="grid-12" style={{ alignItems: 'center' }}>
                        <div style={{ gridColumn: '1 / span 5', position: 'relative' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1 }}
                            >
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#F0EDE4', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: '#6D6D6D', textTransform: 'uppercase', marginBottom: '2rem' }}>
                                    <AlertTriangle size={14} color="#DC2626" /> Status: Critical
                                </div>
                                <h2 className="text-display" style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'serif', lineHeight: 1.1 }}>
                                    Memory is fragile. <br/> Rules are forgotten.
                                </h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#6D6D6D', marginBottom: '2rem' }}>
                                    Across the subcontinent, centuries of cultural memory are disappearing. Structures crumble, oral histories fade with the elders, and digital archives remain scattered across inaccessible silos.
                                </p>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#6D6D6D' }}>
                                    Without a unified, accessible platform, we risk losing the "why" behind the "what." A monument without its story is just a pile of rocks.
                                </p>
                            </motion.div>
                        </div>
                         
                        <div style={{ gridColumn: '7 / span 6' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                                style={{ position: 'relative' }}
                            >
                                {/* Glitch/Artifact Effect Overlay */}
                                <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(184, 149, 80, 0.3)', zIndex: 2, pointerEvents: 'none' }}>
                                    <div style={{ position: 'absolute', top: '10%', left: '-10px', background: '#B89550', color: 'white', fontSize: '0.6rem', padding: '2px 6px', fontWeight: 700 }}>IMG_ERR_404</div>
                                    <div style={{ position: 'absolute', bottom: '20px', right: '-20px', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} style={{ width: `${Math.random() * 40 + 10}px`, height: '2px', background: '#B89550', opacity: 0.5 }} />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(255,0,0,0.1), transparent)', mixBlendMode: 'overlay', zIndex: 1 }} />
                                    <img 
                                        src="https://images.unsplash.com/photo-1605649487215-476786814582?q=80&w=1200&auto=format&fit=crop" 
                                        alt="Fading History" 
                                        style={{ width: '100%', filter: 'grayscale(0.8) contrast(1.2) brightness(0.9)', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.15)' }} 
                                    />
                                    {/* Scanlines */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.05) 3px)', pointerEvents: 'none' }} />
                                </div>

                                <div style={{ position: 'absolute', top: -30, right: 30, background: '#F9F7F2', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '2px', zIndex: 5 }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: '#B89550', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Erosion Rate</div>
                                    <div style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2A2A2A', lineHeight: 1 }}>84%</div>
                                    <div style={{ fontSize: '0.7rem', color: '#6D6D6D', marginTop: '0.25rem' }}>Uncatalogued Sites</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 02.5: FIELD DATA ("THE ARCHIVE") --- */}
            <section style={{ padding: '0 0 140px', position: 'relative' }}>
                <div className="container">
                    <div style={{ marginBottom: '60px', paddingLeft: '2rem', borderLeft: '1px solid #B89550' }}>
                         <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 800, color: '#B89550', marginBottom: '1rem' }}>
                            Chapter 02.5 — Field Data
                        </span>
                        <h2 className="text-display" style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#2A2A2A' }}>Sites in Focus.</h2>
                    </div>

                    {/* Scrollable Gallery Container */}
                    <div 
                        style={{ 
                            display: 'flex', 
                            gap: '24px', 
                            overflowX: 'auto', 
                            paddingBottom: '2rem',
                            scrollSnapType: 'x mandatory',
                            paddingRight: '2rem',
                            // Hide scrollbar for cleaner look but allow scrolling
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none',  /* IE and Edge */
                        }}
                        className="hide-scrollbar"
                    >
                        <style>{`
                            .hide-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>

                        {[
                            {
                                id: "KH-01",
                                title: "Rani ki Vav",
                                type: "Subterranean Stepwell",
                                condition: "Silt Clearing",
                                image: "https://images.unsplash.com/photo-1590050252973-772a6bc3f356?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "MH-02",
                                title: "Ajanta Caves",
                                type: "Buddhist Rock-cut",
                                condition: "Humidity Control",
                                image: "https://images.unsplash.com/photo-1563503204-7ea9e6931538?q=80&w=800&auto=format&fit=crop"
                            },
                             {
                                id: "RJ-23",
                                title: "Amer Fort",
                                type: "Rajput-Mughal Fusion",
                                condition: "Footfall Management",
                                image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "MP-14",
                                title: "Khajuraho",
                                type: "Sandstone Relief",
                                condition: "Chemical Cleaning",
                                image: "https://images.unsplash.com/photo-1628068770764-c09a834274c4?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "TN-11",
                                title: "Meenakshi Temple",
                                type: "Dravidian Gopuram",
                                condition: "Polychrome Restoration",
                                image: "https://images.unsplash.com/photo-1582510003544-79c43b98c69c?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "RJ-55",
                                title: "Jaisalmer Fort",
                                type: "Living Fortification",
                                condition: "Sewage Drainage Fix",
                                image: "https://images.unsplash.com/photo-1572886694856-78b174548464?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "RJ-88",
                                title: "Kumbhalgarh",
                                type: "Fortification Walls",
                                condition: "Structural Stabilization",
                                image: "https://images.unsplash.com/photo-1591564344421-e37456ccb975?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "OR-09",
                                title: "Konark Sun Temple",
                                type: "Kalinga Architecture",
                                condition: "Erosion Monitoring",
                                image: "https://images.unsplash.com/photo-1598007255979-5773199f38f4?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "KA-22",
                                title: "Hampi Ruins",
                                type: "Vijayanagara Style",
                                condition: "Laser Scanning",
                                image: "https://images.unsplash.com/photo-1620766182966-c6eb3d35b917?q=80&w=800&auto=format&fit=crop"
                            },
                            {
                                id: "MH-05",
                                title: "Ellora Caves",
                                type: "Monolithic Excavation",
                                condition: "Water Seepage Check",
                                image: "https://images.unsplash.com/photo-1566826622766-382a89304e22?q=80&w=800&auto=format&fit=crop"
                            }
                        ].map((site, i) => (
                             <motion.div
                                key={i}
                                className="glass-panel"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
                                whileHover={{ scale: 1.02 }}
                                style={{ 
                                    minWidth: '360px', 
                                    height: '540px', 
                                    position: 'relative', 
                                    overflow: 'hidden', 
                                    padding: 0,
                                    cursor: 'pointer' 
                                }}
                            >
                                <div style={{ position: 'absolute', inset: 0 }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)', zIndex: 1 }} />
                                    <img 
                                        src={site.image} 
                                        alt={site.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.2, 0, 0, 1)' }} 
                                        className="hover-image"
                                    />
                                </div>
                                
                                {/* Data Overlay (VisionOS Style) */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', zIndex: 2 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                         <h3 style={{ color: 'white', fontSize: '2rem', fontFamily: 'serif', margin: 0, lineHeight: 1 }}>{site.title}</h3>
                                         <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '100px', backdropFilter: 'blur(4px)' }}>{site.id}</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '6px', height: '6px', background: '#B08D55', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{site.type}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{site.condition}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Scroll Indicator */}
                    <div style={{ display: 'flex', gap: '8px', paddingLeft: '2rem', marginTop: '0.5rem', opacity: 0.5, alignItems: 'center' }}>
                        <div style={{ height: '1px', width: '40px', background: '#B89550' }} />
                        <span style={{ fontSize: '0.65rem', color: '#2A2A2A', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Drag to Explore Archive</span>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 03: THE PHILOSOPHY --- */}
            <section style={{ padding: '120px 0', background: '#F2EFE9', position: 'relative' }}>
                 <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 4' }}>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 800, color: '#B89550' }}>Chapter 03 — Philosophy</span>
                            <h2 className="text-display" style={{ fontSize: '2.5rem', marginTop: '1rem', fontFamily: 'serif' }}>The Triad of Preservation.</h2>
                        </div>
                        <div style={{ gridColumn: '6 / span 7' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                                {[
                                    {
                                        title: "High-Fidelity Archiving",
                                        desc: "We use photogrammetry and L.I.D.A.R. to capture every crack and carving, ensuring no artifact is lost to erosion.",
                                        icon: <Shield size={18} />,
                                        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
                                    },
                                    {
                                        title: "Oral History Integration",
                                        desc: "A temple is more than stone. We priority local legends and the human spirit that breathes life into the monument.",
                                        icon: <History size={18} />,
                                        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop" 
                                    },
                                    {
                                        title: "Sustainable Economics",
                                        desc: "Our revenue model directly funds local custodians, creating a circular economy that rewards preservation.",
                                        icon: <Globe size={18} />,
                                        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop" 
                                    }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="glass-panel"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
                                        whileHover={{ y: -8 }}
                                        style={{ 
                                            padding: 0,
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%'
                                        }}
                                    >
                                        {/* Top Image Area */}
                                        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                                             <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.2)' }} />
                                             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                                        </div>

                                        {/* Content Area */}
                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.4)' }}>
                                            <div className="glass-pill" style={{ 
                                                width: 'fit-content', 
                                                marginBottom: '1.5rem', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px',
                                                background: 'white',
                                                border: 'none',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                            }}>
                                                <span style={{ color: '#B08D55' }}>{item.icon}</span>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2A2A2A' }}>FRAMEWORK 0{i+1}</span>
                                            </div>
                                            
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1C1917', fontFamily: 'serif', lineHeight: 1.1 }}>{item.title}</h3>
                                            <p style={{ color: '#4A4A4A', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                             </div>
                        </div>
                    </div>
                 </div>
            </section>

            {/* --- CHAPTER 04: THE SYSTEM ("GLASS CARDS") --- */}
            <section style={{ padding: '160px 0', background: '#1A1A1A', color: '#F9F7F2', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
                     <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6, marginBottom: '16px' }}>
                                Chapter 04 — The System
                            </span>
                            <h2 className="text-display" style={{ fontSize: '3rem', color: 'white', fontFamily: 'serif' }}>Operational Workflow</h2>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                            <Cpu size={14} /> SYSTEM_ONLINE
                        </div>
                    </div>

                    {/* Timeline Container */}
                    <div style={{ position: 'relative', padding: '40px 0' }}>
                        {/* Connecting Line (Absolute) */}
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #B08D55, transparent)', opacity: 0.3, zIndex: 0 }} />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', position: 'relative', zIndex: 1 }}>
                            {[
                                { 
                                    step: "01", title: "Portal", icon: <Compass size={28} />, text: "Access to the hidden world. A curated entry point for explorers.", color: "#B89550",
                                    image: "https://images.unsplash.com/photo-1502472584811-0a2f2ca8f9cf?q=80&w=600&auto=format&fit=crop" 
                                },
                                { 
                                    step: "02", title: "Atlas", icon: <Map size={28} />, text: "Mapping the unmapped. Geospatial data meets historical narrative.", color: "#4ADE80",
                                    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                                },
                                { 
                                    step: "03", title: "Journal", icon: <BookOpen size={28} />, text: "Documenting the narrative. Field notes from the preservationists.", color: "#60A5FA",
                                    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=600&auto=format&fit=crop" 
                                },
                                { 
                                    step: "04", title: "Context", icon: <Database size={28} />, text: "Deep cultural understanding. Connecting dots of our heritage.", color: "#F472B6",
                                    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop" 
                                }
                            ].map((s, i) => (
                                <motion.div 
                                    key={i}
                                    className="glass-panel"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.2, 0, 0, 1] }}
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    style={{ 
                                        padding: 0,
                                        height: '380px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {/* Image Bg */}
                                    <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                                        <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                                    </div>

                                    {/* Step Number Badge */}
                                    <div style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.05)', lineHeight: 0.8, fontFamily: 'serif' }}>
                                        {s.step}
                                    </div>
                                    
                                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 2 }}>
                                        <div style={{ 
                                            width: '56px', height: '56px', 
                                            borderRadius: '50%', 
                                            background: 'rgba(255,255,255,0.1)', 
                                            backdropFilter: 'blur(10px)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginBottom: '1.5rem',
                                            border: `1px solid ${s.color}`,
                                            color: s.color,
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                                        }}>
                                            {s.icon}
                                        </div>
                                        
                                        <h4 style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '0.75rem', color: 'white' }}>{s.title}</h4>
                                        <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, color: '#D4D4D4' }}>{s.text}</p>
                                    </div>
                                    
                                    {/* Connecting Dot on Bottom Edge */}
                                    {i !== 3 && (
                                         <div style={{ position: 'absolute', top: '50%', right: '-16px', transform: 'translateY(-50%)', zIndex: 10 }}>
                                            <div style={{ width: '8px', height: '8px', background: '#B08D55', borderRadius: '50%', boxShadow: '0 0 10px #B08D55' }} />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* --- CHAPTER 05: INVITATION ("PREMIUM FOOTER") --- */}
             <section style={{ padding: '180px 0 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '600px', background: 'radial-gradient(circle at 50% 100%, rgba(184, 149, 80, 0.15), transparent 70%)', pointerEvents: 'none' }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ maxWidth: '800px', margin: '0 auto' }}
                    >
                         <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', opacity: 0.6 }}>
                            <div style={{ height: '1px', width: '40px', background: '#2A2A2A' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: '#2A2A2A' }}>Chapter 05 — Invitation</span>
                            <div style={{ height: '1px', width: '40px', background: '#2A2A2A' }} />
                        </div>

                        <h2 className="text-display" style={{ marginBottom: '2.5rem', fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: 'serif', color: '#2A2A2A', lineHeight: 1.1 }}>
                            The archives are open. <br/>
                            <span style={{ color: '#B89550', fontStyle: 'italic' }}>Are you ready?</span>
                        </h2>
                        
                        <p style={{ fontSize: '1.25rem', color: '#6D6D6D', marginBottom: '4rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto 4rem' }}>
                            "Step into the living archive. Your journey into the forgotten begins now. Contribute to the preservation of our shared history."
                        </p>

                        <motion.button 
                            onClick={() => navigate('/register')} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ 
                                padding: '1.5rem 4rem', 
                                fontSize: '1rem', 
                                fontWeight: 700, 
                                background: '#2A2A2A', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '100px', 
                                cursor: 'pointer',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            Join the Expedition <ChevronRight size={16} />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default About;
