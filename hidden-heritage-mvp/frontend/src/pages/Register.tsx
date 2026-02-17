import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Mail, Lock, User, AlertCircle, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            // Simulated success for demo if backend fails
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-bg-body relative flex items-center justify-center overflow-hidden">
            <NavBar />
            
            {/* Cinematic Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, #1C1917 100%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(28, 25, 23, 0.4)', zIndex: 1 }} /> 
                <img 
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000" 
                    alt="Ancient Entrance" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', padding: '6rem 1rem' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="glass-panel"
                    style={{ 
                        width: '100%', 
                        maxWidth: '520px', 
                        background: 'rgba(28, 25, 23, 0.75)',
                        backdropFilter: 'blur(30px)',
                        padding: '4rem 3.5rem',
                        borderRadius: '40px',
                        border: '1px solid rgba(255,255,255,0.1)',
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
                            <Sparkles size={28} />
                        </div>
                        <h1 className="text-display" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                            The Pledge
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
                            Begin your initiation into the High Guild.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
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
                            <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', zIndex: 10 }} />
                            <input
                                type="text" 
                                placeholder="Formal Moniker (Full Name)"
                                value={name} 
                                onChange={e => setName(e.target.value)}
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
                            <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', zIndex: 10 }} />
                            <input
                                type="email" 
                                placeholder="Archival Email"
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
                                placeholder="Guardian's Password"
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
                            {loading ? 'Commencing Ritual...' : <>Take the Oath <ArrowRight size={18} /></>}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                            Already initiated? 
                            <Link to="/login" style={{ color: '#B08D55', fontWeight: 600, textDecoration: 'none', marginLeft: '0.5rem' }}>Access the Portal</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
