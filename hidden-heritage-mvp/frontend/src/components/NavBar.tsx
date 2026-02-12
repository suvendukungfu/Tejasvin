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
        <nav className="glass navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        fontSize: '1.75rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.02em'
                    }}
                >
                    <Compass size={32} color="var(--color-secondary)" />
                    <span>Hidden Heritage</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <NavLink onClick={() => navigate('/')}>Home</NavLink>
                    <NavLink onClick={() => navigate('/explore')}>Explore</NavLink>
                    <NavLink onClick={() => navigate('/book')}>Bookings</NavLink>
                    <NavLink onClick={() => navigate('/about')}>About</NavLink>
                    <NavLink onClick={() => navigate('/pricing')}>Pricing</NavLink>

                    {auth.user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>Hi, {auth.user.name.split(' ')[0]}</span>
                            <button
                                onClick={auth.logout}
                                className="btn-outline"
                                style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', borderColor: 'var(--color-error)', color: 'var(--color-error)', borderRadius: '20px' }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                            style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}
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
    >
        {children}
    </button>
);

export default NavBar;
