import Image from "next/image";
import Link from "next/link";
import {
  IoArrowForward,
  IoCalendarOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { packages } from "@/data/packages";

export const metadata = { title: "Safari Packages — Canopy Safaris" };

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Safari"
        title="Choose your wild adventure"
        sub="Curated jeep safaris across Sri Lanka's most iconic parks."
      />

      <section className="bg-[#f0eee5] py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-12">
          {packages.map((p, i) => {
            const meta = [
              { Icon: IoTimeOutline, label: "Duration", value: p.duration },
              { Icon: IoPeopleOutline, label: "Group", value: p.groupSize },
              {
                Icon: IoCalendarOutline,
                label: "Best time",
                value: p.bestTime,
              },
            ];

            return (
              <Reveal key={p.slug}>
                <article
                  className={`group grid overflow-hidden rounded-[32px] border border-[#c9a36a] bg-[#fffaf2] shadow-[0_30px_60px_-35px_rgba(97,61,29,.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-30px_rgba(97,61,29,.65)] md:grid-cols-[1fr_1.15fr] ${
                    i % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative min-h-64 overflow-hidden bg-[#e6d9bf] md:min-h-96">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 520px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#2b1d10] px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-widest text-white">
                      {p.badge}
                    </span>
                    <span className="absolute bottom-3 left-5 font-bebas text-7xl leading-none text-white/80 md:text-8xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <span className="font-caveat text-xl text-[#a15f21]">
                      {p.tagline}
                    </span>
                    <h3 className="font-bebas text-5xl uppercase leading-none tracking-wide text-[#2b1d10] md:text-6xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 font-inter text-sm leading-6 text-[#3d2c1b]">
                      {p.desc}
                    </p>

                    {/* Meta */}
                    <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-[#c9a36a]/50 py-4">
                      {meta.map(({ Icon, label, value }) => (
                        <div key={label} className="min-w-0">
                          <dt className="flex items-center gap-1.5 font-inter text-[10px] uppercase tracking-widest text-[#7a6550]">
                            <Icon className="size-4 text-[#a15f21]" />
                            {label}
                          </dt>
                          <dd className="mt-1 truncate font-inter text-sm font-semibold text-[#2b1d10]">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Highlights */}
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-[#c9a36a] px-2.5 py-1 font-inter text-xs text-[#5b4733]"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="mt-7 flex items-center justify-between gap-4">
                      <span className="font-bebas text-3xl tracking-wide text-[#a15f21]">
                        {p.price}
                      </span>
                      <Link
                        href={`/packages/${p.slug}`}
                        className="inline-flex items-center gap-3 rounded-full bg-[#a15f21] py-2 pl-6 pr-2 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#7d4a19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a15f21]"
                      >
                        View details
                        <span className="grid size-9 place-items-center rounded-full bg-white text-[#a15f21] transition-transform duration-300 group-hover:translate-x-1">
                          <IoArrowForward className="size-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
