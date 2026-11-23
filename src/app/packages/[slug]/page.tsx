import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaSun,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { packages, getPackage } from "@/data/packages";
import ItinerarySwitch from "@/components/ItinerarySwitch";

type Props = { params: Promise<{ slug: string }> };

/* WhatsApp number: country code + number, no + and no spaces */
const WHATSAPP = "94754540123";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} — Canopy Safaris`,
    description: pkg.tagline,
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const facts = [
    { Icon: FaClock, label: "Duration", value: pkg.duration },
    { Icon: FaUsers, label: "Group size", value: pkg.groupSize },
    { Icon: FaSun, label: "Best time", value: pkg.bestTime },
  ];
  const others = packages.filter((p) => p.slug !== pkg.slug);

  return (
    <main className="bg-[#f0eee5] text-[#3d2c1b]">
      {/* hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src={pkg.img}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d10]/85 via-[#2b1d10]/30 to-[#2b1d10]/40" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-12 md:px-12">
          <span className="font-inter inline-block rounded-full bg-[#2b1d10] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white">
            {pkg.badge}
          </span>
          <h1 className="font-bebas mt-4 text-6xl uppercase leading-none tracking-wide text-white md:text-8xl">
            {pkg.title}
          </h1>
          <p className="font-caveat mt-2 text-2xl text-[#f3d9b1] md:text-3xl">
            {pkg.tagline}
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
              {pkg.overview}
            </p>
            <ul className="font-inter mt-6 flex flex-wrap gap-2">
              {pkg.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-[#c9a36a] px-3 py-1 text-sm text-[#5b4733]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <ItinerarySwitch half={pkg.itinerary} full={pkg.fullItinerary} />

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                Included
              </h2>
              <ul className="font-inter mt-4 space-y-2 text-sm text-[#5b4733]">
                {pkg.included.map((i) => (
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
                {pkg.excluded.map((i) => (
                  <li key={i} className="flex gap-3">
                    <FaTimes className="mt-1 flex-none text-[#9a8a77]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* sticky booking card */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-6 shadow-[0_30px_60px_-30px_rgba(97,61,29,.55)]">
            <p className="font-inter text-xs uppercase tracking-wider text-[#7a6550]">
              Starting at
            </p>
            <p className="font-bebas text-5xl tracking-wide text-[#2b1d10]">
              {pkg.price}
            </p>
            <p className="font-inter text-xs text-[#7a6550]">per person</p>

            <Link
             href={`/book?service=safari&type=${pkg.slug}`}
              className="font-inter mt-6 block rounded-full bg-[#a15f21] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#7d4a19]"
            >
              Book this safari
            </Link>
            <Link
              href="/#packages"
              className="font-inter mt-3 block rounded-full border border-[#c9a36a] py-3.5 text-center text-sm font-semibold text-[#5b4733] transition hover:bg-[#f0eee5]"
            >
              Compare packages
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Hi! I would like to enquire about the ${pkg.title}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter mt-4 block text-center text-sm font-medium text-[#5b4733] underline decoration-[#c9a36a] underline-offset-4 transition hover:text-[#a15f21]"
            >
              WhatsApp inquiry
            </a>
          </div>
        </aside>
      </section>

      {/* other packages */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
        <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
          More adventures
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/packages/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                  {p.title}
                </h3>
                <p className="font-inter text-sm text-[#5b4733]">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
