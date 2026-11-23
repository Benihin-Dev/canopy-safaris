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
  price,
}: {
  title: string;
  price: string; // "$12"
}) {
  const unit = Number(price.replace(/[^0-9.]/g, "")) || 0;
  const [days, setDays] = useState(3);
  const [rate, setRate] = useState(FALLBACK_RATE);

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

  const total = unit * days;
  const lkr = Math.round((total * rate) / 100) * 100; // nearest 100 rupees
  const dayWord = days === 1 ? "day" : "days";
  const msg = `Hi, I'd like to rent the ${title} for ${days} ${dayWord} (about $${total}).`;
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]">
      <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
        Price
      </p>
      <p className="font-bebas text-5xl tracking-wide text-[#2b1d10]">
        {price}{" "}
        <span className="font-inter text-xs normal-case tracking-normal text-[#7a6550]">
          / day
        </span>
      </p>

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

      <div className="mt-4 flex items-baseline justify-between border-t border-[#c9a36a]/50 pt-3">
        <span className="font-inter text-sm text-[#5b4733]">Total</span>
        <span className="font-inter text-lg font-medium text-[#2b1d10]">
          ${total}
        </span>
      </div>
      <p className="font-inter text-right text-xs text-[#7a6550]">
        &asymp; Rs {lkr.toLocaleString("en-US")}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter mt-5 flex items-center justify-center gap-2 rounded-full bg-[#a15f21] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
      >
        <FaWhatsapp aria-hidden="true" className="size-[18px]" />
        Book on WhatsApp
      </a>
      <Link
        href="/rentals"
        className="font-inter mt-3 block rounded-full border border-[#c9a36a] py-3.5 text-center text-sm font-semibold text-[#5b4733] transition hover:bg-[#f0eee5]"
      >
        View all rentals
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
