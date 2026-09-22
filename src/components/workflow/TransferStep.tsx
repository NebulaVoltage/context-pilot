import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { Smartphone, Laptop, ArrowRightLeft } from 'lucide-react';
import TelemetryValue from '@/components/ui/TelemetryValue';

export default function TransferStep() {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-10">
      <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-2">OFFICE KIT BRIDGE</h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          CONNECTED
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center shadow-lg">
            <Laptop className="w-10 h-10 text-gray-400" />
          </div>
          <span className="text-xs font-mono text-gray-500">SOURCE PC</span>
        </div>

        <div className="flex-1 px-8 relative h-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center px-8">
            <div className="h-0.5 w-full bg-gray-800 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full w-1/3 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-black border border-cyan-900 flex items-center justify-center z-10">
            <ArrowRightLeft className="w-4 h-4 text-cyan-500" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-24 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center shadow-lg relative overflow-hidden">
            <Smartphone className="w-8 h-8 text-cyan-400 z-10" />
            <motion.div 
              className="absolute bottom-0 left-0 w-full bg-cyan-900/30"
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs font-mono text-gray-500">COPROCESSOR</span>
        </div>
      </div>

      <GlassPanel className="w-full flex justify-around p-6 mt-4">
        <TelemetryValue label="LINK STATUS" value="ACTIVE" />
        <TelemetryValue label="DATA TRANSFER" value="1.2" unit="MB/s" />
        <TelemetryValue label="LATENCY" value="8" unit="ms" />
      </GlassPanel>
      <div className="text-[10px] text-gray-600 font-mono tracking-widest mt-[-20px]">PROTOTYPE TELEMETRY</div>
    </div>
  );
}
