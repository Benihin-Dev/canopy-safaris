import { useEffect, type RefObject } from "react";

/* Sets a CSS variable --p (0 to 100) on the element, based on how far it has
   scrolled into view. The value glides toward the scroll position instead of
   jumping, so the animation feels smooth. Scrolling up lowers it again. */
const SMOOTHNESS = 8; // higher = snappier, lower = softer (try 5 to 12)

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--p", "100");
      return;
    }

    const clamp = (n: number) => Math.max(0, Math.min(100, n));
    const measure = () => {
      const top = el.getBoundingClientRect().top;
      return clamp(((window.innerHeight - top) / (window.innerHeight * 0.65)) * 100);
    };
    const apply = (v: number) => el.style.setProperty("--p", v.toFixed(2));

    let target = measure();
    let current = target; // no animation on first load
    apply(current);

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.05) {
        current = target;
        apply(current);
        raf = 0;
        return;
      }
      current += diff * (1 - Math.exp(-SMOOTHNESS * dt));
      apply(current);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = measure();
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
