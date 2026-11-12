import Image from "next/image";
import Link from "next/link";
import { FaQuoteLeft } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import ReviewMarquee from "@/components/ReviewMarquee";
import GuestbookWall from "@/components/GuestbookWall";
import { reviews } from "@/data/reviews";

export const metadata = { title: "Guestbook — Canopy Safaris" };

export default function GuestbookPage() {
  const total = reviews.length;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / total;
  const countries = new Set(reviews.map((r) => r.location)).size;
  const breakdown = [5, 4, 3, 2, 1].map((n) => {
    const c = reviews.filter((r) => r.rating === n).length;
    return { n, c, pct: (c / total) * 100 };
  });
  const spotlight = reviews.find((r) => r.featured) ?? reviews[0];

  return (
    <div className="relative overflow-hidden bg-[#1a1410] text-white">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 size-130 rounded-full bg-[#f59e0b]/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[40rem] size-130 rounded-full bg-[#a15f21]/30 blur-[140px]"
      />

      {/* ───────── Hero ───────── */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-40 md:px-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="inline-block animate-fade-up rounded-full border border-[#f59e0b]/50 px-4 py-1.5 font-caveat text-xl text-[#f59e0b]">
            Guestbook
          </span>
          <h1 className="mt-5 animate-fade-up font-bebas text-6xl uppercase leading-[0.95] tracking-wide [animation-delay:.1s] md:text-8xl">
            Loved by travellers{" "}
            <span className="text-[#f59e0b]">worldwide</span>
          </h1>
          <p className="mt-6 max-w-lg animate-fade-up font-inter leading-7 text-stone-400 [animation-delay:.2s]">
            Real words from guests who explored the wild with us. Every story
            below came from a safari, a ride, or a campfire shared.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-6 [animation-delay:.3s]">
            <div className="flex items-center">
              {reviews.slice(0, 4).map((r, i) => (
                <Image
                  key={r.id}
                  src={r.photo}
                  alt=""
                  width={44}
                  height={44}
                  className={`size-11 rounded-full border-2 border-[#1a1410] object-cover ${i ? "-ml-3" : ""}`}
                />
              ))}
              <span className="-ml-3 grid size-11 place-items-center rounded-full bg-[#f59e0b] font-bebas text-sm text-[#1a1410]">
                {total}+
              </span>
            </div>
            <Link
              href="/#contact"
              className="rounded-full bg-[#f59e0b] px-7 py-3 font-bebas text-xl uppercase tracking-widest text-[#1a1410] transition-colors hover:bg-[#fbbf24]"
            >
              Share your story
            </Link>
          </div>
        </div>

        {/* Rating dashboard */}
        <div className="animate-fade-up rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] backdrop-blur-xl [animation-delay:.25s]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-bebas text-8xl leading-none text-[#f59e0b]">
                {avg.toFixed(1)}
              </p>
              <div className="mt-2">
                <Stars n={Math.round(avg)} className="size-5" />
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-6 text-right">
              <div>
                <dd className="font-bebas text-4xl leading-none">{total}</dd>
                <dt className="font-inter text-[11px] uppercase tracking-widest text-stone-500">
                  Stories
                </dt>
              </div>
              <div>
                <dd className="font-bebas text-4xl leading-none">
                  {countries}
                </dd>
                <dt className="font-inter text-[11px] uppercase tracking-widest text-stone-500">
                  Countries
                </dt>
              </div>
            </dl>
          </div>

          <ul className="mt-8 space-y-2.5">
            {breakdown.map((b) => (
              <li
                key={b.n}
                className="flex items-center gap-3 font-inter text-xs text-stone-400"
              >
                <span className="w-3 text-white">{b.n}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-linear-to-r from-[#a15f21] to-[#f59e0b]"
                    style={{ width: `${b.pct}%` }}
                  />
                </span>
                <span className="w-5 text-right tabular-nums">{b.c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Spotlight ───────── */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <figure className="relative grid overflow-hidden rounded-[36px] border border-[#f59e0b]/30 bg-linear-to-br from-[#2a2119] to-[#1a1410] md:grid-cols-[320px_1fr]">
            <div className="relative min-h-64">
              <Image
                src={spotlight.photo}
                alt={`Photo of ${spotlight.name}`}
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1410]/70 to-transparent md:bg-linear-to-r md:from-transparent md:to-[#2a2119]" />
            </div>
            <div className="relative p-8 md:p-12">
              <FaQuoteLeft className="size-10 text-[#f59e0b]" />
              <h2 className="mt-5 font-bebas text-4xl uppercase tracking-wide md:text-5xl">
                {spotlight.title}
              </h2>
              <p className="mt-4 font-inter text-lg leading-8 text-stone-300">
                &quot;{spotlight.text}&quot;
              </p>
              <figcaption className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Stars n={spotlight.rating} className="size-5" />
                <span className="font-bebas text-xl uppercase tracking-widest">
                  {spotlight.name}
                </span>
                <span className="font-inter text-sm text-stone-500">
                  {spotlight.location} · {spotlight.tour}
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </section>

      {/* ───────── Marquee ───────── */}
      <section className="relative py-20">
        <ReviewMarquee reviews={reviews} />
      </section>

      {/* ───────── Wall ───────── */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="font-caveat text-2xl text-[#f59e0b]">
              All stories
            </span>
            <h2 className="font-bebas text-5xl uppercase tracking-wide md:text-6xl">
              Browse the guestbook
            </h2>
          </div>
        </Reveal>
        <GuestbookWall />
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative px-6 pb-24 md:px-12">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-linear-to-br from-[#a15f21] to-[#f59e0b] px-8 py-16 text-center text-[#1a1410]">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-64 rounded-full bg-white/20 blur-3xl"
            />
            <span className="relative font-caveat text-2xl">
              Travelled with us?
            </span>
            <h2 className="relative font-bebas text-5xl uppercase tracking-wide md:text-7xl">
              Add your story
            </h2>
            <p className="relative mx-auto mt-3 max-w-md font-inter text-sm font-medium">
              Send us a few words and a photo. We may feature them right here.
            </p>
            <Link
              href="/#contact"
              className="relative mt-8 inline-block rounded-full bg-[#1a1410] px-9 py-3.5 font-bebas text-xl uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              Leave a message
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
