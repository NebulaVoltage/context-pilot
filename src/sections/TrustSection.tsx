import React from 'react';
import { motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import TrustEngineViz from '@/components/workflow/TrustEngineViz';
import ConfidenceSlider from '@/components/workflow/ConfidenceSlider';
import { ShieldCheck, ShieldAlert, Cpu, Lock, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { confidence, getTrustPolicy } = useSimulation();
  const policy = getTrustPolicy(confidence);

  return (
    <section 
      id="trust" 
      className="relative min-h-screen bg-ink text-white flex flex-col justify-between py-28 px-6 md:px-12 overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-mint">/06</span>
          <span>TRUST ENGINE</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          GOVERNANCE BEFORE EXECUTION
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Governance Policy */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.92] mb-6"
            >
              CONFIDENCE
              <br />
              BEFORE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint via-cobalt to-violet">
                AUTONOMY.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-lg mb-8 font-sans"
            >
              Not every decision deserves automatic execution.
            </motion.p>

            {/* Interactive Confidence Slider Panel */}
            <div className="max-w-md">
              <ConfidenceSlider />
            </div>
          </div>

          {/* Right Column: Circular Governance Scanner Iris */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px]">
            {/* Dynamic Glow reacting to confidence */}
            <div 
              className={`absolute w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-500 ${
                policy === 'auto'
                  ? 'bg-mint/15'
                  : policy === 'assisted'
                  ? 'bg-cobalt/15'
                  : policy === 'confirm'
                  ? 'bg-amber-warm/15'
                  : 'bg-coral/15'
              }`} 
            />

            {/* Circular Scanner Viz */}
            <div className="relative z-10 flex items-center justify-center p-4">
              <TrustEngineViz />
            </div>

            {/* Status Footer Note */}
            <div className="mt-4 flex items-center gap-6 font-mono text-[11px] text-white/40">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-mint" />
                <span>DETERMINISTIC GATE</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-violet" />
                <span>NPU COPROCESSOR LINKED</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“NO GHOST ACTIONS.”</span>
        <span>CONTINUOUS MATHEMATICAL VERIFICATION BEFORE UI DISPATCH</span>
      </div>
    </section>
  );
};

export default TrustSection;
