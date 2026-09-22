import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import { RotateCcw, Laptop, Smartphone, ArrowRight } from 'lucide-react';

export const CinematicEnding: React.FC = () => {
  const { reset, runFullDemo } = useSimulation();
  const [pulseMoving, setPulseMoving] = useState(false);
  const [phoneLit, setPhoneLit] = useState(false);

  const handleRunAgain = () => {
    setPulseMoving(true);
    setTimeout(() => {
      setPhoneLit(true);
    }, 500);
    setTimeout(() => {
      setPhoneLit(false);
      setPulseMoving(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      reset();
      setTimeout(() => runFullDemo(), 700);
    }, 1200);
  };

  return (
    <footer 
      id="ending"
      className="relative w-full min-h-screen bg-ink text-white flex flex-col justify-between px-6 md:px-12 py-32 overflow-hidden select-none border-t border-white/10"
    >
      {/* Top Editorial Annotation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
          <span className="font-bold text-cobalt">/07</span>
          <span>NARRATIVE REPRISE</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
          THE COMPLETED LOOP
        </div>
      </div>

      {/* Main Brand Statement & Hardware Reprise */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center my-auto">
        
        {/* Connected Hardware Link (Laptop <-> Bridge <-> Phone) */}
        <div className="w-full max-w-md flex items-center justify-between mb-16 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <Laptop className="w-6 h-6 text-white/60" />
            </div>
            <span className="text-[10px] font-mono text-white/40 tracking-wider">WORKSPACE</span>
          </div>

          {/* Dynamic Laser Beam */}
          <div className="flex-1 h-0.5 bg-white/10 mx-6 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-cobalt via-violet to-mint shadow-[0_0_20px_rgba(138,99,255,0.9)]"
              animate={{
                x: pulseMoving ? ['-100%', '500%', '-100%'] : ['-100%', '400%'],
              }}
              transition={{
                duration: pulseMoving ? 1.2 : 3,
                repeat: pulseMoving ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl border transition-all duration-300 flex items-center justify-center ${
              phoneLit 
                ? 'bg-violet/30 border-violet shadow-[0_0_35px_rgba(138,99,255,0.9)] scale-110' 
                : 'bg-white/5 border-white/10 shadow-lg'
            }`}>
              <Smartphone className={`w-6 h-6 transition-colors ${phoneLit ? 'text-white' : 'text-violet'}`} />
            </div>
            <span className="text-[10px] font-mono text-violet tracking-wider">INTELLIGENCE</span>
          </div>
        </div>

        {/* Huge Typographic Reprise: THE COMPUTER REMAINS THE WORKSPACE. THE PHONE BECOMES THE COPROCESSOR. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.95]">
            THE COMPUTER
            <br />
            REMAINS THE WORKSPACE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              THE PHONE BECOMES THE COPROCESSOR.
            </span>
          </h2>
        </motion.div>

        {/* Brand Lockup Sub-labels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-3 mb-12"
        >
          <div className="font-mono text-sm tracking-[0.3em] font-bold text-white uppercase">
            CONTEXT PILOT®
          </div>
          <div className="font-mono text-xs tracking-[0.25em] text-white/50 uppercase">
            PRIVATE ON-DEVICE AI COPROCESSOR
          </div>
          <div className="font-mono text-[11px] tracking-widest text-white/40 pt-2">
            PHONE / INTELLIGENCE &bull; COMPUTER / WORKSPACE &bull; OFFICE KIT / BRIDGE
          </div>
        </motion.div>

        {/* High-Contrast Visible CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={handleRunAgain}
            className="px-10 py-4 rounded-full font-display text-xs font-extrabold uppercase tracking-wider bg-cobalt hover:bg-cobalt-light text-white active:scale-[0.98] transition-all duration-200 flex items-center gap-3 shadow-[0_0_35px_rgba(56,103,255,0.6)] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-cyan-300" />
            <span className="text-white">RUN THE SYSTEM AGAIN</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </button>
        </motion.div>

      </div>

      {/* Bottom Minimal Legal & Hackathon Credit */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40">
        <span>© 2026 CONTEXT PILOT. ALL RIGHTS RESERVED.</span>
        <span>iQOO ON-DEVICE AI HACKATHON PROTOTYPE</span>
      </div>
    </footer>
  );
};

export default CinematicEnding;
