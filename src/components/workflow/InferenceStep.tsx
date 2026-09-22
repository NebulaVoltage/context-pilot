import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import TelemetryValue from '@/components/ui/TelemetryValue';
import { Cpu } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

export default function InferenceStep() {
  const { telemetry } = useSimulation();

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-10">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-3xl font-light text-white mb-2">LOCAL AI INFERENCE</h2>
        <div className="flex gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono">1.7B Quantized SLM</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs font-mono">DEVICE AI</span>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full border border-purple-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <Cpu className="w-10 h-10 text-cyan-400" />
        </div>
        
        <div className="mt-6 flex items-center gap-2 text-cyan-400 font-mono text-sm">
          PROCESSING 
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>...</motion.span>
        </div>
      </div>

      <GlassPanel className="w-full p-8 grid grid-cols-3 gap-8">
        <TelemetryValue 
          label="NPU UTILIZATION" 
          value={telemetry.npuUtilization} 
          unit="%" 
          showSparkline 
          sparklineData={[10, 20, 80, 95, 92, 88, 95, 98, 96]}
        />
        <TelemetryValue 
          label="INFERENCE LATENCY" 
          value={telemetry.inferenceLatency} 
          unit="ms" 
        />
        <TelemetryValue 
          label="CONTEXT LENGTH" 
          value={telemetry?.contextLength ?? 0} 
          unit="tkns" 
        />
        <TelemetryValue 
          label="MEMORY" 
          value={telemetry.memoryUsage} 
          unit="MB" 
        />
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-gray-500 font-mono">THERMAL STATE</span>
          <span className="text-xl font-mono text-green-400">NOMINAL</span>
        </div>
        <TelemetryValue 
          label="CLOUD REQUESTS" 
          value={0} 
        />
      </GlassPanel>
      <div className="text-[10px] text-gray-600 font-mono tracking-widest mt-[-20px]">PROTOTYPE DEMO VALUES</div>
    </div>
  );
}
