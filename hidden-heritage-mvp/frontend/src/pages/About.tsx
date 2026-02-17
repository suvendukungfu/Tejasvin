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
    const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div ref={containerRef} style={{ background: '#F9F7F2', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: '#2A2A2A' }}>
            <NavBar />

            {/* Global Film Grain & Ambient Gradient */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 10%, rgba(184, 149, 80, 0.08), transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* --- CHAPTER 01: ORIGIN ("BORN FROM DUST") --- */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
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
                             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F9F7F2 0%, transparent 20%)', zIndex: 2 }} />
                             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F9F7F2 0%, transparent 10%, transparent 80%, #F9F7F2 100%)', zIndex: 2 }} />
                             <motion.img 
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1000&auto=format&fit=crop" 
                                alt="Ancient Texture" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px 0 0 4px', filter: 'sepia(0.2) contrast(1.1) brightness(0.9)' }} 
                            />
                        </div>
                    </div>
                </div>
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
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                style={{ 
                                    minWidth: '350px', 
                                    height: '500px', 
                                    position: 'relative', 
                                    scrollSnapAlign: 'start',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    cursor: 'grab',
                                    flexShrink: 0
                                }}
                                whileHover={{ scale: 0.98 }}
                            >
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1, transition: 'background 0.3s' }} className="hover-overlay" />
                                <img 
                                    src={site.image} 
                                    alt={site.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                                
                                {/* Data Overlay */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                                         <h3 style={{ color: 'white', fontSize: '1.25rem', fontFamily: 'serif', margin: 0 }}>{site.title}</h3>
                                         <span style={{ color: '#B89550', fontSize: '0.65rem', fontWeight: 700, border: '1px solid #B89550', padding: '2px 6px' }}>{site.id}</span>
                                    </div>
                                    <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.2)', margin: '0.5rem 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }}>
                                        <span>{site.type}</span>
                                        <span>{site.condition}</span>
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
                                        desc: "We use photogrammetry and L.I.D.A.R. to capture every crack and carving.",
                                        icon: <Shield size={20} />,
                                        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" // Tech/Grid
                                    },
                                    {
                                        title: "Oral History Integration",
                                        desc: "A temple is more than stone. We priority local legends and the human spirit.",
                                        icon: <History size={20} />,
                                        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop" // Writing/Paper
                                    },
                                    {
                                        title: "Sustainable Economics",
                                        desc: "Our revenue model directly funds local custodians and protecting communities.",
                                        icon: <Globe size={20} />,
                                        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop" // Hands/Texture
                                    }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        style={{ 
                                            background: '#F9F7F2',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Top Image */}
                                        <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) desaturate(0.2)' }} />
                                        </div>

                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ color: '#B89550', marginBottom: '1rem' }}>{item.icon}</div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#2A2A2A', fontWeight: 600 }}>{item.title}</h3>
                                            <p style={{ color: '#6D6D6D', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.desc}</p>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {[
                            { 
                                step: "01", title: "Portal", icon: <Compass size={24} />, text: "Access to the hidden world. A curated entry point for explorers.", color: "#B89550",
                                image: "https://images.unsplash.com/photo-1502472584811-0a2f2ca8f9cf?q=80&w=1000&auto=format&fit=crop" // Doorway/Light 
                            },
                            { 
                                step: "02", title: "Atlas", icon: <Map size={24} />, text: "Mapping the unmapped. Geospatial data meets historical narrative.", color: "#4ADE80",
                                image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" // Map/Topography
                            },
                            { 
                                step: "03", title: "Journal", icon: <BookOpen size={24} />, text: "Documenting the narrative. Field notes from the preservationists.", color: "#60A5FA",
                                image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto=format&fit=crop" // Journal/Handwriting
                            },
                            { 
                                step: "04", title: "Context", icon: <Database size={24} />, text: "Deep cultural understanding. Connecting the dots of our heritage.", color: "#F472B6",
                                image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1000&auto=format&fit=crop" // Connections/History
                            }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i, duration: 0.6 }}
                                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                style={{ 
                                    padding: '2rem', 
                                    background: 'rgba(255,255,255,0.03)', 
                                    backdropFilter: 'blur(10px)', 
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '320px',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Cinematic Background Image */}
                                <div style={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    opacity: 0.15, 
                                    backgroundImage: `url(${s.image})`, 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center', 
                                    filter: 'grayscale(100%) contrast(1.2)',
                                    transition: 'transform 0.5s ease-out'
                                }} />
                                
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: s.color, opacity: 0.5, zIndex: 2 }} />
                                
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)', marginBottom: '1rem', fontFamily: 'serif' }}>{s.step}</div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', color: 'white' }}>{s.title}</h4>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{s.text}</p>
                                </div>
                                <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', position: 'relative', zIndex: 2 }}>
                                    {s.icon}
                                </div>
                            </motion.div>
                        ))}
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
