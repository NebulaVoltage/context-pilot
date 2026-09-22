import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
export const PageTransition = ({ children }) => {
    const location = useLocation();
    // Scroll to top on every route change
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, className: "w-full", children: children }, location.pathname) }));
};
export default PageTransition;
