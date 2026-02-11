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
        <nav style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-heading)'
                    }}
                >
                    <Compass size={28} />
                    <span>Hidden Heritage</span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <NavLink onClick={() => navigate('/')}>Home</NavLink>
                    <NavLink onClick={() => navigate('/explore')}>Explore</NavLink>
                    <NavLink onClick={() => navigate('/book')}>Bookings</NavLink>
                    <NavLink onClick={() => navigate('/about')}>About</NavLink>

                    {auth.user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid #eee' }}>
                            <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>Hi, {auth.user.name.split(' ')[0]}</span>
                            <button
                                onClick={auth.logout}
                                className="btn-outline"
                                style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={toggleMenu} style={{ display: 'none' }}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Placeholder for responsiveness) */}
            {/* Note: Actual mobile responsiveness would require media queries in CSS for .desktop-menu and .mobile-toggle */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

const NavLink = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button
        onClick={onClick}
        style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
    >
        {children}
    </button>
);

export default NavBar;
