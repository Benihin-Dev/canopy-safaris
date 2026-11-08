"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForward, IoCheckmarkCircleOutline } from "react-icons/io5";

/* Replace this placeholder content with your own.
   Add a `price` (for example "$25") to show it next to the title. */
const items = [
  {
    ribbon: "Ribbon text one",
    badge: "Badge",
    title: "Card title one",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/one.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text two",
    badge: "Badge",
    title: "Card title two",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/two.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text three",
    badge: "Badge",
    title: "Card title three",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/three.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
  {
    ribbon: "Ribbon text four",
    badge: "Badge",
    title: "Card title four",
    sub: "Small line under the title",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/peek/four.jpg",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    href: "#",
  },
];

const N = items.length;

/* ----- tweak the look here ----- */
const STEP_VH = 70; // how much scrolling each card change takes
const AUTO_MS = 5000; // idle time before the next card comes in
const LOOP = true; // after the last card, fade back to the first
const PEEK_X = 62; // how far right the waiting card sits (% of card width)
const PEEK_TILT = 34; // door tilt of the waiting card (deg)
const PEEK_SCALE = 0.88; // size of the waiting card
const PEEK_OPACITY = 0.6; // how faded the waiting card is (1 = not faded)
const PEEK_BRIGHT = 0.6; // how dark the waiting card is (1 = normal)

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* x = scroll position in card steps (0 = first card, N-1 = last card).
   o = how far this card is from the main spot:
     o = 0  -> main card, clear
     o = 1  -> next card, waiting on the right, tilted and faded
     o = 2  -> hidden behind it
     o < 0  -> old card, stays in place and fades out */
function cardState(i, x) {
  const o = clamp(i - x, -1, 2);
  let tx, rot, scale, opacity, bright;

  if (o <= 0) {
    const t = easeOut(-o);
    tx = -t * 3;
    rot = 0;
    scale = 1 - t * 0.06;
    opacity = 1 - t;
    bright = 1 - t * 0.2;
  } else if (o <= 1) {
    const e = 1 - easeOut(1 - o); // 0 at the main spot, 1 at the right
    tx = e * PEEK_X;
    rot = e * PEEK_TILT;
    scale = 1 - e * (1 - PEEK_SCALE);
    opacity = 1 - e * (1 - PEEK_OPACITY);
    bright = 1 - e * (1 - PEEK_BRIGHT);
  } else {
    const t = o - 1;
    tx = PEEK_X + t * 25;
    rot = PEEK_TILT;
    scale = PEEK_SCALE - t * 0.08;
    opacity = PEEK_OPACITY * (1 - t);
    bright = PEEK_BRIGHT;
  }

  return {
    transform: `translate3d(${tx}%, 0, 0) rotateY(${rot}deg) scale(${scale})`,
    opacity,
    filter: `brightness(${bright})`,
    zIndex: o >= 0 ? Math.round(20 - o * 5) : Math.round(10 + o * 5),
    pointerEvents: o > -0.5 && o < 1.5 ? "auto" : "none",
  };
}

export default function PeekShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(0);

  // scroll the page so that card `i` is the main one
  const scrollToCard = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / (N - 1)) * total, behavior: "smooth" });
  };

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
        const s = cardState(i, x);
        card.style.transform = s.transform;
        card.style.opacity = s.opacity;
        card.style.filter = s.filter;
        card.style.zIndex = s.zIndex;
        card.style.pointerEvents = s.pointerEvents;
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
       stops working. overflow-x-clip is fine and stops a sideways scrollbar
       from the waiting card. */
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f0eee5] overflow-x-clip"
      style={{ height: `calc(100svh + ${(N - 1) * STEP_VH}svh)` }}
    >
      <div className="sticky top-0 h-svh w-full flex items-center">
        <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-center gap-6 md:gap-12 lg:gap-24">
          {/* ---------- Left: stays in place ---------- */}
          <div className="w-full">
            <p className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-[#a15f21]">
              Your small heading
            </p>
            <h2 className="font-libertinus_Math text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-medium text-[#2b1d10] pt-2">
              Your big heading
              <span className="block text-[#a15f21]">second line</span>
            </h2>
            <p className="hidden md:block font-poppins text-sm leading-7 text-[#5b4733] pt-5 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
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
                {items.map((r, i) => (
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

          {/* ---------- Right: clear card, next card waiting on the right ---------- */}
          <div
            ref={stageRef}
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
            className="relative w-full grid transition-opacity duration-300"
            style={{ perspective: "1400px" }}
          >
            {items.map((r, i) => {
              const s = cardState(i, 0);
              return (
                <article
                  key={r.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  aria-hidden={i !== active}
                  /* clicking the waiting card brings it forward */
                  onClickCapture={(e) => {
                    if (i === active) return;
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToCard(i);
                  }}
                  style={{
                    gridArea: "1 / 1",
                    zIndex: s.zIndex,
                    transform: s.transform,
                    opacity: s.opacity,
                    filter: s.filter,
                    pointerEvents: s.pointerEvents,
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
                        </span>
                      )}
                    </div>
                    <p className="font-poppins text-xs text-[#7a6550] pt-1">{r.sub}</p>
                    <p className="font-poppins text-sm leading-6 text-[#3d2c1b] pt-3">
                      {r.desc}
                    </p>

                    <ul className="space-y-1.5 pt-4 font-poppins text-xs text-[#5b4733]">
                      {r.features.map((text) => (
                        <li key={text} className="flex items-center gap-2">
                          <IoCheckmarkCircleOutline className="size-4 shrink-0 text-[#e77b2a]" />
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
