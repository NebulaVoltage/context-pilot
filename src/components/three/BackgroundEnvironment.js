import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
export default function BackgroundEnvironment() {
    const pointsRef = useRef(null);
    const geoRef1 = useRef(null);
    const geoRef2 = useRef(null);
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
    return (_jsxs(_Fragment, { children: [_jsx("color", { attach: "background", args: ['#0a0a0c'] }), _jsx("ambientLight", { intensity: 0.15, color: "#ffffff" }), _jsx("directionalLight", { position: [5, 10, 5], intensity: 0.5, castShadow: true, "shadow-mapSize": [1024, 1024], "shadow-bias": -0.0001 }), _jsx("directionalLight", { position: [-5, 5, -5], intensity: 0.3, color: "#00ffff" }), _jsx("directionalLight", { position: [-10, 0, 5], intensity: 0.2, color: "#ffeebb" }), _jsxs("mesh", { position: [0, -1.5, 0], rotation: [-Math.PI / 2, 0, 0], children: [_jsx("planeGeometry", { args: [100, 100] }), _jsx("meshBasicMaterial", { color: "#252530", wireframe: true, transparent: true, opacity: 0.05, depthWrite: false })] }), _jsxs("points", { ref: pointsRef, children: [_jsx("bufferGeometry", { children: _jsx("bufferAttribute", { attach: "attributes-position", count: particlesCount, array: positions, itemSize: 3 }) }), _jsx("pointsMaterial", { size: 0.02, color: "#aaffff", transparent: true, opacity: 0.3, sizeAttenuation: true, blending: THREE.AdditiveBlending })] }), _jsxs("group", { position: [0, 2, -10], children: [_jsxs("mesh", { ref: geoRef1, position: [-4, 0, 0], children: [_jsx("icosahedronGeometry", { args: [2, 0] }), _jsx("meshBasicMaterial", { color: "#ffffff", wireframe: true, transparent: true, opacity: 0.05 })] }), _jsxs("mesh", { ref: geoRef2, position: [5, -1, -2], children: [_jsx("octahedronGeometry", { args: [2.5, 0] }), _jsx("meshBasicMaterial", { color: "#00ffff", wireframe: true, transparent: true, opacity: 0.05 })] })] })] }));
}
