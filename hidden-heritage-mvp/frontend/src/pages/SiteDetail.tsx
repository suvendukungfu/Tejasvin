import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { MapPin, Clock, Info, ArrowLeft } from 'lucide-react';

const SiteDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Mock data based on slug, real app would fetch from API
    const site = {
        name: slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: "A breathtaking example of medieval architecture, standing testament to the region's rich history. Explore the intricate carvings, vast courtyards, and panoramic views from the ramparts.",
        image: "https://images.unsplash.com/photo-1644903526978-0cb9947849aa?q=80&w=2070&auto=format&fit=crop",
        location: "Morena District, Madhya Pradesh",
        timings: "Sunrise to Sunset",
        entry_fee: "₹25 (Indians), ₹300 (Foreigners)",
        history: "Built in the 11th century, this site has witnessed the rise and fall of dynasties. It was believed to be a center for higher learning and astronomy."
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />

            <div style={{ position: 'relative', height: '60vh' }}>
                <img
                    src={site.image}
                    alt={site.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))'
                }} />

                <div className="container" style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', color: 'white' }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(5px)',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{site.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
                        <MapPin size={20} />
                        <span>{site.location}</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }} className="grid-responsive-layout">
                    {/* Main Content */}
                    <div>
                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>About the Site</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-primary)' }}>
                                {site.description}
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-primary)', marginTop: '1rem' }}>
                                {site.history}
                            </p>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Gallery</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} style={{ height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img
                                            src={`https://source.unsplash.com/random/400x300?ruins&sig=${i}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            alt="Gallery"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="sidebar">
                        <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Visitor Info</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Clock size={20} />
                                    <span style={{ fontWeight: 600 }}>Timings</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)' }}>{site.timings}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Info size={20} />
                                    <span style={{ fontWeight: 600 }}>Entry Fee</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)' }}>{site.entry_fee}</p>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                Add to Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .grid-responsive-layout {
                        grid-template-columns: 1fr !important;
                    }
                     .sidebar {
                        order: -1;
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default SiteDetail;
