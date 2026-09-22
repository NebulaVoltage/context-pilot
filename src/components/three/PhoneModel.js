import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
import PhoneScreen from './PhoneScreen';
import { lerp } from '@/utils/math';
export default function PhoneModel() {
    const group = useRef(null);
    const pointLightRef = useRef(null);
    const auraLightRef = useRef(null);
    const npuGlowRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [dragging, setDragging] = useState(false);
    const { state, focusDevice, setFocusDevice, phoneVariant } = useSimulation();
    const { setCameraPreset } = useCameraStore();
    const targetRotation = useRef(new THREE.Vector2(0, 0));
    const dragVelocity = useRef(new THREE.Vector2(0, 0));
    const basePosition = useRef(new THREE.Vector3(2.5, 0, 0));
    const isFocused = focusDevice === 'phone';
    const handleClick = (e) => {
        e.stopPropagation();
        if (isFocused) {
            setFocusDevice('none');
            setCameraPreset('hero');
        }
        else {
            setFocusDevice('phone');
            setCameraPreset('phone');
        }
    };
    useFrame((stateThree, delta) => {
        if (!group.current)
            return;
        const time = stateThree.clock.getElapsedTime();
        // Subtle floating breath animation
        const floatY = Math.sin(time * 1.5 + 1.0) * 0.035;
        group.current.position.y = lerp(group.current.position.y, basePosition.current.y + floatY, 0.08);
        if (dragging) {
            targetRotation.current.x += dragVelocity.current.y * 0.08;
            targetRotation.current.y += dragVelocity.current.x * 0.08;
            dragVelocity.current.multiplyScalar(0.92);
        }
        else if (isFocused) {
            targetRotation.current.x = THREE.MathUtils.degToRad(-3);
            targetRotation.current.y = THREE.MathUtils.degToRad(0);
        }
        else if (hovered) {
            targetRotation.current.x = stateThree.pointer.y * 0.32;
            targetRotation.current.y = stateThree.pointer.x * 0.42;
        }
        else {
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
    return (_jsxs("group", { position: [2.5, 0, 0], ref: group, onClick: handleClick, onPointerEnter: () => setHovered(true), onPointerLeave: () => { setHovered(false); setDragging(false); }, onPointerDown: (e) => {
            e.stopPropagation();
            setDragging(true);
        }, onPointerUp: () => setDragging(false), onPointerMove: (e) => {
            if (dragging) {
                dragVelocity.current.set(e.movementX, e.movementY);
                targetRotation.current.x += e.movementY * 0.006;
                targetRotation.current.y += e.movementX * 0.006;
            }
        }, children: [_jsx("pointLight", { ref: pointLightRef, position: [0, 0.4, 0.9], distance: 4.0, color: getAccentColor(), intensity: 0.6 }), _jsx("pointLight", { ref: auraLightRef, position: [0, -0.4, -0.4], distance: 3.0, color: "#7A5CFF", intensity: 0.4 }), _jsxs("mesh", { position: [0, 0, -0.07], children: [_jsx("planeGeometry", { args: [1.3, 2.2] }), _jsx("meshBasicMaterial", { color: getAccentColor(), transparent: true, opacity: hovered || isFocused ? 0.25 : 0.08, blending: THREE.AdditiveBlending })] }), _jsxs("mesh", { ref: npuGlowRef, position: [0, 0, -0.002], children: [_jsx("planeGeometry", { args: [bodyW - 0.06, bodyH - 0.06] }), _jsx("meshBasicMaterial", { color: state === 'inference' ? '#00E5FF' : '#3867FF', transparent: true, opacity: state === 'inference' ? 0.35 : 0.05, blending: THREE.AdditiveBlending })] }), _jsxs("group", { children: [_jsxs("mesh", { castShadow: true, receiveShadow: true, children: [_jsx("boxGeometry", { args: [bodyW, bodyH, bodyD] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.96, roughness: 0.18, envMapIntensity: 1.8 })] }), [
                        [-bodyW / 2 + cornerR, bodyH / 2 - cornerR],
                        [bodyW / 2 - cornerR, bodyH / 2 - cornerR],
                        [-bodyW / 2 + cornerR, -bodyH / 2 + cornerR],
                        [bodyW / 2 - cornerR, -bodyH / 2 + cornerR],
                    ].map(([cx, cy], i) => (_jsxs("mesh", { position: [cx, cy, 0], children: [_jsx("cylinderGeometry", { args: [cornerR, cornerR, bodyD, 32] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.96, roughness: 0.18 })] }, i))), _jsxs("mesh", { position: [0, 0, bodyD / 2 - 0.001], children: [_jsx("planeGeometry", { args: [bodyW + 0.004, bodyH + 0.004] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.98, roughness: 0.1 })] }), _jsxs("mesh", { position: [0, 0, -bodyD / 2 + 0.001], rotation: [0, Math.PI, 0], children: [_jsx("planeGeometry", { args: [bodyW + 0.004, bodyH + 0.004] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.98, roughness: 0.1 })] })] }), [-0.6, 0.6].map((yPos, i) => (_jsxs(React.Fragment, { children: [_jsxs("mesh", { position: [bodyW / 2 + 0.001, yPos, 0], children: [_jsx("boxGeometry", { args: [0.004, 0.014, bodyD + 0.002] }), _jsx("meshBasicMaterial", { color: "#1E293B" })] }), _jsxs("mesh", { position: [-bodyW / 2 - 0.001, yPos, 0], children: [_jsx("boxGeometry", { args: [0.004, 0.014, bodyD + 0.002] }), _jsx("meshBasicMaterial", { color: "#1E293B" })] })] }, i))), _jsxs("group", { position: [0, bodyH / 2 + 0.001, 0], children: [_jsxs("mesh", { position: [-0.14, 0, 0], children: [_jsx("cylinderGeometry", { args: [0.0035, 0.0035, 0.004, 16] }), _jsx("meshBasicMaterial", { color: "#0A0C10" })] }), _jsxs("mesh", { position: [0.12, 0, 0], children: [_jsx("boxGeometry", { args: [0.022, 0.004, 0.012] }), _jsx("meshPhysicalMaterial", { color: "#1A0B2E", metalness: 0.9, roughness: 0.1, clearcoat: 1 })] })] }), _jsxs("group", { position: [0, -bodyH / 2 - 0.001, 0], children: [_jsxs("mesh", { position: [0, 0, 0], children: [_jsx("boxGeometry", { args: [0.08, 0.004, 0.026] }), _jsx("meshBasicMaterial", { color: "#000000" })] }), _jsxs("mesh", { position: [0, -0.001, 0], children: [_jsx("boxGeometry", { args: [0.045, 0.002, 0.006] }), _jsx("meshStandardMaterial", { color: "#D4AF37", metalness: 0.9, roughness: 0.2 })] }), [0.09, 0.12, 0.15, 0.18].map((xPos, idx) => (_jsxs("mesh", { position: [xPos, 0, 0], children: [_jsx("cylinderGeometry", { args: [0.004, 0.004, 0.004, 12] }), _jsx("meshBasicMaterial", { color: "#000000" })] }, `spk-${idx}`))), _jsxs("mesh", { position: [-0.09, 0, 0], children: [_jsx("cylinderGeometry", { args: [0.0035, 0.0035, 0.004, 12] }), _jsx("meshBasicMaterial", { color: "#000000" })] }), _jsxs("mesh", { position: [-0.20, 0, 0], children: [_jsx("cylinderGeometry", { args: [0.0025, 0.0025, 0.004, 12] }), _jsx("meshBasicMaterial", { color: "#000000" })] })] }), _jsxs("group", { position: [bodyW / 2 + 0.003, 0.20, 0], children: [_jsxs("mesh", { position: [0, 0.12, 0], children: [_jsx("boxGeometry", { args: [0.007, 0.12, 0.026] }), _jsx("meshStandardMaterial", { color: phoneVariant === 'legend' ? '#3867FF' : getFrameColor(), metalness: 0.98, roughness: 0.12 })] }), _jsxs("mesh", { position: [0, -0.07, 0], children: [_jsx("boxGeometry", { args: [0.007, 0.10, 0.026] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.98, roughness: 0.12 })] }), _jsxs("mesh", { position: [0, -0.20, 0], children: [_jsx("boxGeometry", { args: [0.007, 0.10, 0.026] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.98, roughness: 0.12 })] })] }), _jsx("group", { position: [-bodyW / 2 - 0.003, 0.26, 0], children: _jsxs("mesh", { position: [0, 0, 0], children: [_jsx("boxGeometry", { args: [0.007, 0.08, 0.024] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 0.98, roughness: 0.15 })] }) }), _jsxs("group", { position: [0, 0, -bodyD / 2 - 0.001], rotation: [0, Math.PI, 0], children: [_jsxs("mesh", { castShadow: true, receiveShadow: true, children: [_jsx("planeGeometry", { args: [bodyW - 0.012, bodyH - 0.012] }), _jsx("meshPhysicalMaterial", { color: getBackGlassColor(), metalness: phoneVariant === 'alpha' ? 0.6 : 0.85, roughness: phoneVariant === 'alpha' ? 0.35 : 0.12, clearcoat: 1.0, clearcoatRoughness: 0.08, reflectivity: 0.9 })] }), phoneVariant === 'legend' && (_jsxs("group", { position: [0.22, 0, 0.001], children: [_jsxs("mesh", { position: [-0.026, 0, 0], children: [_jsx("planeGeometry", { args: [0.024, bodyH - 0.012] }), _jsx("meshBasicMaterial", { color: "#FF2A4B" })] }), _jsxs("mesh", { position: [0, 0, 0], children: [_jsx("planeGeometry", { args: [0.024, bodyH - 0.012] }), _jsx("meshBasicMaterial", { color: "#0545C5" })] }), _jsxs("mesh", { position: [0.026, 0, 0], children: [_jsx("planeGeometry", { args: [0.024, bodyH - 0.012] }), _jsx("meshBasicMaterial", { color: "#00B5FF" })] })] })), phoneVariant === 'apex' && (_jsxs("mesh", { position: [0, -0.15, 0.001], children: [_jsx("planeGeometry", { args: [0.02, 1.2] }), _jsx("meshBasicMaterial", { color: "#00E5FF", transparent: true, opacity: 0.85 })] })), phoneVariant === 'alpha' && (_jsxs("mesh", { position: [0, -0.25, 0.001], children: [_jsx("planeGeometry", { args: [0.6, 0.9] }), _jsx("meshBasicMaterial", { color: "#141822", transparent: true, opacity: 0.4 })] })), _jsx("group", { position: [0, -0.62, 0.002], children: _jsxs("mesh", { children: [_jsx("planeGeometry", { args: [0.22, 0.045] }), _jsx("meshBasicMaterial", { color: phoneVariant === 'legend' ? '#1E293B' : '#FFFFFF', transparent: true, opacity: 0.85 })] }) })] }), _jsxs("group", { position: [-0.19, 0.51, -bodyD / 2 - 0.018], rotation: [0, Math.PI, 0], children: [_jsxs("mesh", { castShadow: true, children: [_jsx("boxGeometry", { args: [0.30, 0.30, 0.025] }), _jsx("meshStandardMaterial", { color: "#0B0D14", metalness: 0.92, roughness: 0.2 })] }), _jsxs("mesh", { position: [0, 0, 0.013], children: [_jsx("boxGeometry", { args: [0.31, 0.31, 0.004] }), _jsx("meshStandardMaterial", { color: getFrameColor(), metalness: 1.0, roughness: 0.12 })] }), _jsxs("group", { position: [-0.068, 0.068, -0.014], rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { castShadow: true, children: [_jsx("cylinderGeometry", { args: [0.054, 0.054, 0.018, 32] }), _jsx("meshStandardMaterial", { color: "#111522", metalness: 0.98, roughness: 0.1 })] }), _jsxs("mesh", { position: [0, 0.010, 0], children: [_jsx("cylinderGeometry", { args: [0.042, 0.042, 0.002, 32] }), _jsx("meshPhysicalMaterial", { color: "#3867FF", metalness: 1, roughness: 0.04, clearcoat: 1 })] }), _jsxs("mesh", { position: [0, 0.011, 0], children: [_jsx("cylinderGeometry", { args: [0.018, 0.018, 0.002, 24] }), _jsx("meshBasicMaterial", { color: "#020408" })] })] }), _jsxs("group", { position: [0.068, 0.068, -0.014], rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { castShadow: true, children: [_jsx("cylinderGeometry", { args: [0.050, 0.050, 0.018, 32] }), _jsx("meshStandardMaterial", { color: "#0C101A", metalness: 0.95, roughness: 0.15 })] }), _jsxs("mesh", { position: [0, 0.010, 0], children: [_jsx("boxGeometry", { args: [0.040, 0.002, 0.040] }), _jsx("meshPhysicalMaterial", { color: "#7A5CFF", metalness: 0.95, roughness: 0.08, clearcoat: 1 })] })] }), _jsxs("group", { position: [-0.068, -0.068, -0.014], rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { castShadow: true, children: [_jsx("cylinderGeometry", { args: [0.044, 0.044, 0.018, 32] }), _jsx("meshStandardMaterial", { color: "#0A0E17", metalness: 0.95, roughness: 0.15 })] }), _jsxs("mesh", { position: [0, 0.010, 0], children: [_jsx("cylinderGeometry", { args: [0.032, 0.032, 0.002, 32] }), _jsx("meshPhysicalMaterial", { color: "#00E5FF", metalness: 1, roughness: 0.05, clearcoat: 1 })] })] }), _jsxs("group", { position: [0.068, -0.068, -0.013], rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { children: [_jsx("cylinderGeometry", { args: [0.036, 0.036, 0.010, 24] }), _jsx("meshStandardMaterial", { color: "#E2E8F0", metalness: 0.3, roughness: 0.1 })] }), _jsxs("mesh", { position: [0, 0.006, 0], children: [_jsx("cylinderGeometry", { args: [0.024, 0.024, 0.002, 24] }), _jsx("meshBasicMaterial", { color: "#FFF5D6" })] })] })] }), _jsxs("mesh", { position: [0, 0, bodyD / 2 + 0.001], children: [_jsx("planeGeometry", { args: [bodyW - 0.012, bodyH - 0.012] }), _jsx("meshPhysicalMaterial", { color: "#000000", metalness: 0.2, roughness: 0.04, clearcoat: 1.0, clearcoatRoughness: 0.04 })] }), _jsxs("mesh", { position: [0, bodyH / 2 - 0.015, bodyD / 2 + 0.0018], children: [_jsx("boxGeometry", { args: [0.11, 0.0035, 0.002] }), _jsx("meshBasicMaterial", { color: "#060709" })] }), _jsxs("group", { position: [0, 0.72, bodyD / 2 + 0.002], rotation: [Math.PI / 2, 0, 0], children: [_jsxs("mesh", { children: [_jsx("cylinderGeometry", { args: [0.018, 0.018, 0.003, 32] }), _jsx("meshBasicMaterial", { color: "#000000" })] }), _jsxs("mesh", { position: [0, 0.002, 0], children: [_jsx("cylinderGeometry", { args: [0.011, 0.011, 0.002, 24] }), _jsx("meshPhysicalMaterial", { color: "#3867FF", metalness: 0.9, roughness: 0.1, clearcoat: 1 })] })] }), _jsx(Html, { transform: true, position: [0, 0, bodyD / 2 + 0.003], scale: 0.00202, distanceFactor: 1, children: _jsx("div", { style: {
                        width: 360,
                        height: 770,
                        backgroundColor: '#07080C',
                        borderRadius: 36,
                        overflow: 'hidden',
                        pointerEvents: 'auto',
                        willChange: 'transform, opacity',
                        boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
                    }, children: _jsx(PhoneScreen, {}) }) })] }));
}
