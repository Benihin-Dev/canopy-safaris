"use client";
import React from "react";
import { GiJeep } from "react-icons/gi";
import YellowBtn from "./Elements/YellowBtn";
import Image from "next/image";

export default function Hero() {
const safariStats = [
  { value: "98%", label: "Guest Satisfaction" },
  { value: "15+", label: "Years Of Experience" },
  { value: "1,000+", label: "Safari Tours" },
  { value: "90%", label: "Leopard Sighting" },
];
  const sentences = [
    "An Exclusive Luxury Safari Experience.",
    "Seamless Comfort, Calm, and Curated Adventure.",
    "Escape the Noise and Reconnect with Nature. ",
    "An Exclusive Luxury Safari Experience.",
    "Seamless Comfort, Calm, and Curated Adventure.",
    "Escape the Noise and Reconnect with Nature. ",
  ];
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="relative z-20 mx-auto w-full px-5 pt-32 pb-44 sm:w-11/12 sm:px-0 lg:max-w-350">
        <div className=" w-full flex items-center sm:items-start">
          <div className=" w-full sm:w-8/12 md:w-7/12 lg:w-full lg:max-w-130 xl:max-w-170">
            <div className=" w-full flex items-center justify-center gap-5 font-poppins">
              <div className=" w-12 h-0.5 rounded-r-4xl bg-linear-to-l from-[#0e291c] to-transparent"></div>
              <p className=" uppercase text-sm text-center sm:text-base text-white">
                Exclusive adventures in the wild
              </p>
              <div className=" w-12  h-0.5 rounded-l-4xl bg-linear-to-r from-[#0e291c] to-transparent"></div>
            </div>
            <h1 className=" pt-4 text-7xl md:text-5xl xl:text-5xl xl:scale-y-150 py-10 md:translate-y-1/7 xl:translate-y-1/5 text-center text-white font-bold md:text-left font-serif">
              Your Next Great Safari Await With{" "}
              <span className="  ">The Canofy</span>
            </h1>
            <div className="relative w-full overflow-hidden mt-4 font-sans font-thin text-sm">
              <div className="marquee flex w-max">
                {sentences.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center text-[#ffffff] whitespace-nowrap"
                  >
                    {skill}
                    <GiJeep className={` size-6 mx-5 scale-x-[-1]`} />
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full flex items-center justify-center md:justify-start gap-2 mt-5">
              <YellowBtn text="Plan Your Safari" />
              <button className=" px-5 py-1.5 text-xs font-semibold border border-gray-50 text-gray-50 cursor-pointer rounded-full hover:bg-[#e3b600] duration-300 transition-all">
                Explore Tours
              </button>
            </div>
          </div>
        </div>
<div className="mt-16 grid w-full grid-cols-2 overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl md:grid-cols-4">
  {safariStats.map((item, i) => (
    <div
      key={i}
      className={`px-6 py-5 font-poppins text-white border-white/20
        ${i % 2 !== 0 ? "border-l" : ""}
        ${i >= 2 ? "border-t md:border-t-0" : ""}
        ${i !== 0 ? "md:border-l" : ""}`}
    >
      <p className="font-serif text-3xl font-semibold">{item.value}</p>
      <p className="mt-1 text-xs text-white/80">{item.label}</p>
    </div>
  ))}
</div>
      </div>
      <div className=" w-full z-30 pointer-events-none absolute bottom-0 left-0 scale-y-50 md:scale-y-80 translate-y-1/4 md:translate-y-1/8">
        <div className=" w-full flex items-center ">
          <Image
            className=" w-full md:w-1/3 object-contain"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain scale-x-[-1] -translate-x-20"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain -translate-x-24"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain scale-x-[-1] -translate-x-32"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
        </div>
      </div>
      <div className=" absolute w-full  h-full top-0 left-0 z-0">
        <Image
          className="object-cover brightness-75 bg-gray-800"
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>      
    </section>
  );
}

