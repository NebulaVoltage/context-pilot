import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckSquare, FileText, Mail, Briefcase, Database } from 'lucide-react';
const WORKFLOW_PROJECTS = [
    {
        num: '01',
        flow: 'SUPPORT → JIRA',
        action: 'BUG CREATED & VERIFIED',
        desc: 'Customer support email decomposes into a validated P1 Jira bug ticket with complete log evidence and auto-assigned owner.',
        icon: CheckSquare,
        color: 'text-cobalt',
        borderColor: 'border-cobalt/40',
        tag: 'JIRA SOFTWARE',
        metrics: '7 Fields Filled • 1.8s Execution',
    },
    {
        num: '02',
        flow: 'INCIDENT → SERVICENOW',
        action: 'CRITICAL TICKET LOGGED',
        desc: 'Production alert thread in Slack triggers verified ServiceNow ITIL incident record creation without human tab switching.',
        icon: Briefcase,
        color: 'text-mint',
        borderColor: 'border-mint/40',
        tag: 'SERVICENOW ITIL',
        metrics: 'P1 Severity • SRE On-Call Notified',
    },
    {
        num: '03',
        flow: 'THREAD → NOTION',
        action: 'POSTMORTEM CREATED',
        desc: 'Multi-party discussion collapses into a structured postmortem workspace doc complete with chronological incident timeline.',
        icon: FileText,
        color: 'text-violet',
        borderColor: 'border-violet/40',
        tag: 'NOTION WORKSPACE',
        metrics: '4 Key Decisions Synced • Zero Latency',
    },
    {
        num: '04',
        flow: 'FEEDBACK → CRM',
        action: 'ACCOUNT RECORD UPDATED',
        desc: 'Customer onboarding friction automatically enriches the Salesforce enterprise account record with root-cause context.',
        icon: Database,
        color: 'text-amber-warm',
        borderColor: 'border-amber-warm/40',
        tag: 'CRM SYSTEMS',
        metrics: 'Account Health Flagged • Customer Saved',
    },
    {
        num: '05',
        flow: 'COMPLAINT → GMAIL',
        action: 'EXECUTIVE DRAFT PREPARED',
        desc: 'Engineering resolution context transforms into a polished, technically grounded customer apology response draft ready for single-click dispatch.',
        icon: Mail,
        color: 'text-coral',
        borderColor: 'border-coral/40',
        tag: 'GMAIL CLIENT',
        metrics: '100% Truth Grounded • 0 Keystrokes',
    },
];
export const HorizontalShowcaseSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    // Finite, smooth travel clamped before the section ends
    const x = useTransform(scrollYProgress, [0, 0.85], ['0%', '-68%'], { clamp: true });
    return (_jsx("section", { ref: containerRef, className: "relative h-[220vh] bg-ink select-none", children: _jsxs("div", { className: "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-20 px-6 md:px-12", children: [_jsxs("div", { className: "max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-5 z-20", children: [_jsxs("div", { className: "flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase", children: [_jsx("span", { className: "font-bold text-cobalt", children: "/06" }), _jsx("span", { children: "CROSS-APPLICATION SHOWCASE" })] }), _jsx("div", { className: "font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase", children: "01 TO 05 HORIZONTAL STREAM" })] }), _jsxs("div", { className: "max-w-7xl mx-auto w-full z-20 pt-4", children: [_jsxs("h2", { className: "font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-2", children: ["ONE CONTEXT.", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint", children: "MANY DESTINATIONS." })] }), _jsx("p", { className: "text-white/60 text-xs sm:text-sm font-mono", children: "Scroll moves horizontally through universal workflow executions across enterprise software." })] }), _jsx("div", { className: "w-full flex-1 flex items-center overflow-hidden my-auto z-10", children: _jsx(motion.div, { style: { x }, className: "flex gap-8 sm:gap-12 pl-4 sm:pl-12 will-change-transform", children: WORKFLOW_PROJECTS.map((project) => {
                            const Icon = project.icon;
                            return (_jsxs("div", { className: `w-[85vw] sm:w-[580px] h-[360px] sm:h-[400px] flex-shrink-0 p-8 sm:p-10 rounded-3xl bg-ink-900 border ${project.borderColor} shadow-2xl flex flex-col justify-between group hover:border-white/40 transition-colors`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-mono text-2xl font-black text-white/30 group-hover:text-white transition-colors", children: project.num }), _jsx("span", { className: "font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70", children: project.tag })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Icon, { className: `w-6 h-6 ${project.color}` }), _jsx("h3", { className: "font-display text-2xl sm:text-3xl font-bold text-white tracking-tight", children: project.flow })] }), _jsx("div", { className: `font-mono text-xs font-bold tracking-wider mb-3 ${project.color}`, children: project.action }), _jsx("p", { className: "text-white/70 text-xs sm:text-sm leading-relaxed max-w-lg font-sans", children: project.desc })] }), _jsxs("div", { className: "pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40", children: [_jsx("span", { children: project.metrics }), _jsx(ArrowUpRight, { className: "w-4 h-4 text-white/40 group-hover:text-white transition-colors" })] })] }, project.num));
                        }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40 z-20", children: [_jsx("span", { children: "\u201CUNDERSTAND ONCE. ACT ANYWHERE.\u201D" }), _jsx("span", { children: "ENTERPRISE COPROCESSOR AGILITY" })] })] }) }));
};
export default HorizontalShowcaseSection;
