import { useEffect, type RefObject } from "react";

/* Sets a CSS variable --p (0 to 100) on the element, based on how far it has
   scrolled into view. Scrolling up lowers it again, so everything reverses. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--p", "100");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(100, ((window.innerHeight - top) / (window.innerHeight * 0.65)) * 100));
      el.style.setProperty("--p", p.toFixed(1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
