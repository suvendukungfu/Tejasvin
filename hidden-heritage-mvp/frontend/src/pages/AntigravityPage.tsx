import { useNavigate } from 'react-router-dom';
import AntigravityScene from '../components/AntigravityScene';
import { ArrowLeft, Cpu, Activity, ShieldCheck, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const AntigravityPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'var(--color-charcoal)', overflow: 'hidden' }}>
            
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
                        textTransform: 'uppercase'
                    }}
                >
                    <ArrowLeft size={16} /> Disconnect from Portal
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={14} color="#4ADE80" /> 
                        <span>Latency: 12ms</span>
                    </div>
                </motion.div>
            </div>

            {/* Side Readouts: Archival Data */}
            <div style={{ position: 'absolute', left: '40px', bottom: '100px', zIndex: 50, color: 'white', maxWidth: '300px' }}>
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.2em' }}>HERITAGE HUD v5.0</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>The Spatial Archive.</h1>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '2rem' }}>
                        You are currently viewing a high-fidelity digital twin of a Bateshwar pillar fragment. Use your neural bridge to manipulate the object in 3D space.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                            <ShieldCheck size={16} color="var(--color-accent)" /> Authenticated Site: Gwalior Region
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                            <Database size={16} color="var(--color-accent)" /> Data Source: Photogrammetry Scan #812
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Corner Scan Line Decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '1px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: '20px', right: '20px', width: '1px', height: '100px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }} />

            {/* 3D Scene */}
            <AntigravityScene />

            {/* Background Grain/Noise Overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)', opacity: 0.05, pointerEvents: 'none', zIndex: 5 }} />
        </div>
    );
};

export default AntigravityPage;
