import React from "react";
import Heading from "./Elements/Heading";
import SliderForTestimonial from "./Elements/SliderForTestimonial";
import YellowBtn from "./Elements/YellowBtn";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className=" w-full relative overflow-hidden">
      <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 pt-20">
        <div className=" w-full">
          <Heading
            title="Testimonials"
            textColor="text-[#0e291c]"
            lineColor="from-[#0e291c]"
          />
        </div>
        <h1 className=" font-libertinus_Math text-5xl w-full text-center md:text-5xl xl:text-6xl mx-auto pb-1 text-[#0a0e01] font-medium mt-2">
          What Our Guests Say
        </h1>
        <h2 className=" w-1/2 mx-auto text-sm font-poppins font-mediu m text-center ">
          Real stories from travelers who explored with Canopy Safaris
        </h2>
        <div className=" h-10 bg-linear-to-b  from-white translate-y-full relative z-20 to-transparent w-full "></div>
        <div className=" w-full hidden lg:block">
          <SliderForTestimonial viewPort="desktop" />
        </div>
        <div className=" w-full hidden sm:block lg:hidden">
          <SliderForTestimonial viewPort="tablet" />
        </div>
        <div className=" w-full sm:hidden">
          <SliderForTestimonial viewPort="mobile" />
        </div>
        <div className=" h-10 bg-linear-to-t  from-[white] -translate-y-full relative z-20 to-transparent w-full  "></div>
      </div>
      <div className=" w-full relative overflow-hidden">
        <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 py-32 xl:py-52 relative z-10">
          <h1 className=" font-libertinus_Math text-5xl w-full text-center md:text-left md:text-5xl xl:text-6xl 2xl:text-7xl mx-auto pb-1 text-[#eff1eb] font-medium mt-2">
            Ready to Begin Your Safari Adventure?.
          </h1>
          <h2 className=" w-full mx-auto text-[#eff1eb] text-sm font-poppins xl:text-base 2xl:text-lg text-center md:text-left mt-3 mb-5 ">
            Tell us your drearn safari, we'll make it real.
          </h2>
          <div className=" w-full flex items-center justify-center md:justify-start">
            <YellowBtn text="Plan Your Safari Now" />
          </div>
        </div>
        <div className=" absolute top-0 left-0 w-full h-full">
          <div className="relative w-full h-full">
            <Image
              className="object-cover object-center"
              src="/images/testimonial/border1.jpg"
              alt="bg image"
              fill
              priority
            />
          </div>
        </div>
        <div className=" absolute top-0 left-0 z-20 w-full h-20 bg-linear-to-b  from-[white] to-transparent"></div>
        <div className=" absolute bottom-0 left-0 z-20 w-full h-40 bg-linear-to-t  from-[#613d1d] to-transparent"></div>
      </div>
    </section>
  );
}
