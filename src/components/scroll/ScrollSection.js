import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
export const ScrollSection = ({ id, children, className = '', onEnter, onLeave }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
    useEffect(() => {
        if (isInView && onEnter) {
            onEnter();
        }
        else if (!isInView && onLeave) {
            onLeave();
        }
    }, [isInView, onEnter, onLeave]);
    return (_jsx("section", { id: id, ref: ref, className: `relative min-h-screen w-full ${className}`, children: _jsx(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10%" }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, className: "w-full h-full", children: children }) }));
};
export default ScrollSection;
