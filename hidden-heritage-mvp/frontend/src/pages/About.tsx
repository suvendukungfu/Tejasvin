import NavBar from '../components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Shield, ArrowRight, BookOpen, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    
    // Parallax & Scale Transforms
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Textures
    const ancientStone = "https://images.unsplash.com/photo-1596230529625-7ee10f7b09b6?auto=format&fit=crop&q=80&w=2000";

    const values = [
        {
            icon: <Shield size={32} />,
            title: "Digital Preservation",
            desc: "Archiving the unarchived. We use high-fidelity photogrammetry to ensure no artifact is lost to the erosion of time."
        },
        {
            icon: <Fingerprint size={32} />,
            title: "The Human Mark",
            desc: "We prioritize oral histories and local folklore, capturing the human spirit that lived within the stone."
        },
        {
            icon: <Globe size={32} />,
            title: "Community Growth",
            desc: "Our revenue directly funds local artisans and site custodians, creating a sustainable loop of heritage care."
        }
    ];

    return (
        <div ref={containerRef} style={{ background: 'var(--color-bg-body)', position: 'relative' }}>
            <NavBar />
            
            {/* Ambient Background Glows */}
            <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '800px', height: '800px', background: 'var(--color-accent)', filter: 'blur(180px)', opacity: 0.05, zIndex: 0 }} />
            
            {/* --- HERO: THE MANIFESTO OPENER --- */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', inset: 0, opacity: opacityHero, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(250,250,250,0) 50%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                    <img 
                        src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000" 
                        alt="Ancient Ruins" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, filter: 'sepia(0.3) contrast(1.1)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 8' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                    <span style={{ height: '1px', width: '60px', background: 'var(--color-accent)' }}></span>
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                                        The Collective Manifesto
                                    </span>
                                </div>
                                <h1 className="text-display" style={{ marginBottom: '3rem', lineHeight: 1.05 }}>
                                    We protect what <br/>
                                    the world <span style={{ fontStyle: 'italic', color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>forgot.</span>
                                </h1>
                                <p style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', maxWidth: '700px', lineHeight: 1.6, fontWeight: 300, opacity: 0.8 }}>
                                    Hidden Heritage is a high-tech archival guild dedicated to mapping the subcontinent's invisible history. We believe every ruin has a voice, and every brick carries a memory.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}
                >
                    <div style={{ width: '1px', height: '60px', background: 'var(--color-primary)' }} />
                </motion.div>
            </section>

            {/* --- STORY: EDITORIAL SPLIT --- */}
            <section className="section-pad" style={{ background: 'white' }}>
                <div className="container">
                    <motion.div style={{ y: yContent }}>
                        <div className="grid-12" style={{ alignItems: 'center' }}>
                            <div style={{ gridColumn: 'span 5' }}>
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                >
                                    <h2 className="text-h1" style={{ marginBottom: '2rem' }}>Born from Dust.</h2>
                                    <p className="text-body" style={{ marginBottom: '2.5rem', color: 'var(--color-text-secondary)' }}>
                                        Our journey began in the silence of a forgotten stepwell in Bundelkhand. There were no plaques, no ticket counters—only the deep, resonant history of a people whose stories were being erased by the passage of time.
                                    </p>
                                    <div style={{ padding: '2.5rem', background: '#F9F9F9', borderLeft: '4px solid var(--color-accent)', borderRadius: '0 24px 24px 0', marginBottom: '3rem' }}>
                                        <blockquote style={{ fontSize: '1.4rem', fontStyle: 'italic', fontFamily: 'var(--font-display)', color: 'var(--color-primary)', lineHeight: 1.5 }}>
                                            "A civilization is not remembered by its wars, but by the quiet beauty of the structures it left behind for the dreamers."
                                        </blockquote>
                                        <cite style={{ display: 'block', marginTop: '1.5rem', fontStyle: 'normal', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
                                            — Founder's Log, 2024
                                        </cite>
                                    </div>
                                    <button onClick={() => navigate('/explore')} className="btn-cinematic" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--color-primary)', border: '1px solid rgba(0,0,0,0.1)' }}>
                                        See the Archive <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            </div>

                            <div style={{ gridColumn: '7 / span 6' }}>
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2 }}
                                    className="heritage-tile"
                                    style={{ height: '700px', borderRadius: '40px', boxShadow: '0 60px 120px -20px rgba(0,0,0,0.15)' }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1590050752117-23a9d7fc2140?auto=format&fit=crop&q=80&w=1200" 
                                        alt="Archivist at Work" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '32px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase' }}>Current Focus</div>
                                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-primary)' }}>The Chambal Ravine Project</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- VALUES: THE CODEX --- */}
            <section className="section-pad" style={{ 
                background: '#FBFBFB',
                backgroundImage: `url(${ancientStone})`,
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover'
            }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem' }}>The Guardians' Codex</span>
                        <h2 className="text-h1" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>Built on Honor.</h2>
                        <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '1.1rem' }}>Our operations are guided by a strict ethical framework to protect the sites we love.</p>
                    </div>

                    <div className="grid-12">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                style={{ gridColumn: 'span 4' }}
                            >
                                <div className="heritage-tile" style={{ padding: '4rem 3rem', background: 'white', height: '100%', borderRadius: '32px', textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'rgba(200, 163, 89, 0.1)', borderRadius: '24px', color: 'var(--color-accent)', marginBottom: '2.5rem' }}>
                                        {v.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>{v.title}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINALE --- */}
            <section style={{ padding: '10rem 0', textAlign: 'center' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-display" style={{ marginBottom: '2.5rem', fontSize: 'clamp(3rem, 5vw, 4rem)' }}>The archives <br/> are open.</h2>
                        <button onClick={() => navigate('/register')} className="btn-cinematic btn-primary" style={{ padding: '22px 64px', fontSize: '1.1rem', fontWeight: 700 }}>
                            Join the Expedition
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
