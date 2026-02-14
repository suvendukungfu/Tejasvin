import NavBar from '../components/NavBar';
import { useState } from 'react';
import { Star, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Feedback = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-bg-body relative overflow-hidden">
            <NavBar />
            
            {/* Ambient Background Elements */}
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'var(--color-accent)', filter: 'blur(120px)', opacity: 0.1, zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '500px', height: '500px', background: 'var(--color-primary)', filter: 'blur(150px)', opacity: 0.05, zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '10rem 2rem 6rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    
                    <div className="grid-12" style={{ alignItems: 'center', gap: '4rem' }}>
                        
                        {/* Left Side: Content */}
                        <div style={{ gridColumn: 'span 5' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }}></span>
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>The Traveler's Log</span>
                                </div>
                                <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                                    Inscribe Your <br/>
                                    <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Chronicle.</span>
                                </h1>
                                <p className="text-body" style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                    Every journey contributes to the legacy. Share your discoveries, challenges, and stories from the path.
                                </p>

                                <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                                            <Send size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Direct Dispatch</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>archivist@heritage.com</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Guild Support</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>Available for expedition guides</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Form */}
                        <div style={{ gridColumn: 'span 7' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{ 
                                    background: 'white', 
                                    padding: '3rem', 
                                    borderRadius: '32px', 
                                    boxShadow: '0 40px 80px rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(0,0,0,0.05)',
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
                                                background: 'rgba(34, 197, 94, 0.1)', 
                                                color: '#16a34a',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 2rem'
                                            }}>
                                                <Send size={32} />
                                            </div>
                                            <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Log Inscribed.</h2>
                                            <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>Your contribution has been received by the High Guild Archivists.</p>
                                            <button onClick={() => setSent(false)} className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>Send Another Entry</button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Experience Rating</label>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <motion.button
                                                            key={star}
                                                            type="button"
                                                            whileHover={{ scale: 1.2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => setForm({ ...form, rating: star })}
                                                            onMouseEnter={() => setHoverRating(star)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                                                        >
                                                            <Star 
                                                                size={32} 
                                                                fill={(hoverRating || form.rating) >= star ? "var(--color-accent)" : "transparent"} 
                                                                color={(hoverRating || form.rating) >= star ? "var(--color-accent)" : "rgba(0,0,0,0.1)"}
                                                                strokeWidth={1.5}
                                                                style={{ transition: 'all 0.3s' }}
                                                            />
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid-12" style={{ gap: '1.5rem' }}>
                                                <div style={{ gridColumn: 'span 6' }}>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Your Alias" 
                                                        required 
                                                        value={form.name}
                                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                                        style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)', outline: 'none' }}
                                                    />
                                                </div>
                                                <div style={{ gridColumn: 'span 6' }}>
                                                    <input 
                                                        type="email" 
                                                        placeholder="Correspondence Email" 
                                                        required 
                                                        value={form.email}
                                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                                        style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)', outline: 'none' }}
                                                    />
                                                </div>
                                                <div style={{ gridColumn: 'span 12' }}>
                                                    <textarea 
                                                        placeholder="Narrate your experience..." 
                                                        rows={5} 
                                                        required 
                                                        value={form.message}
                                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                                        style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)', outline: 'none', resize: 'none' }}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={loading}
                                                className="btn btn-primary" 
                                                style={{ width: '100%', marginTop: '2.5rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                                            >
                                                {loading ? 'Communing...' : <>Dispatch Entry <Send size={18} /></>}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
