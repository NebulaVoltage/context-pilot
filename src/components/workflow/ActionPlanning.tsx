import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ACTION_STEPS } from '@/data/mockData';
import GlassPanel from '@/components/ui/GlassPanel';
import { ListTree, CheckCircle } from 'lucide-react';

export default function ActionPlanning() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (visibleSteps < ACTION_STEPS.length) {
      const t = setTimeout(() => setVisibleSteps(v => v + 1), 300);
      return () => clearTimeout(t);
    }
  }, [visibleSteps]);

  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-4">
        <ListTree className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-light text-white tracking-widest">ACTION PLAN</h2>
      </div>

      <div className="relative pl-6 flex flex-col gap-4">
        {/* Timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-800">
          <motion.div 
            className="w-full bg-cyan-500"
            initial={{ height: 0 }}
            animate={{ height: visibleSteps > 0 ? `${(visibleSteps / ACTION_STEPS.length) * 100}%` : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {ACTION_STEPS.map((step, i) => {
          const isVisible = i < visibleSteps;
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative"
            >
              <div className={`absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-black z-10 transition-colors ${isVisible ? 'border-cyan-500' : 'border-gray-700'}`}>
                {isVisible && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </div>
              
              <GlassPanel className="p-4 flex items-center gap-4 border-l-4 border-l-cyan-500">
                <span className="text-sm font-mono text-gray-500">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="text-sm font-mono text-gray-200">{step.action}</span>
                <span className="ml-auto text-xs font-mono text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded">
                  {step.target}
                </span>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: visibleSteps === ACTION_STEPS.length ? 1 : 0, y: visibleSteps === ACTION_STEPS.length ? 0 : 10 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-mono">
          <CheckCircle className="w-4 h-4" />
          PLAN READY FOR EXECUTION
        </div>
      </motion.div>
    </div>
  );
}
