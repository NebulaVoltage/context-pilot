import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONTEXT_CAPSULE } from '@/data/mockData';
import GlassPanel from '@/components/ui/GlassPanel';
import { Box, CheckCircle2, RotateCw } from 'lucide-react';
import { useSimulation } from '@/store/simulation';

export default function ContextCapsuleViz() {
  const [fieldsVisible, setFieldsVisible] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 5, y: -8 });
  const [isDragging, setIsDragging] = useState(false);
  const { confidence } = useSimulation();
  
  const entries = Object.entries(CONTEXT_CAPSULE).filter(([key]) => key !== 'confidence');
  
  const displayEntries = [
    ...entries,
    ['confidence', (confidence / 100).toFixed(3)]
  ];

  useEffect(() => {
    if (fieldsVisible < displayEntries.length) {
      const t = setTimeout(() => setFieldsVisible(v => v + 1), 180);
      return () => clearTimeout(t);
    }
  }, [fieldsVisible, displayEntries.length]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setRotation(prev => ({
        x: Math.max(-20, Math.min(25, prev.x - e.movementY * 0.3)),
        y: Math.max(-35, Math.min(35, prev.y + e.movementX * 0.3)),
      }));
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center select-none">
      <div
        className="w-full cursor-grab active:cursor-grabbing transition-transform"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        onPointerMove={handlePointerMove}
      >
        <GlassPanel className="w-full p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/15 bg-[#0C0E14]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Box className="w-5 h-5 text-cobalt" />
              <h2 className="text-sm font-mono font-bold text-white tracking-widest uppercase">
                CONTEXT CAPSULE
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-mint/15 text-mint text-[9px] font-mono border border-mint/30 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>AIR-GAPPED</span>
            </div>
          </div>

          {/* JSON Object Representation */}
          <div className="font-mono text-xs flex flex-col gap-3">
            <div className="text-white/40">{`{`}</div>
            
            <div className="pl-5 flex flex-col gap-2.5">
              {displayEntries.map(([key, value], i) => {
                const isHovered = activeKey === key;
                return (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i < fieldsVisible ? 1 : 0, x: i < fieldsVisible ? 0 : -10 }}
                    onMouseEnter={() => setActiveKey(key)}
                    onMouseLeave={() => setActiveKey(null)}
                    className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
                      isHovered 
                        ? 'bg-white/15 border border-cobalt shadow-md scale-[1.02]' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    <span className="text-cyan-300 font-bold">"{key}"</span>
                    <span className="text-white/40 mr-1">:</span>
                    <span className={`font-semibold ${
                      key === 'confidence' 
                        ? 'text-mint font-bold' 
                        : isHovered 
                        ? 'text-white' 
                        : 'text-white/80'
                    }`}>
                      {typeof value === 'string' ? `"${value}"` : value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-white/40">{`}`}</div>
          </div>

          {/* Drag rotation footer note */}
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-3 h-3 text-cobalt" />
              <span>DRAG TO ROTATE 3D PERSPECTIVE</span>
            </span>
            <span className="text-mint font-semibold">100% EVIDENCE GROUNDED</span>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
