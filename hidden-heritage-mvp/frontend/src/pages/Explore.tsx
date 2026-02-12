import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import { MapPin, ArrowRight } from 'lucide-react';

interface Region {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner_image: string;
    sites_count?: number;
}

const Explore = () => {
    const navigate = useNavigate();

    // Mock data - would ideally come from an API
    const regions: Region[] = [
        {
            id: 1,
            name: 'Chambal Region',
            slug: 'chambal',
            description: 'A land of mystery, deep ravines, and forgotten history. Home to the Bateshwar temples.',
            banner_image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg',
            sites_count: 12
        },
        {
            id: 2,
            name: 'Bundelkhand',
            slug: 'bundelkhand',
            description: 'Famous for its forts and palaces, including the hidden gems of Orchha and Datia.',
            banner_image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
            sites_count: 8
        },
        {
            id: 3,
            name: 'Malwa Plateau',
            slug: 'malwa',
            description: 'A region rich in culture and history, featuring the ancient city of Mandu.',
            banner_image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/A_beautiful_Jahaz_Mahal.jpg',
            sites_count: 15
        }
    ];

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />

            <header className="container" style={{ padding: '6rem 2rem 3rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Explore Regions</h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
                    Dive deep into the heart of India. Select a region to discover its hidden monuments, temples, and stories.
                </p>
            </header>

            <div className="container" style={{ padding: '2rem', paddingBottom: '5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {regions.map((region, index) => (
                        <motion.div
                            key={region.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="card glass"
                            style={{ 
                                padding: 0, 
                                overflow: 'hidden', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                flexDirection: 'column',
                                border: '1px solid rgba(255,255,255,0.6)'
                            }}
                            onClick={() => navigate(`/region/${region.slug}`)}
                        >
                            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={region.banner_image}
                                    alt={region.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    padding: '1.5rem',
                                    paddingTop: '3rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
                                        <MapPin size={16} />
                                        <span>{region.sites_count} Sites</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{region.name}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', flex: 1, lineHeight: 1.6 }}>
                                    {region.description}
                                </p>
                                <button
                                    className="btn btn-outline"
                                    style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '50px' }}
                                >
                                    View Details <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <div className="card" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b2e 100%)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>AR/VR Experience Zone</h2>
                        <p style={{ color: '#ccc', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                            Switch to our immersive AR/VR Section to explore sites from a floating perspective with Augmented Reality capabilities.
                        </p>
                        <button 
                            onClick={() => navigate('/antigravity')} 
                            className="btn"
                            style={{ 
                                background: 'linear-gradient(45deg, #9c27b0, #673ab7)', 
                                color: 'white', 
                                border: 'none',
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)'
                            }}
                        >
                            🕶️ Enter AR/VR Section
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
