import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


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
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Journal', path: '/book' },
        { name: 'About', path: '/about' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '88px', 
            zIndex: 1000,
            transition: 'all 0.4s var(--ease-out)',
            background: scrolled ? 'rgba(249, 247, 242, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            borderBottom: scrolled ? 'var(--border-subtle)' : '1px solid transparent',
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                {/* Logo Area */}
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        color: 'var(--color-charcoal)',
                        position: 'relative',
                        zIndex: 1002
                    }}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--color-charcoal)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-sandstone)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <Compass size={22} strokeWidth={2} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.03em',
                        color: 'var(--color-charcoal)',
                        opacity: scrolled ? 1 : (isActive('/') ? 1 : 0.9)
                    }}>Hidden Heritage</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ 
                        display: 'flex',
                        gap: '24px'
                    }}>
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => navigate(link.path)}
                                style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: isActive(link.path) ? 'var(--color-charcoal)' : 'rgba(26, 26, 26, 0.6)',
                                    background: 'transparent',
                                    transition: 'all 0.3s var(--ease-out)',
                                    position: 'relative',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px 0'
                                }}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div 
                                        layoutId="active-pill"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: '2px', background: 'var(--color-gold)', borderRadius: '2px', boxShadow: '0 0 8px var(--color-gold)' }} 
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)', margin: '0 16px' }} />

                    {auth.user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{auth.user.name.split(' ')[0]}</span>
                            <button
                                onClick={auth.logout}
                                style={{ 
                                    padding: '8px 20px', 
                                    borderRadius: '100px', 
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s',
                                    background: 'transparent',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="btn-cinematic btn-outline"
                            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                        >
                            Sign In
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-toggle" 
                    onClick={toggleMenu} 
                    style={{ 
                        display: 'none', 
                        color: 'var(--color-text-primary)',
                        zIndex: 1002,
                        position: 'relative',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            
             <style>{`
                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
