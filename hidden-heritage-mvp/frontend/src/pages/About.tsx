import NavBar from '../components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Shield, ArrowRight, BookOpen, Fingerprint, Anchor, History, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

// Cinematic Assets
import ancientStone from '../assets/textures/holographic_grid.png'; // Using holographic grid for texture
// In a real app, I'd suggest specific textures:
// const ancientStoneTexture = "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?auto=format&fit=crop&q=80&w=2000";

const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    
    // Smooth Parallax
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Section 3: Framework Parallax
    const yCards = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

    return (
        <div ref={containerRef} style={{ background: 'var(--color-spatial-bg)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <NavBar />
            
            {/* Ambient Background Glows */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(200, 163, 89, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
            
            {/* --- SECTION 1: ORIGIN ("BORN FROM DUST") - MANIFESTO OPENER --- */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '120px 0' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, opacity: opacityHero, zIndex: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-spatial-bg) 20%, rgba(255,255,255,0) 100%)', zIndex: 2 }} />
                    <img 
                        src="https://images.unsplash.com/photo-1599940824399-b87987ce179a?q=80&w=2000&auto=format&fit=crop" 
                        alt="Dusty Archive" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, filter: 'sepia(0.2) contrast(1.1)', objectPosition: 'right center' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 7' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ width: '40px', height: '1px', background: 'var(--color-spatial-accent)' }} />
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-spatial-accent)' }}>
                                        Our Beginning
                                    </span>
                                </div>
                                <h1 className="text-display" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 1, color: 'var(--color-spatial-text)', marginBottom: '3rem' }}>
                                    Born from <br/>
                                    <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', color: 'var(--color-spatial-accent)' }}>Dust.</span>
                                </h1>
                                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '640px', marginBottom: '2rem' }}>
                                    It started in the silence of a forgotten stepwell in Bundelkhand. No plaques, no ticket counters—only the deep, resonant echoes of a history being erased by time. We realized then: if we don't document this now, it vanishes forever.
                                </p>
                                <p style={{ fontSize: '1.25rem', color: 'var(--color-spatial-text)', lineHeight: 1.8, maxWidth: '640px', fontWeight: 500 }}>
                                    Hidden Heritage is not just a database. It is a vow to remember.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: PHILOSOPHY ("THE WHY") --- */}
            <section style={{ padding: '80px 0 120px', position: 'relative' }}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2 }}
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(200, 163, 89, 0.1)', color: 'var(--color-spatial-accent)', marginBottom: '32px' }}>
                            <Anchor size={28} strokeWidth={1.5} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.2, color: 'var(--color-spatial-text)', marginBottom: '24px' }}>
                            We protect what the world <span style={{ fontStyle: 'italic', color: 'var(--color-spatial-text)', opacity: 0.5 }}>forgot.</span>
                        </h2>
                        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--color-spatial-accent), transparent)', margin: '40px auto' }} />
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 3: FRAMEWORK ("3 PILLARS") - DARK CINEMATIC --- */}
            <section style={{ background: '#121212', color: '#F9F7F2', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
                {/* Texture Overlay */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `url(${ancientStone})`, backgroundSize: '400px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(30,30,30,0), #121212 80%)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>The Framework</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginTop: '16px', color: 'white' }}>Built on Three Pillars</h2>
                    </div>

                    <div className="grid-12" style={{ alignItems: 'stretch' }}>
                        {[
                            {
                                icon: <Shield size={32} />,
                                title: "Preserving What Time Forgot",
                                desc: "High-fidelity photogrammetry ensures no artifact is lost to erosion. We archive the unarchived.",
                                delay: 0
                            },
                            {
                                icon: <History size={32} />,
                                title: "Stories Carved by People",
                                desc: "A site is nothing without its legend. We prioritize oral histories and folklore alongside stone.",
                                delay: 0.2
                            },
                            {
                                icon: <Globe size={32} />,
                                title: "A Living Cultural Network",
                                desc: "Revenue funds local custodians. We don't just visit; we sustain the ecosystem.",
                                delay: 0.4
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: item.delay, ease: [0.19, 1, 0.22, 1] }}
                                style={{ gridColumn: 'span 4', display: 'flex' }}
                            >
                                <div style={{ 
                                    background: 'rgba(255, 255, 255, 0.03)', 
                                    backdropFilter: 'blur(10px)', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                                    padding: '48px 32px', 
                                    borderRadius: '24px', 
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    transition: 'background 0.3s'
                                }}>
                                    <div style={{ color: 'var(--color-spatial-accent)', opacity: 0.8, marginBottom: '32px' }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '16px', color: 'white' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1rem' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: INVITATION ("CEREMONIAL CLOSING") --- */}
            <section style={{ padding: '160px 0 200px', textAlign: 'center', position: 'relative' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ maxWidth: '700px', margin: '0 auto' }}
                    >
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '40px' }}>
                            "Every forgotten place holds a voice. Every journey begins with curiosity."
                        </p>
                        
                        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '80px' }} />

                        <h2 className="text-display" style={{ marginBottom: '4rem', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--color-spatial-text)' }}>
                            The archives <br/> are open.
                        </h2>
                        
                        <motion.button 
                            onClick={() => navigate('/register')} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ 
                                padding: '24px 64px', 
                                fontSize: '1.1rem', 
                                fontWeight: 700, 
                                background: 'var(--color-spatial-text)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '100px', 
                                cursor: 'pointer',
                                letterSpacing: '0.05em',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)'
                            }}
                        >
                            Join the Expedition
                        </motion.button>
                    </motion.div>
                </div>

                {/* Footer Spacer is handled by layout, but added padding ensures breathable space */}
            </section>
        </div>
    );
};

export default About;
