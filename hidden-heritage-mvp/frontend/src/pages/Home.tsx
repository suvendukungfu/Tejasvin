import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Heritage Cinematic Assets
import chambalValley from '../assets/heritage/chambal_valley.png';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, ArrowRight, Shield, Zap, Layers, Box } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    // Global Scroll for Scene Orchestration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth physics for camera movement
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

    return (
        <div ref={containerRef} style={{ background: 'var(--color-bg-body)', minHeight: '400vh', perspective: 'var(--perspective-deep)' }}>
            <NavBar />

            {/* --- SCENE I: PORTAL (ARRIVAL) --- */}
            {/* Logic: Fixed at top, fades out and scales down as user scrolls */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 10 }}>
                <PortalScene progress={smoothProgress} />
            </div>

            {/* --- SCENE II: STORY (UNDERSTANDING) --- */}
            {/* Logic: Enters from bottom, becomes main focus */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 20, pointerEvents: 'none' }}>
                <StoryScene progress={smoothProgress} />
            </div>

            {/* --- SCENE III: EXPLORATION (GATEWAYS) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 30, pointerEvents: 'none' }}>
                <ExplorationScene progress={smoothProgress} navigate={navigate} />
            </div>

             {/* --- SCENE IV: IMPACT (FINAL) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 40, pointerEvents: 'none' }}>
                <ImpactScene progress={smoothProgress} navigate={navigate} />
            </div>
            
            {/* Spacer to allow scrolling */}
            <div style={{ height: '100vh' }} /> 
        </div>
    );
};

// --- SCENE COMPONENTS ---

const PortalScene = ({ progress }: { progress: any }) => {
    const opacity = useTransform(progress, [0, 0.2], [1, 0]);
    const scale = useTransform(progress, [0, 0.2], [1, 0.9]);
    const y = useTransform(progress, [0, 0.2], ["0%", "-10%"]);

    return (
        <motion.section style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, opacity, scale, y, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Atmospheric Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <img src={chambalValley} alt="Atmosphere" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.5), var(--color-bg-body))' }} />
            </div>

            {/* Floating Headline */}
            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', marginBottom: '32px' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-charcoal)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Spatial OS v2.0 Online</span>
                    </div>
                    <h1 className="text-display" style={{ color: 'var(--color-charcoal)', marginBottom: '24px' }}>Hidden Heritage</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>The world's first spatial culture engine.</p>
                </motion.div>
            </div>
        </motion.section>
    );
};

const StoryScene = ({ progress }: { progress: any }) => {
    // Active range: 0.2 to 0.5
    const opacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
    const scale = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0.9, 1, 1, 0.9]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.2 && v < 0.5 ? 'auto' : 'none'));

    return (
        <motion.section style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, opacity, scale, pointerEvents, display: 'flex', alignItems: 'center', background: 'var(--color-bg-body)' }}>
            <div className="container">
                <div className="grid-12" style={{ alignItems: 'center' }}>
                    <div style={{ gridColumn: 'span 5' }}>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem' }}>// 01. Context Layer</span>
                        <h2 className="text-h1" style={{ marginTop: '24px', marginBottom: '32px', color: 'var(--color-charcoal)' }}>Preservation as<br/>User Interface.</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            We don't just archive history; we spatialize it. Every site is reconstructed as a navigable digital object, float-locked to its original geolocation coordinates.
                        </p>
                    </div>
                    <div style={{ gridColumn: '7 / span 6' }}>
                        <div className="glass-panel" style={{ height: '500px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-warm)' }}>
                             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200, 163, 89, 0.1), transparent)' }} />
                             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                 <Layers size={64} color="var(--color-gold)" style={{ opacity: 0.5, marginBottom: '24px' }} />
                                 <div style={{ fontWeight: 700, fontSize: '2rem', color: 'var(--color-charcoal)' }}>+400m Depth</div>
                                 <div style={{ color: 'var(--color-text-secondary)' }}>Lidar Point Cloud Quality</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const ExplorationScene = ({ progress, navigate }: { progress: any, navigate: any }) => {
    // Active range: 0.5 to 0.8
    const opacity = useTransform(progress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
    const x = useTransform(progress, [0.45, 0.55], [100, 0]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.5 && v < 0.8 ? 'auto' : 'none'));

    return (
         <motion.section style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, opacity, x, pointerEvents, display: 'flex', alignItems: 'center', background: 'var(--color-bg-body)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                     <h2 className="text-display" style={{ fontSize: '4rem', color: 'var(--color-charcoal)' }}>Active Sectors</h2>
                </div>
                
                <div className="grid-12">
                     {[
                         { icon: Compass, label: "Expedition Mode", text: "Walk the valley.", link: "/book" },
                         { icon: Box, label: "Object Viewer", text: "Inspect artifacts in 3D.", link: "/antigravity", highlight: true },
                         { icon: Shield, label: "Secure Access", text: "Vault safety protocols.", link: "/explore" }
                     ].map((item, i) => (
                         <div key={i} style={{ gridColumn: 'span 4' }}>
                             <motion.div 
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="heritage-tile"
                                style={{ 
                                    padding: '40px', 
                                    height: '400px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between',
                                    background: item.highlight ? 'var(--color-charcoal)' : 'rgba(255,255,255,0.5)'
                                }}
                             >
                                 <item.icon size={32} color={item.highlight ? 'var(--color-gold)' : 'var(--color-charcoal)'} />
                                 <div>
                                     <h3 style={{ fontSize: '1.5rem', color: item.highlight ? 'white' : 'var(--color-charcoal)', marginBottom: '8px' }}>{item.label}</h3>
                                     <p style={{ color: item.highlight ? 'rgba(255,255,255,0.6)' : 'var(--color-text-secondary)' }}>{item.text}</p>
                                 </div>
                                 <button onClick={() => navigate(item.link)} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', color: item.highlight ? 'var(--color-gold)' : 'var(--color-charcoal)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                     Launch <ArrowRight size={16} />
                                 </button>
                             </motion.div>
                         </div>
                     ))}
                </div>
            </div>
         </motion.section>
    );
};

const ImpactScene = ({ progress, navigate }: { progress: any, navigate: any }) => {
    // Active range: 0.8 to 1.0
    const opacity = useTransform(progress, [0.75, 0.85], [0, 1]);
    const scale = useTransform(progress, [0.75, 0.85], [1.1, 1]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.8 ? 'auto' : 'none'));

    return (
        <motion.section style={{ height: '100%', width: '100%', position: 'absolute', inset: 0, opacity, scale, pointerEvents, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-charcoal)' }}>
            <div className="container" style={{ textAlign: 'center', color: 'white' }}>
                 <div style={{ marginBottom: '40px' }}>
                    <Zap size={64} color="var(--color-gold)" style={{ margin: '0 auto 24px auto' }} />
                    <h2 className="text-display" style={{ fontSize: '5rem', color: 'white' }}>System Ready.</h2>
                    <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                        The Heritage OS is waiting for your input.
                    </p>
                 </div>
                 <button onClick={() => navigate('/register')} className="btn-cinematic" style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)', padding: '24px 64px', fontSize: '1.25rem' }}>
                     Initialize Session
                 </button>
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Footer />
            </div>
        </motion.section>
    );
};

export default Home;
