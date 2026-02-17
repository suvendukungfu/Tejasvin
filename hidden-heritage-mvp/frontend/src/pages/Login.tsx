import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
            const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            // For Demo mode fallback
            if (email === 'user@example.com' && password === 'secret') {
                setTimeout(() => {
                     login('mock_token_123', { id: 1, name: 'Demo Traveler', email, role: 'traveler' });
                     navigate('/');
                }, 1500);
                return;
            }
            setError('The High Guild does not recognize these credentials.');
        } finally {
            if (!(email === 'user@example.com' && password === 'secret')) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-bg-body relative flex items-center justify-center overflow-hidden">
            <NavBar />
            
            {/* Cinematic Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, #1C1917 100%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(28, 25, 23, 0.5)', zIndex: 1 }} /> 
                <img 
                    src="https://images.unsplash.com/photo-1518182170546-07fb6ceaa714?auto=format&fit=crop&q=80&w=2000" 
                    alt="Temple Gate" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="glass-panel"
                    style={{ 
                        width: '100%', 
                        maxWidth: '480px', 
                        padding: '4rem 3rem',
                        background: 'rgba(28, 25, 23, 0.75)', /* Darker glass for contrast */
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ 
                            display: 'inline-flex', 
                            padding: '12px', 
                            background: 'rgba(176, 141, 85, 0.15)', 
                            borderRadius: '50%', 
                            color: '#B08D55',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(176, 141, 85, 0.3)'
                        }}>
                            <ShieldCheck size={28} />
                        </div>
                        <h1 className="text-display" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                            Welcome Back
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem' }}>
                            The archives await your return.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    style={{ 
                                        background: 'rgba(239, 68, 68, 0.15)', 
                                        color: '#FCA5A5', 
                                        padding: '1rem', 
                                        borderRadius: '12px', 
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: '1px solid rgba(239, 68, 68, 0.3)'
                                    }}
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', zIndex: 10 }} />
                            <input
                                type="email" 
                                placeholder="Traveler's Identity (Email)"
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                required
                                style={{ 
                                    width: '100%', 
                                    padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '16px', 
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#B08D55';
                                    e.target.style.background = 'rgba(255,255,255,0.08)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', zIndex: 10 }} />
                            <input
                                type="password" 
                                placeholder="Secret Versicle (Password)"
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{ 
                                    width: '100%', 
                                    padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '16px', 
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#B08D55';
                                    e.target.style.background = 'rgba(255,255,255,0.08)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                }}
                            />
                        </div>

                        <motion.button 
                            type="submit" 
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ 
                                width: '100%', 
                                padding: '1.25rem', 
                                marginTop: '1rem',
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: 700,
                                background: '#B08D55',
                                color: 'white',
                                border: 'none',
                                borderRadius: '100px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(176, 141, 85, 0.3)'
                            }}
                        >
                            {loading ? 'Communing...' : <>Unlock Passage <ArrowRight size={18} /></>}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Untethered from the High Guild? <br/>
                            <Link to="/register" style={{ color: '#B08D55', fontWeight: 600, textDecoration: 'none', marginLeft: '0.5rem' }}>Pledge Your Allegiance</Link>
                        </p>

                        {/* Demo Credentials Archive */}
                        <div style={{ 
                            padding: '1rem 1.5rem', 
                            background: 'rgba(255,255,255,0.03)', 
                            borderRadius: '12px', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            textAlign: 'left'
                        }}>
                             <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Archives of the Initiated</span>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>user@example.com</span>
                                <span style={{ color: '#B08D55' }}>secret</span>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
