import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import WorkflowSimulator from '@/components/workflow/WorkflowSimulator';
import PipelineVisualization from '@/components/workflow/PipelineVisualization';
import TelemetryPanel from '@/components/telemetry/TelemetryPanel';
import ConfidenceSlider from '@/components/workflow/ConfidenceSlider';
import BrandButton from '@/components/ui/BrandButton';
import { Play, Pause, StepForward, RotateCcw, Activity, ShieldCheck, Cpu } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const { isPlaying, togglePlay, stepForward, reset, pause, state, runFullDemo } = useSimulation();

  // Route-level unmount cleanup
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  return (
    <div className="w-full min-h-screen bg-[#07080C] text-white pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase font-bold">
              <span>/03 INTERACTIVE REASONING</span>
              <span className="text-white/20">•</span>
              <span className="text-mint flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                LIVE SYSTEM WORKBENCH
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-white/50">
              <Activity className="w-3.5 h-3.5 text-cobalt animate-pulse" />
              <span>ACTIVE STAGE:</span>
              <span className="text-mint font-bold uppercase">{state}</span>
            </div>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-4">
            WATCH THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              SYSTEM THINK.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-sans max-w-xl leading-relaxed">
            “From raw context to verified action.” Observe how unstructured support incidents transform into confirmed Jira issues in 1.8 seconds.
          </p>
        </div>

        {/* 12-State Storytelling Ribbon */}
        <div className="w-full mb-10">
          <PipelineVisualization />
        </div>

        {/* Full-Screen Interactive Device Operational Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Governance Slider & Telemetry Diagnostics */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ConfidenceSlider />
            <TelemetryPanel />
          </div>

          {/* Right Column: Central Device Simulation Stage (Takes Most of Viewport) */}
          <div className="lg:col-span-8 relative flex items-center justify-center bg-[#0C0E14] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl min-h-[540px]">
            <WorkflowSimulator />
          </div>

        </div>

        {/* Sticky Centered Playback Controls */}
        <div className="sticky bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#07080C]/95 backdrop-blur-2xl px-8 py-3.5 rounded-full border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-40 w-fit mx-auto">
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
            className={`flex items-center gap-2 font-display text-xs font-bold tracking-wider uppercase px-8 py-3 rounded-full transition-all duration-200 ${
              isPlaying
                ? 'bg-amber-warm text-[#07080C] hover:bg-amber-warm/90'
                : 'bg-cobalt text-white hover:bg-cobalt-hover shadow-[0_0_25px_rgba(66,103,255,0.6)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RUN PIPELINE</span>
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

        {/* Final Ending Reprise at bottom of /demo */}
        <div className="mt-28 p-12 sm:p-16 rounded-3xl bg-[#0C0E14] border border-white/10 text-center flex flex-col items-center">
          <span className="font-display text-xs tracking-widest text-cobalt font-bold uppercase mb-4">
            CONTEXT PILOT
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            THE COMPUTER REMAINS THE WORKSPACE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              THE PHONE BECOMES THE COPROCESSOR.
            </span>
          </h2>
          <p className="text-white/60 font-sans text-sm sm:text-base max-w-lg mb-8">
            All 12 states completed locally in 1.8 seconds. Zero cloud requests emitted.
          </p>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={runFullDemo}
          >
            RUN AGAIN
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default DemoPage;
