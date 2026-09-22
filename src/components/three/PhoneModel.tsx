import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
import PhoneScreen from './PhoneScreen';
import { lerp } from '@/utils/math';

export default function PhoneModel() {
  const group = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const auraLightRef = useRef<THREE.PointLight>(null);
  const npuGlowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const { state, focusDevice, setFocusDevice, phoneVariant } = useSimulation();
  const { setCameraPreset } = useCameraStore();

  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const dragVelocity = useRef(new THREE.Vector2(0, 0));
  const basePosition = useRef(new THREE.Vector3(2.5, 0, 0));

  const isFocused = focusDevice === 'phone';

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isFocused) {
      setFocusDevice('none');
      setCameraPreset('hero');
    } else {
      setFocusDevice('phone');
      setCameraPreset('phone');
    }
  };

  useFrame((stateThree, delta) => {
    if (!group.current) return;
    const time = stateThree.clock.getElapsedTime();

    // Subtle floating breath animation
    const floatY = Math.sin(time * 1.5 + 1.0) * 0.035;
    group.current.position.y = lerp(group.current.position.y, basePosition.current.y + floatY, 0.08);

    if (dragging) {
      targetRotation.current.x += dragVelocity.current.y * 0.08;
      targetRotation.current.y += dragVelocity.current.x * 0.08;
      dragVelocity.current.multiplyScalar(0.92);
    } else if (isFocused) {
      targetRotation.current.x = THREE.MathUtils.degToRad(-3);
      targetRotation.current.y = THREE.MathUtils.degToRad(0);
    } else if (hovered) {
      targetRotation.current.x = stateThree.pointer.y * 0.32;
      targetRotation.current.y = stateThree.pointer.x * 0.42;
    } else {
      targetRotation.current.x = Math.sin(time * 0.8) * 0.035;
      targetRotation.current.y = Math.cos(time * 0.8) * 0.045;
    }

    // Physical rotation limits
    targetRotation.current.x = THREE.MathUtils.clamp(targetRotation.current.x, -0.7, 0.7);
    targetRotation.current.y = THREE.MathUtils.clamp(targetRotation.current.y, -0.9, 0.9);

    const damping = dragging ? 0.25 : hovered ? 0.18 : 0.08;
    group.current.rotation.x = lerp(group.current.rotation.x, targetRotation.current.x, damping);
    group.current.rotation.y = lerp(group.current.rotation.y, targetRotation.current.y, damping);

    // Dynamic specular point light response
    if (pointLightRef.current) {
      const activeState = state === 'inference' || state === 'capture' || state === 'extraction';
      const targetIntensity = isFocused ? 1.8 : hovered ? 1.3 : activeState ? 1.0 : 0.5;
      pointLightRef.current.intensity = lerp(pointLightRef.current.intensity, targetIntensity, 0.15);
    }

    if (auraLightRef.current) {
      const activeState = state === 'inference' || state === 'trust';
      auraLightRef.current.intensity = lerp(auraLightRef.current.intensity, activeState ? 1.4 : 0.3, 0.1);
    }

    // NPU pulsing glow scale inside chassis
    if (npuGlowRef.current) {
      const pulseScale = 1 + Math.sin(time * 4) * 0.04;
      npuGlowRef.current.scale.set(pulseScale, pulseScale, 1);
    }
  });

  // Variant aesthetic properties
  const getFrameColor = () => {
    switch (phoneVariant) {
      case 'alpha': return '#1F2228';
      case 'apex': return '#0E243D';
      case 'legend':
      default: return '#E2E8F0';
    }
  };

  const getBackGlassColor = () => {
    switch (phoneVariant) {
      case 'alpha': return '#0D0F14';
      case 'apex': return '#061224';
      case 'legend':
      default: return '#F8FAFC';
    }
  };

  const getAccentColor = () => {
    switch (phoneVariant) {
      case 'alpha': return '#64748B';
      case 'apex': return '#00E5FF';
      case 'legend':
      default: return '#3867FF';
    }
  };

  // Dimensions of a 6.85-inch 19.8:9 Flagship (iQOO 15 standard)
  const bodyW = 0.77;
  const bodyH = 1.62;
  const bodyD = 0.076;
  const cornerR = 0.062;

  return (
    <group 
      position={[2.5, 0, 0]} 
      ref={group}
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); setDragging(false); }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerMove={(e) => {
        if (dragging) {
          dragVelocity.current.set(e.movementX, e.movementY);
          targetRotation.current.x += e.movementY * 0.006;
          targetRotation.current.y += e.movementX * 0.006;
        }
      }}
    >
      {/* Aura Computational Lighting */}
      <pointLight ref={pointLightRef} position={[0, 0.4, 0.9]} distance={4.0} color={getAccentColor()} intensity={0.6} />
      <pointLight ref={auraLightRef} position={[0, -0.4, -0.4]} distance={3.0} color="#7A5CFF" intensity={0.4} />
      
      {/* Soft Ambient Shadow / Halo */}
      <mesh position={[0, 0, -0.07]}>
        <planeGeometry args={[1.3, 2.2]} />
        <meshBasicMaterial 
          color={getAccentColor()} 
          transparent 
          opacity={hovered || isFocused ? 0.25 : 0.08} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Internal NPU Neural Core Matrix Plane */}
      <mesh ref={npuGlowRef} position={[0, 0, -0.002]}>
        <planeGeometry args={[bodyW - 0.06, bodyH - 0.06]} />
        <meshBasicMaterial 
          color={state === 'inference' ? '#00E5FF' : '#3867FF'}
          transparent
          opacity={state === 'inference' ? 0.35 : 0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ========================================================= */}
      {/* 1. MAIN CHASSIS: CNC PRECISION MACHINED METAL FRAME       */}
      {/* ========================================================= */}
      <group>
        {/* Central Core Metal Block */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[bodyW, bodyH, bodyD]} />
          <meshStandardMaterial 
            color={getFrameColor()} 
            metalness={0.96} 
            roughness={0.18} 
            envMapIntensity={1.8}
          />
        </mesh>

        {/* 4 Precision Corner Cylindrical Fillets */}
        {[
          [-bodyW / 2 + cornerR, bodyH / 2 - cornerR],
          [bodyW / 2 - cornerR, bodyH / 2 - cornerR],
          [-bodyW / 2 + cornerR, -bodyH / 2 + cornerR],
          [bodyW / 2 - cornerR, -bodyH / 2 + cornerR],
        ].map(([cx, cy], i) => (
          <mesh key={i} position={[cx, cy, 0]}>
            <cylinderGeometry args={[cornerR, cornerR, bodyD, 32]} />
            <meshStandardMaterial color={getFrameColor()} metalness={0.96} roughness={0.18} />
          </mesh>
        ))}

        {/* Polished Chamfer Edge Highlights (Front & Rear Borders) */}
        <mesh position={[0, 0, bodyD / 2 - 0.001]}>
          <planeGeometry args={[bodyW + 0.004, bodyH + 0.004]} />
          <meshStandardMaterial color={getFrameColor()} metalness={0.98} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -bodyD / 2 + 0.001]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[bodyW + 0.004, bodyH + 0.004]} />
          <meshStandardMaterial color={getFrameColor()} metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. ANTENNA BANDS & PORT CUTOUTS                           */}
      {/* ========================================================= */}
      {/* Side Antenna Slits */}
      {[-0.6, 0.6].map((yPos, i) => (
        <React.Fragment key={i}>
          {/* Right Rail Antenna */}
          <mesh position={[bodyW / 2 + 0.001, yPos, 0]}>
            <boxGeometry args={[0.004, 0.014, bodyD + 0.002]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
          {/* Left Rail Antenna */}
          <mesh position={[-bodyW / 2 - 0.001, yPos, 0]}>
            <boxGeometry args={[0.004, 0.014, bodyD + 0.002]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Top Edge: Mic + IR Blaster Window */}
      <group position={[0, bodyH / 2 + 0.001, 0]}>
        {/* Top Mic */}
        <mesh position={[-0.14, 0, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.004, 16]} />
          <meshBasicMaterial color="#0A0C10" />
        </mesh>
        {/* IR Blaster */}
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.022, 0.004, 0.012]} />
          <meshPhysicalMaterial color="#1A0B2E" metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>
      </group>

      {/* Bottom Edge: USB-C + Stereo Speakers + Mic + SIM Tray */}
      <group position={[0, -bodyH / 2 - 0.001, 0]}>
        {/* USB-C Port Outer Cutout */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.004, 0.026]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* USB-C Gold Connector Pin Strip */}
        <mesh position={[0, -0.001, 0]}>
          <boxGeometry args={[0.045, 0.002, 0.006]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* CNC Milled Stereo Speaker Slots (Right) */}
        {[0.09, 0.12, 0.15, 0.18].map((xPos, idx) => (
          <mesh key={`spk-${idx}`} position={[xPos, 0, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.004, 12]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        ))}

        {/* Primary Mic (Left) */}
        <mesh position={[-0.09, 0, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.004, 12]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* SIM Tray Ejector Pin Hole (Far Left) */}
        <mesh position={[-0.20, 0, 0]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.004, 12]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. TACTILE HARDWARE BUTTONS (Right & Left Rails)           */}
      {/* ========================================================= */}
      {/* Right Rail: Power Key + Dual Volume Rocker */}
      <group position={[bodyW / 2 + 0.003, 0.20, 0]}>
        {/* Power Key with signature knurled chamfer */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.007, 0.12, 0.026]} />
          <meshStandardMaterial 
            color={phoneVariant === 'legend' ? '#3867FF' : getFrameColor()} 
            metalness={0.98} 
            roughness={0.12} 
          />
        </mesh>
        {/* Volume Up */}
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[0.007, 0.10, 0.026]} />
          <meshStandardMaterial color={getFrameColor()} metalness={0.98} roughness={0.12} />
        </mesh>
        {/* Volume Down */}
        <mesh position={[0, -0.20, 0]}>
          <boxGeometry args={[0.007, 0.10, 0.026]} />
          <meshStandardMaterial color={getFrameColor()} metalness={0.98} roughness={0.12} />
        </mesh>
      </group>

      {/* Left Rail: Action Switch */}
      <group position={[-bodyW / 2 - 0.003, 0.26, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.007, 0.08, 0.024]} />
          <meshStandardMaterial color={getFrameColor()} metalness={0.98} roughness={0.15} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 4. REAR BACK PLATE & iQOO 15 DESIGN ELEMENTS               */}
      {/* ========================================================= */}
      <group position={[0, 0, -bodyD / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        {/* AG Matte/Frosted Glass Back Panel */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[bodyW - 0.012, bodyH - 0.012]} />
          <meshPhysicalMaterial 
            color={getBackGlassColor()} 
            metalness={phoneVariant === 'alpha' ? 0.6 : 0.85} 
            roughness={phoneVariant === 'alpha' ? 0.35 : 0.12} 
            clearcoat={1.0} 
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* Legend Variant: BMW M Motorsport Tri-Color Racing Stripe */}
        {phoneVariant === 'legend' && (
          <group position={[0.22, 0, 0.001]}>
            {/* Red Stripe */}
            <mesh position={[-0.026, 0, 0]}>
              <planeGeometry args={[0.024, bodyH - 0.012]} />
              <meshBasicMaterial color="#FF2A4B" />
            </mesh>
            {/* Dark Navy Stripe */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.024, bodyH - 0.012]} />
              <meshBasicMaterial color="#0545C5" />
            </mesh>
            {/* Light Electric Blue Stripe */}
            <mesh position={[0.026, 0, 0]}>
              <planeGeometry args={[0.024, bodyH - 0.012]} />
              <meshBasicMaterial color="#00B5FF" />
            </mesh>
          </group>
        )}

        {/* Apex Variant: Glowing Cyber Trace Line */}
        {phoneVariant === 'apex' && (
          <mesh position={[0, -0.15, 0.001]}>
            <planeGeometry args={[0.02, 1.2]} />
            <meshBasicMaterial color="#00E5FF" transparent opacity={0.85} />
          </mesh>
        )}

        {/* Alpha Variant: Carbon Weave Matrix Accent */}
        {phoneVariant === 'alpha' && (
          <mesh position={[0, -0.25, 0.001]}>
            <planeGeometry args={[0.6, 0.9]} />
            <meshBasicMaterial color="#141822" transparent opacity={0.4} />
          </mesh>
        )}

        {/* iQOO Brand Wordmark (Rear Lower Center) */}
        <group position={[0, -0.62, 0.002]}>
          <mesh>
            <planeGeometry args={[0.22, 0.045]} />
            <meshBasicMaterial 
              color={phoneVariant === 'legend' ? '#1E293B' : '#FFFFFF'} 
              transparent 
              opacity={0.85} 
            />
          </mesh>
        </group>
      </group>
      
      {/* ========================================================= */}
      {/* 5. REAR CAMERA MODULE: "MONSTER HALO" SQUIRCLE ISLAND      */}
      {/* ========================================================= */}
      <group position={[-0.19, 0.51, -bodyD / 2 - 0.018]} rotation={[0, Math.PI, 0]}>
        {/* Stepped Island Base Plate */}
        <mesh castShadow>
          <boxGeometry args={[0.30, 0.30, 0.025]} />
          <meshStandardMaterial color="#0B0D14" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* CNC Diamond-Cut Metallic Bezel Border */}
        <mesh position={[0, 0, 0.013]}>
          <boxGeometry args={[0.31, 0.31, 0.004]} />
          <meshStandardMaterial color={getFrameColor()} metalness={1.0} roughness={0.12} />
        </mesh>

        {/* Camera 1: 50MP Sony IMX VCS Main Sensor */}
        <group position={[-0.068, 0.068, -0.014]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Outer Knurled Ring */}
          <mesh castShadow>
            <cylinderGeometry args={[0.054, 0.054, 0.018, 32]} />
            <meshStandardMaterial color="#111522" metalness={0.98} roughness={0.1} />
          </mesh>
          {/* Inner Optical Lens with Anti-Reflective Blue Coating */}
          <mesh position={[0, 0.010, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.002, 32]} />
            <meshPhysicalMaterial color="#3867FF" metalness={1} roughness={0.04} clearcoat={1} />
          </mesh>
          {/* Center Aperture Pupil */}
          <mesh position={[0, 0.011, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.002, 24]} />
            <meshBasicMaterial color="#020408" />
          </mesh>
        </group>

        {/* Camera 2: 100X Periscope Telephoto Lens */}
        <group position={[0.068, 0.068, -0.014]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.050, 0.050, 0.018, 32]} />
            <meshStandardMaterial color="#0C101A" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Square Prism Aperture */}
          <mesh position={[0, 0.010, 0]}>
            <boxGeometry args={[0.040, 0.002, 0.040]} />
            <meshPhysicalMaterial color="#7A5CFF" metalness={0.95} roughness={0.08} clearcoat={1} />
          </mesh>
        </group>

        {/* Camera 3: 50MP Ultra-Wide Angle Lens */}
        <group position={[-0.068, -0.068, -0.014]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.044, 0.044, 0.018, 32]} />
            <meshStandardMaterial color="#0A0E17" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.010, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.002, 32]} />
            <meshPhysicalMaterial color="#00E5FF" metalness={1} roughness={0.05} clearcoat={1} />
          </mesh>
        </group>

        {/* Aura Ring Light & Dual-Tone Flash Module */}
        <group position={[0.068, -0.068, -0.013]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Outer Ring Housing */}
          <mesh>
            <cylinderGeometry args={[0.036, 0.036, 0.010, 24]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.3} roughness={0.1} />
          </mesh>
          {/* Glowing Aura Ring Light Pipe */}
          <mesh position={[0, 0.006, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.002, 24]} />
            <meshBasicMaterial color="#FFF5D6" />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 6. FRONT DISPLAY FACE: 2.5D BEZEL, EARPIECE & PUNCH HOLE  */}
      {/* ========================================================= */}
      {/* Front Bezel Glass Substrate */}
      <mesh position={[0, 0, bodyD / 2 + 0.001]}>
        <planeGeometry args={[bodyW - 0.012, bodyH - 0.012]} />
        <meshPhysicalMaterial 
          color="#000000" 
          metalness={0.2} 
          roughness={0.04} 
          clearcoat={1.0} 
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* Top Earpiece Micro-Speaker Slit */}
      <mesh position={[0, bodyH / 2 - 0.015, bodyD / 2 + 0.0018]}>
        <boxGeometry args={[0.11, 0.0035, 0.002]} />
        <meshBasicMaterial color="#060709" />
      </mesh>

      {/* Front 32MP Selfie Hole-Punch Camera */}
      <group position={[0, 0.72, bodyD / 2 + 0.002]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Outer Camera Hole Bezel */}
        <mesh>
          <cylinderGeometry args={[0.018, 0.018, 0.003, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Optical Lens Coating */}
        <mesh position={[0, 0.002, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.002, 24]} />
          <meshPhysicalMaterial color="#3867FF" metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>
      </group>
      
      {/* ========================================================= */}
      {/* 7. INTERACTIVE OLED SCREEN (OriginOS 6 UI)                 */}
      {/* ========================================================= */}
      <Html 
        transform 
        position={[0, 0, bodyD / 2 + 0.003]} 
        scale={0.00202} 
        distanceFactor={1}
      >
        <div 
          style={{ 
            width: 360, 
            height: 770, 
            backgroundColor: '#07080C',
            borderRadius: 36,
            overflow: 'hidden',
            pointerEvents: 'auto',
            willChange: 'transform, opacity',
            boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          <PhoneScreen />
        </div>
      </Html>
    </group>
  );
}
