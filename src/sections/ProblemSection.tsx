import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Chrome, CheckSquare, RefreshCw, AlertCircle, ArrowRight, Check } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section 
      id="problem"
      className="relative min-h-screen w-full bg-[#F4F1EA] text-[#07080C] py-28 px-6 md:px-12 flex flex-col justify-between overflow-hidden border-t border-[#DED8CB] select-none"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#07080C]/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#07080C]/50 uppercase">
          <span className="font-bold text-cobalt">/02</span>
          <span>THE FRICTION OF WORK</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-[#07080C]/40 hidden sm:block uppercase">
          APPLICATION FRAGMENTATION
        </div>
      </div>

      {/* Main Editorial Statement & Interactive Workspace Stage */}
      <div className="relative max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-6 z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tighter text-[#07080C] leading-[0.92] mb-6"
            >
              THE SWITCH
              <br />
              IS THE
              <br />
              <span className="text-cobalt italic font-serif">FRICTION.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-[#07080C]/80 font-normal leading-relaxed max-w-xl mb-8 font-sans"
            >
              When information moves between applications, people become the integration layer.
            </motion.p>

            {/* Interaction Button to Toggle Chaos vs Continuous Flow */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className={`px-7 py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  collapsed 
                    ? 'bg-mint text-[#07080C] shadow-[0_4px_25px_rgba(67,211,161,0.4)] scale-105' 
                    : 'bg-[#07080C] text-[#F4F1EA] hover:bg-[#151822] active:scale-[0.98]'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${collapsed ? 'rotate-180' : ''} transition-transform duration-500`} />
                <span>{collapsed ? 'SHOW FRAGMENTATION' : 'COLLAPSE INTO ONE CONTEXT'}</span>
              </button>
              <span className="text-xs font-mono text-[#07080C]/60 hidden sm:inline font-semibold">
                {collapsed ? 'Unified continuous flow active' : 'Click to see unified resolution'}
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Application Windows vs ONE CONTEXT */}
          <div className="lg:col-span-6 relative min-h-[460px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                /* 4 High-Fidelity Floating Desktop Application Windows */
                <motion.div
                  key="scattered"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full h-[460px]"
                >
                  {/* Window 1: MAIL (Top Left) */}
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [-2, 0, -2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 w-72 sm:w-80 rounded-2xl bg-[#141722] text-white border border-white/10 shadow-2xl overflow-hidden z-20"
                  >
                    {/* Window Header */}
                    <div className="h-7 bg-[#0C0E14] px-3 flex items-center justify-between border-b border-white/10">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="text-[10px] font-mono text-white/40">Mail — Inbox (1 Unread)</span>
                      <Mail className="w-3 h-3 text-cobalt" />
                    </div>
                    {/* Window Content */}
                    <div className="p-3.5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/60">From: ops-alerts@company.internal</span>
                        <span className="text-coral font-bold">P1 CRITICAL</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        AUTH-502: Production user login failure
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[10px] text-white/70 leading-snug">
                        "Multiple users unable to authenticate against auth-cluster-eu. HTTP 502..."
                      </div>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-coral">
                        <span>↳ User copies error string</span>
                        <span className="underline">CMD+C</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Window 2: SLACK (Top Right) */}
                  <motion.div
                    animate={{ y: [0, 8, 0], rotate: [2, 3, 2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="absolute top-14 right-0 w-68 sm:w-76 rounded-2xl bg-[#141722] text-white border border-white/10 shadow-2xl overflow-hidden z-10"
                  >
                    {/* Window Header */}
                    <div className="h-7 bg-[#0C0E14] px-3 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-amber-warm" />
                        <span className="text-[10px] font-mono text-white/60">#incident-war-room</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-mint" />
                    </div>
                    {/* Window Content */}
                    <div className="p-3 space-y-2 font-sans text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-violet/30 text-violet flex items-center justify-center text-[10px] font-bold">M</div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-white/80">@marcus </span>
                          <span className="text-white/70 text-[11px]">Are login tokens dropping in 8.2?</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-mint/30 text-mint flex items-center justify-center text-[10px] font-bold">S</div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-white/80">@sophia </span>
                          <span className="text-white/70 text-[11px]">Looking at middleware. Need Jira ticket!</span>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-amber-warm pt-1">
                        ↳ Switch #1: Search channel thread
                      </div>
                    </div>
                  </motion.div>

                  {/* Window 3: BROWSER / GRAFANA (Bottom Left) */}
                  <motion.div
                    animate={{ y: [0, -7, 0], rotate: [-1, -3, -1] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="absolute bottom-4 left-4 w-72 sm:w-80 rounded-2xl bg-[#141722] text-white border border-white/10 shadow-2xl overflow-hidden z-30"
                  >
                    {/* Browser Address Bar */}
                    <div className="h-7 bg-[#0C0E14] px-3 flex items-center gap-2 border-b border-white/10 text-[10px] font-mono">
                      <Chrome className="w-3 h-3 text-violet" />
                      <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-white/50 truncate">
                        grafana.internal/d/auth-service
                      </div>
                      <span className="text-coral font-bold">502</span>
                    </div>
                    {/* Metric Graph Snippet */}
                    <div className="p-3.5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/60">ERROR RATE</span>
                        <span className="text-coral font-bold">18.4% ▲ (HIGH)</span>
                      </div>
                      <div className="h-8 w-full bg-black/40 rounded flex items-end px-1 gap-1 pb-1">
                        {[20, 25, 22, 28, 30, 40, 75, 95, 90, 85].map((h, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-sm ${i >= 6 ? 'bg-coral' : 'bg-white/20'}`} 
                            style={{ height: `${h}%` }} 
                          />
                        ))}
                      </div>
                      <div className="text-[10px] font-mono text-coral">
                        ↳ Switch #2: Cross-referencing telemetry
                      </div>
                    </div>
                  </motion.div>

                  {/* Window 4: JIRA (Bottom Right) */}
                  <motion.div
                    animate={{ y: [0, 8, 0], rotate: [2, 1, 2] }}
                    transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    className="absolute bottom-0 right-2 w-64 sm:w-72 rounded-2xl bg-[#141722] text-white border border-white/10 shadow-2xl overflow-hidden z-20"
                  >
                    {/* Window Header */}
                    <div className="h-7 bg-[#0C0E14] px-3 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <CheckSquare className="w-3 h-3 text-mint" />
                        <span className="text-[10px] font-mono text-white/60">Jira — Create Issue</span>
                      </div>
                      <span className="text-[9px] font-mono text-coral font-bold">EMPTY</span>
                    </div>
                    {/* Window Fields */}
                    <div className="p-3 space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-white/40">Issue Type:</span>
                        <span className="text-white">Bug</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-white/40">Summary:</span>
                        <span className="text-coral underline font-bold">[Field Empty]</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Component:</span>
                        <span className="text-coral underline font-bold">[Field Empty]</span>
                      </div>
                      <div className="text-[10px] text-amber-warm pt-1">
                        ↳ Switch #3: 7 manual fields to fill
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* Collapsed ONE CONTEXT Unified Resolution Card */
                <motion.div
                  key="unified"
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-[#0C0E14] text-white border border-mint/40 shadow-2xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-mono text-xs font-bold text-mint tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
                      UNIFIED INTO ONE CONTEXT
                    </span>
                    <span className="text-[10px] font-mono bg-mint/20 text-mint px-3 py-1 rounded-full font-bold">
                      ZERO MANUAL SWITCHES
                    </span>
                  </div>

                  <div className="space-y-3.5 my-auto">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-cobalt font-bold">01</span>
                        <span className="text-white/80">CAPTURE</span>
                      </div>
                      <span className="text-cobalt font-bold">Mail, Slack, Grafana Unified</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-violet/10 border border-violet/30 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-violet font-bold">02</span>
                        <span className="text-violet">UNDERSTAND</span>
                      </div>
                      <span className="text-violet font-bold">1.7B On-Device NPU Reasoning</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-mint/15 border border-mint/40 flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-mint font-bold">03</span>
                        <span className="text-mint">EXECUTE</span>
                      </div>
                      <span className="text-mint font-bold">Jira Ticket Created & Verified</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                    <span>EXECUTION TIME: 1.8s</span>
                    <span className="text-mint font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      FOCUS PRESERVED
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-ink/50">
        <span>“STOP REBUILDING THE SAME THOUGHT.”</span>
        <span>THE COMPUTER STAYS A WORKSPACE. THE PHONE BECOMES THE COPROCESSOR.</span>
      </div>
    </section>
  );
};

export default ProblemSection;
