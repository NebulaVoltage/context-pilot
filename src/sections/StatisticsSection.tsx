import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  {
    number: '12',
    label: 'WORKFLOW STATES',
    detail: 'Continuous state-machine governance',
    color: 'text-white',
  },
  {
    number: '1',
    label: 'LOCAL AI CORE',
    detail: '1.7B Parameter on-device SLM',
    color: 'text-violet-light',
  },
  {
    number: '0',
    label: 'CLOUD INFERENCE REQUESTS',
    detail: 'Complete air-gapped security [prototype configuration]',
    color: 'text-mint',
  },
  {
    number: '7',
    label: 'MANUAL FIELDS AUTOMATED',
    detail: 'Zero keystrokes across issue creation [prototype scenario]',
    color: 'text-cobalt-light',
  },
  {
    number: '3',
    label: 'APPLICATION SWITCHES AVOIDED',
    detail: 'Context preserved in active workspace [prototype scenario]',
    color: 'text-amber-warm',
  },
];

export const StatisticsSection: React.FC = () => {
  return (
    <section 
      id="statistics"
      className="relative min-h-screen w-full bg-ink text-white py-32 px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none border-t border-white/5"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-20">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">/02</span>
          <span>SYSTEM BENCHMARKS</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          PROTOTYPE PERFORMANCE PROOFS
        </div>
      </div>

      {/* Main Statistics Grid (Massive Editorial Numerals) */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-start border-l border-white/10 pl-6 sm:pl-8 group"
            >
              {/* Massive Numeral */}
              <div className={`font-display text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-4 ${stat.color} transition-transform duration-300 group-hover:scale-105 origin-left`}>
                {stat.number}
              </div>

              {/* Label */}
              <div className="font-mono text-xs font-bold tracking-widest text-white uppercase mb-2">
                {stat.label}
              </div>

              {/* Detail Note */}
              <div className="font-mono text-[11px] text-white/40 leading-relaxed max-w-xs">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>“LOCAL BY DESIGN.”</span>
        <span>VERIFIED LATENCY: 14.8ms FIRST TOKEN ON iQOO NPU SILICON</span>
      </div>
    </section>
  );
};

export default StatisticsSection;
