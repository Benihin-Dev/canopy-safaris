"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94754540123";
const FALLBACK_RATE = 300; // used only if the live rate cannot be loaded
const MAX_DAYS = 30;

/* scooter: 3 days or less = Short Stay, 4 days or more = Long Stay */
const SHORT_SLUG = "scooter-one";
const LONG_SLUG = "scooter-two";
const LONG_FROM = 4;

export default function RentalBookingCard({
  title,
  price,
  slug,
  priceUnit = "day",
}: {
  title: string;
  price: string; // "$12"
  slug: string;
  priceUnit?: "day" | "trip";
}) {
  const router = useRouter();
  const [days, setDays] = useState(slug === LONG_SLUG ? LONG_FROM : 3);
  const [rate, setRate] = useState(FALLBACK_RATE);

  const isScooter = slug === SHORT_SLUG || slug === LONG_SLUG;
  const unit = Number(price.replace(/[^0-9.]/g, "")) || 0;
  const perTrip = priceUnit === "trip"; // one flat price, no days

  // arrived from the other stay page: keep the days the visitor picked
  useEffect(() => {
    const m = window.location.hash.match(/days=(\d+)/);
    const n = m ? Number(m[1]) : 0;
    if (n >= 1 && n <= MAX_DAYS) setDays(n);
  }, [slug]);

  // scooters: 3 days or less = Short Stay page, 4 days or more = Long Stay page
  const changeDays = (next: number) => {
    const d = Math.min(MAX_DAYS, Math.max(1, next));
    setDays(d);
    if (!isScooter) return;
    const target = d >= LONG_FROM ? LONG_SLUG : SHORT_SLUG;
    if (target !== slug) {
      router.replace(`/rentals/${target}#days=${d}`, { scroll: false });
    }
  };

  // today's rate (cached on the server, see src/app/api/rate/route.ts)
  useEffect(() => {
    let off = false;
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => {
        if (!off && d?.rate > 0) setRate(d.rate);
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

    const total = perTrip ? unit : unit * days;
  const lkr = Math.round((total * rate) / 100) * 100; // nearest 100 rupees
  const dayWord = days === 1 ? "day" : "days";
    const msg = perTrip
    ? `Hi! I would like to enquire about the ${title} (about $${total} per trip, pick-up and drop).`
    : `Hi! I would like to enquire about renting the ${title} for ${days} ${dayWord} (about $${total}).`;
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]">
      <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
        Price
      </p>
      <p className="font-bebas text-5xl tracking-wide text-[#2b1d10]">
        {price}{" "}
        <span className="font-inter text-xs normal-case tracking-normal text-[#7a6550]">
          / {perTrip ? "trip" : "day"}
        </span>
      </p>
      {isScooter && (
        <p className="font-inter text-xs font-medium text-[#a15f21]">
          {slug === LONG_SLUG
            ? "Long Stay rate · 4 days or more"
            : "Short Stay rate · up to 3 days"}
        </p>
      )}

      {perTrip ? (
        <p className="font-inter mt-5 text-xs text-[#7a6550]">
          One trip, pick-up and drop included.
        </p>
      ) : (
        <>
          <p className="font-inter mt-5 text-xs text-[#7a6550]">
            How many days?
          </p>
          <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#d9c7a8] bg-white px-2 py-1.5">
            <button
              type="button"
              onClick={() => changeDays(days - 1)}
              aria-label="Fewer days"
              className="grid size-8 place-items-center rounded-full border border-[#c9a36a] bg-[#fffaf2] text-lg leading-none text-[#a15f21] transition hover:bg-[#f0eee5]"
            >
              &minus;
            </button>
            <span className="font-inter text-sm font-medium text-[#2b1d10]">
              {days} {dayWord}
            </span>
            <button
              type="button"
              onClick={() => changeDays(days + 1)}
              aria-label="More days"
              className="grid size-8 place-items-center rounded-full border border-[#c9a36a] bg-[#fffaf2] text-lg leading-none text-[#a15f21] transition hover:bg-[#f0eee5]"
            >
              +
            </button>
          </div>
        </>
      )}

      <div className="mt-4 flex items-baseline justify-between border-t border-[#c9a36a]/50 pt-3">
        <span className="font-inter text-sm text-[#5b4733]">Total</span>
        <span className="font-inter text-lg font-medium text-[#2b1d10]">
          ${total}
        </span>
      </div>
      <p className="font-inter text-right text-xs text-[#7a6550]">
        &asymp; Rs {lkr.toLocaleString("en-US")}
      </p>

      <Link
        href={`/book?service=rental&type=${slug}`}
        className="font-inter mt-5 block rounded-full bg-[#a15f21] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
      >
        Book this rental
      </Link>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter mt-3 block rounded-full border border-[#c9a36a] py-3.5 text-center text-sm font-semibold text-[#5b4733] transition hover:bg-[#f0eee5]"
      >
        WhatsApp inquiry
      </a>
      <Link
        href="/rentals"
        className="font-inter mt-4 block text-center text-sm font-medium text-[#5b4733] underline decoration-[#c9a36a] underline-offset-4 transition hover:text-[#a15f21]"
      >
        Compare packages
      </Link>

      <p className="font-inter mt-4 text-center text-[10.5px] text-[#9a8a77]">
        Rupee price is approximate.{" "}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Rates by ExchangeRate-API
        </a>
      </p>
    </div>
  );
}
