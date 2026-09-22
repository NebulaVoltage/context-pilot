import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import WorkflowSimulator from '@/components/workflow/WorkflowSimulator';
import PipelineVisualization from '@/components/workflow/PipelineVisualization';
import ConfidenceSlider from '@/components/workflow/ConfidenceSlider';
import BrandButton from '@/components/ui/BrandButton';
import { Play, Pause, StepForward, RotateCcw, Activity, ShieldCheck, Cpu, CloudOff, Zap } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const { isPlaying, togglePlay, stepForward, reset, pause, state, runFullDemo, telemetry } = useSimulation();

  // Route-level unmount cleanup
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  return (
    <div className="w-full min-h-screen bg-[#07080C] text-white pt-24 pb-16 px-4 sm:px-6 md:px-10 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* FIRST VIEWPORT CONTAINER (Immediate Interaction Shell) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start min-h-[calc(100vh-140px)]">
          
          {/* LEFT COLUMN: Editorial Context, Controls & Governance Slider (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 h-full">
            
            {/* Header Block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 font-display text-xs tracking-widest text-cobalt uppercase font-bold">
                  <span>/03 INTERACTIVE REASONING</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mint/10 border border-mint/30 text-mint font-mono text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                  <span>ON-DEVICE SLM</span>
                </div>
              </div>

              {/* Balanced Editorial Headline (No oversized typography pushing layout offscreen) */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
                WATCH THE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
                  SYSTEM THINK.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                From raw work context to a verified action — see ContextPilot reason, decide and execute in total privacy.
              </p>
            </div>

            {/* Sticky Compact Playback Controls */}
            <div className="p-3 rounded-2xl bg-[#0C0E16] border border-white/10 flex items-center justify-between gap-2 shadow-lg">
              <button 
                onClick={reset}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Restart Demo"
                title="Restart Demo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button 
                onClick={togglePlay}
                className={`flex-1 flex items-center justify-center gap-2 font-display text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md ${
                  isPlaying
                    ? 'bg-amber-warm text-[#07080C] hover:bg-amber-warm/90'
                    : 'bg-cobalt text-white hover:bg-cobalt-hover shadow-[0_0_20px_rgba(66,103,255,0.4)]'
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
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Step Forward"
                title="Step Forward"
              >
                <StepForward className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Governance & Trust Confidence Slider */}
            <div className="w-full">
              <ConfidenceSlider />
            </div>

            {/* Real-time Hardware Telemetry Bar */}
            <div className="grid grid-cols-3 gap-2 font-mono text-[9px]">
              <div className="p-2.5 rounded-xl bg-[#0C0E14] border border-white/10 flex flex-col gap-0.5">
                <span className="text-white/40 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cobalt" /> NPU LOAD
                </span>
                <span className="text-xs font-bold text-white">
                  {telemetry.npuUtilization}%
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0C0E14] border border-white/10 flex flex-col gap-0.5">
                <span className="text-white/40 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-mint" /> 1ST-TOKEN
                </span>
                <span className="text-xs font-bold text-mint">
                  {telemetry.inferenceLatency > 0 ? `${telemetry.inferenceLatency} ms` : '14.8 ms'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0C0E14] border border-white/10 flex flex-col gap-0.5">
                <span className="text-white/40 flex items-center gap-1">
                  <CloudOff className="w-3 h-3 text-emerald-400" /> CLOUD TRAFFIC
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  0 BYTES
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 12-State Hardware Workbench (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4 h-full">
            
            {/* 12-State Storytelling Ribbon (Compact Header) */}
            <div className="w-full p-2.5 rounded-2xl bg-[#0C0E14] border border-white/10">
              <PipelineVisualization />
            </div>

            {/* Main Interactive Stage */}
            <div className="flex-1 relative flex items-center justify-center bg-[#0C0E14] rounded-3xl border border-white/15 p-4 sm:p-8 shadow-2xl backdrop-blur-xl min-h-[460px] lg:min-h-[500px]">
              <WorkflowSimulator />
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: End-to-End Resolution Summary */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0C0E14] border border-white/10 text-center flex flex-col items-center">
          <span className="font-display text-xs tracking-widest text-cobalt font-bold uppercase mb-3">
            ZERO APP-SWITCHING • ZERO CLOUD LEAK
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
            THE COMPUTER REMAINS THE WORKSPACE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              THE PHONE BECOMES THE COPROCESSOR.
            </span>
          </h2>
          <p className="text-white/60 font-sans text-xs sm:text-sm max-w-lg mb-6">
            All 12 states execute locally in 1.8 seconds. Context extracted, validated by Trust Engine, and verified in destination workspace.
          </p>

          <BrandButton
            variant="primary"
            size="md"
            onClick={runFullDemo}
          >
            RUN PIPELINE AGAIN →
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default DemoPage;
