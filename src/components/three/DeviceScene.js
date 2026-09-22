import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
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
    return (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#090B10] text-cobalt-light select-none", children: _jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 border-2 border-cobalt border-t-transparent rounded-full animate-spin" }), _jsx("div", { className: "text-[11px] tracking-[0.25em] font-mono text-white/70 uppercase", children: "INITIALIZING SILICON STUDIO" }), _jsx("div", { className: "text-[9px] font-mono text-white/30", children: "+ 37.7749\u00B0 N \u2022 HARDWARE ENCLAVE" })] }) }));
}
export default function DeviceScene({ className = 'w-full h-full' }) {
    return (_jsx("div", { className: `relative ${className} bg-[#090B10]`, children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsxs(Canvas, { shadows: true, dpr: [1, 2], gl: {
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }, frameloop: "always", children: [_jsx("fog", { attach: "fog", args: ['#090B10', 8, 30] }), _jsx(CameraController, {}), _jsx(BackgroundEnvironment, {}), _jsx(LaptopModel, {}), _jsx(PhoneModel, {}), _jsx(OfficeKitBridge, {}), _jsx(NpuCore, {}), _jsx(ContactShadows, { position: [0, -1.5, 0], opacity: 0.4, blur: 2.5, scale: 20, far: 10, resolution: 512, color: "#000000" }), _jsx(AdaptiveDpr, { pixelated: true })] }) }) }));
}
