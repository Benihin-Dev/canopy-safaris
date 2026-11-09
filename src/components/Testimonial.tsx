"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

// TODO: replace these placeholders with REAL guest reviews and photos.
const reviews = [
  {
    name: "Guest Name",
    location: "Country",
    title: "Unforgettable Safari!",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person1.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    title: "Amazing Guide!",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person2.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    title: "Wildlife Everywhere!",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person3.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    title: "Highly Recommended!",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 4,
    photo: "/images/person1.jpg",
  },
];

export default function SliderForTestimonial() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = reviews.length;

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <div className="w-full bg-[#1a1410] px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div>
          {/* Heading: badge on line 1, line 2 starts at the left edge */}
          <h2 className="font-bebas text-5xl uppercase leading-[1.05] tracking-wide text-white md:text-7xl">
            <span className="relative -top-1 mr-4 inline-block -rotate-6 rounded-full border border-[#f59e0b] px-4 py-1.5 align-middle font-caveat text-lg normal-case leading-none tracking-normal text-[#f59e0b] md:text-xl">
              Testimonial
            </span>
            Real story from <br />
            our organic clients
          </h2>

          {/* Stats */}
          <div className="mt-10 border-y border-white/10 py-8">
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="font-bebas text-6xl leading-none text-[#f59e0b] md:text-7xl">
                  10K
                </span>
                <span className="font-bebas text-lg uppercase leading-tight text-white">
                  Successfully <br /> placed visited
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bebas text-6xl leading-none text-[#f59e0b] md:text-7xl">
                  98%
                </span>
                <span className="font-bebas text-lg uppercase leading-tight text-white">
                  Our customers <br /> satisfaction rates
                </span>
              </div>
            </div>
          </div>

          {/* Happy clients */}
          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center">
              {["/images/person1.jpg", "/images/person2.jpg"].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Happy client"
                  width={48}
                  height={48}
                  className="-ml-3 size-12 rounded-full border-2 border-[#1a1410] bg-[#2a2119] object-cover first:ml-0"
                />
              ))}
              <span className="-ml-3 flex size-12 items-center justify-center rounded-full bg-[#f59e0b] font-bebas text-lg text-[#1a1410]">
                50K
              </span>
            </div>
            <p className="font-bebas text-lg uppercase leading-tight text-white">
              Our happy clients <br /> worldwide
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="min-w-0">
          {/* Cards: all stacked in one spot */}
          <div
            className="grid overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {reviews.map((r, i) => {
              const offset = (i - active + total) % total;
              const state =
                offset === 0
                  ? "opacity-100 translate-x-0 scale-100 z-10"
                  : offset === total - 1
                  ? "opacity-0 -translate-x-16 scale-95 pointer-events-none"
                  : "opacity-0 translate-x-16 scale-95 pointer-events-none";

              return (
                <div
                  key={i}
                  aria-hidden={offset !== 0}
                  className={`col-start-1 row-start-1 transition-all duration-1000 ease-in-out ${state}`}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#2a2119] p-8 md:p-10">
                    {/* amber glow, top-left */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.35),transparent_55%)]" />

                    <div className="relative flex gap-5 md:gap-6">
                      <FaQuoteLeft className="size-8 shrink-0 text-[#f59e0b] md:size-10" />
                      <div>
                        <h3 className="font-bebas text-3xl uppercase tracking-wide text-white md:text-4xl">
                          {r.title}
                        </h3>
                        <div className="my-3 flex gap-1 text-[#f59e0b]">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <FaStar
                              key={s}
                              className={`size-4 ${s < r.rating ? "" : "opacity-25"}`}
                            />
                          ))}
                        </div>
                        <p className="font-inter text-base leading-7 text-stone-400">
                          &quot;{r.text}&quot;
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                          <Image
                            src={r.photo}
                            alt={`Photo of ${r.name}`}
                            width={56}
                            height={56}
                            className="size-14 rounded-full border-2 border-[#f59e0b] bg-[#2a2119] object-cover"
                          />
                          <div>
                            <h4 className="font-bebas text-xl uppercase tracking-widest text-white">
                              {r.name}
                            </h4>
                            <p className="font-inter text-sm text-stone-400">
                              {r.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls: bottom of the right side */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              onClick={prev}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
            >
              <GoArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={next}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
            >
              <GoArrowLeft className="size-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
