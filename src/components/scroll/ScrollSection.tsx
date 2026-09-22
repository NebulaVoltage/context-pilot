import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  children,
  className = '',
  onEnter,
  onLeave
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (isInView && onEnter) {
      onEnter();
    } else if (!isInView && onLeave) {
      onLeave();
    }
  }, [isInView, onEnter, onLeave]);

  return (
    <section 
      id={id} 
      ref={ref} 
      className={`relative min-h-screen w-full ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection;
