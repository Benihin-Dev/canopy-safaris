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
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person1.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person2.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 5,
    photo: "/images/person3.jpg",
  },
  {
    name: "Guest Name",
    location: "Country",
    text: "Replace this with a real review from one of your guests about their safari experience.",
    rating: 4,
    photo: "/images/person1.jpg",
  },
];

export default function SliderForTestimonial() {
  const sliderRef = useRef<Slider>(null);

  return (
    <div className="w-full relative pb-16">
      {/* Stats row */}
      <div className="flex items-center justify-center gap-10 mb-10 font-poppins text-[#0e291c]">
        <div className="text-center">
          <p className="text-3xl font-bold">50K+</p>
          <p className="text-sm text-gray-600">Happy Guests</p>
        </div>
        <div className="h-10 border-l border-gray-300" />
        <div className="text-center">
          <p className="text-3xl font-bold">5.0</p>
          <div className="flex gap-0.5 text-[#c69a4e] justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="size-3.5" />
            ))}
          </div>
        </div>
      </div>

      <Slider
        ref={sliderRef}
        dots={false}
        arrows={false}
        infinite
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={6000}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]}
      >
        {reviews.map((r, i) => (
          <div key={i} className="px-3 h-full">
            <div className="relative h-full rounded-2xl bg-white p-6 shadow-md border border-gray-100">
              <FaQuoteLeft className="size-7 text-[#c69a4e]/40 mb-3" />
              <p className="font-poppins text-sm leading-6 text-gray-700 min-h-28">
                {r.text}
              </p>
              <div className="flex gap-0.5 text-[#c69a4e] my-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <FaStar
                    key={s}
                    className={`size-4 ${s < r.rating ? "" : "opacity-25"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={r.photo}
                  alt={`Photo of ${r.name}`}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover border-2 border-[#c69a4e]"
                />
                <div>
                  <h3 className="font-poppins font-semibold text-[#0e291c]">
                    {r.name}
                  </h3>
                  <p className="font-poppins text-xs text-gray-500">
                    {r.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => sliderRef.current?.slickPrev()}
          className="size-10 rounded-full border border-gray-600 hover:border-gray-900 flex items-center justify-center cursor-pointer transition-all"
        >
          <GoArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => sliderRef.current?.slickNext()}
          className="size-10 rounded-full border border-gray-600 hover:border-gray-900 flex items-center justify-center cursor-pointer transition-all"
        >
          <GoArrowLeft className="size-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
