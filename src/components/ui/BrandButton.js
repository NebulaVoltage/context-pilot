import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export const BrandButton = ({ children, onClick, variant = 'primary', size = 'md', icon, showArrow = true, className = '', type = 'button', disabled = false, 'aria-label': ariaLabel, }) => {
    const sizeClasses = {
        sm: 'px-5 py-2.5 text-xs gap-2',
        md: 'px-7 py-3.5 text-xs sm:text-sm gap-2.5',
        lg: 'px-9 py-4 text-sm sm:text-base gap-3',
    };
    const variantClasses = {
        // Vibrant Cobalt with crisp white text
        primary: 'bg-cobalt text-white border border-cobalt hover:bg-cobalt-hover shadow-[0_0_30px_rgba(66,103,255,0.45)] hover:shadow-[0_0_35px_rgba(66,103,255,0.6)]',
        // Crisp physical white pill with GUARANTEED ink-black text
        'primary-white': 'bg-white text-[#07080C] border border-white/80 hover:bg-[#FAF8F3] shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.35)]',
        // Translucent dark glass for dark scenes
        secondary: 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md',
        // Solid deep ink for light sections
        'light-ink': 'bg-[#07080C] text-[#F4F1EA] border border-[#07080C] hover:bg-[#141722] shadow-[0_4px_20px_rgba(7,8,12,0.15)]',
        // Clean outline for light sections
        'light-outline': 'bg-transparent text-[#07080C] border border-[#07080C]/30 hover:border-[#07080C] hover:bg-black/5',
    };
    return (_jsxs(motion.button, { type: type, onClick: onClick, disabled: disabled, "aria-label": ariaLabel, whileHover: { scale: 1.02 }, whileTap: { scale: 0.97 }, transition: { type: 'spring', stiffness: 450, damping: 25 }, className: `group relative inline-flex items-center justify-center font-display font-semibold tracking-wider uppercase rounded-full cursor-pointer select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`, children: [icon && _jsx("span", { className: "flex-shrink-0 transition-transform group-hover:scale-110", children: icon }), _jsx("span", { className: "font-semibold", children: children }), showArrow && (_jsx(ArrowRight, { className: "w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" }))] }));
};
export default BrandButton;
