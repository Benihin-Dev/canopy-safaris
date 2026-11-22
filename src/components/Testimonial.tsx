"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaStar, FaQuoteLeft, FaExternalLinkAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

/* Google Sheet web app (Apps Script) that returns the reviews as JSON */
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxrIFP0fxhzQixDyDbKs7Z-LS_iIg1RDI6vj9O0SvSAMsTe3HN3eb2nFOOtQbjJnm_S/exec";

type Review = {
  heading: string;
  stars: number;
  comment: string;
  name: string;
  country: string;
  image: string;
  link: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function SliderForTestimonial() {
  const sliderRef = useRef<Slider>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // load the reviews from the Google Sheet
  useEffect(() => {
    let cancelled = false;
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="guestbook" className="scroll-mt-24 w-full bg-[#1a1410] px-6 pt-2.5 pb-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div>
          {/* Heading: badge on line 1, line 2 starts at the left edge */}
          <h2 className={`${bebas.className} text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl xl:text-7xl`}>
            <span className="mr-4 inline-block -rotate-[8deg] rounded-full border border-[#f59e0b] px-6 py-2.5 align-middle text-lg italic leading-none tracking-wider text-[#f59e0b]">
              Testimonial
            </span>
            <span className="sm:whitespace-nowrap">Real story from</span>
            <br />
            our organic clients
          </h2>

          <div className="mt-10 border-y border-white/10 py-8">
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className={`${bebas.className} text-7xl leading-none text-[#f59e0b] xl:text-8xl`}>
                  10K<span className="text-5xl xl:text-6xl">+</span>
                </span>
                <span className={`${bebas.className} text-xl uppercase leading-tight tracking-wide text-gray-400`}>
                  Successfully <br /> placed visited
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`${bebas.className} text-7xl leading-none text-[#f59e0b] xl:text-8xl`}>98%</span>
                <span className={`${bebas.className} text-xl uppercase leading-tight tracking-wide text-gray-400`}>
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
        <div className="min-w-0 relative z-20">
          <div className="absolute inset-0 -z-10">
            <div className=" w-full h-full flex justify-center items-center">
              <Image
                src="/images/testimonial/map.png"
                alt={`Photo of worldmap`}
                width={500}
                height={100}
                className=" w-10/12 object-cover"
              />
            </div>
          </div>

          {/* Loading / error / empty messages */}
          {status !== "ready" || reviews.length === 0 ? (
            <div className="mx-8 mt-10 border-b border-white/10 py-8">
              <p className="font-inter text-base leading-7 text-stone-400">
                {status === "loading" && "Loading reviews..."}
                {status === "error" && "Reviews could not be loaded right now."}
                {status === "ready" && "No reviews yet."}
              </p>
            </div>
          ) : (
            /* Cards slider (key restarts the slider when the review count changes) */
            <Slider
              key={reviews.length}
              ref={sliderRef}
              rtl
              dots={false}
              arrows={false}
              infinite
              speed={800}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay
              autoplaySpeed={4000}
            >
              {reviews.map((r, i) => (
                <div key={i}>
                  <div className="review-card relative mx-8 mt-0 overflow-hidden border-b border-white/10 py-8">
                    {/* amber glow, top-left */}
                    <div className="pointer-events-none absolute inset-0" />

                    <div className="relative flex gap-5 md:gap-6">
                      <div className="w-full">
                        <div className=" w-full flex items-center gap-5">
                          <FaQuoteLeft className="size-8 shrink-0 text-[#f59e0b] md:size-10" />
                          <h3 className={`${bebas.className} text-3xl uppercase tracking-wide text-white md:text-4xl`}>
                            {r.heading}
                          </h3>
                        </div>
                        <div className="mt-2 mb-0 pl-[60px] flex gap-1 text-[#f59e0b]">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <FaStar
                              key={s}
                              className={`size-4 ${s < r.stars ? "" : "opacity-25"}`}
                            />
                          ))}
                        </div>
                        <p className="font-inter text-base leading-7 mt-4 text-justify text-stone-400">
                          &quot;{r.comment}&quot;
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {r.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={r.image}
                                alt={`Photo of ${r.name}`}
                                width={56}
                                height={56}
                                referrerPolicy="no-referrer"
                                className="size-14 rounded-full border-2 border-[#f59e0b] bg-[#2a2119] object-cover"
                              />
                            ) : (
                              <span
                                className={`${bebas.className} flex size-14 items-center justify-center rounded-full border-2 border-[#f59e0b] bg-[#2a2119] text-xl text-[#f59e0b]`}
                              >
                                {initials(r.name)}
                              </span>
                            )}
                            <div>
                              <h4 className="font-bebas text-xl uppercase tracking-widest text-white">
                                {r.name}
                              </h4>
                              <p className="font-inter text-sm text-stone-400">
                                {r.country}
                              </p>
                            </div>
                          </div>

                          {r.link && (
                            <a
                              href={r.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-inter shrink-0 inline-flex items-center gap-2 text-sm text-[#f59e0b] transition-colors hover:text-white"
                            >
                              View review
                              <FaExternalLinkAlt className="size-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

          {/* Controls: bottom of the right side */}
          <div className="mt-6 translate-x-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => sliderRef.current?.slickNext()}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/25 transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
              >
                <GoArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => sliderRef.current?.slickPrev()}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/25 transition-all hover:border-[#f59e0b] hover:text-[#f59e0b]"
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
