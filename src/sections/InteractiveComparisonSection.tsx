import React, { useState, useRef } from 'react';
import { Mail, MessageSquare, Chrome, CheckSquare, ArrowRight, Split } from 'lucide-react';

export const InteractiveComparisonSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    handleDrag(e);
    const handleMove = (ev: PointerEvent) => handleDrag(ev);
    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const handleDrag = (e: MouseEvent | React.PointerEvent | PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section 
      id="comparison" 
      className="relative min-h-screen bg-ink text-white flex flex-col justify-between px-6 md:px-12 py-28 overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-coral">10</span>
          <span>/</span>
          <span>COMPARATIVE FRICTION</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          INTERACTIVE SPLIT DIVIDER
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="max-w-7xl mx-auto w-full mb-10">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-4">
          THE SWITCH IS THE FRICTION.
        </h2>
        <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
          Drag the center divider to compare traditional application fragmentation against ContextPilot continuous intelligence.
        </p>
      </div>

      {/* Split Viewer Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-ink-950 my-auto"
      >
        {/* RIGHT LAYER: ContextPilot (Full background layer) */}
        <div className="absolute inset-0 bg-gradient-to-br from-cobalt/15 via-ink-900 to-ink-950 p-8 md:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-mint tracking-widest font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              CONTEXTPILOT • CONTINUOUS INTELLIGENCE
            </span>
            <span className="text-xs font-mono text-white/40">5 SEAMLESS STAGES</span>
          </div>

          {/* Smooth Continuous Pipeline */}
          <div className="max-w-xl mx-auto w-full my-auto flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-ink-900/90 border border-mint/40 backdrop-blur-xl shadow-[0_0_30px_rgba(55,214,161,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-mint font-bold">AUTOMATED EXECUTION PIPELINE</span>
                <span className="text-[10px] font-mono bg-mint/20 text-mint px-2 py-0.5 rounded font-bold">0 CONTEXT SWITCHES</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/80">Email Incident</span>
                <ArrowRight className="w-4 h-4 text-mint" />
                <span className="text-cobalt-light font-bold">On-Device NPU</span>
                <ArrowRight className="w-4 h-4 text-mint" />
                <span className="text-white/80">Jira Ticket Created</span>
              </div>
            </div>

            <p className="text-center text-xs font-mono text-white/50">
              The user never leaves their active workspace. Focus is maintained continuously.
            </p>
          </div>

          <div className="text-right text-xs font-mono text-mint font-bold">
            RESULT: 1.8s VERIFIED WORKFLOW
          </div>
        </div>

        {/* LEFT LAYER: Traditional Workflow (Clipped by slider position) */}
        <div
          className="absolute inset-0 bg-ink-950 bg-gradient-to-br from-coral/25 via-ink-900 to-ink-950 p-8 md:p-12 flex flex-col justify-between border-r border-cobalt overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-[1000px] flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-coral tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
                TRADITIONAL WORKFLOW • APPLICATION FRAGMENTATION
              </span>
              <span className="text-xs font-mono text-white/40">10 MANUAL STEPS</span>
            </div>

            {/* Overlapping Chaotic Application Cards */}
            <div className="relative w-full max-w-lg h-60 my-auto">
              {/* Window 1: Email */}
              <div className="absolute top-0 left-4 w-64 p-4 rounded-xl bg-ink-900 border border-coral/30 shadow-xl transform -rotate-3">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-coral">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Support Email (Copying text...)</span>
                </div>
                <div className="h-2 bg-white/10 rounded w-3/4 mb-1" />
                <div className="h-2 bg-white/10 rounded w-1/2" />
              </div>

              {/* Window 2: Slack */}
              <div className="absolute top-12 left-28 w-64 p-4 rounded-xl bg-ink-900 border border-amber-warm/30 shadow-xl transform rotate-2">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-warm">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Slack (Verifying incident channel)</span>
                </div>
                <div className="h-2 bg-white/10 rounded w-2/3 mb-1" />
                <div className="h-2 bg-white/10 rounded w-1/3" />
              </div>

              {/* Window 3: Jira Form */}
              <div className="absolute top-24 left-12 w-64 p-4 rounded-xl bg-ink-900 border border-white/20 shadow-xl transform -rotate-1">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-white/80">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Jira (Filling 7 mandatory fields)</span>
                </div>
                <div className="h-2 bg-white/10 rounded w-5/6 mb-1" />
                <div className="h-2 bg-white/10 rounded w-1/2" />
              </div>
            </div>

            <div className="text-left text-xs font-mono text-coral font-bold">
              PENALTY: 4+ MINS & FRAGMENTED FOCUS
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cobalt cursor-ew-resize flex items-center justify-center z-30"
          style={{ left: `${sliderPos}%` }}
          onPointerDown={handlePointerDown}
        >
          <div className="w-8 h-8 rounded-full bg-ink border border-cobalt flex items-center justify-center shadow-[0_0_15px_rgba(56,103,255,0.8)] text-cobalt hover:scale-110 transition-transform">
            <Split className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“STOP REBUILDING THE SAME THOUGHT.”</span>
        <span>CONTINUOUS FLOW BETWEEN APPLICATIONS</span>
      </div>
    </section>
  );
};

export default InteractiveComparisonSection;
