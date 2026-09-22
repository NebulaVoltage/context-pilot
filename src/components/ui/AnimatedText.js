import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
export const AnimatedText = ({ text, variant = 'word', delay = 0, staggerDelay, className = '', onComplete, trigger = true }) => {
    const prefersReducedMotion = useReducedMotion();
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
        if (prefersReducedMotion && trigger && !hasAnimated) {
            setHasAnimated(true);
            onComplete?.();
        }
    }, [prefersReducedMotion, trigger, hasAnimated, onComplete]);
    if (prefersReducedMotion) {
        return _jsx("span", { className: className, children: text });
    }
    const defaultStagger = variant === 'character' ? 0.03 : variant === 'word' ? 0.08 : 0.15;
    const stagger = staggerDelay ?? defaultStagger;
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            }
        }
    };
    const child = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };
    const renderContent = () => {
        if (variant === 'character') {
            return text.split('').map((char, index) => (_jsx(motion.span, { variants: child, className: "inline-block whitespace-pre", children: char }, `${char}-${index}`)));
        }
        if (variant === 'word') {
            return text.split(' ').map((word, index) => (_jsx(motion.span, { variants: child, className: "inline-block whitespace-pre mr-[0.25em]", children: word }, `${word}-${index}`)));
        }
        // Line variant
        return text.split('\n').map((line, index) => (_jsx(motion.span, { variants: child, className: "block", children: line }, `line-${index}`)));
    };
    return (_jsx(motion.span, { className: `inline-block ${className}`, variants: container, initial: "hidden", animate: trigger ? "visible" : "hidden", onAnimationComplete: () => {
            if (trigger && !hasAnimated) {
                setHasAnimated(true);
                onComplete?.();
            }
        }, children: renderContent() }));
};
export default AnimatedText;
