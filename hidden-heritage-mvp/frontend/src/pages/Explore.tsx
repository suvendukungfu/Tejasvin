import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Region {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner_image: string;
}

const Explore = () => {
    const navigate = useNavigate();
    // Mock data for MVP or fetch from API
    const regions: Region[] = [
        {
            id: 1,
            name: 'Chambal Region',
            slug: 'chambal',
            description: 'A land of mystery, deep ravines, and forgotten history.',
            banner_image: 'https://images.unsplash.com/photo-1519955025118-477af2a3e915?q=80&w=2070&auto=format&fit=crop' // Placeholder
        }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Explore Regions</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                {regions.map((region) => (
                    <motion.div
                        key={region.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src={region.banner_image}
                            alt={region.name}
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '1.5rem' }}>
                            <h3>{region.name}</h3>
                            <p style={{ color: '#666', marginBottom: '1rem' }}>{region.description}</p>
                            <button
                                onClick={() => navigate(`/region/${region.slug}`)}
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px'
                                }}
                            >
                                Details..
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
