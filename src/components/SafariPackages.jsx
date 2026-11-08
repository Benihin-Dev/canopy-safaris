"use client";
import React, { useRef, useState } from "react";
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

const HOLD_MS = 5000;

export default function SafariPackages() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  const goTo = (i) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };
  const next = () => goTo((active + 1) % packages.length);
  const back = () => goTo((active - 1 + packages.length) % packages.length);

  // where each card sits: centre, leaving to the left, or waiting on the right
  const cardStyle = (i) => {
    if (i === active)
      return {
        transform: "translateX(0) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 2,
        pointerEvents: "auto",
      };
    if (i === prev)
      return {
        transform: "translateX(-60%) rotateY(75deg) scale(0.85)",
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      };
    return {
      transform: "translateX(60%) rotateY(-75deg) scale(0.85)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  };

  return (
    <section className="w-full relative overflow-hidden py-10">
      <style>{`
        @keyframes safariProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0">
        <h2 className="font-libertinus_Math text-4xl md:text-5xl text-center text-[#0a0e01] font-medium pb-8">
          Our Safari Packages
        </h2>

        <div
          className="w-full max-w-xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(diff) > 50) (diff < 0 ? next : back)();
            touchX.current = null;
          }}
        >
          {/* Stage: all cards share one grid cell so the height stays steady */}
          <div
            className="grid overflow-hidden py-2"
            style={{ perspective: "1400px" }}
          >
            {packages.map((p, i) => (
              <article
                key={p.title}
                aria-hidden={i !== active}
                style={cardStyle(i)}
                className="col-start-1 row-start-1 w-full rounded-lg border border-[#b9a98f] bg-[#e8dccb] p-5 text-[#2b1d10] transition-all duration-1000 ease-in-out motion-reduce:transition-none will-change-transform"
              >
                {/* Image + badge */}
                <div className="relative w-full aspect-3/2 overflow-hidden rounded-md">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 576px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-[#a15f21] px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white">
                    {p.badge}
                  </span>
                </div>

                {/* Title + description */}
                <h3 className="font-libertinus_Math text-3xl pt-6">{p.title}</h3>
                <p className="font-poppins text-sm leading-6 pt-2 pb-5 max-w-sm text-[#3d2c1b]">
                  {p.desc}
                </p>

                {/* Highlights */}
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

                {/* Button (price goes on the left later) */}
                <div className="border-t border-[#b9a98f] pt-5 flex items-center justify-between">
                  <div>{/* price goes here */}</div>
                  <a
                    href={p.href}
                    tabIndex={i === active ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full bg-[#a15f21] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                  >
                    Book Now
                    <IoArrowForwardCircle className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Progress bar: when it finishes, the next card comes in */}
          <div className="mt-5 h-0.5 w-full bg-[#613d1d]/20 overflow-hidden rounded-full">
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
