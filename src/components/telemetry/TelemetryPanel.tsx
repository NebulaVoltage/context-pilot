import React from 'react';
import { useSimulation } from '@/store/simulation';
import TelemetryValue from '@/components/ui/TelemetryValue';
import GlassPanel from '@/components/ui/GlassPanel';
import { Activity } from 'lucide-react';

export default function TelemetryPanel() {
  const { telemetry } = useSimulation();

  return (
    <GlassPanel className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800">
        <Activity className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold text-gray-300 tracking-wider">SYSTEM TELEMETRY</h4>
      </div>

      <div className="flex flex-col gap-5">
        <TelemetryValue 
          label="NPU UTILIZATION" 
          value={telemetry.npuUtilization} 
          unit="%" 
          precision={0} 
        />
        <TelemetryValue 
          label="INFERENCE LATENCY" 
          value={telemetry.inferenceLatency} 
          unit="ms" 
          precision={0} 
        />
        <TelemetryValue 
          label="CONTEXT LENGTH" 
          value={telemetry?.contextLength ?? 0} 
          unit="tkns" 
          precision={0} 
        />
        <TelemetryValue 
          label="MEMORY USAGE" 
          value={telemetry?.memoryUsage ?? 0} 
          unit="MB" 
          precision={0} 
        />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono">THERMAL STATE</span>
          <span className={`text-sm font-mono font-bold ${(telemetry?.thermalState || '').toLowerCase() === 'nominal' ? 'text-green-400' : 'text-amber-400'}`}>
            {(telemetry?.thermalState || 'nominal').toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800 text-center">
        <span className="text-[9px] text-gray-600 font-mono tracking-widest">DEMO VALUES</span>
      </div>
    </GlassPanel>
  );
}
