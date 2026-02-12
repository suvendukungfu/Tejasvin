import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Safely use auth context
    let auth: any = {};
    try {
        auth = useAuth();
    } catch (e) {
        // Fallback
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="glass navbar" style={{ 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255, 255, 255, 0.8)', // Slightly more opaque for better readability
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
            zIndex: 1000
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '80px' }}>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--color-primary)',
                        fontWeight: 800,
                        fontSize: '1.8rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.03em'
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
                        padding: '8px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(216, 67, 21, 0.2)'
                    }}>
                        <Compass size={24} color="white" strokeWidth={2.5} />
                    </div>
                    <span>Hidden Heritage</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <NavLink onClick={() => navigate('/')}>Home</NavLink>
                    <NavLink onClick={() => navigate('/explore')}>Explore</NavLink>
                    <NavLink onClick={() => navigate('/book')}>Bookings</NavLink>
                    <NavLink onClick={() => navigate('/about')}>About</NavLink>
                    {/* <NavLink onClick={() => navigate('/pricing')}>Pricing</NavLink> */}

                    {auth.user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>Hi, {auth.user.name.split(' ')[0]}</span>
                            <button
                                onClick={auth.logout}
                                className="btn-outline"
                                style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', borderColor: 'var(--color-error)', color: 'var(--color-error)', borderRadius: '50px', fontWeight: 600 }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                            style={{ padding: '0.7rem 1.8rem', fontSize: '0.95rem', borderRadius: '50px', fontWeight: 600, boxShadow: '0 4px 15px rgba(216, 67, 21, 0.25)' }}
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={toggleMenu} style={{ display: 'none', color: 'var(--color-primary)' }}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Placeholder for responsiveness) */}
            {/* ... styles ... */}
        </nav>
    );
};

const NavLink = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="nav-link"
        style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--color-text-main)',
            transition: 'color 0.2s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-secondary)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-main)'}
    >
        {children}
    </button>
);

export default NavBar;
