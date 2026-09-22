import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { INCIDENT_TEXT } from '@/data/mockData';
import GlassPanel from '@/components/ui/GlassPanel';
import { Mail, CheckCircle2, FileText } from 'lucide-react';
export default function CaptureStep() {
    const [highlighted, setHighlighted] = useState(false);
    const [captured, setCaptured] = useState(false);
    useEffect(() => {
        const t1 = setTimeout(() => setHighlighted(true), 1000);
        const t2 = setTimeout(() => setCaptured(true), 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);
    return (_jsxs("div", { className: "w-full max-w-2xl flex flex-col items-center gap-8", children: [_jsxs(GlassPanel, { className: "w-full p-6 relative overflow-hidden", animate: false, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4 border-b border-gray-800 pb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center", children: _jsx(Mail, { className: "w-5 h-5 text-gray-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-gray-200", children: "Production Support" }), _jsx("div", { className: "text-xs text-gray-500", children: "FW: Urgent: Production Authentication Failure" })] })] }), _jsxs("div", { className: "relative text-sm text-gray-300 leading-relaxed font-sans z-10", children: [_jsx(motion.div, { className: "absolute top-0 left-0 bottom-0 bg-cyan-500/30 rounded z-[-1]", initial: { width: 0 }, animate: { width: highlighted ? '100%' : 0 }, transition: { duration: 1.2, ease: "easeInOut" } }), _jsx("span", { className: highlighted ? "text-white" : "", children: INCIDENT_TEXT })] })] }), _jsxs("div", { className: "h-16 flex items-center justify-center relative w-full", children: [_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8, y: -20 }, animate: {
                            opacity: captured ? 1 : 0,
                            scale: captured ? 1 : 0.8,
                            y: captured ? 0 : -20
                        }, transition: { duration: 0.4, type: 'spring' }, className: "flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-full font-mono text-xs z-10", children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), "CONTEXT CAPTURED"] }), captured && (_jsx(motion.div, { initial: { x: -100, opacity: 0 }, animate: { x: 300, opacity: [0, 1, 1, 0] }, transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }, className: "absolute left-1/2 -ml-4 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center", children: _jsx(FileText, { className: "w-4 h-4 text-cyan-400" }) }))] })] }));
}
