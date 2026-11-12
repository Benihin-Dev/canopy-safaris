import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { rentals } from "@/data/rentals";

export const metadata = { title: "Scooter Rentals — Canopy Safaris" };

export default function RentalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rentals"
        title="Scooter rentals"
        sub="Explore the coast and countryside at your own pace."
        img="/images/rentals/hero.jpg"
      />

      <section className="bg-[#f0eee5] py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
          {rentals.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 3) * 120}>
              <Link
                href={`/rentals/${r.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[#c9a36a] bg-[#fffaf2] shadow-[0_25px_50px_-30px_rgba(97,61,29,.55)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#e6d9bf]">
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    sizes="(max-width:640px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#2b1d10] px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-widest text-white">
                    {r.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bebas text-3xl uppercase tracking-wide text-[#2b1d10]">
                    {r.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-inter text-sm text-[#3d2c1b]">
                    {r.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#c9a36a]/50 pt-4">
                    <span className="font-inter text-sm text-[#5b4733]">
                      <b className="text-xl text-[#a15f21]">${r.price}</b> / day
                    </span>
                    <span className="font-inter text-sm font-semibold text-[#a15f21] transition-transform duration-300 group-hover:translate-x-1">
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
