import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { rentals, getRental } from "@/data/rentals";

export function generateStaticParams() {
  return rentals.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getRental(slug);
  return { title: r ? `${r.title} — Canopy Rentals` : "Rental" };
}

export default async function RentalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rental = getRental(slug);
  if (!rental) notFound();

  const others = rentals.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={rental.badge}
        title={rental.title}
        sub={rental.sub}
        img={rental.img}
      />

      <section className="bg-[#f0eee5] py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-[1.2fr_1fr]">
          <Link
            href="/rentals"
            className="mb-8 inline-block font-inter text-sm text-[#a15f21] hover:underline"
          >
            ← All rentals
          </Link>
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-[#c9a36a] bg-[#e6d9bf]">
              <Image
                src={rental.img}
                alt={rental.title}
                fill
                sizes="(max-width:1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border border-[#c9a36a] bg-[#fffaf2] p-8">
              <p className="font-inter text-[#3d2c1b]">{rental.overview}</p>

              {rental.specs.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  {rental.specs.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-[#f0eee5] p-4">
                      <dt className="font-inter text-xs uppercase tracking-widest text-[#7a6550]">
                        {s.label}
                      </dt>
                      <dd className="mt-1 font-bebas text-2xl tracking-wide text-[#2b1d10]">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="mt-6 flex flex-wrap gap-2">
                {rental.included.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-[#c9a36a] px-3 py-1 font-inter text-xs text-[#5b4733]"
                  >
                    ✓ {i}
                  </li>
                ))}
              </ul>
              {rental.excluded.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {rental.excluded.map((x) => (
                    <li
                      key={x}
                      className="rounded-full border border-[#c9a36a]/60 px-3 py-1 font-inter text-xs text-[#7a6550]"
                    >
                      ✕ {x}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex items-center justify-between">
                <span className="font-inter text-[#5b4733]">
                  <b className="text-3xl text-[#a15f21]">{rental.price}</b> /
                  day
                </span>
                <Link
                  href="/#contact"
                  className="rounded-full bg-[#a15f21] px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-[#7d4a19]"
                >
                  {rental.cta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-20 max-w-6xl px-6 md:px-12">
            <Reveal>
              <h2 className="mb-8 font-bebas text-4xl uppercase tracking-wide text-[#2b1d10]">
                More rentals
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {others.map((r, i) => (
                <Reveal key={r.slug} delay={i * 100}>
                  <Link
                    href={`/rentals/${r.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-[#c9a36a] bg-[#fffaf2] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={r.img}
                        alt={r.title}
                        fill
                        sizes="320px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <p className="p-4 font-bebas text-2xl uppercase tracking-wide text-[#2b1d10]">
                      {r.title}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
