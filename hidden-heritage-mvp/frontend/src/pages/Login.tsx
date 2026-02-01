import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Use raw axios or api wrapper

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Need to point to real backend, fallback to mock if demo
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            setError('Login failed. Check credentials (demo: user@example.com / secret)');
            // For Demo mode fallback
            if (email === 'user@example.com' && password === 'secret') {
                login('mock_token_123', { id: 1, name: 'Demo Traveler', email, role: 'traveler' });
                navigate('/');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem' }}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '0.7rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px' }}>Login</button>
                </form>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    Don't have an account? <a href="/register">Register</a>
                </p>
                <small style={{ color: '#888' }}>Demo: user@example.com / secret</small>
            </div>
        </>
    );
};

export default Login;
