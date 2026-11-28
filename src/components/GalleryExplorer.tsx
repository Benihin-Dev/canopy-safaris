"use client";
import { MAP_PATHS, MAP_VIEWBOX, project } from "@/data/sriLankaMap";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoExpandOutline,
} from "react-icons/io5";

import {
  categoryLabels,
  categoryOrder,
  galleryItems,
  parks,
  type Category,
  type GalleryItem,
  type ParkSlug,
} from "@/data/gallery";

/* how many photos each section shows before "View all" */
const PREVIEW = 3;
type Filter = "All" | Category;

const chip =
  "cursor-pointer rounded-full border px-4 py-1.5 font-inter text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]";

export default function GalleryExplorer() {
  /* only parks that have at least one photo are shown */
  const liveParks = useMemo(
    () => parks.filter((p) => galleryItems.some((g) => g.park === p.slug)),
    [],
  );

  const [parkSlug, setParkSlug] = useState<ParkSlug | undefined>(
    liveParks[0]?.slug,
  );
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const park = liveParks.find((p) => p.slug === parkSlug) ?? liveParks[0];

  const parkItems = useMemo(
    () => galleryItems.filter((g) => g.park === park?.slug),
    [park],
  );

  /* only categories that have photos in this park */
  const groups = useMemo(
    () =>
      categoryOrder
        .map((c) => ({
          category: c,
          items: parkItems.filter((g) => g.category === c),
        }))
        .filter((g) => g.items.length > 0),
    [parkItems],
  );

  const activeFilter: Filter =
    filter === "All" || groups.some((g) => g.category === filter)
      ? filter
      : "All";

  const shownGroups =
    activeFilter === "All"
      ? groups
      : groups.filter((g) => g.category === activeFilter);

  /* the photos the lightbox can flip through = what is on screen */
  const visible = useMemo(
    () =>
      shownGroups.flatMap((g) =>
        activeFilter === "All" ? g.items.slice(0, PREVIEW) : g.items,
      ),
    [shownGroups, activeFilter],
  );

  const pickPark = (slug: ParkSlug) => {
    setParkSlug(slug);
    setFilter("All");
    setOpen(null);
  };

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  /* no photos at all */
  if (!park) {
    return (
      <p className="py-20 text-center font-inter text-[#7a6550]">
        Photos are coming soon.
      </p>
    );
  }

  const current = open !== null ? visible[open] : null;

  const tile = (
    item: GalleryItem,
    className = "",
    style?: React.CSSProperties,
  ) => (
    <button
      key={item.src}
      type="button"
      onClick={() => setOpen(visible.indexOf(item))}
      aria-label={`Open ${item.alt}`}
      style={style}
      className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[#c9a36a]/60 bg-[#e6d9bf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width:640px) 50vw, (max-width:1024px) 40vw, 300px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="font-inter text-xs">{item.alt}</span>
        <IoExpandOutline className="size-4 flex-none" />
      </div>
    </button>
  );

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr]">
        {/* ================= LEFT: the map ================= */}
        <div className="rounded-3xl border border-[#c9a36a] bg-[#d8e2d4] p-4 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)] lg:sticky lg:top-28">
          <p className="text-center font-inter text-xs text-[#5b4733]">
            Tap a park on the map
          </p>

          <svg
            viewBox={MAP_VIEWBOX}
            role="group"
            aria-label="Map of Sri Lanka with national parks"
            className="mx-auto mt-2 w-full max-w-[300px]"
          >
            {MAP_PATHS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="#f0eee5"
                stroke="#c9a36a"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            ))}

            {liveParks.map((p) => {
              const on = p.slug === park.slug;
              const { x, y } = project(p.lat, p.lng);
              return (
                <g
                  key={p.slug}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show ${p.name} photos`}
                  aria-pressed={on}
                  onClick={() => pickPark(p.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pickPark(p.slug);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  {on && (
                    <circle cx={x} cy={y} r="30" fill="#f59e0b" opacity=".35" />
                  )}
                  {/* bigger invisible circle = easier to tap on a phone */}
                  <circle cx={x} cy={y} r="30" fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 16 : 11}
                    fill={on ? "#f59e0b" : "#a15f21"}
                    stroke="#2b1d10"
                    strokeWidth={on ? 3 : 0}
                  />
                  <text
                    x={p.side === "left" ? x - 22 : x + 22}
                    y={y + 10}
                    textAnchor={p.side === "left" ? "end" : "start"}
                    fontSize="28"
                    fill="#2b1d10"
                    fontWeight={on ? 700 : 500}
                    stroke="#f0eee5"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    className="pointer-events-none select-none font-inter"
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-center font-inter text-[10px] text-[#5b4733]/70">
            Map: simplemaps.com
          </p>
        </div>

        {/* ================= RIGHT: park name + photos ================= */}
        <div key={park.slug} className="min-w-0 animate-fade-up">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-caveat text-2xl text-[#a15f21]">
                National park
              </span>
              <h2 className="font-bebas text-5xl uppercase leading-none tracking-wide text-[#2b1d10] md:text-6xl">
                {park.name}
              </h2>
              <p className="mt-1 font-inter text-xs text-[#7a6550]">
                {parkItems.length} photo{parkItems.length === 1 ? "" : "s"} ·{" "}
                {groups.length} categor{groups.length === 1 ? "y" : "ies"}
              </p>
            </div>
            <Link
              href={`/book?service=safari&type=${park.bookType}`}
              className="rounded-full bg-[#a15f21] px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#7d4a19]"
            >
              Book {park.name} safari
            </Link>
          </div>

          {/* park chips (helpful on phones) */}
          {liveParks.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
              {liveParks.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => pickPark(p.slug)}
                  aria-pressed={p.slug === park.slug}
                  className={`${chip} ${
                    p.slug === park.slug
                      ? "border-[#a15f21] bg-[#a15f21] text-white"
                      : "border-[#c9a36a] text-[#5b4733]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}

          {/* category chips: only categories that have photos */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...groups.map((g) => g.category)] as Filter[]).map(
              (c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={activeFilter === c}
                  className={`${chip} ${
                    activeFilter === c
                      ? "border-[#a15f21] bg-[#a15f21] text-white"
                      : "border-[#c9a36a] text-[#5b4733] hover:bg-[#a15f21]/10"
                  }`}
                >
                  {c === "All" ? "All" : categoryLabels[c]}{" "}
                  {c === "All"
                    ? parkItems.length
                    : groups.find((g) => g.category === c)?.items.length}
                </button>
              ),
            )}
          </div>

          {/* sections */}
          {shownGroups.map((g) => (
            <section key={g.category} className="mt-8">
              <div className="mb-3 flex items-baseline justify-between">
                <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                  {categoryLabels[g.category]}
                </h3>
                {activeFilter === "All" && g.items.length > PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setFilter(g.category)}
                    className="cursor-pointer font-inter text-sm font-medium text-[#a15f21] underline underline-offset-4 hover:text-[#7d4a19]"
                  >
                    View all {g.items.length}
                  </button>
                )}
              </div>

              {activeFilter === "All" ? (
                /* preview row: 1, 2 or 3 photos */
                (() => {
                  const row = g.items.slice(0, PREVIEW);
                  const cols =
                    row.length === 1
                      ? "1fr"
                      : row.length === 2
                        ? "2fr 1fr"
                        : "2fr 1fr 1fr";
                  return (
                    <div
                      className="grid h-40 gap-3 sm:h-52"
                      style={{ gridTemplateColumns: cols }}
                    >
                      {row.map((item) => tile(item, "h-full"))}
                    </div>
                  );
                })()
              ) : (
                /* one category selected: every photo */
                <div className="columns-2 gap-3 lg:columns-3">
                  {g.items.map((item) =>
                    tile(item, "mb-3 break-inside-avoid", {
                      aspectRatio: item.ratio,
                    }),
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* ================= Lightbox ================= */}
      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute right-4 top-4 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <IoClose className="size-6" />
          </button>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-8"
              >
                <IoChevronBack className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-3 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-8"
              >
                <IoChevronForward className="size-6" />
              </button>
            </>
          )}

          <figure
            key={current.src}
            className="relative h-[80vh] w-full max-w-5xl animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="rounded-2xl object-contain"
              priority
            />
            <figcaption className="absolute inset-x-0 -bottom-12 text-center font-inter text-sm text-white/85">
              {current.alt}
              <span className="ml-3 text-white/50">
                {open + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
