import React from 'react';
import { useSimulation } from '@/store/simulation';
import GlassPanel from '@/components/ui/GlassPanel';
import { AlertTriangle, Ban, CheckCircle2, RotateCcw, Eye } from 'lucide-react';

export default function FailureMode() {
  const { confidence, getTrustPolicy, advanceState, reset } = useSimulation();
  const policy = getTrustPolicy(confidence);
  
  const isBlocked = policy === 'blocked';

  return (
    <div className="w-full max-w-lg flex flex-col items-center">
      <GlassPanel className={`w-full p-8 relative overflow-hidden ${
        isBlocked ? 'border-rose-500/30' : 'border-amber-500/30'
      }`}>
        <div className={`absolute top-0 left-0 w-full h-1.5 ${
          isBlocked ? 'bg-rose-500' : 'bg-amber-500'
        }`} />
        
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isBlocked ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {isBlocked ? <Ban className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
          </div>
          
          <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
            GOVERNANCE GATE
          </div>
          
          <h2 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">
            {isBlocked ? 'ACTION BLOCKED' : 'USER CONFIRMATION REQUIRED'}
          </h2>
          
          <div className={`text-4xl font-mono font-black mb-2 ${
            isBlocked ? 'text-rose-400' : 'text-amber-400'
          }`}>
            {confidence.toFixed(1)}%
          </div>

          <p className="text-xs text-white/70 font-sans max-w-sm leading-relaxed mt-2">
            {isBlocked 
              ? 'Model confidence is below the minimum safety threshold (50%). Mutation to external workspace tools has been blocked by the Trust Engine.'
              : 'Model confidence is within the review threshold (50%–89%). Manual human verification is required before executing changes to the workspace.'
            }
          </p>
        </div>

        {/* Action Controls: CONFIRM / REVIEW / REJECT */}
        <div className="flex flex-wrap items-center gap-3 justify-center pt-2">
          {!isBlocked && (
            <button 
              onClick={() => advanceState()}
              className="flex-1 min-w-[130px] py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>CONFIRM ACTION</span>
            </button>
          )}

          <button
            onClick={() => advanceState()}
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <Eye className="w-4 h-4 text-white/70" />
            <span>REVIEW</span>
          </button>

          <button 
            onClick={reset}
            className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all border border-white/5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET</span>
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
