import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
import DeviceScene from '@/components/three/DeviceScene';
import BrandButton from '@/components/ui/BrandButton';
import { Smartphone, Link2, Cpu } from 'lucide-react';
export const HeroSection = () => {
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
        }
        else {
            setFocusDevice('phone');
            setCameraPreset('phone');
        }
    };
    return (_jsxs("section", { className: "relative min-h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-[#07080C] text-white", children: [_jsx("div", { className: "absolute inset-0 z-0", children: _jsx(DeviceScene, {}) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#07080C] via-transparent to-[#07080C]/40 pointer-events-none z-[1]" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#07080C]/90 via-[#07080C]/25 to-transparent pointer-events-none z-[1]" }), _jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none flex flex-col justify-center flex-1 pt-32 pb-16", children: _jsxs("div", { className: "max-w-2xl pointer-events-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, className: "mb-5 flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-wide", children: [_jsx("span", { className: "font-bold text-white tracking-widest", children: "CONTEXT PILOT\u00AE" }), _jsx("span", { className: "text-white/20", children: "\u2022" }), _jsx("span", { className: "text-cobalt font-semibold", children: "PRIVATE COMPUTING / 01" }), _jsx("span", { className: "text-white/20", children: "\u2022" }), _jsx("span", { className: "text-emerald-400 font-medium", children: "ON-DEVICE INFERENCE" })] }), _jsx("div", { className: "overflow-hidden mb-6", children: _jsxs(motion.h1, { initial: { y: '100%' }, animate: { y: '0%' }, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }, className: "font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-black tracking-tight text-white leading-[0.92]", children: ["COMPUTE", _jsx("br", {}), "SHOULD", _jsx("br", {}), "FOLLOW", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-softblue", children: "CONTEXT." })] }) }), _jsxs(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }, className: "text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-lg mb-8 font-sans", children: ["Your phone becomes the intelligence layer.", _jsx("br", {}), "Your computer remains the workspace."] }), _jsxs(motion.div, { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, className: "mb-8 flex items-center gap-3 bg-[#0C0E16]/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 w-fit", children: [_jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest pl-3 pr-1 hidden sm:inline", children: "VARIANT:" }), [
                                    { id: 'legend', label: 'LEGEND', color: 'bg-gradient-to-r from-red-500 via-blue-600 to-cyan-400' },
                                    { id: 'alpha', label: 'ALPHA', color: 'bg-gray-800' },
                                    { id: 'apex', label: 'APEX', color: 'bg-cyan-500' },
                                ].map((variant) => (_jsxs("button", { onClick: () => setPhoneVariant(variant.id), className: `px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${phoneVariant === variant.id
                                        ? 'bg-white/15 text-white border border-white/30 shadow-sm'
                                        : 'text-white/40 hover:text-white/80'}`, children: [_jsx("span", { className: `w-2 h-2 rounded-full ${variant.color}` }), variant.label] }, variant.id)))] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }, className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4", children: [_jsx(BrandButton, { variant: "secondary", size: "lg", onClick: handleExploreClick, children: "EXPLORE SYSTEM \u2192" }), _jsx(BrandButton, { variant: "primary", size: "lg", onClick: handleDemoClick, className: "shadow-[0_0_30px_rgba(66,103,255,0.5)]", children: "RUN LIVE DEMO \u2192" }), _jsxs("button", { onClick: handlePhoneToggle, className: "px-4 py-2 rounded-full text-xs font-mono text-white/50 hover:text-white transition-colors hidden lg:flex items-center gap-2 self-center border border-white/10 hover:border-white/30 bg-white/5", children: [_jsx(Smartphone, { className: "w-3.5 h-3.5 text-cyan-400" }), _jsx("span", { children: focusDevice === 'phone' ? 'RESET ANGLE' : 'INSPECT iQOO 15' })] })] })] }) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.0, delay: 0.7 }, className: "relative z-10 w-full border-t border-white/10 bg-[#07080C]/80 backdrop-blur-xl px-6 md:px-12 py-4", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Smartphone, { className: "w-4 h-4 text-cobalt" }), _jsx("span", { className: "font-bold text-white", children: "iQOO 15 FLAGSHIP" }), _jsx("span", { className: "text-white/40", children: "\u2014" }), _jsx("span", { className: "text-white/70 font-mono text-[11px]", children: "SNAPDRAGON 8 ELITE GEN 5" })] }), _jsx("div", { className: "hidden sm:block w-px h-3.5 bg-white/10" }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Cpu, { className: "w-4 h-4 text-violet" }), _jsx("span", { className: "font-bold text-white", children: "Q3 COPROCESSOR" }), _jsx("span", { className: "text-white/40", children: "\u2014" }), _jsx("span", { className: "text-white/70 font-mono text-[11px]", children: "LOCAL NPU ACCELERATION" })] }), _jsx("div", { className: "hidden sm:block w-px h-3.5 bg-white/10" }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Link2, { className: "w-4 h-4 text-mint" }), _jsx("span", { className: "font-bold text-white", children: "OFFICE KIT" }), _jsx("span", { className: "text-white/40", children: "\u2014" }), _jsx("span", { className: "text-white/70 font-mono text-[11px]", children: "AIR-GAPPED HARDWARE BRIDGE" })] })] }) })] }));
};
export default HeroSection;
