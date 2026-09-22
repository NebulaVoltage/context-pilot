import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import { ArrowRight } from 'lucide-react';

export const CinematicIntro: React.FC = () => {
  const { introCompleted, setIntroCompleted } = useSimulation();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (introCompleted) return;

    if (sessionStorage.getItem('contextpilot_intro_done') === 'true') {
      setIntroCompleted(true);
      return;
    }

    // Keep page parked at top during opening sequence
    window.scrollTo(0, 0);

    // Fast, crisp editorial reveal sequence (1.8s total)
    const t1 = setTimeout(() => setStage(1), 350);
    const t2 = setTimeout(() => setStage(2), 750);
    const t3 = setTimeout(() => setStage(3), 1150);
    const t4 = setTimeout(() => {
      setStage(4);
      setTimeout(() => {
        sessionStorage.setItem('contextpilot_intro_done', 'true');
        setIntroCompleted(true);
      }, 500);
    }, 1800);

    const dismissIntro = () => {
      sessionStorage.setItem('contextpilot_intro_done', 'true');
      setIntroCompleted(true);
      window.scrollTo(0, 0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        dismissIntro();
      }
    };

    // Any manual wheel or touch immediately dismisses the intro cleanly
    const handleScrollAttempt = () => {
      dismissIntro();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleScrollAttempt, { passive: true });
    window.addEventListener('touchmove', handleScrollAttempt, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleScrollAttempt);
      window.removeEventListener('touchmove', handleScrollAttempt);
    };
  }, [introCompleted, setIntroCompleted]);

  const handleSkip = () => {
    sessionStorage.setItem('contextpilot_intro_done', 'true');
    setIntroCompleted(true);
    window.scrollTo(0, 0);
  };

  if (introCompleted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#090B10] flex flex-col items-center justify-center overflow-hidden select-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 4 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleSkip}
      >
        {/* Subtle Ambient Particle Field */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cobalt-light"
              style={{
                top: `${(i * 19) % 100}%`,
                left: `${(i * 31) % 100}%`,
                opacity: 0.2 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>

        {/* Center Point of Light & Pulse */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="w-2 h-2 rounded-full bg-cobalt shadow-[0_0_30px_#4267FF]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage >= 1 ? [1, 6, 25] : [0, 1.2],
              opacity: stage >= 1 ? [1, 0.7, 0] : [0, 1],
            }}
            transition={{
              duration: stage >= 1 ? 0.9 : 0.4,
              ease: 'easeOut',
            }}
          />
        </div>

        {/* Brand Reveal Typography */}
        <div className="relative z-10 flex flex-col items-center text-center mt-6 px-6">
          <div className="flex items-center gap-3 overflow-hidden">
            {stage >= 1 && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white"
              >
                CONTEXT
              </motion.h1>
            )}

            {stage >= 2 && (
              <motion.h1
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint"
              >
                PILOT
              </motion.h1>
            )}
          </div>

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
                PRIVATE ON-DEVICE AI COPROCESSOR
              </span>
            </motion.div>
          )}
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-widest text-white/60 hover:text-white transition-all backdrop-blur-md z-20"
        >
          <span>ENTER</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">ESC / SCROLL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicIntro;
