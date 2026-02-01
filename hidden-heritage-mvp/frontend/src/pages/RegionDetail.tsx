import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MapPreview from '../components/MapPreview';
import { getSites } from '../services/api';
import { motion } from 'framer-motion';

const RegionDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [sites, setSites] = useState<any[]>([]);
    const [selectedSites, setSelectedSites] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In real app, fetch region by slug first to get ID, then sites
        // For MVP, just fetching all sites or filtering mock
        getSites()
            .then(res => {
                // Mock filter for now since API returns all
                setSites(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    const toggleSite = (id: number) => {
        if (selectedSites.includes(id)) {
            setSelectedSites(selectedSites.filter(s => s !== id));
        } else {
            setSelectedSites([...selectedSites, id]);
        }
    };

    const startTripPlanning = () => {
        navigate('/book', { state: { initialSelection: selectedSites } });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <NavBar />
            <div style={{ padding: '2rem' }}>
                <h1 style={{ textTransform: 'capitalize' }}>{slug?.replace('-', ' ')} Region</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>

                    {/* List of Sites */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {sites.map((site, index) => (
                            <motion.div
                                key={site.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    border: selectedSites.includes(site.id) ? '2px solid var(--color-secondary)' : '1px solid #ddd',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div style={{ height: '150px', backgroundColor: '#eee' }}>
                                    <img src={site.image_url || 'https://placehold.co/600x400'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h4>{site.name}</h4>
                                    <span style={{ fontSize: '0.8rem', backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>{site.type}</span>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>{site.short_description}</p>

                                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button
                                            onClick={() => toggleSite(site.id)}
                                            style={{
                                                background: selectedSites.includes(site.id) ? 'var(--color-secondary)' : '#ddd',
                                                color: selectedSites.includes(site.id) ? 'white' : 'black',
                                                border: 'none',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {selectedSites.includes(site.id) ? 'Selected' : 'Select'}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/site/${site.slug}`)}
                                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', textDecoration: 'underline' }}
                                        >
                                            More..
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map & Sticky Sidebar */}
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <MapPreview sites={sites} selectedSites={selectedSites} onSiteSelect={toggleSite} />

                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <h3>Planning</h3>
                            <p>Selected: {selectedSites.length} sites</p>
                            <button
                                onClick={startTripPlanning}
                                disabled={selectedSites.length === 0}
                                style={{
                                    width: '100%',
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    opacity: selectedSites.length === 0 ? 0.5 : 1
                                }}
                            >
                                Plan Trip with Selected
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default RegionDetail;
