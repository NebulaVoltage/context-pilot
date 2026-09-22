import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BrandButton from '@/components/ui/BrandButton';
import { 
  Laptop, Smartphone, Link2, Shield, Cpu, Box, 
  ShieldCheck, ListTree, CheckCircle2, ArrowRight, X, Lock, Activity 
} from 'lucide-react';

interface Subsystem {
  id: string;
  num: string;
  name: string;
  tag: string;
  tier: 'WORKSPACE' | 'BRIDGE' | 'INTELLIGENCE';
  desc: string;
  input: string;
  output: string;
  isolation: string;
  latency: string;
  icon: React.ElementType;
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'gateway',
    num: '01',
    name: 'CONTEXT GATEWAY',
    tag: 'WORKSPACE INTERCEPTOR',
    tier: 'WORKSPACE',
    desc: 'Lightweight background listener on host OS. Detects active application changes, error states, and unhandled exceptions without eating host CPU.',
    input: 'Window focus events, crash logs, selected text',
    output: 'Raw unstructured telemetry stream',
    isolation: 'Non-invasive read-only API hooks',
    latency: '< 2.4ms',
    icon: Box,
  },
  {
    id: 'firewall',
    num: '02',
    name: 'PRIVACY FIREWALL',
    tag: 'CREDENTIAL SCRUBBER',
    tier: 'WORKSPACE',
    desc: 'Pre-flight data sanitizer. Redacts authentication tokens, API keys, passwords, and private PII before data crosses the device bus.',
    input: 'Raw workspace stream',
    output: 'Sanitized semantic context',
    isolation: 'Deterministic regex & entropy analysis',
    latency: '< 1.1ms',
    icon: Shield,
  },
  {
    id: 'bridge',
    num: '03',
    name: 'OFFICE KIT BRIDGE',
    tag: 'HARDWARE DATA BUS',
    tier: 'BRIDGE',
    desc: 'Low-latency peer-to-peer connection bridging PC and iQOO smartphone via high-speed physical USB-C or local Wi-Fi direct.',
    input: 'Sanitized context packets',
    output: 'Encrypted NPU memory DMA transfer',
    isolation: 'Point-to-point hardware pairing',
    latency: '0.8ms latency',
    icon: Link2,
  },
  {
    id: 'slm',
    num: '04',
    name: 'LOCAL SLM ON NPU',
    tag: '1.7B PARAMETER REASONING',
    tier: 'INTELLIGENCE',
    desc: 'Quantized INT8 Small Language Model executing inside smartphone secure hardware enclave. Infers user intent with zero cloud roundtrips.',
    input: 'Scrubbed incident stream',
    output: 'Semantic entity relationship graph',
    isolation: 'Dedicated mobile neural silicon',
    latency: '14.8ms first-token',
    icon: Cpu,
  },
  {
    id: 'capsule',
    num: '05',
    name: 'CONTEXT CAPSULE',
    tag: 'SEMANTIC CONTAINER',
    tier: 'INTELLIGENCE',
    desc: 'Atomic, schema-validated mathematical representation of work context. Contains intent, priority, error tokens, and pointers to source evidence.',
    input: 'Extracted semantic entities',
    output: 'Strictly typed JSON Context Capsule',
    isolation: 'Zero-hallucination grounded verification',
    latency: 'Deterministic (< 0.2ms)',
    icon: Box,
  },
  {
    id: 'trust',
    num: '06',
    name: 'TRUST ENGINE',
    tag: 'GOVERNANCE SCANNER',
    tier: 'INTELLIGENCE',
    desc: 'Independent safety gate. Evaluates confidence against risk threshold. Decides whether to auto-execute, request review, or block action.',
    input: 'Context Capsule + User Security Policy',
    output: 'Execution authorization token',
    isolation: 'Air-gapped rule matrix',
    latency: '< 0.5ms',
    icon: ShieldCheck,
  },
  {
    id: 'planner',
    num: '07',
    name: 'ACTION PLANNER & VERIFICATION',
    tag: 'DISPATCH & AUDIT',
    tier: 'WORKSPACE',
    desc: 'Decomposes validated capsule into atomic desktop UI actions (Jira API, ServiceNow payload). Inspects application state to verify execution succeeded.',
    input: 'Authorized execution token',
    output: 'Verified issue created & state confirmed',
    isolation: 'Target client API / Native protocol',
    latency: '1.8s end-to-end',
    icon: CheckCircle2,
  },
];

export const SystemPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState<string>('slm');

  const selectedSubsystem = SUBSYSTEMS.find((s) => s.id === activeNode) || SUBSYSTEMS[3];
  const Icon = selectedSubsystem.icon;

  return (
    <div className="w-full min-h-screen bg-[#07080C] text-white pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-16">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase mb-3 font-bold">
            <span>/02 ARCHITECTURE</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60">THREE-TIER HARDWARE TOPOLOGY</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-6">
            YOUR PHONE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              YOUR COPROCESSOR.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-sans max-w-2xl leading-relaxed">
            Click any subsystem node to inspect its operational role, data inputs, security isolation, and measured prototype latency.
          </p>
        </div>

        {/* 3-Tier Pipeline Visualization Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          
          {/* Left Column: Interactive Subsystem Nodes */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
              PIPELINE SUBSYSTEMS (01 TO 07)
            </div>

            {SUBSYSTEMS.map((sub) => {
              const isSelected = activeNode === sub.id;
              const SubIcon = sub.icon;
              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveNode(sub.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-white/10 border-cobalt shadow-[0_0_25px_rgba(66,103,255,0.3)] scale-[1.01]'
                      : 'bg-[#0C0E14] border-white/10 hover:border-white/25 hover:bg-[#11131B]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cobalt' : 'text-white/30'}`}>
                      {sub.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-cobalt text-white' : 'bg-white/5 text-white/60 group-hover:text-white'
                    }`}>
                      <SubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        {sub.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/40">
                        {sub.tag}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      sub.tier === 'INTELLIGENCE'
                        ? 'bg-violet/15 text-violet'
                        : sub.tier === 'BRIDGE'
                        ? 'bg-mint/15 text-mint'
                        : 'bg-cobalt/15 text-cobalt'
                    }`}>
                      {sub.tier}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cobalt translate-x-1' : 'text-white/20'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Architectural Specification Drawer */}
          <div className="lg:col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSubsystem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0C0E14] border border-cobalt/40 shadow-2xl relative overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-cobalt/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cobalt/20 border border-cobalt/40 flex items-center justify-center text-cobalt">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-cobalt font-bold">SUBSYSTEM {selectedSubsystem.num}</span>
                      <h3 className="font-display text-2xl font-bold text-white">{selectedSubsystem.name}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-mint font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-mint animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed mb-8">
                  {selectedSubsystem.desc}
                </p>

                {/* Subsystem Specifications */}
                <div className="space-y-4 font-mono text-xs pt-4 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-white/40">INPUT:</span>
                    <span className="text-white font-medium">{selectedSubsystem.input}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-white/40">OUTPUT:</span>
                    <span className="text-mint font-medium">{selectedSubsystem.output}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-white/40">SECURITY BOUNDARY:</span>
                    <span className="text-cobalt-light font-medium">{selectedSubsystem.isolation}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5">
                    <span className="text-white/40">MEASURED LATENCY:</span>
                    <span className="text-violet font-bold">{selectedSubsystem.latency}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-mint" />
                    <span>LOCAL SILICON ISOLATION</span>
                  </div>
                  <span>PROTOTYPE SCENARIO</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Next Route Banner: SEE HARDWARE → */}
        <div className="p-10 rounded-3xl bg-[#0C0E14] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-violet font-bold uppercase tracking-wider">NEXT DESTINATION</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              THE PHYSICAL INTELLIGENCE LAYER
            </h3>
            <p className="text-white/60 text-sm font-sans mt-1">
              Inspect the iQOO neural coprocessor and local SLM silicon specs in 3D.
            </p>
          </div>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/hardware')}
            className="flex-shrink-0"
          >
            SEE HARDWARE
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default SystemPage;
