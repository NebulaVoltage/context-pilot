import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const HomePage = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "w-full bg-[#07080C] text-white", children: [_jsx(HeroSection, {}), _jsx(GiantMarquee, { items: ['CONTEXT', 'UNDERSTAND', 'TRUST', 'ACTION', 'VERIFY'], separator: "\u2192", speed: 28, theme: "dark" }), _jsx(ProblemSection, {}), _jsx(CoprocessorSection, {}), _jsx(PrivacySection, {}), _jsx(ContextTransformationSection, {}), _jsx(TrustSection, {}), _jsx(UniversalWorkflowSection, {}), _jsx(StatisticsSection, {}), _jsx(GiantMarquee, { items: ['THE PHONE / INTELLIGENCE', 'THE COMPUTER / WORKSPACE', 'OFFICE KIT / BRIDGE', 'CONTEXT CAPSULE', 'TRUST ENGINE'], separator: "/", speed: 32, direction: "right", theme: "dark" }), _jsx(CinematicEnding, {})] }));
};
export default HomePage;
