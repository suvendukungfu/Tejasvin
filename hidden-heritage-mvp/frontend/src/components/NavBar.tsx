import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    // Safely use auth context (might be null if provider not wrapped yet or during dev)
    let auth: any = {};
    try {
        auth = useAuth();
    } catch (e) {
        // Fallback for verification if context missing
    }

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: 'var(--color-background)',
            borderBottom: '1px solid #e0d0c0',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'serif', color: 'var(--color-primary)' }}>Hidden Heritage</h2>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
                <button onClick={() => navigate('/explore')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Explore</button>
                <button onClick={() => navigate('/book')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Bookings</button>
                <button onClick={() => navigate('/about')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>

                {auth.user ? (
                    <>
                        <span>Hi, {auth.user.name.split(' ')[0]}</span>
                        <button onClick={auth.logout} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')} style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}>Login</button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
