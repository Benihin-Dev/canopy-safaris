"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  IoArrowForward,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import Link from "next/link";
import { Dancing_Script, Libertinus_Serif } from "next/font/google";
import { rentals as items } from "@/data/rentals";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "600" });
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: "600" });

/* WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94754540123";
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ----- currency ----- */
const FALLBACK_RATE = 300; // used only if the live rate cannot be loaded
const usdNumber = (price) => Number(String(price).replace(/[^0-9.]/g, ""));
const formatPrice = (price, currency, rate) => {
  const usd = usdNumber(price);
  if (currency === "usd" || !usd) return price; // e.g. "$12"
  const lkr = Math.round((usd * rate) / 100) * 100; // nearest 100 rupees
  return `≈ Rs ${lkr.toLocaleString("en-US")}`;
};

/* Replace this placeholder content with your own.
   Add a `price` (for example "$25") to show it next to the title.
   Add or remove items freely: the layout adapts to any number of cards. */

const N = items.length;

/* ----- tweak the look here ----- */
const AUTO_MS = 5000; // idle time before the next card comes in (0 = off)
const SIDE_X = 0.58; // how far the side cards sit from the centre (x card width)
const SIDE_SCALE = 0.8; // size of the side cards (0.8 = 80%)
const SIDE_TILT = 14; // tilt of the side cards (deg)
const SIDE_OPACITY = 0.55; // how faded the side cards are (1 = not faded)
const SIDE_BLUR = 4; // blur of the side cards (px)

/* pos = where a card sits relative to the active one:
   0 = main card, -1 / 1 = blurred cards behind it (left / right),
   -2 / 2 (and beyond) = hidden behind the main card. */
function getPos(i, active) {
  const d = (((i - active) % N) + N) % N;
  return d > N / 2 ? d - N : d;
}

function cardStyle(pos) {
  const base = {
    transition:
      "transform .65s cubic-bezier(.25,1,.5,1), opacity .5s ease, filter .5s ease, box-shadow .5s ease",
    willChange: "transform, opacity, filter",
  };

  if (pos === 0) {
    return {
      ...base,
      transform: "translate3d(0,0,0) scale(1) rotateY(0deg)",
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 10,
      boxShadow: "0 28px 50px -18px rgba(97,61,29,0.55)",
    };
  }

  const dir = pos > 0 ? 1 : -1;

  if (Math.abs(pos) === 1) {
    return {
      ...base,
      transform: `translate3d(calc(var(--cw) * ${SIDE_X * dir}), 0, 0) scale(${SIDE_SCALE}) rotateY(${-dir * SIDE_TILT}deg)`,
      opacity: SIDE_OPACITY,
      filter: `blur(${SIDE_BLUR}px)`,
      zIndex: 5,
    };
  }

  return {
    ...base,
    transform: `translate3d(calc(var(--cw) * ${0.3 * dir}), 0, 0) scale(0.66)`,
    opacity: 0,
    filter: "blur(8px)",
    zIndex: 1,
    pointerEvents: "none",
  };
}

export default function PeekShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [live, setLive] = useState(false);

  const go = (i) => setActive(((i % N) + N) % N);

  // remember the visitor's currency choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency");
      if (saved === "usd" || saved === "lkr") setCurrency(saved);
    } catch {}
  }, []);
  const pickCurrency = (c) => {
    setCurrency(c);
    try {
      localStorage.setItem("currency", c);
    } catch {}
  };

  // load today's rate (cached on the server, see src/app/api/rate/route.ts)
  useEffect(() => {
    let off = false;
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => {
        if (!off && d?.rate > 0) {
          setRate(d.rate);
          setLive(!!d.live);
        }
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  // auto-advance (pauses while the mouse is over the cards)
  useEffect(() => {
    if (!AUTO_MS || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % N), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  // left / right arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % N);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    /* overflow-x-clip stops a sideways scrollbar from the side cards. */
    <section id="rentals" className="scroll-mt-24 relative w-full min-h-svh flex items-center bg-[#f0eee5] overflow-x-clip py-14">
      <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 grid grid-cols-1 md:grid-cols-[minmax(0,450px)_minmax(0,1fr)] items-center gap-6 md:gap-x-18">
        {/* ---------- Left: stays in place ---------- */}
        <div className="w-full min-w-0 md:-translate-y-8">
          <h2
            className={`${libertinus.className} text-[40px] leading-[1.08] text-[#2b1d10] md:text-[52px]`}
          >
            <span
              className={`${dancing.className} text-[48px] text-[#a15f21] md:text-[64px]`}
            >
              Scooter
            </span>{" "}
            &amp;{" "}
            <span
              className={`${dancing.className} text-[48px] text-[#a15f21] md:text-[64px]`}
            >
              Tuk-Tuk
            </span>{" "}
            for Every Journey
          </h2>
          <p className="hidden md:block font-poppins text-sm leading-7 text-[#5b4733] text-justify pt-5 max-w-md">
            Rent a scooter or tuk-tuk and discover the areas around Kumana at
            your own pace. Enjoy the freedom to explore with insurance coverage
            and 24/7 support included with every rental.
          </p>

          <ul className="hidden md:flex flex-col gap-3 pt-5">
            {["Flexible Rentals", "Easy Paperwork", "24/7 Support"].map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 font-poppins text-sm text-[#5b4733]"
              >
                <IoCheckmarkCircleOutline
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#e77b2a]"
                />
                {h}
              </li>
            ))}
          </ul>

          <Link
            href="/rentals"
            className="hidden md:inline-flex items-center gap-3 mt-7 rounded-full bg-[#a15f21] pl-6 pr-2 py-2 font-poppins text-sm font-semibold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
          >
            Read more
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#a15f21]">
              <IoArrowForward className="size-4" />
            </span>
          </Link>
          {/* step counter */}
          <div className="flex items-center gap-4 pt-5 md:pt-10 font-poppins text-xs text-[#5b4733]">
            <span className="tabular-nums font-semibold text-[#2b1d10]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(N).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {items.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  aria-label={`Show card ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${
                    i === active
                      ? "w-8 bg-[#a15f21]"
                      : "w-1.5 bg-[#a15f21]/30 cursor-pointer"
                  }`}
                />
              ))}
            </div>
            <span className="hidden md:inline">Click a side card</span>
          </div>
        </div>

        {/* ---------- Right: main card in front, blurred cards behind ---------- */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-w-0 grid justify-items-center items-center pt-14 pb-10 md:translate-x-8 [--cw:min(76vw,340px)] md:[--cw:clamp(250px,28vw,370px)]"
          style={{ perspective: "1600px" }}
        >
          {/* currency switch */}
          <div className="absolute right-0 top-0 z-30 flex items-center gap-2 font-poppins text-[11.5px] text-[#7a6550]">
            <span className="hidden sm:inline">Show prices in</span>
            <div
              role="group"
              aria-label="Currency"
              className="relative grid grid-cols-2 rounded-full border border-[#c9a36a] bg-[#fffaf2]/90 p-[3px] shadow-[0_6px_16px_-8px_rgba(97,61,29,0.5)]"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-[#a15f21] transition-transform duration-300 ${
                  currency === "lkr" ? "translate-x-full" : ""
                }`}
              />
              {[
                ["usd", "USD $"],
                ["lkr", "LKR Rs"],
              ].map(([c, label]) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => pickCurrency(c)}
                  aria-pressed={currency === c}
                  className={`relative z-10 min-w-[58px] rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                    currency === c ? "text-white" : "text-[#7a6550]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {items.map((r, i) => {
            const pos = getPos(i, active);
            const isActive = pos === 0;
            return (
              <article
                key={r.slug}
                aria-hidden={!isActive}
                /* clicking a blurred card brings it to the front */
                onClickCapture={(e) => {
                  if (isActive) return;
                  e.preventDefault();
                  e.stopPropagation();
                  go(i);
                }}
                style={{ gridArea: "1 / 1", ...cardStyle(pos) }}
                className={`w-[var(--cw)] overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2] shadow-[0_20px_40px_-18px_rgba(97,61,29,0.45)] select-none ${
                  isActive ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {/* top ribbon */}
                <div className="bg-[#a15f21] py-2 text-center font-poppins text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
                  {r.ribbon}
                </div>

                {/* image + badge + price pill */}
                <div className="relative w-full aspect-16/10 bg-[#e6d9bf]">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 370px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#2b1d10] px-3 py-1 font-poppins text-[11px] font-medium text-white">
                    {r.badge}
                  </span>
                  {r.price && (
                    <span className="absolute -bottom-4 right-3 z-10 whitespace-nowrap rounded-full border-[3px] border-[#fffaf2] bg-[#a15f21] px-3.5 py-1.5 font-poppins text-sm font-medium text-white">
                      {formatPrice(r.price, currency, rate)}{" "}
                      <span className="text-[11px] font-normal opacity-90">
                        / day
                      </span>
                    </span>
                  )}
                </div>

                {/* details */}
                <div className="px-[18px] pb-[18px] pt-7">
                  <h3
                    className={`${libertinus.className} text-[23px] text-[#2b1d10]`}
                  >
                    {r.title}
                  </h3>
                  <p className="pt-0.5 font-poppins text-xs text-[#7a6550]">
                    {r.sub}
                  </p>
                  <p className="pt-2.5 font-poppins text-[13px] leading-[1.55] text-[#5b4733]">
                    {r.desc}
                  </p>

                  <div className="mt-3 border-t border-[#c9a36a]/50" />
                  <ul className="flex flex-col gap-2 py-3 font-poppins text-[12.5px] text-[#5b4733]">
                    {r.features.map((text) => (
                      <li key={text} className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline
                          aria-hidden="true"
                          className="size-[18px] shrink-0 text-[#e77b2a]"
                        />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#c9a36a]/50" />

                  <a
                    href={wa(`Hi, I'd like to rent the ${r.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    className="mt-3.5 flex items-center justify-center gap-2 rounded-[14px] bg-[#a15f21] py-3 font-poppins text-sm font-medium text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                  >
                    <IoCalendarOutline aria-hidden="true" className="size-4" />
                    Book now
                  </a>
                  <Link
                    href={`/rentals/${r.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    className="mt-3 flex items-center justify-center gap-1.5 font-poppins text-sm font-medium text-[#a15f21] underline underline-offset-4 transition hover:text-[#7d4a19]"
                  >
                    View more
                    <IoArrowForward aria-hidden="true" className="size-3" />
                  </Link>
                </div>
              </article>
            );
          })}

          {/* rate note + required credit for the free rate service */}
          {currency === "lkr" && (
            <p className="absolute bottom-0 right-0 z-30 font-poppins text-[10.5px] text-[#7a6550]">
              {live ? "Today's rate" : "Approx. rate"} ·{" "}
              <a
                href="https://www.exchangerate-api.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rates by ExchangeRate-API
              </a>
            </p>
          )}
        </div>
        <Link
          href="/rentals"
          className="md:hidden justify-self-center font-poppins text-sm font-semibold text-[#a15f21] underline underline-offset-4"
        >
          View all rentals →
        </Link>
      </div>
    </section>
  );
}
