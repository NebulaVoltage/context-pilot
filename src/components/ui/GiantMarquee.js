import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
export const GiantMarquee = ({ items, separator = '→', speed = 35, direction = 'left', theme = 'dark', bordered = true, }) => {
    const [isPaused, setIsPaused] = useState(false);
    // Duplicate items to ensure seamless loop
    const content = items.concat(items).concat(items);
    const isLight = theme === 'light';
    return (_jsx("div", { onMouseEnter: () => setIsPaused(true), onMouseLeave: () => setIsPaused(false), className: `w-full overflow-hidden whitespace-nowrap py-6 sm:py-8 select-none relative ${bordered
            ? isLight
                ? 'border-y border-ink/10 bg-paper'
                : 'border-y border-white/10 bg-ink-950/60 backdrop-blur-sm'
            : ''}`, children: _jsx(motion.div, { className: "inline-flex items-center gap-8 sm:gap-12 will-change-transform", animate: {
                x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
            }, transition: {
                duration: isPaused ? speed * 3 : speed,
                repeat: Infinity,
                ease: 'linear',
            }, children: content.map((item, index) => (_jsxs("div", { className: "inline-flex items-center gap-8 sm:gap-12", children: [_jsx("span", { className: `font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase transition-colors duration-200 ${isLight
                            ? 'text-ink/80 hover:text-cobalt'
                            : 'text-white/70 hover:text-white'}`, children: item }), _jsx("span", { className: `text-2xl sm:text-4xl md:text-5xl font-mono ${isLight ? 'text-cobalt' : 'text-violet'}`, children: separator })] }, index))) }) }));
};
export default GiantMarquee;
