import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSimulation } from '@/store/simulation';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'SYSTEM', path: '/system' },
  { label: 'DEMO', path: '/demo' },
  { label: 'HARDWARE', path: '/hardware' },
  { label: 'WORKFLOWS', path: '/workflows' },
  { label: 'TRUST', path: '/trust' },
  { label: 'PRIVACY', path: '/privacy' },
  { label: 'ABOUT', path: '/about' },
];

const prefetchedRoutes = new Set<string>();

function lowPriorityPrefetch(path: string) {
  if (prefetchedRoutes.has(path)) return;
  prefetchedRoutes.add(path);

  const prefetchTask = () => {
    switch (path) {
      case '/system':
        import('@/pages/SystemPage');
        break;
      case '/demo':
        import('@/pages/DemoPage');
        break;
      case '/hardware':
        import('@/pages/HardwarePage');
        break;
      case '/workflows':
        import('@/pages/WorkflowsPage');
        break;
      case '/trust':
        import('@/pages/TrustPage');
        break;
      case '/privacy':
        import('@/pages/PrivacyPage');
        break;
      case '/about':
        import('@/pages/AboutPage');
        break;
      default:
        break;
    }
  };

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(prefetchTask);
  } else {
    setTimeout(prefetchTask, 100);
  }
}

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const presentationMode = useSimulation((s) => s.presentationMode);
  const audioEnabled = useSimulation((s) => s.audioEnabled);
  const toggleAudio = useSimulation((s) => s.toggleAudio);
  const setPresentationMode = useSimulation((s) => s.setPresentationMode);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Light routes detection
  const isLightRoute = ['/privacy', '/workflows', '/about'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleRunDemo = () => {
    setMobileMenuOpen(false);
    navigate('/demo');
  };

  return (
    <AnimatePresence>
      {!presentationMode && (
        <>
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 pointer-events-none flex justify-center"
          >
            <div
              className={`flex items-center justify-between w-full max-w-6xl px-5 sm:px-6 py-2.5 rounded-full pointer-events-auto transition-all duration-300 ${
                isLightRoute
                  ? scrolled
                    ? 'bg-[#F4F1EA]/95 backdrop-blur-xl border border-[#DED8CB] shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                    : 'bg-[#F4F1EA]/80 backdrop-blur-md border border-[#DED8CB]/60'
                  : scrolled
                  ? 'bg-[#07080C]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                  : 'bg-[#07080C]/70 backdrop-blur-md border border-white/10'
              }`}
            >
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2.5 group text-left outline-none"
              >
                <span
                  className={`font-display text-xs md:text-sm tracking-[0.2em] font-black transition-colors ${
                    isLightRoute
                      ? 'text-[#07080C] group-hover:text-cobalt'
                      : 'text-white group-hover:text-cobalt-light'
                  }`}
                >
                  CONTEXTPILOT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt transition-transform group-hover:scale-125" />
              </Link>

              {/* Navigation links with real routing (Desktop) */}
              <nav className="hidden lg:flex items-center gap-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onMouseEnter={() => lowPriorityPrefetch(item.path)}
                      className={`text-[11px] font-display tracking-widest uppercase transition-all duration-200 relative py-1 ${
                        isLightRoute
                          ? isActive
                            ? 'text-[#07080C] font-bold'
                            : 'text-[#07080C]/60 hover:text-[#07080C]'
                          : isActive
                          ? 'text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-cobalt rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Right Tools & CTA */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <button
                  onClick={toggleAudio}
                  className={`p-2 rounded-full transition-colors ${
                    isLightRoute
                      ? 'text-[#07080C]/60 hover:text-[#07080C] hover:bg-black/5'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={audioEnabled ? 'Audio Enabled' : 'Audio Muted'}
                  aria-label="Toggle Audio"
                >
                  {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                <button
                  onClick={() => setPresentationMode(true)}
                  className={`p-2 rounded-full transition-colors ${
                    isLightRoute
                      ? 'text-[#07080C]/60 hover:text-[#07080C] hover:bg-black/5'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title="Keynote Presentation Mode"
                  aria-label="Enter Presentation Mode"
                >
                  <Maximize2 size={14} />
                </button>

                {/* [ RUN DEMO → ] Primary CTA (Desktop & Tablet) */}
                <button
                  onClick={handleRunDemo}
                  onMouseEnter={() => lowPriorityPrefetch('/demo')}
                  className={`hidden sm:flex group items-center gap-1.5 text-[11px] font-display font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    isLightRoute
                      ? 'bg-[#07080C] text-white hover:bg-[#141722] shadow-sm'
                      : 'bg-cobalt text-white hover:bg-cobalt-hover shadow-[0_0_20px_rgba(66,103,255,0.4)]'
                  }`}
                >
                  <span>RUN DEMO</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 rounded-full transition-colors ${
                    isLightRoute
                      ? 'text-[#07080C]/80 hover:bg-black/5'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </motion.header>

          {/* Mobile Menu Dropdown Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="fixed top-20 left-4 right-4 z-40 p-6 rounded-3xl bg-[#0C0E14]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-4 text-white lg:hidden"
              >
                <div className="flex flex-col gap-2 font-display text-sm tracking-wider">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        onMouseEnter={() => lowPriorityPrefetch(item.path)}
                        className={`py-2.5 px-4 rounded-xl transition-all ${
                          isActive
                            ? 'bg-cobalt text-white font-bold'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={handleRunDemo}
                  onMouseEnter={() => lowPriorityPrefetch('/demo')}
                  className="w-full py-3 rounded-xl bg-cobalt hover:bg-cobalt-hover text-white font-display text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>RUN LIVE DEMO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {presentationMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => setPresentationMode(false)}
            className="p-3 bg-[#07080C]/90 rounded-full text-white hover:bg-[#141722] transition-colors backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 text-xs font-display"
          >
            <Minimize2 size={16} />
            <span>EXIT KEYNOTE</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
