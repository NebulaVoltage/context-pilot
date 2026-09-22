import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSimulation } from '@/store/simulation';
import GlassPanel from '@/components/ui/GlassPanel';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, AlertTriangle, Ban } from 'lucide-react';
export default function ConfidenceSlider() {
    const { confidence, setConfidence, getTrustPolicy } = useSimulation();
    const policy = getTrustPolicy(confidence);
    const getPolicyStyles = () => {
        switch (policy) {
            case 'auto':
                return {
                    border: 'border-mint/50',
                    text: 'text-mint',
                    bg: 'bg-mint/10',
                    shadow: 'shadow-[0_0_20px_rgba(55,214,161,0.2)]',
                    label: 'AUTO EXECUTE',
                    desc: 'High confidence. System authorizes autonomous target execution.',
                    icon: ShieldCheck
                };
            case 'assisted':
                return {
                    border: 'border-cobalt/50',
                    text: 'text-cobalt-light',
                    bg: 'bg-cobalt/10',
                    shadow: 'shadow-[0_0_20px_rgba(56,103,255,0.2)]',
                    label: 'ASSISTED EXECUTION',
                    desc: 'Medium confidence. Fields pre-populated for single-click review.',
                    icon: ShieldCheck
                };
            case 'confirm':
                return {
                    border: 'border-amber-warm/50',
                    text: 'text-amber-warm',
                    bg: 'bg-amber-warm/10',
                    shadow: 'shadow-[0_0_20px_rgba(244,184,96,0.2)]',
                    label: 'USER CONFIRMATION',
                    desc: 'Ambiguity detected. System halts and prompts for manual approval.',
                    icon: AlertTriangle
                };
            case 'blocked':
                return {
                    border: 'border-coral/50',
                    text: 'text-coral',
                    bg: 'bg-coral/10',
                    shadow: 'shadow-[0_0_20px_rgba(255,107,107,0.2)]',
                    label: 'ACTION BLOCKED',
                    desc: 'Confidence below minimum safety threshold. Execution blocked.',
                    icon: Ban
                };
            default:
                return {
                    border: 'border-white/10',
                    text: 'text-white/60',
                    bg: 'bg-white/5',
                    shadow: '',
                    label: 'EVALUATING',
                    desc: '',
                    icon: ShieldAlert
                };
        }
    };
    const currentPolicy = getPolicyStyles();
    const Icon = currentPolicy.icon;
    const SCENARIOS = [
        { label: '94% AUTO', value: 94.2, color: 'hover:border-mint text-mint' },
        { label: '75% ASST', value: 75.0, color: 'hover:border-cobalt text-cobalt-light' },
        { label: '63% CONF', value: 63.0, color: 'hover:border-amber-warm text-amber-warm' },
        { label: '30% BLK', value: 30.0, color: 'hover:border-coral text-coral' },
    ];
    return (_jsxs(GlassPanel, { className: `p-5 flex flex-col gap-4 transition-all duration-300 border ${currentPolicy.border} bg-ink-900/80`, children: [_jsxs("div", { className: "flex justify-between items-end pb-2 border-b border-white/10", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-xs font-mono font-bold text-white tracking-wider", children: "TRUST THRESHOLD" }), _jsx("span", { className: "text-[10px] font-mono text-white/40", children: "GOVERNANCE ENGINE" })] }), _jsx("div", { className: "text-right", children: _jsxs("span", { className: `text-xl font-mono font-bold ${currentPolicy.text}`, children: [confidence.toFixed(1), "%"] }) })] }), _jsx("div", { className: "grid grid-cols-4 gap-1.5 pt-1", children: SCENARIOS.map((sc) => (_jsx("button", { onClick: () => setConfidence(sc.value), className: `py-1 px-1 rounded text-[9px] font-mono border transition-all duration-150 ${Math.abs(confidence - sc.value) < 4
                        ? 'bg-white/15 border-white/40 font-bold text-white'
                        : 'bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/[0.08]'} ${sc.color}`, children: sc.label }, sc.label))) }), _jsxs("div", { className: "space-y-2", children: [_jsx("input", { type: "range", min: "0", max: "100", step: "0.5", value: confidence, onChange: (e) => setConfidence(parseFloat(e.target.value)), className: "w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cobalt hover:accent-violet transition-colors", "aria-label": "Model Confidence Threshold" }), _jsxs("div", { className: "flex justify-between text-[9px] font-mono text-white/40", children: [_jsx("span", { children: "0% REJECT" }), _jsx("span", { className: "text-amber-warm", children: "55% CONFIRM" }), _jsx("span", { className: "text-cobalt", children: "70% ASSIST" }), _jsx("span", { className: "text-mint", children: "90% AUTO" })] })] }), _jsxs(motion.div, { layout: true, className: `p-3 rounded-xl border flex items-start gap-3 transition-colors duration-300 ${currentPolicy.bg} ${currentPolicy.border} ${currentPolicy.shadow}`, children: [_jsx(Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${currentPolicy.text}` }), _jsxs("div", { children: [_jsx("div", { className: `text-xs font-mono font-bold tracking-wider ${currentPolicy.text}`, children: currentPolicy.label }), _jsx("div", { className: "text-[10px] text-white/60 leading-tight mt-0.5", children: currentPolicy.desc })] })] })] }));
}
