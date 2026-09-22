import { useState, useEffect, RefObject } from 'react';

interface InViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(
  ref: RefObject<Element>,
  options: InViewOptions = {}
) {
  const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsInView(isIntersecting);

        if (isIntersecting) {
          setHasBeenInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return { isInView, hasBeenInView };
}
