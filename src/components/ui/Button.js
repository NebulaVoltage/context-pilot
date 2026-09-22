import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMagneticHover } from '@/hooks/useMagneticHover';
const SPRING_CONFIG = {
    type: 'spring',
    stiffness: 400,
    damping: 30
};
export const Button = ({ variant = 'primary', size = 'md', children, onClick, icon, showArrow = false, disabled = false, className = '', 'aria-label': ariaLabel }) => {
    const buttonRef = useRef(null);
    const { x, y } = useMagneticHover(buttonRef, { strength: 0.2, radius: 120 });
    const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
    const sizeStyles = {
        sm: 'text-sm px-4 py-2 gap-2',
        md: 'text-base px-6 py-3 gap-3',
        lg: 'text-lg px-8 py-4 gap-4',
        icon: 'p-3 gap-0'
    };
    const variantStyles = {
        primary: 'bg-graphite-800 text-white border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]',
        secondary: 'bg-transparent text-white border border-graphite-600 hover:border-graphite-400 hover:bg-white/5',
        ghost: 'bg-transparent text-graphite-300 hover:text-white border border-transparent hover:underline underline-offset-4'
    };
    return (_jsxs(motion.button, { ref: buttonRef, className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`, onClick: onClick, disabled: disabled, "aria-label": ariaLabel, animate: { x, y }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: SPRING_CONFIG, "data-actionable": "true", children: [icon && _jsx("span", { className: "flex-shrink-0", children: icon }), _jsx("span", { children: children }), showArrow && (_jsx(motion.span, { className: "flex-shrink-0 text-cyan-400", initial: { x: 0 }, whileHover: { x: 4 }, transition: SPRING_CONFIG, children: _jsx(ArrowRight, { className: size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6' }) }))] }));
};
export default Button;
