"use client";
import React from "react";
import { GiJeep } from "react-icons/gi";
import { PiMedalThin, PiUser, PiShieldCheckThin } from "react-icons/pi";
import YellowBtn from "./Elements/YellowBtn";
import Image from "next/image";

export default function Hero() {
  const safariHighlights = [
    {
      name: "Safety & Wildlife Tracking Record",
      icon: <PiShieldCheckThin className=" size-5 text-white" />,
    },
    {
      name: "5+ Years of Experience",
      icon: <PiMedalThin className=" size-5 text-white" />,
    },
    {
      name: "Local Guides & Authentic Experience",
      icon: <PiUser className=" size-5 text-white" />,
    },
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
    <section className=" w-full overflow-hidden relative">
      <div className="relative w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 py-32 md:pb-10 sm:pt-28  z-20">
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
        <div className=" w-full h-20 mt-20 md:flex md:items-center md:justify-between gap-10">
          {safariHighlights.map((item, i) => (
            <div
              key={i}
              className=" flex items-center md:justify-center gap-2 font-poppins text-xs"
            >
              <div className=" p-1.5 bg-gray-100/20 backdrop-blur-2xl  rounded-full">
                {item.icon}
              </div>
              <p className=" text-white">{item.name}</p>
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
        />
      </div>
      
    </section>
  );
}
