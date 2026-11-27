import About from "@/components/About";
// import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Rental from "@/components/Rental";
import Testimonial from "@/components/Testimonial";
import WhoWeAre from "@/components/WhoWeAre";
import SafariPackages from "@/components/SafariPackages";
import ScrollBanner from "@/components/ScrollBanner";
import type { CSSProperties } from "react";

/* ONE background for About + Safari Packages, wave-shaped at the top */
const WAVE_PATH =
  "M0,64L24,90.7C48,117,96,171,144,165.3C192,160,240,96,288,101.3C336,107,384,181,432,224C480,267,528,277,576,240C624,203,672,117,720,80C768,43,816,53,864,74.7C912,96,960,128,1008,154.7C1056,181,1104,203,1152,224C1200,245,1248,267,1296,240C1344,213,1392,139,1416,101.3L1440,64L1440,320L0,320Z";
const WAVE_SVG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'><path d='${WAVE_PATH}'/></svg>`
)}")`;
const WAVE_MASK = {
  maskImage: `${WAVE_SVG}, linear-gradient(#000,#000)`,
  WebkitMaskImage: `${WAVE_SVG}, linear-gradient(#000,#000)`,
  maskSize: "100% var(--wave), 100% calc(100% - var(--wave) + 1px)",
  WebkitMaskSize: "100% var(--wave), 100% calc(100% - var(--wave) + 1px)",
  maskPosition: "top, bottom",
  WebkitMaskPosition: "top, bottom",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as CSSProperties;

export default function Home() {
  return (
    <div className="w-full font-sans">
      <Hero />
      <div
        className="relative z-40"
        style={
          {
            "--wave": "clamp(60px, 9vw, 140px)",
            marginTop: "calc(var(--wave) * -0.83)",
            paddingTop: "var(--wave)",
          } as CSSProperties
        }
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(700px circle at 8% 6%, rgba(217,130,43,.16), transparent 60%), radial-gradient(800px circle at 95% 50%, rgba(161,95,33,.12), transparent 60%), radial-gradient(700px circle at 8% 96%, rgba(217,130,43,.16), transparent 60%), linear-gradient(180deg, #F4EBDD 0%, #f0eee5 100%)",
            ...WAVE_MASK,
          }}
        />
        <About />
        <SafariPackages />
      </div>
      <ScrollBanner />
      <Rental />
      <Gallery />
      <WhoWeAre />
      <Testimonial />
    </div>
  );
}
