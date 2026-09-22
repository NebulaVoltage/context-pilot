import React from 'react';
import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '@/utils/easing';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
  animate?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  variant = 'default',
  animate = false,
  glow = false,
  glowColor = 'rgba(34,211,238,0.15)' // cyan-500 with opacity
}) => {
  const variantStyles = {
    default: 'bg-white/[0.03]',
    elevated: 'bg-white/[0.06]',
    subtle: 'bg-white/[0.02]'
  };

  const baseStyles = `backdrop-blur-xl border border-white/[0.08] rounded-2xl transition-colors hover:border-white/[0.15] ${variantStyles[variant]}`;
  const glowStyle = glow ? { boxShadow: `0 0 30px ${glowColor}` } : {};

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_SMOOTH}
        className={`${baseStyles} ${className}`}
        style={glowStyle}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div 
      className={`${baseStyles} ${className}`}
      style={glowStyle}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
