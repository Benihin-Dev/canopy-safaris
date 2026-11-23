/* Put this file at: src/app/book/page.tsx  (create the "book" folder) */

import { Suspense } from "react";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata = { title: "Book — Canopy Safaris" };

export default function BookPage() {
  return (
    <>
      {/* dark band so the white nav text stays readable at the top */}
      <section className="bg-[#2b1d10] px-6 pb-14 pt-36 text-white md:px-12">
        <div className="mx-auto max-w-6xl">
          <span className="animate-fade-up font-caveat text-2xl text-[#e8b873]">
            Booking
          </span>
          <h1 className="animate-fade-up font-bebas text-5xl uppercase tracking-wide [animation-delay:.15s] md:text-7xl">
            Plan your adventure
          </h1>
          <p className="mt-3 max-w-xl animate-fade-up font-inter text-white/85 [animation-delay:.3s]">
            Choose what you would like, tick the extras you want, and see every
            cost before you send. We reply with a PDF of your booking.
          </p>
        </div>
      </section>

      <section className="bg-[#f0eee5] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Suspense
            fallback={
              <p className="font-inter text-sm text-[#7a6550]">Loading...</p>
            }
          >
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </>
  );
}
