import NavBar from '../components/NavBar';
import { Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Pricing = () => {
    const tiers = [
        {
            name: 'Seeker',
            price: 'Free',
            description: 'For those beginning their journey.',
            features: ['Access to 50+ public sites', 'Basic map view', 'Save 1 expedition'],
            accent: '#94a3b8'
        },
        {
            name: 'Keeper',
            price: '₹499',
            period: '/month',
            description: 'The standard of the High Guild.',
            features: ['Access to all 500+ sites', 'Advanced Trip Builder', 'AI Logistics Guide', 'Priority Expert Booking'],
            popular: true,
            accent: 'var(--color-accent)'
        },
        {
            name: 'Guardian',
            price: '₹1499',
            period: '/month',
            description: 'Mastery of the ancient paths.',
            features: ['Private AR Tours', 'Concierge Map Service', 'Exclusive Archaeological Access', 'Unlimited Expeditions'],
            accent: '#f59e0b'
        }
    ];

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <div className="min-h-screen bg-bg-body relative overflow-hidden">
            <NavBar />
            
            {/* Cinematic Background */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
                <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1 }}>
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                     <img 
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000" 
                        alt="Columns" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                     />
                </motion.div>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)', zIndex: 2 }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '12rem 2rem 8rem' }}>
                
                <header style={{ marginBottom: '6rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ height: '1px', width: '30px', background: 'var(--color-accent)' }}></span>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>Guild Allegiance</span>
                            <span style={{ height: '1px', width: '30px', background: 'var(--color-accent)' }}></span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'white', lineHeight: 1, marginBottom: '2rem' }}>
                            Choose Your <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Path.</span>
                        </h1>
                        <p className="text-body" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                            Unlock the secrets of the ancients with a membership tailored to your exploration needs.
                        </p>
                    </motion.div>
                </header>

                <div className="grid-12" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    {tiers.map((tier, idx) => (
                        <div key={idx} style={{ gridColumn: 'span 4' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 * idx }}
                                whileHover={{ y: -10 }}
                                style={{ 
                                    background: 'rgba(255,255,255,0.03)',
                                    backdropFilter: 'blur(20px)',
                                    padding: '3.5rem 2.5rem',
                                    borderRadius: '32px',
                                    border: tier.popular ? `2px solid var(--color-accent)` : '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s',
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1629197520643-0f2c00d413b5?auto=format&fit=crop&q=80&w=500")',
                                    backgroundBlendMode: 'overlay',
                                    backgroundSize: 'cover'
                                }}
                            >
                                {tier.popular && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '1.5rem', 
                                        right: '1.5rem', 
                                        background: 'var(--color-accent)', 
                                        color: 'var(--color-primary)', 
                                        padding: '4px 12px', 
                                        borderRadius: '50px', 
                                        fontSize: '0.65rem', 
                                        fontWeight: 800, 
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Guild Favorite
                                    </div>
                                )}

                                <div style={{ marginBottom: '3rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: tier.accent, marginBottom: '1rem' }}>{tier.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', color: 'white' }}>
                                        <span style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{tier.price}</span>
                                        {tier.period && <span style={{ fontSize: '1rem', opacity: 0.5 }}>{tier.period}</span>}
                                    </div>
                                    <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.5 }}>{tier.description}</p>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                                            <Check size={16} style={{ color: tier.accent, flexShrink: 0 }} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    className={`btn ${tier.popular ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.1rem', 
                                        borderRadius: '16px',
                                        ...(tier.popular ? {} : { color: 'white', borderColor: 'rgba(255,255,255,0.2)' })
                                    }}
                                >
                                    Pledge Support
                                </button>
                                
                                {/* Glow Effect */}
                                <div style={{ 
                                    position: 'absolute', 
                                    bottom: '-20%', 
                                    right: '-20%', 
                                    width: '150px', 
                                    height: '150px', 
                                    background: tier.accent, 
                                    filter: 'blur(80px)', 
                                    opacity: 0.15,
                                    zIndex: 0
                                }} />
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* FAQ / Trust Segment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '10rem', textAlign: 'center' }}
                >
                     <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
                        All contributions go directly towards the preservation and digital reconstruction of India's forgotten wonders.
                     </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Pricing;
