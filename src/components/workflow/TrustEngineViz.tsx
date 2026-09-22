import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TRUST_CHECKS } from '@/data/mockData';
import { useSimulation } from '@/store/simulation';
import { Shield, ShieldAlert, Check, X, Loader2, ShieldCheck } from 'lucide-react';

export default function TrustEngineViz() {
  const { confidence, getTrustPolicy } = useSimulation();
  const policy = getTrustPolicy(confidence);
  
  const [activeCheck, setActiveCheck] = useState(-1);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < TRUST_CHECKS.length) {
        setActiveCheck(current);
        current++;
      } else {
        clearInterval(interval);
        setActiveCheck(TRUST_CHECKS.length);
        setTimeout(() => setCompleted(true), 400);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const getCenterContent = () => {
    if (!completed) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-2">
          <Shield className="w-8 h-8 text-cobalt mb-1 animate-pulse" />
          <div className="text-[9px] font-mono tracking-widest text-cobalt-light">GOVERNANCE SCAN</div>
          <div className="text-base font-mono font-bold text-white mt-0.5">{confidence.toFixed(1)}%</div>
        </div>
      );
    }

    if (policy === 'auto') {
      return (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center p-2"
        >
          <ShieldCheck className="w-9 h-9 text-mint mb-1 drop-shadow-[0_0_15px_rgba(55,214,161,0.8)]" />
          <div className="text-[9px] font-mono tracking-widest text-mint font-bold">PASS</div>
          <div className="text-xs font-bold font-mono text-mint">AUTO-AUTHORIZED</div>
        </motion.div>
      );
    }

    if (policy === 'assisted' || policy === 'confirm') {
      return (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center p-2"
        >
          <ShieldAlert className="w-9 h-9 text-amber-warm mb-1 drop-shadow-[0_0_15px_rgba(244,184,96,0.8)]" />
          <div className="text-[8px] font-mono tracking-widest text-amber-warm">ATTENTION</div>
          <div className="text-[11px] font-bold font-mono text-amber-warm uppercase">CONFIRMATION</div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center text-center p-2"
      >
        <ShieldAlert className="w-9 h-9 text-coral mb-1 drop-shadow-[0_0_15px_rgba(255,107,107,0.8)]" />
        <div className="text-[8px] font-mono tracking-widest text-coral font-bold">REJECTED</div>
        <div className="text-[11px] font-bold font-mono text-coral uppercase">ACTION BLOCKED</div>
      </motion.div>
    );
  };

  const renderChecks = () => {
    const radius = 150;
    const center = { x: 220, y: 220 };

    return TRUST_CHECKS.map((check, i) => {
      const angle = (i * (360 / TRUST_CHECKS.length) - 90) * (Math.PI / 180);
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      
      const isPending = activeCheck < i;
      const isChecking = activeCheck === i;
      const isDone = activeCheck > i;
      
      let passed = check.result === 'pass';
      if (check.id === 'confidence' && policy !== 'auto') passed = false;

      return (
        <motion.div
          key={check.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          {/* Node Circle */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
            isPending ? 'bg-ink-950/80 border-white/10 text-white/30' :
            isChecking ? 'bg-ink-900 border-cobalt text-cobalt-light shadow-[0_0_25px_rgba(56,103,255,0.6)] scale-110' :
            passed ? 'bg-mint/10 border-mint text-mint shadow-[0_0_15px_rgba(55,214,161,0.3)]' :
            'bg-amber-warm/10 border-amber-warm text-amber-warm shadow-[0_0_15px_rgba(244,184,96,0.3)]'
          }`}>
            {isChecking && (
              <span className="absolute inset-0 rounded-full border border-cobalt animate-ping opacity-75" />
            )}
            {isPending && <span className="w-2 h-2 rounded-full bg-white/20" />}
            {isChecking && <Loader2 className="w-5 h-5 animate-spin" />}
            {isDone && passed && <Check className="w-6 h-6 stroke-[2.5]" />}
            {isDone && !passed && <X className="w-6 h-6 stroke-[2.5]" />}
          </div>

          {/* Node Label */}
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-[10px] font-mono tracking-wider uppercase font-bold transition-colors ${
              isChecking ? 'text-cobalt-light' : isDone ? (passed ? 'text-mint' : 'text-amber-warm') : 'text-white/40'
            }`}>
              {check.label}
            </span>
            <span className="text-[9px] font-mono text-white/40">
              {isDone ? (passed ? 'VERIFIED' : 'REVIEW') : isChecking ? 'SCANNING' : 'PENDING'}
            </span>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="w-[440px] h-[440px] relative flex items-center justify-center select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {/* Orbital Track */}
        <circle cx="220" cy="220" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="220" cy="220" r="95" fill="none" stroke="rgba(56,103,255,0.15)" strokeWidth="1" />
        
        {/* Radial Connection Rays */}
        {TRUST_CHECKS.map((_, i) => {
          const angle = (i * (360 / TRUST_CHECKS.length) - 90) * (Math.PI / 180);
          const x = 220 + 150 * Math.cos(angle);
          const y = 220 + 150 * Math.sin(angle);
          return (
            <line 
              key={`line-${i}`}
              x1="220" y1="220" x2={x} y2={y} 
              stroke={activeCheck >= i ? 'rgba(56, 103, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'} 
              strokeWidth={activeCheck === i ? 2 : 1}
            />
          );
        })}
      </svg>
      
      {/* Central Scanning Iris */}
      <motion.div 
        animate={{
          boxShadow: completed && policy === 'auto' 
            ? '0 0 50px rgba(55, 214, 161, 0.4)' 
            : activeCheck >= 0 
            ? '0 0 40px rgba(56, 103, 255, 0.3)' 
            : '0 0 20px rgba(0, 0, 0, 0.8)'
        }}
        className="relative w-36 h-36 rounded-full bg-ink-950 border-2 border-white/10 flex items-center justify-center z-10 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute inset-1 rounded-full border border-white/5" />
        {getCenterContent()}
      </motion.div>

      {/* Orbiting Satellite Nodes */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {renderChecks()}
      </div>
    </div>
  );
}
