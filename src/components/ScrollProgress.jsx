import { useEffect, useRef, useState } from "react";

/** A thin gradient bar at the top of the page that tracks scroll progress. */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        className="h-full rounded-r-full bg-linear-to-r from-primary via-primary to-primary/40 shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
