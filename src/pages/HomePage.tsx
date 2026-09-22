import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSection } from '@/sections/ProblemSection';
import { CoprocessorSection } from '@/sections/CoprocessorSection';
import { PrivacySection } from '@/sections/PrivacySection';
import { ContextTransformationSection } from '@/sections/ContextTransformationSection';
import { TrustSection } from '@/sections/TrustSection';
import { UniversalWorkflowSection } from '@/sections/UniversalWorkflowSection';
import { StatisticsSection } from '@/sections/StatisticsSection';
import { CinematicEnding } from '@/sections/CinematicEnding';
import { GiantMarquee } from '@/components/ui/GiantMarquee';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#07080C] text-white">
      {/* 01. Hero Hardware Studio */}
      <HeroSection />

      {/* Marquee Ticker 1: Pipeline Lifecycle */}
      <GiantMarquee
        items={['CONTEXT', 'UNDERSTAND', 'TRUST', 'ACTION', 'VERIFY']}
        separator="→"
        speed={28}
        theme="dark"
      />

      {/* 02. Problem Editorial Section (Warm Paper Contrast) */}
      <ProblemSection />

      {/* 03. Hardware Intelligence Layer */}
      <CoprocessorSection />

      {/* 04. Local by Design / Privacy Section */}
      <PrivacySection />

      {/* 05. Context Capsule Synthesis (Warm Paper Contrast) */}
      <ContextTransformationSection />

      {/* 06. Trust Engine Governance */}
      <TrustSection />

      {/* 07. Cross-Application Workflows (Warm Paper Contrast) */}
      <UniversalWorkflowSection />

      {/* 08. Metrics & Statistics */}
      <StatisticsSection />

      {/* Marquee Ticker 2: Core Philosophy */}
      <GiantMarquee
        items={['THE PHONE / INTELLIGENCE', 'THE COMPUTER / WORKSPACE', 'OFFICE KIT / BRIDGE', 'CONTEXT CAPSULE', 'TRUST ENGINE']}
        separator="/"
        speed={32}
        direction="right"
        theme="dark"
      />

      {/* Final Cinematic Ending & Reprise */}
      <CinematicEnding />
    </div>
  );
};

export default HomePage;
