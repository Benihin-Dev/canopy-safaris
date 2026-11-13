"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

/* ---------- photos: public/images/gallery/safari/ ---------- */

/* OLD WAY (kept for later): auto-numbered 1.jpg ... N.jpg
   Only works if the files are named exactly 1.jpg, 2.jpg, 3.jpg ... with no gaps.
   To use it again: uncomment this line and delete the "files" list below.

const images = Array.from({ length: 25 }, (_, i) => `/images/gallery/safari/${i + 1}.jpg`);
*/

/* NEW WAY: list the real file names (any name works, gaps are fine) */
const files = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg", // <- replace with the real name of your 25th file
];

const images = [...files]
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((f) => `/images/gallery/safari/${f}`);

/* ---------- tweak the look here ---------- */
const SPEED = 60;        // px per second (left to right)
const GAP = 8;          // px between photos
const MAX_TILT = 12;      // deg, outer photos turn toward the centre
const DEPTH = 120;        // px, how far the centre sits back
const PERSPECTIVE = 1300;
const RATIO = 1.3;      // photo height / width

/* ---------- heading letter effect ---------- */
const SHADE = [91, 96, 93];   // gray shade the letters start from
const DIR = -1;               // -1 = shift left, 1 = shift right
const SHIFT = 6;              // px, how far letters sit away (smaller = softer)
const SPREAD = 0.6;           // lower = more overlap = smoother, higher = strictly letter by letter
const LINE_GAP = 5;           // pause between lines, counted in "letters" (higher = longer wait)
const RANGE = 0.6;            // scroll length of the effect (x screen height). Higher = slower, smoother
const START = 0.8;            // effect begins when the heading is this far down the screen (0.8 = 80%)

function useScrollLetters(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // each letter's own final colour (white for the heading, amber for the Gallery pill)
    const finals = letters.map((l) => {
      const m = getComputedStyle(l).color.match(/\d+/g);
      return m ? m.slice(0, 3).map(Number) : [255, 255, 255];
    });

    // order of each letter, with an extra pause every time a new line starts
    let idx = 0;
    let lastLine = letters[0]?.dataset.line;
    const order = letters.map((l) => {
      if (l.dataset.line !== lastLine) {
        idx += LINE_GAP;
        lastLine = l.dataset.line;
      }
      return idx++;
    });
    const total = idx;

    const update = () => {
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // 0 while the heading is low on the screen, 1 once it has come up
      const p = Math.min(1, Math.max(0, (vh * START - top) / (vh * RANGE)));
      letters.forEach((l, i) => {
        const start = (order[i] / total) * SPREAD;
        let t = Math.min(1, Math.max(0, (p - start) / (1 - SPREAD)));
        t = t * t * (3 - 2 * t); // smooth start and end
        const f = finals[i];
        const c = SHADE.map((v, k) => Math.round(v + (f[k] - v) * t)).join(",");
        l.style.color = `rgb(${c})`;
        if (!reduce) l.style.transform = `translateX(${DIR * (1 - t) * SHIFT}px)`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
}

function Letters({ text, line }: { text: string; line: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {[...w].map((c, i) => (
              <span
                key={i}
                data-letter
                data-line={line}
                className="inline-block will-change-transform transition-[color,transform] duration-200 ease-out"
              >
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
}

export default function Gallery() {
  const [itemW, setItemW] = useState(300);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offset = useRef(0);
  const paused = useRef(false);

  /* heading letter effect (must be INSIDE the component) */
  const headRef = useRef<HTMLHeadingElement | null>(null);
  useScrollLetters(headRef);

  /* repeat the list so the loop never shows a gap */
  const items = [...images, ...images, ...images];

  /* how many photos are visible (the decimal leaves a cut-off photo on the edges) */
  useEffect(() => {
    const size = () => {
      const w = wrapRef.current?.offsetWidth || window.innerWidth;
      const visible = w >= 1024 ? 4.7 : w >= 640 ? 2.7 : 1.3;
      setItemW(w / visible - GAP);
    };
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  /* animation loop */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = itemW + GAP;
    const total = items.length * step;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current && !reduce) offset.current -= SPEED * dt;

      const half = (wrapRef.current?.offsetWidth || 0) / 2;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = ((((i * step + offset.current) % total) + total) % total) - step;
        const dx = x + itemW / 2 - half;
        const n = Math.max(-1, Math.min(1, dx / half));
        const z = -DEPTH * (1 - n * n);
        const rot = -n * MAX_TILT;
        el.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${rot}deg)`;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [itemW, items.length]);

  return (
    <section className="relative w-full overflow-hidden bg-[#1a1410] py-16">
      
      {/* header */}
      <div className="mx-auto mb-12 flex w-full flex-col gap-6 px-5 sm:w-11/12 sm:px-0 md:flex-row md:items-start md:justify-between lg:max-w-[1400px]">
        <h2
          ref={headRef}
          className={`${bebas.className} text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl xl:text-7xl`}
        >
          <span className="mr-4 inline-block -rotate-[8deg] rounded-full border border-[#f59e0b] px-6 py-2.5 align-middle text-lg italic leading-none tracking-wider text-[#f59e0b]">
            <Letters text="Gallery" line={0} />
          </span>
          <span className="sm:whitespace-nowrap">
            <Letters text="See our Safari" line={1} />
          </span>
          <br />
          <Letters text="Photography" line={2} />
        </h2>

        <div className="flex items-center gap-3">
          <span className={`${bebas.className} text-7xl leading-none text-[#f59e0b] xl:text-8xl`}>
            10K<span className="text-5xl xl:text-6xl">+</span>
          </span>
          <span className={`${bebas.className} text-xl uppercase leading-tight tracking-wide text-gray-400`}>
            Successfully <br /> placed visited
          </span>
        </div>
      </div>

      {/* curved, auto-scrolling panel (full width) */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ perspective: `${PERSPECTIVE}px`, height: itemW * RATIO + 40 }}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
      >
        {items.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-0 top-5 overflow-hidden rounded-md bg-[#2a2119] will-change-transform"
            style={{ width: itemW, height: itemW * RATIO }}
          >
            <Image
              src={src}
              alt={`Travel photo ${(i % images.length) + 1}`}
              fill
              sizes="(min-width:1024px) 22vw, (min-width:640px) 38vw, 80vw"
              className="object-cover"
              draggable={false}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
