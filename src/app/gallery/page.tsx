import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Gallery — Canopy Safaris" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the wild"
        sub="Wildlife, landscapes and journeys captured on our safaris."
        img="/images/gallery/hero.jpg"
      />

      <section className="bg-[#f0eee5] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <GalleryGrid />
          </Reveal>
        </div>
      </section>
    </>
  );
}
