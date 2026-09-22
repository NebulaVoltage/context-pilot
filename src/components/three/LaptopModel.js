import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
import LaptopScreen from './LaptopScreen';
import { lerp } from '@/utils/math';
export default function LaptopModel() {
    const group = useRef(null);
    const [hovered, setHovered] = useState(false);
    const { state, focusDevice, setFocusDevice } = useSimulation();
    const { setCameraPreset } = useCameraStore();
    const isFocused = focusDevice === 'laptop';
    const handleClick = (e) => {
        e.stopPropagation();
        if (isFocused) {
            setFocusDevice('none');
            setCameraPreset('hero');
        }
        else {
            setFocusDevice('laptop');
            setCameraPreset('laptop');
        }
    };
    useFrame((stateThree, delta) => {
        if (!group.current)
            return;
        const time = stateThree.clock.getElapsedTime();
        // Ambient floating motion
        const floatY = Math.sin(time * 1.3) * 0.03;
        group.current.position.y = lerp(group.current.position.y, floatY, 0.08);
        // Parallax responsive tilt — subtle, grounded, physically heavier
        const targetRotX = isFocused ? 0 : stateThree.pointer.y * 0.035;
        const targetRotY = isFocused ? 0.04 : stateThree.pointer.x * 0.045;
        group.current.rotation.x = lerp(group.current.rotation.x, targetRotX, 0.06);
        group.current.rotation.y = lerp(group.current.rotation.y, targetRotY, 0.06);
    });
    const screenEmissiveIntensity = useMemo(() => {
        if (isFocused)
            return 1.6;
        if (hovered)
            return 1.3;
        if (state === 'idle')
            return 0.7;
        if (['capture', 'execution', 'verification'].includes(state))
            return 1.5;
        return 1.0;
    }, [state, hovered, isFocused]);
    return (_jsxs("group", { ref: group, position: [-2.5, 0, 0], onClick: handleClick, onPointerEnter: () => setHovered(true), onPointerLeave: () => setHovered(false), children: [_jsxs("mesh", { position: [0, 0.04, 0], castShadow: true, receiveShadow: true, children: [_jsx("boxGeometry", { args: [3.2, 0.08, 2.2] }), _jsx("meshStandardMaterial", { color: "#18181f", metalness: 0.9, roughness: 0.25, envMapIntensity: 1.0 })] }), _jsxs("mesh", { position: [0, 0.081, -0.2], children: [_jsx("planeGeometry", { args: [2.8, 1.2] }), _jsx("meshStandardMaterial", { color: hovered || isFocused ? "#252532" : "#191922", metalness: 0.6, roughness: 0.7, emissive: "#22d3ee", emissiveIntensity: hovered ? 0.08 : 0.02 })] }), _jsxs("mesh", { position: [0, 0.082, 0.7], children: [_jsx("planeGeometry", { args: [1.0, 0.6] }), _jsx("meshStandardMaterial", { color: "#202028", metalness: 0.7, roughness: 0.35 })] }), _jsxs("group", { position: [0, 0.08, -1.1], rotation: [-0.3, 0, 0], children: [_jsxs("mesh", { rotation: [0, 0, Math.PI / 2], position: [0, 0, 0], children: [_jsx("cylinderGeometry", { args: [0.04, 0.04, 2.6, 16] }), _jsx("meshStandardMaterial", { color: "#101014", metalness: 0.95, roughness: 0.2 })] }), _jsxs("mesh", { position: [0, 1.0, -0.02], castShadow: true, children: [_jsx("boxGeometry", { args: [3.2, 2.0, 0.04] }), _jsx("meshStandardMaterial", { color: "#17171d", metalness: 0.88, roughness: 0.28 })] }), _jsxs("mesh", { position: [0, 1.0, 0.001], children: [_jsx("planeGeometry", { args: [3.1, 1.9] }), _jsx("meshPhysicalMaterial", { color: "#000000", metalness: 0.2, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.05, transmission: 0.08 })] }), _jsx(Html, { transform: true, position: [0, 1.0, 0.005], scale: 0.0048, distanceFactor: 1, children: _jsx("div", { style: {
                                width: 640,
                                height: 400,
                                backgroundColor: '#1e1e1e',
                                opacity: screenEmissiveIntensity > 0.8 ? 1 : 0.85,
                                filter: hovered || isFocused ? 'contrast(1.05) brightness(1.05)' : 'none',
                                transition: 'all 0.3s ease'
                            }, children: _jsx(LaptopScreen, {}) }) })] })] }));
}
