import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import { Cpu, ShieldCheck, Link2, WifiOff, Smartphone } from 'lucide-react';

export const SystemStatusHUD: React.FC = () => {
  const location = useLocation();
  const { state, officeKitConnected, toggleOfficeKit, presentationMode, confidence, getTrustPolicy } = useSimulation();
  const policy = getTrustPolicy(confidence);

  // Show technical HUD only on technical pages (/system, /demo, /hardware)
  const isTechnicalRoute = ['/system', '/demo', '/hardware'].includes(location.pathname);

  if (!isTechnicalRoute || presentationMode) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="System hardware diagnostics"
      className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-4 bg-[#0C0E14]/90 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-2xl shadow-2xl font-mono text-[11px] select-none pointer-events-auto"
    >
      {/* System Power / Pulse */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt" />
        </span>
        <span className="text-white/60 font-medium">SYS: <span className="text-white font-bold">ONLINE</span></span>
      </div>

      {/* Device Name */}
      <div className="flex items-center gap-1.5 text-white/60 pr-3 border-r border-white/10">
        <Smartphone className="w-3.5 h-3.5 text-cobalt-light" />
        <span className="text-white">iQOO NPU</span>
      </div>

      {/* Inference Status */}
      <div className="flex items-center gap-1.5 text-white/60 pr-3 border-r border-white/10">
        <Cpu className="w-3.5 h-3.5 text-violet" />
        <span>INF:</span>
        <span className={state === 'inference' ? 'text-violet animate-pulse font-bold' : 'text-white'}>
          {state === 'inference' ? 'COMPUTING' : 'LOCAL'}
        </span>
      </div>

      {/* Office Kit Toggle */}
      <button
        onClick={toggleOfficeKit}
        title="Click to toggle Office Kit connection"
        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all ${
          officeKitConnected
            ? 'bg-cobalt/15 border-cobalt/40 text-cobalt-light hover:border-cobalt'
            : 'bg-coral/15 border-coral/40 text-coral hover:border-coral'
        }`}
      >
        {officeKitConnected ? (
          <>
            <Link2 className="w-3 h-3 text-cobalt" />
            <span className="font-bold tracking-wider text-[10px]">OFFICE KIT: LINKED</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-coral" />
            <span className="font-bold tracking-wider text-[10px]">OFFICE KIT: OFF</span>
          </>
        )}
      </button>

      {/* Trust Status */}
      <div className="flex items-center gap-1.5 text-white/60 pl-1">
        <ShieldCheck className={`w-3.5 h-3.5 ${policy === 'auto' ? 'text-mint' : 'text-amber-warm'}`} />
        <span>TRUST:</span>
        <span className={`font-bold ${policy === 'auto' ? 'text-mint' : 'text-amber-warm'}`}>
          {policy.toUpperCase()}
        </span>
      </div>
    </motion.aside>
  );
};

export default SystemStatusHUD;
