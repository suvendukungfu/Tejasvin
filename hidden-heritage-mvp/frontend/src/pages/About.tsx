import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';
import { Globe, Shield, History, Map, Database, Compass, BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const About = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#F9F7F2', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: '#2A2A2A' }}>
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
                                    Our Story
                                </span>
                                <h1 className="text-display" style={{ marginBottom: '2.5rem', fontFamily: 'serif' }}>
                                    Born from <br/> <span className="text-gold" style={{ fontStyle: 'italic' }}>Dust & Memories.</span>
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
                                    src="/src/assets/heritage/bateshwar.png" 
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
                                    <AlertTriangle size={14} color="#DC2626" /> The Challenge
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
                                 <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', boxShadow: 'var(--material-shadow-deep)' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(255,0,0,0.1), transparent)', mixBlendMode: 'overlay', zIndex: 1 }} />
                                    <img 
                                        src="/src/assets/heritage/gwalior_fort.png" 
                                        alt="Fading History" 
                                        style={{ width: '100%', filter: 'grayscale(0.2) contrast(1.1)', display: 'block' }} 
                                    />
                                    {/* Scanlines */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.05) 3px)', pointerEvents: 'none' }} />
                                </div>

                                {/* Cinematic KPI Card */}
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="glass-panel"
                                    style={{ 
                                        position: 'absolute', 
                                        top: '10%', 
                                        right: '-40px', 
                                        padding: '2rem', 
                                        background: 'rgba(255, 255, 248, 0.8)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(184, 149, 80, 0.3)', 
                                        zIndex: 5,
                                        maxWidth: '220px'
                                    }}
                                >
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: '#B89550', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', boxShadow: '0 0 8px #DC2626' }}></div>
                                        Erosion Rate
                                    </div>
                                    <div style={{ fontSize: '3rem', fontFamily: 'serif', color: '#2A2A2A', lineHeight: 1, letterSpacing: '-0.02em' }}>84%</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6D6D6D', marginTop: '0.5rem', lineHeight: 1.4 }}>Of secondary sites remain uncatalogued or damaged.</div>
                                    
                                    {/* Decorative Line */}
                                    <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, #B89550, transparent)', marginTop: '1.5rem', opacity: 0.5 }}></div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 02.5: FIELD DATA ("THE ARCHIVE") --- */}
            <section style={{ padding: '0 0 160px', position: 'relative' }}>
                <div className="container">
                    <div style={{ marginBottom: '60px', paddingLeft: '2rem', borderLeft: '1px solid #B08D55' }}>
                         <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 800, color: '#B08D55', marginBottom: '1rem' }}>
                            Focus Areas
                        </span>
                        <h2 className="text-display" style={{ fontSize: '3.5rem', fontFamily: 'serif', color: '#2A2A2A', lineHeight: 1.1 }}>
                            Sites in Focus.
                        </h2>
                    </div>

                    {/* Scrollable Gallery Container */}
                    <div 
                        style={{ 
                            display: 'flex', 
                            gap: '32px', 
                            overflowX: 'auto', 
                            paddingBottom: '3rem',
                            paddingRight: '2rem',
                            scrollSnapType: 'x mandatory',
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        <style>{`
                            .hide-scrollbar::-webkit-scrollbar { display: none; }
                        `}</style>

                        {[
                            {
                                id: "MP-01",
                                title: "Bateshwar",
                                subtitle: "The Restoration of 200 Temples",
                                type: "Gurjara-Pratihara",
                                status: "Active Excavation",
                                image: "/src/assets/heritage/bateshwar.png"
                            },
                            {
                                id: "MP-02",
                                title: "Mitaoli",
                                subtitle: "Geometry of the Yogini Cult",
                                type: "Circular Tantric",
                                status: "Structural Analysis",
                                image: "/src/assets/heritage/mitaoli.png"
                            },
                            {
                                id: "MP-03",
                                title: "Gwalior Fort",
                                subtitle: "The Pearl of Fortresses",
                                type: "Hill Fort Complex",
                                status: "Conservation Mapping",
                                image: "/src/assets/heritage/gwalior_fort.png"
                            },
                            {
                                id: "MP-04",
                                title: "Chambal Valley",
                                subtitle: "Sanctuary of the Ravines",
                                type: "Natural Heritage",
                                status: "Ecological Survey",
                                image: "/src/assets/heritage/chambal_valley.png"
                            }
                        ].map((site, i) => (
                             <motion.div
                                key={i}
                                className="glass-panel"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1, delay: i * 0.15, ease: [0.2, 0, 0, 1] }}
                                whileHover="hover"
                                style={{ 
                                    minWidth: '420px', 
                                    height: '640px', 
                                    position: 'relative', 
                                    overflow: 'hidden', 
                                    padding: 0,
                                    cursor: 'pointer',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                                }}
                            >
                                <motion.div 
                                    style={{ position: 'absolute', inset: 0, zIndex: 0 }}
                                    variants={{ hover: { scale: 1.05 } }}
                                    transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                                >
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,25,23,0.95) 0%, rgba(28,25,23,0.6) 40%, transparent 100%)', zIndex: 1 }} />
                                    <img 
                                        src={site.image} 
                                        alt={site.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </motion.div>
                                
                                {/* Cinematic Data Overlay */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem', zIndex: 2 }}>
                                    <motion.div 
                                        variants={{ hover: { y: -8 } }}
                                        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: '#B08D55', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '0.5rem' }}>{site.subtitle}</span>
                                                <h3 style={{ color: '#EAE5DB', fontSize: '2.75rem', fontFamily: 'serif', margin: 0, lineHeight: 1 }}>{site.title}</h3>
                                            </div>
                                            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '100px', backdropFilter: 'blur(8px)' }}>{site.id}</span>
                                        </div>
                                        
                                        <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.15)', marginBottom: '1.5rem' }} />

                                        <div style={{ display: 'flex', gap: '24px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Archetype</span>
                                                <span style={{ fontSize: '0.9rem', color: '#EAE5DB', fontWeight: 500 }}>{site.type}</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</span>
                                                <span style={{ fontSize: '0.9rem', color: '#EAE5DB', fontWeight: 500 }}>{site.status}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Scroll Indicator */}
                    <div style={{ display: 'flex', gap: '8px', paddingLeft: '2rem', marginTop: '1rem', opacity: 0.6, alignItems: 'center' }}>
                        <div style={{ height: '1px', width: '60px', background: '#B08D55' }} />
                        <span style={{ fontSize: '0.7rem', color: '#57534E', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Drag to Explore Archive</span>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 03: THE PHILOSOPHY --- */}
            <section style={{ padding: '120px 0', background: '#F2EFE9', position: 'relative' }}>
                 <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 4' }}>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 800, color: '#B08D55' }}>Our Philosophy</span>
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

             {/* --- CHAPTER 03.5: FUTURE SCOPE ("SOUTH INDIA EXPANSION") --- */}
             <section style={{ padding: '160px 0', background: '#11100F', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle ambient glow */}
                <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(176,141,85,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    {/* Editorial Intro Block */}
                    <div style={{ marginBottom: '80px', maxWidth: '900px' }}>
                        <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.25rem', fontSize: '0.7rem', fontWeight: 800, color: '#B08D55', marginBottom: '1.5rem' }}>
                            Future Scope
                        </span>
                        <h2 className="text-display" style={{ fontSize: '3.5rem', fontFamily: 'serif', color: '#F9F7F2', lineHeight: 1.1, marginBottom: '2rem' }}>
                            South India Expansion. <br /> <span style={{ opacity: 0.4 }}>The Next Frontier.</span>
                        </h2>
                        <p style={{ color: 'rgba(249,247,242,0.5)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '700px' }}>
                            Hidden Heritage is expanding into the underexplored cultural zones of South India — from submerged port cities to hanging pillar temples. 
                            Our next expeditions focus on mystery, archaeology, adventure, and undocumented history that no guidebook covers.
                        </p>
                    </div>

                    {/* Horizontal Scroll Gallery */}
                    <div 
                        style={{ 
                            display: 'flex', 
                            gap: '28px', 
                            overflowX: 'auto', 
                            paddingBottom: '3rem',
                            scrollSnapType: 'x mandatory',
                            paddingRight: '2rem',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                        className="hide-scrollbar"
                    >
                         <style>{`
                            .hide-scrollbar::-webkit-scrollbar { display: none; }
                        `}</style>
                        
                        {[
                            { 
                                name: "Hampi (Anegundi)", 
                                state: "KA", 
                                region: "Karnataka", 
                                tag: "Lost Civilization", 
                                narrative: "A forgotten sister city across the river, where megalithic tombs whisper of a pre-Vijayanagara world yet to be mapped.",
                                activities: ["Ruins Trekking", "Rock Climbing", "Coracle Crossing"],
                                img: "/heritage/hampi.png" 
                            },
                            { 
                                name: "Gandikota", 
                                state: "AP", 
                                region: "Andhra Pradesh", 
                                tag: "Archaeological Mystery", 
                                narrative: "India's Grand Canyon hides a 13th-century fort on its rim. The Pennar River carved secrets into red gorge walls over millennia.",
                                activities: ["Canyon Rappelling", "Night Camping", "Kayaking"],
                                img: "/heritage/gandikota.png" 
                            },
                            { 
                                name: "Kurudumale", 
                                state: "KA", 
                                region: "Karnataka", 
                                tag: "Sacred Architecture", 
                                narrative: "A 14-foot monolithic Ganesha carved from a single black stone — said to still be growing. The temple pillars tell stories in stone.",
                                activities: ["Temple Photography", "Stone Carving Study", "Heritage Walk"],
                                img: "/heritage/kurudumale.png" 
                            },
                            { 
                                name: "Aranmula", 
                                state: "KL", 
                                region: "Kerala", 
                                tag: "Living Heritage", 
                                narrative: "The only place on Earth where metal mirrors are handcrafted from a secret alloy. The craft is dying with its last artisan families.",
                                activities: ["Artisan Workshop", "Snake Boat Race", "River Pilgrimage"],
                                img: "/heritage/aranmula.png" 
                            },
                            { 
                                name: "Velankanni Ghost Ship", 
                                state: "TN", 
                                region: "Tamil Nadu", 
                                tag: "Submerged Heritage", 
                                narrative: "A phantom vessel from the 2004 tsunami still lies half-buried in the sand. The coastline holds older secrets beneath the waves.",
                                activities: ["Coastal Archaeology", "Night Photography", "Marine Survey"],
                                img: "/heritage/velankanni.png" 
                            },
                            { 
                                name: "Lepakshi Hanging Pillar", 
                                state: "AP", 
                                region: "Andhra Pradesh", 
                                tag: "Architectural Mystery", 
                                narrative: "One pillar doesn't touch the ground. Engineers still can't explain why. The ceiling holds India's largest monolithic Naga hood.",
                                activities: ["Architecture Study", "Mural Documentation", "Heritage Mapping"],
                                img: "/heritage/lepakshi.png" 
                            },
                            { 
                                name: "Varanga Jain Village", 
                                state: "KA", 
                                region: "Karnataka", 
                                tag: "Sacred Architecture", 
                                narrative: "A 12th-century temple floats in the center of a lotus lake, accessible only by boat. The water lilies guard star-shaped geometry.",
                                activities: ["Boat Temple Visit", "Jain Heritage Trail", "Lake Photography"],
                                img: "/heritage/varanga.png" 
                            },
                            { 
                                name: "Arikamedu Roman Port", 
                                state: "PY", 
                                region: "Pondicherry", 
                                tag: "Lost Civilization", 
                                narrative: "Roman coins, Mediterranean pottery, and a 2,000-year-old bead factory. This was India's ancient gateway to the Roman Empire.",
                                activities: ["Archaeological Dig", "Bead Making Workshop", "Coastal Walk"],
                                img: "/heritage/arikamedu.png" 
                            },
                            { 
                                name: "Poompuhar Submerged City", 
                                state: "TN", 
                                region: "Tamil Nadu", 
                                tag: "Submerged Heritage", 
                                narrative: "An entire Chola port city lies beneath the Bay of Bengal. Sonar reveals harbors, lighthouses, and dockyards at 50-meter depths.",
                                activities: ["Marine Archaeology", "Underwater Survey", "Museum Visit"],
                                img: "/heritage/poompuhar.png" 
                            }
                        ].map((site, i) => (
                             <motion.div
                                key={i}
                                className="glass-panel"
                                initial={{ opacity: 0, x: 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                                whileHover="hover"
                                style={{ 
                                    minWidth: '380px', 
                                    height: '560px', 
                                    position: 'relative', 
                                    overflow: 'hidden', 
                                    padding: 0,
                                    cursor: 'pointer',
                                    scrollSnapAlign: 'start',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: '#1C1917',
                                    boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)'
                                }}
                            >
                                {/* Future Expedition Badge */}
                                <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 5, padding: '5px 10px', background: 'rgba(59, 130, 246, 0.85)', backdropFilter: 'blur(12px)', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 800, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 4px 16px rgba(59,130,246,0.35)' }}>
                                    Future Expedition
                                </div>

                                {/* Region State Badge */}
                                <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 5, padding: '5px 10px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {site.state}
                                </div>

                                {/* Image with parallax hover */}
                                <motion.div 
                                    style={{ position: 'absolute', inset: '-10px', zIndex: 0 }}
                                    variants={{ hover: { scale: 1.06 } }}
                                    transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
                                >
                                    {/* Cinematic gradient overlay */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #11100F 0%, rgba(17,16,15,0.7) 40%, rgba(17,16,15,0.2) 70%, transparent 100%)', zIndex: 1 }} />
                                    {/* Subtle warm vignette */}
                                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(17,16,15,0.4) 100%)', zIndex: 1 }} />
                                    <img 
                                        src={site.img} 
                                        alt={site.name} 
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'saturate(0.9) contrast(1.05)' }} 
                                    />
                                </motion.div>
                                
                                {/* Content Overlay */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', zIndex: 2 }}>
                                    <motion.div
                                        variants={{ hover: { y: -6 } }}
                                        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                                    >
                                        {/* Region + Category */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.65rem', color: '#B08D55', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>{site.region}</span>
                                            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{site.tag}</span>
                                        </div>

                                        {/* Site Name */}
                                        <h3 style={{ color: '#F9F7F2', fontSize: '1.85rem', fontFamily: 'serif', margin: '0 0 10px 0', lineHeight: 1.1 }}>{site.name}</h3>
                                        
                                        {/* Mysterious Narrative */}
                                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 16px 0', maxWidth: '320px' }}>{site.narrative}</p>

                                        {/* Adventure Activity Tags */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {site.activities.map((activity, j) => (
                                                <span key={j} style={{ 
                                                    fontSize: '0.65rem', 
                                                    color: 'rgba(255,255,255,0.7)', 
                                                    fontWeight: 600,
                                                    padding: '4px 10px', 
                                                    background: 'rgba(255,255,255,0.08)', 
                                                    borderRadius: '100px', 
                                                    backdropFilter: 'blur(4px)', 
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    letterSpacing: '0.02em'
                                                }}>
                                                    {activity}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div style={{ display: 'flex', gap: '8px', paddingLeft: '2rem', marginTop: '0.5rem', opacity: 0.4, alignItems: 'center' }}>
                        <div style={{ height: '1px', width: '60px', background: '#B08D55' }} />
                        <span style={{ fontSize: '0.65rem', color: '#F9F7F2', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Drag to Explore Future Expeditions</span>
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
                                How We Work
                            </span>
                            <h2 className="text-display" style={{ fontSize: '3rem', color: 'white', fontFamily: 'serif' }}>Our Approach</h2>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                            <Globe size={14} /> COMMUNITY_ACTIVE
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
                                    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop" 
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

             {/* --- CHAPTER 05: INVITATION ("THE PORTAL") --- */}
             <section style={{ height: '80vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1C1917 0%, transparent 50%, #1C1917 100%)', zIndex: 2 }} />
                    <img 
                        src="https://images.unsplash.com/photo-1599940824399-b87987ce179a?q=80&w=2000&auto=format&fit=crop" 
                        alt="Portal to History" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                        className="glass-panel"
                        style={{ 
                            maxWidth: '700px', 
                            margin: '0 auto', 
                            padding: '4rem', 
                            textAlign: 'center',
                            background: 'rgba(28, 25, 23, 0.65)', // Dark glass
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                         <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', opacity: 0.8 }}>
                            <div style={{ height: '1px', width: '30px', background: '#B08D55' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 600, color: '#B08D55' }}>Join the Movement</span>
                            <div style={{ height: '1px', width: '30px', background: '#B08D55' }} />
                        </div>

                        <h2 className="text-display" style={{ marginBottom: '2rem', fontSize: '3.5rem', fontFamily: 'serif', color: 'white', lineHeight: 1.1 }}>
                            The archives are open. <br/>
                            <span style={{ color: '#B08D55', fontStyle: 'italic' }}>Are you ready?</span>
                        </h2>
                        
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem', fontWeight: 300 }}>
                            "Step into the living archive. Contribute to the preservation of our shared history before it fades."
                        </p>

                        <motion.button 
                            onClick={() => navigate('/register')} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-cinema"
                            style={{ 
                                background: '#B08D55', 
                                color: 'white',
                                padding: '20px 48px',
                                boxShadow: '0 0 40px rgba(176, 141, 85, 0.4)'
                            }}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>Join the Expedition</span>
                            <ChevronRight size={18} />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default About;
