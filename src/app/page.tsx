import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Rental from "@/components/Rental";
import Testimonial from "@/components/Testimonial";
import WhoWeAre from "@/components/WhoWeAre";
import SafariPackages from "@/components/SafariPackages";
import ScrollBanner from "@/components/ScrollBanner";

export default function Home() {
  return (
    <div className=" w-full bg-white font-sans border-black border-b">
      <main className="w-full">
        <NavBar />
        <Hero />
        <FAQ />
        <About />
        <SafariPackages />
        <ScrollBanner />
        <Rental />
        <Gallery />
        <WhoWeAre />
        <Testimonial />
        <Footer />
      </main>
    </div>
  );
}
