import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element the first time it scrolls into view.
 * Returns a ref to attach and a boolean for the visible state.
 */
export const useReveal = ({ threshold = 0.15 } = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced-motion by showing content immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
