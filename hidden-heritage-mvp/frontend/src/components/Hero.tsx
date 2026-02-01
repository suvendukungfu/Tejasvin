import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            height: '90vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center'
        }}>
            {/* Background Image Placeholder */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1598555232938-161d989f61b0?q=80&w=2070&auto=format&fit=crop)', // Placeholder image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1
            }} />

            <div style={{ maxWidth: '800px', padding: '2rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                    Explore India's Hidden Heritage
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ fontSize: '1.25rem', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                    Uncover ancient temples, mysterious ravines, and timeless rock art in the heart of Chambal. Journey beyond the guidebooks.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    onClick={() => navigate('/explore')}
                    style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        borderRadius: '50px',
                        boxShadow: '0 4px 15px rgba(200, 107, 58, 0.4)',
                        cursor: 'pointer'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start your Journey
                </motion.button>
            </div>

            {/* Photo Treadmill Placeholder */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '120px',
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ display: 'flex', gap: '1rem', paddingLeft: '2rem' }}
                >
                    {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4].map((i, idx) => (
                        <div key={idx} style={{
                            minWidth: '160px',
                            height: '90px',
                            backgroundColor: '#ddd',
                            borderRadius: '4px',
                            backgroundImage: `url(https://source.unsplash.com/random/300x200?heritage&sig=${i})`,
                            backgroundSize: 'cover'
                        }} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
