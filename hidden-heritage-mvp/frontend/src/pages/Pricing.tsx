import NavBar from '../components/NavBar';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            
            <div style={{ maxWidth: '1000px', margin: '6rem auto 4rem', padding: '0 2rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Membership Plans</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
                        Your contribution directly supports the mapping and preservation of India's forgotten heritage.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Free Tier */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card glass"
                        style={{
                            padding: '2.5rem', 
                            border: '1px solid rgba(255,255,255,0.6)',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <h2 style={{ color: 'var(--color-text-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Seeker</h2>
                        <div style={{ fontSize: '3rem', fontWeight: 700, margin: '1rem 0', color: 'var(--color-primary)' }}>Free</div>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Begin your journey into the past.</p>
                        
                        <div style={{ flex: 1 }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <Check size={20} className="text-primary" /> 
                                    <span>Access Basic Site Details</span>
                                </li>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <Check size={20} className="text-primary" /> 
                                    <span>Curated "Tourist" AI Stories</span>
                                </li>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <Check size={20} className="text-primary" /> 
                                    <span>Basic Trip Builder</span>
                                </li>
                            </ul>
                        </div>
                        
                        <button className="btn btn-outline" style={{ width: '100%', borderRadius: '12px', justifyContent: 'center' }}>
                            Current Plan
                        </button>
                    </motion.div>

                    {/* Premium Tier */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card glass"
                        style={{
                            padding: '2.5rem', 
                            border: '2px solid var(--color-secondary)', 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            boxShadow: '0 20px 40px -12px rgba(193, 127, 89, 0.2)',
                            position: 'relative',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ 
                            position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', 
                            backgroundColor: 'var(--color-secondary)', color: 'white', 
                            padding: '0.35rem 1.2rem', borderRadius: '50px', 
                            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em',
                            boxShadow: '0 4px 10px rgba(193, 127, 89, 0.3)'
                        }}>
                            RECOMMENDED
                        </div>
                        
                        <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Keeper of Secrets <Shield size={20} fill="var(--color-secondary)" color="var(--color-secondary)" />
                        </h2>
                        <div style={{ fontSize: '3rem', fontWeight: 700, margin: '1rem 0', color: 'var(--color-primary)' }}>
                            ₹499<span style={{ fontSize: '1.1rem', fontWeight: 'normal', color: 'var(--color-text-secondary)', marginLeft: '0.25rem' }}>/mo</span>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>For those who wish to go deeper.</p>
                        
                        <div style={{ flex: 1 }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ background: 'rgba(193, 127, 89, 0.1)', padding: '4px', borderRadius: '50%' }}><Check size={16} color="var(--color-secondary)" /></div>
                                    <span><strong>Everything in Explorer</strong></span>
                                </li>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ background: 'rgba(193, 127, 89, 0.1)', padding: '4px', borderRadius: '50%' }}><Zap size={16} color="var(--color-secondary)" /></div>
                                    <span><strong>Researcher Mode</strong> (Deep AI)</span>
                                </li>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ background: 'rgba(193, 127, 89, 0.1)', padding: '4px', borderRadius: '50%' }}><Star size={16} color="var(--color-secondary)" /></div>
                                    <span>Offline AR Downloads</span>
                                </li>
                                <li style={{ padding: '0.75rem 0', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(193, 127, 89, 0.1)', padding: '4px', borderRadius: '50%' }}><Check size={16} color="var(--color-secondary)" /></div>
                                    <span>Priority Guide Booking</span>
                                </li>
                            </ul>
                        </div>
                        
                        <button
                            className="btn"
                            onClick={() => alert('Redirecting to Payment Gateway... (Mock)')}
                            style={{ 
                                width: '100%', 
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, var(--color-secondary) 0%, #a06040 100%)',
                                color: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 8px 20px -4px rgba(193, 127, 89, 0.4)'
                            }}
                        >
                            Become a Keeper
                        </button>
                    </motion.div>

                </div>
                
                <div style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', opacity: 0.7, fontSize: '0.9rem' }}>
                    <p>Secure payments powered by Razorpay. Cancel anytime.</p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
