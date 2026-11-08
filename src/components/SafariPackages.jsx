"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const packages = [
  {
    badge: "Wildlife Experience",
    title: "Kumana Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/kumana.jpg",
    highlights: ["Half day safari", "Full day safari"],
    href: "#",
  },
  {
    badge: "After Dark",
    title: "Night Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/night.jpg",
    highlights: ["Sunset", "Nocturnal animal"],
    href: "#",
  },
  {
    badge: "Outdoor Adventure",
    title: "Outdoor Safari",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/outdoor.jpg",
    highlights: ["Kudumbigala", "Crocodile and elephants encounter"],
    href: "#",
  },
  {
    badge: "Made For You",
    title: "Tailor Made",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/images/safari/tailor-made.jpg",
    highlights: [
      "Morning or evening",
      "Meals package",
      "Destinations",
      "Buffer zone dinner",
      "Under bonfire dinner",
    ],
    href: "#",
  },
];

/* ----- tweak the look here ----- */
const HOLD_MS = 5000; // how long the centre card stays
const SIDE_GAP = 1.0; // side card distance (1 = one card width)
const SIDE_DEPTH = -300; // how far back the side cards sit (px)
const SIDE_TILT = 48; // door-like tilt (deg)
const SIDE_SCALE = 0.88; // side card size

const css = `
.sp-root{
  --sp-w:min(540px,78vw);
  --sp-dur:.75s;
  --sp-ease:cubic-bezier(.22,.8,.22,1);
  --sp-card-bg:#121212;
  --sp-card-border:rgba(255,255,255,.07);
  --sp-text:#ffffff;
  --sp-muted:#8b8b92;
  --sp-btn:#1f1f22;
  --sp-btn-hover:#2e2e33;
}
.sp-stage{width:100%;padding:70px 0;perspective:1000px;perspective-origin:50% 50%;display:grid;touch-action:pan-y;cursor:grab;user-select:none}
.sp-stage.sp-dragging{cursor:grabbing}

.sp-card{
  grid-area:1/1;justify-self:center;width:var(--sp-w);
  background:var(--sp-card-bg);border:1px solid var(--sp-card-border);
  border-radius:28px;padding:18px;color:var(--sp-text);
  box-shadow:0 30px 60px -20px rgba(0,0,0,.9);
  transition:transform var(--sp-dur) var(--sp-ease),opacity var(--sp-dur) var(--sp-ease),filter var(--sp-dur) var(--sp-ease);
  will-change:transform,opacity,filter;backface-visibility:hidden;
}
.sp-card[data-pos="center"]{z-index:3;filter:brightness(1)}
.sp-card[data-pos="side"]{z-index:2;filter:brightness(.45) saturate(.8);cursor:pointer}
.sp-card[data-pos="far"]{z-index:1;opacity:0;pointer-events:none;filter:brightness(.3)}

.sp-media{position:relative;width:100%;aspect-ratio:16/10;border-radius:20px;overflow:hidden;background:#1a1a1c}
.sp-media::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.14),transparent 45%,rgba(0,0,0,.18));pointer-events:none}
.sp-badge{position:absolute;top:12px;left:12px;z-index:1;padding:6px 12px;border-radius:999px;background:rgba(11,11,12,.65);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}

.sp-body{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;padding:24px 10px 8px;transition:opacity var(--sp-dur) var(--sp-ease)}
.sp-card[data-pos="side"] .sp-body{opacity:.35}
.sp-meta h3{font-size:clamp(1.6rem,4vw,2.1rem);font-weight:600;letter-spacing:-.02em;margin-bottom:6px}
.sp-meta p{font-size:.95rem;color:var(--sp-muted)}
.sp-hl{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;padding:0;list-style:none}
.sp-hl li{font-size:.78rem;color:#c9c9ce;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:4px 10px}

.sp-action{flex:none;width:56px;height:56px;border-radius:50%;background:var(--sp-btn);border:1px solid rgba(255,255,255,.06);color:var(--sp-text);display:grid;place-items:center;transition:background .2s ease,transform .2s ease}
.sp-action:hover{background:var(--sp-btn-hover);transform:scale(1.08)}
.sp-action:focus-visible{outline:2px solid #fff;outline-offset:3px}
.sp-action svg{width:20px;height:20px;stroke:currentColor;stroke-width:2.2;fill:none}
.sp-card[data-pos="side"] .sp-action{pointer-events:none}

.sp-controls{display:flex;align-items:center;justify-content:center;gap:16px;padding-bottom:8px}
.sp-nav{width:46px;height:46px;border-radius:50%;background:var(--sp-btn);border:1px solid rgba(255,255,255,.06);color:#fff;font-size:1.2rem;cursor:pointer;display:grid;place-items:center;transition:background .2s ease}
.sp-nav:hover{background:var(--sp-btn-hover)}
.sp-nav:focus-visible{outline:2px solid #fff;outline-offset:3px}
.sp-dots{display:flex;gap:8px}
.sp-dot{height:8px;width:8px;padding:0;border-radius:999px;border:0;background:rgba(255,255,255,.25);cursor:pointer;transition:width .3s ease,background .3s ease}
.sp-dot[aria-current="true"]{width:26px;background:#fff}

@media (prefers-reduced-motion: reduce){
  .sp-card,.sp-body{transition-duration:.01s}
}
`;

export default function SafariPackages() {
  const n = packages.length;
  const [current, setCurrent] = useState(1); // start on the 2nd card
  const [dragging, setDragging] = useState(false);
  const prevOffset = useRef(new Array(n).fill(0));
  const hovering = useRef(false);
  const startX = useRef(0);
  const down = useRef(false);
  const moved = useRef(false);

  const goTo = (i) => setCurrent(((i % n) + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);
  const prev = () => setCurrent((c) => (c - 1 + n) % n);

  /* shortest signed distance from the centre card, e.g. -1, 0, 1 */
  const offsets = packages.map((_, i) => {
    let o = (((i - current) % n) + n) % n;
    if (o > n / 2) o -= n;
    // for an even count the opposite card keeps leaving the way it was going
    if (n % 2 === 0 && o === n / 2) o = prevOffset.current[i] < 0 ? -o : o;
    return o;
  });
  useEffect(() => {
    prevOffset.current = offsets;
  });

  const cardStyle = (o, wrapped) => {
    const abs = Math.abs(o);
    const dir = Math.sign(o);
    let transform;
    if (abs === 0) {
      transform = "translate3d(0,0,0) rotateY(0deg) scale(1)";
    } else if (abs === 1) {
      transform = `translate3d(calc(var(--sp-w) * ${dir * SIDE_GAP}), 0, ${SIDE_DEPTH}px) rotateY(${dir * SIDE_TILT}deg) scale(${SIDE_SCALE})`;
    } else {
      transform = `translate3d(calc(var(--sp-w) * ${dir * SIDE_GAP * 1.6}), 0, ${SIDE_DEPTH * 2}px) rotateY(${dir * SIDE_TILT}deg) scale(0.7)`;
    }
    return {
      transform,
      // a card wrapping from one end to the other jumps while invisible
      transition: wrapped
        ? "opacity var(--sp-dur) var(--sp-ease), filter var(--sp-dur) var(--sp-ease)"
        : undefined,
    };
  };

  /* autoplay: stays HOLD_MS, then moves on, loops forever */
  useEffect(() => {
    const t = setInterval(() => {
      if (!hovering.current && !document.hidden) next();
    }, HOLD_MS);
    return () => clearInterval(t);
  }, [current]);

  /* swipe / drag release */
  useEffect(() => {
    const up = (e) => {
      if (!down.current) return;
      down.current = false;
      setDragging(false);
      const diff = e.clientX - startX.current;
      if (Math.abs(diff) > 50) {
        moved.current = true;
        diff < 0 ? next() : prev();
        setTimeout(() => (moved.current = false));
      }
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  return (
    <section
      id="packages"
      className="sp-root relative w-full overflow-hidden bg-[#0b0b0c] py-16"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <style>{css}</style>

      <h2 className="font-libertinus_Math text-4xl md:text-5xl text-center text-white font-medium px-5">
        Our Safari Packages
      </h2>

      <div
        className={`sp-stage${dragging ? " sp-dragging" : ""}`}
        onPointerDown={(e) => {
          down.current = true;
          moved.current = false;
          startX.current = e.clientX;
          setDragging(true);
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hovering.current = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") hovering.current = false;
        }}
      >
        {packages.map((p, i) => {
          const o = offsets[i];
          const abs = Math.abs(o);
          const pos = abs === 0 ? "center" : abs === 1 ? "side" : "far";
          const wrapped = Math.abs(o - prevOffset.current[i]) > 2;

          return (
            <article
              key={p.title}
              className="sp-card"
              data-pos={pos}
              aria-hidden={pos !== "center"}
              style={cardStyle(o, wrapped)}
              onClick={() => {
                if (pos === "side" && !moved.current) goTo(i);
              }}
            >
              <div className="sp-media">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 78vw, 540px"
                  className="object-cover"
                  priority={i === 1}
                />
                <span className="sp-badge">{p.badge}</span>
              </div>

              <div className="sp-body">
                <div className="sp-meta">
                  <h3 className="font-libertinus_Math">{p.title}</h3>
                  <p className="font-poppins">{p.desc}</p>
                  <ul className="sp-hl font-poppins">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="sp-action"
                  href={p.href}
                  aria-label={`Book ${p.title}`}
                  tabIndex={pos === "center" ? 0 : -1}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sp-controls">
        <button className="sp-nav" onClick={prev} aria-label="Previous">
          ←
        </button>
        <div className="sp-dots">
          {packages.map((p, i) => (
            <button
              key={p.title}
              className="sp-dot"
              onClick={() => goTo(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === current}
            />
          ))}
        </div>
        <button className="sp-nav" onClick={next} aria-label="Next">
          →
        </button>
      </div>
    </section>
  );
}
