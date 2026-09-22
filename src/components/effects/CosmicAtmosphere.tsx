import React, { useEffect, useRef } from 'react';
import { useSimulation } from '@/store/simulation';

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  baseAlpha: number;
}

interface DataPulse {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  color: string;
}

export const CosmicAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useSimulation((s) => s.state);
  const confidence = useSimulation((s) => s.confidence);
  const getTrustPolicy = useSimulation((s) => s.getTrustPolicy);
  const policy = getTrustPolicy(confidence);

  const stateRef = useRef({ state, policy });
  useEffect(() => {
    stateRef.current = { state, policy };
  }, [state, policy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetPointerX = (e.clientX / width - 0.5) * 30;
      targetPointerY = (e.clientY / height - 0.5) * 30;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initAtmosphere();
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const stars: Star[] = [];
    const pulses: DataPulse[] = [];

    const initAtmosphere = () => {
      // 1. Minimal star particles (sparse, faint, elegant)
      stars.length = 0;
      const numStars = Math.min(50, Math.floor((width * height) / 28000));
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.2 ? 1.2 : 0.8,
          twinkleSpeed: 0.004 + Math.random() * 0.008,
          baseAlpha: 0.08 + Math.random() * 0.25,
        });
      }

      // 2. Occasional restrained data traces
      pulses.length = 0;
      for (let i = 0; i < 4; i++) {
        pulses.push({
          x: Math.random() * width,
          y: height * (0.2 + i * 0.2),
          length: 60 + Math.random() * 80,
          speed: 0.8 + Math.random() * 0.6,
          alpha: 0.15 + Math.random() * 0.2,
          color: i % 2 === 0 ? '#4267FF' : '#8A63FF',
        });
      }
    };

    initAtmosphere();

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth pointer parallax damping
      pointerX += (targetPointerX - pointerX) * 0.05;
      pointerY += (targetPointerY - pointerY) * 0.05;

      const { state: curState, policy: curPolicy } = stateRef.current;
      const isInferencing = curState === 'inference';
      const isTrustWarn = curState === 'trust' && (curPolicy === 'confirm' || curPolicy === 'blocked');
      const isComplete = curState === 'complete';

      // Base background: #07080C (Near-black luxury hardware tone)
      ctx.fillStyle = '#07080C';
      ctx.fillRect(0, 0, width, height);

      // Atmospheric soft light falloff and depth haze
      const gradient = ctx.createRadialGradient(
        width * 0.5 + pointerX,
        height * 0.35 + pointerY,
        40,
        width * 0.5,
        height * 0.5,
        width * 0.75
      );

      if (isTrustWarn) {
        gradient.addColorStop(0, 'rgba(241, 181, 90, 0.06)');
        gradient.addColorStop(0.5, 'rgba(255, 99, 99, 0.03)');
        gradient.addColorStop(1, 'rgba(7, 8, 12, 0.98)');
      } else if (isComplete) {
        gradient.addColorStop(0, 'rgba(67, 211, 161, 0.07)');
        gradient.addColorStop(0.5, 'rgba(66, 103, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(7, 8, 12, 0.98)');
      } else {
        gradient.addColorStop(0, isInferencing ? 'rgba(138, 99, 255, 0.09)' : 'rgba(66, 103, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(138, 99, 255, 0.02)');
        gradient.addColorStop(1, 'rgba(7, 8, 12, 0.98)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Very fine, sparse topology contour lines (like precision automotive/aerospace blueprints)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * (0.28 + w * 0.24) + pointerY * (0.3 + w * 0.2);
        for (let x = 0; x <= width; x += 30) {
          const wave = Math.sin(x * 0.002 + time * 0.4 + w * 1.5) * 22;
          if (x === 0) ctx.moveTo(x, yOffset + wave);
          else ctx.lineTo(x, yOffset + wave);
        }
        ctx.stroke();
      }

      // Minimal breathing star particles
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 50 + i) * 0.12;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.03, Math.min(0.5, alpha))})`;
        ctx.fillRect(s.x + pointerX * 0.15, s.y + pointerY * 0.15, s.size, s.size);
      }

      // Occasional data traces (slow, quiet, restrained)
      pulses.forEach((pulse) => {
        const speed = isInferencing ? pulse.speed * 1.5 : pulse.speed;
        pulse.x += speed;
        if (pulse.x > width + pulse.length) {
          pulse.x = -pulse.length;
          pulse.y = height * (0.15 + Math.random() * 0.7);
        }

        let traceColor = pulse.color;
        if (isTrustWarn) traceColor = '#F1B55A';
        else if (isComplete) traceColor = '#43D3A1';

        const grad = ctx.createLinearGradient(pulse.x, pulse.y, pulse.x + pulse.length, pulse.y);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, traceColor);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(pulse.x, pulse.y);
        ctx.lineTo(pulse.x + pulse.length, pulse.y);
        ctx.stroke();

        // Subtle glowing tip
        ctx.fillStyle = traceColor;
        ctx.beginPath();
        ctx.arc(pulse.x + pulse.length, pulse.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#07080C]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default CosmicAtmosphere;
