import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import { Map, Compass, Shield, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Compass size={32} color="var(--color-secondary)" />,
            title: "Uncharted Locations",
            desc: "Access sites that aren't on Google Maps. We work with local archaeologists to map the unknown."
        },
        {
            icon: <Shield size={32} color="var(--color-secondary)" />,
            title: "Safe & Guided",
            desc: "Verified local guides accompany every trip. Your safety in remote areas is our top priority."
        },
        {
            icon: <Map size={32} color="var(--color-secondary)" />,
            title: "Curated Itineraries",
            desc: "Don't just visit; experience. Our partial-day and full-day plans are optimized for discovery."
        }
    ];

    const destinations = [
        {
            title: "Bateshwar Temples",
            location: "Morena, Chambal",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg",
            desc: "A cluster of 200 sandstone temples restored from ruins."
        },
        {
            title: "Garh Kundar",
            location: "Tikamgarh",
            img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG",
            desc: "A hill fort with a mysterious past and breathtaking views."
        },
        {
            title: "Mitawali & Padavali",
            location: "Morena",
            img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg",
            desc: "The circular temple that inspired the Indian Parliament."
        }
    ];

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            <Hero />

            {/* Features Section */}
            <section className="container" style={{ padding: '8rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Why Travel with Us?</h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 300 }}>
                        We don't just show you places; we connect you with the soul of India's forgotten history through immersive and curated experiences.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                    {features.map((f, i) => (
                        <div key={i} className="card glass" style={{ 
                            textAlign: 'center', 
                            padding: '3.5rem 2rem', 
                            border: '1px solid rgba(255,255,255,0.6)',
                            borderRadius: 'var(--border-radius-lg)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}>
                            <div style={{
                                display: 'inline-flex',
                                padding: '1.25rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(193, 127, 89, 0.1)',
                                marginBottom: '2rem',
                                color: 'var(--color-secondary)'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--color-primary)' }}>{f.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Destinations */}
            <section style={{ backgroundColor: 'var(--color-bg-alt)', padding: '5rem 0' }}>
                <div className="container" style={{ padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Trending</span>
                            <h2 style={{ fontSize: '3rem', marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>Hidden Gems</h2>
                        </div>
                        <button
                            className="btn btn-outline"
                            onClick={() => navigate('/explore')}
                            style={{ display: 'none', gap: '0.5rem' }} // Hidden on mobile via CSS ideally, but simplified here
                        >
                            View All <ChevronRight size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                        {destinations.map((d, i) => (
                            <div 
                                key={i} 
                                className="card" 
                                style={{ 
                                    padding: 0, 
                                    overflow: 'hidden', 
                                    cursor: 'pointer',
                                    borderRadius: 'var(--border-radius-lg)',
                                    border: 'none',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                                    transition: 'all 0.4s ease'
                                }} 
                                onClick={() => navigate('/explore')}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div style={{ height: '260px', overflow: 'hidden' }}>
                                    <img
                                        src={d.img}
                                        alt={d.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{d.location}</span>
                                        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', backgroundColor: '#FFF8E1', padding: '4px 8px', borderRadius: '12px' }}>
                                            <Star size={14} fill="#FFB300" color="#FFB300" />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFB300' }}>4.8</span>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{d.title}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/explore')}
                            style={{ padding: '1.2rem 3.5rem', borderRadius: '50px', fontSize: '1.1rem' }}
                        >
                            Explore All Destinations
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'var(--color-primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                {/* Background Pattern */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'var(--color-accent)', fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Ready to uncover the past?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', opacity: 0.9, fontSize: '1.25rem', fontWeight: 300 }}>
                        Join 2,000+ explorers discovering the real India. Sign up for our newsletter to get weekly curated stories.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            className="btn"
                            style={{ backgroundColor: 'white', color: 'var(--color-primary)', padding: '1rem 2.5rem' }}
                            onClick={() => navigate('/register')}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
