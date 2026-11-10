import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 * Uses a top-biased root margin so a section counts as active once its
 * heading reaches the upper third of the viewport.
 */
export const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};
