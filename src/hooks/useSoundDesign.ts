import { useCallback } from 'react';
import { useSimulation } from '@/store/simulation';

export type SoundEvent = 
  | 'brandReveal'
  | 'contextCaptured'
  | 'dataTransfer'
  | 'npuActivated'
  | 'capsuleFormed'
  | 'trustPassed'
  | 'actionExecuted'
  | 'verified'
  | 'completed'
  | 'click'
  | 'hover';

export function useSoundDesign() {
  const { audioEnabled } = useSimulation();

  const triggerSound = useCallback((event: SoundEvent) => {
    if (!audioEnabled) return;
    
    // Optional Web Audio synthesizer for tactile futuristic micro-clicks
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      switch (event) {
        case 'hover':
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'click':
          osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.07);
          break;
        case 'npuActivated':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.3);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        case 'trustPassed':
          osc.frequency.setValueAtTime(540, now);
          osc.frequency.setValueAtTime(720, now + 0.08);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.22);
          break;
        default:
          break;
      }
    } catch {
      // Audio context may be restricted before user gesture
    }
  }, [audioEnabled]);

  return { triggerSound };
}

export default useSoundDesign;
