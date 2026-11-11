"use client";
import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { PiArrowUpRight } from "react-icons/pi";

/* Your WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94XXXXXXXXX";
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* The 4 round shapes (photos go in /public/images/) */
const petals = [
  {
    label: "Kumana Safari",
    src: "/images/petal-kumana.jpg",
    pos: "left-1/2 top-0 -translate-x-1/2",
  },
  {
    label: "Hiking",
    src: "/images/petal-hiking.jpg",
    pos: "right-0 top-1/2 -translate-y-1/2",
  },
  {
    label: "Scooter Rent",
    src: "/images/petal-scooter.jpg",
    pos: "left-1/2 bottom-0 -translate-x-1/2",
  },
  {
    label: "Night Safari",
    src: "/images/petal-night.jpg",
    pos: "left-0 top-1/2 -translate-y-1/2",
  },
];

export default function TravelCtaBanner() {
  return (
    <section
      className="relative w-full overflow-hidden lg:h-[441px]"
      style={{ "--main": "#4DA528", "--accent": "#D9822B" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#0a1b2a] via-[#0a1b2a]/70 to-transparent" />

      {/* same structure as the template: container > row > col-7 (text) + col-5 (image) */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1200px] grid-cols-1 items-center gap-6 px-6 py-12 lg:grid-cols-12 lg:py-0">
        {/* ---------- col-7: text + buttons ---------- */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <div className="mb-8">
            <span
              className="mb-3 block text-[28px] text-[var(--main)] md:text-[34px]"
              style={{
                fontFamily: "'Dancing Script','Brush Script MT',cursive",
                fontStyle: "italic",
              }}
            >
              Explore the world
            </span>
            <h2 className="text-4xl font-semibold leading-[1.15] text-white md:text-5xl">
              Ready To Travel With Real Adventure &amp; Enjoy Natural
            </h2>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {/* round WhatsApp button (was the green play button) */}
            <a
              href={wa("Hi, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b]"
            >
              <FaWhatsapp className="size-9" />
            </a>

            {/* booking button (was the "Contact us at" pill) */}
            <a
              href={wa("Hi, I'd like to make a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-[57px] items-center gap-2 rounded-full border border-white/40 px-8 text-[18px] font-medium text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)] "
            >
              Booking
              <PiArrowUpRight className="size-5 transition group-hover:rotate-12" />
            </a>

            {/* hand-drawn arrow pointing at the shapes (the template's vector2.png) */}
            <svg
              aria-hidden
              viewBox="0 0 90 60"
              className="pointer-events-none absolute -right-24 -rotate-45 -top-6 hidden h-14 w-24 text-white lg:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6 C 2 24, 14 40, 26 34 C 36 28, 28 14, 18 22 C 8 32, 30 52, 62 46" />
              <path d="M52 38 L 64 46 L 50 53" />
            </svg>
          </div>
        </div>

        {/* ---------- col-5: the 4 round shapes ---------- */}
        <div className="flex justify-center itce lg:col-span-5 aspect-square lg:justify-end">
          <div className=" mx-auto w-11/12">
            <Image
              src="/images/bannerIcon.png"
              alt="/images/bannerIcon.png"
              width={400}
              height={100}
              priority
              className="object-cover p-5 aspect-square w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
