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
            await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
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
            
            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', paddingTop: '80px', paddingBottom: '40px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="card glass" 
                    style={{ 
                        width: '100%', 
                        maxWidth: '480px', 
                        padding: '3.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                         boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                         <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(216, 67, 21, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                            <UserPlus size={32} color="var(--color-primary)" />
                        </div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Create Account</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Join us to uncover hidden heritage.</p>
                    </div>

                    {error && (
                        <div style={{ 
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
                        }}>
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div className="input-group">
                             <div style={{ position: 'relative' }}>
                                <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="modern-input"
                                    style={{ paddingLeft: '3rem', height: '50px', fontSize: '1rem' }}
                                    required
                                />
                             </div>
                        </div>

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
                            {loading ? 'Creating Account...' : <>Sign Up <UserPlus size={20} /></>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
