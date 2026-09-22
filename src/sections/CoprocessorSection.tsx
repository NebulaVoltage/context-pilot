import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Shield, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

const PHONE_STATES = [
  { id: 'ready', label: 'READY', desc: 'Secure NPU idle in hardware enclave', color: 'text-white/60' },
  { id: 'received', label: 'CONTEXT RECEIVED', desc: 'Raw workspace telemetry synced via Office Kit', color: 'text-cobalt' },
  { id: 'inference', label: 'LOCAL INFERENCE', desc: '1.7B INT8 quantized SLM processing tokens', color: 'text-violet' },
  { id: 'understanding', label: 'UNDERSTANDING', desc: 'Semantic relation graph synthesis', color: 'text-violet-light' },
  { id: 'capsule', label: 'CONTEXT CAPSULE', desc: 'Deterministic action package generated', color: 'text-mint' },
];

export const CoprocessorSection: React.FC = () => {
  const { runFullDemo, state } = useSimulation();
  const [activeStep, setActiveStep] = useState(2);

  return (
    <section 
      id="coprocessor" 
      className="relative min-h-screen bg-ink text-white flex flex-col justify-between px-6 md:px-12 py-32 overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-violet">/03</span>
          <span>HARDWARE DECOUPLING</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          ON-DEVICE NPU REASONING
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Massive Headline & Narrative */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.92] mb-8"
            >
              THE
              <br />
              INTELLIGENCE
              <br />
              IS ALREADY
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-cobalt to-softblue">
                IN YOUR POCKET.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-lg mb-10 font-sans"
            >
              The phone doesn't replace the computer.
              <br />
              It gives the computer another layer of intelligence.
            </motion.p>

            {/* Editorial Annotations (No Boxed Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono">
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">MODEL</div>
                <div className="text-sm font-bold text-white">1.7B QUANTIZED</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">INFERENCE</div>
                <div className="text-sm font-bold text-violet">LOCAL ON NPU</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">SECURITY</div>
                <div className="text-sm font-bold text-mint">HARDWARE ENCLAVE</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">THERMAL</div>
                <div className="text-sm font-bold text-white/90">NOMINAL (31°C)</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">CLOUD TRANSIT</div>
                <div className="text-sm font-bold text-mint">0 BYTES</div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">FIRST TOKEN</div>
                <div className="text-sm font-bold text-cobalt-light">14.8ms</div>
              </div>
            </div>
          </div>

          {/* Right Column: Computing Device Stage & State Transformation */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-ink-900 border border-white/10 shadow-2xl overflow-hidden">
              
              {/* Subtle Cosmic Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-violet/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cobalt/15 rounded-full blur-3xl pointer-events-none" />

              {/* Hardware Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet" />
                  <span className="font-bold text-white">iQOO NPU SILICON</span>
                </div>
                <span className="text-[10px] text-mint font-semibold bg-mint/15 px-2 py-0.5 rounded-full">
                  AIR-GAPPED
                </span>
              </div>

              {/* Phone State Stepper (READY -> CONTEXT -> INFERENCE -> UNDERSTANDING -> CAPSULE) */}
              <div className="space-y-3 mb-6">
                {PHONE_STATES.map((s, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setActiveStep(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-white/10 border-violet shadow-[0_0_20px_rgba(138,99,255,0.3)] scale-[1.02]'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold ${isActive ? 'text-white' : 'text-white/30'}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <div className={`font-mono text-xs font-bold ${isActive ? s.color : 'text-white/60'}`}>
                            {s.label}
                          </div>
                          <div className="text-[10px] font-mono text-white/40">
                            {s.desc}
                          </div>
                        </div>
                      </div>

                      {isActive && <CheckCircle2 className="w-4 h-4 text-mint flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Computational Flow Vector Animation */}
              <div className="p-4 rounded-2xl bg-ink-950 border border-white/10 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                  <span className="text-white/60">STATE:</span>
                  <span className="text-violet font-bold">{PHONE_STATES[activeStep].label}</span>
                </div>
                <span className="text-white/40 text-[10px]">TAP STATE TO CYCLE</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“LOCAL BY DESIGN.”</span>
        <span>THE INTELLIGENCE IS ALREADY IN YOUR POCKET.</span>
      </div>
    </section>
  );
};

export default CoprocessorSection;
