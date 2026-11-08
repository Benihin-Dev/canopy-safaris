"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  IoArrowForward,
  IoCalendarOutline,
  IoCallOutline,
  IoCameraOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoTimeOutline,
} from "react-icons/io5";

/* Add a `price` (for example "$25") to any card and it shows next to the title. */
const rentals = [
  {
    ribbon: "Most Popular Rental",
    badge: "1 - 3 Days",
    title: "Scooter Rental",
    sub: "Pick-up 8:00 AM  ·  Flexible return",
    desc: "A light, easy scooter for short getaways. Ideal for beach hopping, town visits and quick trips to nearby parks.",
    img: "/images/rentals/scooter-short.jpg",
    features: [
      { icon: IoShieldCheckmarkOutline, text: "Helmet & basic insurance included" },
      { icon: IoSpeedometerOutline, text: "Full tank on pick-up" },
    ],
    cta: "Book Scooter",
    href: "#",
  },
  {
    ribbon: "Best For Long Stays",
    badge: "5+ Days",
    title: "Scooter Long Rental",
    sub: "Pick-up 8:00 AM  ·  Weekly discount",
    desc: "Take your time exploring the island. A reliable scooter for five days or more, with a better rate the longer you stay.",
    img: "/images/rentals/scooter-long.jpg",
    features: [
      { icon: IoCalendarOutline, text: "Lower daily rate for long stays" },
      { icon: IoCallOutline, text: "24/7 roadside support" },
    ],
    cta: "Book Long Rental",
    href: "#",
  },
  {
    ribbon: "Local Favourite",
    badge: "Tuk Tuk",
    title: "Tuk Tuk Rental",
    sub: "Pick-up 8:00 AM  ·  Per day",
    desc: "Drive your own tuk tuk the Sri Lankan way. A fun, open-air ride with a short briefing before you set off.",
    img: "/images/rentals/tuktuk-rental.jpg",
    features: [
      { icon: IoShieldCheckmarkOutline, text: "Quick driving briefing included" },
      { icon: IoLocationOutline, text: "Suggested routes & map" },
    ],
    cta: "Book Tuk Tuk",
    href: "#",
  },
  {
    ribbon: "Day Trip Special",
    badge: "Full Day",
    title: "Tuk Tuk to Kudumbigala",
    sub: "Pick-up 6:00 AM  ·  With driver",
    desc: "Hire a tuk tuk with a local driver to Kudumbigala. Quiet forest roads, the old monastery and time to take it all in.",
    img: "/images/rentals/tuktuk-kudumbigala.jpg",
    features: [
      { icon: IoTimeOutline, text: "Early start, back by evening" },
      { icon: IoCameraOutline, text: "Photo stops on request" },
    ],
    cta: "Hire To Kudumbigala",
    href: "#",
  },
  {
    ribbon: "Wildlife Run",
    badge: "Full Day",
    title: "Tuk Tuk to Kumana",
    sub: "Pick-up 5:30 AM  ·  With driver",
    desc: "An easy ride to the edge of Kumana with an experienced driver. Great for combining with a morning safari.",
    img: "/images/rentals/tuktuk-kumana.jpg",
    features: [
      { icon: IoLocationOutline, text: "Drop-off at the park gate" },
      { icon: IoCallOutline, text: "Driver waits for your return" },
    ],
    cta: "Hire To Kumana",
    href: "#",
  },
];

const N = rentals.length;
const STEP_VH = 70; // how much scrolling each card change takes
const AUTO_MS = 5000; // idle time before the next card comes in
const LOOP = true; // after the last card, fade back to the first
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* Card 1 is already in place. After that they alternate: 2nd from the
   right, 3rd from the bottom, 4th from the right, and so on. */
const fromRight = (i) => i % 2 === 1;

function cardTransform(i, x) {
  const enter = i === 0 ? 1 : easeOut(clamp(x - (i - 1)));
  const depth = clamp(x - i, 0, 2); // how far behind the newest card
  const out = (1 - enter) * 115;
  const move = fromRight(i)
    ? `translate3d(${out}%, 0, 0)`
    : `translate3d(0, ${out}%, 0)`;
  return {
    transform: `${move} scale(${1 - depth * 0.05})`,
    filter: `brightness(${1 - depth * 0.15})`,
    opacity: 0.25 + 0.75 * enter, // fades in while it slides
  };
}

export default function RentalShowcase() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const stageRef = useRef(null);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    let loopTimer = 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = total > 0 ? clamp(-rect.top / total) : 0;
      const x = progress * (N - 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const s = cardTransform(i, x);
        card.style.transform = s.transform;
        card.style.filter = s.filter;
        card.style.opacity = s.opacity;
      });
      setActive(Math.round(x));
    };

    const schedule = () => {
      clearTimeout(timer);
      if (!reduceMotion) timer = setTimeout(autoNext, AUTO_MS);
    };

    const autoNext = () => {
      const el = sectionRef.current;
      if (!el || hoverRef.current) return schedule();
      const rect = el.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return schedule();

      const top = window.scrollY + rect.top;
      const total = el.offsetHeight - window.innerHeight;
      const x = clamp(-rect.top / total) * (N - 1);
      const nextIndex = Math.round(x) + 1;

      if (nextIndex <= N - 1) {
        window.scrollTo({
          top: top + (nextIndex / (N - 1)) * total,
          behavior: "smooth",
        });
      } else if (LOOP) {
        const stage = stageRef.current;
        stage.style.opacity = "0";
        loopTimer = setTimeout(() => {
          window.scrollTo({ top, behavior: "instant" });
          stage.style.opacity = "1";
        }, 400);
      } else {
        schedule();
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      schedule(); // any scrolling restarts the 5s wait
    };

    update();
    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    /* No ancestor of this section may use overflow-hidden/auto, or sticky
       stops working. Use overflow-clip on a parent if you need to clip. */
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f0eee5]"
      style={{ height: `calc(100svh + ${(N - 1) * STEP_VH}svh)` }}
    >
      <div className="sticky top-0 h-svh w-full flex items-center">
        <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-center gap-6 md:gap-12 lg:gap-24">
          {/* ---------- Left: stays in place ---------- */}
          <div className="w-full">
            <p className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-[#a15f21]">
              Rent &amp; hire
            </p>
            <h2 className="font-libertinus_Math text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-[#2b1d10] pt-2">
              Ride your own
              <span className="block text-[#a15f21]">adventure</span>
            </h2>
            <p className="hidden md:block font-poppins text-sm leading-7 text-[#5b4733] pt-5 max-w-md">
              Scooters for a few days or a few weeks, and tuk tuks with or
              without a driver. Pick the ride that fits your trip and we will
              have it ready for you.
            </p>

            <a
              href="#"
              className="hidden md:inline-flex items-center gap-3 mt-7 rounded-full bg-[#a15f21] pl-6 pr-2 py-2 font-poppins text-sm font-semibold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
            >
              Read more
              <span className="grid size-9 place-items-center rounded-full bg-white text-[#a15f21]">
                <IoArrowForward className="size-4" />
              </span>
            </a>

            {/* step counter */}
            <div className="hidden md:flex items-center gap-4 pt-10 font-poppins text-xs text-[#5b4733]">
              <span className="tabular-nums font-semibold text-[#2b1d10]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(N).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {rentals.map((r, i) => (
                  <span
                    key={r.title}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-[#a15f21]" : "w-1.5 bg-[#a15f21]/30"
                    }`}
                  />
                ))}
              </div>
              <span>Scroll to see more</span>
            </div>
          </div>

          {/* ---------- Right: cards slide in one by one ---------- */}
          <div
  ref={stageRef}
  onMouseEnter={() => (hoverRef.current = true)}
  onMouseLeave={() => (hoverRef.current = false)}
  className="relative w-full grid overflow-hidden rounded-3xl p-2 -m-2 transition-opacity duration-300"
>
            {rentals.map((r, i) => {
              const s = cardTransform(i, 0);
              return (
                <article
                  key={r.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  aria-hidden={i !== active}
                  style={{
                    gridArea: "1 / 1",
                    zIndex: i + 1,
                    transform: s.transform,
                    filter: s.filter,
                    opacity: s.opacity,
                    willChange: "transform, opacity",
                  }}
                  className="w-full overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2] shadow-[0_20px_40px_-18px_rgba(97,61,29,0.45)]"
                >
                  {/* top ribbon */}
                  <div className="bg-[#a15f21] py-2 text-center font-poppins text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    {r.ribbon}
                  </div>

                  {/* image + badge */}
                  <div className="relative w-full aspect-16/9">
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 480px"
                      className="object-cover"
                      priority={i === 0}
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[#2b1d10] px-3 py-1 font-poppins text-[11px] font-semibold text-white">
                      {r.badge}
                    </span>
                  </div>

                  {/* details */}
                  <div className="px-5 pt-5 pb-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-libertinus_Math text-2xl font-semibold text-[#2b1d10]">
                        {r.title}
                      </h3>
                      {r.price && (
                        <span className="font-libertinus_Math text-2xl font-semibold text-[#a15f21] whitespace-nowrap">
                          {r.price}
                          <span className="font-poppins text-xs font-normal text-[#5b4733]"> /day</span>
                        </span>
                      )}
                    </div>
                    <p className="font-poppins text-xs text-[#7a6550] pt-1">{r.sub}</p>
                    <p className="font-poppins text-sm leading-6 text-[#3d2c1b] pt-3">
                      {r.desc}
                    </p>

                    <ul className="space-y-1.5 pt-4 font-poppins text-xs text-[#5b4733]">
                      {r.features.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-2">
                          <Icon className="size-4 shrink-0 text-[#e77b2a]" />
                          {text}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={r.href}
                      tabIndex={i === active ? 0 : -1}
                      className="mt-5 block w-full rounded-full bg-[#a15f21] py-3 text-center font-poppins text-sm font-bold text-white transition hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                    >
                      {r.cta}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
