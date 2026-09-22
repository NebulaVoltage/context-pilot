import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import TrustEngineViz from '@/components/workflow/TrustEngineViz';
import ConfidenceSlider from '@/components/workflow/ConfidenceSlider';
import BrandButton from '@/components/ui/BrandButton';
import { ShieldCheck, ShieldAlert, AlertTriangle, Ban, Lock, Cpu, Check, X } from 'lucide-react';

export const TrustPage: React.FC = () => {
  const navigate = useNavigate();
  const { confidence, setConfidence, getTrustPolicy, reset, advanceState } = useSimulation();
  const policy = getTrustPolicy(confidence);

  const isWarningState = policy === 'confirm' || policy === 'blocked';

  return (
    <div className="w-full min-h-screen bg-[#07080C] text-white pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-mint uppercase mb-3 font-bold">
            <span>/06 DETERMINISTIC GOVERNANCE</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60">TRUST & SAFETY MATRIX</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-4">
            AUTONOMY
            <br />
            NEEDS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint via-cobalt to-violet">
              A BRAKE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-sans max-w-xl leading-relaxed">
            Confidence before autonomy. The on-device Trust Engine evaluates intent, schema validity, and risk before any action touches host computer applications.
          </p>
        </div>

        {/* Main Operational Stage: Scanner + Interactive Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Column: Governance Slider & Policy Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <ConfidenceSlider />

            {/* Quick Test Scenario Trigger */}
            <div className="p-6 rounded-2xl bg-[#0C0E14] border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                SIMULATE AMBIGUITY
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-sans text-white/70">
                  Test failure mode threshold (63% User Confirmation Required)
                </span>
                <button
                  onClick={() => setConfidence(63.0)}
                  className="px-4 py-2 rounded-xl bg-amber-warm/15 hover:bg-amber-warm/25 border border-amber-warm/40 text-amber-warm font-mono text-xs font-bold transition-all flex-shrink-0"
                >
                  TEST 63%
                </button>
              </div>
            </div>

            {/* Interactive Failure Example Drawer (when confidence is low) */}
            <AnimatePresence>
              {isWarningState && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`p-6 rounded-2xl border ${
                    policy === 'blocked' ? 'bg-coral/10 border-coral/40' : 'bg-amber-warm/10 border-amber-warm/40'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {policy === 'blocked' ? (
                      <Ban className="w-5 h-5 text-coral" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-warm" />
                    )}
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase">
                      {policy === 'blocked' ? 'ACTION BLOCKED' : 'USER CONFIRMATION REQUIRED'}
                    </h4>
                  </div>

                  <p className="text-xs font-sans text-white/80 leading-relaxed mb-4">
                    {policy === 'blocked'
                      ? 'Model confidence is below the safety floor (55%). Automated action has been completely suppressed by the Trust Engine.'
                      : 'Semantic ambiguity detected in target parameters. Human confirmation is mandatory before dispatching commands to Jira.'}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={reset}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>REJECT ACTION</span>
                    </button>

                    {policy !== 'blocked' && (
                      <button
                        onClick={advanceState}
                        className="px-4 py-2 rounded-xl bg-amber-warm hover:bg-amber-warm/90 text-[#07080C] font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>CONFIRM DISPATCH</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Full-Screen Circular Governance Scanner */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[480px]">
            {/* Ambient Reactive Glow */}
            <div 
              className={`absolute w-88 h-88 rounded-full blur-[100px] pointer-events-none transition-colors duration-500 ${
                policy === 'auto'
                  ? 'bg-mint/15'
                  : policy === 'assisted'
                  ? 'bg-cobalt/15'
                  : policy === 'confirm'
                  ? 'bg-amber-warm/15'
                  : 'bg-coral/15'
              }`} 
            />

            <div className="relative z-10">
              <TrustEngineViz />
            </div>

            <div className="mt-6 flex items-center gap-6 font-mono text-xs text-white/40">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-mint" />
                <span>AIR-GAPPED GOVERNANCE</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-violet" />
                <span>NPU AUDIT TRAIL</span>
              </div>
            </div>
          </div>

        </div>

        {/* Next Route Banner: RUN LIVE DEMO → */}
        <div className="p-10 rounded-3xl bg-[#0C0E14] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-mint font-bold uppercase tracking-wider">NEXT DESTINATION</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              OBSERVE THE WHOLE SYSTEM
            </h3>
            <p className="text-white/60 text-sm font-sans mt-1">
              Watch the full 12-state simulation think and execute in 1.8 seconds.
            </p>
          </div>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/demo')}
            className="flex-shrink-0"
          >
            RUN LIVE DEMO
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default TrustPage;
