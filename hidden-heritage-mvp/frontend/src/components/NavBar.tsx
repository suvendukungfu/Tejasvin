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
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    x: '-50%'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--material-glass)',
                    backdropFilter: 'var(--material-blur)',
                    WebkitBackdropFilter: 'var(--material-blur)',
                    padding: '6px',
                    borderRadius: '100px',
                    border: 'var(--material-glass-border)',
                    boxShadow: 'var(--material-shadow-float)',
                }}>
                    
                    {/* Brand Signet */}
                    <div 
                        onClick={() => navigate('/')} 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', paddingLeft: '12px', paddingRight: '12px' }}
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

                    {/* Sliding Navigation Pills */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '2px', position: 'relative' }}>
                        {[
                            { name: 'Portal', path: '/' },
                            { name: 'Atlas', path: '/explore' },
                            { name: 'Log', path: '/book' },
                            { name: 'Context', path: '/about' }
                        ].map(link => {
                            const isSelected = isActive(link.path);
                            
                            return (
                                <motion.div
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    whileHover={isSelected ? { scale: 1.05 } : { scale: 1.05, backgroundColor: 'rgba(28, 25, 23, 0.04)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        position: 'relative',
                                        padding: '8px 20px',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                        borderRadius: '100px',
                                        background: 'transparent'
                                    }}
                                >
                                    {/* Active Indicator (The Sliding Pill) */}
                                    {isSelected && (
                                        <motion.div
                                            layoutId="active-pill"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '100px',
                                                background: 'var(--color-spatial-text)',
                                                zIndex: -1
                                            }}
                                        />
                                    )}
                                    
                                    {/* Label */}
                                    <span style={{
                                        position: 'relative',
                                        fontSize: '0.85rem',
                                        fontWeight: isSelected ? 600 : 500,
                                        color: isSelected ? 'var(--color-spatial-ivory)' : 'var(--color-text-primary)',
                                        transition: 'color 0.2s ease-out',
                                        zIndex: 2
                                    }}>
                                        {link.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Auth Status */}
                    <div style={{ marginLeft: '4px', paddingRight: '4px' }}>
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
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
