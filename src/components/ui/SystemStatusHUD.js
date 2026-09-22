import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import { Cpu, ShieldCheck, Link2, WifiOff, Smartphone } from 'lucide-react';
export const SystemStatusHUD = () => {
    const location = useLocation();
    const { state, officeKitConnected, toggleOfficeKit, presentationMode, confidence, getTrustPolicy } = useSimulation();
    const policy = getTrustPolicy(confidence);
    // Show technical HUD only on technical pages (/system, /demo, /hardware)
    const isTechnicalRoute = ['/system', '/demo', '/hardware'].includes(location.pathname);
    if (!isTechnicalRoute || presentationMode)
        return null;
    return (_jsxs(motion.aside, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, "aria-label": "System hardware diagnostics", className: "fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-4 bg-[#0C0E14]/90 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-2xl shadow-2xl font-mono text-[11px] select-none pointer-events-auto", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-white/10", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-cobalt" })] }), _jsxs("span", { className: "text-white/60 font-medium", children: ["SYS: ", _jsx("span", { className: "text-white font-bold", children: "ONLINE" })] })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-white/60 pr-3 border-r border-white/10", children: [_jsx(Smartphone, { className: "w-3.5 h-3.5 text-cobalt-light" }), _jsx("span", { className: "text-white", children: "iQOO NPU" })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-white/60 pr-3 border-r border-white/10", children: [_jsx(Cpu, { className: "w-3.5 h-3.5 text-violet" }), _jsx("span", { children: "INF:" }), _jsx("span", { className: state === 'inference' ? 'text-violet animate-pulse font-bold' : 'text-white', children: state === 'inference' ? 'COMPUTING' : 'LOCAL' })] }), _jsx("button", { onClick: toggleOfficeKit, title: "Click to toggle Office Kit connection", className: `flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all ${officeKitConnected
                    ? 'bg-cobalt/15 border-cobalt/40 text-cobalt-light hover:border-cobalt'
                    : 'bg-coral/15 border-coral/40 text-coral hover:border-coral'}`, children: officeKitConnected ? (_jsxs(_Fragment, { children: [_jsx(Link2, { className: "w-3 h-3 text-cobalt" }), _jsx("span", { className: "font-bold tracking-wider text-[10px]", children: "OFFICE KIT: LINKED" })] })) : (_jsxs(_Fragment, { children: [_jsx(WifiOff, { className: "w-3 h-3 text-coral" }), _jsx("span", { className: "font-bold tracking-wider text-[10px]", children: "OFFICE KIT: OFF" })] })) }), _jsxs("div", { className: "flex items-center gap-1.5 text-white/60 pl-1", children: [_jsx(ShieldCheck, { className: `w-3.5 h-3.5 ${policy === 'auto' ? 'text-mint' : 'text-amber-warm'}` }), _jsx("span", { children: "TRUST:" }), _jsx("span", { className: `font-bold ${policy === 'auto' ? 'text-mint' : 'text-amber-warm'}`, children: policy.toUpperCase() })] })] }));
};
export default SystemStatusHUD;
