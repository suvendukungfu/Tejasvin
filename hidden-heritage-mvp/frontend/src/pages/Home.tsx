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
            <section className="container" style={{ padding: '5rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Travel with Us?</h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        We don't just show you places; we connect you with the soul of India's forgotten history.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {features.map((f, i) => (
                        <div key={i} className="card glass" style={{ textAlign: 'center', padding: '3rem', border: '1px solid rgba(255,255,255,0.5)' }}>
                            <div style={{
                                display: 'inline-flex',
                                padding: '1rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(216, 67, 21, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>{f.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>{f.desc}</p>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {destinations.map((d, i) => (
                            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate('/explore')}>
                                <div style={{ height: '240px', overflow: 'hidden' }}>
                                    <img
                                        src={d.img}
                                        alt={d.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 600, letterSpacing: '0.5px' }}>{d.location}</span>
                                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                            <Star size={14} fill="#D4AF37" color="#D4AF37" />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>4.8</span>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{d.title}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/explore')}
                            style={{ padding: '1rem 3rem', borderRadius: '50px' }}
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
