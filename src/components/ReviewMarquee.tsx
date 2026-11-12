import Image from "next/image";
import Stars from "./Stars";
import type { Review } from "@/data/reviews";

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  // repeat until the half is wide enough, then double it for a seamless loop
  const half = Array.from(
    { length: Math.max(1, Math.ceil(6 / items.length)) },
    () => items,
  ).flat();
  const track = [...half, ...half];

  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {track.map((r, i) => (
          <figure
            key={`${r.id}-${i}`}
            className="w-80 shrink-0 rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur"
          >
            <Stars n={r.rating} className="size-3.5" />
            <p className="mt-3 line-clamp-3 font-inter text-sm leading-6 text-stone-300">
              &quot;{r.text}&quot;
            </p>
            <figcaption className="mt-4 flex items-center gap-3">
              <Image
                src={r.photo}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full border border-[#f59e0b] object-cover"
              />
              <span className="font-bebas text-lg uppercase tracking-widest text-white">
                {r.name}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ReviewMarquee({ reviews }: { reviews: Review[] }) {
  const mid = Math.ceil(reviews.length / 2);
  const a = reviews.slice(0, mid);
  const b = reviews.slice(mid).length ? reviews.slice(mid) : a;

  return (
    <div aria-hidden className="flex flex-col gap-5">
      <Row items={a} />
      <Row items={b} reverse />
    </div>
  );
}
