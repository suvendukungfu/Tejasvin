
import { useNavigate } from 'react-router-dom';
import AntigravityScene from '../components/AntigravityScene';
import { ArrowLeft } from 'lucide-react';

const AntigravityPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Overlay UI */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{ 
                        background: 'rgba(255,255,255,0.15)', 
                        backdropFilter: 'blur(10px)',
                        color: 'white', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        padding: '10px 20px', 
                        borderRadius: '50px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                    <ArrowLeft size={20} /> Back to Reality
                </button>
            </div>

            {/* 3D Scene */}
            <AntigravityScene />
        </div>
    );
};

export default AntigravityPage;
