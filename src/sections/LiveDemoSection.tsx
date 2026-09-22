import React, { useEffect } from 'react';
import { useSimulation } from '@/store/simulation';
import WorkflowSimulator from '@/components/workflow/WorkflowSimulator';
import PipelineVisualization from '@/components/workflow/PipelineVisualization';
import TelemetryPanel from '@/components/telemetry/TelemetryPanel';
import { Play, Pause, StepForward, RotateCcw, Activity } from 'lucide-react';

export function LiveDemoSection() {
  const { isPlaying, togglePlay, stepForward, reset, pause, state } = useSimulation();

  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  return (
    <section 
      id="demo" 
      className="min-h-screen bg-ink text-white relative flex flex-col justify-between py-28 px-6 md:px-12 overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">/08</span>
          <span>VERIFICATION & EXECUTION</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          CLOSED-LOOP EXECUTION
        </div>
      </div>

      {/* Editorial Headline */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.92] mb-4">
              THE ACTION
              <br />
              ISN'T COMPLETE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
                UNTIL WE VERIFY IT.
              </span>
            </h2>
            <p className="text-base sm:text-xl text-white/80 font-normal max-w-xl font-sans leading-relaxed">
              The laptop executes the structured action, then verifies the destination state with deterministic evidence.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-white/60 pb-2">
            <Activity className="w-4 h-4 text-cobalt animate-pulse" />
            <span>ACTIVE STAGE:</span>
            <span className="text-mint font-bold uppercase">{state}</span>
          </div>
        </div>
      </div>

      {/* Horizontal Storytelling Ribbon */}
      <div className="max-w-7xl w-full mx-auto mb-8">
        <PipelineVisualization />
      </div>

      {/* Interactive Main Operational Stage */}
      <div className="flex flex-col lg:flex-row flex-1 max-w-7xl w-full mx-auto gap-8 relative items-stretch mb-10">
        {/* Left Column: Telemetry Diagnostics */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
          <TelemetryPanel />
        </div>

        {/* Right Stage: Interactive Workflow Simulator */}
        <div className="flex-1 relative flex items-center justify-center bg-ink-900/80 rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl min-h-[460px]">
          <WorkflowSimulator />
        </div>
      </div>

      {/* Sticky Centered Playback Controls */}
      <div className="sticky bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-ink-950/95 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/20 shadow-2xl z-40 w-fit mx-auto">
        <button 
          onClick={reset}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Restart Demo"
          title="Restart Demo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button 
          onClick={togglePlay}
          className={`flex items-center gap-2 font-mono text-xs font-bold px-7 py-2.5 rounded-full transition-all duration-200 ${
            isPlaying
              ? 'bg-amber-warm text-ink hover:bg-amber-warm/90'
              : 'bg-cobalt text-white hover:bg-cobalt-hover shadow-[0_0_25px_rgba(66,103,255,0.6)]'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE PIPELINE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY PIPELINE</span>
            </>
          )}
        </button>

        <button 
          onClick={stepForward}
          disabled={isPlaying}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Step Forward"
          title="Step Forward"
        >
          <StepForward className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

export default LiveDemoSection;
