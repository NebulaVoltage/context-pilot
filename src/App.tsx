import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CosmicAtmosphere } from '@/components/effects/CosmicAtmosphere';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Navigation } from '@/components/nav/Navigation';
import { CinematicIntro } from '@/components/intro/CinematicIntro';
import { SystemStatusHUD } from '@/components/ui/SystemStatusHUD';
import { PageTransition } from '@/components/ui/PageTransition';
import PresentationMode from '@/components/presentation/PresentationMode';

// Route Pages
import HomePage from '@/pages/HomePage';
import SystemPage from '@/pages/SystemPage';
import DemoPage from '@/pages/DemoPage';
import HardwarePage from '@/pages/HardwarePage';
import WorkflowsPage from '@/pages/WorkflowsPage';
import TrustPage from '@/pages/TrustPage';
import PrivacyPage from '@/pages/PrivacyPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#07080C] text-white selection:bg-cobalt/30 selection:text-white font-sans antialiased">
        {/* Subtle Atmospheric Depth (Soft light falloff, minimal stars, fine topology) */}
        <CosmicAtmosphere />

        {/* Cinematic Reveal Sequence (Instant dismiss on user scroll/key) */}
        <CinematicIntro />

        {/* Global UI & Navigation Layer */}
        <CustomCursor />
        <Navigation />
        <SystemStatusHUD />
        <PresentationMode />

        {/* Micro-Noise Film Grain */}
        <div
          className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Multi-Page Route Outlet */}
        <main className="relative z-10 w-full">
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/system" element={<SystemPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/hardware" element={<HardwarePage />} />
              <Route path="/workflows" element={<WorkflowsPage />} />
              <Route path="/trust" element={<TrustPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
