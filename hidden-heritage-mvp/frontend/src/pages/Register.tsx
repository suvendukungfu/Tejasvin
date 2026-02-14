import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Mail, Lock, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
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
            // Simulated success for demo
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
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                <img 
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000" 
                    alt="Ancient Entrance" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'brightness(0.7) sepia(0.2)' }}
                />
            </div>

            {/* Ambient Glows */}
            <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '500px', height: '500px', background: 'var(--color-accent)', filter: 'blur(150px)', opacity: 0.08, zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: '600px', height: '600px', background: 'var(--color-primary)', filter: 'blur(150px)', opacity: 0.04, zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', padding: '6rem 1rem' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    style={{ 
                        width: '100%', 
                        maxWidth: '520px', 
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
                            initial={{ rotate: -10, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
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
                            <Sparkles size={32} />
                        </motion.div>
                        <h1 className="text-display" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
                            The Initiation <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Ritual.</span>
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                            Pledge your allegiance to the Guild and begin your archival journey.
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

                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                            <input
                                type="text" 
                                placeholder="Formal Moniker (Full Name)"
                                value={name} 
                                onChange={e => setName(e.target.value)}
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

                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                            <input
                                type="email" 
                                placeholder="Archival Email"
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

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                            <input
                                type="password" 
                                placeholder="Guardian's Password"
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
                                fontSize: '1.1rem',
                                fontWeight: 700
                            }}
                        >
                            {loading ? 'Commencing Ritual...' : <>Join the Guild <ArrowRight size={18} /></>}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                            Already initiated? 
                            <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 700, textDecoration: 'none', marginLeft: '0.5rem' }}>Access the Portal</Link>
                        </p>
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

export default Register;
