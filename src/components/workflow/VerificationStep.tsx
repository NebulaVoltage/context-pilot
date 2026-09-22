import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { VERIFICATION_CHECKS } from '@/data/mockData';
import GlassPanel from '@/components/ui/GlassPanel';
import { ShieldCheck, Loader2, Check } from 'lucide-react';

export default function VerificationStep() {
  const [activeCheck, setActiveCheck] = useState(-1);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < VERIFICATION_CHECKS.length) {
        setActiveCheck(current);
        current++;
      } else {
        clearInterval(interval);
        setActiveCheck(VERIFICATION_CHECKS.length);
        setTimeout(() => setCompleted(true), 500);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-2">VERIFICATION</h2>
        <div className="text-xs font-mono text-cyan-400 tracking-widest">STATE VALIDATION</div>
      </div>

      <GlassPanel className="w-full p-8 flex flex-col gap-6">
        {VERIFICATION_CHECKS.map((check, i) => {
          const isPending = activeCheck < i;
          const isChecking = activeCheck === i;
          const isDone = activeCheck > i;

          return (
            <div key={check.id} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                isPending ? 'bg-black border-gray-800' :
                isChecking ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400' :
                'bg-green-900/30 border-green-500 text-green-400'
              }`}>
                {isPending && <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />}
                {isChecking && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDone && <Check className="w-4 h-4" />}
              </div>
              
              <div className="flex-1 flex flex-col">
                <span className={`text-sm font-mono transition-colors ${isDone ? 'text-gray-200' : isChecking ? 'text-cyan-400' : 'text-gray-600'}`}>
                  {check.label}
                </span>
                {isDone && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[10px] text-gray-500 font-mono mt-1"
                  >
                    EXPECTED: {check.expected} | ACTUAL: {check.actual}
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </GlassPanel>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: completed ? 1 : 0, scale: completed ? 1 : 0.8 }}
        className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-green-400"
      >
        <ShieldCheck className="w-6 h-6" />
        <span className="font-mono font-bold tracking-wider">ACTION VERIFIED</span>
      </motion.div>
    </div>
  );
}
