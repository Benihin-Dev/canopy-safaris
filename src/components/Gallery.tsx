"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ---------- photos: public/images/gallery/travel/1.jpg ... 8.jpg ----- change number 8 if you add more---------- */
const images = Array.from({ length: 8 }, (_, i) => `/images/gallery/travel/${i + 1}.jpg`);

/* ---------- tweak the look here ---------- */
const SPEED = 45;        // px per second (left to right)
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
      if (!paused.current && !reduce) offset.current += SPEED * dt;

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
<div className="mx-auto mb-12 flex w-full flex-col gap-6 px-5 sm:w-11/12 sm:px-0 md:flex-row md:items-start md:justify-between lg:max-w-350">
  <h2 className="font-bebas max-w-xl text-6xl uppercase leading-[0.95] text-white xl:text-7xl">
    <span className="mr-4 inline-block -rotate-[8deg] rounded-full border border-[#f59e0b] px-6 py-2.5 align-middle text-lg italic leading-none tracking-wider text-[#f59e0b]">
      Gallery
    </span>
    See our travel photography
  </h2>

  <div className="flex items-center gap-3">
    <span className="font-bebas text-7xl leading-none text-[#f59e0b] xl:text-8xl">
      10K<span className="text-5xl xl:text-6xl">+</span>
    </span>
    <span className="font-bebas text-xl uppercase leading-tight tracking-wide text-gray-400">
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
