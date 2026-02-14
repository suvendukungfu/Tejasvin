import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Heritage Cinematic Assets
import chambalValley from '../assets/heritage/chambal_valley.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, PlayCircle, Users, Globe } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    // Parallax & Hero Transforms
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <div ref={containerRef} style={{ background: 'var(--color-bg-body)', overflow: 'hidden' }}>
            <NavBar />

            {/* --- HERO SECTION: CINEMATIC ENTRY --- */}
            <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <motion.div 
                    style={{ position: 'absolute', inset: 0, scale: 1.1, y: yHero, opacity: opacityHero, zIndex: 0 }}
                >
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.2), var(--color-bg-body))',
                        zIndex: 1 
                    }} />
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to right, var(--color-charcoal) 20%, transparent 80%)',
                        zIndex: 2 
                    }} />
                    <img 
                        src={chambalValley} 
                        alt="Heritage Atmosphere" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, filter: 'grayscale(30%) brightness(0.8)' }} 
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 8' }}>
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                    <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
                                    <span style={{ 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.3em', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 800, 
                                        color: 'var(--color-gold)' 
                                    }}>
                                        A Cultural Technology Platform
                                    </span>
                                </div>
                                
                                <h1 className="text-display" style={{ 
                                    marginBottom: '32px', 
                                    color: 'var(--color-sandstone)', 
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1 
                                }}>
                                    Step into the <br/>
                                    <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}>Unseen Past.</span>
                                </h1>
                                
                                <p className="text-max-width" style={{ 
                                    fontSize: '1.25rem', 
                                    color: 'rgba(249, 247, 242, 0.7)', 
                                    marginBottom: '48px', 
                                    lineHeight: 1.6, 
                                    fontWeight: 400 
                                }}>
                                    Bridging the gap between artifacts and memory through high-fidelity AR/VR exploration. Hidden Heritage is the terminal for the world's deep cultural history.
                                </p>

                                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                    <button 
                                        onClick={() => navigate('/explore')} 
                                        className="btn-cinematic btn-primary" 
                                        style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)' }}
                                    >
                                        Explore Regions
                                        <Compass size={18} />
                                    </button>
                                    <button onClick={() => navigate('/about')} className="btn-cinematic" style={{ color: 'var(--color-sandstone)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        Our Vision
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Sub-Brand Footer Line */}
                <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 10, display: 'flex', gap: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    <span>Scanning Chamber v2.1</span>
                    <span>Lat: 26.2183° N</span>
                    <span>Long: 78.1785° E</span>
                </div>
            </section>

            {/* --- VISION SECTION: EDITORIAL STORYTELLING --- */}
            <section style={{ padding: '160px 0', background: 'var(--color-sandstone)' }}>
                <div className="container">
                    <div className="grid-12" style={{ alignItems: 'center' }}>
                        <div style={{ gridColumn: 'span 5' }}>
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <span style={{ color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '24px' }}>Strategic Mandate</span>
                                <h2 className="text-h1" style={{ marginBottom: '32px', color: 'var(--color-charcoal)' }}>Preservation <br/>is not Passive.</h2>
                                <p style={{ fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.7)', lineHeight: 1.7 }}>
                                    We move beyond dusty archives. By digitizing forgotten landscapes into immersive spatial experiences, we ensure the survival of human legacy against the erosion of time.
                                </p>
                            </motion.div>
                        </div>
                        <div style={{ gridColumn: '6 / span 7' }}>
                            <div style={{ position: 'relative', height: '600px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15)' }}>
                                <img src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=1200" alt="Archaeological Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '24px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '4px' }}>Deep Scan #402</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>Bateshwar Pillar Analysis</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>VERIFIED ACQUISITION</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE SECTION: THE PORTAL --- */}
            <section style={{ padding: '120px 0', background: 'var(--color-charcoal)', position: 'relative' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-h1" 
                            style={{ color: 'var(--color-sandstone)', marginBottom: '24px' }}
                        >
                            The Portal to <span style={{ color: 'var(--color-gold)' }}>Deep Time.</span>
                        </motion.h2>
                        <p style={{ margin: '0 auto', maxWidth: '640px', color: 'rgba(249, 247, 242, 0.5)', fontSize: '1.25rem' }}>
                            Experience high-fidelity photogrammetry scans of sites that have been inaccessible for centuries.
                        </p>
                    </div>

                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 4' }}>
                            <div className="heritage-tile" style={{ height: '500px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <PlayCircle size={48} color="var(--color-gold)" style={{ margin: '0 auto 32px auto' }} />
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'white', fontFamily: 'var(--font-display)' }}>Virtual Pilgrimage</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '32px' }}>
                                    Walk through the Bateshwar Valley as it stood in the 8th century, recreated through neural rendering.
                                </p>
                                <button onClick={() => navigate('/antigravity')} className="btn-cinematic" style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)', width: '100%', borderRadius: '32px' }}>
                                    Launch AR View
                                </button>
                            </div>
                        </div>
                        <div style={{ gridColumn: '5 / span 8' }}>
                            <div style={{ height: '500px', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
                                <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1500" alt="Spatial Portal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Compass size={64} color="var(--color-gold)" style={{ marginBottom: '24px' }} />
                                        <div style={{ color: 'white', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Spatial Mapping Active</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMPACT SECTION: EDITORIAL LAYOUT --- */}
            <section style={{ padding: '160px 0', background: 'var(--color-sandstone)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
                        <div>
                            <span style={{ color: 'var(--color-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', marginBottom: '16px' }}>Impact Metrics</span>
                            <h2 className="text-h1" style={{ color: 'var(--color-charcoal)' }}>Quantifying <br/>Heritage.</h2>
                        </div>
                        <div style={{ maxWidth: '400px', textAlign: 'right' }}>
                            <p style={{ color: 'rgba(26, 26, 26, 0.6)', fontSize: '1.125rem' }}>Our data-driven approach to preservation ensures that every scan serves a dual purpose: academic rigor and public awe.</p>
                        </div>
                    </div>

                    <div className="grid-12">
                        <div style={{ gridColumn: 'span 4' }}>
                            <div className="heritage-tile" style={{ padding: '64px 40px' }}>
                                <Users size={32} color="var(--color-gold)" style={{ marginBottom: '24px' }} />
                                <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-charcoal)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>12k+</div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(26, 26, 26, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preservationists Joined</div>
                            </div>
                        </div>
                        <div style={{ gridColumn: 'span 4' }}>
                            <div className="heritage-tile" style={{ padding: '64px 40px' }}>
                                <Globe size={32} color="var(--color-gold)" style={{ marginBottom: '24px' }} />
                                <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-charcoal)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>850</div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(26, 26, 26, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sites Digitized</div>
                            </div>
                        </div>
                        <div style={{ gridColumn: 'span 4' }}>
                            <div className="heritage-tile" style={{ padding: '64px 40px', background: 'var(--color-charcoal)' }}>
                                <Compass size={32} color="var(--color-gold)" style={{ marginBottom: '24px' }} />
                                <div style={{ fontSize: '3rem', fontWeight: 600, color: 'var(--color-gold)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>100%</div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Accuracy Guaranteed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CONVERSION: THE INVITATION --- */}
            <section style={{ padding: '160px 0', background: 'var(--color-charcoal)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'rgba(200, 163, 89, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }} />
                
                <div className="container">
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                         <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 20px', background: 'var(--color-gold)', borderRadius: '100px', marginBottom: '32px' }}>
                             <div style={{ width: '8px', height: '8px', background: 'var(--color-charcoal)', borderRadius: '50%' }} />
                             <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-charcoal)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Open to the Public</span>
                        </div>
                        <h2 className="text-display" style={{ fontSize: '4.5rem', marginBottom: '40px', color: 'var(--color-charcoal)' }}>Secure Your Membership.</h2>
                        <p className="text-max-width" style={{ margin: '0 auto 64px auto', fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.6)' }}> Access the world’s most significant cultural portals. No subscription required for explorers. </p>
                        
                        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                            <button onClick={() => navigate('/register')} className="btn-cinematic btn-primary" style={{ padding: '24px 64px', fontSize: '1.125rem' }}>
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
