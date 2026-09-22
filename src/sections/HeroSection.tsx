import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
import DeviceScene from '@/components/three/DeviceScene';
import BrandButton from '@/components/ui/BrandButton';
import { Smartphone, Laptop, Link2, Sparkles, Shield, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { setFocusDevice, focusDevice, phoneVariant, setPhoneVariant } = useSimulation();
  const { setCameraPreset } = useCameraStore();

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const handleExploreClick = () => {
    navigate('/system');
  };

  const handlePhoneToggle = () => {
    if (focusDevice === 'phone') {
      setFocusDevice('none');
      setCameraPreset('hero');
    } else {
      setFocusDevice('phone');
      setCameraPreset('phone');
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-[#07080C] text-white">
      {/* 3D Hardware Studio Environment */}
      <div className="absolute inset-0 z-0">
        <DeviceScene />
      </div>

      {/* Subtle Depth Vignette & Light Falloff */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-transparent to-[#07080C]/40 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080C]/90 via-[#07080C]/25 to-transparent pointer-events-none z-[1]" />

      {/* Main Split Editorial Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none flex flex-col justify-center flex-1 pt-32 pb-16">
        <div className="max-w-2xl pointer-events-auto">
          
          {/* Natural Brand Mark */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-wide"
          >
            <span className="font-bold text-white tracking-widest">CONTEXT PILOT®</span>
            <span className="text-white/20">&bull;</span>
            <span className="text-cobalt font-semibold">PRIVATE COMPUTING / 01</span>
            <span className="text-white/20">&bull;</span>
            <span className="text-emerald-400 font-medium">ON-DEVICE INFERENCE</span>
          </motion.div>

          {/* Massive Display Typography: COMPUTE SHOULD FOLLOW CONTEXT */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-black tracking-tight text-white leading-[0.92]"
            >
              COMPUTE
              <br />
              SHOULD
              <br />
              FOLLOW
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-softblue">
                CONTEXT.
              </span>
            </motion.h1>
          </div>

          {/* Supporting Narrative Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-lg mb-8 font-sans"
          >
            Your phone becomes the intelligence layer.
            <br />
            Your computer remains the workspace.
          </motion.p>

          {/* Interactive iQOO 15 Variant Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 flex items-center gap-3 bg-[#0C0E16]/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 w-fit"
          >
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest pl-3 pr-1 hidden sm:inline">
              VARIANT:
            </span>

            {[
              { id: 'legend', label: 'LEGEND', color: 'bg-gradient-to-r from-red-500 via-blue-600 to-cyan-400' },
              { id: 'alpha', label: 'ALPHA', color: 'bg-gray-800' },
              { id: 'apex', label: 'APEX', color: 'bg-cyan-500' },
            ].map((variant) => (
              <button
                key={variant.id}
                onClick={() => setPhoneVariant(variant.id as any)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  phoneVariant === variant.id
                    ? 'bg-white/15 text-white border border-white/30 shadow-sm'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${variant.color}`} />
                {variant.label}
              </button>
            ))}
          </motion.div>

          {/* Premium CTAs — Fixed Visible Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <BrandButton
              variant="secondary"
              size="lg"
              onClick={handleExploreClick}
            >
              EXPLORE SYSTEM →
            </BrandButton>

            <BrandButton
              variant="primary"
              size="lg"
              onClick={handleDemoClick}
              className="shadow-[0_0_30px_rgba(66,103,255,0.5)]"
            >
              RUN LIVE DEMO →
            </BrandButton>

            <button
              onClick={handlePhoneToggle}
              className="px-4 py-2 rounded-full text-xs font-mono text-white/50 hover:text-white transition-colors hidden lg:flex items-center gap-2 self-center border border-white/10 hover:border-white/30 bg-white/5"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{focusDevice === 'phone' ? 'RESET ANGLE' : 'INSPECT iQOO 15'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Product Design Annotations Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.7 }}
        className="relative z-10 w-full border-t border-white/10 bg-[#07080C]/80 backdrop-blur-xl px-6 md:px-12 py-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-cobalt" />
            <span className="font-bold text-white">iQOO 15 FLAGSHIP</span>
            <span className="text-white/40">—</span>
            <span className="text-white/70 font-mono text-[11px]">SNAPDRAGON 8 ELITE GEN 5</span>
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-white/10" />

          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-violet" />
            <span className="font-bold text-white">Q3 COPROCESSOR</span>
            <span className="text-white/40">—</span>
            <span className="text-white/70 font-mono text-[11px]">LOCAL NPU ACCELERATION</span>
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-white/10" />

          <div className="flex items-center gap-2.5">
            <Link2 className="w-4 h-4 text-mint" />
            <span className="font-bold text-white">OFFICE KIT</span>
            <span className="text-white/40">—</span>
            <span className="text-white/70 font-mono text-[11px]">AIR-GAPPED HARDWARE BRIDGE</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
