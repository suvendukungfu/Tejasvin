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
        image: (() => {
            const images: Record<string, string> = {
                'bateshwar-temples': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg',
                'mitawali-padavali': 'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg',
                'gwalior-fort': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg',
                'garh-kundar': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG'
            };
            return images[slug || ''] || "https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg";
        })(),
        location: "Morena District, Madhya Pradesh",
        timings: "Sunrise to Sunset",
        entry_fee: "₹25 (Indians), ₹300 (Foreigners)",
        history: "Built in the 11th century, this site has witnessed the rise and fall of dynasties. It was believed to be a center for higher learning and astronomy."
    };

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />

            <div style={{ position: 'relative', height: '70vh' }}>
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
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)'
                }} />

                <div className="container" style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', width: '100%', color: 'white', zIndex: 2 }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(12px)',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.7rem 1.5rem',
                            fontSize: '0.95rem',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Region
                    </button>
                    <h1 style={{ 
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                        marginBottom: '1rem', 
                        fontFamily: 'var(--font-heading)', 
                        textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        lineHeight: 1.1
                    }}>
                        {site.name}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', opacity: 0.95, fontWeight: 300 }}>
                        <MapPin size={22} color="var(--color-secondary)" />
                        <span>{site.location}</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }} className="grid-responsive-layout">
                    {/* Main Content */}
                    <div>
                        <section style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>About the Site</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.9, color: 'var(--color-text-main)', opacity: 0.9, marginBottom: '2rem' }}>
                                {site.description}
                            </p>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Historical Significance</h3>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.9, color: 'var(--color-text-main)', opacity: 0.9 }}>
                                {site.history}
                            </p>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Gallery</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {(() => {
                                    const galleryImages: Record<string, string[]> = {
                                        'bateshwar-temples': [
                                            'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg',
                                            'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg', 
                                            'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg' // Nearby context
                                        ],
                                        'mitawali-padavali': [
                                            'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg',
                                            'https://upload.wikimedia.org/wikipedia/commons/7/78/Chausath_Yogini_Temple_%2816313518811%29.jpg',
                                            'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg'
                                        ],
                                        'gwalior-fort': [
                                            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg',
                                            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg',
                                            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg'
                                        ],
                                        'garh-kundar': [
                                            'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
                                            'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
                                            'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'
                                        ]
                                    };
                                    
                                    const images = galleryImages[slug || ''] || [
                                        'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg',
                                        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg',
                                        'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg'
                                    ];

                                    return images.map((img, i) => (
                                        <div key={i} style={{ height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img
                                                src={img}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                alt="Gallery"
                                            />
                                        </div>
                                    ));
                                })()}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="sidebar">
                        <div className="card glass" style={{ padding: '2rem', position: 'sticky', top: '100px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Visitor Info</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Clock size={20} />
                                    <span style={{ fontWeight: 600 }}>Timings</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>{site.timings}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                                    <Info size={20} />
                                    <span style={{ fontWeight: 600 }}>Entry Fee</span>
                                </div>
                                <p style={{ marginLeft: '2rem', color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>{site.entry_fee}</p>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
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
