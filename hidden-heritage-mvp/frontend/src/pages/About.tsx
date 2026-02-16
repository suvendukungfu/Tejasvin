import NavBar from '../components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Shield, History, Map, Database, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

// Cinematic Assets
import holographicGrid from '../assets/textures/holographic_grid.png';

const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Smooth Parallax for Hero
    const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div ref={containerRef} style={{ background: 'var(--color-spatial-bg)', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: 'var(--color-spatial-text)' }}>
            <NavBar />

            {/* Global Ambient Gradient */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 10%, rgba(200, 163, 89, 0.05), transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* --- CHAPTER 01: ORIGIN ("BORN FROM DUST") --- */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, opacity: opacityHero, zIndex: 0, y: yHero }}>
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(249, 247, 242, 0) 0%, var(--color-spatial-bg) 90%)', zIndex: 2 }} />
                     <img 
                        src="https://images.unsplash.com/photo-1599940824399-b87987ce179a?q=80&w=2000&auto=format&fit=crop" 
                        alt="Restoration Site" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, filter: 'sepia(0.3) contrast(1.2)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 8' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-spatial-accent)', marginBottom: '24px' }}>
                                    Chapter 01 — Origin
                                </span>
                                <h1 className="text-display" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 1, marginBottom: '40px', color: 'var(--color-spatial-text)' }}>
                                    Born from Dust.
                                </h1>
                                <div style={{ padding: '40px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', borderRadius: '2px', borderLeft: '4px solid var(--color-spatial-accent)', maxWidth: '600px' }}>
                                    <p style={{ fontSize: '1.25rem', lineHeight: 1.8, fontStyle: 'italic', color: 'var(--color-spatial-text)', opacity: 0.9 }}>
                                        "It started in the quiet of a crumbling stepwell. We realized that if we didn't document this now, the story would vanish with the stone. Hidden Heritage is our vow to remember."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 02: THE PROBLEM ("THE SILENCE OF HISTORY") --- */}
            <section style={{ padding: '120px 0', position: 'relative' }}>
                <div className="container">
                    <div className="grid-12">
                        <div style={{ gridColumn: '2 / span 5' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1 }}
                            >
                                <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '32px', borderTop: '1px solid var(--color-spatial-accent)', paddingTop: '24px', width: 'fit-content' }}>
                                    Chapter 02 — The Silence of History
                                </span>
                                <h2 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '32px' }}>
                                    Memory is fragile. <br/> Archives are fragmented.
                                </h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                                    Across the subcontinent, centuries of cultural memory are disappearing. Structures crumble, oral histories fade with the elders, and digital archives remain scattered across inaccessible silos.
                                </p>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                                    Without a unified, accessible platform, we risk losing the "why" behind the "what." A monument without its story is just a pile of rocks.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CHAPTER 03: THE PHILOSOPHY ("3 PILLARS") --- */}
            <section style={{ padding: '160px 0', background: 'rgba(255,255,255,0.3)', position: 'relative' }}>
                 <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-spatial-accent)' }}>Chapter 03 — Philosophy</span>
                        <h2 className="text-display" style={{ fontSize: '3rem', marginTop: '16px' }}>Our Core Beliefs</h2>
                    </div>

                    <div className="grid-12">
                        {[
                            {
                                title: "Preserving What Time Forgot",
                                desc: "We use high-fidelity photogrammetry to ensure no artifact is lost to erosion.",
                                icon: <Shield size={24} />
                            },
                            {
                                title: "Stories Carved by People",
                                desc: "We prioritize oral histories and local folklore. The human spirit matters more than the stone.",
                                icon: <History size={24} />
                            },
                            {
                                title: "A Living Cultural Network",
                                desc: "We don't just visit; we sustain. Our model funds local custodians and artisans.",
                                icon: <Globe size={24} />
                            }
                        ].map((item, i) => (
                            <div key={i} style={{ gridColumn: 'span 4' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }} // Staggered
                                    style={{ 
                                        padding: '48px 32px', 
                                        background: 'rgba(255,255,255,0.6)', 
                                        backdropFilter: 'blur(20px)', 
                                        borderRadius: '24px', 
                                        border: '1px solid rgba(255,255,255,0.8)',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ color: 'var(--color-spatial-accent)', marginBottom: '24px', padding: '16px', background: 'rgba(200, 163, 89, 0.1)', borderRadius: '50%' }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '16px' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>

            {/* --- CHAPTER 04: THE SYSTEM ("VISUAL TIMELINE") --- */}
            <section style={{ padding: '160px 0', background: '#1a1a1a', color: '#F9F7F2', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url(${holographicGrid})`, backgroundSize: '500px' }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ marginBottom: '80px' }}>
                        <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6, marginBottom: '16px' }}>
                            Chapter 04 — The System
                        </span>
                        <h2 className="text-display" style={{ fontSize: '3rem', color: 'white' }}>How We Operate</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {[
                            { step: "01", title: "Portal", icon: <Compass size={20} />, text: "Access to the hidden world." },
                            { step: "02", title: "Atlas", icon: <Map size={20} />, text: "Mapping the unmapped." },
                            { step: "03", title: "Journal", icon: <BookOpen size={20} />, text: "Documenting the narrative." },
                            { step: "04", title: "Context", icon: <Database size={20} />, text: "Deep cultural understanding." }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                                style={{ padding: '48px 32px', background: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(10px)', position: 'relative' }}
                            >
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-spatial-accent)', marginBottom: '24px', opacity: 0.8 }}>{s.step}</div>
                                <div style={{ marginBottom: '16px', color: 'white' }}>{s.icon}</div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{s.title}</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.5 }}>{s.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

             {/* --- CHAPTER 05: INVITATION ("CEREMONIAL CLOSING") --- */}
             <section style={{ padding: '160px 0 200px', textAlign: 'center' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ maxWidth: '700px', margin: '0 auto' }}
                    >
                        <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-spatial-accent)', marginBottom: '40px' }}>
                            Chapter 05 — Invitation
                        </span>
                        
                        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)', marginBottom: '60px' }} />

                        <h2 className="text-display" style={{ marginBottom: '2rem', fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                            The archives are open.
                        </h2>
                        
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '4rem', fontStyle: 'italic' }}>
                            "Step into the living archive."
                        </p>

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
            </section>

        </div>
    );
};

export default About;
