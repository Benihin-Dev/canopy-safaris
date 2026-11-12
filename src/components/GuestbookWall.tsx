"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import Stars from "./Stars";
import { reviews, reviewTours } from "@/data/reviews";

const PAGE = 6;
type Sort = "newest" | "highest";
const time = (d: string) => Date.parse(`1 ${d}`) || 0;

export default function GuestbookWall() {
  const [tour, setTour] = useState("All");
  const [sort, setSort] = useState<Sort>("newest");
  const [visible, setVisible] = useState(PAGE);

  const items = useMemo(() => {
    const list =
      tour === "All" ? [...reviews] : reviews.filter((r) => r.tour === tour);
    return list.sort((a, b) =>
      sort === "newest"
        ? time(b.date) - time(a.date)
        : b.rating - a.rating || time(b.date) - time(a.date),
    );
  }, [tour, sort]);

  const shown = items.slice(0, visible);

  const glow = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <>
      {/* Sticky glass filter bar */}
      <div className="sticky top-24 z-30 mb-10 flex flex-col items-center justify-between gap-3 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl md:flex-row">
        <div className="flex max-w-full gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]">
          {reviewTours.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTour(t);
                setVisible(PAGE);
              }}
              aria-pressed={tour === t}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 font-inter text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#f59e0b] ${
                tour === t
                  ? "bg-[#f59e0b] text-[#1a1410]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <label className="flex shrink-0 items-center gap-2 pr-3 font-inter text-xs text-white/60">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="cursor-pointer rounded-full border border-white/15 bg-transparent px-3 py-1.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#f59e0b]"
          >
            <option className="text-black" value="newest">
              Newest
            </option>
            <option className="text-black" value="highest">
              Highest rated
            </option>
          </select>
        </label>
      </div>

      {/* Wall */}
      <div
        key={`${tour}-${sort}`}
        className="columns-1 gap-5 md:columns-2 lg:columns-3"
      >
        {shown.map((r, i) => (
          <article
            key={r.id}
            onMouseMove={glow}
            className="spot mb-5 animate-fade-up break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f59e0b]/50"
            style={{ animationDelay: `${(i % PAGE) * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <FaQuoteLeft className="size-6 text-[#f59e0b]" />
              <span className="rounded-full bg-[#f59e0b]/10 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-widest text-[#f59e0b]">
                {r.tour}
              </span>
            </div>

            <h3 className="mt-5 font-bebas text-3xl uppercase leading-none tracking-wide text-white">
              {r.title}
            </h3>
            <div className="mt-3">
              <Stars n={r.rating} />
            </div>
            <p className="mt-4 font-inter text-[15px] leading-7 text-stone-400">
              {r.text}
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <Image
                src={r.photo}
                alt={`Photo of ${r.name}`}
                width={48}
                height={48}
                className="size-12 flex-none rounded-full border-2 border-[#f59e0b] bg-[#2a2119] object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-bebas text-xl uppercase tracking-widest text-white">
                  {r.name}
                </p>
                <p className="truncate font-inter text-xs text-stone-500">
                  {r.location} · {r.date}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-16 text-center font-inter text-stone-400">
          No stories for this tour yet.
        </p>
      )}

      {visible < items.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="cursor-pointer rounded-full border border-white/20 px-8 py-3 font-bebas text-xl uppercase tracking-widest text-white transition-all hover:border-[#f59e0b] hover:text-[#f59e0b] focus-visible:outline-2 focus-visible:outline-[#f59e0b]"
          >
            Show more stories
          </button>
        </div>
      )}
    </>
  );
}
