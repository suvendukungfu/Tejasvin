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
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                <img 
                    src="https://images.unsplash.com/photo-1548013146-72479768b8b3?auto=format&fit=crop&q=80&w=2000" 
                    alt="Temple Gate" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'brightness(0.8) contrast(1.2)' }}
                />
            </div>

            {/* Ambient Particles (Simplified as Radial Gradients) */}
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--color-accent)', filter: 'blur(100px)', opacity: 0.1, zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--color-primary)', filter: 'blur(120px)', opacity: 0.05, zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    style={{ 
                        width: '100%', 
                        maxWidth: '480px', 
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(30px)',
                        padding: '4rem 3.5rem',
                        borderRadius: '40px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ 
                                display: 'inline-flex', 
                                padding: '16px', 
                                background: 'rgba(200, 163, 89, 0.1)', 
                                borderRadius: '32px', 
                                color: 'var(--color-gold)',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <ShieldCheck size={32} />
                        </motion.div>
                        <h1 className="text-display" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.75rem', lineHeight: 1.1 }}>
                            The Gatekeeper's <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Portal.</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    style={{ 
                                        background: 'rgba(239, 68, 68, 0.1)', 
                                        color: '#fca5a5', 
                                        padding: '1rem', 
                                        borderRadius: '12px', 
                                        fontSize: '0.85rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        border: '1px solid rgba(239, 68, 68, 0.2)'
                                    }}
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="floating-input-group">
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                                <input
                                    type="email" 
                                    placeholder="Traveler's Identity (Email)"
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                                        background: 'rgba(255,255,255,0.03)', 
                                        border: '1px solid rgba(255,255,255,0.08)', 
                                        borderRadius: '16px', 
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="floating-input-group">
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                                <input
                                    type="password" 
                                    placeholder="Secret Versicle (Password)"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                                        background: 'rgba(255,255,255,0.03)', 
                                        border: '1px solid rgba(255,255,255,0.08)', 
                                        borderRadius: '16px', 
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>

                        <motion.button 
                            type="submit" 
                            disabled={loading}
                            whileHover={{ scale: 1.01, backgroundColor: 'var(--color-accent-hover)' }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary"
                            style={{ 
                                width: '100%', 
                                padding: '1.25rem', 
                                marginTop: '1rem',
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                gap: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: 700
                            }}
                        >
                            {loading ? 'Communing...' : <>Unlock Passage <ArrowRight size={18} /></>}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            Untethered from the High Guild? <br/>
                            <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 700, textDecoration: 'none', marginLeft: '0.5rem' }}>Pledge Your Allegiance</Link>
                        </p>

                        {/* Demo Credentials Archive */}
                        <div style={{ 
                            padding: '1.25rem', 
                            background: 'rgba(255,255,255,0.02)', 
                            borderRadius: '16px', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            textAlign: 'left'
                        }}>
                             <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Archives of the Initiated</span>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>user@example.com</span>
                                <span style={{ color: 'var(--color-accent)' }}>secret</span>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <style>{`
                input:focus {
                    border-color: var(--color-accent) !important;
                    background: rgba(255,255,255,0.05) !important;
                    box-shadow: 0 0 20px rgba(181, 146, 76, 0.1);
                }
            `}</style>
        </div>
    );
};

export default Login;
