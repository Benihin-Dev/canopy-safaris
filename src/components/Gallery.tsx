"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Heading from "./Elements/Heading";

/* ---------- put your photos here (public/images/gallery/...) ---------- */
const make = (folder, n) =>
  Array.from({ length: n }, (_, i) => `/images/gallery/${folder}/${i + 1}.jpg`);

const galleries = [
  { name: "National Parks", images: make("parks", 6) },
  { name: "Wildlife Close-Ups", images: make("wildlife", 6) },
  { name: "Golden Hour", images: make("golden", 6) },
  { name: "Camp Life", images: make("camp", 6) },
];

/* ---------- tweak the look here ---------- */
const SPEED = 45; // px per second (moves left to right)
const GAP = 8; // px between photos
const MAX_TILT = 12; // deg, how much the outer photos turn toward the centre
const DEPTH = 120; // px, how far the centre photo sits back (the curve)
const PERSPECTIVE = 1300;
const RATIO = 1.3; // photo height / width

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [itemW, setItemW] = useState(300);

  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  const offset = useRef(0);
  const paused = useRef(false);

  /* repeat the list 3x so the loop never shows a gap */
  const list = galleries[active].images;
  const items = [...list, ...list, ...list];

  /* photo width: 5 on desktop, 3 on tablet, 1 on phone */
  useEffect(() => {
    const size = () => {
      const w = wrapRef.current?.offsetWidth || window.innerWidth;
      const visible = w >= 1024 ? 5 : w >= 640 ? 3 : 1.2;
      setItemW((w - GAP * (Math.ceil(visible) - 1)) / visible);
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

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current && !reduce) offset.current += SPEED * dt;

      const W = wrapRef.current?.offsetWidth || 0;
      const half = W / 2;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        // wrap each photo around the loop
        const x = (((i * step + offset.current) % total) + total) % total - step;

        const dx = x + itemW / 2 - half; // distance from centre
        const n = Math.max(-1, Math.min(1, dx / half));
        const z = -DEPTH * (1 - n * n); // centre sits back, edges come forward
        const rot = -n * MAX_TILT; // outer photos turn inward
        el.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${rot}deg)`;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [itemW, active, items.length, list.length]);

  return (
    <div className="relative w-full bg-[#121212] py-20">
      <div className="mx-auto w-full px-5 sm:w-11/12 sm:px-0 lg:max-w-350">
        <Heading
          title="Gallery | Canopy Safaris"
          textColor="text-[#ffffff] tracking-wider"
          lineColor="from-[#ffffff]"
        />
        <h1 className="font-libertinus_Math mx-auto mt-2 w-full pb-1 text-center text-5xl font-medium text-[#ffffff] xl:text-6xl">
          Moments From The Wild
        </h1>
        <h2 className="font-poppins mx-auto w-full text-center text-sm text-[#ffffff] md:w-1/2">
          A visual journey through Sri Lanka&apos;s landscapes and wildlife,
          captured on our safaris
        </h2>

        {/* category tabs */}
        <div className="relative z-30 mt-14 flex flex-wrap items-center justify-center gap-3 pb-10 sm:gap-6">
          {galleries.map((g, i) => (
            <button
              key={g.name}
              onClick={() => {
                offset.current = 0;
                setActive(i);
              }}
              className={`font-poppins cursor-pointer rounded-lg px-5 py-2 text-center transition-all duration-300 hover:bg-white hover:text-[#121212] ${
                active === i ? "bg-white text-[#121212]" : "bg-transparent text-gray-400"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* curved, auto-scrolling panel (full width) */}
      <div
        ref={wrapRef}
        className="relative mx-auto w-full overflow-hidden"
        style={{ perspective: `${PERSPECTIVE}px`, height: itemW * RATIO + 40 }}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
      >
        {items.map((src, i) => (
          <div
            key={`${active}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-0 top-5 overflow-hidden rounded-xl bg-[#232323] will-change-transform"
            style={{ width: itemW, height: itemW * RATIO }}
          >
            <Image
              src={src}
              alt={`${galleries[active].name} ${(i % list.length) + 1}`}
              fill
              sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 85vw"
              className="object-cover"
              draggable={false}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
