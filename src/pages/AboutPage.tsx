import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BrandButton from '@/components/ui/BrandButton';
import { Smartphone, Laptop, Link2, Box, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#07080C] pt-28 pb-20 px-6 md:px-12 select-none">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="border-b border-[#DED8CB] pb-8 mb-16">
          <div className="flex items-center gap-3 font-display text-xs tracking-widest text-cobalt uppercase mb-3 font-bold">
            <span>/08 PHILOSOPHY & VISION</span>
            <span className="text-[#07080C]/20">•</span>
            <span className="text-[#07080C]/60">A NEW CATEGORY OF COMPUTING</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#07080C] leading-[0.92] mb-6">
            THE COMPUTER
            <br />
            DOESN'T NEED
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt via-violet to-mint">
              ANOTHER APP.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#07080C]/80 font-light font-sans max-w-2xl leading-relaxed">
            “It needs another layer of intelligence.”
          </p>
        </div>

        {/* Narrative Essay / Editorial */}
        <div className="space-y-8 font-sans text-base sm:text-lg text-[#07080C]/80 leading-relaxed max-w-3xl mb-20">
          <p>
            For thirty years, personal computing evolved by adding more software to the same machine. More browser tabs. More Slack channels. More dashboard windows. More background daemons competing for the same CPU cores and the same human attention span.
          </p>
          <p>
            When AI arrived, legacy software simply added more sidebars and chatbots into existing windows. They made the distraction worse. Every time you turn to an AI assistant, you must leave your thought, copy a prompt, paste an error, and wait for a response from a distant cloud datacenter.
          </p>
          <p className="font-display font-bold text-xl sm:text-2xl text-[#07080C] border-l-4 border-cobalt pl-6 my-10">
            Compute should follow context. Not the other way around.
          </p>
          <p>
            We realized the coprocessor was already built. It sits on your desk, right beside your computer. Your smartphone houses dedicated neural silicon, battery autonomy, hardware enclaves, and instant sleep/wake state machines. It is the ideal intelligence coprocessor.
          </p>
        </div>

        {/* The 6 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6 text-cobalt" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">THE COMPUTER</h3>
              <div className="font-mono text-xs text-cobalt font-bold uppercase tracking-wider mb-4">WORKSPACE</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                Remains the home of your active tools. Your IDEs, browsers, and creative applications retain 100% of their compute headroom.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-violet" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">THE PHONE</h3>
              <div className="font-mono text-xs text-violet font-bold uppercase tracking-wider mb-4">INTELLIGENCE</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                Dedicated on-device neural silicon handles semantic reasoning in complete privacy without cloud dependency.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Link2 className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">OFFICE KIT</h3>
              <div className="font-mono text-xs text-mint font-bold uppercase tracking-wider mb-4">HARDWARE BRIDGE</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                Sub-millisecond data synchronization connecting the host OS to smartphone silicon across high-speed physical or wireless buses.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Box className="w-6 h-6 text-amber-warm" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">CONTEXT CAPSULE</h3>
              <div className="font-mono text-xs text-amber-warm font-bold uppercase tracking-wider mb-4">STRUCTURED MEANING</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                An atomic, mathematically verifiable container that transforms unstructured human context into structured machine payload.
              </p>
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Box className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">TRUST ENGINE</h3>
              <div className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider mb-4">CONTROL</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                Confidence before autonomy. Evaluates semantic clarity, schema completeness, and policy boundaries before execution.
              </p>
            </div>
          </div>

          {/* Pillar 6 */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#DED8CB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#07080C] text-white flex items-center justify-center mb-6">
                <Box className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#07080C] mb-1">VERIFICATION</h3>
              <div className="font-mono text-xs text-mint font-bold uppercase tracking-wider mb-4">CONFIDENCE</div>
              <p className="text-sm text-[#07080C]/70 font-sans leading-relaxed">
                Closed-loop destination state audit. The action is not complete until the recipient system state is inspected and verified.
              </p>
            </div>
          </div>

        </div>

        {/* Final Vision Callout & CTA */}
        <div className="p-12 rounded-3xl bg-[#07080C] text-white border border-white/10 text-center flex flex-col items-center">
          <span className="font-mono text-xs text-cobalt font-bold uppercase tracking-widest mb-4">
            A NEW CATEGORY OF PHYSICAL COMPUTING
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            READY TO WITNESS THE REASONING LOOP?
          </h2>
          <p className="text-white/60 font-sans text-sm sm:text-base max-w-lg mb-8">
            Experience the 12-state on-device pipeline operating in real time.
          </p>

          <BrandButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/demo')}
          >
            RUN LIVE DEMO
          </BrandButton>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
