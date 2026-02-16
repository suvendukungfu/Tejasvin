import { Compass, Instagram, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ 
            background: 'var(--color-spatial-bg)', 
            color: 'var(--color-spatial-text)', 
            padding: '80px 0 40px', 
            marginTop: 'auto', 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container">
                <div className="grid-12" style={{ marginBottom: '60px', alignItems: 'start' }}>
                    
                    {/* Zone 1: Brand Presence (Left) */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div 
                                onClick={() => navigate('/')}
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', cursor: 'pointer' }}
                            >
                                <div style={{ width: '32px', height: '32px', background: 'var(--color-spatial-accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <Compass size={18} strokeWidth={2.5} />
                                </div>
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-spatial-text)' }}>Hidden Heritage</span>
                            </div>
                            <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '2rem', maxWidth: '300px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                A high-trust cultural technology platform preserving the unseen history of the subcontinent.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                                    <motion.button 
                                        key={i} 
                                        whileHover={{ y: -3, backgroundColor: 'rgba(0,0,0,0.08)' }}
                                        style={{ 
                                            background: 'rgba(0,0,0,0.04)', 
                                            padding: '10px', 
                                            borderRadius: '50%', 
                                            border: 'none', 
                                            color: 'var(--color-spatial-text)', 
                                            cursor: 'pointer', 
                                            transition: 'background 0.2s' 
                                        }}
                                    >
                                        <Icon size={18} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Zone 2: Navigation (Center) - 2 Columns */}
                    <div style={{ gridColumn: 'span 2', gridColumnStart: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <h4 style={{ color: 'var(--color-spatial-text)', marginBottom: '1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7 }}>Explore</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Expeditions', 'Map View', 'Journal', 'Curated lists'].map(link => (
                                    <li key={link}>
                                        <button 
                                            onClick={() => navigate('/explore')} 
                                            style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: 'var(--color-spatial-text)', 
                                                cursor: 'pointer', 
                                                padding: 0, 
                                                fontSize: '0.95rem',
                                                textAlign: 'left',
                                                transition: 'opacity 0.2s',
                                                opacity: 0.8
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h4 style={{ color: 'var(--color-spatial-text)', marginBottom: '1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7 }}>Company</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['About Us', 'Manifesto', 'Careers', 'Contact'].map(link => (
                                    <li key={link}>
                                        <button 
                                            onClick={() => navigate('/about')} 
                                            style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: 'var(--color-spatial-text)', 
                                                cursor: 'pointer', 
                                                padding: 0, 
                                                fontSize: '0.95rem',
                                                textAlign: 'left',
                                                transition: 'opacity 0.2s',
                                                opacity: 0.8
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Zone 3: Collective Join Module (Right - Glass Card) */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ 
                                background: 'rgba(255,255,255,0.4)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '32px',
                                border: '1px solid rgba(255,255,255,0.5)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                            }}
                        >
                            <h4 style={{ color: 'var(--color-spatial-text)', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Join the Collective</h4>
                            <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                Weekly digests of forgotten history and cultural technology, sent directly to your neural feed.
                            </p>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="email" 
                                    placeholder="Email address" 
                                    style={{ 
                                        background: 'rgba(255,255,255,0.6)', 
                                        border: '1px solid rgba(0,0,0,0.1)', 
                                        padding: '16px 50px 16px 18px', 
                                        borderRadius: '12px', 
                                        color: 'var(--color-spatial-text)', 
                                        width: '100%', 
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        fontSize: '0.95rem'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.05)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.6)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <button style={{ 
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'var(--color-spatial-text)', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    width: '36px',
                                    height: '36px',
                                    color: 'white', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.2s'
                                }}>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Sub-Footer */}
                <div style={{ 
                    borderTop: '1px solid rgba(0,0,0,0.06)', 
                    paddingTop: '30px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    fontSize: '0.85rem', 
                    color: 'rgba(0,0,0,0.4)' 
                }}>
                    <div>© {currentYear} Hidden Heritage. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-spatial-text)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Privacy Policy</span>
                        <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-spatial-text)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Terms of Service</span>
                        <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-spatial-text)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.4)'}>Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
