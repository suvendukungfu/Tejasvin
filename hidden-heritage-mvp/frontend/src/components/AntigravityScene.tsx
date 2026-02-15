import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import * as THREE from 'three';
import { ScanFace } from 'lucide-react';

const store = createXRStore()

const PlaceholderModel = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  useFrame((_, delta) => (meshRef.current.rotation.x += delta * 0.5));

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.2 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
            color={hovered ? '#C8A359' : '#F9F7F2'} 
            roughness={0.1} 
            metalness={0.9} 
            emissive={hovered ? '#C8A359' : 'black'}
            emissiveIntensity={0.2}
        />
        </mesh>
    </Float>
  );
};

const AntigravityScene: React.FC = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'var(--color-spatial-void)' }}>
             <button 
                onClick={() => store.enterAR()} 
                className="btn-neural"
                style={{ 
                    position: 'absolute', 
                    zIndex: 10, 
                    bottom: '64px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}
             >
                <ScanFace size={20} /> INITIALIZE AR PORTAL
             </button>

            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <XR store={store}>
                    {/* Atmospheric Lighting */}
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#C8A359" />
                    <pointLight position={[-10, -5, -5]} intensity={0.5} color="#F9F7F2" />
                    
                    <PlaceholderModel position={[-1.5, 0, 0]} />
                    <PlaceholderModel position={[1.5, 0, 0]} />

                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                        <Text 
                            position={[0, 2.5, 0]} 
                            fontSize={0.5} 
                            color="#C8A359" 
                            font="https://fonts.gstatic.com/s/playfairdisplay/v21/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff"
                            anchorX="center" 
                            anchorY="middle"
                            letterSpacing={0.2}
                        >
                            SPATIAL ARCHIVE
                        </Text>
                    </Float>
                    
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </XR>
            </Canvas>
        </div>
    );
};

export default AntigravityScene;
