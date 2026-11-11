import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Large ambient glows. Positions/sizes are in viewport units so they scale
// with the screen. Colours come from the --aurora-* theme tokens.
const auroraBlobs = [
  {
    id: "a",
    color: "var(--aurora-1)",
    size: "48vw",
    top: "-12vh",
    left: "-8vw",
    animation: "animate-aurora",
  },
  {
    id: "b",
    color: "var(--aurora-2)",
    size: "42vw",
    top: "6vh",
    right: "-10vw",
    animation: "animate-aurora-slow",
  },
  {
    id: "c",
    color: "var(--aurora-1)",
    size: "40vw",
    bottom: "-16vh",
    left: "22vw",
    animation: "animate-aurora",
  },
];

const buildStars = () => {
  if (typeof window === "undefined") return [];
  const numberOfStars = Math.floor(
    (window.innerWidth * window.innerHeight) / 11000
  );
  return Array.from({ length: numberOfStars }, (_, id) => ({
    id,
    size: Math.random() * 2.5 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.3,
    animationDuration: Math.random() * 4 + 2,
    animationDelay: Math.random() * 5,
  }));
};

const buildMeteors = () =>
  Array.from({ length: 4 }, (_, id) => ({
    id,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 20,
    // Spread the first streaks out so a refresh doesn't fire them all at once.
    delay: 4 + Math.random() * 16,
    animationDuration: Math.random() * 3 + 3,
  }));

export const StarBackground = () => {
  // Generated during the first render (not in an effect) so the stars are
  // painted on the very first frame — no empty flash / pop-in on refresh.
  const [stars, setStars] = useState(() =>
    prefersReducedMotion() ? [] : buildStars()
  );
  const [meteors] = useState(() =>
    prefersReducedMotion() ? [] : buildMeteors()
  );

  // Only re-generate the star field when the window size changes.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setStars(buildStars()), 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Ambient aurora glows — always rendered (they don't drift under
          reduced-motion because the animation utilities are disabled there). */}
      {auroraBlobs.map((blob) => (
        <div
          key={blob.id}
          className={`aurora-blob ${blob.animation}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            background: `radial-gradient(circle at center, hsl(${blob.color} / var(--aurora-opacity)) 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Technical grid overlay, fades out toward the edges. */}
      <div className="bg-grid" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};
