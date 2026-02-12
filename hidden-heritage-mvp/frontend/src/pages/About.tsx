import NavBar from '../components/NavBar';
import { Users, Heart, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, var(--color-bg-alt) 0%, #e8e0d5 100%)', 
                padding: '6rem 2rem', 
                textAlign: 'center',
                marginBottom: '4rem',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                    >
                        Uncovering the Unseen
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}
                    >
                        Hidden Heritage is dedicated to shining a light on the forgotten architectural marvels of India. 
                        We believe that every stone has a story, and every ruined pillar whispers the secrets of the past.
                    </motion.p>
                </div>
            </div>

            <div className="container" style={{ padding: '0 2rem 4rem' }}>
                
                {/* Mission Values */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Globe size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Preservation</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Documenting sites before they are lost to time.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Heart size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Passion</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Fueled by a deep love for history and culture.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Users size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Community</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Connecting travelers with local guides and stories.</p>
                    </div>
                </div>

                {/* Team Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>Meet the Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {/* Team Member 1 */}
                        <div className="card glass" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                                alt="Arjun Verma" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Arjun Verma</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Founder & Lead Explorer</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    An archaeologist turned tech entrepreneur, Arjun wants to make history accessible to everyone.
                                </p>
                            </div>
                        </div>
                        
                        {/* Team Member 2 */}
                        <div className="card glass" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
                                alt="Priya Singh" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Priya Singh</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Head of Curation</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    With a PhD in History, Priya ensures every story we tell is accurate and engaging.
                                </p>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="card glass" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.6)' }}>
                            <img 
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" 
                                alt="Rahul Mehta" 
                                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1.75rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Rahul Mehta</h3>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Technology Lead</p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    Building the platform that connects the past with the future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Awards/Recognition (Optional) */}
                <div style={{ textAlign: 'center', padding: '4rem 0', borderTop: '1px solid #eee' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        <Award size={20} /> Recognized by the Heritage Conservation Society of India
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
