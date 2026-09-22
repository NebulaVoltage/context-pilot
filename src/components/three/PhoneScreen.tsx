import React, { useState, useEffect } from 'react';
import { useSimulation } from '@/store/simulation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Database, CheckCircle2, Lock, ArrowRight, Check, AlertCircle } from 'lucide-react';

type ScreenTab = 'CONTEXT' | 'UNDERSTAND' | 'TRUST' | 'ACTION';

export default function PhoneScreen() {
  const { state, confidence, selectedDestination, advanceState, reset, failureMode } = useSimulation();
  const [activeTab, setActiveTab] = useState<ScreenTab>('CONTEXT');

  // Auto-sync active tab with simulation state
  useEffect(() => {
    if (['idle', 'capture', 'transferToPhone'].includes(state)) {
      setActiveTab('CONTEXT');
    } else if (['inference', 'extraction', 'capsule'].includes(state)) {
      setActiveTab('UNDERSTAND');
    } else if (state === 'trust') {
      setActiveTab('TRUST');
    } else if (['planning', 'transferToPC', 'execution', 'verification', 'complete'].includes(state)) {
      setActiveTab('ACTION');
    }
  }, [state]);

  const destinationName = selectedDestination ? selectedDestination.toUpperCase() : 'JIRA';
  const isLowConfidence = confidence < 70 || failureMode;

  return (
    <div className="w-full h-full bg-[#08090D] rounded-[42px] overflow-hidden flex flex-col font-sans text-white border border-white/15 relative select-none shadow-2xl">
      
      {/* Dynamic Status Bar */}
      <div className="flex justify-between items-center px-7 pt-3.5 pb-1 text-[11px] text-white/50 font-mono z-20">
        <span className="font-semibold text-white/90">09:41</span>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-[10px]">5G</span>
          <div className="w-4 h-2 border border-white/40 rounded-xs relative p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="px-6 py-2.5 z-20 border-b border-white/10 bg-[#0C0E14]/90 backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase font-medium">
            LOCAL INTELLIGENCE READY
          </div>
          <h1 className="text-xs tracking-wider font-bold text-white">CONTEXT PILOT</h1>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] font-mono text-emerald-400 uppercase font-semibold">ON DEVICE</span>
        </div>
      </div>

      {/* Main Screen Content Viewport */}
      <div className="flex-1 p-5 relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#08090D] to-[#0E1017]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CONTEXT */}
          {activeTab === 'CONTEXT' && (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              {state === 'idle' ? (
                /* HOME STATE */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4 pt-2">
                    <div className="text-[10px] font-mono text-cobalt tracking-widest uppercase font-bold">
                      CONTEXT PILOT
                    </div>
                    
                    <h2 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                      READY WHEN
                      <br />
                      CONTEXT ARRIVES.
                    </h2>

                    <p className="text-xs text-white/60 font-sans leading-relaxed">
                      Private reasoning for the work already in front of you.
                    </p>

                    <div className="pt-2 grid grid-cols-3 gap-2 text-[9px] font-mono">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="text-white/40 block mb-1">DEVICE</span>
                        <span className="text-white font-bold">READY</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="text-white/40 block mb-1">INFERENCE</span>
                        <span className="text-cobalt font-bold">LOCAL</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                        <span className="text-white/40 block mb-1">OFFICE KIT</span>
                        <span className="text-emerald-400 font-bold">CONNECTED</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => advanceState()}
                    className="w-full py-3 rounded-xl bg-cobalt hover:bg-cobalt-light text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>CAPTURE CONTEXT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* CONTEXT RECEIVED */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cobalt font-bold">CONTEXT RECEIVED</span>
                      <span className="text-white/40">SUPPORT / EMAIL</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#121520] border border-white/10 space-y-2">
                      <p className="text-xs text-white/90 font-sans leading-relaxed">
                        &ldquo;Production users are receiving AUTH-502 after deployment 8.2. Login succeeds intermittently.&rdquo;
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[9px] font-mono">
                      <span className="text-white/50">SOURCE CAPTURED</span>
                      <span className="text-emerald-400 font-bold">LOCAL PROCESSING READY</span>
                    </div>
                  </div>

                  <button
                    onClick={() => advanceState()}
                    className="w-full py-3 rounded-xl bg-cobalt hover:bg-cobalt-light text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>UNDERSTAND CONTEXT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: UNDERSTAND */}
          {activeTab === 'UNDERSTAND' && (
            <motion.div 
              key="understand"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-violet">
                  <span className="font-bold">UNDERSTANDING</span>
                  <span className="text-white/40">5 SIGNALS IDENTIFIED</span>
                </div>

                <h2 className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                  TURNING CONTEXT
                  <br />
                  INTO STRUCTURE.
                </h2>

                {/* Animated Extracted Concepts */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['AUTH-502', 'PRODUCTION', 'VERSION 8.2', 'LOGIN FAILURE', 'BUG'].map((chip, i) => (
                    <motion.div
                      key={chip}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="px-2.5 py-1 rounded-lg bg-violet/15 border border-violet/30 text-[9px] font-mono text-violet-light font-bold"
                    >
                      {chip}
                    </motion.div>
                  ))}
                </div>

                {/* Structured Capsule Object */}
                <div className="p-3.5 rounded-2xl bg-[#121520] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="text-white/40 uppercase">CONTEXT CAPSULE</span>
                    <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px]">
                      DEVICE-LOCAL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                    <div>
                      <span className="text-white/40 block">INTENT</span>
                      <span className="text-white font-bold">BUG (P1)</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">COMPONENT</span>
                      <span className="text-white font-bold">AUTHENTICATION</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">ENVIRONMENT</span>
                      <span className="text-white font-bold">PRODUCTION 8.2</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">ERROR</span>
                      <span className="text-rose-400 font-bold">AUTH-502</span>
                    </div>
                  </div>
                </div>

                {/* Technical Annotation */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[8px] font-mono text-white/50">
                  <span>MODEL: 1.7B QUANTIZED SLM</span>
                  <span>LOCAL AI COMPUTE</span>
                </div>
              </div>

              <button
                onClick={() => advanceState()}
                className="w-full py-3 rounded-xl bg-violet hover:bg-violet-light text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>VERIFY TRUST</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* TAB 3: TRUST */}
          {activeTab === 'TRUST' && (
            <motion.div 
              key="trust"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              {!isLowConfidence ? (
                /* HIGH CONFIDENCE STATE */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-mint">
                      <span className="font-bold">TRUST CHECK</span>
                      <span>CONFIDENCE {confidence}%</span>
                    </div>

                    <h2 className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                      CONFIDENCE
                      <br />
                      BEFORE AUTONOMY.
                    </h2>

                    <div className="p-3.5 rounded-2xl bg-[#121520] border border-mint/20 space-y-2 font-mono text-[9px]">
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/60">PRIVACY</span>
                        <span className="text-mint font-bold flex items-center gap-1"><Check className="w-3 h-3" /> PASS</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/60">SCHEMA</span>
                        <span className="text-mint font-bold flex items-center gap-1"><Check className="w-3 h-3" /> PASS</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/60">CONFIDENCE</span>
                        <span className="text-mint font-bold">{confidence}% (&gt; 90%)</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/60">RISK</span>
                        <span className="text-mint font-bold">LOW</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-white/60">POLICY</span>
                        <span className="text-mint font-bold">AUTO EXECUTE</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-mint/10 border border-mint/30 text-center font-mono text-[9px] text-mint font-bold">
                      ACTION AUTHORIZED
                    </div>
                  </div>

                  <button
                    onClick={() => advanceState()}
                    className="w-full py-3 rounded-xl bg-mint text-black font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>PREPARE ACTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* LOW CONFIDENCE / HUMAN CONFIRMATION STATE */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                      <span className="font-bold">TRUST CHECK</span>
                      <span>{confidence}%</span>
                    </div>

                    <h2 className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                      HUMAN CONFIRMATION
                      <br />
                      REQUIRED.
                    </h2>

                    <p className="text-xs text-white/60 font-sans leading-relaxed">
                      Context is understood, but the system is not confident enough to act autonomously.
                    </p>

                    <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1 text-[9px] font-mono text-amber-300">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>POLICY THRESHOLD: CONFIRM</span>
                      </div>
                      <p className="text-[8px] text-amber-200/60 font-sans">
                        Requires human verification prior to executing external workspace mutation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => advanceState()}
                      className="flex-1 py-3 rounded-xl bg-amber-500 text-black font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1 shadow-lg transition-all"
                    >
                      CONFIRM
                    </button>
                    <button
                      onClick={() => reset()}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-display text-xs font-bold tracking-wider uppercase transition-all"
                    >
                      REVIEW
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: ACTION */}
          {activeTab === 'ACTION' && (
            <motion.div 
              key="action"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              {state === 'complete' || state === 'verification' ? (
                /* COMPLETION STATE */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4 pt-1">
                    <div className="text-[10px] font-mono text-mint font-bold tracking-widest uppercase">
                      ACTION VERIFIED
                    </div>

                    <h2 className="font-display text-3xl font-black tracking-tight text-white">
                      DONE.
                    </h2>

                    <p className="text-xs text-white/70 font-sans leading-relaxed">
                      The requested action was completed and the destination state was verified.
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#121520] border border-white/10 space-y-2 font-mono text-[9px]">
                      <div className="flex items-center gap-2 text-white">
                        <Check className="w-3.5 h-3.5 text-mint" />
                        <span>ISSUE CREATED IN {destinationName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Check className="w-3.5 h-3.5 text-mint" />
                        <span>FIELDS VERIFIED</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Check className="w-3.5 h-3.5 text-mint" />
                        <span>CONTEXT PRESERVED</span>
                      </div>
                    </div>

                    <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest text-center">
                      VERIFICATION COMPLETE
                    </div>
                  </div>

                  <button
                    onClick={() => reset()}
                    className="w-full py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-display text-xs font-bold tracking-wider uppercase transition-all"
                  >
                    RUN AGAIN
                  </button>
                </div>
              ) : (
                /* ACTION READY / EXECUTE STATE */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cobalt font-bold">
                      <span>ACTION READY</span>
                      <span>DESTINATION: {destinationName}</span>
                    </div>

                    <h2 className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                      READY TO CARRY
                      <br />
                      CONTEXT FORWARD.
                    </h2>

                    <div className="p-3.5 rounded-2xl bg-[#121520] border border-white/10 space-y-1.5 font-mono text-[9px]">
                      <div className="text-white/40 uppercase text-[8px] mb-1">ACTION PAYLOAD</div>
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                        <span>CREATE ISSUE</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                        <span>SET PRIORITY: P1</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                        <span>ADD COMPONENT: AUTHENTICATION</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                        <span>ATTACH ENVIRONMENT: PRODUCTION</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => advanceState()}
                    className="w-full py-3 rounded-xl bg-cobalt hover:bg-cobalt-light text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>EXECUTE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Navigation: CONTEXT / UNDERSTAND / TRUST / ACTION */}
      <div className="grid grid-cols-4 bg-[#0A0B10] border-t border-white/10 p-1.5 gap-1 z-20 text-[9px] font-mono">
        {(['CONTEXT', 'UNDERSTAND', 'TRUST', 'ACTION'] as ScreenTab[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 rounded-xl font-bold transition-all text-center tracking-wider ${
                isActive
                  ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Home Indicator Bar */}
      <div className="py-2 flex justify-center bg-[#08090D] z-20">
        <div className="w-20 h-1 bg-white/25 rounded-full" />
      </div>
    </div>
  );
}
