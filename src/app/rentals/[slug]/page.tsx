import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaCheck,
  FaCogs,
  FaGasPump,
  FaInfoCircle,
  FaMotorcycle,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { rentals, getRental } from "@/data/rentals";
import RentalBookingCard from "@/components/RentalBookingCard";

type Props = { params: Promise<{ slug: string }> };

/* picks an icon for each spec by its label (Engine, Seats, Fuel...) */
const specIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("engine")) return FaMotorcycle;
  if (l.includes("trans")) return FaCogs;
  if (l.includes("seat") || l.includes("rider") || l.includes("passenger"))
    return FaUsers;
  if (l.includes("fuel")) return FaGasPump;
  return FaInfoCircle;
};

export function generateStaticParams() {
  return rentals.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRental(slug);
  if (!r) return {};
  return {
    title: `${r.title} — Canopy Rentals`,
    description: r.sub,
  };
}

export default async function RentalPage({ params }: Props) {
  const { slug } = await params;
  const rental = getRental(slug);
  if (!rental) notFound();

  const others = rentals.filter((r) => r.slug !== rental.slug);

  return (
    <main className="bg-[#f0eee5] text-[#3d2c1b]">
      {/* hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden bg-[#6a5238]">
        <Image
          src={rental.img}
          alt={rental.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#2b1d10]/85 via-[#2b1d10]/30 to-[#2b1d10]/40" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-14 md:px-12">
          <span className="font-inter inline-block rounded-full bg-[#2b1d10] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white">
            {rental.badge}
          </span>
          <h1 className="font-bebas mt-4 text-6xl uppercase leading-none tracking-wide text-white md:text-8xl">
            {rental.title}
          </h1>
          <p className="font-caveat mt-2 text-2xl text-[#f3d9b1] md:text-3xl">
            {rental.sub}
          </p>
        </div>
      </section>

      {/* quick facts (the specs from rentals.ts) */}
      {rental.specs.length > 0 && (
        <section className="mx-auto -mt-8 max-w-6xl px-6 md:px-12">
          <div
            className="relative z-10 grid gap-px overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#c9a36a] shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            }}
          >
            {rental.specs.map((s) => {
              const Icon = specIcon(s.label);
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 bg-[#fffaf2] p-5"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#a15f21] text-white">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
                      {s.label}
                    </p>
                    <p className="font-bebas text-2xl tracking-wide text-[#2b1d10]">
                      {s.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* content + booking */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-14">
          <div>
            <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
              Overview
            </h2>
            <p className="font-inter mt-4 text-justify hyphens-auto leading-relaxed text-[#5b4733]">
              {rental.overview}
            </p>
            {rental.features.length > 0 && (
              <ul className="font-inter mt-6 flex flex-wrap gap-2">
                {rental.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-[#c9a36a] px-3 py-1 text-sm text-[#5b4733]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                Included
              </h2>
              <ul className="font-inter mt-4 space-y-2 text-sm text-[#5b4733]">
                {rental.included.map((i) => (
                  <li key={i} className="flex gap-3">
                    <FaCheck className="mt-1 flex-none text-[#a15f21]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            {rental.excluded.length > 0 && (
              <div>
                <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                  Not included
                </h2>
                <ul className="font-inter mt-4 space-y-2 text-sm text-[#5b4733]">
                  {rental.excluded.map((i) => (
                    <li key={i} className="flex gap-3">
                      <FaTimes className="mt-1 flex-none text-[#9a8a77]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {rental.howItWorks && rental.howItWorks.length > 0 && (
          <div>
            <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
              How renting works
            </h2>
            <ol className="mt-6 space-y-6 border-l border-[#c9a36a] pl-8">
              {rental.howItWorks.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="font-inter absolute -left-[47px] top-0 grid size-8 place-items-center rounded-full bg-[#a15f21] text-xs font-semibold text-white ring-4 ring-[#f0eee5]">
                    {i + 1}
                  </span>
                  <h3 className="font-bebas text-2xl tracking-wide text-[#2b1d10]">
                    {s.title}
                  </h3>
                  <p className="font-inter mt-1 text-sm leading-relaxed text-[#5b4733]">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          )}
        </div>

        {/* sticky booking card */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <RentalBookingCard
            title={rental.title}
            price={rental.price}
            slug={rental.slug}
            priceUnit={rental.priceUnit}
            priceLkr={rental.priceLkr ?? undefined}
          />
        </aside>
      </section>

      {/* other rentals */}
      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
          <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
            More rentals
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {others.map((r) => (
              <Link
                key={r.slug}
                href={`/rentals/${r.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e6d9bf]">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                    {r.title}
                  </h3>
                  <p className="font-inter text-sm text-[#5b4733]">
                  {r.price
                      ? `From ${r.price} / ${r.priceUnit ?? "day"}`
                      : "Price on request"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
