import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';

import CaptureStep from './CaptureStep';
import TransferStep from './TransferStep';
import InferenceStep from './InferenceStep';
import SemanticExtraction from './SemanticExtraction';
import ContextCapsuleViz from './ContextCapsuleViz';
import TrustEngineViz from './TrustEngineViz';
import ActionPlanning from './ActionPlanning';
import LaptopExecution from './LaptopExecution';
import VerificationStep from './VerificationStep';
import SuccessState from './SuccessState';
import FailureMode from './FailureMode';

const STATE_COMPONENTS: Record<string, React.FC> = {
  idle: () => <div className="text-gray-500 font-mono">WAITING FOR CONTEXT...</div>,
  capture: CaptureStep,
  transferToPhone: TransferStep,
  inference: InferenceStep,
  extraction: SemanticExtraction,
  capsule: ContextCapsuleViz,
  trust: TrustEngineViz,
  planning: ActionPlanning,
  transferToPC: TransferStep,
  execution: LaptopExecution,
  verification: VerificationStep,
  complete: SuccessState,
};

export default function WorkflowSimulator() {
  const { state, getTrustPolicy, confidence } = useSimulation();

  let ComponentToRender = STATE_COMPONENTS[state] || STATE_COMPONENTS.idle;
  
  if (state === 'trust' && (getTrustPolicy(confidence) === 'confirm' || getTrustPolicy(confidence) === 'blocked')) {
     ComponentToRender = FailureMode;
  }

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center relative perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex items-center justify-center"
        >
          <ComponentToRender />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
