import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { Layout } from 'lucide-react';
const TYPING_SPEED = 20;
const TypewriterText = ({ text, delay = 0, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        let i = 0;
        const t = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayed(text.substring(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    if (onComplete)
                        onComplete();
                }
            }, TYPING_SPEED);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(t);
    }, [text, delay, onComplete]);
    return _jsx("span", { children: displayed });
};
export default function LaptopExecution() {
    const [step, setStep] = useState(0);
    return (_jsxs("div", { className: "w-full max-w-2xl flex flex-col items-center", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(Layout, { className: "w-6 h-6 text-gray-400" }), _jsx("h2", { className: "text-lg font-light text-white tracking-widest uppercase", children: "Target Application" })] }), _jsxs(GlassPanel, { className: "w-full overflow-hidden bg-[#0d1117] border-[#30363d] p-0", animate: false, children: [_jsxs("div", { className: "h-8 bg-[#161b22] border-b border-[#30363d] flex items-center px-4 gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-[#ff5f56]" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-[#ffbd2e]" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-[#27c93f]" }), _jsx("div", { className: "ml-4 text-[10px] font-sans text-gray-400", children: "Issue Tracker \u2014 Create New" })] }), _jsxs("div", { className: "p-6 flex flex-col gap-5 font-sans", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Title" }), _jsxs("div", { className: "h-10 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-200", children: [_jsx(TypewriterText, { text: "AUTH-502: Production Authentication Failure After Deployment 8.2", delay: 500, onComplete: () => setStep(1) }), step === 0 && _jsx(motion.span, { animate: { opacity: [0, 1, 0] }, transition: { repeat: Infinity }, className: "w-1.5 h-4 bg-cyan-400 ml-1" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Priority" }), _jsx("div", { className: "h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm", children: step >= 1 && (_jsxs(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-red-500" }), _jsx("span", { className: "text-red-400", children: "P1 - Critical" })] })) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Component" }), _jsx("div", { className: "h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-300", children: step >= 1 && _jsx(TypewriterText, { text: "Authentication", delay: 0, onComplete: () => setStep(2) }) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Environment" }), _jsx("div", { className: "h-9 bg-[#0d1117] border border-[#30363d] rounded px-3 flex items-center text-sm text-gray-300", children: step >= 2 && _jsx(TypewriterText, { text: "Production", delay: 0, onComplete: () => setStep(3) }) })] })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Description" }), _jsx("div", { className: "h-24 bg-[#0d1117] border border-[#30363d] rounded p-3 text-sm text-gray-400 leading-relaxed", children: step >= 3 && _jsx(TypewriterText, { text: "Users reporting generic login failure after 8.2 push. Error logs show AUTH-502. Needs immediate rollback or hotfix.", delay: 0, onComplete: () => setStep(4) }) })] }), _jsx("div", { className: "mt-4 flex justify-end", children: _jsx(motion.div, { className: `px-6 py-2 rounded text-sm font-bold transition-colors ${step >= 4 ? 'bg-[#238636] text-white cursor-pointer' : 'bg-[#21262d] text-gray-500'}`, animate: step >= 4 ? { scale: [1, 1.05, 1], boxShadow: ['0 0 0px rgba(35,134,54,0)', '0 0 15px rgba(35,134,54,0.5)', '0 0 0px rgba(35,134,54,0)'] } : {}, transition: { duration: 1 }, children: "Create Issue" }) })] })] })] }));
}
