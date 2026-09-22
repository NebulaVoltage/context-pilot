import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '@/utils/easing';
export const GlassPanel = ({ children, className = '', variant = 'default', animate = false, glow = false, glowColor = 'rgba(34,211,238,0.15)' // cyan-500 with opacity
 }) => {
    const variantStyles = {
        default: 'bg-white/[0.03]',
        elevated: 'bg-white/[0.06]',
        subtle: 'bg-white/[0.02]'
    };
    const baseStyles = `backdrop-blur-xl border border-white/[0.08] rounded-2xl transition-colors hover:border-white/[0.15] ${variantStyles[variant]}`;
    const glowStyle = glow ? { boxShadow: `0 0 30px ${glowColor}` } : {};
    if (animate) {
        return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, transition: SPRING_SMOOTH, className: `${baseStyles} ${className}`, style: glowStyle, children: children }));
    }
    return (_jsx("div", { className: `${baseStyles} ${className}`, style: glowStyle, children: children }));
};
export default GlassPanel;
