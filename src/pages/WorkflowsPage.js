import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandButton from '@/components/ui/BrandButton';
import { ArrowUpRight, Box, ArrowRight, Sparkles } from 'lucide-react';
const WORKFLOWS = [
    {
        id: 'jira',
        num: '01',
        source: 'SUPPORT TICKET',
        destination: 'JIRA SOFTWARE',
        action: 'P1 CRITICAL BUG FILED',
        tag: 'ATLASSIAN JIRA',
        accent: 'text-cobalt',
        borderAccent: 'border-cobalt',
        metrics: '7 Fields Filled • 1.8s Execution',
        fields: [
            { label: 'Issue Type', value: 'Bug' },
            { label: 'Summary', value: 'Investigate Authentication Failure (AUTH-502)' },
            { label: 'Priority', value: 'P1 - Blocker' },
            { label: 'Component', value: 'Authentication' },
            { label: 'Environment', value: 'Production (Cluster EU-Central)' },
        ],
    },
    {
        id: 'servicenow',
        num: '02',
        source: 'SLACK THREAD',
        destination: 'SERVICENOW ITIL',
        action: 'MAJOR INCIDENT LOGGED',
        tag: 'ENTERPRISE ITSM',
        accent: 'text-mint',
        borderAccent: 'border-mint',
        metrics: 'P1 Severity • SRE On-Call Dispatched',
        fields: [
            { label: 'Incident State', value: 'New / Active' },
            { label: 'Configuration Item', value: 'Identity Gateway Service' },
            { label: 'Urgency', value: 'High' },
            { label: 'Assignment Group', value: 'SRE-Tier-1' },
        ],
    },
    {
        id: 'notion',
        num: '03',
        source: 'POSTMORTEM SYNC',
        destination: 'NOTION WORKSPACE',
        action: 'ROOT CAUSE DOC CREATED',
        tag: 'KNOWLEDGE BASE',
        accent: 'text-violet',
        borderAccent: 'border-violet',
        metrics: '4 Key Decisions Synced • Zero Latency',
        fields: [
            { label: 'Document Title', value: 'AUTH-502 Incident Postmortem (8.2)' },
            { label: 'Timeline', value: '09:41 UTC Triggered → 09:43 UTC Mitigated' },
            { label: 'Impacted Users', value: 'EU Enterprise Cluster' },
        ],
    },
    {
        id: 'crm',
        num: '04',
        source: 'CUSTOMER CALL',
        destination: 'SALESFORCE CRM',
        action: 'ACCOUNT HEALTH UPDATED',
        tag: 'ENTERPRISE CRM',
        accent: 'text-amber-warm',
        borderAccent: 'border-amber-warm',
        metrics: 'Account Health Flagged • Customer Saved',
        fields: [
            { label: 'Account Name', value: 'Enterprise Global Corp' },
            { label: 'Risk Score', value: 'Amber (Authentication Blocked)' },
            { label: 'Next Action', value: 'Schedule Executive Review' },
        ],
    },
    {
        id: 'gmail',
        num: '05',
        source: 'COMPLAINT EMAIL',
        destination: 'GMAIL CLIENT',
        action: 'EXECUTIVE APOLOGY DRAFTED',
        tag: 'EXECUTIVE COMMS',
        accent: 'text-coral',
        borderAccent: 'border-coral',
        metrics: '100% Grounded in Truth • 0 Keystrokes',
        fields: [
            { label: 'To', value: 'cto@enterpriseclient.com' },
            { label: 'Subject', value: 'Resolution Update: EU Login Incidents Mitigated' },
            { label: 'Tone', value: 'Formal Executive Assurance' },
        ],
    },
];
export const WorkflowsPage = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('jira');
    const selectedProject = WORKFLOWS.find((w) => w.id === selectedId) || WORKFLOWS[0];
    return (_jsx("div", { className: "w-full min-h-screen bg-[#F4F1EA] text-[#07080C] pt-28 pb-20 px-6 md:px-12 select-none", children: _jsxs("div", { className: "max-w-7xl mx-auto w-full", children: [_jsxs("div", { className: "border-b border-[#DED8CB] pb-8 mb-12", children: [_jsxs("div", { className: "flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase mb-3 font-bold", children: [_jsx("span", { children: "/05 CROSS-APPLICATION DISPATCH" }), _jsx("span", { className: "text-[#07080C]/20", children: "\u2022" }), _jsx("span", { className: "text-[#07080C]/60", children: "PROJECT SHOWCASE" })] }), _jsxs("h1", { className: "font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#07080C] leading-[0.92] mb-4", children: ["ONE CONTEXT.", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint", children: "MANY DESTINATIONS." })] }), _jsx("p", { className: "text-base sm:text-xl text-[#07080C]/70 font-sans max-w-xl leading-relaxed", children: "The same on-device semantic Context Capsule routes deterministically into whatever host software your team uses. Select a project cover to watch the transformation." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12", children: WORKFLOWS.map((wf) => {
                        const isSelected = selectedId === wf.id;
                        return (_jsxs("div", { onClick: () => setSelectedId(wf.id), className: `p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 ${isSelected
                                ? 'bg-[#07080C] text-[#F4F1EA] shadow-xl scale-[1.03] border-[#07080C]'
                                : 'bg-[#FAF8F3] hover:bg-white text-[#07080C] border-[#DED8CB]'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: `font-mono text-xl font-black ${isSelected ? 'text-white/40' : 'text-[#07080C]/30'}`, children: wf.num }), _jsx("span", { className: `text-[9px] font-mono uppercase px-2 py-0.5 rounded ${isSelected ? 'bg-white/10 text-white' : 'bg-[#07080C]/5 text-[#07080C]/60'}`, children: wf.tag })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-[10px] font-mono tracking-wider opacity-60 uppercase mb-1", children: [wf.source, " \u2192"] }), _jsx("div", { className: "font-display text-lg font-bold tracking-tight", children: wf.destination })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-current/10 text-[10px] font-mono", children: [_jsx("span", { children: wf.action }), _jsx(ArrowUpRight, { className: "w-3.5 h-3.5" })] })] }, wf.id));
                    }) }), _jsxs("div", { className: "p-8 sm:p-12 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-xl mb-20 relative overflow-hidden", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#DED8CB]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#07080C] text-white flex items-center justify-center", children: _jsx(Box, { className: "w-5 h-5 text-cobalt" }) }), _jsxs("div", { children: [_jsx("span", { className: "font-mono text-xs text-cobalt font-bold uppercase", children: "DISPATCH VECTOR" }), _jsx("h3", { className: "font-display text-2xl font-bold text-[#07080C]", children: selectedProject.destination })] })] }), _jsxs("div", { className: "flex items-center gap-2 font-mono text-xs bg-mint/15 text-mint-dark px-3 py-1.5 rounded-full font-bold", children: [_jsx(Sparkles, { className: "w-4 h-4 text-mint" }), _jsx("span", { children: selectedProject.metrics })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center", children: [_jsxs("div", { className: "lg:col-span-5 p-6 rounded-2xl bg-[#07080C] text-white border border-white/10 shadow-lg", children: [_jsxs("div", { className: "flex items-center justify-between text-xs font-mono text-white/50 pb-3 mb-4 border-b border-white/10", children: [_jsx("span", { children: "ATOMIC CONTEXT CAPSULE" }), _jsx("span", { className: "text-mint font-bold", children: "GROUND TRUTH" })] }), _jsxs("div", { className: "space-y-2 font-mono text-xs text-white/80", children: [_jsxs("div", { children: ["intent: ", _jsx("span", { className: "text-cobalt", children: "\"auth_incident_resolution\"" })] }), _jsxs("div", { children: ["error: ", _jsx("span", { className: "text-coral", children: "\"AUTH-502\"" })] }), _jsxs("div", { children: ["severity: ", _jsx("span", { className: "text-amber-warm", children: "\"p1_critical\"" })] }), _jsxs("div", { children: ["cluster: ", _jsx("span", { className: "text-white", children: "\"eu-central\"" })] }), _jsxs("div", { children: ["confidence: ", _jsx("span", { className: "text-mint", children: "0.942" })] })] })] }), _jsx("div", { className: "lg:col-span-2 flex items-center justify-center", children: _jsx("div", { className: "w-12 h-12 rounded-full bg-[#07080C] text-white flex items-center justify-center shadow-lg", children: _jsx(ArrowRight, { className: "w-5 h-5 text-cobalt" }) }) }), _jsxs("div", { className: "lg:col-span-5 p-6 rounded-2xl bg-white border border-[#DED8CB] shadow-md", children: [_jsxs("div", { className: "flex items-center justify-between text-xs font-mono text-[#07080C]/50 pb-3 mb-4 border-b border-[#DED8CB]", children: [_jsx("span", { children: "DESTINATION SCHEMA" }), _jsx("span", { className: "text-cobalt font-bold", children: "AUTOMATED (0 KEYSTROKES)" })] }), _jsx("div", { className: "space-y-3 font-mono text-xs", children: selectedProject.fields.map((f) => (_jsxs("div", { className: "flex justify-between items-start border-b border-black/5 pb-2", children: [_jsxs("span", { className: "text-[#07080C]/50", children: [f.label, ":"] }), _jsx("span", { className: "font-bold text-[#07080C] text-right ml-4", children: f.value })] }, f.label))) })] })] }), _jsxs("div", { className: "mt-8 pt-6 border-t border-[#DED8CB] flex items-center justify-between text-xs font-mono text-[#07080C]/50", children: [_jsx("span", { children: "Deterministic translation verified against host API contracts" }), _jsx("span", { className: "text-mint font-bold", children: "READY TO DISPATCH" })] })] }), _jsxs("div", { className: "p-10 rounded-3xl bg-[#07080C] text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [_jsxs("div", { children: [_jsx("span", { className: "font-mono text-xs text-mint font-bold uppercase tracking-wider", children: "NEXT DESTINATION" }), _jsx("h3", { className: "font-display text-2xl sm:text-3xl font-bold text-white mt-1", children: "RUN THE FULL SIMULATION" }), _jsx("p", { className: "text-white/60 text-sm font-sans mt-1", children: "See how the Trust Engine inspects and authorizes the workflow in real-time." })] }), _jsx(BrandButton, { variant: "primary", size: "lg", onClick: () => navigate('/demo'), className: "flex-shrink-0", children: "TEST A WORKFLOW" })] })] }) }));
};
export default WorkflowsPage;
