import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import * as THREE from 'three';

const store = createXRStore()

const PlaceholderModel = (props: any) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const AntigravityScene: React.FC = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
             <button onClick={() => store.enterAR()} style={{ position: 'absolute', zIndex: 10, top: '20px', left: '20px' }}>
                Enter AR
             </button>
            <Canvas>
                <XR store={store}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    
                    <PlaceholderModel position={[-1.2, 0, 0]} />
                    <PlaceholderModel position={[1.2, 0, 0]} />

                    <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
                        Antigravity Mode
                    </Text>
                    
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <OrbitControls />
                </XR>
            </Canvas>
        </div>
    );
};

export default AntigravityScene;
