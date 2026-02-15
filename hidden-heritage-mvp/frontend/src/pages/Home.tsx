import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Compass, Layers, Zap, Box, Brain } from 'lucide-react';

// Heritage Assets
import chambalValley from '../assets/heritage/chambal_valley.png';
import navigatorHero from '../assets/heritage/navigator.png';

const Home = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Neural Easing (Smoother, more cognitive)
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

    return (
        <div ref={containerRef} style={{ height: '450vh', background: 'var(--color-bg-body)' }}>
            <NavBar />

            {/* --- 1. SIGNAL (ARRIVAL) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 10 }}>
                <SignalScene progress={smoothProgress} />
            </div>

            {/* --- 2. MEMORY (STORY) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 20, pointerEvents: 'none' }}>
                <MemoryScene progress={smoothProgress} />
            </div>

            {/* --- 3. EXPLORATION (GATEWAY) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 30, pointerEvents: 'none' }}>
                <ExplorationScene progress={smoothProgress} />
            </div>

             {/* --- 4. MEANING (IMPACT) --- */}
            <div style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 40, pointerEvents: 'none' }}>
                <MeaningScene progress={smoothProgress} />
            </div>

            {/* Scroll Spacer */}
            <div style={{ height: '50vh' }} />
        </div>
    );
};

// --- SCENES ---

const SignalScene = ({ progress }: { progress: any }) => {
    const opacity = useTransform(progress, [0, 0.2], [1, 0]);
    const scale = useTransform(progress, [0, 0.2], [1, 0.95]);
    const y = useTransform(progress, [0, 0.2], ["0%", "-5%"]);

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, scale, y, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0 }}>
                <img src={chambalValley} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(0.95)' }} alt="Atmosphere" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0.6), var(--color-bg-body))' }} />
            </div>
            
            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', borderRadius: '100px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)', marginBottom: '40px' }}>
                        <Brain size={16} color="var(--color-neural-accent)" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Neural Interface Active</span>
                    </div>
                    
                    <h1 className="text-display" style={{ marginBottom: '24px', letterSpacing: '-0.03em' }}>
                        Hidden <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-neural-accent)' }}>Heritage</span>
                    </h1>
                    
                    <p style={{ fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto', color: 'var(--color-text-primary)', opacity: 0.8 }}>
                        A cognitive pathway to the forgotten architectures of India.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

const MemoryScene = ({ progress }: { progress: any }) => {
    // 0.2 -> 0.5
    const opacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
    const scale = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0.95, 1, 1, 0.95]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.2 && v < 0.5 ? 'auto' : 'none'));

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, scale, pointerEvents, background: 'var(--color-bg-body)', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="grid-12" style={{ alignItems: 'center' }}>
                    <div style={{ gridColumn: 'span 5' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neural-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '24px' }}>
                            01. Memory Layer
                        </span>
                        <h2 className="text-h1" style={{ marginBottom: '32px' }}>
                            History is not static.<br/>
                            It is a <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--color-neural-accent)' }}>living signal</span>.
                        </h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '40px' }}>
                            We have reconstructed the Chambal Valley not as a list of sites, but as a connected neural network of culture, geology, and stories.
                        </p>
                     </div>
                     <div style={{ gridColumn: '7 / span 6' }}>
                         <div className="neural-node" style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
                             <img src={navigatorHero} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }} />
                             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <motion.div 
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ width: '200px', height: '200px', borderRadius: '50%', border: '1px solid var(--color-neural-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                 >
                                     <div style={{ width: '10px', height: '10px', background: 'var(--color-neural-accent)', borderRadius: '50%' }} />
                                 </motion.div>
                             </div>
                             <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                                 <div style={{ fontWeight: 700 }}>Node: Bateshwar</div>
                                 <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Signal Strength: 98%</div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </motion.section>
    );
};

const ExplorationScene = ({ progress }: { progress: any }) => {
    // 0.5 -> 0.8
    const opacity = useTransform(progress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
    const x = useTransform(progress, [0.45, 0.55], [50, 0]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.5 && v < 0.8 ? 'auto' : 'none'));
    const navigate = useNavigate();

    const modules = [
        { title: "Expedition", desc: "Physical journey planning.", icon: Compass, link: "/book" },
        { title: "AR Portal", desc: "Immersive object analysis.", icon: Box, link: "/antigravity" },
        { title: "Deep Scan", desc: "Full heritage index.", icon: Layers, link: "/explore" }
    ];

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, x, pointerEvents, background: 'var(--color-bg-body)', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 className="text-display" style={{ fontSize: '3.5rem' }}>Select Pathway</h2>
                </div>
                
                <div className="grid-12">
                    {modules.map((m, i) => (
                        <div key={i} style={{ gridColumn: 'span 4' }}>
                            <motion.div 
                                className="neural-node"
                                whileHover={{ scale: 1.02, y: -5 }}
                                style={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => navigate(m.link)}
                            >
                                <div style={{ width: '64px', height: '64px', background: 'rgba(26,26,26,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    <m.icon size={28} color="var(--color-text-primary)" />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{m.title}</h3>
                                <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '32px' }}>{m.desc}</p>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, borderBottom: '1px solid var(--color-neural-text)' }}>Access Module</span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const MeaningScene = ({ progress }: { progress: any }) => {
    // 0.8 -> 1.0
    const opacity = useTransform(progress, [0.75, 0.85], [0, 1]);
    const scale = useTransform(progress, [0.75, 0.85], [0.95, 1]);
    const pointerEvents = useTransform(progress, (v: number) => (v > 0.8 ? 'auto' : 'none'));
    const navigate = useNavigate();

    return (
        <motion.section style={{ height: '100%', position: 'absolute', inset: 0, opacity, scale, pointerEvents, background: 'var(--color-neural-text)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <Zap size={48} color="var(--color-neural-accent)" style={{ margin: '0 auto 32px auto' }} />
                <h2 className="text-display" style={{ color: 'white', marginBottom: '24px' }}>
                    System Status: <span style={{ color: 'var(--color-neural-accent)' }}>Waiting</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
                    The neural link is established. Initialize your session to begin data persistence.
                </p>
                <button onClick={() => navigate('/book')} className="btn-neural" style={{ background: 'white', color: 'black' }}>
                    Initialize Session <ArrowRight size={18} />
                </button>
            </div>
             <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Footer />
            </div>
        </motion.section>
    );
};

export default Home;
