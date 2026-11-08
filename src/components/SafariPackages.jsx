"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForwardCircle } from "react-icons/io5";

const packages = [
  {
    badge: "Wildlife Experience",
    title: "Kumana Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/kumana.jpg",
    highlights: ["Half day safari", "Full day safari"],
    href: "#",
  },
  {
    badge: "After Dark",
    title: "Night Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/night.jpg",
    highlights: ["Sunset", "Nocturnal animal"],
    href: "#",
  },
  {
    badge: "Outdoor Adventure",
    title: "Outdoor Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/outdoor.jpg",
    highlights: ["Kudumbigala", "Crocodile and elephants encounter"],
    href: "#",
  },
  {
    badge: "Made For You",
    title: "Tailor Made",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/tailor-made.jpg",
    highlights: [
      "Morning or evening",
      "Meals package",
      "Destinations",
      "Buffer zone dinner",
      "Under bonfire dinner",
    ],
    href: "#",
  },
];

/* ----- tweak the look here ----- */
const HOLD_MS = 5000; // how long the centre card stays
const SIDE_GAP = 1.03; // side card distance (1 = one card width)
const SIDE_DEPTH = -220; // how far back the side cards sit (px)
const SIDE_TILT = 38; // door tilt (deg)
const SIDE_SCALE = 0.88; // side card size
const CARD_W = "min(540px, 78vw)";
const DUR = "700ms";
const EASE = "cubic-bezier(0.22, 0.8, 0.22, 1)";

export default function SafariPackages() {
  const n = packages.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prevOffsets = useRef(new Array(n).fill(0));
  const startX = useRef(null);
  const moved = useRef(false);

  const goTo = (i) => setActive(((i % n) + n) % n);
  const next = () => goTo(active + 1);
  const back = () => goTo(active - 1);

  // shortest signed distance from the centre card: ... -1, 0, 1 ...
  const offsetOf = (i) => {
    let o = (((i - active) % n) + n) % n;
    if (o > n / 2) o -= n;
    // with an even count, the opposite card keeps leaving the way it was going
    if (n % 2 === 0 && o === n / 2) o = prevOffsets.current[i] < 0 ? -o : o;
    return o;
  };

  const offsets = packages.map((_, i) => offsetOf(i));

  useEffect(() => {
    prevOffsets.current = offsets;
  });

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  const cardStyle = (i) => {
    const o = offsets[i];
    const abs = Math.abs(o);
    const dir = Math.sign(o);
    // a card wrapping from one end to the other jumps while invisible
    const wrapped = Math.abs(o - prevOffsets.current[i]) > 2;
    const transition = wrapped
      ? `opacity ${DUR} ${EASE}, filter ${DUR} ${EASE}`
      : `transform ${DUR} ${EASE}, opacity ${DUR} ${EASE}, filter ${DUR} ${EASE}`;

    const base = {
      gridArea: "1 / 1",
      justifySelf: "center",
      width: CARD_W,
      transition,
      backfaceVisibility: "hidden",
    };

    if (abs === 0)
      return {
        ...base,
        transform: "translate3d(0,0,0) rotateY(0deg) scale(1)",
        filter: "brightness(1)",
        opacity: 1,
        zIndex: 3,
      };
    if (abs === 1)
      return {
        ...base,
        transform: `translate3d(calc(${CARD_W} * ${dir * SIDE_GAP}), 0, ${SIDE_DEPTH}px) rotateY(${dir * SIDE_TILT}deg) scale(${SIDE_SCALE})`,
        filter: "brightness(0.55) saturate(0.85)",
        opacity: 1,
        zIndex: 2,
        cursor: "pointer",
      };
    return {
      ...base,
      transform: `translate3d(calc(${CARD_W} * ${dir * SIDE_GAP * 1.6}), 0, ${SIDE_DEPTH * 2}px) rotateY(${dir * SIDE_TILT}deg) scale(0.7)`,
      filter: "brightness(0.4)",
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none",
    };
  };

  return (
    <section className="w-full relative overflow-hidden py-10">
      <style>{`
        @keyframes safariProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      <div className="w-full mx-auto">
        <h2 className="font-libertinus_Math text-4xl md:text-5xl text-center text-[#0a0e01] font-medium pb-6 px-5">
          Our Safari Packages
        </h2>

        {/* Stage: all cards share one grid cell */}
        <div
          className="grid py-8 select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: "1400px", touchAction: "pan-y" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={(e) => {
            startX.current = e.clientX;
            moved.current = false;
          }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const diff = e.clientX - startX.current;
            if (Math.abs(diff) > 50) {
              moved.current = true;
              diff < 0 ? next() : back();
            }
            startX.current = null;
          }}
        >
          {packages.map((p, i) => {
            const isCenter = offsets[i] === 0;
            const isSide = Math.abs(offsets[i]) === 1;
            return (
              <article
                key={p.title}
                aria-hidden={!isCenter}
                style={cardStyle(i)}
                onClick={() => {
                  if (isSide && !moved.current) goTo(i);
                }}
                className="rounded-lg border border-[#b9a98f] bg-[#e8dccb] p-5 text-[#2b1d10] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] will-change-transform motion-reduce:transition-none"
              >
                {/* Image + badge */}
                <div className="relative w-full aspect-3/2 overflow-hidden rounded-md">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 78vw, 540px"
                    className="object-cover"
                    priority={i === 0}
                    draggable={false}
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-[#a15f21] px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white">
                    {p.badge}
                  </span>
                </div>

                {/* Text fades to a ghost on the side cards */}
                <div
                  className="transition-opacity duration-700"
                  style={{ opacity: isCenter ? 1 : 0.4 }}
                >
                  <h3 className="font-libertinus_Math text-3xl pt-6">{p.title}</h3>
                  <p className="font-poppins text-sm leading-6 pt-2 pb-5 max-w-sm text-[#3d2c1b]">
                    {p.desc}
                  </p>

                  <div className="border-t border-[#b9a98f] pt-3">
                    <h4 className="font-libertinus_Math text-xl">Highlights:</h4>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1 pb-3 font-poppins text-sm text-[#3d2c1b]">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-[#a15f21]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#b9a98f] pt-5 flex items-center justify-between">
                    <div>{/* price goes here */}</div>
                    <a
                      href={p.href}
                      tabIndex={isCenter ? 0 : -1}
                      className="inline-flex items-center gap-2 rounded-full bg-[#a15f21] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                    >
                      Book Now
                      <IoArrowForwardCircle className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="w-full max-w-xl mx-auto px-5">
          {/* Progress bar: when it finishes, the next card comes in */}
          <div className="h-0.5 w-full bg-[#613d1d]/20 overflow-hidden rounded-full">
            <div
              key={active}
              onAnimationEnd={next}
              className="h-full w-full origin-left bg-[#a15f21]"
              style={{
                animation: `safariProgress ${HOLD_MS}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 pt-4">
            {packages.map((p, i) => (
              <button
                key={p.title}
                onClick={() => goTo(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-[#a15f21]" : "w-2.5 bg-[#a15f21]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
