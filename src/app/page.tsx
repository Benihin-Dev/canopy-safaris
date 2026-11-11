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
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full font-sans">
      <main className="w-full">
        <NavBar />
        <Hero />
        {/* <FAQ /> */}
        <About />
        <SafariPackages />
        <ScrollBanner />
        <Rental />
        <Gallery />
        <WhoWeAre />
        <Testimonial />
        <Footer />
        <div className=" w-full h-full fixed top-0 left-0 -z-10">
          <Image
            className="object-cover"
            src="/images/fixedBg.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
      </main>
    </div>
  );
}
