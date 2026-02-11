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
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card" 
                    style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to continue your journey.</p>
                    </div>

                    {error && (
                        <div style={{ 
                            backgroundColor: '#fee2e2', 
                            color: '#991b1b', 
                            padding: '1rem', 
                            borderRadius: '6px', 
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="input-group">
                             <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem' }}
                                    required
                                />
                             </div>
                        </div>
                        <div className="input-group">
                             <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem' }}
                                    required
                                />
                             </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={loading}
                            style={{ padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {loading ? 'Signing In...' : <>Sign In <LogIn size={18} /></>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                            Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Create Account</Link>
                        </p>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '6px', fontSize: '0.85rem' }}>
                            <strong>Demo Credentials:</strong><br/>
                            user@example.com / secret
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
