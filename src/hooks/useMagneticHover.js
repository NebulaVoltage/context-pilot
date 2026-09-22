import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
export function useMagneticHover(ref, config = {}) {
    const { strength = 0.5, radius = 100 } = config;
    const prefersReducedMotion = useReducedMotion();
    const [offset, setOffset] = useState({ x: 0, y: 0, isActive: false });
    useEffect(() => {
        if (prefersReducedMotion) {
            setOffset({ x: 0, y: 0, isActive: false });
            return;
        }
        const element = ref.current;
        if (!element)
            return;
        let rafId;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let isActive = false;
        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < radius) {
                targetX = distX * strength;
                targetY = distY * strength;
                isActive = true;
            }
            else {
                targetX = 0;
                targetY = 0;
                isActive = false;
            }
        };
        const handleMouseLeave = () => {
            targetX = 0;
            targetY = 0;
            isActive = false;
        };
        const animate = () => {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            const threshold = 0.01;
            const isMoving = Math.abs(currentX) > threshold || Math.abs(currentY) > threshold;
            if (isActive || isMoving) {
                setOffset({
                    x: isActive || isMoving ? Number(currentX.toFixed(2)) : 0,
                    y: isActive || isMoving ? Number(currentY.toFixed(2)) : 0,
                    isActive: isActive
                });
            }
            rafId = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        animate();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, [ref, strength, radius, prefersReducedMotion]);
    return offset;
}
