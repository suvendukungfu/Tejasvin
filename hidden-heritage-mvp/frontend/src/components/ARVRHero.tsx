import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Landmark, History, Map } from 'lucide-react';
import { useRef } from 'react';

const ARVRHero = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Parallax Effect based on scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
    const rotateVisual = useTransform(scrollYProgress, [0, 1], [3, -3]);

    return (
        <section 
            ref={containerRef}
            style={{ 
                position: 'relative', 
                minHeight: '85vh', 
                display: 'flex', 
                alignItems: 'center', 
                overflow: 'hidden',
                // Cinematic Base: Midnight Blue -> Deepest Indigo with warmer undertones
                background: '#05050A',
                color: 'white',
                padding: '0' 
            }}
        >
            {/* --- BACKGROUND LAYERS --- */}
            
            {/* 1. Deep Atmospheric Gradient - Warmer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(110deg, #080810 0%, #151020 50%, #1A0F1A 100%)',
                zIndex: 0
            }} />

            {/* 2. Volumetric Glow - Amber/Gold hints for "Heritage" warmth */}
            <motion.div 
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(200, 150, 80, 0.04) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                    y: yBackground,
                    zIndex: 0
                }} 
            />
            <motion.div 
                style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-20%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(100, 120, 255, 0.04) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    zIndex: 0
                }} 
            />

            {/* 3. Subtle Texture (Noise/Grain) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
                zIndex: 0,
                opacity: 0.5
            }} />


            {/* --- CONTENT CONTAINER --- */}
            <div className="container" style={{ 
                position: 'relative', 
                zIndex: 10,
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
                gap: '5rem',
                alignItems: 'center',
                width: '100%'
            }}>
                
                {/* --- LEFT COLUMN: HUMAN STORY --- */}
                <motion.div 
                    style={{ y: yText }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {/* Emotional Label */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '2rem',
                    }}>
                        <div style={{ width: '40px', height: '1px', background: 'rgba(212, 175, 55, 0.6)' }} />
                        <span style={{
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'rgba(230, 210, 180, 0.8)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500
                        }}>
                            Immersive Journey
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                        fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.1,
                        marginBottom: '2rem',
                        color: '#FFFFFF',
                        textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                        letterSpacing: '-0.02em'
                    }}>
                        Walk Through <br />
                        <span style={{ 
                            fontFamily: 'serif', 
                            fontStyle: 'italic', 
                            color: '#D4AF37', // Gold
                            fontWeight: 400,
                            textShadow: '0 4px 30px rgba(0,0,0,0.9)'
                        }}>
                            Time.
                        </span>
                    </h2>

                    {/* Human Description */}
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.8,
                        color: '#FFFFFF',
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        maxWidth: '520px',
                        marginBottom: '3.5rem',
                        fontWeight: 400
                    }}>
                        Feel the presence of the past. Step into forgotten courtyards and ancient halls, reconstructed not just for your eyes, but for your sense of wonder.
                    </p>

                    {/* Inviting CTA */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/ar-vr')}
                        style={{
                            position: 'relative',
                            padding: '1.2rem 3rem',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '100px', // Softer, more organic shape
                            color: 'white',
                            fontSize: '1.05rem',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <span>Start Your Journey</span>
                        <ArrowRight size={18} color="#D4AF37" />
                    </motion.button>

                </motion.div>


                {/* --- RIGHT COLUMN: LIVING ARTIFACT VISUAL --- */}
                <motion.div 
                    style={{ 
                        position: 'relative', 
                        height: '600px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '1500px'
                    }}
                >
                    {/* The "Journal/Portal" Composition */}
                    <motion.div
                        style={{ rotateY: rotateVisual }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                    >
                        {/* Back Glow */}
                        <div style={{
                            position: 'absolute',
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: '400px', height: '400px',
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%)',
                            filter: 'blur(60px)',
                            zIndex: -1
                        }} />

                        {/* Main Glass "Card" - The Window to the Past */}
                        <div style={{
                            width: '360px',
                            height: '480px',
                            background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(20,20,30,0.6) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '32px', // Very soft corners
                            position: 'relative',
                            backdropFilter: 'blur(16px)',
                            boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2.5rem',
                            transform: 'rotate(-2deg)',
                        }}>
                             
                             {/* Header Icons */}
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', opacity: 0.8 }}>
                                 <Compass size={24} color="#D4AF37" strokeWidth={1.5} />
                                 <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                     Est. 11th Century
                                 </div>
                             </div>

                             {/* "Uncovering" Animation */}
                             <div style={{ marginBottom: '2rem' }}>
                                 <h4 style={{ fontSize: '0.85rem', color: '#E0E0E0', marginBottom: '0.8rem', letterSpacing: '0.1em', fontWeight: 400 }}>UNCOVERING STORIES</h4>
                                 <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                                     <motion.div 
                                        initial={{ width: '0%', opacity: 0 }}
                                        whileInView={{ width: '60%', opacity: 1 }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        style={{ height: '100%', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                                     />
                                 </div>
                             </div>

                             {/* Center Artifact */}
                             <div style={{ 
                                 flex: 1, 
                                 background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent)', 
                                 borderRadius: '20px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 border: '1px solid rgba(255,255,255,0.05)',
                                 position: 'relative',
                                 overflow: 'hidden'
                             }}>
                                 {/* Abstract Temple Form */}
                                 <motion.div
                                     animate={{ y: [0, -5, 0] }}
                                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                 >
                                     <Landmark size={64} color="rgba(212, 175, 55, 0.8)" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))' }} />
                                 </motion.div>
                                 
                                 {/* Floating particles inside */}
                                 <div style={{ position: 'absolute', width: '4px', height: '4px', background: '#D4AF37', borderRadius: '50%', top: '30%', left: '20%', opacity: 0.4 }} />
                                 <div style={{ position: 'absolute', width: '3px', height: '3px', background: '#fff', borderRadius: '50%', bottom: '30%', right: '20%', opacity: 0.3 }} />
                             </div>

                             {/* Footer Info */}
                             <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <History size={18} style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '0.3rem' }} />
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>TIMELINE</div>
                                </div>
                                <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
                                <div style={{ textAlign: 'center' }}>
                                    <Map size={18} style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '0.3rem' }} />
                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>ORIGIN</div>
                                </div>
                             </div>
                        </div>

                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .container {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                        gap: 3rem !important;
                    }
                    .container > div:first-child {
                        align-items: center; 
                        display: flex;
                        flex-direction: column;
                    }
                }
            `}</style>
        </section>
    );
};

export default ARVRHero;
