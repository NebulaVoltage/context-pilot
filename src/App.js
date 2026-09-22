import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "relative min-h-screen bg-[#07080C] text-white selection:bg-cobalt/30 selection:text-white font-sans antialiased", children: [_jsx(CosmicAtmosphere, {}), _jsx(CinematicIntro, {}), _jsx(CustomCursor, {}), _jsx(Navigation, {}), _jsx(SystemStatusHUD, {}), _jsx(PresentationMode, {}), _jsx("div", { className: "fixed inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-[0.02]", style: {
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    } }), _jsx("main", { className: "relative z-10 w-full", children: _jsx(PageTransition, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/system", element: _jsx(SystemPage, {}) }), _jsx(Route, { path: "/demo", element: _jsx(DemoPage, {}) }), _jsx(Route, { path: "/hardware", element: _jsx(HardwarePage, {}) }), _jsx(Route, { path: "/workflows", element: _jsx(WorkflowsPage, {}) }), _jsx(Route, { path: "/trust", element: _jsx(TrustPage, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(PrivacyPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) })] }) }));
}
export default App;
