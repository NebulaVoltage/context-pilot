import { create } from 'zustand';
const CAMERA_PRESETS = {
    hero: { position: [0, 0.4, 7.5], lookAt: [0, 0.2, 0], fov: 44 },
    phone: { position: [3, 0.5, 4], lookAt: [2.5, 0, 0], fov: 40 },
    npu: { position: [3.5, 0.5, 2.5], lookAt: [2.5, 0, -1], fov: 35 },
    capsule: { position: [1, 1, 4], lookAt: [0, 0.5, 0], fov: 40 },
    trust: { position: [1, 0.5, 5], lookAt: [0, 0, 0], fov: 42 },
    laptop: { position: [-3, 0.5, 4], lookAt: [-2.5, 0, 0], fov: 40 },
    overview: { position: [0, 3, 10], lookAt: [0, 0, 0], fov: 50 },
};
export const useCameraStore = create((set) => ({
    currentPreset: 'hero',
    targetPosition: CAMERA_PRESETS.hero.position,
    targetLookAt: CAMERA_PRESETS.hero.lookAt,
    fov: CAMERA_PRESETS.hero.fov,
    setCameraPreset: (preset) => {
        const config = CAMERA_PRESETS[preset];
        set({
            currentPreset: preset,
            targetPosition: config.position,
            targetLookAt: config.lookAt,
            fov: config.fov
        });
    }
}));
