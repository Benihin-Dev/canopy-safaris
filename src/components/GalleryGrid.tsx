"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoExpandOutline,
} from "react-icons/io5";
import { galleryItems, galleryCategories } from "@/data/gallery";

export default function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((g) => g.category === filter),
    [filter],
  );

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  // keyboard + scroll lock while the lightbox is open
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

  const current = open !== null ? items[open] : null;

  return (
    <>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`cursor-pointer rounded-full border px-5 py-2 font-inter text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21] ${
              filter === c
                ? "border-[#a15f21] bg-[#a15f21] text-white"
                : "border-[#c9a36a] text-[#5b4733] hover:bg-[#a15f21]/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry. key={filter} replays the entrance animation on filter change */}
      <div key={filter} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open ${g.alt}`}
            className="group relative mb-5 block w-full animate-fade-up cursor-zoom-in break-inside-avoid overflow-hidden rounded-3xl border border-[#c9a36a]/60 bg-[#e6d9bf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
            style={{
              aspectRatio: g.ratio,
              animationDelay: `${(i % 9) * 70}ms`,
            }}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-3 p-4 text-left text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <div>
                <span className="font-inter text-[10px] uppercase tracking-widest text-[#e8b873]">
                  {g.category}
                </span>
                <p className="font-inter text-sm">{g.alt}</p>
              </div>
              <IoExpandOutline className="size-5 flex-none" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
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
            aria-label="Next image"
            className="absolute right-3 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-8"
          >
            <IoChevronForward className="size-6" />
          </button>

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
                {open + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
