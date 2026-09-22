import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTEXT_CAPSULE } from '@/data/mockData';
import { Box, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContextTransformationSection: React.FC = () => {
  const [activeHoverField, setActiveHoverField] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 8, y: -12 });
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic text highlighting logic based on capsule field hover
  const getHighlightClass = (tokenKey: string) => {
    if (!activeHoverField) return 'text-white/90 transition-colors';
    if (activeHoverField === 'error' && tokenKey === 'error') 
      return 'bg-rose-500/30 text-rose-300 ring-1 ring-rose-500 font-bold px-1.5 py-0.5 rounded shadow-sm';
    if (activeHoverField === 'environment' && tokenKey === 'env') 
      return 'bg-cobalt/30 text-cyan-300 ring-1 ring-cyan-400 font-bold px-1.5 py-0.5 rounded shadow-sm';
    if (activeHoverField === 'version' && tokenKey === 'ver') 
      return 'bg-violet/30 text-violet-light ring-1 ring-violet font-bold px-1.5 py-0.5 rounded shadow-sm';
    if (activeHoverField === 'priority' && (tokenKey === 'error' || tokenKey === 'impact')) 
      return 'bg-amber-500/30 text-amber-300 ring-1 ring-amber-400 font-bold px-1.5 py-0.5 rounded shadow-sm';
    if (activeHoverField === 'component' && tokenKey === 'comp') 
      return 'bg-mint/30 text-mint font-bold ring-1 ring-mint px-1.5 py-0.5 rounded shadow-sm';
    return 'opacity-35 text-white/40 transition-opacity';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setRotation(prev => ({
        x: Math.max(-20, Math.min(25, prev.x - e.movementY * 0.3)),
        y: Math.max(-35, Math.min(35, prev.y + e.movementX * 0.3)),
      }));
    }
  };

  return (
    <section 
      id="transformation"
      className="relative min-h-screen bg-[#07080C] text-white flex flex-col justify-between px-6 md:px-12 py-28 overflow-hidden select-none border-t border-white/10"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">/05</span>
          <span>CONTEXT CAPSULE</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          SEMANTIC STRUCTURE SYNTHESIS
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        
        {/* Massive Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[0.92] max-w-4xl mb-6">
            FROM HUMAN
            <br />
            CONTEXT
            <br />
            TO MACHINE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              ACTION.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-white/80 font-normal max-w-2xl font-sans leading-relaxed">
            ContextPilot converts unstructured work information into a structured representation that software can act upon.
          </p>
        </motion.div>

        {/* Split Stage: Natural Language Stream (Left) vs 3D Context Capsule (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Natural Language Input with High-Contrast Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0C0E14] border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
                  <span className="text-white/80 font-bold">INPUT TELEMETRY // ACTIVE WORKSPACE STREAM</span>
                </div>
                <span className="text-cobalt font-bold">100% GROUND TRUTH</span>
              </div>

              <p className="text-xl sm:text-2xl font-normal text-white leading-relaxed tracking-wide font-sans">
                &ldquo;<span className={getHighlightClass('env')}>Production users</span> are{' '}
                <span className={getHighlightClass('impact')}>receiving</span>{' '}
                <span className={getHighlightClass('error')}>AUTH-502</span> after{' '}
                <span className={getHighlightClass('ver')}>deployment 8.2</span>.{' '}
                <span className={getHighlightClass('comp')}>Login succeeds intermittently</span> and several customers are{' '}
                <span className={getHighlightClass('impact')}>blocked</span>.&rdquo;
              </p>

              {/* Dynamic Evidence Linker Hint */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">
                  {activeHoverField 
                    ? `Evidence Link: [${activeHoverField.toUpperCase()}] mapped from stream` 
                    : 'Hover over capsule keys to inspect ground-truth evidence'}
                </span>
                <span className="text-cobalt font-bold">DEVICE LOCAL</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs font-mono text-white/80">
              <ShieldCheck className="w-4 h-4 text-mint flex-shrink-0" />
              <span>
                Zero hallucinations: Every extracted entity has an exact mathematical pointer to active workspace memory.
              </span>
            </div>
          </div>

          {/* Right Column: High-Contrast Dark 3D Glass Context Capsule */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-[#0C0E14] text-white border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-grab active:cursor-grabbing transition-transform select-none"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerLeave={() => setIsDragging(false)}
              onPointerMove={handlePointerMove}
            >
              {/* Capsule Header & Badges */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-cobalt" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">CONTEXT CAPSULE v1.2</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15 font-bold text-white/70">
                    AIR-GAPPED
                  </span>
                  <span className="bg-mint/20 text-mint px-2 py-0.5 rounded border border-mint/30 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>READY FOR ACTION</span>
                  </span>
                </div>
              </div>

              {/* Capsule Key-Value Attributes with Hover Highlights */}
              <div className="space-y-3 font-mono text-xs">
                {Object.entries(CONTEXT_CAPSULE).map(([key, val], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onMouseEnter={() => setActiveHoverField(key)}
                    onMouseLeave={() => setActiveHoverField(null)}
                    className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                      activeHoverField === key
                        ? 'bg-white/20 border-cobalt shadow-lg scale-[1.02]'
                        : 'bg-[#07080C] hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    <span className="font-bold text-white/60 uppercase tracking-wider">{key}:</span>
                    <span className={`font-semibold ${activeHoverField === key ? 'text-mint' : 'text-cobalt-light'}`}>
                      {String(val)}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Drag Hint Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>DRAG TO ROTATE 3D CAPSULE</span>
                <span className="text-mint font-semibold">SCHEMA VALIDATED</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“UNDERSTAND ONCE. ACT ANYWHERE.”</span>
        <span>ATOMIC CONTEXT FABRIC ACROSS ALL DESKTOP APPLICATIONS</span>
      </div>
    </section>
  );
};

export default ContextTransformationSection;
