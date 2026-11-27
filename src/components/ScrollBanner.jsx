"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCampground,
  FaFire,
  FaBinoculars,
  FaCheck,
} from "react-icons/fa";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

/* the 3 rows in the glass panel (change the words here) */
const items = [
  { Icon: FaCampground, title: "Tent stay", sub: "Beds and bedding ready" },
  { Icon: FaFire, title: "Campfire night", sub: "Dinner by the fire" },
  { Icon: FaBinoculars, title: "Sunrise walk", sub: "Birdwatching with a guide" },
];

/* heading words: each one rises up in turn. "br" = new line */
const words = ["Sleep", "under", "br", "the", "wild", "sky"];

const css = `
/* start state (hidden) */
.sb-w{display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:.25em;padding-bottom:.08em;margin-bottom:-.08em}
.sb-w>span{display:inline-block;opacity:0;transform:translateY(105%)}
.sb-bar{transform:scaleX(0);transform-origin:left}
.sb-fade{opacity:0;transform:translateY(14px)}
.sb-panel{opacity:0;transform:translateX(34px)}

/* when the section comes into view */
.sb-in .sb-w>span{animation:sb-rise .75s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i) * .12s)}
.sb-in .sb-bar{animation:sb-grow .8s ease .7s both}
.sb-in .sb-fade{animation:sb-up .7s ease both;animation-delay:var(--dl)}
.sb-in .sb-panel{animation:sb-in-right .9s cubic-bezier(.2,.7,.2,1) .35s both}

@keyframes sb-rise{from{opacity:0;transform:translateY(105%)}to{opacity:1;transform:translateY(0)}}
@keyframes sb-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes sb-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes sb-in-right{from{opacity:0;transform:translateX(34px)}to{opacity:1;transform:translateX(0)}}

/* people who turn animations off: show everything at once */
@media (prefers-reduced-motion:reduce){
  .sb-w>span,.sb-bar,.sb-fade,.sb-panel{opacity:1!important;transform:none!important;animation:none!important}
}
`;

export default function ScrollBanner() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  /* play the animation once, when the section is seen */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wi = 0; /* word counter for the delay */

  return (
    /* NO background here: the fixed picture from layout.tsx shows through */
    <section
      id="camping"
      ref={ref}
      className={`relative w-full overflow-hidden ${shown ? "sb-in" : ""}`}
    >
      <style>{css}</style>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-16 lg:py-16 xl:px-24">
        {/* ---------- left: text + buttons ---------- */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <span
            className="sb-fade mx-auto inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white lg:mx-0"
            style={{ "--dl": "0s" }}
          >
            <FaMapMarkerAlt aria-hidden="true" className="size-3" />
            Camping in Kumana National Park
          </span>

          <h2
            className={`${bebas.className} mt-3 text-5xl uppercase leading-[0.98] tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,.6)] lg:text-6xl xl:text-7xl`}
          >
            {words.map((w, k) =>
              w === "br" ? (
                <br key={k} />
              ) : (
                <span key={k} className="sb-w">
                  <span style={{ "--i": wi++ }}>{w}</span>
                </span>
              )
            )}
          </h2>

          <span className="sb-bar mx-auto mt-3 block h-[3px] w-16 rounded-sm bg-[#D9822B] lg:mx-0" />

          <p
            className="sb-fade mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-white [text-shadow:0_2px_12px_rgba(0,0,0,.6)] lg:mx-0 xl:max-w-[440px]"
            style={{ "--dl": ".7s" }}
          >
            Camp inside the park, away from the crowds. Fall asleep to the
            sounds of the wild and wake up to birdsong.
          </p>

          <div
            className="sb-fade mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ "--dl": ".85s" }}
          >
            <Link
              href="/book?service=camping&type=tent-stay"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[13px] font-medium text-[#0b2e18] transition hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FaWhatsapp aria-hidden="true" className="size-[18px]" />
              Book camping
            </Link>

            <Link
              href="/camping"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-black/20 px-5 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition hover:border-[#D9822B] hover:bg-[#D9822B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              What is included
              <FaArrowRight
                aria-hidden="true"
                className="size-3 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ---------- right: one glass panel, rows divided by lines ---------- */}
        <div className="sb-panel mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-[340px]">
          <div className="divide-y divide-white/20 rounded-2xl border border-white/25 bg-[#1a1008]/45 text-white shadow-[0_10px_22px_rgba(0,0,0,.3)] backdrop-blur-md">
            {items.map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 px-4 py-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D9822B] text-white">
                  <Icon aria-hidden="true" className="size-[18px]" />
                </span>
                <div className="flex-1">
                  <div className="text-[14px] font-medium">{title}</div>
                  <div className="mt-0.5 text-[12px] text-white/80">{sub}</div>
                </div>
                <FaCheck
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-[#f7b972]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
