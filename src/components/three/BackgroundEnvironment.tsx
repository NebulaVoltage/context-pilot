import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BackgroundEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef1 = useRef<THREE.Mesh>(null);
  const geoRef2 = useRef<THREE.Mesh>(null);

  // Generate random particles
  const particlesCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.position.y = Math.sin(time * 0.1) * 0.5;
    }
    
    if (geoRef1.current) {
      geoRef1.current.rotation.x = time * 0.05;
      geoRef1.current.rotation.y = time * 0.07;
    }
    
    if (geoRef2.current) {
      geoRef2.current.rotation.x = -time * 0.04;
      geoRef2.current.rotation.z = time * 0.06;
    }
  });

  return (
    <>
      <color attach="background" args={['#0a0a0c']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#00ffff" />
      <directionalLight position={[-10, 0, 5]} intensity={0.2} color="#ffeebb" />

      {/* Grid */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial 
          color="#252530" 
          wireframe 
          transparent 
          opacity={0.05} 
          depthWrite={false}
        />
      </mesh>

      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color="#aaffff" 
          transparent 
          opacity={0.3} 
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Faint Geometric Shapes */}
      <group position={[0, 2, -10]}>
        <mesh ref={geoRef1} position={[-4, 0, 0]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
        
        <mesh ref={geoRef2} position={[5, -1, -2]}>
          <octahedronGeometry args={[2.5, 0]} />
          <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.05} />
        </mesh>
      </group>
    </>
  );
}
