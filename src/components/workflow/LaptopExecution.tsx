import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { Layout } from 'lucide-react';

const TYPING_SPEED = 20;

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, TYPING_SPEED);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, onComplete]);

  return <span>{displayed}</span>;
};

export default function LaptopExecution() {
  const [step, setStep] = useState(0);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <div className="flex items-center gap-3 mb-6">
        <Layout className="w-6 h-6 text-gray-400" />
        <h2 className="text-lg font-light text-white tracking-widest uppercase">Target Application</h2>
      </div>

      <GlassPanel className="w-full overflow-hidden bg-[#0d1117] border-[#30363d] p-0" animate={false}>
        {/* Window Chrome */}
        <div className="h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="ml-4 text-[10px] font-sans text-gray-400">Issue Tracker — Create New</div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5 font-sans">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Title</label>
            <div className="h-10 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-200">
              <TypewriterText text="AUTH-502: Production Authentication Failure After Deployment 8.2" delay={500} onComplete={() => setStep(1)} />
              {step === 0 && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} className="w-1.5 h-4 bg-cyan-400 ml-1" />}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Priority</label>
              <div className="h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm">
                {step >= 1 && (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-red-400">P1 - Critical</span>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Component</label>
              <div className="h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-300">
                {step >= 1 && <TypewriterText text="Authentication" delay={0} onComplete={() => setStep(2)} />}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Environment</label>
              <div className="h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-300">
                {step >= 2 && <TypewriterText text="Production" delay={0} onComplete={() => setStep(3)} />}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
            <div className="h-24 bg-[#0d1117] border border-[#30363d] rounded p-3 text-sm text-gray-400 leading-relaxed">
              {step >= 3 && <TypewriterText text="Users reporting generic login failure after 8.2 push. Error logs show AUTH-502. Needs immediate rollback or hotfix." delay={0} onComplete={() => setStep(4)} />}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <motion.div 
              className={`px-6 py-2 rounded text-sm font-bold transition-colors ${step >= 4 ? 'bg-[#238636] text-white cursor-pointer' : 'bg-[#21262d] text-gray-500'}`}
              animate={step >= 4 ? { scale: [1, 1.05, 1], boxShadow: ['0 0 0px rgba(35,134,54,0)', '0 0 15px rgba(35,134,54,0.5)', '0 0 0px rgba(35,134,54,0)'] } : {}}
              transition={{ duration: 1 }}
            >
              Create Issue
            </motion.div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
