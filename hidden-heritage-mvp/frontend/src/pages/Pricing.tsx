import NavBar from '../components/NavBar';
import { Check } from 'lucide-react';

const Pricing = () => {
    return (
        <>
            <NavBar />
            <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Unlock the Full History</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '4rem' }}>
                    Choose the plan that fits your exploration style.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                    {/* Free Tier */}
                    <div style={{
                        padding: '2rem', border: '1px solid #ddd', borderRadius: '12px',
                        backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <h2 style={{ color: '#666' }}>Explorer</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>₹0</div>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', margin: '2rem 0' }}>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} /> Basic Site Details</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} /> "Tourist" AI Stories</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} /> Trip Builder</li>
                        </ul>
                        <button style={{ width: '100%', padding: '1rem', border: '1px solid #333', background: 'none', borderRadius: '6px' }}>Current Plan</button>
                    </div>

                    {/* Premium Tier */}
                    <div style={{
                        padding: '2rem', border: '2px solid var(--color-primary)', borderRadius: '12px',
                        backgroundColor: '#fffbe6', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.2rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>RECOMMENDED</div>
                        <h2 style={{ color: 'var(--color-primary)' }}>Heritage Guardian</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>₹499<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>/mo</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', margin: '2rem 0' }}>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} /> Everything in Explorer</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} color="green" /> <strong>Researcher Mode</strong> (Deep AI)</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} color="green" /> Offline AR Downloads</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}><Check size={20} color="green" /> Priority Guide Booking</li>
                        </ul>
                        <button
                            onClick={() => alert('Redirecting to Payment Gateway... (Mock)')}
                            style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Upgrade Now
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Pricing;
