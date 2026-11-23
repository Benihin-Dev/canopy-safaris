"use client";
import React from "react";
import { Bebas_Neue } from "next/font/google";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCampground,
  FaFire,
  FaBinoculars,
} from "react-icons/fa";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

/* Your WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94754540123";
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ----- the 3 floating cards (change the words here) -----
   rot   = how much the card is tilted (desktop)
   x     = how far it is pushed left (-) or right (+) (desktop)
   speed = seconds for one up-and-down move
   delay = start time, so the cards never move together */
const cards = [
  {
    Icon: FaCampground,
    title: "Tent stay",
    sub: "Beds and bedding ready",
    rot: "-5deg",
    x: "-16px",
    speed: "4.2s",
    delay: "0s",
  },
  {
    Icon: FaFire,
    title: "Campfire night",
    sub: "Dinner by the fire",
    rot: "4deg",
    x: "14px",
    speed: "5s",
    delay: "-1.6s",
  },
  {
    Icon: FaBinoculars,
    title: "Sunrise walk",
    sub: "Birdwatching with a guide",
    rot: "-3deg",
    x: "-6px",
    speed: "4.6s",
    delay: "-3s",
  },
];

const css = `
.cb-card{
  --x:0px;
  --r:calc(var(--rd) * .5);
  animation:cb-float var(--d) ease-in-out var(--dl) infinite;
}
@media (min-width:1024px){
  .cb-card{--x:var(--xd);--r:var(--rd)}
}
@keyframes cb-float{
  0%,100%{transform:translate(var(--x),0) rotate(var(--r))}
  50%{transform:translate(var(--x),-9px) rotate(var(--r))}
}
@media (prefers-reduced-motion:reduce){
  .cb-card{animation:none;transform:translate(var(--x),0) rotate(var(--r))}
}
`;

export default function ScrollBanner() {
  return (
    /* NO background here: the fixed picture from layout.tsx shows through */
    <section id="camping" className="relative w-full overflow-hidden">
      <style>{css}</style>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-12 lg:py-16">
        {/* ---------- left: text + buttons ---------- */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white lg:mx-0">
            <FaMapMarkerAlt aria-hidden="true" className="size-3" />
            Camping in Kumana National Park
          </span>

          <h2
            className={`${bebas.className} mt-3 text-5xl uppercase leading-[0.98] tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,.6)] lg:text-6xl`}
          >
            Sleep under
            <br />
            the wild sky
          </h2>

          <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-white [text-shadow:0_2px_12px_rgba(0,0,0,.6)] lg:mx-0">
            Camp inside the park, away from the crowds. Fall asleep to the
            sounds of the wild and wake up to birdsong.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/book?service=camping&type=tent-stay"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[13px] font-medium text-[#0b2e18] transition hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FaWhatsapp aria-hidden="true" className="size-[18px]" />
              Book camping
            </Link>

            <a
              href={wa("Hi, what is included in the camping stay?")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-black/20 px-5 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition hover:border-[#D9822B] hover:bg-[#D9822B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              What is included
              <FaArrowRight
                aria-hidden="true"
                className="size-3 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* ---------- right: floating tilted glass cards ---------- */}
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3 lg:col-span-5 lg:mx-0 lg:ml-auto">
          {cards.map(({ Icon, title, sub, rot, x, speed, delay }) => (
            <div
              key={title}
              className="cb-card flex items-center gap-3 rounded-2xl border border-white/25 bg-[#1a1008]/40 px-4 py-3 text-white shadow-[0_10px_22px_rgba(0,0,0,.3)] backdrop-blur-md"
              style={{
                "--rd": rot,
                "--xd": x,
                "--d": speed,
                "--dl": delay,
              }}
            >
              <Icon aria-hidden="true" className="size-6 shrink-0 text-[#f7b972]" />
              <div>
                <div className="text-[14px] font-medium">{title}</div>
                <div className="mt-0.5 text-[12px] text-white/80">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
