import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, StepForward, X, Activity, ShieldCheck, Zap, Cpu, Link2, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

export default function PresentationMode() {
  const { 
    presentationMode, 
    setPresentationMode, 
    isPlaying, 
    togglePlay, 
    stepForward, 
    reset,
    state,
    confidence
  } = useSimulation();

  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPresentationMode(false);
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'ArrowRight') stepForward();
      if (e.key === 'r' || e.key === 'R') reset();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, togglePlay, stepForward, reset, setPresentationMode]);

  if (!presentationMode) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md flex flex-col justify-between select-none"
      >
        {/* Top Keynote HUD */}
        <div className="p-8 flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col gap-2">
            <div className="bg-graphite-900/90 backdrop-blur-xl border border-cyan-500/30 px-4 py-2 rounded-full text-xs font-mono text-cyan-400 tracking-widest uppercase shadow-2xl flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>KEYNOTE PRESENTATION STAGE</span>
            </div>
            <div className="bg-graphite-900/80 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[11px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <span className="text-gray-500">STAGE:</span>
              <span className="text-white font-bold">{state.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span>[SPACE] PLAY/PAUSE</span>
              <span>•</span>
              <span>[→] STEP</span>
              <span>•</span>
              <span>[ESC] EXIT</span>
            </div>
            <button 
              onClick={() => setPresentationMode(false)}
              className="w-10 h-10 rounded-full bg-graphite-900/90 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-graphite-800 transition-colors shadow-xl"
              title="Exit Keynote Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Center Keynote Overlays based on State */}
        <div className="flex-1 flex items-center justify-center pointer-events-none px-6">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-graphite-950/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex flex-col items-center gap-3 max-w-md shadow-2xl text-center"
              >
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_#22d3ee]" />
                <h3 className="text-xl font-black text-white tracking-wider">SYSTEM READY</h3>
                <p className="text-xs font-mono text-gray-400 leading-relaxed">
                  Your phone is connected as the intelligence layer. Computer workspace is active.
                </p>
              </motion.div>
            )}

            {state === 'capture' && (
              <motion.div 
                key="capture"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-graphite-950/90 backdrop-blur-2xl border border-cyan-500/30 p-8 rounded-3xl flex flex-col items-center gap-3 max-w-md shadow-2xl text-center"
              >
                <Activity className="w-10 h-10 text-cyan-400" />
                <h3 className="text-xl font-black text-white tracking-wider">CONTEXT CAPTURED</h3>
                <p className="text-xs font-mono text-gray-300">
                  Incident AUTH-502 detected from host workspace. Packing into cross-device stream.
                </p>
              </motion.div>
            )}

            {state === 'transferToPhone' && (
              <motion.div 
                key="transfer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-graphite-950/90 backdrop-blur-2xl border border-cyan-500/40 p-8 rounded-3xl flex flex-col items-center gap-3 max-w-md shadow-2xl text-center"
              >
                <Link2 className="w-10 h-10 text-cyan-400 animate-pulse" />
                <h3 className="text-xl font-black text-white tracking-wider">OFFICE KIT BRIDGE</h3>
                <p className="text-xs font-mono text-gray-300">
                  Transmitting raw context directly to iQOO smartphone via high-speed device bus.
                </p>
              </motion.div>
            )}

            {state === 'inference' && (
              <motion.div 
                key="inference"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-graphite-950/90 backdrop-blur-2xl border border-purple-500/40 p-8 rounded-3xl flex flex-col items-center gap-4 max-w-md shadow-[0_0_40px_rgba(168,85,247,0.2)] text-center"
              >
                <Cpu className="w-12 h-12 text-purple-400 animate-pulse" />
                <h3 className="text-xl font-black text-white tracking-widest">ON-DEVICE NPU ACTIVE</h3>
                <p className="text-xs font-mono text-purple-200">
                  1.7B Local SLM processing unstructured telemetry. Zero cloud requests emitted.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 pt-2 border-t border-purple-500/20 w-full justify-center">
                  <span>LATENCY: 42ms</span>
                  <span>•</span>
                  <span>THERMAL: NOMINAL</span>
                </div>
              </motion.div>
            )}
            
            {state === 'trust' && (
              <motion.div 
                key="trust"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-graphite-950/90 backdrop-blur-2xl border border-green-500/40 p-8 rounded-3xl flex flex-col items-center gap-4 max-w-md shadow-[0_0_40px_rgba(34,197,94,0.2)] text-center"
              >
                <ShieldCheck className="w-12 h-12 text-green-400" />
                <h3 className="text-xl font-black text-white tracking-widest">TRUST ENGINE SCANNED</h3>
                <div className="text-3xl font-mono text-green-400 font-bold">{Math.round(confidence * 10) / 10}%</div>
                <p className="text-xs font-mono text-green-200">
                  All 5 governance vectors passed. Authorizing autonomous action dispatch.
                </p>
              </motion.div>
            )}

            {state === 'complete' && (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-graphite-950/95 backdrop-blur-2xl border border-cyan-500/50 p-10 rounded-3xl flex flex-col items-center gap-5 max-w-lg shadow-[0_0_60px_rgba(6,182,212,0.3)] text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-cyan-400" />
                <h3 className="text-2xl font-black text-white tracking-widest">ACTION EXECUTED & VERIFIED</h3>
                <p className="text-base text-gray-300 font-light italic leading-relaxed">
                  "Your phone is the intelligence layer.
                  <br />
                  Your computer remains the workspace."
                </p>
                <div className="text-xs font-mono text-cyan-400">
                  Demo completed in 1.8s • 0 Cloud calls • 100% On-device
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Keynote Stage Controls */}
        <div className="p-8 flex justify-center pb-12 pointer-events-auto">
          <div className="bg-graphite-900/95 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
            <button 
              onClick={reset}
              className="text-gray-400 hover:text-white transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center justify-center text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            
            <button 
              onClick={stepForward}
              className="text-gray-400 hover:text-white transition-colors"
              title="Step Forward"
            >
              <StepForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
