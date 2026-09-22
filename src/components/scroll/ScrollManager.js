import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Clean wrapper component for the page flow.
 * Provides standard, unhijacked top-to-bottom natural document scrolling.
 */
export const ScrollManager = ({ children }) => {
    return (_jsx("div", { className: "w-full", children: children }));
};
export default ScrollManager;
