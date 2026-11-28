"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Bebas_Neue } from "next/font/google";
import { useScrollProgress } from "./useScrollProgress";

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

export default function Gallery() {
  const [itemW, setItemW] = useState(300);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offset = useRef(0);
  const paused = useRef(false);

  /* scroll heading effect */
  const headRef = useRef<HTMLDivElement | null>(null);
  useScrollProgress(headRef);

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
    <section id="gallery" className="scroll-mt-24 relative w-full overflow-hidden bg-[#1a1410] py-8">
      
      {/* header */}
      <div
        ref={headRef}
        className="sh mx-auto mb-12 flex w-full flex-col gap-6 px-5 sm:w-11/12 sm:px-0 md:flex-row md:items-start md:justify-between lg:max-w-[1400px]"
      >
        <div className="sh-clip">
          <h2
            aria-label="Gallery. See our Safari Photography"
            className={`${bebas.className} text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl xl:text-7xl`}
          >
            <span aria-hidden="true" className="sh-line sh-l1">
              <span className="sh-badge">Gallery</span>
              <span className="sh-fill">See our Safari</span>
            </span>
            <span aria-hidden="true" className="sh-line sh-l2">
              <span className="sh-fill">Photography</span>
            </span>
          </h2>
          <div className="sh-rule" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-3">
          <span className={`${bebas.className} sh-num text-[110px] leading-[0.9]`}>4</span>
          <span className={`${bebas.className} text-xl uppercase leading-tight tracking-wide text-gray-400`}>
            National parks <br /> explored
          </span>
        </div>
      </div>

      {/* curved, auto-scrolling panel (full width) */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ perspective: `${PERSPECTIVE}px`, height: itemW * RATIO + 28 }}
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
             {/* view more link */}
      <div className="mt-0 flex justify-center">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-1.5 font-inter text-sm font-medium text-[#f59e0b] underline underline-offset-4 transition-colors hover:text-[#fbbf24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f59e0b]"
        >
          View more
          <FaArrowRight
            className="size-3 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
