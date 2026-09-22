import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Activity, Cpu, Thermometer, CloudOff, MemoryStick } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

export default function NpuTelemetrySection() {
  const { state } = useSimulation();
  const [dataPoints, setDataPoints] = useState<any[]>([]);
  
  const isInferencing = state === 'inference' || state === 'trust' || state === 'planning';
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const now = Date.now();
        const newPoint = {
          time: now,
          latency: isInferencing ? 14 + Math.random() * 4 : 4 + Math.random() * 2,
          memory: isInferencing ? 740 + Math.random() * 80 : 120 + Math.random() * 30
        };
        const newData = [...prev, newPoint];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isInferencing]);

  return (
    <section 
      id="telemetry"
      className="relative w-full min-h-screen bg-ink text-white flex flex-col justify-between py-28 px-6 md:px-12 select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-violet">09</span>
          <span>/</span>
          <span>SILICON TELEMETRY</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          LIVE HARDWARE MONITORS
        </div>
      </div>

      {/* Main Editorial Statement */}
      <div className="max-w-7xl mx-auto w-full mb-12">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-4">
          NPU PERFORMANCE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet via-cobalt to-softblue">
            IN REAL TIME.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
          Observe hardware thermals, memory allocation, and token latency responding dynamically as inference executes.
        </p>
      </div>

      {/* Main 3-Column Metrics Layout */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 items-center my-auto">
        
        {/* Left Stats */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-ink-900 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-cobalt w-5 h-5" />
              <h3 className="text-white/60 text-xs font-mono uppercase tracking-wider">MODEL SPEC</h3>
            </div>
            <p className="text-3xl font-bold text-white font-mono">1.7B</p>
            <p className="text-xs font-mono text-white/40 mt-1">Quantized INT8 Local SLM</p>
          </div>

          <div className="p-6 rounded-3xl bg-ink-900 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="text-violet w-5 h-5" />
                <h3 className="text-white/60 text-xs font-mono uppercase tracking-wider">LATENCY (ms)</h3>
              </div>
              <span className={`text-xl font-bold font-mono ${isInferencing ? 'text-violet' : 'text-white/40'}`}>
                {dataPoints.length > 0 ? Math.round(dataPoints[dataPoints.length - 1].latency) : 14}
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPoints}>
                  <YAxis domain={[0, 40]} hide />
                  <Line type="monotone" dataKey="latency" stroke="#7A5CFF" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Center Phone Silhouette & Active Core */}
        <div className="relative flex items-center justify-center h-[460px]">
          <div className="relative w-64 h-[440px] border-2 border-white/15 rounded-[2.5rem] bg-ink-900 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
            <div className="absolute top-0 w-28 h-5 bg-white/10 rounded-b-xl mb-4 self-center z-20" />
            
            <div className="relative w-36 h-36 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border border-cobalt/30"
                animate={{ scale: isInferencing ? [1, 1.25, 1] : 1, opacity: isInferencing ? [0.2, 0.7, 0.2] : 0.2 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div 
                className="absolute inset-3 rounded-full border border-violet/40"
                animate={{ rotate: isInferencing ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10 transition-colors duration-300 ${
                isInferencing ? 'bg-violet/30 border border-violet shadow-[0_0_30px_rgba(122,92,255,0.5)]' : 'bg-white/5 border border-white/10'
              }`}>
                <Cpu className={`w-8 h-8 ${isInferencing ? 'text-white' : 'text-white/40'}`} />
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-white/40 text-[10px] font-mono tracking-widest mb-2">NEURAL ENGINE</p>
              <div className={`px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-widest ${
                isInferencing ? 'bg-violet/20 border-violet text-violet-light' : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                {isInferencing ? 'REASONING' : 'READY'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-ink-900 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="text-amber-warm w-5 h-5" />
              <h3 className="text-white/60 text-xs font-mono uppercase tracking-wider">THERMAL</h3>
            </div>
            <p className="text-3xl font-bold text-mint font-mono">31°C</p>
            <p className="text-xs font-mono text-white/40 mt-1">Nominal • No Thermal Throttling</p>
          </div>

          <div className="p-6 rounded-3xl bg-ink-900 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MemoryStick className="text-mint w-5 h-5" />
                <h3 className="text-white/60 text-xs font-mono uppercase tracking-wider">MEMORY (MB)</h3>
              </div>
              <span className={`text-xl font-bold font-mono ${isInferencing ? 'text-mint' : 'text-white/40'}`}>
                {dataPoints.length > 0 ? Math.round(dataPoints[dataPoints.length - 1].memory) : 180}
              </span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPoints}>
                  <YAxis domain={[0, 1000]} hide />
                  <Line type="stepAfter" dataKey="memory" stroke="#37D6A1" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="p-4 rounded-2xl bg-ink-900 border border-white/10 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2.5 text-white/60 text-xs">
              <CloudOff className="w-4 h-4 text-mint" />
              <span>OUTBOUND CLOUD REQ</span>
            </div>
            <span className="text-lg font-bold text-mint font-mono">0</span>
          </div>
        </div>

      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“LOCAL SILICON EFFICIENCY.”</span>
        <span>BENCHMARKED ON SNAPDRAGON / DIMENSITY NPU RUNTIMES</span>
      </div>
    </section>
  );
}
