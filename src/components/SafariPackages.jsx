"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPaw, FaUsers, FaLeaf, FaWallet } from "react-icons/fa";

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

/* the 4 sides of the rolling box */
const perks = [
  { Icon: FaPaw, title: "High chance for leopard", sub: "Guides who know where to look" },
  { Icon: FaUsers, title: "Less crowded", sub: "Fewer jeeps, more space" },
  { Icon: FaLeaf, title: "Peaceful safari", sub: "Quiet time with nature" },
  { Icon: FaWallet, title: "Reasonable price", sub: "Good value for every budget" },
];

/* ----- tweak the look here ----- */
const HOLD_MS = 4500; // how long the centre card stays
const RADIUS = 3.0; // circle size, in card widths. Bigger = bigger circle
const STEP = 20; // degrees between two neighbouring cards
const SIDE_SCALE = 0.9; // side card size

const rad = (deg) => (deg * Math.PI) / 180;

/* every card sits on a circle: o = 0 centre, ±1 sides, ±2 waiting */
const transformFor = (o) => {
  const a = Math.min(Math.abs(o), 2);
  if (a === 0) return "translate3d(0,0,0) rotateY(0deg) scale(1)";
  const d = Math.sign(o);
  const ang = a * STEP;
  const x = RADIUS * Math.sin(rad(ang)) * d;
  const z = -RADIUS * (1 - Math.cos(rad(ang)));
  const s = a === 1 ? SIDE_SCALE : 0.7;
  return `translate3d(calc(var(--sp-w) * ${x}), 0, calc(var(--sp-w) * ${z})) rotateY(${d * ang}deg) scale(${s})`;
};

const css = `
.sp-root{
  --sp-w:min(540px,78vw);
  --sp-dur:1.1s;
  --sp-ease:cubic-bezier(.22,.8,.22,1);
  --sp-card-bg:#fffaf2;
  --sp-card-border:#c9a36a;
  --sp-heading:#2b1d10;
  --sp-text:#3d2c1b;
  --sp-body:#5b4733;
  --sp-accent:#a15f21;
  --sp-accent-hover:#7d4a19;
  --sp-cube-h:100px;
  --sp-half:50px;
}
.sp-stage{position:relative;width:100%;padding:70px 0;perspective:1000px;perspective-origin:50% 50%;display:grid;touch-action:pan-y;cursor:grab;user-select:none}
.sp-stage.sp-dragging{cursor:grabbing}

.sp-card{
  grid-area:1/1;justify-self:center;width:var(--sp-w);
  background:var(--sp-card-bg);border:1px solid var(--sp-card-border);
  border-radius:28px;padding:18px;color:var(--sp-text);
  box-shadow:0 30px 60px -20px rgba(97,61,29,.55);
  transition:transform var(--sp-dur) var(--sp-ease),opacity var(--sp-dur) var(--sp-ease),filter var(--sp-dur) var(--sp-ease);
  will-change:transform,opacity,filter;backface-visibility:hidden;
}
.sp-card[data-pos="center"]{z-index:3;filter:brightness(1)}
.sp-card[data-pos="side"]{z-index:2;filter:brightness(.9) saturate(.85);cursor:pointer;box-shadow:0 30px 60px -20px rgba(97,61,29,.45)}
.sp-card[data-pos="far"]{z-index:1;opacity:0;pointer-events:none}

.sp-media{position:relative;width:100%;aspect-ratio:16/10;border-radius:20px;overflow:hidden;background:#e6d9bf}
.sp-media::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.12),transparent 45%,rgba(43,29,16,.12));pointer-events:none}
.sp-badge{position:absolute;top:12px;left:12px;z-index:1;padding:6px 12px;border-radius:999px;background:#2b1d10;color:#fff;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}

.sp-body{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;padding:24px 10px 8px;transition:opacity var(--sp-dur) var(--sp-ease)}
.sp-card[data-pos="side"] .sp-body{opacity:.45}
.sp-meta h3{font-family:var(--font-bebas),sans-serif;font-size:clamp(1.9rem,4vw,2.4rem);font-weight:400;letter-spacing:.03em;text-transform:uppercase;line-height:1.05;color:var(--sp-heading);margin-bottom:6px}
.sp-meta p{font-size:.95rem;color:var(--sp-text)}
.sp-hl{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;padding:0;list-style:none}
.sp-hl li{font-size:.78rem;color:var(--sp-body);border:1px solid var(--sp-card-border);border-radius:999px;padding:4px 10px}

.sp-action{flex:none;width:56px;height:56px;border-radius:50%;background:var(--sp-accent);border:0;color:#fff;display:grid;place-items:center;transition:background .2s ease,transform .2s ease}
.sp-action:hover{background:var(--sp-accent-hover);transform:scale(1.08)}
.sp-action:focus-visible{outline:2px solid var(--sp-accent);outline-offset:3px}
.sp-action svg{width:20px;height:20px;stroke:currentColor;stroke-width:2.2;fill:none}
.sp-card[data-pos="side"] .sp-action{pointer-events:none}

.sp-controls{display:flex;align-items:center;justify-content:center;gap:16px;padding-bottom:8px}
.sp-nav{width:46px;height:46px;border-radius:50%;background:var(--sp-accent);border:0;color:#fff;font-size:1.2rem;cursor:pointer;display:grid;place-items:center;transition:background .2s ease}
.sp-nav:hover{background:var(--sp-accent-hover)}
.sp-nav:focus-visible{outline:2px solid var(--sp-accent);outline-offset:3px}
.sp-side{position:absolute;top:50%;z-index:10;width:46px;height:46px;margin-top:-23px;border-radius:50%;background:var(--sp-accent);border:0;color:#fff;font-size:1.2rem;cursor:pointer;display:grid;place-items:center;opacity:0;transition:opacity .3s ease,background .2s ease,transform .2s ease}
.sp-side:hover{background:var(--sp-accent-hover);transform:scale(1.08)}
.sp-side:focus-visible{opacity:1;outline:2px solid var(--sp-accent);outline-offset:3px}
.sp-side-l{left:calc(50% - var(--sp-w) / 2 - 23px)}
.sp-side-r{right:calc(50% - var(--sp-w) / 2 - 23px)}
.sp-stage:hover .sp-side{opacity:1}
@media (hover:none){.sp-side{opacity:1}}
.sp-dots{display:flex;gap:8px}
.sp-dot{height:8px;width:8px;padding:0;border-radius:999px;border:0;background:rgba(161,95,33,.28);cursor:pointer;transition:width .3s ease,background .3s ease}
.sp-dot[aria-current="true"]{width:26px;background:var(--sp-accent)}

/* heading + rolling box */
.sp-ln{display:block;overflow:hidden}
.sp-ln>span{display:inline-block;transform:translateY(110%)}
.sp-pill{display:inline-block;transform:rotate(-6deg);opacity:0}
.sp-3d{opacity:0;perspective:700px;perspective-origin:50% 40%;position:relative;width:100%;max-width:380px;height:var(--sp-cube-h);margin:0 auto;cursor:pointer}
.sp-go .sp-ln>span{animation:sp-up .8s var(--sp-ease) both}
.sp-go .sp-ln:nth-child(2)>span{animation-delay:.15s}
.sp-go .sp-pill{animation:sp-pop .7s var(--sp-ease) .1s both}
.sp-go .sp-3d{animation:sp-fade .9s ease .4s both}
@keyframes sp-up{from{transform:translateY(110%)}to{transform:none}}
@keyframes sp-pop{from{opacity:0;transform:rotate(-6deg) scale(.6)}to{opacity:1;transform:rotate(-6deg) scale(1)}}
@keyframes sp-fade{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

.sp-lift{position:absolute;inset:0;transform-style:preserve-3d}
.sp-lift.sp-rolling{animation:sp-lift 1.2s cubic-bezier(.45,0,.2,1)}
@keyframes sp-lift{0%{transform:translateZ(0) scale(1)}40%{transform:translateZ(-55px) scale(.96)}100%{transform:translateZ(0) scale(1)}}
.sp-cube{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1.2s cubic-bezier(.45,0,.2,1.15)}
.sp-face{position:absolute;inset:0;display:flex;align-items:center;gap:12px;padding:0 18px;background:var(--sp-card-bg);border:1px solid var(--sp-card-border);border-radius:16px;backface-visibility:hidden;overflow:hidden}
.sp-face::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,0) 45%,rgba(97,61,29,.1));pointer-events:none}
.sp-perk-ic{position:relative;z-index:1;flex:none;width:40px;height:40px;border-radius:50%;background:var(--sp-accent);color:#fff;display:grid;place-items:center;font-size:19px}
.sp-perk-tx{position:relative;z-index:1}
.sp-perk-t{font-family:var(--font-bebas),sans-serif;font-weight:400;font-size:19px;letter-spacing:.04em;text-transform:uppercase;line-height:1.15;color:var(--sp-heading);margin:0}
.sp-perk-s{font-size:11.5px;color:#7a6550;margin:2px 0 0}
.sp-shadow{position:absolute;left:8%;right:8%;bottom:-38px;height:20px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(97,61,29,.38),rgba(97,61,29,0) 70%)}
.sp-shadow.sp-rolling{animation:sp-sh 1.2s cubic-bezier(.45,0,.2,1)}
@keyframes sp-sh{0%{transform:scaleX(1);opacity:1}40%{transform:scaleX(.72);opacity:.55}100%{transform:scaleX(1);opacity:1}}

@media (prefers-reduced-motion: reduce){
  .sp-card,.sp-body{transition-duration:.01s}
  .sp-cube{transition-duration:.01s}
  .sp-lift.sp-rolling,.sp-shadow.sp-rolling{animation:none}
  .sp-ln>span{transform:none}
  .sp-pill,.sp-3d{opacity:1}
  .sp-go .sp-ln>span,.sp-go .sp-pill,.sp-go .sp-3d{animation:none}
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

  /* heading + rolling box */
  const [step, setStep] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [seen, setSeen] = useState(false);
  const rollBusy = useRef(false);
  const rollHover = useRef(false);
  const headRef = useRef<HTMLDivElement>(null);

  const rollBox = () => {
    if (rollBusy.current) return;
    rollBusy.current = true;
    setStep((s) => s + 1);
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      rollBusy.current = false;
    }, 1200);
  };

  /* start the heading animation when the section scrolls into view */
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the box rolls by itself every 3.4 seconds */
  useEffect(() => {
    const t = setInterval(() => {
      if (!rollHover.current && !document.hidden) rollBox();
    }, 3400);
    return () => clearInterval(t);
  }, []);

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

  const cardRefs = useRef([]);

  /* a card coming round from the hidden side starts off-screen,
     then swings in like a door, at the same speed as the others */
  useLayoutEffect(() => {
    offsets.forEach((o, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      if (Math.abs(o - prevOffset.current[i]) > 2) {
        el.style.transition =
          "opacity var(--sp-dur) var(--sp-ease), filter var(--sp-dur) var(--sp-ease)";
        el.style.transform = transformFor(Math.sign(o) * 2);
        void el.offsetWidth;
        el.style.transition = "";
        el.style.transform = transformFor(o);
      }
    });
  }, [current]);

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
      className="sp-root relative w-full overflow-hidden bg-[#f0eee5] py-16"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <style>{css}</style>

      <div
        ref={headRef}
        className={`mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-12${seen ? " sp-go" : ""}`}
      >
        <h2 className="font-bebas text-5xl uppercase leading-[1.08] tracking-wide text-[#2b1d10] md:text-6xl">
          <span className="sp-ln">
            <span>
              <span className="sp-pill relative -top-1 mr-4 rounded-full border border-[#a15f21] px-4 py-1.5 align-middle font-caveat text-lg normal-case leading-none tracking-normal text-[#a15f21] md:text-xl">
                Safari
              </span>
              Choose your
            </span>
          </span>
          <span className="sp-ln">
            <span>wild adventure</span>
          </span>
        </h2>

        <div
          className="sp-3d"
          onClick={rollBox}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") rollHover.current = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") rollHover.current = false;
          }}
        >
          <div className={`sp-lift${rolling ? " sp-rolling" : ""}`}>
            <div
              className="sp-cube"
              style={{ transform: `rotateX(${-step * 90}deg)` }}
            >
              {perks.map(({ Icon, title, sub }, i) => (
                <div
                  key={title}
                  className="sp-face"
                  aria-hidden={i !== step % perks.length}
                  style={{
                    transform: `rotateX(${i * 90}deg) translateZ(var(--sp-half))`,
                  }}
                >
                  <span className="sp-perk-ic">
                    <Icon />
                  </span>
                  <div className="sp-perk-tx">
                    <p className="sp-perk-t">{title}</p>
                    <p className="sp-perk-s font-inter">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`sp-shadow${rolling ? " sp-rolling" : ""}`} />
        </div>
      </div>

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

          return (
            <article
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="sp-card"
              data-pos={pos}
              aria-hidden={pos !== "center"}
              style={{ transform: transformFor(o) }}
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
                <span className="sp-badge font-inter">{p.badge}</span>
              </div>

              <div className="sp-body">
                <div className="sp-meta">
                  <h3>{p.title}</h3>
                  <p className="font-inter">{p.desc}</p>
                  <ul className="sp-hl font-inter">
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

        <button
          className="sp-side sp-side-l"
          onClick={prev}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          className="sp-side sp-side-r"
          onClick={next}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div className="sp-controls">
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
      </div>
    </section>
  );
}

