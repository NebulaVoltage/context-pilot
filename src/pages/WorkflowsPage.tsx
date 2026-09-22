import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BrandButton from '@/components/ui/BrandButton';
import { ArrowUpRight, CheckSquare, Briefcase, FileText, Database, Mail, Box, ArrowRight, Sparkles } from 'lucide-react';

interface WorkflowProject {
  id: string;
  num: string;
  source: string;
  destination: string;
  action: string;
  tag: string;
  accent: string;
  borderAccent: string;
  metrics: string;
  fields: { label: string; value: string }[];
}

const WORKFLOWS: WorkflowProject[] = [
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

export const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>('jira');

  const selectedProject = WORKFLOWS.find((w) => w.id === selectedId) || WORKFLOWS[0];

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#07080C] pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-[#DED8CB] pb-8 mb-12">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase mb-3 font-bold">
            <span>/05 CROSS-APPLICATION DISPATCH</span>
            <span className="text-[#07080C]/20">•</span>
            <span className="text-[#07080C]/60">PROJECT SHOWCASE</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#07080C] leading-[0.92] mb-4">
            ONE CONTEXT.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              MANY DESTINATIONS.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#07080C]/70 font-sans max-w-xl leading-relaxed">
            The same on-device semantic Context Capsule routes deterministically into whatever host software your team uses. Select a project cover to watch the transformation.
          </p>
        </div>

        {/* Project Selector Ribbon (Agency Showcase Covers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {WORKFLOWS.map((wf) => {
            const isSelected = selectedId === wf.id;
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedId(wf.id)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 ${
                  isSelected
                    ? 'bg-[#07080C] text-[#F4F1EA] shadow-xl scale-[1.03] border-[#07080C]'
                    : 'bg-[#FAF8F3] hover:bg-white text-[#07080C] border-[#DED8CB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xl font-black ${isSelected ? 'text-white/40' : 'text-[#07080C]/30'}`}>
                    {wf.num}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-[#07080C]/5 text-[#07080C]/60'
                  }`}>
                    {wf.tag}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono tracking-wider opacity-60 uppercase mb-1">
                    {wf.source} →
                  </div>
                  <div className="font-display text-lg font-bold tracking-tight">
                    {wf.destination}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-current/10 text-[10px] font-mono">
                  <span>{wf.action}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Destination Preview Canvas */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-xl mb-20 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#DED8CB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#07080C] text-white flex items-center justify-center">
                <Box className="w-5 h-5 text-cobalt" />
              </div>
              <div>
                <span className="font-mono text-xs text-cobalt font-bold uppercase">DISPATCH VECTOR</span>
                <h3 className="font-display text-2xl font-bold text-[#07080C]">{selectedProject.destination}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs bg-mint/15 text-mint-dark px-3 py-1.5 rounded-full font-bold">
              <Sparkles className="w-4 h-4 text-mint" />
              <span>{selectedProject.metrics}</span>
            </div>
          </div>

          {/* Transformation Vector: Context Capsule -> Target Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Origin: The Single Context Capsule */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#07080C] text-white border border-white/10 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 pb-3 mb-4 border-b border-white/10">
                <span>ATOMIC CONTEXT CAPSULE</span>
                <span className="text-mint font-bold">GROUND TRUTH</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-white/80">
                <div>intent: <span className="text-cobalt">"auth_incident_resolution"</span></div>
                <div>error: <span className="text-coral">"AUTH-502"</span></div>
                <div>severity: <span className="text-amber-warm">"p1_critical"</span></div>
                <div>cluster: <span className="text-white">"eu-central"</span></div>
                <div>confidence: <span className="text-mint">0.942</span></div>
              </div>
            </div>

            {/* Travel Arrow */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#07080C] text-white flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5 text-cobalt" />
              </div>
            </div>

            {/* Target Destination Fields */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#DED8CB] shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-[#07080C]/50 pb-3 mb-4 border-b border-[#DED8CB]">
                <span>DESTINATION SCHEMA</span>
                <span className="text-cobalt font-bold">AUTOMATED (0 KEYSTROKES)</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {selectedProject.fields.map((f) => (
                  <div key={f.label} className="flex justify-between items-start border-b border-black/5 pb-2">
                    <span className="text-[#07080C]/50">{f.label}:</span>
                    <span className="font-bold text-[#07080C] text-right ml-4">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-[#DED8CB] flex items-center justify-between text-xs font-mono text-[#07080C]/50">
            <span>Deterministic translation verified against host API contracts</span>
            <span className="text-mint font-bold">READY TO DISPATCH</span>
          </div>

        </div>

        {/* Next Route Banner: TEST A WORKFLOW → */}
        <div className="p-10 rounded-3xl bg-[#07080C] text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-mint font-bold uppercase tracking-wider">NEXT DESTINATION</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              RUN THE FULL SIMULATION
            </h3>
            <p className="text-white/60 text-sm font-sans mt-1">
              See how the Trust Engine inspects and authorizes the workflow in real-time.
            </p>
          </div>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/demo')}
            className="flex-shrink-0"
          >
            TEST A WORKFLOW
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default WorkflowsPage;
