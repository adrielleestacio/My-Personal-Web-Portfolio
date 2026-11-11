import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

/**
 * A name-flag cursor that trails the real mouse with a spring, and expands
 * into a labelled tooltip when hovering any element that carries a
 * `data-cursor="…"` attribute — a light guided-tour feel.
 *
 * Only runs on fine-pointer (mouse) devices; touch screens get nothing.
 */
export const CustomCursor = () => {
  const flagRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const frame = useRef(0);

  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null); // the hovered element's description
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Mouse-only: skip touch/coarse pointers entirely.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const hit = e.target.closest?.("[data-cursor]");
      const text = hit ? hit.getAttribute("data-cursor") : null;
      setLabel((prev) => (prev === text ? prev : text));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Spring-follow loop: lerp toward the real cursor each frame.
    const tick = () => {
      const ease = 0.18;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      if (flagRef.current) {
        flagRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!enabled) return null;

  const expanded = Boolean(label);

  return (
    <div
      ref={flagRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      {/* Pointer tip */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        className="drop-shadow-sm"
        style={{
          transform: `scale(${pressed ? 0.8 : 1})`,
          transition: "transform 0.12s ease",
        }}
      >
        <path
          d="M4 3 L17 10 L11 11.5 L8.5 17.5 Z"
          fill="hsl(var(--primary))"
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Name flag / tooltip */}
      <div
        className="absolute left-4 top-4 flex flex-col gap-0.5 rounded-2xl bg-[#111216] px-3 py-1.5 text-white shadow-lg"
        style={{
          width: "max-content",
          maxWidth: expanded ? 220 : 120,
          transition:
            "max-width 0.25s ease, padding 0.2s ease, border-radius 0.2s ease",
        }}
      >
        <span
          className={
            expanded
              ? "text-[10px] font-semibold uppercase tracking-wider text-primary"
              : "whitespace-nowrap text-sm font-semibold"
          }
        >
          {profile.cursorName}
        </span>
        {expanded && (
          <span className="whitespace-normal text-sm font-medium leading-snug">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
