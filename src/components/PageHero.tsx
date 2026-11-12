import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  sub,
  img = "/images/safari/hero.jpg",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  img?: string;
}) {
  return (
    <section className="relative flex h-[55vh] min-h-95 w-full items-end overflow-hidden text-white">
      <Image
        src={img}
        alt=""
        fill
        priority
        sizes="100vw"
        className="animate-zoom-slow object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-black/40" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 md:px-12">
        <span className="animate-fade-up font-caveat text-2xl text-[#e8b873]">
          {eyebrow}
        </span>
        <h1 className="animate-fade-up font-bebas text-5xl uppercase tracking-wide [animation-delay:.15s] md:text-7xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-3 max-w-xl animate-fade-up font-inter text-white/85 [animation-delay:.3s]">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
