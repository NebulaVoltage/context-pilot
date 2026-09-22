import React from 'react';

interface ScrollManagerProps {
  children: React.ReactNode;
}

/**
 * Clean wrapper component for the page flow.
 * Provides standard, unhijacked top-to-bottom natural document scrolling.
 */
export const ScrollManager: React.FC<ScrollManagerProps> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

export default ScrollManager;
