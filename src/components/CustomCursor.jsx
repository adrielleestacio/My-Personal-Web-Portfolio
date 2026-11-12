import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const TOUR_KEY = "portfolio_tour_v2";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Resolves on the next paint, or after 60ms if frames have stopped — a
// backgrounded tab pauses requestAnimationFrame entirely, which would otherwise
// wedge the tour mid-stop instead of letting it play on.
const nextTick = () =>
  new Promise((resolve) => {
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      resolve();
    };
    requestAnimationFrame(fire);
    setTimeout(fire, 60);
  });

// The guided tour walks a first-time visitor through the whole page. For each
// stop it smooth-scrolls the section into view, draws a ring around the element
// and parks the labelled flag beside it. Any real interaction cancels it.
const tourStops = [
  {
    selector: "#hero img",
    label: "Hi, I'm Adrielle 👋 Let me show you around!",
    scroll: false,
    hold: 2400,
  },
  { selector: "#about h2", label: "First, a little about me" },
  { selector: "#skills h2", label: "These are the tools I work with" },
  { selector: "#projects h2", label: "And here's what I've actually built" },
  { selector: "#projects h3", label: "Hover any card — they tilt 😎", pad: 0.4 },
  { selector: "#education h2", label: "I'm taking up BSIT at PSAU" },
  { selector: "#certificates h2", label: "Seminars and awards I've earned" },
  {
    selector: '#certificates a[href*="certificates/"]',
    label: "Open one to see the real certificate",
    pad: 0.45,
  },
  {
    selector: "#contact h2",
    label: "Need a developer? Let's talk 🚀",
    hold: 2600,
  },
];

/** An element's opacity including every ancestor's — sections below the fold
 *  sit inside a `Reveal` that fades in, so the element itself reads as 1 even
 *  while it is still invisible on screen. */
const effectiveOpacity = (el) => {
  let value = 1;
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    value *= parseFloat(getComputedStyle(n).opacity) || 0;
  }
  return value;
};

/** Tight box around an element's own text, so a full-width heading doesn't
 *  produce a full-width ring. Falls back to the layout box (images, icons). */
const textRect = (el) => {
  try {
    const range = document.createRange();
    range.selectNodeContents(el);
    const r = range.getBoundingClientRect();
    if (r.width > 4 && r.height > 4) return r;
  } catch {
    /* ignore — fall through to the layout box */
  }
  return el.getBoundingClientRect();
};

/**
 * A name-flag cursor that trails the real mouse with a spring and expands into
 * a labelled tooltip over any element with a `data-cursor` attribute.
 *
 * On a first visit it also drives an automatic guided tour down the page. Any
 * real interaction (move, scroll, click, key) cancels it instantly. Mouse-only
 * — touch devices and reduced-motion visitors get nothing.
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
  const [ring, setRing] = useState(null);
  const [step, setStep] = useState(0);

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
      setRing(null);
      setLabel(null);
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

    // Smooth-scrolls to `y` and resolves once the page stops moving. Programmatic
    // scrolling fires no `wheel` event, so this never cancels the tour itself.
    const scrollTo = (y) =>
      new Promise((resolve) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const dest = Math.max(0, Math.min(y, max));
        if (Math.abs(dest - window.scrollY) < 4) return resolve();

        const from = window.scrollY;
        window.scrollTo({ top: dest, behavior: "smooth" });

        let last = window.scrollY;
        let still = 0;
        const deadline = Date.now() + 2000;
        const watch = async () => {
          while (!cancelled.current && Date.now() < deadline) {
            const now = window.scrollY;
            if (Math.abs(now - last) < 0.5) {
              if (++still > 4) break;
            } else {
              still = 0;
            }
            last = now;
            await nextTick();
          }
          // Some browsers ignore smooth scrolling entirely; jump if nothing moved.
          if (!cancelled.current && Math.abs(window.scrollY - from) < 4) {
            window.scrollTo({ top: dest, behavior: "auto" });
          }
          resolve();
        };
        watch();
      });

    // Rings the element and parks the flag just under its bottom-left, so the
    // tooltip hangs below the ring instead of covering the text.
    const place = (el) => {
      const r = textRect(el);
      setRing({
        top: r.top - 10,
        left: r.left - 14,
        width: r.width + 28,
        height: r.height + 20,
      });
      target.current = {
        x: Math.min(r.left + Math.min(r.width / 2, 140), window.innerWidth - 250),
        y: Math.min(r.bottom + 6, window.innerHeight - 120),
      };
    };

    // Keeps the ring glued to the element while its reveal animation settles.
    const settle = async (el, ms) => {
      const deadline = Date.now() + ms;
      while (Date.now() < deadline && !cancelled.current) {
        place(el);
        await nextTick();
      }
    };

    // Scroll-reveal fades each section in over 700ms. Wait for the target to be
    // on screen before pointing at it, so the ring never circles blank space.
    const waitForVisible = async (el, maxMs = 1400) => {
      const deadline = Date.now() + maxMs;
      while (Date.now() < deadline && !cancelled.current) {
        if (effectiveOpacity(el) > 0.9) return;
        await nextTick();
      }
    };

    // A hidden tab can't scroll at all, so a tour started there would play out
    // against nothing. Hold until the visitor is actually looking at the page.
    let onVisibility = null;
    const whenVisible = () =>
      document.hidden
        ? new Promise((resolve) => {
            onVisibility = () => {
              if (document.hidden) return;
              document.removeEventListener("visibilitychange", onVisibility);
              onVisibility = null;
              resolve();
            };
            document.addEventListener("visibilitychange", onVisibility);
          })
        : Promise.resolve();

    const runTour = async () => {
      await whenVisible();
      if (cancelled.current) return;

      // Only burn the "already seen it" flag once the tour really plays.
      try {
        localStorage.setItem(TOUR_KEY, "1");
      } catch {
        /* storage blocked — tour just plays again next time */
      }

      touring.current = true;
      cancelled.current = false;
      setVisible(true);
      setIsTouring(true);

      // Fly the flag in from the top centre.
      target.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
      pos.current = { x: window.innerWidth / 2, y: -60 };

      await sleep(900);

      for (let i = 0; i < tourStops.length; i++) {
        const stop = tourStops[i];
        if (cancelled.current) break;

        const el = document.querySelector(stop.selector);
        if (!el || !el.getClientRects().length) continue; // missing or hidden

        if (stop.scroll !== false) {
          const from = el.getBoundingClientRect();
          await scrollTo(
            window.scrollY + from.top - window.innerHeight * (stop.pad ?? 0.3)
          );
          if (cancelled.current) break;
          await waitForVisible(el);
          if (cancelled.current) break;
        }

        setStep(i + 1);
        place(el);
        setLabel(stop.label);

        const hold = stop.hold ?? 2000;
        await settle(el, 450); // ride out the last of the reveal's slide-up
        if (cancelled.current) break;
        await sleep(Math.max(400, hold - 450));
      }

      setLabel(null);
      setRing(null);

      if (!cancelled.current) {
        await scrollTo(0); // leave the visitor back at the top, ready to explore
        await sleep(300);
        setVisible(false); // fade out; reappears when the viewer moves the mouse
      }
      touring.current = false;
      setIsTouring(false);
    };

    let startTimer;
    if ((forced || !seen) && !reduced) {
      startTimer = setTimeout(runTour, 1000);
    }

    return () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(startTimer);
      cancelled.current = true;
      if (onVisibility) {
        document.removeEventListener("visibilitychange", onVisibility);
      }
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
      {/* Spotlight ring around whatever the tour is pointing at. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[90] rounded-xl"
        style={{
          top: ring?.top ?? 0,
          left: ring?.left ?? 0,
          width: ring?.width ?? 0,
          height: ring?.height ?? 0,
          opacity: ring ? 1 : 0,
          boxShadow:
            "0 0 0 2px hsl(var(--primary) / 0.55), 0 0 0 7px hsl(var(--primary) / 0.12), 0 0 28px 4px hsl(var(--primary) / 0.22)",
          transition:
            "top 0.55s cubic-bezier(0.22, 1, 0.36, 1), left 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s",
        }}
      />

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

      {/* Progress + skip hint, shown only while the auto-tour is playing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur-sm"
        style={{ opacity: isTouring ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <span className="flex items-center gap-1.5">
          {tourStops.map((stop, i) => (
            <span
              key={stop.selector}
              className="h-1.5 w-1.5 rounded-full transition-all duration-300"
              style={{
                background:
                  i < step
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.3)",
                transform: i === step - 1 ? "scale(1.7)" : "scale(1)",
              }}
            />
          ))}
        </span>
        <span className="whitespace-nowrap">move your mouse to skip</span>
      </div>
    </>
  );
};
