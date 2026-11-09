"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoArrowForward, IoCheckmarkCircleOutline } from "react-icons/io5";

/* Replace this placeholder content with your own.
   Add a `price` (for example "$25") to show it next to the title.
   Add or remove items freely: the layout adapts to any number of cards. */
const items = [
  {
    ribbon: "Ribbon text one",
    badge: "Badge",
    title: "Card title one",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/scooter1.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text two",
    badge: "Badge",
    title: "Card title two",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/scooter2.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text three",
    badge: "Badge",
    title: "Card title three",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/tuktuk1.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text four",
    badge: "Badge",
    title: "Card title four",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/tuktuk2.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text five",
    badge: "Badge",
    title: "Card title five",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/tuktuk3.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
];

const N = items.length;

/* ----- tweak the look here ----- */
const AUTO_MS = 5000; // idle time before the next card comes in (0 = off)
const SIDE_X = 0.58; // how far the side cards sit from the centre (x card width)
const SIDE_SCALE = 0.8; // size of the side cards (0.8 = 80%)
const SIDE_TILT = 14; // tilt of the side cards (deg)
const SIDE_OPACITY = 0.55; // how faded the side cards are (1 = not faded)
const SIDE_BLUR = 4; // blur of the side cards (px)

/* pos = where a card sits relative to the active one:
   0 = main card, -1 / 1 = blurred cards behind it (left / right),
   -2 / 2 (and beyond) = hidden behind the main card. */
function getPos(i, active) {
  const d = (((i - active) % N) + N) % N;
  return d > N / 2 ? d - N : d;
}

function cardStyle(pos) {
  const base = {
    transition:
      "transform .65s cubic-bezier(.25,1,.5,1), opacity .5s ease, filter .5s ease, box-shadow .5s ease",
    willChange: "transform, opacity, filter",
  };

  if (pos === 0) {
    return {
      ...base,
      transform: "translate3d(0,0,0) scale(1) rotateY(0deg)",
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 10,
      boxShadow: "0 28px 50px -18px rgba(97,61,29,0.55)",
    };
  }

  const dir = pos > 0 ? 1 : -1;

  if (Math.abs(pos) === 1) {
    return {
      ...base,
      transform: `translate3d(calc(var(--cw) * ${SIDE_X * dir}), 0, 0) scale(${SIDE_SCALE}) rotateY(${-dir * SIDE_TILT}deg)`,
      opacity: SIDE_OPACITY,
      filter: `blur(${SIDE_BLUR}px)`,
      zIndex: 5,
    };
  }

  return {
    ...base,
    transform: `translate3d(calc(var(--cw) * ${0.3 * dir}), 0, 0) scale(0.66)`,
    opacity: 0,
    filter: "blur(8px)",
    zIndex: 1,
    pointerEvents: "none",
  };
}

export default function PeekShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (i) => setActive(((i % N) + N) % N);

  // auto-advance (pauses while the mouse is over the cards)
  useEffect(() => {
    if (!AUTO_MS || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % N), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  // left / right arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % N);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    /* overflow-x-clip stops a sideways scrollbar from the side cards. */
    <section className="relative w-full min-h-svh flex items-center bg-[#f0eee5] overflow-x-clip py-14">
      <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 grid grid-cols-1 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] items-center gap-6 md:gap-x-18">
        {/* ---------- Left: stays in place ---------- */}
        <div className="w-full min-w-0">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-[#a15f21]">
            Your small heading
          </p>
          <h2 className="font-libertinus_Math text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-[#2b1d10] pt-2">
            Your big heading
            <span className="block text-[#a15f21]">second line</span>
          </h2>
          <p className="hidden md:block font-poppins text-sm leading-7 text-[#5b4733] pt-5 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <a
            href="#"
            className="hidden md:inline-flex items-center gap-3 mt-7 rounded-full bg-[#a15f21] pl-6 pr-2 py-2 font-poppins text-sm font-semibold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
          >
            Read more
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#a15f21]">
              <IoArrowForward className="size-4" />
            </span>
          </a>

          {/* step counter */}
          <div className="flex items-center gap-4 pt-5 md:pt-10 font-poppins text-xs text-[#5b4733]">
            <span className="tabular-nums font-semibold text-[#2b1d10]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(N).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {items.map((r, i) => (
                <button
                  key={r.title}
                  type="button"
                  aria-label={`Show card ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${
                    i === active
                      ? "w-8 bg-[#a15f21]"
                      : "w-1.5 bg-[#a15f21]/30 cursor-pointer"
                  }`}
                />
              ))}
            </div>
            <span className="hidden md:inline">Click a side card</span>
          </div>
        </div>

        {/* ---------- Right: main card in front, blurred cards behind ---------- */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-w-0 grid justify-items-center items-center py-8 md:translate-x-8 [--cw:min(76vw,340px)] md:[--cw:clamp(250px,28vw,370px)]"
          style={{ perspective: "1600px" }}
        >
          {items.map((r, i) => {
            const pos = getPos(i, active);
            const isActive = pos === 0;
            return (
              <article
                key={r.title}
                aria-hidden={!isActive}
                /* clicking a blurred card brings it to the front */
                onClickCapture={(e) => {
                  if (isActive) return;
                  e.preventDefault();
                  e.stopPropagation();
                  go(i);
                }}
                style={{ gridArea: "1 / 1", ...cardStyle(pos) }}
                className={`w-[var(--cw)] overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2] shadow-[0_20px_40px_-18px_rgba(97,61,29,0.45)] select-none ${
                  isActive ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {/* top ribbon */}
                <div className="bg-[#a15f21] py-2 text-center font-poppins text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  {r.ribbon}
                </div>

                {/* image + badge */}
                <div className="relative w-full aspect-16/9">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 370px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#2b1d10] px-3 py-1 font-poppins text-[11px] font-semibold text-white">
                    {r.badge}
                  </span>
                </div>

                {/* details */}
                <div className="px-5 pt-5 pb-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-libertinus_Math text-2xl font-semibold text-[#2b1d10]">
                      {r.title}
                    </h3>
                    {r.price && (
                      <span className="font-libertinus_Math text-2xl font-semibold text-[#a15f21] whitespace-nowrap">
                        {r.price}
                      </span>
                    )}
                  </div>
                  <p className="font-poppins text-xs text-[#7a6550] pt-1">
                    {r.sub}
                  </p>
                  <p className="font-poppins text-sm leading-6 text-[#3d2c1b] pt-3">
                    {r.desc}
                  </p>

                  <ul className="space-y-1.5 pt-4 font-poppins text-xs text-[#5b4733]">
                    {r.features.map((text) => (
                      <li key={text} className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="size-4 shrink-0 text-[#e77b2a]" />
                        {text}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={r.href}
                    tabIndex={isActive ? 0 : -1}
                    className="mt-5 block w-full rounded-full bg-[#a15f21] py-3 text-center font-poppins text-sm font-bold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                  >
                    {r.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
