import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import * as THREE from 'three';
import { ScanFace, X } from 'lucide-react';

const store = createXRStore()

const FloatingArtifact = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh
        {...props}
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial 
            color={hovered ? '#D4AF37' : '#B89550'} 
            roughness={0.05} 
            metalness={1} 
            wireframe={!hovered}
            emissive={hovered ? '#D4AF37' : '#5C4033'}
            emissiveIntensity={0.5}
        />
        </mesh>
        
        {/* Holographic Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={props.position}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#B89550" emissive="#B89550" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
    </Float>
  );
};

const AntigravityScene: React.FC = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, #1C1917 0%, #000000 100%)', position: 'fixed', inset: 0, zIndex: 10000 }}>
             
             {/* Neural UI Layer */}
             <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                 <button 
                    onClick={() => window.history.back()}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                 >
                    <X size={14} /> COLLAPSE PORTAL
                 </button>
             </div>

             <div style={{ position: 'absolute', bottom: '64px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
                 <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Synchronizing Spatial Mesh...</p>
                 <button 
                    onClick={() => store.enterAR()} 
                    className="btn-neural"
                    style={{ 
                        background: '#B89550',
                        color: '#1C1917',
                        padding: '1.2rem 2.5rem',
                        borderRadius: '100px',
                        border: 'none',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        letterSpacing: '0.15em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 0 40px rgba(184, 149, 80, 0.4)'
                    }}
                 >
                    <ScanFace size={20} /> INITIALIZE AR PORTAL
                 </button>
             </div>

            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <XR store={store}>
                    <fog attach="fog" args={['#000', 5, 15]} />
                    
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={5} color="#B89550" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#5C4033" />
                    
                    <FloatingArtifact position={[0, 0, 0]} />
                    
                    {/* Floating Text Assemblies */}
                    <group position={[0, 1.5, 2]}>
                         <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                             <Text 
                                fontSize={0.2} 
                                color="#B89550"
                                maxWidth={4}
                                textAlign="center"
                                letterSpacing={0.4}
                             >
                                L.I.D.A.R. MESH GENERATED
                             </Text>
                         </Float>
                    </group>

                    <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={2} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                </XR>
            </Canvas>
        </div>
    );
};

export default AntigravityScene;
