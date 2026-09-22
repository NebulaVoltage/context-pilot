import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { lerp } from '@/utils/math';
export function useAnimatedValue(targetValue = 0, options = {}) {
    const safeTarget = typeof targetValue === 'number' && !isNaN(targetValue) ? targetValue : 0;
    const { duration = 1000 } = options;
    const prefersReducedMotion = useReducedMotion();
    const [currentValue, setCurrentValue] = useState(safeTarget);
    const [animatingTarget, setAnimatingTarget] = useState(safeTarget);
    useEffect(() => {
        if (prefersReducedMotion) {
            setCurrentValue(safeTarget);
            return;
        }
        if (safeTarget === animatingTarget) {
            return;
        }
        setAnimatingTarget(safeTarget);
        let rafId;
        let startTime = null;
        const startValue = currentValue;
        const animate = (timestamp) => {
            if (!startTime)
                startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const nextValue = lerp(startValue, targetValue, easeProgress);
            setCurrentValue(nextValue);
            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            }
            else {
                setCurrentValue(targetValue);
            }
        };
        rafId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [targetValue, duration, prefersReducedMotion, currentValue, animatingTarget]);
    return Number(currentValue.toFixed(4));
}
