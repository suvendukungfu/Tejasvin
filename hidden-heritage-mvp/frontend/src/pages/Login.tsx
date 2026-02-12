import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Need to point to real backend, fallback to mock if demo
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            // For Demo mode fallback
            if (email === 'user@example.com' && password === 'secret') {
                setTimeout(() => {
                     login('mock_token_123', { id: 1, name: 'Demo Traveler', email, role: 'traveler' });
                     navigate('/');
                }, 1000);
                return;
            }
            setError('Invalid credentials. Please try again.');
        } finally {
            if (!(email === 'user@example.com' && password === 'secret')) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: -1,
                    backdropFilter: 'blur(4px)'
                }}
            />

            <NavBar />
            
            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="card glass" 
                    style={{ 
                        width: '100%', 
                        maxWidth: '480px', 
                        padding: '3.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly more opaque for readability
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(216, 67, 21, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                            <Lock size={32} color="var(--color-primary)" />
                        </div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Sign in to continue your journey.</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ 
                                backgroundColor: '#fee2e2', 
                                color: '#991b1b', 
                                padding: '1rem', 
                                borderRadius: '8px', 
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.9rem',
                                border: '1px solid #fca5a5'
                            }}
                        >
                            <AlertCircle size={20} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="input-group">
                             <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem', height: '50px', fontSize: '1rem' }}
                                    required
                                />
                             </div>
                        </div>
                        <div className="input-group">
                             <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem', height: '50px', fontSize: '1rem' }}
                                    required
                                />
                             </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={loading}
                            style={{ 
                                padding: '1rem', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                fontSize: '1.1rem',
                                marginTop: '0.5rem',
                                borderRadius: '8px'
                            }}
                        >
                            {loading ? 'Signing In...' : <>Sign In <LogIn size={20} /></>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Don't have an account? <Link to="/register" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
                        </p>
                        <div style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>Demo Credentials:</strong>
                            <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>user@example.com</span> / <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>secret</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
