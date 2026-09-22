import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulation } from '@/store/simulation';
export const StatusIndicator = ({ className = '' }) => {
    const { state } = useSimulation();
    const statusConfig = useMemo(() => {
        switch (state) {
            case 'idle':
            case 'complete':
                return {
                    text: 'SYSTEM ONLINE • LOCAL INFERENCE READY',
                    color: 'bg-green-500',
                    pulse: 'animate-pulse'
                };
            case 'inference':
            case 'extraction':
                return {
                    text: 'NPU ACTIVE • PROCESSING',
                    color: 'bg-cyan-500',
                    pulse: 'animate-ping'
                };
            case 'transferToPhone':
            case 'transferToPC':
                return {
                    text: 'OFFICE KIT • TRANSFERRING',
                    color: 'bg-cyan-400',
                    pulse: 'animate-pulse'
                };
            case 'verification':
                return {
                    text: 'VERIFYING ACTION',
                    color: 'bg-purple-500',
                    pulse: 'animate-ping'
                };
            case 'capture':
                return {
                    text: 'CONTEXT CAPTURE • ACTIVE',
                    color: 'bg-amber-500',
                    pulse: 'animate-pulse'
                };
            case 'capsule':
            case 'trust':
            case 'planning':
                return {
                    text: 'AI REASONING • LOCAL',
                    color: 'bg-cyan-500',
                    pulse: 'animate-pulse'
                };
            case 'execution':
                return {
                    text: 'EXECUTING ACTION',
                    color: 'bg-green-400',
                    pulse: 'animate-ping'
                };
            default:
                return {
                    text: 'SYSTEM ONLINE • LOCAL INFERENCE READY',
                    color: 'bg-green-500',
                    pulse: 'animate-pulse'
                };
        }
    }, [state]);
    return (_jsxs("div", { className: `fixed top-6 right-6 flex items-center gap-3 bg-graphite-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-50 ${className}`, children: [_jsxs("div", { className: "relative flex h-2 w-2", children: [_jsx(motion.span, { className: `${statusConfig.pulse} absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.color}`, layoutId: "status-pulse" }), _jsx(motion.span, { className: `relative inline-flex rounded-full h-2 w-2 ${statusConfig.color}`, layoutId: "status-dot" })] }), _jsx("div", { className: "overflow-hidden", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.span, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "text-[10px] uppercase tracking-[0.2em] font-mono text-graphite-300 whitespace-nowrap block", children: statusConfig.text }, statusConfig.text) }) })] }));
};
export default StatusIndicator;
