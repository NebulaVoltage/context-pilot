import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraStore } from '@/store/camera';
import { lerp } from '@/utils/math';
export default function CameraController() {
    const { camera } = useThree();
    const { currentPreset, targetPosition, targetLookAt, fov, setCameraPreset } = useCameraStore();
    const currentPos = useRef(new THREE.Vector3().copy(camera.position));
    const currentLook = useRef(new THREE.Vector3(0, 0, 0));
    const targetLook = useRef(new THREE.Vector3(0, 0, 0));
    // Set initial position
    useEffect(() => {
        setCameraPreset('hero');
        // We assume the store has default targetPosition etc. 
        // Wait for store to update
    }, [setCameraPreset]);
    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.1);
        const damping = 0.05;
        // Update position
        currentPos.current.x = lerp(currentPos.current.x, targetPosition[0], damping);
        currentPos.current.y = lerp(currentPos.current.y, targetPosition[1], damping);
        currentPos.current.z = lerp(currentPos.current.z, targetPosition[2], damping);
        camera.position.copy(currentPos.current);
        // Update look at
        targetLook.current.set(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
        currentLook.current.x = lerp(currentLook.current.x, targetLook.current.x, damping);
        currentLook.current.y = lerp(currentLook.current.y, targetLook.current.y, damping);
        currentLook.current.z = lerp(currentLook.current.z, targetLook.current.z, damping);
        camera.lookAt(currentLook.current);
        // Update FOV
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = lerp(camera.fov, fov, damping);
            camera.updateProjectionMatrix();
        }
    });
    return null;
}
