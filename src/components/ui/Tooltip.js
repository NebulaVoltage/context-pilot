import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export const Tooltip = ({ content, children, position = 'top', delay = 300 }) => {
    const [isVisible, setIsVisible] = useState(false);
    let timeoutId;
    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => setIsVisible(true), delay);
    };
    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setIsVisible(false);
    };
    const positionStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };
    return (_jsxs("div", { className: "relative inline-block", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [children, _jsx(AnimatePresence, { children: isVisible && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { type: 'spring', damping: 20, stiffness: 300 }, className: `absolute z-50 ${positionStyles[position]} pointer-events-none`, children: _jsx("div", { className: "bg-graphite-800/90 backdrop-blur-md text-white text-xs font-mono px-3 py-2 rounded-lg border border-white/10 shadow-xl whitespace-nowrap", children: content }) })) })] }));
};
export default Tooltip;
