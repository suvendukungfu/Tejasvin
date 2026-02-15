import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
// Lazy load the heavy 3D scene
const AntigravityScene = lazy(() => import('../components/AntigravityScene'));
import { ArrowLeft, Cpu, Globe, Loader as LoaderIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AntigravityPage = () => {
    const navigate = useNavigate();
    const [selectedPortal, setSelectedPortal] = useState('bateshwar');
    const [launching, setLaunching] = useState(false);

    const handleLaunch = () => {
        setLaunching(true);
        // Simulate launch sequence length
        setTimeout(() => setLaunching(false), 3000);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#020202', overflow: 'hidden', color: 'white' }}>
            
            {/* --- IMMERSIVE HUD OVERLAY --- */}
            
            {/* Top Bar: Navigation & Core Status */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 100 }}>
                <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
                    onClick={() => navigate(-1)}
                    className="btn-cinematic"
                    style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        backdropFilter: 'blur(20px)',
                        color: 'white', 
                        padding: '14px 32px', 
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <ArrowLeft size={16} /> Disconnect
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={14} color="var(--color-accent)" /> 
                        <span>Neural Link: Stable</span>
                    </div>
                </motion.div>
            </div>

            {/* Side Readouts: Portal Selector */}
            <div style={{ position: 'absolute', left: '40px', bottom: '100px', zIndex: 50, color: 'white', maxWidth: '350px' }}>
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.2em' }}>ANTIGRAVITY ENGINE v5.0</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Command Center.</h1>
                    
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
                         {['bateshwar', 'mitaoli', 'padavali'].map((portal) => (
                             <button 
                                key={portal}
                                onClick={() => setSelectedPortal(portal)}
                                style={{ 
                                    padding: '12px 16px', 
                                    background: selectedPortal === portal ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)', 
                                    color: selectedPortal === portal ? 'black' : 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}
                             >
                                 {portal}
                             </button>
                         ))}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '2rem' }}>
                        Ready to simulate 1:1 scale environment for <span style={{ color: 'white' }}>{selectedPortal.toUpperCase()}</span>. Ensure your viewport is calibrated.
                    </p>

                    <button 
                        onClick={handleLaunch}
                        style={{ 
                            width: '100%', 
                            padding: '20px', 
                            background: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius: '12px', 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '0 0 30px rgba(255,255,255,0.2)'
                        }}
                    >
                        Initialize Simulation
                    </button>
                </motion.div>
            </div>

            {/* Launch Overlay */}
            <AnimatePresence>
                {launching && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                    >
                         <motion.div 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 1.5, repeat: Infinity }}
                         >
                            <Globe size={64} color="var(--color-gold)" />
                        </motion.div>
                         <div style={{ marginTop: '24px', letterSpacing: '0.3em', fontSize: '0.8rem', color: 'var(--color-gold)' }}>GENERATING WORLD...</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Scan Line Decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '1px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: '20px', right: '20px', width: '1px', height: '100px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }} />

            {/* 3D Scene */}
            <Suspense fallback={
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>
                    <LoaderIcon className="animate-spin" />
                </div>
            }>
                <AntigravityScene />
            </Suspense>

            {/* Background Grain/Noise Overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)', opacity: 0.05, pointerEvents: 'none', zIndex: 5 }} />
        </div>
    );
};

export default AntigravityPage;
