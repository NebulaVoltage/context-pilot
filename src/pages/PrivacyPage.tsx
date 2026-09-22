import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BrandButton from '@/components/ui/BrandButton';
import { Cloud, Smartphone, Lock, ShieldAlert, ShieldCheck, Database, RefreshCw, Zap, Check } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((c) => (c + 1) % 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#07080C] pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-[#DED8CB] pb-8 mb-12">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase mb-3 font-bold">
            <span>/07 DATA GOVERNANCE</span>
            <span className="text-[#07080C]/20">•</span>
            <span className="text-[#07080C]/60">LOCAL-FIRST INFERENCE</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#07080C] leading-[0.92] mb-4">
            KEEP INTELLIGENCE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              CLOSE TO THE DATA.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#07080C]/70 font-sans max-w-xl leading-relaxed">
            Designed for local-first inference. Enterprise context never traverses public APIs or multi-tenant clouds. The reasoning loop closes entirely inside your smartphone neural silicon.
          </p>
        </div>

        {/* Side-by-Side Comparison: Cloud-First AI vs ContextPilot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Cloud-First Architecture (External Routing) */}
          <div className="p-8 sm:p-10 rounded-3xl border border-coral/30 bg-white shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-coral/20">
                <div className="flex items-center gap-2.5 text-coral font-display text-sm font-bold tracking-wider uppercase">
                  <Cloud className="w-5 h-5" />
                  <span>CLOUD-FIRST AI STACK</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-coral/15 text-coral font-bold">
                  PUBLIC NETWORK TRANSIT
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 font-mono text-xs text-[#07080C]/70">
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  WORK CONTEXT (PC)
                </div>
                <div className="text-coral font-bold">↓</div>
                <div className="w-full p-4 border border-coral/30 rounded-2xl bg-coral/10 text-center text-coral flex items-center justify-center gap-2 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  INTERNET ROUTING &bull; MULTI-TENANT CLOUD
                </div>
                <div className="text-coral font-bold">↓</div>
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  REMOTE MODEL EXECUTION
                </div>
                <div className="text-coral font-bold">↓</div>
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  RESPONSE INGESTION
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-coral/20 text-center text-xs font-mono text-coral font-bold">
              WARNING: PROPRIETARY WORKSPACE DATA CROSSES THE PERIMETER
            </div>
          </div>

          {/* ContextPilot Architecture (Local First) */}
          <div className="p-8 sm:p-10 rounded-3xl border border-emerald-300 bg-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-emerald-200">
                <div className="flex items-center gap-2.5 text-emerald-800 font-display text-sm font-bold tracking-wider uppercase">
                  <Smartphone className="w-5 h-5" />
                  <span>CONTEXTPILOT ON-DEVICE</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                  LOCAL-FIRST INFERENCE
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 font-mono text-xs text-[#07080C]">
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  WORK CONTEXT (HOST PC)
                </div>
                <div className="text-emerald-700 font-bold">↓</div>
                <div className="w-full p-4 border border-emerald-300 rounded-2xl bg-emerald-50 text-center text-emerald-800 font-bold flex items-center justify-center gap-2 shadow-sm">
                  <Lock className="w-4 h-4" />
                  OFFICE KIT BUS &bull; LOCAL NPU SILICON
                </div>
                <div className="text-emerald-700 font-bold">↓</div>
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  ENCRYPTED CONTEXT CAPSULE
                </div>
                <div className="text-emerald-700 font-bold">↓</div>
                <div className="w-full p-4 border border-[#DED8CB] rounded-2xl bg-[#FAF8F3] text-center font-medium">
                  VERIFIED LOCAL TARGET EXECUTION
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-200 text-center text-xs font-mono text-emerald-800 font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              DESIGNED FOR PHYSICAL ENCLAVE ISOLATION
            </div>
          </div>

        </div>

        {/* Ephemeral Context Lifecycle Animation Canvas */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-lg mb-20">
          <div className="text-center font-display text-xs tracking-widest uppercase font-bold text-[#07080C]/50 mb-8">
            EPHEMERAL CONTEXT LIFECYCLE (AUTOMATIC RAM PURGE)
          </div>

          <div className="flex items-center justify-between px-4 relative max-w-4xl mx-auto">
            {/* Stage 1 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <motion.div
                animate={{
                  scale: cycle === 0 ? 1.1 : 1,
                  borderColor: cycle === 0 ? '#4267FF' : '#DED8CB',
                }}
                className="w-16 h-16 rounded-2xl bg-white border border-[#DED8CB] flex items-center justify-center text-cobalt shadow-md"
              >
                <Database className="w-6 h-6" />
              </motion.div>
              <span className="text-xs font-mono font-bold text-[#07080C]">RAW STREAM</span>
            </div>

            {/* Stage 2 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <motion.div
                animate={{
                  scale: cycle === 1 ? 1.1 : 1,
                  borderColor: cycle === 1 ? '#8A63FF' : '#DED8CB',
                }}
                className="w-16 h-16 rounded-2xl bg-white border border-[#DED8CB] flex items-center justify-center text-violet shadow-md"
              >
                <RefreshCw className={`w-6 h-6 ${cycle === 1 ? 'animate-spin' : ''}`} />
              </motion.div>
              <span className="text-xs font-mono font-bold text-[#07080C]">NPU INFERENCE</span>
            </div>

            {/* Stage 3 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <motion.div
                animate={{
                  scale: cycle === 2 ? 1.1 : 1,
                  borderColor: cycle === 2 ? '#4267FF' : '#DED8CB',
                }}
                className="w-16 h-16 rounded-2xl bg-white border border-[#DED8CB] flex items-center justify-center text-cobalt shadow-md"
              >
                <Lock className="w-6 h-6" />
              </motion.div>
              <span className="text-xs font-mono font-bold text-[#07080C]">CONTEXT CAPSULE</span>
            </div>

            {/* Stage 4 */}
            <div className="flex flex-col items-center gap-3 z-10">
              <motion.div
                animate={{
                  scale: cycle === 3 ? 1.1 : 1,
                  borderColor: cycle === 3 ? '#43D3A1' : '#DED8CB',
                }}
                className="w-16 h-16 rounded-2xl bg-white border border-[#DED8CB] flex items-center justify-center text-mint shadow-md"
              >
                <Zap className="w-6 h-6" />
              </motion.div>
              <span className="text-xs font-mono font-bold text-[#07080C]">ACTION EXECUTED</span>
            </div>

            {/* Progress line */}
            <div className="absolute top-8 left-16 right-16 h-1 bg-[#DED8CB] z-0 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cobalt via-violet to-mint"
                animate={{
                  width: cycle === 0 ? '0%' : cycle === 1 ? '33%' : cycle === 2 ? '66%' : '100%',
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="mt-8 text-center font-mono text-xs">
            <span className="text-mint font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              RAW CONTEXT MEMORY PURGED IMMEDIATELY AFTER CAPTURE
            </span>
          </div>
        </div>

        {/* Next Route Banner: EXPLORE SYSTEM → */}
        <div className="p-10 rounded-3xl bg-[#07080C] text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-cobalt font-bold uppercase tracking-wider">NEXT DESTINATION</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              INSPECT THE ARCHITECTURE
            </h3>
            <p className="text-white/60 text-sm font-sans mt-1">
              Explore the 7 security subsystems powering the local coprocessor.
            </p>
          </div>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/system')}
            className="flex-shrink-0"
          >
            EXPLORE SYSTEM
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPage;
