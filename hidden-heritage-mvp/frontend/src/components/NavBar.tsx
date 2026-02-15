import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Auth hook
    let auth: any = {};
    try { auth = useAuth(); } catch (e) {}

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                style={{
                    position: 'fixed',
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)', // Centered pill
                    zIndex: 1000,
                    x: '-50%' // Framer motion transform adjustment
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--material-glass)',
                    backdropFilter: 'var(--material-blur)',
                    WebkitBackdropFilter: 'var(--material-blur)',
                    padding: '8px 8px 8px 16px', // Balanced padding
                    borderRadius: '100px',
                    border: 'var(--material-glass-border)',
                    boxShadow: 'var(--material-shadow-float)',
                }}>
                    
                    {/* Brand Signet */}
                    <div 
                        onClick={() => navigate('/')} 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginRight: '8px' }}
                    >
                        <Compass size={20} color="var(--color-spatial-accent)" strokeWidth={2} />
                        <span style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontWeight: 600, 
                            fontSize: '1rem', 
                            letterSpacing: '-0.01em',
                            color: 'var(--color-spatial-text)' 
                        }}>
                            Hidden Heritage
                        </span>
                    </div>

                    {/* Navigation Pills */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '4px' }}>
                        {[
                            { name: 'Portal', path: '/' },
                            { name: 'Atlas', path: '/explore' },
                            { name: 'Log', path: '/book' },
                            { name: 'Context', path: '/about' }
                        ].map(link => (
                            <motion.button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: isActive(link.path) ? 'var(--color-spatial-text)' : 'transparent',
                                    color: isActive(link.path) ? 'white' : 'var(--color-text-primary)',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'background 0.3s var(--ease-cinema)'
                                }}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Auth Status */}
                    <div style={{ marginLeft: '8px' }}>
                        {auth.user ? (
                            <div style={{ width: '36px', height: '36px', background: 'var(--color-bg-body)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{auth.user.name.charAt(0)}</span>
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate('/login')}
                                style={{
                                    width: '36px', 
                                    height: '36px', 
                                    borderRadius: '50%', 
                                    background: 'var(--color-spatial-text)',
                                    border: 'none', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <ArrowRight size={16} color="white" />
                            </button>
                        )}
                    </div>

                </div>
            </motion.nav>

            {/* Mobile Menu Trigger (Bottom Right for Ergonomics) */}
             <style>{`
                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                }
            `}</style>
        </>
    );
};

// --- MAGNETIC ITEM COMPONENT REMOVED (Legacy) ---
// The new Spatial HUD uses standard framer motion interactions.

export default NavBar;
