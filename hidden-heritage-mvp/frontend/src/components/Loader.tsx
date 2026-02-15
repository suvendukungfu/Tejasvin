import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div style={{ 
            height: '100vh', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--color-bg-body)',
            position: 'fixed',
            inset: 0,
            zIndex: 9999
        }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                {/* Ancient/Futuristic Symbol */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ 
                        duration: 4, 
                        ease: "easeInOut", 
                        repeat: Infinity 
                    }}
                    style={{ 
                        width: '64px', 
                        height: '64px', 
                        border: '2px solid var(--color-gold)', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-gold)', borderRadius: '50%', opacity: 0.2 }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '0.85rem', 
                        letterSpacing: '0.3em', 
                        textTransform: 'uppercase', 
                        color: 'var(--color-text-tertiary)' 
                    }}
                >
                    Accessing Archive...
                </motion.div>
            </div>
        </div>
    );
};

export default Loader;
