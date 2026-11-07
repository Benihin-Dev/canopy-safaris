import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Packages from "@/components/Packages";
import Testimonial from "@/components/Testimonial";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className=" w-full bg-white font-sans border-black border-b">
      <main className="w-full">
        <NavBar />
        <Hero />
        <FAQ />
        <About />
        <WhyChooseUs />
        <Packages />
        <Gallery />
        <WhoWeAre />
        <Testimonial />
        <Footer />
      </main>
    </div>
  );
}
