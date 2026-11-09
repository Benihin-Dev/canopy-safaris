"use client";
import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { PiArrowUpRight } from "react-icons/pi";

/* Your WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94XXXXXXXXX";
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* The 4 round shapes. Put these photos in /public/images/ */
const petals = [
  { label: "Kumana Safari", src: "/images/petal-kumana.jpg", pos: "left-1/2 top-0 -translate-x-1/2" },
  { label: "Hiking", src: "/images/petal-hiking.jpg", pos: "right-0 top-1/2 -translate-y-1/2" },
  { label: "Scooter Rent", src: "/images/petal-scooter.jpg", pos: "left-1/2 bottom-0 -translate-x-1/2" },
  { label: "Night Safari", src: "/images/petal-night.jpg", pos: "left-0 top-1/2 -translate-y-1/2" },
];

export default function TravelCtaBanner() {
  return (
    <section
      className="relative w-full overflow-hidden lg:h-[441px]"
      style={{ "--accent": "#D9822B" }}
    >
      {/* background photo */}
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      {/* dark navy fade on the left, like the reference */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a1b2a] via-[#0a1b2a]/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-center justify-between gap-6 px-6 py-12 lg:flex-row lg:py-0 lg:pl-[18%] lg:pr-10">
        {/* ---------- left: text + buttons ---------- */}
        <div className="w-full max-w-[600px] text-center lg:text-left">
          <p
            className="text-[26px] text-[#4fb12b]"
            style={{ fontFamily: "'Dancing Script','Brush Script MT',cursive", fontStyle: "italic" }}
          >
            Explore the world
          </p>

          <h2 className="mt-3 text-4xl font-semibold leading-[1.15] text-white md:text-5xl">
            Ready To Travel With Real Adventure &amp; Enjoy Natural
          </h2>

          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            {/* round WhatsApp button (replaces the green play button) */}
            <a
              href={wa("Hi, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex size-[75px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b]"
            >
              <FaWhatsapp className="size-9" />
            </a>

            {/* booking button */}
            <a
              href={wa("Hi, I'd like to make a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-[57px] items-center gap-2 rounded-full border border-white/40 px-8 text-[18px] font-medium text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)]"
            >
              Booking
              <PiArrowUpRight className="size-5 transition group-hover:rotate-12" />
            </a>
          </div>
        </div>

        {/* ---------- right: 4 round shapes ---------- */}
        <div className="relative h-[460px] w-[460px] shrink-0 origin-center scale-[.62] -my-20 sm:scale-[.8] sm:-my-12 lg:my-0 lg:scale-[.85] xl:scale-100">
          {petals.map(({ label, src, pos }) => (
            <div key={label} className={`absolute ${pos}`}>
              {/* rotated square = round shape with one pointed corner facing the centre */}
              <div
                className="relative size-[160px] rotate-45 overflow-hidden border-[5px] border-white bg-white shadow-xl"
                style={{ borderRadius: "50% 50% 0 50%" }}
              >
                {/* counter-rotate the photo so it stands upright */}
                <div className="absolute left-1/2 top-1/2 size-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                  <Image src={src} alt={label} fill sizes="240px" className="object-cover" />
                </div>
              </div>

              {/* label (outside the rotation so the text is straight) */}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
