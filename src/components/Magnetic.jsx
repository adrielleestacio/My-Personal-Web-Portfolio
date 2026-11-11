import { useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pulls its child gently toward the cursor on hover — a subtle magnetic
 * micro-interaction for buttons. No-op under reduced motion / touch.
 */
export const Magnetic = ({ children, strength = 0.3, className }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ display: "inline-flex", transition: "transform 0.25s ease-out" }}
    >
      {children}
    </span>
  );
};
