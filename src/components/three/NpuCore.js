import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulation } from '@/store/simulation';
const NUM_NODES = 40;
const NUM_PARTICLES = 100;
export const NpuCore = () => {
    const ringsRef = useRef(null);
    const nodesRef = useRef(null);
    const particlesRef = useRef(null);
    const pulseRef = useRef(null);
    const lightRef = useRef(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    // Node positions on a sphere
    const nodePositions = useMemo(() => {
        const pos = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        for (let i = 0; i < NUM_NODES; i++) {
            const y = 1 - (i / (NUM_NODES - 1)) * 2;
            const radius = Math.sqrt(1 - y * y) * 1.4;
            const theta = phi * i;
            pos.push(new THREE.Vector3(Math.cos(theta) * radius, y * 1.4, Math.sin(theta) * radius));
        }
        return pos;
    }, []);
    // Particle initial states
    const particleData = useMemo(() => {
        return Array.from({ length: NUM_PARTICLES }).map(() => ({
            angle: Math.random() * Math.PI * 2,
            radius: 1.5 + Math.random() * 1.5,
            speed: 0.005 + Math.random() * 0.01,
            yOffset: (Math.random() - 0.5) * 2,
            phase: Math.random() * Math.PI * 2
        }));
    }, []);
    useFrame((state, delta) => {
        const simState = useSimulation.getState().state;
        const time = state.clock.getElapsedTime();
        // Determine state multipliers
        let speedMult = 1;
        let nodeBrightness = 0.2;
        let lightIntensity = 0.5;
        switch (simState) {
            case 'idle':
                speedMult = 0.1;
                break;
            case 'inference':
                speedMult = 4;
                nodeBrightness = 0.8;
                lightIntensity = 2;
                break;
            case 'extraction':
                speedMult = 2;
                nodeBrightness = 0.5;
                lightIntensity = 1;
                break;
            case 'capsule':
                speedMult = 3;
                nodeBrightness = 1.0;
                lightIntensity = 3;
                break;
            default:
                speedMult = 0.5;
                break;
        }
        // Animate rings
        if (ringsRef.current) {
            ringsRef.current.children[0].rotation.x += delta * speedMult * 0.5;
            ringsRef.current.children[0].rotation.y += delta * speedMult * 0.3;
            ringsRef.current.children[1].rotation.y -= delta * speedMult * 0.4;
            ringsRef.current.children[1].rotation.z += delta * speedMult * 0.2;
            ringsRef.current.children[2].rotation.x -= delta * speedMult * 0.3;
            ringsRef.current.children[2].rotation.z -= delta * speedMult * 0.5;
        }
        // Animate nodes
        if (nodesRef.current) {
            nodePositions.forEach((pos, i) => {
                dummy.position.copy(pos);
                // Node pulse based on inference state
                let scale = 1;
                if (simState === 'inference') {
                    const wave = Math.sin(time * 5 + i * 0.5) * 0.5 + 0.5;
                    scale = 1 + wave * 0.5;
                }
                else if (simState === 'capsule') {
                    scale = 1.5;
                }
                dummy.scale.setScalar(scale);
                dummy.updateMatrix();
                nodesRef.current.setMatrixAt(i, dummy.matrix);
            });
            nodesRef.current.instanceMatrix.needsUpdate = true;
            nodesRef.current.material.opacity = lerp(nodesRef.current.material.opacity, nodeBrightness, 0.1);
        }
        // Animate particles
        if (particlesRef.current) {
            particleData.forEach((data, i) => {
                data.angle += data.speed * speedMult;
                let r = data.radius;
                if (simState === 'capsule') {
                    // Converge to center
                    r = lerp(r, 0.2, 0.05);
                }
                else {
                    // Normal orbit
                    r = data.radius + Math.sin(time * 2 + data.phase) * 0.2;
                }
                dummy.position.set(Math.cos(data.angle) * r, data.yOffset * Math.sin(time + data.phase), Math.sin(data.angle) * r);
                dummy.scale.setScalar(simState === 'capsule' ? 0.5 : 1);
                dummy.updateMatrix();
                particlesRef.current.setMatrixAt(i, dummy.matrix);
            });
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
        // Animate pulse ring during inference
        if (pulseRef.current) {
            if (simState === 'inference') {
                const pulseTime = (time * 2) % 1;
                pulseRef.current.scale.setScalar(1 + pulseTime * 3);
                pulseRef.current.material.opacity = (1 - pulseTime) * 0.5;
                pulseRef.current.visible = true;
            }
            else {
                pulseRef.current.visible = false;
            }
        }
        if (lightRef.current) {
            lightRef.current.intensity = lerp(lightRef.current.intensity, lightIntensity, 0.1);
        }
    });
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    return (_jsxs("group", { position: [2.5, 0, -1.5], children: [_jsx("pointLight", { ref: lightRef, color: "#00e5ff", intensity: 0.5, distance: 5 }), _jsxs("group", { ref: ringsRef, children: [_jsxs("mesh", { children: [_jsx("torusGeometry", { args: [0.8, 0.005, 16, 64] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.2, wireframe: true })] }), _jsxs("mesh", { children: [_jsx("torusGeometry", { args: [1.2, 0.008, 16, 64] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.15 })] }), _jsxs("mesh", { children: [_jsx("torusGeometry", { args: [1.6, 0.01, 16, 64] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.1, wireframe: true })] })] }), _jsxs("instancedMesh", { ref: nodesRef, args: [undefined, undefined, NUM_NODES], children: [_jsx("sphereGeometry", { args: [0.03, 16, 16] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.2 })] }), _jsxs("instancedMesh", { ref: particlesRef, args: [undefined, undefined, NUM_PARTICLES], children: [_jsx("sphereGeometry", { args: [0.01, 8, 8] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.6 })] }), _jsxs("mesh", { ref: pulseRef, visible: false, children: [_jsx("ringGeometry", { args: [0.8, 0.85, 32] }), _jsx("meshBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0, side: THREE.DoubleSide })] }), _jsxs("mesh", { position: [0, 0, -1], children: [_jsx("planeGeometry", { args: [4, 4, 10, 10] }), _jsx("meshBasicMaterial", { color: "#ffffff", transparent: true, opacity: 0.03, wireframe: true })] }), _jsx(Html, { position: [0, 2.2, 0], center: true, style: { pointerEvents: 'none' }, children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "text-xs text-cyan-400 font-mono tracking-[0.3em] whitespace-nowrap", children: "LOCAL AI INFERENCE" }), _jsx(NpuTelemetry, {})] }) })] }));
};
const NpuTelemetry = () => {
    const { state } = useSimulation();
    const [data, setData] = React.useState({ conf: '---', ops: '---' });
    React.useEffect(() => {
        if (state === 'inference') {
            const interval = setInterval(() => {
                setData({
                    conf: (0.9 + Math.random() * 0.09).toFixed(3),
                    ops: (40 + Math.random() * 10).toFixed(1) + 'T'
                });
            }, 500);
            return () => clearInterval(interval);
        }
        else {
            setData({ conf: '---', ops: '---' });
        }
    }, [state]);
    return (_jsxs("div", { className: "flex gap-4 mt-2 text-[10px] text-cyan-300/60 font-mono", children: [_jsxs("div", { children: ["CONF: ", data.conf] }), _jsxs("div", { children: ["OPS: ", data.ops] }), _jsx("div", { children: "INT8" })] }));
};
export default NpuCore;
