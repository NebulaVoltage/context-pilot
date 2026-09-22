import React from 'react';
import { motion } from 'framer-motion';
import { useSimulation, STATE_ORDER } from '@/store/simulation';
import { Check } from 'lucide-react';

const LABELS: Record<string, { label: string; color: string }> = {
  idle: { label: 'IDLE', color: 'text-white/40' },
  capture: { label: 'CAPTURE', color: 'text-softblue' },
  transferToPhone: { label: 'TRANSFER', color: 'text-cobalt' },
  inference: { label: 'INFER', color: 'text-violet' },
  extraction: { label: 'STRUCTURE', color: 'text-violet-light' },
  capsule: { label: 'CAPSULE', color: 'text-cobalt-light' },
  trust: { label: 'TRUST', color: 'text-mint' },
  planning: { label: 'PLAN', color: 'text-mint' },
  transferToPC: { label: 'RETURN', color: 'text-cobalt' },
  execution: { label: 'ACT', color: 'text-mint' },
  verification: { label: 'VERIFY', color: 'text-mint-light' },
  complete: { label: 'COMPLETE', color: 'text-white' }
};

export default function PipelineVisualization() {
  const { state } = useSimulation();
  
  // exclude idle from the viz
  const visualStates = STATE_ORDER.filter(s => s !== 'idle');
  const currentIndex = visualStates.indexOf(state as any);

  return (
    <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
      <div className="min-w-[850px] flex items-center justify-between relative px-6 py-2">
        {/* Progress Line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cobalt via-violet to-mint shadow-[0_0_15px_rgba(55,214,161,0.5)]"
            initial={{ width: '0%' }}
            animate={{ 
              width: currentIndex >= 0 ? `${(currentIndex / (visualStates.length - 1)) * 100}%` : '0%' 
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {visualStates.map((s, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex || state === 'complete';
          const meta = LABELS[s] || { label: s.toUpperCase(), color: 'text-white' };

          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-ink border-cobalt shadow-[0_0_20px_rgba(56,103,255,0.6)] text-white scale-110' 
                    : isCompleted 
                      ? 'bg-mint/20 border-mint text-mint' 
                      : 'bg-ink border-white/20 text-white/40'
                }`}
                animate={{
                  scale: isActive ? 1.18 : 1,
                }}
              >
                {isCompleted && !isActive ? (
                  <Check className="w-4 h-4 text-mint" />
                ) : (
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-white' : ''}`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] font-mono tracking-wider transition-colors duration-200 absolute -bottom-6 whitespace-nowrap font-medium ${
                isActive ? 'text-white font-bold' : isCompleted ? meta.color : 'text-white/30'
              }`}>
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
