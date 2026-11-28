import { useEffect, type RefObject } from "react";

/* Phones only (under 640px wide): shrinks the heading until each line fits.
   On bigger screens it does nothing, so your normal sizes stay. */
export function useFitHeading(
  scopeRef: RefObject<HTMLElement | null>,   // the element that holds the --p variable
  headingRef: RefObject<HTMLElement | null>, // the <h2>
  maxPx = 48,
  minPx = 18,
  breakpoint = 640,
) {
  useEffect(() => {
    const scope = scopeRef.current;
    const h = headingRef.current;
    const clip = h?.parentElement;
    if (!scope || !h || !clip) return;

    const fit = () => {
      if (window.innerWidth >= breakpoint) {
        h.style.fontSize = "";
        return;
      }
      /* measure in the final state, when the letters are closest together */
      const prev = scope.style.getPropertyValue("--p");
      scope.style.setProperty("--p", "100");

      let size = maxPx;
      for (let i = 0; i < 4; i++) {
        h.style.fontSize = `${size}px`;
        const avail = clip.clientWidth;
        const need = Math.max(
          ...Array.from(h.querySelectorAll<HTMLElement>(".sh-line")).map((line) => {
            const last = line.lastElementChild as HTMLElement | null;
            return last ? last.getBoundingClientRect().right - line.getBoundingClientRect().left : 0;
          }),
        );
        if (need <= avail || size <= minPx) break;
        size = Math.max(minPx, Math.floor((size * avail) / need) - 1);
      }

      if (prev) scope.style.setProperty("--p", prev);
      else scope.style.removeProperty("--p");
    };

    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [scopeRef, headingRef, maxPx, minPx, breakpoint]);
}
