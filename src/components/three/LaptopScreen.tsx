import React from 'react';
import { useSimulation } from '@/store/simulation';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, ArrowRight, Inbox, Sparkles, Layers } from 'lucide-react';

export default function LaptopScreen() {
  const { state, selectedDestination } = useSimulation();

  const destinationName = selectedDestination ? selectedDestination.toUpperCase() : 'JIRA';

  return (
    <div className="w-full h-full bg-[#12141A] flex flex-col text-sm text-gray-300 font-sans overflow-hidden border border-white/10 shadow-2xl relative select-none">
      
      {/* Desktop Top Menu Bar */}
      <div className="h-7 bg-[#0C0E14] border-b border-white/10 flex items-center justify-between px-4 text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white tracking-wider">WORKSPACE</span>
          <span>SUPPORT INBOX</span>
          <span>DEV ENVIRONMENT</span>
          <span>ISSUE TRACKER</span>
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <span>HOST WORKSPACE ACTIVE</span>
        </div>
      </div>

      {/* Main Desktop Canvas Area */}
      <div className="flex-1 p-6 relative flex items-center justify-center bg-radial from-[#1A1D27] to-[#0E1017]">
        
        {/* State: Support Inbox Source Context */}
        {['idle', 'capture', 'transferToPhone', 'inference', 'extraction', 'capsule', 'trust', 'planning', 'transferToPC'].includes(state) && (
          <motion.div 
            className="w-[520px] bg-[#161822] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Window Chrome */}
            <div className="h-8 bg-[#0F1118] flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-[10px] font-mono text-white/60 flex items-center gap-1.5">
                <Inbox className="w-3 h-3 text-cobalt" />
                <span>SUPPORT INBOX &bull; INCIDENT TICKET #9942</span>
              </div>
              <div className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
                P1 UNRESOLVED
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 flex flex-col gap-4">
              <div>
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1">
                  CUSTOMER INCIDENT LOG
                </div>
                <h2 className="text-base font-bold text-white">
                  Authentication failures after deployment 8.2
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0E15] border border-white/10 space-y-2 relative">
                <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
                  <span>REPORTED VIA CLOUD WATCH / SENTRY</span>
                  <span>10:42 AM</span>
                </div>

                <div className="text-xs text-white/90 leading-relaxed font-sans relative">
                  <span className={`${state === 'capture' || state === 'transferToPhone' ? 'bg-cobalt/25 text-white ring-1 ring-cobalt px-1 py-0.5 rounded' : ''} transition-all duration-300`}>
                    &ldquo;Production users are receiving AUTH-502 after deployment 8.2. Login succeeds intermittently.&rdquo;
                  </span>
                </div>

                {state === 'capture' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 -right-2 bg-cobalt text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3" />
                    CAPTURED CONTEXT
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-1">
                <span>IMPACT: 2,400 ACTIVE SESSIONS</span>
                <span className="text-cobalt">COPROCESSOR SYNCHRONIZED</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* State: Execution / Verification / Complete - Generic Enterprise Issue Tracker */}
        {['execution', 'verification', 'complete'].includes(state) && (
          <motion.div 
            className="w-[560px] bg-[#161822] rounded-2xl shadow-2xl border border-white/15 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Window Chrome */}
            <div className="h-8 bg-[#0F1118] flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-[10px] font-mono text-white/70 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cobalt" />
                <span>NEW ENGINEERING ISSUE &bull; {destinationName}</span>
              </div>
              <div className="text-[9px] font-mono text-mint bg-mint/10 px-2 py-0.5 rounded border border-mint/20 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>STATUS VERIFIED</span>
              </div>
            </div>
            
            {/* Form Details */}
            <div className="p-6 flex flex-col gap-4 font-sans">
              <div>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                  ISSUE TITLE
                </span>
                <div className="text-base font-bold text-white bg-[#0D0E15] px-3.5 py-2 rounded-xl border border-white/10">
                  Authentication failures after deployment 8.2
                </div>
              </div>

              {/* Fields Grid */}
              <div className="grid grid-cols-3 gap-2.5 font-mono text-[9px]">
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">TYPE</span>
                  <span className="text-white font-bold">BUG</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">PRIORITY</span>
                  <span className="text-rose-400 font-bold">P1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">COMPONENT</span>
                  <span className="text-white font-bold">AUTHENTICATION</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">ENVIRONMENT</span>
                  <span className="text-white font-bold">PRODUCTION</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">VERSION</span>
                  <span className="text-white font-bold">8.2</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0D0E15] border border-white/10">
                  <span className="text-white/40 block mb-0.5">ERROR CODE</span>
                  <span className="text-rose-400 font-bold">AUTH-502</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                  DESCRIPTION
                </span>
                <div className="p-3 rounded-xl bg-[#0D0E15] border border-white/10 text-xs text-white/80 leading-relaxed font-mono">
                  &ldquo;Production users are intermittently unable to authenticate following deployment 8.2. Error AUTH-502 observed during login.&rdquo;
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-white/50">CREATED BY <span className="text-white font-bold">CONTEXTPILOT</span></span>
                <span className="text-mint font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> DESTINATION STATE VERIFIED
                </span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Laptop Taskbar */}
      <div className="h-8 bg-[#0C0E14] border-t border-white/10 flex items-center justify-between px-4 z-10 text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-cobalt flex items-center justify-center text-white font-bold text-[8px]">
            CP
          </div>
          <span className="text-white/70">ContextPilot Workspace Bridge Active</span>
        </div>
        <div>
          10:42 AM
        </div>
      </div>
    </div>
  );
}
