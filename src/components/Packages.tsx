import React from "react";
import Heading from "./Elements/Heading";
import PricingCard from "./Elements/PricingCard";
import SliderForPackages from "./Elements/SliderForPackages";

export default function Packages() {
  return (
    <section className=" w-full relative overfl ow-hidden bg-[#f0eee5]">
      <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 pt-20 pb-24">
        <div className=" w-full">
          <Heading
            title="Packages"
            textColor="text-[#0e291c]"
            lineColor="from-[#0e291c]"
          />
        </div>
        <h1 className=" font-libertinus_Math text-5xl w-full text-center md:text-5xl xl:text-6xl mx-auto pb-1 text-[#0a0e01] font-medium mt-2">
          Popular Safaris & Tours
        </h1>
        <h2 className=" w-1/2 mx-auto text-sm font-poppins font-mediu m text-center ">
          Handpicked journeys that bring you closer to Sri Lanka's untamed
          beauty
        </h2>
        <div className=" w-full gap-5 mt-10 ">
          <div className=" w-full hidden lg:block">
            <SliderForPackages viewPort="desktop" />
          </div>
          <div className=" w-full hidden  lg:hidden md:block">
            <SliderForPackages viewPort="tablet" />
          </div>
          <div className=" w-full md:hidden block">
            <SliderForPackages viewPort="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
