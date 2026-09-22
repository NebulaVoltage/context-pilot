import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceScene from '@/components/three/DeviceScene';
import BrandButton from '@/components/ui/BrandButton';
import { Cpu, Sparkles, Smartphone, Maximize2, RotateCw } from 'lucide-react';
import { useSimulation } from '@/store/simulation';
import { useCameraStore } from '@/store/camera';
const IQOO15_SPECS = [
    { label: 'DISPLAY', val: '6.85" 2K 144Hz LTPO AMOLED', desc: '4500 nits peak brightness, 3200Hz PWM dimming', color: 'text-white' },
    { label: 'PRIMARY CHIPSET', val: 'SNAPDRAGON 8 ELITE GEN 5', desc: '3nm architecture with dedicated Hexagon NPU', color: 'text-violet' },
    { label: 'COPROCESSOR', val: 'iQOO Q3 SUPERCOMPUTING CHIP', desc: 'On-device SLM matrix acceleration & rendering engine', color: 'text-cobalt-light' },
    { label: 'LOCAL SLM INFERENCE', val: '1.7B QUANTIZED MODEL', desc: 'INT8 weights running completely on-device [PROTOTYPE SCENARIO]', color: 'text-cyan-300' },
    { label: 'FIRST-TOKEN LATENCY', val: '14.8 ms', desc: 'Zero network handshake delay', color: 'text-mint' },
    { label: 'THERMAL SYSTEM', val: '3D VAPOR CHAMBER COOLING', desc: 'Nominal 31°C under sustained local inference', color: 'text-mint' },
    { label: 'CLOUD TRAFFIC', val: '0 BYTES', desc: 'Air-gapped data enclave [HARDWARE ENFORCED]', color: 'text-emerald-400' },
    { label: 'OPERATING SYSTEM', val: 'OriginOS 6', desc: 'Deep ContextPilot hardware enclave integration', color: 'text-violet-light' },
];
export const HardwarePage = () => {
    const navigate = useNavigate();
    const { phoneVariant, setPhoneVariant, focusDevice, setFocusDevice } = useSimulation();
    const { setCameraPreset } = useCameraStore();
    const [activeTab, setActiveTab] = useState('overview');
    const handlePhoneFocus = () => {
        if (focusDevice === 'phone') {
            setFocusDevice('none');
            setCameraPreset('hero');
        }
        else {
            setFocusDevice('phone');
            setCameraPreset('phone');
        }
    };
    return (_jsx("div", { className: "w-full min-h-screen bg-[#07080C] text-white pt-28 pb-20 px-6 md:px-12 select-none", children: _jsxs("div", { className: "max-w-7xl mx-auto w-full", children: [_jsxs("div", { className: "border-b border-white/10 pb-8 mb-12", children: [_jsxs("div", { className: "flex items-center gap-3 font-display text-xs tracking-widest text-cyan-400 uppercase mb-3 font-bold", children: [_jsx(Smartphone, { className: "w-4 h-4 text-cyan-400" }), _jsx("span", { children: "/04 HARDWARE INSTRUMENTATION" }), _jsx("span", { className: "text-white/20", children: "\u2022" }), _jsx("span", { className: "text-white/60", children: "iQOO 15 FLAGSHIP AI COPROCESSOR" })] }), _jsxs("h1", { className: "font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] mb-4", children: ["THE INTELLIGENCE", _jsx("br", {}), "IS ALREADY", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cobalt to-violet", children: "IN YOUR POCKET." })] }), _jsx("p", { className: "text-base sm:text-xl text-white/70 font-sans max-w-xl leading-relaxed", children: "The iQOO 15 is not merely a smartphone. It is a high-performance hardware enclave with dual silicon (Snapdragon 8 Elite Gen 5 + Q3 Chip) capable of running local AI workloads in total privacy." })] }), _jsxs("div", { className: "relative w-full h-[580px] rounded-3xl bg-[#090B10] border border-white/15 overflow-hidden mb-16 shadow-2xl flex flex-col justify-between p-6", children: [_jsx("div", { className: "absolute inset-0", children: _jsx(DeviceScene, {}) }), _jsxs("div", { className: "relative z-20 flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 bg-[#07080C]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-mono", children: [_jsx("span", { className: "text-white/50 uppercase", children: "iQOO 15 EDITION:" }), _jsx("span", { className: "text-cyan-400 font-bold uppercase", children: phoneVariant })] }), _jsx("div", { className: "flex items-center gap-2 bg-[#07080C]/85 backdrop-blur-md p-1.5 rounded-full border border-white/15", children: [
                                        { id: 'legend', label: 'LEGEND (WHITE)', badge: 'bg-gradient-to-r from-red-500 via-blue-600 to-cyan-400' },
                                        { id: 'alpha', label: 'ALPHA (STEALTH BLACK)', badge: 'bg-gray-800' },
                                        { id: 'apex', label: 'APEX (CYAN METALLIC)', badge: 'bg-cyan-500' },
                                    ].map((variant) => (_jsxs("button", { onClick: () => setPhoneVariant(variant.id), className: `px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${phoneVariant === variant.id
                                            ? 'bg-blue-600 text-white shadow-lg border border-blue-400'
                                            : 'text-white/50 hover:text-white hover:bg-white/10'}`, children: [_jsx("span", { className: `w-2.5 h-2.5 rounded-full ${variant.badge}` }), variant.label] }, variant.id))) })] }), _jsxs("div", { className: "relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none", children: [_jsxs("div", { className: "bg-[#07080C]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-white/70 flex items-center gap-2", children: [_jsx(RotateCw, { className: "w-3.5 h-3.5 text-cyan-400 animate-spin", style: { animationDuration: '6s' } }), _jsx("span", { children: "DRAG PHONE TO ROTATE 360\u00B0 \u2022 HOVER FOR POINT LIGHT" })] }), _jsxs("button", { onClick: handlePhoneFocus, className: "pointer-events-auto px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-lg", children: [_jsx(Maximize2, { className: "w-3.5 h-3.5" }), focusDevice === 'phone' ? 'RESET CAMERA PRESET' : 'INSPECT iQOO 15 CLOSE-UP'] })] })] }), _jsxs("div", { className: "mb-20", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-4 mb-8", children: [_jsxs("div", { className: "text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2", children: [_jsx(Cpu, { className: "w-4 h-4 text-cyan-400" }), _jsx("span", { children: "iQOO 15 SILICON ARCHITECTURE & BENCHMARKS" })] }), _jsx("div", { className: "flex gap-2", children: ['overview', 'specs', 'enclave'].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-3 py-1 rounded-full text-xs font-mono uppercase transition-all ${activeTab === tab
                                            ? 'bg-white text-black font-bold'
                                            : 'text-white/40 hover:text-white/80'}`, children: tab }, tab))) })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans", children: IQOO15_SPECS.map((item) => (_jsxs("div", { className: "p-6 rounded-2xl bg-[#090B10] border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] duration-200", children: [_jsx("div", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5", children: item.label }), _jsx("div", { className: `font-display text-xl sm:text-2xl font-bold tracking-tight mb-2 ${item.color}`, children: item.val }), _jsx("p", { className: "text-xs font-mono text-white/50 leading-relaxed", children: item.desc })] }, item.label))) })] }), _jsxs("div", { className: "p-10 rounded-3xl bg-gradient-to-r from-[#0C0E18] via-[#090B10] to-[#120F24] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl", children: [_jsxs("div", { children: [_jsxs("span", { className: "font-mono text-xs text-mint font-bold uppercase tracking-wider flex items-center gap-2", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), " LIVE SIMULATION READY"] }), _jsx("h3", { className: "font-display text-2xl sm:text-3xl font-bold text-white mt-1", children: "EXPERIENCE THE 12-STATE PIPELINE" }), _jsx("p", { className: "text-white/60 text-sm font-sans mt-1", children: "Watch how the iQOO 15 handles real incident remediation locally without cloud latency." })] }), _jsx(BrandButton, { variant: "primary", size: "lg", onClick: () => navigate('/demo'), className: "flex-shrink-0 shadow-[0_0_30px_rgba(66,103,255,0.5)]", children: "RUN LIVE DEMO" })] })] }) }));
};
export default HardwarePage;
