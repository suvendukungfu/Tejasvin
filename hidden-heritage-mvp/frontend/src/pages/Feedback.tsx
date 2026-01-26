import NavBar from '../components/NavBar';
import { useState } from 'react';
import { submitFeedback } from '../services/api';

const Feedback = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 });
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submitFeedback(form);
            setSent(true);
        } catch (error) {
            alert('Error sending feedback');
        }
    };

    return (
        <>
            <NavBar />
            <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                <h1>Share your Experience</h1>
                {sent ? (
                    <div style={{ textAlign: 'center', color: 'green' }}>
                        <h2>Thank you!</h2>
                        <p>Your feedback helps us uncover more history.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            placeholder="Name"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <select
                            value={form.rating}
                            onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                        <textarea
                            placeholder="Your Message..."
                            required
                            rows={5}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            style={{ padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '1rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        >
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default Feedback;
