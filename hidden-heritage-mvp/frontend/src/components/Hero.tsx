import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '90vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-inverse)',
            textAlign: 'center',
            marginTop: '-80px', // Match new nav height
            paddingTop: '80px'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#2C2420', // Fallback color
                backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -2
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))', // Darker overlay for better contrast
                zIndex: -1
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        Discover the Undiscovered
                    </span>
                    <h1 style={{
                        color: 'var(--color-text-inverse)', // Override global h1 color
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        textShadow: '0 4px 30px rgba(0,0,0,0.8)', // Stronger shadow
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.02em'
                    }}>
                        Explore India's <br />
                        <span style={{ color: 'var(--color-accent)', fontStyle: 'italic', textShadow: '0 4px 30px rgba(0,0,0,1)' }}>Hidden Heritage</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        marginBottom: '2.5rem',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        color: 'rgba(255,255,255,1)', // Full opacity
                        lineHeight: 1.6,
                        textShadow: '0 2px 4px rgba(0,0,0,0.6)' // Added shadow for readability
                    }}
                >
                    Uncover ancient temples, mystical ravines, and timeless rock art in the heart of Chambal.
                    Journey beyond the guidebooks and experience history firsthand.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <button
                        onClick={() => navigate('/explore')}
                        className="btn btn-secondary"
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            boxShadow: '0 10px 20px rgba(216, 67, 21, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        Start Exploring <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="btn"
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: 'white'
                        }}
                    >
                        Learn More
                    </button>
                </motion.div>
            </div>

            {/* Photo Treadmill Placeholder */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '1.5rem 0',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                overflow: 'hidden',
                zIndex: 0
            }}>
                <div style={{ display: 'flex', gap: '1rem', animation: 'scroll 40s linear infinite' }}>
                    {/* Duplicated for seamless loop */}
                    {/* Duplicated for seamless loop */}
                    {[...Array(20)].map((_, i) => {
                        const images = [
                            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gwalior_Fort_%28sunset%29.jpg',
                            'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg',
                            'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg',
                            'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg',
                            'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
                            'https://upload.wikimedia.org/wikipedia/commons/7/78/Chausath_Yogini_Temple_%2816313518811%29.jpg'
                        ];
                        return (
                        <div key={i} style={{
                            minWidth: '200px',
                            height: '120px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: 'var(--border-radius-md)',
                            backgroundImage: `url(${images[i % images.length]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }} />
                    )})}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default Hero;
