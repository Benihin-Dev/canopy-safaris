/* DRAFT camping details page, built like the safari details page.
   Put this file at: src/app/camping/page.tsx */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaClock, FaSun, FaTimes, FaUsers } from "react-icons/fa";
import { camping } from "@/data/camping";
import { services } from "@/data/booking";
import ItinerarySwitch from "@/components/ItinerarySwitch";

/* WhatsApp number: country code + number, no + and no spaces */
const WHATSAPP = "94754540123";

/* words wrapped in **double stars** become highlighted */
const withBold = (text: string) =>
  text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-[#a15f21]">
        {part}
      </strong>
    ) : (
      part
    ),
  );

export const metadata: Metadata = {
  title: `${camping.title} — Canopy Safaris`,
  description: camping.tagline,
};

export default function CampingPage() {
  const facts = [
    { Icon: FaClock, label: "Duration", value: camping.duration },
    { Icon: FaUsers, label: "Group size", value: camping.groupSize },
    { Icon: FaSun, label: "Best time", value: camping.bestTime },
  ];

  /* optional extras come from src/data/booking.ts so the prices always match */
  const extras = services.camping.lines.filter((l) => !l.required);

  return (
    <main className="bg-[#f0eee5] text-[#3d2c1b]">
      {/* hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src={camping.img}
          alt={camping.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d10]/85 via-[#2b1d10]/30 to-[#2b1d10]/40" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-12 md:px-12">
          <span className="font-inter inline-block rounded-full bg-[#2b1d10] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white">
            {camping.badge}
          </span>
          <h1 className="font-bebas mt-4 text-6xl uppercase leading-none tracking-wide text-white md:text-8xl">
            {camping.title}
          </h1>
          <p className="font-caveat mt-2 text-2xl text-[#f3d9b1] md:text-3xl">
            {camping.tagline}
          </p>
        </div>
      </section>

      {/* quick facts */}
      <section className="mx-auto -mt-8 max-w-6xl px-6 md:px-12">
        <div className="relative z-10 grid gap-px overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#c9a36a] shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)] sm:grid-cols-3">
          {facts.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 bg-[#fffaf2] p-5"
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#a15f21] text-white">
                <Icon />
              </span>
              <div>
                <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
                  {label}
                </p>
                <p className="font-bebas text-2xl tracking-wide text-[#2b1d10]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* content + booking */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-14">
          <div>
            <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
              Overview
            </h2>
            <p className="font-inter mt-4 text-justify leading-relaxed text-[#5b4733]">
              {withBold(camping.overview)}
            </p>
            <ul className="font-inter mt-6 flex flex-wrap gap-2">
              {camping.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-[#c9a36a] px-3 py-1 text-sm text-[#5b4733]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <ItinerarySwitch
            options={[{ label: "Camp night", steps: camping.schedule }]}
          />

          {camping.notes && camping.notes.length > 0 && (
            <div className="font-inter text-[12px] leading-relaxed text-[#7a6550]">
              <p className="font-semibold text-[#5b4733]">Note</p>
              <div className="mt-0.5 space-y-1 pl-4 text-justify italic">
                {camping.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                Included
              </h2>
              <ul className="font-inter mt-4 space-y-2 text-sm text-[#5b4733]">
                {camping.included.map((i) => (
                  <li key={i} className="flex gap-3">
                    <FaCheck className="mt-1 flex-none text-[#a15f21]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                Not included
              </h2>
              <ul className="font-inter mt-4 space-y-2 text-sm text-[#5b4733]">
                {camping.excluded.map((i) => (
                  <li key={i} className="flex gap-3">
                    <FaTimes className="mt-1 flex-none text-[#9a8a77]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* optional extras (prices come from booking.ts) */}
          <div>
            <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
              Optional extras
            </h2>
            <ul className="font-inter mt-4 divide-y divide-[#c9a36a]/40 rounded-2xl border border-[#c9a36a] bg-[#fffaf2] text-sm text-[#5b4733]">
              {extras.map((l) => (
                <li
                  key={l.key}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span>
                    <span className="block font-medium text-[#2b1d10]">
                      {l.label}
                    </span>
                    <span className="text-xs text-[#7a6550]">{l.hint}</span>
                  </span>
                  <span className="font-bebas text-xl tracking-wide text-[#a15f21]">
                    ${l.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* sticky booking card */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]">
            <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
              Starting at
            </p>
            <p className="font-bebas text-5xl tracking-wide text-[#2b1d10]">
              {camping.price}
            </p>
            <p className="font-inter text-xs text-[#7a6550]">
              per person, per night
            </p>

            <Link
              href={`/book?service=camping&type=${camping.slug}`}
              className="font-inter mt-6 block rounded-full bg-[#a15f21] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
            >
              Book this stay
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Hi! I would like to enquire about the ${camping.title}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter mt-3 block rounded-full border border-[#c9a36a] py-3.5 text-center text-sm font-semibold text-[#5b4733] transition hover:bg-[#f0eee5]"
            >
              WhatsApp inquiry
            </a>
            <Link
              href="/packages"
              className="font-inter mt-4 block text-center text-sm font-medium text-[#5b4733] underline decoration-[#c9a36a] underline-offset-4 transition hover:text-[#a15f21]"
            >
              Compare packages
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
