import React from 'react';
import { motion } from 'framer-motion';
import { DEMO_METRICS } from '@/data/mockData';
import { useSimulation } from '@/store/simulation';
import GlassPanel from '@/components/ui/GlassPanel';
import { CheckCircle2 } from 'lucide-react';

const MetricCard = ({ value, label, delay = 0, suffix = '' }: { value: string | number, label: string, delay?: number, suffix?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring' }}
  >
    <GlassPanel className="p-6 flex flex-col items-center justify-center text-center h-full hover:border-cyan-500/50 transition-colors">
      <div className="text-3xl font-light text-white mb-2 flex items-baseline gap-1">
        {value}{suffix && <span className="text-lg text-gray-500">{suffix}</span>}
      </div>
      <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">{label}</div>
    </GlassPanel>
  </motion.div>
);

export default function SuccessState() {
  const { confidence } = useSimulation();

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-10">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-4xl font-light text-white mb-2">CONTEXT → ACTION</h2>
        <div className="text-sm font-mono text-gray-400 tracking-[0.3em]">WORKFLOW COMPLETE</div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 w-full">
        <MetricCard value={DEMO_METRICS.appSwitchesAvoided} label="App Switches Avoided" delay={0.2} />
        <MetricCard value={DEMO_METRICS.manualFieldsEliminated} label="Manual Fields Eliminated" delay={0.3} />
        <MetricCard value={confidence.toFixed(1)} suffix="%" label="AI Confidence" delay={0.4} />
        <MetricCard value={DEMO_METRICS.inference} label="Inference" delay={0.5} />
        <MetricCard value={DEMO_METRICS.cloudRequests} label="Cloud Requests" delay={0.6} />
        <MetricCard value={DEMO_METRICS.workflowLatency} suffix="s" label="Total Workflow Latency" delay={0.7} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-[10px] text-gray-600 font-mono tracking-widest mt-4 uppercase"
      >
        Prototype Demonstration Metrics
      </motion.div>
    </div>
  );
}
