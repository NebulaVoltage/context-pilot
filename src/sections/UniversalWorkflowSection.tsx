import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ArrowRight, CheckSquare, FileText, Mail, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

interface AppDestination {
  id: string;
  name: string;
  action: string;
  icon: any;
  accent: string;
  borderAccent: string;
  fields: string[];
}

const DESTINATIONS: AppDestination[] = [
  { 
    id: 'jira', 
    name: 'SUPPORT → JIRA', 
    action: 'CREATE ISSUE', 
    icon: CheckSquare, 
    accent: 'bg-cobalt text-white border-cobalt shadow-[0_0_20px_rgba(56,103,255,0.4)]', 
    borderAccent: 'border-cobalt',
    fields: ['Project: CORE-AUTH', 'Issue Type: Bug', 'Priority: P1 - Blocker', 'Component: Authentication']
  },
  { 
    id: 'servicenow', 
    name: 'INCIDENT → SERVICENOW', 
    action: 'LOG INCIDENT', 
    icon: Briefcase, 
    accent: 'bg-mint text-black border-mint shadow-[0_0_20px_rgba(0,229,255,0.4)]', 
    borderAccent: 'border-mint',
    fields: ['Caller: Monitored Service', 'Category: Authentication Failure', 'Impact: P1 Enterprise']
  },
  { 
    id: 'notion', 
    name: 'MEETING → NOTION', 
    action: 'CREATE SPEC PAGE', 
    icon: FileText, 
    accent: 'bg-violet text-white border-violet shadow-[0_0_20px_rgba(122,92,255,0.4)]', 
    borderAccent: 'border-violet',
    fields: ['Database: Incident Postmortems', 'Status: Drafted', 'Owner: Tech Lead On-Call']
  },
  { 
    id: 'crm', 
    name: 'CUSTOMER → CRM', 
    action: 'UPDATE RECORD', 
    icon: Briefcase, 
    accent: 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]', 
    borderAccent: 'border-amber-500',
    fields: ['Account: Enterprise Tier 1', 'Status: Incident Mitigated', 'Touchpoint: Auth-502 Fix']
  },
  { 
    id: 'gmail', 
    name: 'EMAIL → GMAIL', 
    action: 'DRAFT RESPONSE', 
    icon: Mail, 
    accent: 'bg-rose-500 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]', 
    borderAccent: 'border-rose-500',
    fields: ['Recipient: enterprise-support@client.com', 'Subject: Resolution: 502 Login Restored']
  },
];

export const UniversalWorkflowSection: React.FC = () => {
  const { selectedDestination, setSelectedDestination } = useSimulation();
  const [activeId, setActiveId] = useState<string>(selectedDestination || 'jira');

  const currentApp = DESTINATIONS.find(d => d.id === activeId) || DESTINATIONS[0];
  const Icon = currentApp.icon;

  const handleSelect = (id: string) => {
    setActiveId(id);
    setSelectedDestination(id);
  };

  return (
    <section 
      id="workflow"
      className="relative min-h-screen bg-[#07080C] text-white flex flex-col justify-between px-6 md:px-12 py-28 overflow-hidden select-none border-t border-white/10"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">/07</span>
          <span>CROSS-APPLICATION ROUTING</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          SINGLE SEMANTIC SOURCE OF TRUTH
        </div>
      </div>

      {/* Main Editorial Statement */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[0.95] max-w-4xl mb-4">
            UNDERSTAND ONCE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              ACT ANYWHERE.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-white/70 font-normal max-w-xl font-sans leading-relaxed">
            The same semantic capsule translates deterministically into whatever host software your team uses.
          </p>
        </motion.div>

        {/* Orbiting Destination Constellation & Central Routing Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: High-Contrast Floating App Destinations */}
          <div className="lg:col-span-5 flex flex-wrap gap-3">
            {DESTINATIONS.map((app) => {
              const isSelected = activeId === app.id;
              const AppIcon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => handleSelect(app.id)}
                  className={`px-5 py-3.5 rounded-2xl font-mono text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-3 border cursor-pointer ${
                    isSelected
                      ? `${app.accent} scale-105 shadow-xl`
                      : 'bg-[#0C0E14] text-white/70 border-white/10 hover:border-white/30 hover:text-white hover:bg-[#121520]'
                  }`}
                >
                  <AppIcon className="w-4 h-4" />
                  <span>{app.name}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Central Context Capsule Transforming into Destination Action */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#0C0E14] border border-white/15 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-white/70">
                  <Box className="w-4 h-4 text-cobalt" />
                  <span className="font-bold">CORE CONTEXT CAPSULE</span>
                </div>
                <div className="flex items-center gap-1.5 text-mint font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DYNAMIC RE-SCHEMA</span>
                </div>
              </div>

              {/* Transformation Vector: Context Capsule -> Target Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-4">
                
                {/* Left Origin: Capsule Source */}
                <div className="p-5 rounded-2xl bg-[#07080C] border border-white/10 w-full sm:w-1/2">
                  <div className="text-[10px] font-mono text-white/40 uppercase mb-2">SOURCE CAPSULE</div>
                  <div className="font-mono text-xs space-y-1.5 text-white/80">
                    <div>intent: <span className="text-cobalt font-bold">"auth-incident"</span></div>
                    <div>env: <span className="text-white font-bold">"production"</span></div>
                    <div>version: <span className="text-white font-bold">"8.2"</span></div>
                    <div>severity: <span className="text-rose-400 font-bold">"p1"</span></div>
                  </div>
                </div>

                {/* Animated Arrow */}
                <div className="flex-shrink-0">
                  <ArrowRight className="w-6 h-6 text-cobalt transform sm:rotate-0 rotate-90" />
                </div>

                {/* Right Target: Transformed Destination Action */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentApp.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 rounded-2xl border ${currentApp.borderAccent} bg-[#07080C] w-full sm:w-1/2`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-white/40 uppercase font-semibold">{currentApp.name}</span>
                      <span className="text-[10px] font-mono font-bold text-mint">{currentApp.action}</span>
                    </div>

                    <div className="font-mono text-xs space-y-1.5 text-white/90 font-medium">
                      {currentApp.fields.map((f, i) => (
                        <div key={i} className="truncate text-white">↳ {f}</div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Verified Result Banner */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Execution payload ready for host OS</span>
                <span className="text-mint font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% COMPATIBLE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“ONE CONTEXT. MANY DESTINATIONS.”</span>
        <span>ZERO MANUAL RE-PARSING ACROSS WORKSPACES</span>
      </div>
    </section>
  );
};

export default UniversalWorkflowSection;
