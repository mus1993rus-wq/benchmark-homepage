import { useEffect, useRef } from "react";

/**
 * Scroll-driven hero expand animation.
 * The hero starts as a rounded card with padding, and expands to full-bleed on scroll.
 *
 * Returns refs to attach to:
 *   outerRef → the background/padding wrapper
 *   innerRef → the clipped container with border-radius
 *
 * Directly manipulates DOM styles (no setState) for silky-smooth 60fps animation.
 */
export function useHeroScroll({
  scrollDistance = 280,
  maxPadding = 16,
  maxRadius = 20,
} = {}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let rafId;

    const update = () => {
      const progress = Math.min(window.scrollY / scrollDistance, 1);
      const pad = (maxPadding * (1 - progress)).toFixed(3);
      const rad = (maxRadius * (1 - progress)).toFixed(3);
      outer.style.padding = `${pad}px`;
      inner.style.borderRadius = `${rad}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Sync immediately on mount (handles non-zero scrollY after navigation)
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollDistance, maxPadding, maxRadius]);

  return { outerRef, innerRef };
}
