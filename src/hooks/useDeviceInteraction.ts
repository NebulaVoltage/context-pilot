import { useState, useEffect, RefObject } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DeviceInteractionConfig {
  maxRotation?: number;
  springStiffness?: number;
  damping?: number;
  returnSpeed?: number;
}

export function useDeviceInteraction(config: DeviceInteractionConfig = {}) {
  const {
    maxRotation = 0.5,
    springStiffness = 0.1,
    damping = 0.8,
    returnSpeed = 0.05
  } = config;

  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / innerHeight) * 2 + 1;

      targetY = normalizedX * maxRotation;
      targetX = normalizedY * maxRotation;
    };

    const animate = () => {
      if (!isHovered) {
        targetX = 0;
        targetY = 0;
      }

      const ax = (targetX - currentX) * (isHovered ? springStiffness : returnSpeed);
      const ay = (targetY - currentY) * (isHovered ? springStiffness : returnSpeed);

      velocityX = (velocityX + ax) * damping;
      velocityY = (velocityY + ay) * damping;

      currentX += velocityX;
      currentY += velocityY;

      setRotation({
        x: currentX,
        y: currentY
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handlePointerMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHovered, maxRotation, springStiffness, damping, returnSpeed, prefersReducedMotion]);

  const handlers = {
    onPointerEnter: () => setIsHovered(true),
    onPointerLeave: () => setIsHovered(false),
    onPointerMove: () => {}
  };

  return {
    rotationX: prefersReducedMotion ? 0 : rotation.x,
    rotationY: prefersReducedMotion ? 0 : rotation.y,
    isHovered,
    handlers
  };
}
