import { Compass, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ background: 'var(--color-charcoal)', color: 'var(--color-sandstone)', padding: '100px 0 60px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div className="grid-12" style={{ marginBottom: '60px' }}>
                    
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <div 
                            onClick={() => navigate('/')}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', cursor: 'pointer' }}
                        >
                            <div style={{ width: '32px', height: '32px', background: 'var(--color-accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
                                <Compass size={18} strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600 }}>Hidden Heritage</span>
                        </div>
                        <p style={{ color: 'rgba(249, 247, 242, 0.5)', marginBottom: '2rem', maxWidth: '300px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            A high-trust cultural technology platform preserving the unseen history of the subcontinent.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                                <button key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', border: 'none', color: 'white', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div style={{ gridColumn: 'span 2', gridColumnStart: 6 }}>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Explore</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Expeditions', 'Map View', 'Journal', 'Curated lists'].map(link => (
                                <li key={link}><button onClick={() => navigate('/explore')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}>{link}</button></li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['About Us', 'Manifesto', 'Careers', 'Contact'].map(link => (
                                <li key={link}><button onClick={() => navigate('/about')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}>{link}</button></li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ gridColumn: 'span 3' }}>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Join the Collective</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            Weekly digests of forgotten history, sent to your inbox.
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '12px', color: 'white', width: '100%', outline: 'none' }}
                            />
                            <button style={{ background: 'var(--color-gold)', border: 'none', borderRadius: '12px', padding: '0 24px', color: 'var(--color-charcoal)', fontWeight: 600, cursor: 'pointer' }}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                    <div>© {currentYear} Hidden Heritage. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
