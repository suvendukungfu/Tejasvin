import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Heritage Cinematic Assets
import chambalValley from '../assets/heritage/chambal_valley.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, PlayCircle, Globe, ArrowRight, Shield } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} style={{ background: 'var(--color-bg-body)', overflow: 'hidden', minHeight: '100vh' }}>
            <NavBar />

            {/* --- I. ARRIVAL: THE PORTAL ENTRY --- */}
            <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.div 
                    style={{ position: 'absolute', inset: 0, scale: 1.1, y: yHero, opacity: opacityHero, zIndex: 0 }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg-body) 90%)', zIndex: 2 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), var(--color-bg-body))', zIndex: 1 }} />
                    <img 
                        src={chambalValley} 
                        alt="Heritage Atmosphere" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, filter: 'grayscale(100%) contrast(1.2)' }} 
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <h1 className="text-display" style={{ 
                            marginBottom: '2rem', 
                            color: 'var(--color-charcoal)', 
                            letterSpacing: '-0.03em',
                            textShadow: '0 0 80px rgba(255,255,255,0.3)'
                        }}>
                            Hidden Heritage
                        </h1>
                        <p style={{ 
                            fontSize: '1.125rem', 
                            color: 'var(--color-text-secondary)', 
                            letterSpacing: '0.2em', 
                            textTransform: 'uppercase', 
                            marginBottom: '4rem' 
                        }}>
                             Operating System v1.0
                        </p>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button 
                                onClick={() => navigate('/explore')} 
                                className="glass-panel" 
                                style={{ 
                                    padding: '24px 64px', 
                                    borderRadius: '100px', 
                                    color: 'var(--color-gold)', 
                                    fontSize: '1.25rem', 
                                    fontWeight: 500,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}
                            >
                                Enter The Archive <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- II. AWAKENING: THE NARRATIVE --- */}
            <section style={{ padding: '200px 0', position: 'relative' }}>
                <div className="container">
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 6' }}>
                            <motion.div 
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2 }}
                            >
                                <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '32px' }}>// 01. Origin Story</span>
                                <h2 className="text-h1" style={{ marginBottom: '40px', color: 'white' }}>
                                    Your Memory is <br/><span style={{ color: 'var(--color-text-secondary)' }}>Deleting Itself.</span>
                                </h2>
                                <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '48px', maxWidth: '85%' }}>
                                    History is not stone; it is signal. Every day, centuries of data decay into silence. We built the Heritage OS to digitize, preserve, and project human legacy before the signal is lost.
                                </p>
                            </motion.div>
                        </div>
                         <div style={{ gridColumn: 'span 6', position: 'relative' }}>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5 }}
                                className="glass-panel"
                                style={{ height: '600px', borderRadius: '48px', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.1), transparent)' }} />
                                <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <div>
                                            <div style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'white' }}>87%</div>
                                            <div style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Data Integrity</div>
                                        </div>
                                        <Globe size={48} color="var(--color-gold)" style={{ opacity: 0.5 }} />
                                     </div>
                                </div>
                            </motion.div>
                         </div>
                    </div>
                </div>
            </section>

            {/* --- III. EXPLORATION: SPATIAL GATEWAY --- */}
            <section style={{ padding: '200px 0', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '120px' }}>
                         <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// 02. The Interface</span>
                         <h2 className="text-display" style={{ fontSize: '5rem', marginTop: '24px', whiteSpace: 'nowrap' }}>Spatial Discovery</h2>
                    </div>

                    <div className="grid-12">
                        <motion.div 
                            style={{ gridColumn: 'span 4' }}
                            whileHover={{ y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="heritage-tile" style={{ height: '500px', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <Compass size={40} color="var(--color-gold)" style={{ marginBottom: '32px' }} />
                                    <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'white' }}>Expeditions</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                        Curated journeys through the Chambal Valley and Gwalior Fort.
                                    </p>
                                </div>
                                <button onClick={() => navigate('/book')} className="btn-cinematic" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>Initialize <ArrowRight size={16} /></button>
                            </div>
                        </motion.div>

                        <motion.div 
                            style={{ gridColumn: 'span 4', marginTop: '80px' }}
                            whileHover={{ y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="heritage-tile" style={{ height: '500px', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.1), rgba(255,255,255,0.02))' }}>
                                <div>
                                    <PlayCircle size={40} color="var(--color-gold)" style={{ marginBottom: '32px' }} />
                                    <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'white' }}>AR / VR Core</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                        Full-scale photogrammetry scans rendered in your browser.
                                    </p>
                                </div>
                                <button onClick={() => navigate('/antigravity')} className="btn-cinematic" style={{ background: 'var(--color-gold)', color: 'black' }}>Launch Viewer</button>
                            </div>
                        </motion.div>

                        <motion.div 
                             style={{ gridColumn: 'span 4' }}
                             whileHover={{ y: -20 }}
                             transition={{ duration: 0.4 }}
                        >
                            <div className="heritage-tile" style={{ height: '500px', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <Shield size={40} color="var(--color-gold)" style={{ marginBottom: '32px' }} />
                                    <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'white' }}>Deep Intel</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                        AI-reconstructed legendary contexts and safety matrices.
                                    </p>
                                </div>
                                <button onClick={() => navigate('/explore')} className="btn-cinematic" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>Access Database</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

             {/* --- IV. MEANING: LIVING IMPACT --- */}
             <section style={{ padding: '0 0 200px 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '120px 0', textAlign: 'center', borderRadius: '64px' }}>
                        <h2 className="text-h1" style={{ marginBottom: '64px', color: 'white' }}>Global Telemetry</h2>
                        
                        <div className="grid-12">
                             <div style={{ gridColumn: 'span 4', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gold)', lineHeight: 1 }}>12k</div>
                                <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Explorers Active</div>
                             </div>
                             <div style={{ gridColumn: 'span 4', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '5rem', fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1 }}>850</div>
                                <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sites Preserved</div>
                             </div>
                             <div style={{ gridColumn: 'span 4' }}>
                                <div style={{ fontSize: '5rem', fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1 }}>∞</div>
                                <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>History Saved</div>
                             </div>
                        </div>
                    </div>
                </div>
             </section>

            {/* --- V. TRANSFORMATION: THE CALL --- */}
            <section style={{ padding: '0 0 100px 0', textAlign: 'center' }}>
                <div className="container">
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', marginBottom: '32px' }}>System Access Open</p>
                    <h2 className="text-display" style={{ fontSize: '6rem', color: 'white', marginBottom: '64px', letterSpacing: '-0.02em' }}>Begin Transmission.</h2>
                    <button onClick={() => navigate('/register')} className="btn-cinematic" style={{ background: 'white', color: 'black', padding: '24px 80px', fontSize: '1.25rem' }}>
                        Create Identity
                    </button>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Home;
