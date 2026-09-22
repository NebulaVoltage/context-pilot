import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import CameraController from './CameraController';
import BackgroundEnvironment from './BackgroundEnvironment';
import LaptopModel from './LaptopModel';
import PhoneModel from './PhoneModel';
import { OfficeKitBridge } from './OfficeKitBridge';
import { NpuCore } from './NpuCore';

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#090B10] text-cobalt-light select-none">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
        <div className="text-[11px] tracking-[0.25em] font-mono text-white/70 uppercase">
          INITIALIZING SILICON STUDIO
        </div>
        <div className="text-[9px] font-mono text-white/30">
          + 37.7749° N &bull; HARDWARE ENCLAVE
        </div>
      </div>
    </div>
  );
}

interface DeviceSceneProps {
  className?: string;
}

export default function DeviceScene({ className = 'w-full h-full' }: DeviceSceneProps) {
  return (
    <div className={`relative ${className} bg-[#090B10]`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          frameloop="always"
        >
          <fog attach="fog" args={['#090B10', 8, 30]} />
          <CameraController />
          <BackgroundEnvironment />

          <LaptopModel />
          <PhoneModel />
          <OfficeKitBridge />
          <NpuCore />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            blur={2.5}
            scale={20}
            far={10}
            resolution={512}
            color="#000000"
          />
          <AdaptiveDpr pixelated />
        </Canvas>
      </Suspense>
    </div>
  );
}
