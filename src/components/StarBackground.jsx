import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const generateStars = () => {
      const numberOfStars = Math.floor(
        (window.innerWidth * window.innerHeight) / 12000
      );

      setStars(
        Array.from({ length: numberOfStars }, (_, id) => ({
          id,
          size: Math.random() * 2.5 + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.4 + 0.3,
          animationDuration: Math.random() * 4 + 2,
        }))
      );
    };

    const generateMeteors = () => {
      setMeteors(
        Array.from({ length: 4 }, (_, id) => ({
          id,
          size: Math.random() * 2 + 1,
          x: Math.random() * 100,
          y: Math.random() * 20,
          delay: Math.random() * 15,
          animationDuration: Math.random() * 3 + 3,
        }))
      );
    };

    generateStars();
    generateMeteors();

    // Debounced so a drag-resize doesn't regenerate on every frame.
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(generateStars, 200);
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
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
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
            // The unit was missing here, so the delay was invalid and every
            // meteor fired at once.
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};
