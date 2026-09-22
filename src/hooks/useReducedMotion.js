import { useState, useEffect } from 'react';
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
    });
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
        const listener = (event) => {
            setPrefersReducedMotion(event.matches);
        };
        // Fallback for older browsers
        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
            return () => mediaQueryList.removeEventListener('change', listener);
        }
        else {
            mediaQueryList.addListener(listener);
            return () => mediaQueryList.removeListener(listener);
        }
    }, []);
    return prefersReducedMotion;
}
