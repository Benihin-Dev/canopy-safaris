import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import GalleryExplorer from "@/components/GalleryExplorer";

export const metadata = { title: "Gallery — Canopy Safaris" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Through the canopy"
        sub="Pick a park on the map and see what we found there."
        img="/images/gallery/hero.jpg"
      />

      <section className="bg-[#f0eee5] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <GalleryExplorer />
          </Reveal>
        </div>
      </section>
    </>
  );
}
