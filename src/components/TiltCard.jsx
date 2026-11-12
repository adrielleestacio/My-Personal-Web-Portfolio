import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// How much of the remaining distance the card covers each frame. Low enough
// that the surface feels like it has weight, high enough to keep up.
const EASE = 0.16;
const KEYS = ["rx", "ry", "mx", "my", "lift"];

/**
 * Gives a card real depth: the face turns toward the cursor, a tight specular
 * highlight tracks the pointer across it, and the drop shadow swings opposite
 * the tilt so the lift reads as physical rather than painted on.
 *
 * The face is a `preserve-3d` context, so children marked `layer-3d` stand off
 * it along Z and parallax as the card turns. They read the `--lift` variable
 * this component writes, which ramps 0 → 1 on hover.
 *
 * Motion runs on a rAF loop that only spins while a card is settling, and
 * reduced-motion visitors get the flat card with no tilt at all.
 */
export const TiltCard = ({
  children,
  className,
  max = 8,
  glare = true,
  ...rest
}) => {
  const face = useRef(null);
  const frame = useRef(0);
  const to = useRef({ rx: 0, ry: 0, mx: 50, my: 50, lift: 0 });
  const at = useRef({ rx: 0, ry: 0, mx: 50, my: 50, lift: 0 });

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  const tick = useCallback(() => {
    frame.current = 0;
    const el = face.current;
    if (!el) return;

    const a = at.current;
    const t = to.current;
    let moving = false;

    for (const key of KEYS) {
      const delta = t[key] - a[key];
      if (Math.abs(delta) > 0.01) moving = true;
      a[key] += delta * EASE;
    }

    const lift = a.lift;
    el.style.transform =
      `perspective(1000px) rotateX(${a.rx.toFixed(3)}deg) rotateY(${a.ry.toFixed(3)}deg)` +
      ` translate3d(0, ${(-7 * lift).toFixed(2)}px, 0) scale(${(1 + 0.018 * lift).toFixed(4)})`;
    el.style.setProperty("--mx", `${a.mx.toFixed(2)}%`);
    el.style.setProperty("--my", `${a.my.toFixed(2)}%`);
    el.style.setProperty("--lift", lift.toFixed(3));

    // The drop shadow falls away from the raised edge — that, more than the
    // rotation itself, is what makes the lift read as physical. The inset pair
    // lights the top edge and darkens the bottom one, like a bevelled slab.
    el.style.boxShadow =
      lift < 0.01
        ? ""
        : [
            `inset 0 1px 0 hsl(0 0% 100% / ${(0.3 * lift).toFixed(3)})`,
            `inset 0 -1px 0 hsl(250 47% 20% / ${(0.08 * lift).toFixed(3)})`,
            `${(-a.ry * 1.5).toFixed(1)}px ${(a.rx * 1.5 + 16 * lift).toFixed(1)}px ${(34 * lift).toFixed(1)}px -10px hsl(250 47% 20% / ${(0.3 * lift).toFixed(3)})`,
          ].join(", ");

    if (moving) frame.current = requestAnimationFrame(tick);
  }, []);

  const run = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  const onMove = (event) => {
    const el = face.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width;
    const py = (event.clientY - r.top) / r.height;
    to.current = {
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      mx: px * 100,
      my: py * 100,
      lift: 1,
    };
    run();
  };

  const onLeave = () => {
    to.current = { rx: 0, ry: 0, mx: 50, my: 50, lift: 0 };
    run();
  };

  useEffect(() => stop, [stop]);

  return (
    <div
      ref={face}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("tilt-face group relative rounded-xl", className)}
      {...rest}
    >
      {children}

      {glare && (
        <>
          {/* Wide coloured wash, then a tight white specular on top of it. */}
          <span aria-hidden="true" className="tilt-glare" />
          <span aria-hidden="true" className="tilt-sheen" />
        </>
      )}
    </div>
  );
};
