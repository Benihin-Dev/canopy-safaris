"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  PiBinocularsThin,
  PiMotorcycleThin,
  PiMapTrifoldThin,
  PiArrowUpRight,
} from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";

/* Your WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94XXXXXXXXX";
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const cards = [
  {
    label: "Book a Safari",
    note: "Yala · Kumana · Udawalawe",
    icon: PiBinocularsThin,
    href: wa("Hi, I'd like to book a safari."),
  },
  {
    label: "Rent a Scooter",
    note: "Daily and weekly rates",
    icon: PiMotorcycleThin,
    href: wa("Hi, I'd like to rent a scooter."),
  },
  {
    label: "Custom Tour",
    note: "Plan it your way",
    icon: PiMapTrifoldThin,
    href: wa("Hi, I'd like a custom tour."),
  },
  {
    label: "Chat on WhatsApp",
    note: "Quick replies",
    icon: FaWhatsapp,
    href: wa("Hi, I have a question."),
  },
];

/* ----- tweak the look here ----- */
const IMG_HEIGHT = 150; // photo height as % of the frame (bigger = more to reveal)
const SPREAD = 70; // px each card starts further apart (desktop)
const RISE = 40; // px the cards start lower

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function ScrollBanner() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the banner enters at the bottom, 1 when it leaves at the top
      const p = reduce ? 0.5 : clamp((vh - rect.top) / (vh + rect.height));

      // the photo slides so you see a different part as you scroll
      const shift = ((IMG_HEIGHT - 100) / IMG_HEIGHT) * 100;
      img.style.transform = `translate3d(0, ${-p * shift}%, 0)`;

      // the cards come closer and settle by the time the banner is centred
      const wide = window.innerWidth >= 768;
      const cp = reduce ? 1 : clamp((p - 0.08) / 0.42);
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const e = easeOut(clamp(cp * 1.4 - i * 0.12));
        const x = wide ? (i - 1.5) * SPREAD * (1 - e) : 0;
        el.style.transform = `translate3d(${x}px, ${RISE * (1 - e)}px, 0)`;
        el.style.opacity = e;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f3f4f8] px-3 py-6 sm:px-5 md:py-10"
      style={{ "--accent": "#D9822B", "--ink": "#2B1D14" }}
    >
      <div className="relative mx-auto h-120 w-full max-w-400 overflow-hidden rounded-[32px] md:h-130 md:rounded-[56px]">
        {/* photo: taller than the frame, slides while you scroll */}
        <div
          ref={imgRef}
          className="absolute left-0 top-0 w-full will-change-transform"
          style={{ height: `${IMG_HEIGHT}%` }}
        >
          <Image
            src="/images/banner-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center px-5 pb-6 pt-12 md:pb-8 md:pt-14">
          <h2 className="font-libertinus_Math max-w-xl text-center text-3xl font-medium leading-[1.1] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.4)] md:text-5xl">
            Safari or scooter, your adventure starts here.
          </h2>

          <div className="mt-auto grid w-full max-w-md grid-cols-2 gap-3 md:flex md:max-w-none md:justify-center md:gap-4">
            {cards.map(({ label, note, icon: Icon, href }, i) => (
              <a
                key={label}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: 0 }}
                className="group relative flex h-28 w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl bg-white px-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.3)] md:w-48"
              >
                <span className="absolute right-0 top-0 flex size-8 scale-50 items-center justify-center rounded-bl-2xl bg-[var(--accent)] text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <PiArrowUpRight className="size-4" />
                </span>
                <Icon className="size-8 text-[var(--accent)]" />
                <span className="font-poppins text-[13px] font-semibold text-[var(--ink)]">
                  {label}
                </span>
                <span className="font-poppins text-[11px] text-[#7a6550]">
                  {note}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
