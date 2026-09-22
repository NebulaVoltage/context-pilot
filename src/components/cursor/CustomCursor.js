import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
export const CustomCursor = () => {
    const prefersReducedMotion = useReducedMotion();
    const [mode, setMode] = useState('default');
    const [isVisible, setIsVisible] = useState(false);
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    useEffect(() => {
        // Hide on touch devices or if reduced motion is requested
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || prefersReducedMotion) {
            return;
        }
        setIsVisible(true);
        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let animationFrameId;
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
            const target = e.target;
            if (!target)
                return;
            if (target.closest('[data-cursor="explore"]') || target.closest('canvas')) {
                setMode('phone');
            }
            else if (target.closest('[data-cursor="node"]')) {
                setMode('node');
            }
            else if (target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.closest('[data-interactive="true"]')) {
                setMode('interactive');
            }
            else {
                setMode('default');
            }
        };
        // Smooth RAF loop for the outer ring only (elastic tension, no lag on the dot)
        const render = () => {
            ringX += (mouseX - ringX) * 0.28;
            ringY += (mouseY - ringY) * 0.28;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }
            animationFrameId = requestAnimationFrame(render);
        };
        animationFrameId = requestAnimationFrame(render);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [prefersReducedMotion]);
    if (!isVisible || prefersReducedMotion)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 pointer-events-none z-[9999] overflow-hidden", children: [_jsx("div", { ref: dotRef, className: "fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white shadow-sm pointer-events-none will-change-transform", style: { transform: 'translate3d(-100px, -100px, 0)' } }), _jsxs("div", { ref: ringRef, className: `fixed top-0 left-0 -ml-4 -mt-4 rounded-full pointer-events-none transition-[width,height,border-color,background-color] duration-150 ease-out flex items-center justify-center will-change-transform ${mode === 'interactive'
                    ? 'w-9 h-9 -ml-[18px] -mt-[18px] border border-cobalt bg-cobalt/10'
                    : mode === 'phone'
                        ? 'w-14 h-14 -ml-7 -mt-7 border border-violet/80 bg-violet/10'
                        : mode === 'node'
                            ? 'w-10 h-10 -ml-5 -mt-5 border border-mint/80 bg-mint/10'
                            : 'w-8 h-8 -ml-4 -mt-4 border border-white/25 bg-transparent'}`, style: { transform: 'translate3d(-100px, -100px, 0)' }, children: [mode === 'phone' && (_jsx("span", { className: "text-[8px] font-mono tracking-widest text-violet-light uppercase font-bold select-none", children: "EXPLORE" })), mode === 'node' && (_jsx("span", { className: "text-[9px] font-mono text-mint select-none", children: "\u271B" }))] })] }));
};
