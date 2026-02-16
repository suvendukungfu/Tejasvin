import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Compass, Zap, Box } from 'lucide-react';

// Heritage Assets
import chambalValley from '../assets/heritage/chambal_valley.png';
import bateshwarTemples from '../assets/heritage/bateshwar.png';
import mitaoliThumb from '../assets/heritage/mitaoli.png';
import navigatorMap from '../assets/heritage/navigator.png';
import meaningBg from '../assets/heritage/chambal_valley.png'; // Fallback using existing asset since generation failed
// Ideally we would use: const meaningBg = "https://images.unsplash.com/photo-1519681393798-38e43269d877";

const Home = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // "Director's Cut" Smoothing (High damping for weight)
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25, restDelta: 0.001 });

    return (
        <div ref={containerRef} style={{ height: '500vh', background: 'var(--color-spatial-bg)' }}>
            <NavBar />

            {/* --- SCENE 1: THE ARRIVAL (PORTAL) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 10 }}>
                <ArrivalScene progress={smoothProgress} />
            </div>

            {/* --- SCENE 2: THE AWAKENING (NARRATIVE) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 20, pointerEvents: 'none' }}>
                <AwakeningScene progress={smoothProgress} />
            </div>

            {/* --- SCENE 3: THE EXPLORATION (GATEWAY) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 30, pointerEvents: 'none' }}>
                <ExplorationScene progress={smoothProgress} />
            </div>

            {/* --- SCENE 4: MEANING (IMPACT) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 40, pointerEvents: 'none' }}>
                <MeaningScene progress={smoothProgress} />
            </div>

            {/* Scroll Spacer */}
            <div style={{ height: '100vh' }} />
        </div>
    );
};

// --- SCENE 1: ARRIVAL ---
const ArrivalScene = ({ progress }: { progress: any }) => {
    const opacity = useTransform(progress, [0, 0.2], [1, 0]);
    const scale = useTransform(progress, [0, 0.2], [1.1, 1]); // Subtle zoom out
    const textY = useTransform(progress, [0, 0.2], ["0%", "-20%"]);

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Cinematic Background Layer */}
            <motion.div style={{ position: 'absolute', inset: 0, scale }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--color-spatial-bg)' }} />
                <img 
                    src={chambalValley} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        opacity: 0.8,
                        filter: 'grayscale(0.2) contrast(1.1)' 
                    }} 
                    alt="Chambal Atmosphere" 
                />
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'radial-gradient(circle at center, transparent 0%, var(--color-spatial-bg) 90%)' 
                }} />
            </motion.div>
            
            {/* Title Layer */}
            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.div style={{ y: textY }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '10px 20px', 
                            borderRadius: '100px', 
                            border: '1px solid rgba(26,26,26,0.1)', 
                            marginBottom: '32px',
                            background: 'rgba(249, 247, 242, 0.5)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Compass size={14} color="var(--color-spatial-accent)" />
                        <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 600, 
                            letterSpacing: '0.15em', 
                            textTransform: 'uppercase', 
                            color: 'var(--color-spatial-text)' 
                        }}>
                            Spatial Heritage OS v2.0
                        </span>
                    </motion.div>
                    
                    <h1 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'clamp(4rem, 10vw, 8rem)', 
                        lineHeight: 0.9, 
                        letterSpacing: '-0.04em',
                        color: 'var(--color-spatial-text)',
                        marginBottom: '24px'
                    }}>
                        Hidden<br/>
                        <span style={{ color: 'var(--color-spatial-accent)', fontStyle: 'italic' }}>Heritage</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: '1.25rem', 
                        maxWidth: '540px', 
                        margin: '0 auto', 
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6
                    }}>
                        A digital dimension for the forgotten architectures of India. Enter the neural archive.
                    </p>
                </motion.div>
            </div>
            
            {/* Scroll Hint */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', bottom: '48px', opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Initialize</span>
                <div style={{ width: '1px', height: '40px', background: 'var(--color-spatial-text)' }} />
            </motion.div>
        </motion.section>
    );
};

// --- SCENE 2: AWAKENING (EDITORIAL) ---
const AwakeningScene = ({ progress }: { progress: any }) => {
    // Scroll Triggers
    const opacity = useTransform(progress, [0.15, 0.25, 0.5, 0.6], [0, 1, 1, 0]);
    const xLeft = useTransform(progress, [0.15, 0.35], [-50, 0]);
    const xRight = useTransform(progress, [0.15, 0.35], [50, 0]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.2 && v < 0.6 ? 'auto' : 'none'));

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, pointerEvents, background: 'var(--color-spatial-bg)', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ width: '100%' }}>
                <div className="grid-12" style={{ alignItems: 'center' }}>
                    
                    {/* Left: Typography */}
                    <motion.div style={{ gridColumn: 'span 5', x: xLeft }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                            <span style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'var(--color-spatial-accent)', lineHeight: 0.5 }}>01</span>
                            <div style={{ height: '1px', flex: 1, background: 'var(--color-spatial-text)', opacity: 0.2 }}></div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Awakening</span>
                        </div>
                        
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '32px' }}>
                            History is not <br/>
                            <span style={{ fontStyle: 'italic', opacity: 0.5 }}>static data.</span>
                        </h2>
                        
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '40px', color: 'var(--color-text-secondary)' }}>
                            We have reconstructed the Chambal Valley not as a list of sites, but as a living signal. Through advanced photogrammetry and narrative intelligence, the distinct timeline of the <strong style={{ color: 'var(--color-spatial-text)' }}>Gurjara-Pratihara</strong> era is brought into focus.
                        </p>

                        <div style={{ display: 'flex', gap: '32px' }}>
                             <div style={{ flex: 1, padding: '24px', background: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>200+</div>
                                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>Temples Mapped</div>
                             </div>
                             <div style={{ flex: 1, padding: '24px', background: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>9th</div>
                                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>Century Origins</div>
                             </div>
                        </div>
                    </motion.div>

                    {/* Right: Spatial Object */}
                    <motion.div style={{ gridColumn: '7 / span 6', height: '600px', position: 'relative', x: xRight }}>
                         <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', overflow: 'hidden' }}>
                            <img src={bateshwarTemples} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Bateshwar" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(200, 163, 89, 0.2), transparent)' }} />
                         </div>
                         
                         {/* Floating Caption Node */}
                         <motion.div 
                            style={{ 
                                position: 'absolute', 
                                bottom: '40px', 
                                left: '-40px', 
                                background: 'var(--material-glass)', 
                                backdropFilter: 'blur(20px)',
                                padding: '24px',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.5)',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                                maxWidth: '280px'
                            }}
                            whileHover={{ y: -5 }}
                         >
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-spatial-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                                Restoration Site
                            </span>
                            <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                                The Bateshwar complex: 200 temples restored from rubble by the ASI. A triumph of archaeological engineering.
                            </p>
                         </motion.div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
};

// --- SCENE 3: EXPLORATION (GATEWAYS) ---
const ExplorationScene = ({ progress }: { progress: any }) => {
    const opacity = useTransform(progress, [0.5, 0.6, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(progress, [0.5, 0.6], [0.95, 1]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.6 && v < 0.9 ? 'auto' : 'none'));
    const navigate = useNavigate();

    const portals = [
        { 
            id: 'atlas',
            title: "The Atlas", 
            subtitle: "Deep Index", 
            desc: "Explore the complete database of heritage sites via holographic map.", 
            path: "/explore",
            image: navigatorMap,
            icon: Compass
        },
        { 
            id: 'artifact',
            title: "The Artifact", 
            subtitle: "AR Portal", 
            desc: "Examine 3D scanned relics in a spatial environment.", 
            path: "/antigravity",
            image: mitaoliThumb,
            icon: Box
        },
        { 
            id: 'journal',
            title: "The Journal", 
            subtitle: "Expeditions", 
            desc: "Plan your physical journey into the valley.", 
            path: "/book",
            image: chambalValley,
            icon: Zap
        }
    ];

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, scale, pointerEvents, background: 'var(--color-spatial-void)', color: 'white', display: 'flex', alignItems: 'center' }}>
            {/* Ambient Background with Heritage Pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(200, 163, 89, 0.05) 0%, transparent 60%)' }} />
            
            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ color: 'var(--color-spatial-accent)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 600 }}>02 // Access Points</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', marginTop: '16px', color: '#F9F7F2' }}>Select Pathway</h2>
                </div>

                <div className="grid-12" style={{ gap: '24px' }}>
                    {portals.map((p, i) => (
                        <div key={i} style={{ gridColumn: 'span 4' }}>
                            <ImmersiveTile portal={p} navigate={navigate} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const ImmersiveTile = ({ portal, navigate }: { portal: any, navigate: any }) => {
    return (
        <motion.div 
            className="group"
            whileHover={{ y: -8 }}
            onClick={() => navigate(portal.path)}
            style={{ 
                height: '520px', 
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--color-spatial-void)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
            }}
        >
            {/* Cinematic Image Layer */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
                <motion.img 
                    src={portal.image} 
                    alt={portal.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        opacity: 0.7, 
                        filter: 'grayscale(0.3) contrast(1.1)' 
                    }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.95) 10%, rgba(18,18,18,0.4) 50%, transparent 80%)' }} />
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(200, 163, 89, 0.15), transparent 70%)' }} 
                />
            </div>

            {/* Content Layer */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                         <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 700, 
                            color: 'var(--color-spatial-accent)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1em',
                            padding: '4px 8px',
                            background: 'rgba(200, 163, 89, 0.1)',
                            borderRadius: '4px',
                            backdropFilter: 'blur(4px)'
                        }}>
                            {portal.subtitle}
                        </span>
                    </div>
                    <portal.icon size={20} color="rgba(255,255,255,0.6)" />
                </div>

                {/* Footer Content */}
                <div>
                     <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                     >
                        <h3 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#F9F7F2' }}>
                            {portal.title}
                        </h3>
                        <p style={{ color: 'rgba(249, 247, 242, 0.7)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '32px', maxWidth: '90%' }}>
                            {portal.desc}
                        </p>
                    </motion.div>

                    {/* Action Bar */}
                    <motion.div 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            paddingTop: '20px',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>Enter Module</span>
                        <motion.div 
                            whileHover={{ x: 5 }}
                            style={{ 
                                width: '32px', 
                                height: '32px', 
                                background: 'var(--color-spatial-accent)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}
                        >
                            <ArrowRight size={16} color="var(--color-spatial-void)" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            
            {/* Border Glow on Hover */}
            <motion.div 
                style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    borderRadius: '24px', 
                    border: '1px solid var(--color-spatial-accent)', 
                    opacity: 0 
                }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

// --- SCENE 4: MEANING (IMPACT) ---
const MeaningScene = ({ progress }: { progress: any }) => {
    const opacity = useTransform(progress, [0.85, 0.95], [0, 1]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.85 ? 'auto' : 'none'));
    const navigate = useNavigate();

    // Refined "Judge-Level" Motion - Smooth, Calm, Intentional
    const yContent = useTransform(progress, [0.85, 0.95], [20, 0]);
    
    return (
        <motion.section 
            style={{ 
                height: '100%', 
                position: 'absolute', 
                inset: 0, 
                opacity, 
                pointerEvents, 
                background: 'linear-gradient(to bottom, #F7F5F0, #EFECE6)', 
                backgroundImage: `url(${meaningBg})`,
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden' 
            }}
        >
             {/* Atmospheric Depth - Extremely Subtle */}
             <div style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.8) 0%, transparent 60%)', opacity: 0.8 }} />
             
            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '720px', textAlign: 'center' }}>
                <motion.div style={{ y: yContent }}>
                    
                    {/* Symbolic Anchor - Precise Alignment */}
                    <motion.div 
                        style={{ display: 'inline-flex', marginBottom: '40px', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
                    >
                         <div style={{ position: 'absolute', width: '48px', height: '48px', background: 'var(--color-spatial-accent)', opacity: 0.2, filter: 'blur(24px)', borderRadius: '50%' }} />
                         <Zap size={32} color="var(--color-spatial-accent)" strokeWidth={1.5} fill="rgba(200, 163, 89, 0.15)" />
                    </motion.div>
                    
                    {/* Editorial Headline - Strong Rhythm */}
                    <h2 style={{ 
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
                        fontFamily: 'var(--font-display)', 
                        lineHeight: 1.1, 
                        marginBottom: '32px', 
                        color: '#1a1a1a', 
                        letterSpacing: '-0.02em',
                        position: 'relative'
                    }}>
                        Preservation is<br/>
                        <span 
                            style={{ 
                                color: 'var(--color-spatial-accent)', 
                                fontStyle: 'italic',
                                fontWeight: 500,
                                textShadow: '0 0 40px rgba(200, 163, 89, 0.4)' 
                            }}
                        >
                            participation.
                        </span>
                    </h2>
                    
                    {/* Narrative Paragraph - High Readability */}
                    <p 
                        style={{ 
                            fontSize: '1.15rem', 
                            color: '#4A4A4A', // Specific dark neutral range
                            marginBottom: '64px', 
                            lineHeight: 1.8,
                            fontWeight: 400,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            letterSpacing: '0.01em'
                        }}
                    >
                        By engaging with Hidden Heritage, you generate intent. Every booking and field report contributes to the conservation index of the Chambal Valley.
                    </p>

                    {/* Premium CTA - Intelligent Interactivity */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                        <motion.button 
                            onClick={() => navigate('/book')} 
                            whileHover={{ y: -3, boxShadow: '0 20px 40px -10px rgba(200, 163, 89, 0.2)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{ 
                                padding: '18px 40px', 
                                fontSize: '1rem',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                color: '#2a2a2a',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                borderRadius: '100px',
                                boxShadow: '0 8px 20px -6px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >
                            <span style={{ letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Begin Expedition</span>
                            <motion.div 
                                style={{ display: 'flex' }}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <ArrowRight size={16} color="var(--color-spatial-accent)" />
                            </motion.div>
                        </motion.button>
                        
                        <span 
                            style={{ 
                                fontSize: '0.8rem', 
                                color: '#666', 
                                letterSpacing: '0.05em',
                                fontWeight: 500
                            }}
                        >
                            Curated entry into the neural archive.
                        </span>
                    </div>
                    
                </motion.div>
            </div>
            
            {/* Footer with Separation */}
            <motion.div 
                style={{ position: 'absolute', bottom: 0, width: '100%' }}
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
               <Footer />
            </motion.div>
        </motion.section>
    );
};

export default Home;
