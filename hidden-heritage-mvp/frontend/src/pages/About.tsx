import NavBar from '../components/NavBar';
import { Users, Heart, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            {/* Hero Section */}
            <div className="relative text-center text-white" style={{ padding: '8rem 2rem 6rem', marginBottom: '4rem' }}>
                <div 
                    className="absolute inset-0 z-0" 
                    style={{ 
                        backgroundColor: '#2C2420', // Fallback color
                        backgroundImage: 'url("https://www.mptourism.com/web/images/about/history-banner-new.jpg")', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        filter: 'brightness(0.6)'
                    }}
                />
                <div className="container relative z-10" style={{ maxWidth: '800px' }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', textShadow: '0 4px 30px rgba(0,0,0,0.9)', color: '#FFFFFF' }}
                    >
                        About Hidden Heritage
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        We are more than a travel platform. We are a collective dedicated to keeping the echoes of history alive. 
                        Every stone has a voice, and we are here to listen.
                    </motion.p>
                </div>
            </div>

            <div className="container" style={{ padding: '0 2rem 4rem' }}>
                
                {/* Mission Values */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card glass" 
                        style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.6)' }}
                    >
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <Globe size={48} strokeWidth={1.5} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Legacy</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Documenting sites before they are lost to time, creating a digital archive for future generations.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="card glass" 
                        style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.6)' }}
                    >
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <Heart size={48} strokeWidth={1.5} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Devotion</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Fueled by a deep love for history and culture, ensuring the narratives of the past remain vibrant.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="card glass" 
                        style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.6)' }}
                    >
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <Users size={48} strokeWidth={1.5} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Community</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Connecting travelers with local guides and stories, fostering a network of heritage guardians.</p>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>The Minds Behind</span>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginTop: '0.5rem' }}>Our Team</h2>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {/* Team Member 1 */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="card glass" 
                            style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)', padding: 0 }}
                        >
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/India_-_Delhi_portrait_of_a_man_-_4780.jpg" 
                                alt="Arjun Verma" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Arjun Verma</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600, opacity: 0.8 }}>Founder & Lead Explorer</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                    An archaeologist turned tech entrepreneur, Arjun wants to make history accessible to everyone.
                                </p>
                            </div>
                        </motion.div>
                        
                        {/* Team Member 2 */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="card glass" 
                            style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)', padding: 0 }}
                        >
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/3/33/Indian_woman_portrait.jpg" 
                                alt="Priya Singh" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Priya Singh</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600, opacity: 0.8 }}>Head of Curation</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                    With a PhD in History, Priya ensures every story we tell is accurate and engaging.
                                </p>
                            </div>
                        </motion.div>

                        {/* Team Member 3 */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="card glass" 
                            style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)', padding: 0 }}
                        >
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/d/db/Indian_male_portrait.jpg" 
                                alt="Rahul Mehta" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Rahul Mehta</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600, opacity: 0.8 }}>Technology Lead</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                    Building the platform that connects the past with the future.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Awards/Recognition (Optional) */}
                <div style={{ textAlign: 'center', padding: '4rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500, background: 'rgba(255,255,255,0.5)', padding: '0.75rem 2rem', borderRadius: '50px', backdropFilter: 'blur(4px)' }}>
                        <Award size={24} className="text-secondary" /> 
                        <span>Recognized by the Heritage Conservation Society of India</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
