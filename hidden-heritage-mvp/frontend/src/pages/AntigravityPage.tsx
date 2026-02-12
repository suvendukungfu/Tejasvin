import React from 'react';
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
                        background: 'rgba(0,0,0,0.5)', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 15px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <ArrowLeft size={20} /> Back
                </button>
            </div>

            {/* 3D Scene */}
            <AntigravityScene />
        </div>
    );
};

export default AntigravityPage;
