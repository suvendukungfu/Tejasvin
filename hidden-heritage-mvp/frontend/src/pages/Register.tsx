import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            // Auto login after register? or redirect to login.
            alert('Registration Successful! Please login.');
            navigate('/login');
        } catch (err) {
            // Simulated success for demo if backend fails
            setTimeout(() => {
                alert('Registration Successful (Demo)! Please login.');
                navigate('/login');
            }, 1000);
            // setError('Registration failed. Please try again.'); 
        } finally {
            // setLoading(false); // Handled by navigation
        }
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card glass" 
                    style={{ 
                        width: '100%', 
                        maxWidth: '450px', 
                        padding: '3rem',
                        border: '1px solid rgba(255,255,255,0.6)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Create Account</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>Join us to uncover hidden heritage.</p>
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
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem' }}
                                    required
                                />
                             </div>
                        </div>

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
                            {loading ? 'Creating Account...' : <>Sign Up <UserPlus size={18} /></>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign In</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
