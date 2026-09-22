import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '@/store/simulation';

interface StatusIndicatorProps {
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ className = '' }) => {
  const { state } = useSimulation();

  const statusConfig = useMemo(() => {
    switch (state) {
      case 'idle':
      case 'complete':
        return {
          text: 'SYSTEM ONLINE • LOCAL INFERENCE READY',
          color: 'bg-green-500',
          pulse: 'animate-pulse'
        };
      case 'inference':
      case 'extraction':
        return {
          text: 'NPU ACTIVE • PROCESSING',
          color: 'bg-cyan-500',
          pulse: 'animate-ping'
        };
      case 'transferToPhone':
      case 'transferToPC':
        return {
          text: 'OFFICE KIT • TRANSFERRING',
          color: 'bg-cyan-400',
          pulse: 'animate-pulse'
        };
      case 'verification':
        return {
          text: 'VERIFYING ACTION',
          color: 'bg-purple-500',
          pulse: 'animate-ping'
        };
      case 'capture':
        return {
          text: 'CONTEXT CAPTURE • ACTIVE',
          color: 'bg-amber-500',
          pulse: 'animate-pulse'
        };
      case 'capsule':
      case 'trust':
      case 'planning':
        return {
          text: 'AI REASONING • LOCAL',
          color: 'bg-cyan-500',
          pulse: 'animate-pulse'
        };
      case 'execution':
        return {
          text: 'EXECUTING ACTION',
          color: 'bg-green-400',
          pulse: 'animate-ping'
        };
      default:
        return {
          text: 'SYSTEM ONLINE • LOCAL INFERENCE READY',
          color: 'bg-green-500',
          pulse: 'animate-pulse'
        };
    }
  }, [state]);

  return (
    <div className={`fixed top-6 right-6 flex items-center gap-3 bg-graphite-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-50 ${className}`}>
      <div className="relative flex h-2 w-2">
        <motion.span 
          className={`${statusConfig.pulse} absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.color}`}
          layoutId="status-pulse"
        />
        <motion.span 
          className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.color}`}
          layoutId="status-dot"
        />
      </div>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={statusConfig.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] uppercase tracking-[0.2em] font-mono text-graphite-300 whitespace-nowrap block"
          >
            {statusConfig.text}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusIndicator;
