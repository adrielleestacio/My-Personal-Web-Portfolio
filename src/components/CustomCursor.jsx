import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const TOUR_KEY = "portfolio_tour_v1";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Stops the auto-tour visits in order. It hops across the top of the page
// (hero avatar, then each nav item) without scrolling, so it never leaves the
// viewer at an odd position — a quick, friendly orientation.
const tourStops = [
  { selector: "#hero img", label: "Hi, I'm Adrielle 👋 Welcome!" },
  { selector: 'nav a[href="#about"]', label: "A bit about me" },
  { selector: 'nav a[href="#skills"]', label: "The tools I work with" },
  { selector: 'nav a[href="#projects"]', label: "Projects I've built" },
  { selector: 'nav a[href="#education"]', label: "Where I study" },
  { selector: 'nav a[href="#certificates"]', label: "What I've earned" },
  { selector: 'nav a[href="#contact"]', label: "Let's work together!" },
];

/**
 * A name-flag cursor that trails the real mouse with a spring and expands into
 * a labelled tooltip over any element with a `data-cursor` attribute.
 *
 * On a first visit it also plays a short automatic tour: the flag drives itself
 * through the sections. Any real interaction (move, scroll, click, key) cancels
 * it instantly. Mouse-only — touch devices get nothing.
 */
export const CustomCursor = () => {
  const flagRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const frame = useRef(0);
  const touring = useRef(false);
  const cancelled = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isTouring, setIsTouring] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    // Spring-follow loop. Eases a little slower while touring for a gliding feel.
    const tick = () => {
      const ease = touring.current ? 0.085 : 0.18;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      if (flagRef.current) {
        flagRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    const endTour = () => {
      if (!touring.current) return;
      cancelled.current = true;
      touring.current = false;
      setIsTouring(false);
    };

    // Baseline guards against scroll-induced mousemoves (same coords) ending the
    // tour; only a real move of a few pixels counts as interaction.
    let baseline = null;

    const onMove = (e) => {
      setVisible(true);

      if (touring.current) {
        if (!baseline) {
          baseline = { x: e.clientX, y: e.clientY };
        } else if (
          Math.abs(e.clientX - baseline.x) > 8 ||
          Math.abs(e.clientY - baseline.y) > 8
        ) {
          endTour();
        }
        return; // don't chase the mouse while the tour drives the flag
      }

      target.current = { x: e.clientX, y: e.clientY };
      const hit = e.target.closest?.("[data-cursor]");
      const text = hit ? hit.getAttribute("data-cursor") : null;
      setLabel((prev) => (prev === text ? prev : text));
    };

    const onLeave = () => {
      if (!touring.current) setVisible(false);
    };
    const onDown = () => {
      endTour();
      setPressed(true);
    };
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("wheel", endTour, { passive: true });
    window.addEventListener("keydown", endTour);
    window.addEventListener("touchstart", endTour, { passive: true });

    // --- Auto tour on first visit (or when forced with ?tour) ---
    const params = new URLSearchParams(window.location.search);
    const forced = params.has("tour");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = localStorage.getItem(TOUR_KEY) === "1";
    } catch {
      seen = false;
    }

    const runTour = async () => {
      touring.current = true;
      cancelled.current = false;
      setVisible(true);
      setIsTouring(true);

      // Fly the flag in from the top centre.
      target.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
      pos.current = { x: window.innerWidth / 2, y: -60 };

      await sleep(900);

      for (const stop of tourStops) {
        if (cancelled.current) break;
        const el = document.querySelector(stop.selector);
        if (!el) continue;

        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue; // hidden (e.g. mobile nav)

        target.current = {
          x: r.left + Math.min(30, r.width / 2),
          y: r.top + r.height / 2,
        };
        setLabel(stop.label);
        await sleep(1500);
      }

      setLabel(null);
      if (!cancelled.current) {
        await sleep(300);
        setVisible(false); // fade out; reappears when the viewer moves the mouse
      }
      touring.current = false;
      setIsTouring(false);
    };

    let startTimer;
    if ((forced || !seen) && !reduced) {
      try {
        localStorage.setItem(TOUR_KEY, "1");
      } catch {
        /* storage blocked — tour still plays this once */
      }
      startTimer = setTimeout(runTour, 1000);
    }

    return () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(startTimer);
      cancelled.current = true;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("wheel", endTour);
      window.removeEventListener("keydown", endTour);
      window.removeEventListener("touchstart", endTour);
    };
  }, []);

  if (!enabled) return null;

  const expanded = Boolean(label);

  return (
    <>
      <div
        ref={flagRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
      >
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

      {/* Hint shown only while the auto-tour is playing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-border bg-card/90 px-4 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur-sm"
        style={{
          opacity: isTouring ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        ✨ Quick tour — move your mouse to skip
      </div>
    </>
  );
};
