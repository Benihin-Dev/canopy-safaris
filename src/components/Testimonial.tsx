"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const sliderRef = useRef<Slider>(null);

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
          {/* Cards slider */}
          <Slider
            ref={sliderRef}
            dots={false}
            arrows={false}
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={6000}
          >
            {reviews.map((r, i) => (
              <div key={i}>
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
            ))}
          </Slider>

          {/* Controls: bottom of the right side */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => sliderRef.current?.slickPrev()}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
              >
                <GoArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => sliderRef.current?.slickNext()}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
              >
                <GoArrowLeft className="size-5 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
