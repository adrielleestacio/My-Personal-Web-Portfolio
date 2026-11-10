import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

/**
 * Wraps children in a scroll-triggered fade/slide reveal.
 * `delay` staggers siblings in a grid.
 */
export const Reveal = ({ children, className, delay = 0, as = "div", ...rest }) => {
  const Tag = as;
  const { ref, isVisible } = useReveal();

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", isVisible && "reveal-visible", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
