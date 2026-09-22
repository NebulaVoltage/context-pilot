import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMagneticHover } from '@/hooks/useMagneticHover';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  icon,
  showArrow = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { x, y } = useMagneticHover(buttonRef, { strength: 0.2, radius: 120 });

  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2 gap-2',
    md: 'text-base px-6 py-3 gap-3',
    lg: 'text-lg px-8 py-4 gap-4',
    icon: 'p-3 gap-0'
  };

  const variantStyles = {
    primary: 'bg-graphite-800 text-white border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    secondary: 'bg-transparent text-white border border-graphite-600 hover:border-graphite-400 hover:bg-white/5',
    ghost: 'bg-transparent text-graphite-300 hover:text-white border border-transparent hover:underline underline-offset-4'
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      animate={{ x, y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING_CONFIG}
      data-actionable="true"
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="flex-shrink-0 text-cyan-400"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={SPRING_CONFIG}
        >
          <ArrowRight className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button;
