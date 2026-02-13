import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ScanFace, View, Layers, Box } from 'lucide-react';
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
    const rotateVisual = useTransform(scrollYProgress, [0, 1], [5, -5]);

    // Smoother mouse interaction for the spatial element
    // const mouseX = useMotionValue(0);
    // const mouseY = useMotionValue(0); 
    // Simplified for performance/cleanliness in this specific "editorial" view

    return (
        <section 
            ref={containerRef}
            style={{ 
                position: 'relative', 
                minHeight: '85vh', 
                display: 'flex', 
                alignItems: 'center', 
                overflow: 'hidden',
                // Cinematic Base: Midnight Blue -> Deepest Indigo
                background: '#05050A',
                color: 'white',
                padding: '0' // Full bleed
            }}
        >
            {/* --- CINEMATIC BACKGROUND LAYERS --- */}
            
            {/* 1. Deep Atmospheric Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(110deg, #020205 0%, #0A0A20 40%, #120820 100%)',
                zIndex: 0
            }} />

            {/* 2. Volumetric Fog / Lights */}
            <motion.div 
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(60, 80, 255, 0.08) 0%, transparent 60%)',
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
                    background: 'radial-gradient(circle, rgba(140, 40, 255, 0.06) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    zIndex: 0
                }} 
            />

            {/* 3. Subtle Texture (Noise/Grain) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
                zIndex: 0,
                opacity: 0.4
            }} />


            {/* --- CONTENT CONTAINER --- */}
            <div className="container" style={{ 
                position: 'relative', 
                zIndex: 10,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                width: '100%'
            }}>
                
                {/* --- LEFT COLUMN: EDITORIAL TEXT --- */}
                <motion.div 
                    style={{ y: yText }}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Micro Label */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        marginBottom: '2rem',
                    }}>
                        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                        <span style={{
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.7)',
                            fontFamily: 'var(--font-body)'
                        }}>
                            Experimental Feature
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                        fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.0,
                        marginBottom: '2rem',
                        background: 'linear-gradient(to right, #FFFFFF 20%, #A0A0FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.03em'
                    }}>
                        History, <br />
                        <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontWeight: 400, color: '#A0D0FF', WebkitTextFillColor: '#A0D0FF' }}>Reimagined.</span>
                    </h2>

                    {/* Description */}
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '550px',
                        marginBottom: '3.5rem',
                        fontWeight: 300
                    }}>
                        Step through a digital gateway into the past. Our spatial engine reconstructs lost heritage sites in high-fidelity Augmented Reality, allowing you to explore history from your living room.
                    </p>

                    {/* Premium CTA */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/ar-vr')}
                        style={{
                            position: 'relative',
                            padding: '1.2rem 2.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '2px', // Editorial sharp edges or slight radius
                            color: 'white',
                            fontSize: '1rem',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transform: 'skewX(-20deg) translateX(-150%)',
                            transition: 'transform 0.5s ease'
                        }} className="shimmer" />
                        
                        <span>ENTER IMMERSIVE ZONE</span>
                        <ArrowRight size={18} color="#A0D0FF" />
                        
                        <style>{`
                            button:hover .shimmer {
                                transform: skewX(-20deg) translateX(150%) !important;
                                transition: transform 0.8s ease;
                            }
                        `}</style>
                    </motion.button>

                </motion.div>


                {/* --- RIGHT COLUMN: SPATIAL VISUAL --- */}
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
                    {/* The "Portal" Composition */}
                    <motion.div
                        style={{ rotateY: rotateVisual }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    >
                        {/* Back Glass Plane */}
                        <div style={{
                            width: '400px',
                            height: '500px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '20px',
                            transform: 'translateZ(-50px) rotate(-5deg)',
                            position: 'absolute',
                            top: '5%',
                            left: '10%',
                            backdropFilter: 'blur(5px)'
                        }} />

                        {/* Main Floating Interface */}
                        <div style={{
                            width: '380px',
                            height: '480px',
                            background: 'rgba(20, 20, 40, 0.4)', // Darker tint for contrast
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            position: 'relative',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            transform: 'translateZ(20px)',
                            overflow: 'hidden'
                        }}>
                             {/* Gloss Shine */}
                             <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, height: '160px',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)',
                                pointerEvents: 'none'
                             }} />

                             {/* Interface Elements */}
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                                 <ScanFace size={24} color="#A0D0FF" />
                                 <div style={{ display: 'flex', gap: '5px' }}>
                                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                                 </div>
                             </div>

                             <div style={{ marginBottom: '1.5rem' }}>
                                 <h4 style={{ fontSize: '0.85rem', color: '#A0D0FF', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>SCANNING TERRAIN</h4>
                                 <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                     <motion.div 
                                        initial={{ width: '0%' }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        style={{ height: '100%', background: '#A0D0FF' }}
                                     />
                                 </div>
                             </div>

                             {/* Abstract 3D Representation */}
                             <div style={{ 
                                 flex: 1, 
                                 background: 'linear-gradient(180deg, rgba(0,0,0,0.2), transparent)', 
                                 borderRadius: '12px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 border: '1px dashed rgba(255,255,255,0.1)'
                             }}>
                                 <Box size={64} color="rgba(255,255,255,0.2)" />
                             </div>

                             <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <View size={20} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
                                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>VR MODE</div>
                                </div>
                                <div style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <Layers size={20} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
                                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>LAYERS</div>
                                </div>
                             </div>
                        </div>

                        {/* Floating Orb/Particle */}
                        <motion.div 
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: '20%',
                                right: '-10%',
                                width: '80px',
                                height: '80px',
                                background: 'radial-gradient(circle, #A0D0FF 0%, transparent 70%)',
                                borderRadius: '50%',
                                filter: 'blur(20px)',
                                zIndex: 2,
                                opacity: 0.6
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Mobile Responsive adjustments via CSS-in-JS injection for simplicity in this artifact, real-world would use CSS modules */}
            <style>{`
                @media (max-width: 900px) {
                    .container {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                    .container > div:first-child {
                        align-items: center; 
                        display: flex;
                        flex-direction: column;
                    }
                    /* Hide or simplify complex spatial visual on mobile if needed */
                }
            `}</style>
        </section>
    );
};

export default ARVRHero;
