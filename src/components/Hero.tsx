"use client";
/* Put this file at: src/components/Hero.tsx  (replace the old Hero.tsx)

   Tabbed booking hero: Safari / Rental / Camping.
   - the "Experience" dropdown is filled from src/data/booking.ts, so it always
     matches your real packages and rentals (nothing to edit here)
   - "Check & book" opens /book?service=...&type=...  (the page you already have)
   - uses the existing image /public/images/hero/hero-bg.jpg  (no new image needed) */

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Playfair_Display, DM_Sans, Cinzel } from "next/font/google";
import { MAX_GUESTS, services, type ServiceKey } from "@/data/booking";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const TABS: ServiceKey[] = ["safari", "rental", "camping"];

const HEADLINE = "Into the Wild.";

export default function Hero() {
  const router = useRouter();

  /* ---------- typewriter: only "Into the Wild." (no cursor) ---------- */
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i = reduce ? HEADLINE.length : i + 1;
        setTyped(HEADLINE.slice(0, i));
        if (i >= HEADLINE.length) clearInterval(timer);
      }, 90);
    }, 700);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, []);

  /* ---------- booking bar ---------- */
  const [tab, setTab] = useState<ServiceKey>("safari");
  const service = services[tab];
  const [type, setType] = useState<string>(service.types[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  /* today (local) = earliest date a guest can pick */
  const today = useMemo(() => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }, []);

  const changeTab = (key: ServiceKey) => {
    setTab(key);
    setType(services[key].types[0]?.slug ?? "");
  };

  const goBook = () => {
    const q = new URLSearchParams({ service: tab, type });
    if (date) q.set("date", date);
    if (service.hasGuests) q.set("guests", String(guests));
    router.push(`/book?${q.toString()}`);
  };

  const label =
    "block text-[10px] font-semibold uppercase tracking-[.16em] text-[#a15f21]";
  const field =
    "mt-0.5 w-full bg-transparent text-[15px] font-medium text-[#2b1d10] outline-none";

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b0805]"
    >
      {/* ---------- background photo + fade ---------- */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover object-[62%_30%] md:object-[52%_28%]"
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        {/* desktop: dark brown on the left fading into the photo */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0b0805_0%,#0b0805_30%,#0b080500_72%)] md:block" />
        {/* mobile: dark overlay so the text stays readable */}
        <div className="absolute inset-0 bg-[linear-gradient(#0b0805f2,#0b0805a0_50%,#0b0805ee)] md:hidden" />
      </div>

      <div className="relative z-20 mx-auto w-full px-5 pb-20 pt-32 sm:w-11/12 sm:px-0 lg:max-w-350">
        <div className="w-full md:relative md:-left-[0.5vw]">
          <div className="w-full text-center md:text-left">
            {/* small top heading */}
            <p
              className={`${cinzel.className} inline-flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[3px] text-[#f1c46b] sm:text-[13px]`}
            >
              <span className="hidden h-px w-9 bg-[#f1c46b] md:inline-block" />
              Exclusive adventures in Kumana
            </p>

            {/* main heading */}
            <h1
              className={`${playfair.className} mt-4 font-medium leading-[1.1]`}
            >
              <span className="block text-[40px] text-[#F7F3E9] sm:text-5xl md:text-[52px] lg:text-[64px]">
                Beyond the Ordinary.
              </span>
              <span className="sr-only">{HEADLINE}</span>
              <span
                aria-hidden="true"
                className="relative mt-1 inline-block text-[44px] italic sm:text-[54px] md:text-[58px] lg:text-[72px]"
              >
                {/* invisible copy keeps the height fixed while typing */}
                <span className="invisible">{HEADLINE}</span>
                <span className="absolute left-0 top-0 whitespace-nowrap bg-linear-to-r from-[#ffd77a] to-[#ff9a3c] bg-clip-text text-transparent">
                  {typed}
                </span>
              </span>
            </h1>

            {/* description */}
            <p
              className={`${dmSans.className} mx-auto mt-4 max-w-xl text-[15px] font-normal leading-[1.7] text-[#D5DCD4] sm:text-[17px] md:mx-0`}
            >
              Book a jeep safari, rental or campsite in minutes.
            </p>

            {/* ---------- tabs ---------- */}
            <div
              role="tablist"
              aria-label="What would you like to book?"
              className={`${dmSans.className} mt-8 inline-flex rounded-full border border-[#f1c46b]/40 bg-[#0b0805]/80 p-1 backdrop-blur-md`}
            >
              {TABS.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => changeTab(key)}
                  className={`cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all ${
                    tab === key
                      ? "bg-linear-to-br from-[#ffb84d] to-[#f0702a] text-[#1a1208] shadow-[0_4px_14px_-4px_rgba(240,112,42,.8)]"
                      : "text-white hover:text-[#f1c46b]"
                  }`}
                >
                  {services[key].label}
                </button>
              ))}
            </div>

            {/* ---------- booking bar ---------- */}
            <div
              className={`${dmSans.className} mt-4 grid w-full max-w-175 grid-cols-2 gap-1.5 rounded-[22px] border border-[#f1c46b] bg-[#fffdf6] p-2.5 text-left text-[#2b1d10] shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] ${
                service.hasGuests
                  ? "md:grid-cols-[1.3fr_1fr_1fr_auto]"
                  : "md:grid-cols-[1.3fr_1fr_auto]"
              }`}
            >
              <div className="col-span-2 rounded-[14px] px-3.5 py-2 hover:bg-[#f6e6c8] md:col-span-1">
                <label htmlFor="hero-type" className={label}>
                  Experience
                </label>
                <select
                  id="hero-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={field}
                >
                  {service.types.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`rounded-[14px] px-3.5 py-2 hover:bg-[#f6e6c8] ${
                  service.hasGuests ? "" : "col-span-2 md:col-span-1"
                }`}
              >
                <label htmlFor="hero-date" className={label}>
                  {service.dateLabel}
                </label>
                <input
                  id="hero-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={field}
                />
              </div>

              {service.hasGuests && (
                <div className="rounded-[14px] px-3.5 py-2 hover:bg-[#f6e6c8]">
                  <label htmlFor="hero-guests" className={label}>
                    Guests
                  </label>
                  <select
                    id="hero-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={field}
                  >
                    {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={goBook}
                className="col-span-2 inline-flex min-h-13 cursor-pointer items-center justify-center rounded-2xl bg-linear-to-br from-[#ffb84d] to-[#f0702a] px-6.5 text-sm font-semibold text-[#1a1208] transition-all duration-300 hover:bg-none hover:bg-[#2b1d14] hover:text-[#f4ebdd] md:col-span-1"
              >
                Check &amp; book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
