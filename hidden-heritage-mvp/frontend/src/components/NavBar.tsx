import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Menu, X, Circle, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Safely use auth context
    let auth: any = {};
    try {
        auth = useAuth();
    } catch (e) {
        // Fallback
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Signal', path: '/' },
        { name: 'Atlas', path: '/explore' },
        { name: 'Log', path: '/book' },
        { name: 'Context', path: '/about' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: scrolled ? '20px' : '40px', 
                    zIndex: 1000,
                    transition: 'padding 0.4s var(--ease-neural)',
                    pointerEvents: 'none' // Allow clicks through to scene
                }}
            >
                <div 
                    className="container" 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}
                >
                    {/* Neural Brand Pill */}
                    <motion.div
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            pointerEvents: 'auto',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: scrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.0)',
                            backdropFilter: scrolled ? 'blur(20px)' : 'none',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                            transition: 'background 0.4s, border 0.4s'
                        }}
                    >
                        <Compass size={24} color="var(--color-neural-accent)" strokeWidth={1.5} />
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: 'var(--color-text-primary)',
                            opacity: scrolled ? 1 : 0.9,
                        }}>Hidden Heritage</span>
                    </motion.div>

                    {/* Desktop Contextual Nav (Magnetic) */}
                    <div className="desktop-menu" style={{ 
                        pointerEvents: 'auto',
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(20px)',
                        padding: '6px',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.4)',
                        display: 'flex',
                        gap: '4px',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                    }}>
                        {navLinks.map((link) => (
                            <MagneticItem key={link.name}>
                                <button
                                    onClick={() => navigate(link.path)}
                                    style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.02em',
                                        color: isActive(link.path) ? 'white' : 'var(--color-text-primary)',
                                        background: isActive(link.path) ? 'var(--color-text-primary)' : 'transparent',
                                        transition: 'background 0.3s, color 0.3s',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '10px 24px',
                                        borderRadius: '100px',
                                        position: 'relative',
                                        zIndex: 2
                                    }}
                                >
                                    {link.name}
                                </button>
                            </MagneticItem>
                        ))}
                    </div>

                    {/* Auth Status Endpoint */}
                    <div style={{ pointerEvents: 'auto' }}>
                        {auth.user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                                <Circle size={8} fill="#10B981" color="#10B981" />
                                {auth.user.name.split(' ')[0]}
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="desktop-menu"
                                style={{ 
                                    padding: '10px 24px', 
                                    fontSize: '0.9rem',
                                    background: 'var(--color-text-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Connect <ArrowRight size={14} />
                            </motion.button>
                        )}
                        
                         {/* Mobile Trigger */}
                         <button 
                            className="mobile-toggle" 
                            onClick={toggleMenu} 
                            style={{ 
                                display: 'none', 
                                background: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>
             <style>{`
                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                }
            `}</style>
        </>
    );
};

// --- MAGNETIC ITEM COMPONENT ---
const MagneticItem = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    
    // Use motion values for raw input
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth them with springs
    const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            x.set(middleX * 0.2); // Sensitivity
            y.set(middleY * 0.2);
        }
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};

export default NavBar;
