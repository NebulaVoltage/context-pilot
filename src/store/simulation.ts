import { create } from 'zustand';
import type { SimulationState, TelemetryData, TrustPolicy, ContextCapsuleData, CameraPreset } from '@/types';
import { CONTEXT_CAPSULE, TELEMETRY_TIMELINE } from '@/data/mockData';

export const STATE_ORDER: SimulationState[] = [
  'idle', 'capture', 'transferToPhone', 'inference',
  'extraction', 'capsule', 'trust', 'planning',
  'transferToPC', 'execution', 'verification', 'complete'
];

interface SimulationStore {
  state: SimulationState;
  isPlaying: boolean;
  telemetry: TelemetryData;
  confidence: number;
  activeSection: string;
  presentationMode: boolean;
  selectedDestination: string;
  failureMode: boolean;
  audioEnabled: boolean;
  cameraPreset: CameraPreset;
  capsule: ContextCapsuleData;
  officeKitConnected: boolean;
  introCompleted: boolean;
  focusDevice: 'none' | 'phone' | 'laptop' | 'bridge';
  phoneVariant: 'legend' | 'alpha' | 'apex';

  setState: (s: SimulationState) => void;
  advanceState: () => void;
  stepForward: () => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  getTrustPolicy: (confidence: number) => TrustPolicy;
  runFullDemo: () => void;
  setConfidence: (n: number) => void;
  setActiveSection: (s: string) => void;
  setPresentationMode: (b: boolean) => void;
  setSelectedDestination: (d: string) => void;
  setFailureMode: (b: boolean) => void;
  toggleAudio: () => void;
  setCameraPreset: (p: CameraPreset) => void;
  setOfficeKitConnected: (b: boolean) => void;
  toggleOfficeKit: () => void;
  setIntroCompleted: (b: boolean) => void;
  setFocusDevice: (d: 'none' | 'phone' | 'laptop' | 'bridge') => void;
  setPhoneVariant: (v: 'legend' | 'alpha' | 'apex') => void;
}

const DEFAULT_TELEMETRY: TelemetryData = {
  npuUtilization: 0,
  inferenceLatency: 0,
  contextLength: 0,
  memoryUsage: 120,
  thermalState: 'nominal',
  tokensProcessed: 0,
};

let activeIntervalId: number | null = null;

const stopTimer = () => {
  if (activeIntervalId !== null) {
    window.clearInterval(activeIntervalId);
    activeIntervalId = null;
  }
};

export const useSimulation = create<SimulationStore>((set, get) => {
  const advanceState = () => {
    const { state: currentState, confidence, failureMode } = get();
    const currentIndex = STATE_ORDER.indexOf(currentState);

    // If at trust check and confidence is low or failureMode is on, pause for human confirmation
    const policy = get().getTrustPolicy(confidence);
    if (currentState === 'trust' && (policy === 'confirm' || policy === 'blocked' || failureMode)) {
      stopTimer();
      set({ isPlaying: false });
      return;
    }

    if (currentIndex < STATE_ORDER.length - 1) {
      const nextState = STATE_ORDER[currentIndex + 1];
      const telemetry = TELEMETRY_TIMELINE[nextState] ?? DEFAULT_TELEMETRY;
      set({ state: nextState, telemetry });
    } else {
      // Reached complete: finish cleanly and halt
      stopTimer();
      set({ isPlaying: false });
    }
  };

  return {
    state: 'idle',
    isPlaying: false,
    telemetry: DEFAULT_TELEMETRY,
    confidence: 94.2,
    activeSection: 'hero',
    presentationMode: false,
    selectedDestination: 'jira',
    failureMode: false,
    audioEnabled: false,
    cameraPreset: 'hero',
    capsule: CONTEXT_CAPSULE,
    officeKitConnected: true,
    introCompleted: false,
    focusDevice: 'none',
    phoneVariant: 'legend',

    setState: (s: SimulationState) => set({ state: s }),

    advanceState,

    stepForward: () => {
      stopTimer();
      set({ isPlaying: false });
      advanceState();
    },

    togglePlay: () => {
      const { isPlaying, state } = get();
      if (isPlaying) {
        stopTimer();
        set({ isPlaying: false });
      } else {
        stopTimer();
        // If already at complete, start from idle
        if (state === 'complete') {
          set({ state: 'idle', isPlaying: true });
        } else {
          set({ isPlaying: true });
        }
        activeIntervalId = window.setInterval(() => {
          get().advanceState();
        }, 2800);
      }
    },

    play: () => {
      const { isPlaying, state } = get();
      if (!isPlaying) {
        stopTimer();
        if (state === 'complete') {
          set({ state: 'idle', isPlaying: true });
        } else {
          set({ isPlaying: true });
        }
        activeIntervalId = window.setInterval(() => {
          get().advanceState();
        }, 2800);
      }
    },

    pause: () => {
      stopTimer();
      set({ isPlaying: false });
    },

    reset: () => {
      stopTimer();
      set({
        state: 'idle',
        isPlaying: false,
        telemetry: DEFAULT_TELEMETRY,
        confidence: 94.2,
        failureMode: false,
        capsule: CONTEXT_CAPSULE,
        focusDevice: 'none',
      });
    },

    getTrustPolicy: (confidence: number): TrustPolicy => {
      const val = confidence <= 1 ? confidence * 100 : confidence;
      if (val >= 90) return 'auto';
      if (val >= 70) return 'assisted';
      if (val >= 50) return 'confirm';
      return 'blocked';
    },

    runFullDemo: () => {
      stopTimer();
      get().reset();
      setTimeout(() => {
        set({ isPlaying: true });
        activeIntervalId = window.setInterval(() => {
          get().advanceState();
        }, 2800);
      }, 400);
    },

    setConfidence: (n: number) => {
      const policy = get().getTrustPolicy(n);
      set({ 
        confidence: n,
        failureMode: policy === 'confirm' || policy === 'blocked',
        capsule: { ...get().capsule, confidence: n <= 1 ? n : parseFloat((n / 100).toFixed(3)) }
      });
    },

    setActiveSection: (s: string) => set({ activeSection: s }),
    setPresentationMode: (b: boolean) => set({ presentationMode: b }),
    setSelectedDestination: (d: string) => set({ selectedDestination: d }),
    setFailureMode: (b: boolean) => set({ failureMode: b }),
    toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
    setCameraPreset: (p: CameraPreset) => set({ cameraPreset: p }),
    setOfficeKitConnected: (b: boolean) => set({ officeKitConnected: b }),
    toggleOfficeKit: () => set((s) => ({ officeKitConnected: !s.officeKitConnected })),
    setIntroCompleted: (b: boolean) => set({ introCompleted: b }),
    setFocusDevice: (d: 'none' | 'phone' | 'laptop' | 'bridge') => set({ focusDevice: d }),
    setPhoneVariant: (v: 'legend' | 'alpha' | 'apex') => set({ phoneVariant: v }),
  };
});
