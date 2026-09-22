import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Smartphone, Lock, ShieldAlert, ShieldCheck, Database, RefreshCw, Zap } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function PrivacySection() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle(c => (c + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="privacy" 
      className="relative w-full min-h-screen bg-ink text-white flex flex-col justify-between py-28 px-6 md:px-12 overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-mint">/04</span>
          <span>LOCAL REASONING</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          ZERO-CLOUD DATA PERIMETER
        </div>
      </div>

      {/* Main Editorial Statement */}
      <div className="max-w-7xl mx-auto w-full mb-16">
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.92] mb-6">
          LOCAL
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint via-cobalt to-softblue">
            BY DESIGN.
          </span>
        </h2>
        <p className="text-base sm:text-xl text-white/80 font-normal max-w-xl font-sans leading-relaxed">
          Context can be interpreted on the device before it becomes an action.
        </p>
      </div>

      {/* Comparison Grid: Cloud-First AI vs ContextPilot */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-20 mb-20">
        {/* Left: Cloud */}
        <div className="p-8 rounded-3xl border border-coral/30 bg-coral/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-coral font-mono text-xs font-bold tracking-wider">
                <Cloud className="w-4 h-4" />
                <span>CLOUD-FIRST AI STACK</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-coral/20 text-coral font-semibold">
                PUBLIC ROUTING
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-3 font-mono text-xs text-white/60">
              <div className="w-full p-3 border border-white/10 rounded-xl bg-ink-900 text-center">WORK CONTEXT</div>
              <div className="text-coral">↓</div>
              <div className="w-full p-3 border border-coral/40 rounded-xl bg-coral/10 text-center text-coral flex items-center justify-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4" /> INTERNET ROUTING (EXTERNAL)
              </div>
              <div className="text-coral">↓</div>
              <div className="w-full p-3 border border-white/10 rounded-xl bg-ink-900 text-center">REMOTE MULTI-TENANT MODEL</div>
              <div className="text-coral">↓</div>
              <div className="w-full p-3 border border-white/10 rounded-xl bg-ink-900 text-center">RESPONSE PAYLOAD</div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-coral/20 text-center text-xs font-mono text-coral font-semibold">
            WARNING: PROPRIETARY DATA LEAVES PERIMETER
          </div>
        </div>

        {/* Right: ContextPilot */}
        <div className="p-8 rounded-3xl border border-mint/40 bg-mint/5 flex flex-col justify-between shadow-[0_0_40px_rgba(55,214,161,0.08)]">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-mint font-mono text-xs font-bold tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>CONTEXTPILOT ON-DEVICE</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mint/20 text-mint font-semibold">
                ZERO INTERNET TRANSIT
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-3 font-mono text-xs text-white/80">
              <div className="w-full p-3 border border-white/10 rounded-xl bg-ink-900 text-center font-medium">WORK CONTEXT (PC)</div>
              <div className="text-mint">↓</div>
              <div className="w-full p-3 border border-mint/40 rounded-xl bg-mint/15 text-center text-mint flex items-center justify-center gap-2 font-bold shadow-[0_0_15px_rgba(55,214,161,0.15)]">
                <Lock className="w-4 h-4 text-mint" /> LOCAL NPU INFERENCE (PHONE)
              </div>
              <div className="text-mint">↓</div>
              <div className="w-full p-3 border border-mint/30 rounded-xl bg-ink-900 text-center font-medium">STRUCTURED ACTION (ENCRYPTED)</div>
              <div className="text-mint">↓</div>
              <div className="w-full p-3 border border-white/10 rounded-xl bg-ink-900 text-center font-medium">VERIFIED LOCAL UI EXECUTION</div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-mint/20 text-center text-xs font-mono text-mint font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> GUARANTEED AIR-GAPPED PRIVACY
          </div>
        </div>
      </div>

      {/* Ephemeral Context Lifecycle Animation */}
      <div className="w-full max-w-4xl mx-auto z-20 mb-16">
        <h4 className="text-center text-white/40 text-xs font-mono tracking-widest uppercase mb-10">
          EPHEMERAL CONTEXT LIFECYCLE
        </h4>
        
        <div className="flex items-center justify-between px-4 relative">
          
          {/* Node 1: Raw Context */}
          <div className="flex flex-col items-center gap-3 z-10">
            <motion.div 
              animate={{ 
                opacity: cycle === 0 ? 1 : cycle === 1 ? 0.5 : cycle === 2 ? 0.2 : 0.05,
                scale: cycle === 0 ? 1.08 : 1
              }}
              className="w-16 h-16 rounded-2xl bg-cobalt/20 border border-cobalt flex items-center justify-center text-cobalt-light"
            >
              <Database className="w-6 h-6" />
            </motion.div>
            <span className="text-[11px] font-mono text-white/60 font-medium text-center">RAW CONTEXT</span>
          </div>

          {/* Node 2: Processing */}
          <div className="flex flex-col items-center gap-3 z-10">
            <motion.div 
              animate={{ 
                opacity: cycle === 1 ? 1 : 0.3,
                rotate: cycle === 1 ? 180 : 0,
                borderColor: cycle === 1 ? '#7A5CFF' : 'rgba(255,255,255,0.1)',
                color: cycle === 1 ? '#7A5CFF' : 'rgba(255,255,255,0.4)'
              }}
              className="w-16 h-16 rounded-2xl bg-ink-900 border border-white/10 flex items-center justify-center"
            >
              <RefreshCw className="w-6 h-6" />
            </motion.div>
            <span className="text-[11px] font-mono text-white/60 font-medium text-center">LOCAL INFERENCE</span>
          </div>

          {/* Node 3: Capsule */}
          <div className="flex flex-col items-center gap-3 z-10">
            <motion.div 
              animate={{ 
                opacity: cycle >= 2 ? 1 : 0.3,
                scale: cycle === 2 ? 1.08 : 1,
                borderColor: cycle >= 2 ? '#3867FF' : 'rgba(255,255,255,0.1)',
                color: cycle >= 2 ? '#3867FF' : 'rgba(255,255,255,0.4)'
              }}
              className="w-16 h-16 rounded-2xl bg-ink-900 border border-white/10 flex items-center justify-center"
            >
              <Lock className="w-6 h-6" />
            </motion.div>
            <span className="text-[11px] font-mono text-white/60 font-medium text-center">CONTEXT CAPSULE</span>
          </div>

          {/* Node 4: Action */}
          <div className="flex flex-col items-center gap-3 z-10">
            <motion.div 
              animate={{ 
                opacity: cycle === 3 ? 1 : 0.3,
                scale: cycle === 3 ? 1.08 : 1,
                borderColor: cycle === 3 ? '#37D6A1' : 'rgba(255,255,255,0.1)',
                color: cycle === 3 ? '#37D6A1' : 'rgba(255,255,255,0.4)'
              }}
              className="w-16 h-16 rounded-2xl bg-ink-900 border border-white/10 flex items-center justify-center"
            >
              <Zap className="w-6 h-6" />
            </motion.div>
            <span className="text-[11px] font-mono text-white/60 font-medium text-center">ACTION EXECUTED</span>
          </div>

          {/* Connection Line */}
          <div className="absolute top-8 left-16 right-16 h-0.5 bg-white/10 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-cobalt via-violet to-mint"
              initial={{ width: '0%' }}
              animate={{ width: cycle === 0 ? '0%' : cycle === 1 ? '33%' : cycle === 2 ? '66%' : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="mt-8 text-center font-mono text-xs">
          <motion.span 
            animate={{ opacity: cycle === 3 ? 1 : 0 }}
            className="text-mint font-bold tracking-widest"
          >
            ✓ RAW DATA INSTANTLY PURGED FROM HARDWARE MEMORY
          </motion.span>
        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“KEEP INTELLIGENCE CLOSE TO THE DATA.”</span>
        <span>ZERO LOG RETENTION • PHYSICAL ENCLAVE ISOLATION</span>
      </div>
    </section>
  );
}

export default PrivacySection;
