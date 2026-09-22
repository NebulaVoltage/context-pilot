import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Link as LinkIcon, Shield, Cpu, Box, ShieldCheck, ListTree, MousePointerClick, CheckCircle, X } from 'lucide-react';

interface NodeInfo {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  type: 'major' | 'minor';
  icon: React.ElementType;
}

const nodes: NodeInfo[] = [
  { id: 'laptop', label: 'LAPTOP', type: 'major', x: 20, y: 50, desc: 'Primary user workspace running unmodified native applications (browsers, IDEs, desktop clients).', icon: Monitor },
  { id: 'phone', label: 'iQOO PHONE', type: 'major', x: 80, y: 50, desc: 'Hardware-isolated intelligence layer executing local 1.7B SLM inference inside secure silicon.', icon: Smartphone },
  { id: 'office', label: 'OFFICE KIT', type: 'major', x: 50, y: 50, desc: 'Low-latency peer-to-peer data bridge maintaining continuous hardware synchronization.', icon: LinkIcon },
  { id: 'gateway', label: 'CONTEXT GATEWAY', type: 'minor', x: 20, y: 20, desc: 'Captures and preprocesses work context from active windows without performance penalty.', icon: Box },
  { id: 'firewall', label: 'PRIVACY FIREWALL', type: 'minor', x: 50, y: 20, desc: 'Ensures sensitive credentials, keys, and tokens are scrubbed before reaching model reasoning.', icon: Shield },
  { id: 'slm', label: 'LOCAL SLM', type: 'minor', x: 80, y: 20, desc: 'Converts raw conversational context into verified intent locally on smartphone NPU.', icon: Cpu },
  { id: 'capsule', label: 'CONTEXT CAPSULE', type: 'minor', x: 80, y: 80, desc: 'Structured, schema-validated semantic representation of intent with complete evidence trace.', icon: Box },
  { id: 'trust', label: 'TRUST ENGINE', type: 'minor', x: 50, y: 80, desc: 'Deterministic governance engine that checks policy, confidence, and permissions before execution.', icon: ShieldCheck },
  { id: 'planner', label: 'ACTION PLANNER', type: 'minor', x: 20, y: 80, desc: 'Translates validated intent into atomic UI execution commands for destination workspace tools.', icon: ListTree },
  { id: 'executor', label: 'UI EXECUTOR', type: 'minor', x: 5, y: 50, desc: 'Dispatches actions directly to native target applications (Jira, Linear, Slack, Gmail).', icon: MousePointerClick },
  { id: 'verification', label: 'VERIFICATION', type: 'minor', x: 35, y: 80, desc: 'Inspects host application state to mathematically confirm the action succeeded.', icon: CheckCircle },
];

const connections = [
  ['laptop', 'gateway'],
  ['gateway', 'office'],
  ['office', 'firewall'],
  ['firewall', 'slm'],
  ['slm', 'capsule'],
  ['capsule', 'office'],
  ['office', 'trust'],
  ['trust', 'planner'],
  ['planner', 'executor'],
  ['executor', 'verification'],
  ['laptop', 'office'],
  ['office', 'phone'],
];

export default function ArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const selectedInfo = nodes.find(n => n.id === selectedNode);

  return (
    <section 
      id="architecture" 
      className="relative w-full min-h-screen bg-ink text-white overflow-hidden flex flex-col justify-between py-28 px-6 md:px-12 select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">08</span>
          <span>/</span>
          <span>SYSTEM TOPOLOGY</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          SUBSYSTEM ARCHITECTURE
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-4">
          LOCAL BY DESIGN.
        </h2>
        <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
          Click any architecture node to inspect its operational role, data inputs, and isolation boundaries.
        </p>
      </div>

      {/* Interactive Topology Graph */}
      <div className="relative w-full max-w-6xl mx-auto h-[540px] z-10 my-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([source, target], i) => {
            const s = nodes.find(n => n.id === source);
            const t = nodes.find(n => n.id === target);
            if (!s || !t) return null;
            
            const isHighlighted = selectedNode === source || selectedNode === target;
            const strokeColor = selectedNode ? (isHighlighted ? '#7A5CFF' : '#232936') : '#232936';
            const strokeWidth = isHighlighted ? 2 : 1;
            const opacity = selectedNode && !isHighlighted ? 0.25 : 0.7;
            
            return (
              <line
                key={`${source}-${target}`}
                x1={`${s.x}%`} y1={`${s.y}%`}
                x2={`${t.x}%`} y2={`${t.y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray="4 4"
                opacity={opacity}
              />
            );
          })}
        </svg>

        {nodes.map(node => {
          const isSelected = selectedNode === node.id;
          const isFaded = selectedNode && !isSelected;
          const Icon = node.icon;
          
          return (
            <motion.div
              key={node.id}
              data-cursor="node"
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                isFaded ? 'opacity-30' : 'opacity-100'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{ 
                scale: isSelected ? 1.15 : 1,
                zIndex: isSelected ? 20 : 10
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <div className={`flex flex-col items-center justify-center p-3.5 rounded-2xl min-w-[110px] transition-all duration-200 border ${
                isSelected 
                  ? 'bg-ink-900 border-violet shadow-[0_0_25px_rgba(122,92,255,0.4)]' 
                  : 'bg-ink-900/80 border-white/10 hover:border-white/30'
              }`}>
                <Icon className={`mb-1.5 ${isSelected ? 'text-violet' : node.type === 'major' ? 'text-cobalt' : 'text-white/60'} ${node.type === 'major' ? 'w-6 h-6' : 'w-4 h-4'}`} />
                <span className={`text-[11px] font-mono tracking-wider font-semibold text-center ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {node.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Selected Node Details Drawer */}
        <AnimatePresence>
          {selectedInfo && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-80 z-30"
            >
              <div className="p-6 rounded-3xl border border-violet/50 bg-ink-950/95 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <selectedInfo.icon className="w-7 h-7 text-violet" />
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-mono font-bold text-white mb-2">{selectedInfo.label}</h3>
                <p className="text-white/70 text-xs font-mono mb-6 leading-relaxed">{selectedInfo.desc}</p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>SECURITY ISOLATION</span>
                  <span className="text-mint font-semibold">VERIFIED</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“LOCAL BY DESIGN.”</span>
        <span>PEER-TO-PEER ENCLAVE SYNCHRONIZATION</span>
      </div>
    </section>
  );
}
