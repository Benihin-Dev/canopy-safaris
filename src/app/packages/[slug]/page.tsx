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
type SafariPackage = {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  img: string;
  highlights: string[];
  duration: string;
  groupSize: string;
  bestTime: string;
  price: string;
  overview: string;
  included: string[];
  excluded: string[];
  itinerary: { time: string; title: string; text: string }[];
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";

const baseIncluded = [
  "Private open-air jeep",
  "Expert naturalist guide",
  "Park entrance fees",
  "Bottled water",
];
const baseExcluded = [
  "Personal expenses",
  "Tips & gratuities",
  "Travel insurance",
];

const packages: SafariPackage[] = [
  {
    slug: "kumana-safari",
    badge: "Wildlife Experience",
    title: "Kumana Safari",
    tagline: "Birds, elephants and quiet wetlands",
    desc: lorem,
    img: "/images/safari/kumana.jpg",
    highlights: ["Half day safari", "Full day safari"],
    duration: "Half / Full day",
    groupSize: "2 – 6 guests",
    bestTime: "Apr – Jul",
    price: "From $120",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Breakfast or packed lunch"],
    excluded: baseExcluded,
    itinerary: [
      { time: "05:30", title: "Hotel pickup", text: lorem },
      { time: "06:30", title: "Enter Kumana National Park", text: lorem },
      { time: "11:00", title: "Wetland & birdlife stop", text: lorem },
      { time: "13:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "night-safari",
    badge: "After Dark",
    title: "Night Safari",
    tagline: "The wild after sunset",
    desc: lorem,
    img: "/images/safari/night.jpg",
    highlights: ["Sunset", "Nocturnal animal"],
    duration: "Evening · 4 hrs",
    groupSize: "2 – 6 guests",
    bestTime: "All year",
    price: "From $95",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Spotlight & night-vision gear"],
    excluded: baseExcluded,
    itinerary: [
      { time: "17:00", title: "Pickup & briefing", text: lorem },
      { time: "18:00", title: "Sunset drive", text: lorem },
      { time: "19:30", title: "Nocturnal wildlife spotting", text: lorem },
      { time: "21:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "outdoor-safari",
    badge: "Outdoor Adventure",
    title: "Outdoor Safari",
    tagline: "Beyond the jeep track",
    desc: lorem,
    img: "/images/safari/outdoor.jpg",
    highlights: ["Kudumbigala", "Crocodile and elephants encounter"],
    duration: "Full day",
    groupSize: "2 – 8 guests",
    bestTime: "May – Sep",
    price: "From $150",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Lunch", "Trail guide at Kudumbigala"],
    excluded: baseExcluded,
    itinerary: [
      { time: "06:00", title: "Departure", text: lorem },
      { time: "08:00", title: "Kudumbigala trail", text: lorem },
      { time: "12:00", title: "Lunch in the wild", text: lorem },
      { time: "15:00", title: "Crocodile & elephant encounter", text: lorem },
    ],
  },
  {
    slug: "tailor-made",
    badge: "Made For You",
    title: "Tailor Made",
    tagline: "Your safari, designed around you",
    desc: lorem,
    img: "/images/safari/tailor-made.jpg",
    highlights: [
      "Morning or evening",
      "Meals package",
      "Destinations",
      "Buffer zone dinner",
      "Under bonfire dinner",
    ],
    duration: "Flexible",
    groupSize: "Any size",
    bestTime: "All year",
    price: "On request",
    overview: lorem + " " + lorem,
    included: [
      ...baseIncluded,
      "Custom meals package",
      "Choice of destinations",
    ],
    excluded: baseExcluded,
    itinerary: [
      { time: "Step 1", title: "Tell us your plan", text: lorem },
      { time: "Step 2", title: "We design the route", text: lorem },
      { time: "Step 3", title: "Confirm & enjoy", text: lorem },
    ],
  },
];

const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

type Props = { params: Promise<{ slug: string }> };

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
            <p className="font-inter mt-4 leading-relaxed text-[#5b4733]">
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

          <div>
            <h2 className="font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
              Sample itinerary
            </h2>
            <ol className="mt-6 space-y-6 border-l border-[#c9a36a] pl-8">
              {pkg.itinerary.map((s) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-[#a15f21] ring-4 ring-[#f0eee5]" />
                  <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#a15f21]">
                    {s.time}
                  </p>
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
              href={`/contact?package=${pkg.slug}`}
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
