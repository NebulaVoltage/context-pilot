import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulation } from '@/store/simulation';
import { Link2, WifiOff } from 'lucide-react';

const NUM_PARTICLES = 120;
const CURVE_POINTS = 50;

export const OfficeKitBridge: React.FC = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { officeKitConnected, toggleOfficeKit, state } = useSimulation();
  
  // Define bezier curves from laptop (x:-1.5) to phone (x:1.5)
  const curves = useMemo(() => {
    return [
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1.5, 0, 0),
        new THREE.Vector3(-0.5, 0.4, 0.4),
        new THREE.Vector3(0.5, 0.4, 0.4),
        new THREE.Vector3(1.5, 0, 0)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1.5, 0, 0),
        new THREE.Vector3(-0.5, -0.2, -0.2),
        new THREE.Vector3(0.5, -0.2, -0.2),
        new THREE.Vector3(1.5, 0, 0)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1.5, 0, 0),
        new THREE.Vector3(-0.5, 0.1, 0.2),
        new THREE.Vector3(0.5, 0.1, -0.2),
        new THREE.Vector3(1.5, 0, 0)
      )
    ];
  }, []);

  const tubes = useMemo(() => {
    return curves.map(curve => new THREE.TubeGeometry(curve, CURVE_POINTS, 0.006, 8, false));
  }, [curves]);

  const particleData = useMemo(() => {
    return Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
      curveIndex: Math.floor(Math.random() * curves.length),
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      type: i % 3 === 0 ? 'geometric' : 'organic'
    }));
  }, [curves.length]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((stateThree, delta) => {
    const { state: simState, officeKitConnected: isConnected, confidence } = useSimulation.getState();
    
    // Determine particle behavior based on simulation state
    let targetSpeedMulti = 1;
    let direction = 1; // 1 for left to right (laptop to phone), -1 for right to left
    let active = false;

    if (!isConnected) {
      targetSpeedMulti = 0;
    } else {
      if (simState === 'transferToPhone' || simState === 'capture') {
        targetSpeedMulti = 4.5;
        direction = 1;
        active = true;
      } else if (simState === 'transferToPC' || simState === 'execution') {
        targetSpeedMulti = 4.5;
        direction = -1;
        active = true;
      } else if (simState === 'inference' || simState === 'extraction') {
        targetSpeedMulti = 0.8;
        direction = 1;
        active = true;
      } else if (simState === 'verification' || simState === 'complete') {
        targetSpeedMulti = 2.0;
        direction = -1;
        active = true;
      }
    }

    if (particlesRef.current) {
      const colorCobalt = new THREE.Color('#3867FF');
      const colorMint = new THREE.Color('#00E5FF');
      const colorDim = new THREE.Color('#161822');

      const activeColor = simState === 'verification' || simState === 'complete' ? colorMint : colorCobalt;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particleData[i];
        if (isConnected) {
          p.progress += p.speed * targetSpeedMulti * direction;
          if (p.progress > 1) p.progress = 0;
          if (p.progress < 0) p.progress = 1;
        }

        const curve = curves[p.curveIndex];
        const point = curve.getPoint(p.progress);
        dummy.position.copy(point);
        
        if (p.type === 'organic' && active) {
          dummy.position.y += Math.sin(p.progress * Math.PI * 4) * 0.02;
        }

        const scale = isConnected ? (active ? (p.type === 'geometric' ? 1.4 : 1.0) : 0.6) : 0.001;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();

        particlesRef.current.setMatrixAt(i, dummy.matrix);
        particlesRef.current.setColorAt(i, isConnected ? (active ? activeColor : colorDim) : colorDim);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
      if (particlesRef.current.instanceColor) {
        particlesRef.current.instanceColor.needsUpdate = true;
      }
    }

    // Pulse ring along center
    if (ringRef.current) {
      if (active && isConnected) {
        ringRef.current.visible = true;
        const time = stateThree.clock.getElapsedTime();
        const t = (time * 1.5) % 1;
        const ringProg = direction === 1 ? t : (1 - t);
        const centerPoint = curves[0].getPoint(ringProg);
        ringRef.current.position.copy(centerPoint);
        ringRef.current.scale.setScalar(1 + Math.sin(t * Math.PI) * 0.5);
      } else {
        ringRef.current.visible = false;
      }
    }
  });

  const getBridgeStatusLabel = () => {
    if (!officeKitConnected) return 'DISCONNECTED';
    if (state === 'transferToPhone' || state === 'capture') return 'TRANSFERRING CONTEXT';
    if (state === 'transferToPC' || state === 'execution') return 'DELIVERING ACTION';
    if (state === 'verification' || state === 'complete') return 'LINK VERIFIED';
    return 'CONNECTED';
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Tubes */}
      {tubes.map((geom, i) => (
        <mesh key={i} geometry={geom}>
          <meshBasicMaterial 
            color={officeKitConnected ? '#3867FF' : '#232733'} 
            transparent 
            opacity={officeKitConnected ? (i === 0 ? 0.35 : 0.15) : 0.05} 
            wireframe={i === 1}
          />
        </mesh>
      ))}

      {/* Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, NUM_PARTICLES]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </instancedMesh>

      {/* Pulse Ring */}
      <mesh ref={ringRef} visible={false}>
        <torusGeometry args={[0.1, 0.004, 16, 32]} />
        <meshBasicMaterial color="#3867FF" transparent opacity={0.7} />
      </mesh>

      {/* Understated Interactive 3D Bridge Label */}
      <Html position={[0, 0.7, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="flex flex-col items-center select-none">
          <button
            onClick={toggleOfficeKit}
            title="Click to toggle Office Kit bridge"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono tracking-wider backdrop-blur-md transition-all shadow-lg ${
              officeKitConnected
                ? 'bg-[#090B10]/90 border-white/15 text-white/90 hover:border-cobalt/50 hover:bg-[#0E121E]'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-300 hover:bg-rose-900/90'
            }`}
          >
            {officeKitConnected ? (
              <>
                <Link2 className="w-3 h-3 text-cobalt" />
                <span className="font-bold">OFFICE KIT</span>
                <span className="text-white/30">•</span>
                <span className="text-white/70 font-normal">CONTEXT BRIDGE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-rose-400" />
                <span>OFFICE KIT: DISCONNECTED</span>
              </>
            )}
          </button>
          
          <div className="text-[9px] font-mono tracking-widest text-cobalt-light mt-1 uppercase font-semibold">
            {getBridgeStatusLabel()}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default OfficeKitBridge;
