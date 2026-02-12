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

            {/* Explore Hero Section */}
            <div style={{
                height: '50vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginTop: '-70px',
                paddingTop: '70px',
                marginBottom: '4rem',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -2,
                    filter: 'brightness(0.8) grayscale(20%)'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
                    zIndex: -1
                }} />
                
                <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ 
                            fontSize: '4.5rem', 
                            marginBottom: '1.5rem', 
                            fontFamily: 'var(--font-heading)', 
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)' 
                        }}>
                            Explore Hidden India
                        </h1>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            maxWidth: '700px', 
                            margin: '0 auto', 
                            fontSize: '1.25rem', 
                            lineHeight: 1.6,
                            fontWeight: 300 
                        }}>
                             Journey beyond the ordinary. Discover the forgotten monuments, ancient temples, and untold stories of the heartland.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem', paddingBottom: '5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {regions.map((region, index) => (
                        <motion.div
                            key={region.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            className="card glass"
                            style={{ 
                                padding: 0, 
                                overflow: 'hidden', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                flexDirection: 'column',
                                borderRadius: 'var(--border-radius-lg)',
                                border: '1px solid rgba(255,255,255,0.8)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                background: 'var(--color-bg-surface)',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => navigate(`/region/${region.slug}`)}
                        >
                            <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={region.banner_image}
                                    alt={region.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                                    className="card-image-zoom"
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    padding: '2rem',
                                    paddingTop: '6rem',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <MapPin size={16} color="var(--color-secondary)" />
                                        <span>{region.sites_count} Sites</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 700 }}>{region.name}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1rem', flex: 1, lineHeight: 1.7 }}>
                                    {region.description}
                                </p>
                                <button
                                    className="btn btn-outline"
                                    style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '50px', padding: '0.8rem 1.75rem' }}
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
