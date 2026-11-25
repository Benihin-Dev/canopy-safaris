"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

/* Put this file at: src/components/RentalBookingCard.tsx */

/* WhatsApp number: country code + number, no + or spaces */
const WHATSAPP = "94754540123";
const FALLBACK_RATE = 300; // used only if the live rate cannot be loaded
const MAX_DAYS = 30;

export default function RentalBookingCard({
  title,
  priceLkr,
  priceUnit,
  slug,
}: {
  title: string;
  priceLkr: number | null; // rupees. null = contact us for a quote
  priceUnit: "day" | "trip" | null;
  slug: string;
}) {
  const [days, setDays] = useState(3);
  const [rate, setRate] = useState(FALLBACK_RATE);
  const perDay = priceUnit === "day";

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

  const dayWord = days === 1 ? "day" : "days";
  const totalLkr = priceLkr == null ? 0 : perDay ? priceLkr * days : priceLkr;
  const usd = Math.round(totalLkr / rate); // approx dollars
  const msg =
    priceLkr == null
      ? `Hi, I'd like a quote for the ${title}.`
      : perDay
        ? `Hi, I'd like to rent the ${title} for ${days} ${dayWord}.`
        : `Hi, I'd like to book the ${title}.`;
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]">
      <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
        Price
      </p>
      <p className="font-bebas text-5xl tracking-wide text-[#2b1d10]">
        {priceLkr == null ? "On request" : `Rs ${priceLkr.toLocaleString("en-US")}`}{" "}
        {priceUnit && (
          <span className="font-inter text-xs normal-case tracking-normal text-[#7a6550]">
            / {priceUnit}
          </span>
        )}
      </p>

      {perDay && (
        <>
          <p className="font-inter mt-5 text-xs text-[#7a6550]">How many days?</p>
          <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#d9c7a8] bg-white px-2 py-1.5">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(1, d - 1))}
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
              onClick={() => setDays((d) => Math.min(MAX_DAYS, d + 1))}
              aria-label="More days"
              className="grid size-8 place-items-center rounded-full border border-[#c9a36a] bg-[#fffaf2] text-lg leading-none text-[#a15f21] transition hover:bg-[#f0eee5]"
            >
              +
            </button>
          </div>
        </>
      )}

      {priceLkr != null && (
        <>
          <div className="mt-4 flex items-baseline justify-between border-t border-[#c9a36a]/50 pt-3">
            <span className="font-inter text-sm text-[#5b4733]">Total</span>
            <span className="font-inter text-lg font-medium text-[#2b1d10]">
              Rs {totalLkr.toLocaleString("en-US")}
            </span>
          </div>
          <p className="font-inter text-right text-xs text-[#7a6550]">
            &asymp; ${usd}
          </p>
        </>
      )}

      {priceLkr == null ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter mt-5 flex items-center justify-center gap-2 rounded-full bg-[#a15f21] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
        >
          <FaWhatsapp /> Ask for a quote
        </a>
      ) : (
        <Link
          href={`/book?service=rental&type=${slug}`}
          className="font-inter mt-5 flex items-center justify-center gap-2 rounded-full bg-[#a15f21] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
        >
          Book now
        </Link>
      )}
      <Link
        href="/rentals"
        className="font-inter mt-3 block rounded-full border border-[#c9a36a] py-3.5 text-center text-sm font-semibold text-[#5b4733] transition hover:bg-[#f0eee5]"
      >
        View all rentals
      </Link>

      <p className="font-inter mt-4 text-center text-[10.5px] text-[#9a8a77]">
        Dollar price is approximate.{" "}
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
