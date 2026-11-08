"use client";
import React, { useEffect, useState } from "react";
import { Playfair_Display, DM_Sans, Cinzel } from "next/font/google";
import YellowBtn from "./Elements/YellowBtn";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export default function Hero() {
const safariStats = [
  { value: "98%", label: "Guest Satisfaction" },
  { value: "15+", label: "Years Of Experience" },
  { value: "1,000+", label: "Safari Tours" },
  { value: "90%", label: "Leopard Sighting" },
];
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const full = "Into the Wild.";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i = reduce ? full.length : i + 1;
        setTyped(full.slice(0, i));
        if (i >= full.length) clearInterval(timer);
      }, 90);
    }, 500);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, []);
  
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="relative z-20 mx-auto w-full px-5 pt-32 pb-44 sm:w-11/12 sm:px-0 lg:max-w-350">
        <div className=" w-full flex items-center sm:items-start">
          
          <div className="w-full text-center sm:w-10/12 md:text-left lg:max-w-170 xl:max-w-190">
            {/* 01 Small top heading */}
            <p
              className={`${dmSans.className} text-[11px] font-semibold uppercase tracking-[3px] text-[#D6B47B] sm:text-[13px]`}
            >
              Exclusive adventures in the wild
            </p>

            {/* 02 + 03 Main heading */}
            <h1
              className={`${playfair.className} mt-5 font-medium leading-[1.1]`}
            >
              <span className="block text-[40px] text-[#F7F3E9] sm:text-5xl md:text-[52px] lg:text-[64px]">
                Beyond the Ordinary.
              </span>
              <span className="sr-only">Into the Wild.</span>
              <span
                aria-hidden="true"
                className="relative mt-1 inline-block text-[44px] italic text-[#D6B47B] sm:text-[54px] md:text-[58px] lg:text-[72px]"
              >
                <span className="invisible">Into the Wild.</span>
                <span className="absolute left-0 top-0 whitespace-nowrap">
                  {typed}
                  <span className="typing-cursor" />
                </span>
              </span>
            </h1>

            {/* 05 Description */}
            <p
              className={`${dmSans.className} mx-auto mt-3 max-w-xl text-[15px] font-normal leading-[1.7] text-[#D5DCD4] sm:text-[17px] md:mx-0`}
            >
              Experience exclusive safari journeys through Kumana with knowledgeable local guides. 
              Explore the wilderness, encounter remarkable wildlife and discover the natural beauty of Sri Lanka, 
              from majestic elephants to elusive leopards and sloth bears.
            </p>

            {/* Buttons (unchanged, just more spacing) */}
            <div className="mt-8 flex w-full items-center justify-center gap-2 md:justify-start">
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
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
      </div>      
    </section>
  );
}
