import React, { useRef } from 'react';
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

export const HorizontalShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Finite, smooth travel clamped before the section ends
  const x = useTransform(scrollYProgress, [0, 0.85], ['0%', '-68%'], { clamp: true });

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-ink select-none">
      {/* Sticky Fullscreen Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-20 px-6 md:px-12">
        
        {/* Top Editorial Annotation */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-5 z-20">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-white/50 uppercase">
            <span className="font-bold text-cobalt">/06</span>
            <span>CROSS-APPLICATION SHOWCASE</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-white/40 hidden sm:block uppercase">
            01 TO 05 HORIZONTAL STREAM
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full z-20 pt-4">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-2">
            ONE CONTEXT.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              MANY DESTINATIONS.
            </span>
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-mono">
            Scroll moves horizontally through universal workflow executions across enterprise software.
          </p>
        </div>

        {/* Horizontally Moving Track */}
        <div className="w-full flex-1 flex items-center overflow-hidden my-auto z-10">
          <motion.div style={{ x }} className="flex gap-8 sm:gap-12 pl-4 sm:pl-12 will-change-transform">
            {WORKFLOW_PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.num}
                  className={`w-[85vw] sm:w-[580px] h-[360px] sm:h-[400px] flex-shrink-0 p-8 sm:p-10 rounded-3xl bg-ink-900 border ${project.borderColor} shadow-2xl flex flex-col justify-between group hover:border-white/40 transition-colors`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-white/30 group-hover:text-white transition-colors">
                      {project.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                      {project.tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-6 h-6 ${project.color}`} />
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {project.flow}
                      </h3>
                    </div>

                    <div className={`font-mono text-xs font-bold tracking-wider mb-3 ${project.color}`}>
                      {project.action}
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-lg font-sans">
                      {project.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
                    <span>{project.metrics}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Editorial Quote */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/40 z-20">
          <span>“UNDERSTAND ONCE. ACT ANYWHERE.”</span>
          <span>ENTERPRISE COPROCESSOR AGILITY</span>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcaseSection;
