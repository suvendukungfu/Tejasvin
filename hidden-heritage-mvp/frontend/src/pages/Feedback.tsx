import NavBar from '../components/NavBar';
import { useState } from 'react';
import { Star, Send, MessageSquare, Radio, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { submitFeedback } from '../services/api';

const Feedback = () => {
    const [form, setForm] = useState<{ name: string; email: string; message: string; rating: number }>({ name: '', email: '', message: '', rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitFeedback(form);
            setSent(true);
        } catch (error) {
            console.error("Feedback failed", error);
            // Simulate success for demo
            setTimeout(() => setSent(true), 1000);
        } finally {
            setLoading(false);
        }
    };

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: '#1C1917' }}>
            <NavBar />
            
            {/* Cinematic Hero */}
            <section style={{ height: '100vh', position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28, 25, 23, 0.9) 0%, rgba(28, 25, 23, 0.4) 100%)', zIndex: 1 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0) 0%, #1C1917 100%)', zIndex: 2 }} />
                    <img 
                        src="https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=2000&auto=format&fit=crop" 
                        alt="Communications Array" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
                    />
                </motion.div>
            </section>

            <div className="container" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0' }}>
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '8rem', alignItems: 'center' }}>
                    
                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: '#60A5FA' }}>
                                <Radio size={18} /> 
                            </div>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA' }}>Secure Transmission</span>
                        </div>
                        
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}>
                            Field Report <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: '#60A5FA' }}>Uplink.</span>
                        </h1>

                        <p className="text-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px' }}>
                            Your direct line to the High Guild. Report discoveries, structural concerns, or archival data from the field.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>Encrypted Channel</div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>All transmissions are secured via neural link.</div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>Priority Response</div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Archivists monitor this frequency 24/7.</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-panel"
                        style={{ 
                            background: 'rgba(28, 25, 23, 0.6)', 
                            backdropFilter: 'blur(30px)',
                            padding: '3rem', 
                            borderRadius: '40px', 
                            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    style={{ textAlign: 'center', padding: '4rem 0' }}
                                >
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '50%', 
                                        background: 'rgba(96, 165, 250, 0.2)', 
                                        color: '#60A5FA',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2rem',
                                        border: '1px solid rgba(96, 165, 250, 0.3)'
                                    }}>
                                        <Radio size={32} />
                                    </div>
                                    <h2 className="text-display" style={{ marginBottom: '1rem', fontSize: '2rem', color: 'white' }}>Data Uplinked.</h2>
                                    <p className="text-body" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '3rem' }}>The Guild acknowledges receipt of your transmission.</p>
                                    <button 
                                        onClick={() => setSent(false)} 
                                        className="btn" 
                                        style={{ 
                                            padding: '1rem 2.5rem', 
                                            borderRadius: '100px', 
                                            background: 'rgba(255,255,255,0.1)', 
                                            color: 'white', 
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Transmit Again
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                                        <label style={{ display: 'block', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>Signal Strength (Rating)</label>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    type="button"
                                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setForm({ ...form, rating: star })}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                >
                                                    <Star 
                                                        size={28} 
                                                        fill={(hoverRating || form.rating) >= star ? "#60A5FA" : "rgba(255,255,255,0.05)"} 
                                                        color={(hoverRating || form.rating) >= star ? "#60A5FA" : "rgba(255,255,255,0.2)"}
                                                        strokeWidth={1.5}
                                                        style={{ transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Operative Name" 
                                                required 
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '1.25rem 1.5rem', 
                                                    borderRadius: '16px', 
                                                    border: '1px solid rgba(255,255,255,0.1)', 
                                                    background: 'rgba(255,255,255,0.03)', 
                                                    outline: 'none',
                                                    color: 'white',
                                                    fontSize: '1rem'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#60A5FA'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </div>
                                        <div>
                                            <input 
                                                type="email" 
                                                placeholder="Secure Comms ID" 
                                                required 
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '1.25rem 1.5rem', 
                                                    borderRadius: '16px', 
                                                    border: '1px solid rgba(255,255,255,0.1)', 
                                                    background: 'rgba(255,255,255,0.03)', 
                                                    outline: 'none',
                                                    color: 'white',
                                                    fontSize: '1rem'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#60A5FA'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </div>
                                        <div>
                                            <textarea 
                                                placeholder="Transmission content..." 
                                                rows={4} 
                                                required 
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '1.25rem 1.5rem', 
                                                    borderRadius: '16px', 
                                                    border: '1px solid rgba(255,255,255,0.1)', 
                                                    background: 'rgba(255,255,255,0.03)', 
                                                    outline: 'none',
                                                    resize: 'none',
                                                    color: 'white',
                                                    fontFamily: 'inherit',
                                                    fontSize: '1rem'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#60A5FA'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="btn" 
                                        style={{ 
                                            width: '100%', 
                                            marginTop: '2.5rem', 
                                            padding: '1.25rem', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            gap: '1rem',
                                            borderRadius: '100px',
                                            background: '#60A5FA',
                                            color: '#1C1917',
                                            fontWeight: 700,
                                            border: 'none',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 0 30px rgba(96, 165, 250, 0.4)'
                                        }}
                                    >
                                        {loading ? 'Encrypting...' : <>Send Transmission <Send size={18} /></>}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
