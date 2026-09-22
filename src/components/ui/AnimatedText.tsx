import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  variant?: 'word' | 'character' | 'line';
  delay?: number;
  staggerDelay?: number;
  className?: string;
  onComplete?: () => void;
  trigger?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  variant = 'word',
  delay = 0,
  staggerDelay,
  className = '',
  onComplete,
  trigger = true
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion && trigger && !hasAnimated) {
      setHasAnimated(true);
      onComplete?.();
    }
  }, [prefersReducedMotion, trigger, hasAnimated, onComplete]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const defaultStagger = variant === 'character' ? 0.03 : variant === 'word' ? 0.08 : 0.15;
  const stagger = staggerDelay ?? defaultStagger;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  const renderContent = () => {
    if (variant === 'character') {
      return text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={child}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ));
    }
    
    if (variant === 'word') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block whitespace-pre mr-[0.25em]"
        >
          {word}
        </motion.span>
      ));
    }
    
    // Line variant
    return text.split('\n').map((line, index) => (
      <motion.span
        key={`line-${index}`}
        variants={child}
        className="block"
      >
        {line}
      </motion.span>
    ));
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (trigger && !hasAnimated) {
          setHasAnimated(true);
          onComplete?.();
        }
      }}
    >
      {renderContent()}
    </motion.span>
  );
};

export default AnimatedText;
