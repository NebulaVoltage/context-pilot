import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
import { RotateCcw, Laptop, Smartphone, ArrowRight } from 'lucide-react';
export const CinematicEnding = () => {
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
    return (_jsxs("footer", { id: "ending", className: "relative w-full min-h-screen bg-ink text-white flex flex-col justify-between px-6 md:px-12 py-32 overflow-hidden select-none border-t border-white/10", children: [_jsxs("div", { className: "max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16", children: [_jsxs("div", { className: "flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase", children: [_jsx("span", { className: "font-bold text-cobalt", children: "/07" }), _jsx("span", { children: "NARRATIVE REPRISE" })] }), _jsx("div", { className: "font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase", children: "THE COMPLETED LOOP" })] }), _jsxs("div", { className: "relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center my-auto", children: [_jsxs("div", { className: "w-full max-w-md flex items-center justify-between mb-16 px-4", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg", children: _jsx(Laptop, { className: "w-6 h-6 text-white/60" }) }), _jsx("span", { className: "text-[10px] font-mono text-white/40 tracking-wider", children: "WORKSPACE" })] }), _jsx("div", { className: "flex-1 h-0.5 bg-white/10 mx-6 relative overflow-hidden rounded-full", children: _jsx(motion.div, { className: "absolute top-0 bottom-0 w-24 bg-gradient-to-r from-cobalt via-violet to-mint shadow-[0_0_20px_rgba(138,99,255,0.9)]", animate: {
                                        x: pulseMoving ? ['-100%', '500%', '-100%'] : ['-100%', '400%'],
                                    }, transition: {
                                        duration: pulseMoving ? 1.2 : 3,
                                        repeat: pulseMoving ? 0 : Infinity,
                                        ease: 'easeInOut',
                                    } }) }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl border transition-all duration-300 flex items-center justify-center ${phoneLit
                                            ? 'bg-violet/30 border-violet shadow-[0_0_35px_rgba(138,99,255,0.9)] scale-110'
                                            : 'bg-white/5 border-white/10 shadow-lg'}`, children: _jsx(Smartphone, { className: `w-6 h-6 transition-colors ${phoneLit ? 'text-white' : 'text-violet'}` }) }), _jsx("span", { className: "text-[10px] font-mono text-violet tracking-wider", children: "INTELLIGENCE" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }, className: "mb-8", children: _jsxs("h2", { className: "font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.95]", children: ["THE COMPUTER", _jsx("br", {}), "REMAINS THE WORKSPACE.", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint", children: "THE PHONE BECOMES THE COPROCESSOR." })] }) }), _jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.3 }, className: "space-y-3 mb-12", children: [_jsx("div", { className: "font-mono text-sm tracking-[0.3em] font-bold text-white uppercase", children: "CONTEXT PILOT\u00AE" }), _jsx("div", { className: "font-mono text-xs tracking-[0.25em] text-white/50 uppercase", children: "PRIVATE ON-DEVICE AI COPROCESSOR" }), _jsx("div", { className: "font-mono text-[11px] tracking-widest text-white/40 pt-2", children: "PHONE / INTELLIGENCE \u2022 COMPUTER / WORKSPACE \u2022 OFFICE KIT / BRIDGE" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.5 }, children: _jsxs("button", { onClick: handleRunAgain, className: "px-10 py-4 rounded-full font-display text-xs font-extrabold uppercase tracking-wider bg-cobalt hover:bg-cobalt-light text-white active:scale-[0.98] transition-all duration-200 flex items-center gap-3 shadow-[0_0_35px_rgba(56,103,255,0.6)] cursor-pointer", children: [_jsx(RotateCcw, { className: "w-4 h-4 text-cyan-300" }), _jsx("span", { className: "text-white", children: "RUN THE SYSTEM AGAIN" }), _jsx(ArrowRight, { className: "w-4 h-4 text-cyan-300" })] }) })] }), _jsxs("div", { className: "max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40", children: [_jsx("span", { children: "\u00A9 2026 CONTEXT PILOT. ALL RIGHTS RESERVED." }), _jsx("span", { children: "iQOO ON-DEVICE AI HACKATHON PROTOTYPE" })] })] }));
};
export default CinematicEnding;
