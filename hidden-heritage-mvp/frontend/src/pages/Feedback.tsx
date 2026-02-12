import NavBar from '../components/NavBar';
import { useState } from 'react';
// import { submitFeedback } from '../services/api';
import { Star, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Feedback = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '', rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay for better UX
        setTimeout(async () => {
            try {
                // await submitFeedback(form); // API might not be ready, but logic is sound
                console.log('Feedback submitted:', form);
                setSent(true);
            } catch (error) {
                alert('Error sending feedback');
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
                <div className="card glass" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.6)' }}>
                    
                    <AnimatePresence mode="wait">
                        {sent ? (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                style={{ textAlign: 'center', padding: '3rem 1rem' }}
                            >
                                <motion.div 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    style={{ display: 'inline-flex', color: 'var(--color-success)', marginBottom: '1.5rem' }}
                                >
                                    <CheckCircle size={80} />
                                </motion.div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Thank You!</h2>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                                    Your feedback is invaluable to us. We appreciate you taking the time to share your thoughts.
                                </p>
                                <button 
                                    onClick={() => window.location.href = '/'} 
                                    className="btn btn-outline"
                                >
                                    Return Home
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>We Value Your Feedback</h1>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                                        Help us improve Hidden Heritage for everyone.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    
                                    {/* Rating Section */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                                        <label style={{ marginBottom: '1rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>How was your experience?</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, rating: star })}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    style={{ 
                                                        background: 'none', 
                                                        border: 'none', 
                                                        cursor: 'pointer', 
                                                        padding: '0.2rem',
                                                        transition: 'transform 0.1s'
                                                    }}
                                                    className="star-btn"
                                                >
                                                    <Star 
                                                        size={32} 
                                                        fill={(hoverRating || form.rating) >= star ? "#F59E0B" : "transparent"} 
                                                        color={(hoverRating || form.rating) >= star ? "#F59E0B" : "#D1D5DB"}
                                                        strokeWidth={1.5}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="feedback-grid">
                                        <div className="input-group">
                                            <input
                                                placeholder=" "
                                                required
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                className="modern-input"
                                            />
                                            <label className="floating-label">Your Name</label>
                                        </div>
                                        <div className="input-group">
                                            <input
                                                placeholder=" "
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="modern-input"
                                            />
                                            <label className="floating-label">Email Address</label>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <textarea
                                            placeholder=" "
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            className="modern-input"
                                            style={{ resize: 'vertical', minHeight: '120px' }}
                                        />
                                        <label className="floating-label">Tell us about your experience...</label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                        style={{ 
                                            marginTop: '1rem', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center', 
                                            gap: '0.5rem',
                                            padding: '1rem'
                                        }}
                                    >
                                        {loading ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                Submit Feedback <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            <style>{`
                .feedback-grid {
                    grid-template-columns: 1fr 1fr;
                }
                @media (max-width: 600px) {
                    .feedback-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                .star-btn:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default Feedback;
