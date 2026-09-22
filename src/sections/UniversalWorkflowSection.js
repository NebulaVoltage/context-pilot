import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ArrowRight, CheckSquare, FileText, Mail, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/store/simulation';
const DESTINATIONS = [
    {
        id: 'jira',
        name: 'SUPPORT → JIRA',
        action: 'CREATE ISSUE',
        icon: CheckSquare,
        accent: 'bg-cobalt text-white border-cobalt shadow-[0_0_20px_rgba(56,103,255,0.4)]',
        borderAccent: 'border-cobalt',
        fields: ['Project: CORE-AUTH', 'Issue Type: Bug', 'Priority: P1 - Blocker', 'Component: Authentication']
    },
    {
        id: 'servicenow',
        name: 'INCIDENT → SERVICENOW',
        action: 'LOG INCIDENT',
        icon: Briefcase,
        accent: 'bg-mint text-black border-mint shadow-[0_0_20px_rgba(0,229,255,0.4)]',
        borderAccent: 'border-mint',
        fields: ['Caller: Monitored Service', 'Category: Authentication Failure', 'Impact: P1 Enterprise']
    },
    {
        id: 'notion',
        name: 'MEETING → NOTION',
        action: 'CREATE SPEC PAGE',
        icon: FileText,
        accent: 'bg-violet text-white border-violet shadow-[0_0_20px_rgba(122,92,255,0.4)]',
        borderAccent: 'border-violet',
        fields: ['Database: Incident Postmortems', 'Status: Drafted', 'Owner: Tech Lead On-Call']
    },
    {
        id: 'crm',
        name: 'CUSTOMER → CRM',
        action: 'UPDATE RECORD',
        icon: Briefcase,
        accent: 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
        borderAccent: 'border-amber-500',
        fields: ['Account: Enterprise Tier 1', 'Status: Incident Mitigated', 'Touchpoint: Auth-502 Fix']
    },
    {
        id: 'gmail',
        name: 'EMAIL → GMAIL',
        action: 'DRAFT RESPONSE',
        icon: Mail,
        accent: 'bg-rose-500 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]',
        borderAccent: 'border-rose-500',
        fields: ['Recipient: enterprise-support@client.com', 'Subject: Resolution: 502 Login Restored']
    },
];
export const UniversalWorkflowSection = () => {
    const { selectedDestination, setSelectedDestination } = useSimulation();
    const [activeId, setActiveId] = useState(selectedDestination || 'jira');
    const currentApp = DESTINATIONS.find(d => d.id === activeId) || DESTINATIONS[0];
    const Icon = currentApp.icon;
    const handleSelect = (id) => {
        setActiveId(id);
        setSelectedDestination(id);
    };
    return (_jsxs("section", { id: "workflow", className: "relative min-h-screen bg-[#07080C] text-white flex flex-col justify-between px-6 md:px-12 py-28 overflow-hidden select-none border-t border-white/10", children: [_jsxs("div", { className: "max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-6 mb-16", children: [_jsxs("div", { className: "flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase", children: [_jsx("span", { className: "font-bold text-cobalt", children: "/07" }), _jsx("span", { children: "CROSS-APPLICATION ROUTING" })] }), _jsx("div", { className: "font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase", children: "SINGLE SEMANTIC SOURCE OF TRUTH" })] }), _jsxs("div", { className: "relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 25 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "mb-14", children: [_jsxs("h2", { className: "font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[0.95] max-w-4xl mb-4", children: ["UNDERSTAND ONCE.", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint", children: "ACT ANYWHERE." })] }), _jsx("p", { className: "text-base sm:text-xl text-white/70 font-normal max-w-xl font-sans leading-relaxed", children: "The same semantic capsule translates deterministically into whatever host software your team uses." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-center", children: [_jsx("div", { className: "lg:col-span-5 flex flex-wrap gap-3", children: DESTINATIONS.map((app) => {
                                    const isSelected = activeId === app.id;
                                    const AppIcon = app.icon;
                                    return (_jsxs("button", { onClick: () => handleSelect(app.id), className: `px-5 py-3.5 rounded-2xl font-mono text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-3 border cursor-pointer ${isSelected
                                            ? `${app.accent} scale-105 shadow-xl`
                                            : 'bg-[#0C0E14] text-white/70 border-white/10 hover:border-white/30 hover:text-white hover:bg-[#121520]'}`, children: [_jsx(AppIcon, { className: "w-4 h-4" }), _jsx("span", { children: app.name }), isSelected && _jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-pulse" })] }, app.id));
                                }) }), _jsx("div", { className: "lg:col-span-7", children: _jsxs("div", { className: "p-8 md:p-10 rounded-3xl bg-[#0C0E14] border border-white/15 shadow-2xl relative overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono", children: [_jsxs("div", { className: "flex items-center gap-2 text-white/70", children: [_jsx(Box, { className: "w-4 h-4 text-cobalt" }), _jsx("span", { className: "font-bold", children: "CORE CONTEXT CAPSULE" })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-mint font-bold", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "DYNAMIC RE-SCHEMA" })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6 my-4", children: [_jsxs("div", { className: "p-5 rounded-2xl bg-[#07080C] border border-white/10 w-full sm:w-1/2", children: [_jsx("div", { className: "text-[10px] font-mono text-white/40 uppercase mb-2", children: "SOURCE CAPSULE" }), _jsxs("div", { className: "font-mono text-xs space-y-1.5 text-white/80", children: [_jsxs("div", { children: ["intent: ", _jsx("span", { className: "text-cobalt font-bold", children: "\"auth-incident\"" })] }), _jsxs("div", { children: ["env: ", _jsx("span", { className: "text-white font-bold", children: "\"production\"" })] }), _jsxs("div", { children: ["version: ", _jsx("span", { className: "text-white font-bold", children: "\"8.2\"" })] }), _jsxs("div", { children: ["severity: ", _jsx("span", { className: "text-rose-400 font-bold", children: "\"p1\"" })] })] })] }), _jsx("div", { className: "flex-shrink-0", children: _jsx(ArrowRight, { className: "w-6 h-6 text-cobalt transform sm:rotate-0 rotate-90" }) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 15 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -15 }, transition: { duration: 0.3 }, className: `p-5 rounded-2xl border ${currentApp.borderAccent} bg-[#07080C] w-full sm:w-1/2`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase font-semibold", children: currentApp.name }), _jsx("span", { className: "text-[10px] font-mono font-bold text-mint", children: currentApp.action })] }), _jsx("div", { className: "font-mono text-xs space-y-1.5 text-white/90 font-medium", children: currentApp.fields.map((f, i) => (_jsxs("div", { className: "truncate text-white", children: ["\u21B3 ", f] }, i))) })] }, currentApp.id) })] }), _jsxs("div", { className: "mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono", children: [_jsx("span", { className: "text-white/60", children: "Execution payload ready for host OS" }), _jsxs("span", { className: "text-mint font-bold flex items-center gap-1.5", children: [_jsx(CheckCircle2, { className: "w-3.5 h-3.5" }), " 100% COMPATIBLE"] })] })] }) })] })] }), _jsxs("div", { className: "max-w-7xl mx-auto w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40", children: [_jsx("span", { children: "\u201CONE CONTEXT. MANY DESTINATIONS.\u201D" }), _jsx("span", { children: "ZERO MANUAL RE-PARSING ACROSS WORKSPACES" })] })] }));
};
export default UniversalWorkflowSection;
