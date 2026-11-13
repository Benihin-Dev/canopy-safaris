"use client";
import React, { useState } from "react";
import {
  PiJeep,
  PiJeepThin,
  PiScooter,
  PiScooterThin,
  PiMapPinLine,
  PiPhone,
  PiPlayFill,
} from "react-icons/pi";
import YellowBtn from "./Elements/YellowBtn";
import VideoFrame from "./Elements/VideoFrame";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["500", "600"] });

export default function About() {
  const services = [
    {
      title: "Safari Jeep Tours",
      text: "Kumana and Yala safaris with experienced drivers and wildlife guides.",
      icon: <PiJeepThin className="size-11 text-canopy-line" />,
    },
    {
      title: "Scooter Rentals",
      text: "Rent a scooter and explore Sri Lanka at your own pace.",
      icon: <PiScooterThin className="size-11 text-canopy-line" />,
    },
  ];

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#e7e7db] pb-20 pt-10  lg:pt-16  lg:pb-28"
    >
      <div className="mx-auto grid w-full items-center gap-16 px-5 sm:w-11/12 sm:px-0 lg:max-w-350 lg:grid-cols-2 lg:gap-10">
        {/* Left: video space with floating cards */}
        <div className="relative mx-auto w-full max-w-md px-4 sm:px-0">
          {/* dashed arch behind the video */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-4xl border-2 border-dashed border-canopy-line/50"></div>

          <div className=" w-full aspect-square flex items-center justify-center">
            <Image
              src="/images/aboutImg.png"
              className=" w-full object-cover z-20"
              width={400}
              height={100}
              alt=""
            />
          </div>
          {/* jeep img */}
          <div className=" absolute top-[50%] right-0 w-50 aspect-squarer z-30">
            <Image
              src="/images/jeepImg.png"
              className=" w-full object-cover translate-x-5 scale-x-[-1] z-20"
              width={400}
              height={100}
              alt=""
            />
          </div>

          {/* Play Btn */}
          <div className=" absolute w-full h-full top-0 left-0 z-30">
            <div className=" w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#ffcd09] text-black shadow-lg transition-transform duration-300 hover:scale-110"
              >
                <PiPlayFill className="size-8" />
              </button>
            </div>
          </div>

          {/* floating card: jeep */}
          <div className="absolute z-30 bottom-10 -left-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-10">
            <div className="rounded-full bg-[#ffcd09] p-2">
              <PiJeep className="size-6" />
            </div>
            <div className="font-poppins">
              <p className="text-sm font-semibold">Safari Jeep</p>
              <p className="text-xs text-ink/60">Kumana &amp; Yala</p>
            </div>
          </div>

          {/* floating card: scooter */}
          <div className="absolute z-30 top-24 -right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-10">
            <div className="rounded-full bg-canopy-deep p-2 text-white">
              <PiScooter className="size-6" />
            </div>
            <div className="font-poppins">
              <p className="text-sm font-semibold">Scooter Rent</p>
              <p className="text-xs text-ink/60">Ride your way</p>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="w-full lg:pl-10">
<p className={`${dancing.className} text-[28px] italic text-canopy-line md:text-[34px]`}>
  Adventure Awaits
</p>
          <h2 className="mt-2 font-libertinus_Math text-4xl leading-tight text-canopy-deep md:text-5xl">
            Sri Lanka&apos;s Wild Side, by{" "}
            <span className="font-caveat text-5xl text-clay md:text-6xl">
              Safari Jeep
            </span>{" "}
            &amp; Scooter
          </h2>
          <p className="mt-6 max-w-xl font-poppins text-sm leading-7 text-ink/70">
           Welcome to The Canofy, your gateway to exploring the natural beauty of Sri Lanka. 
            From unforgettable wildlife adventures in Kumana National Park to the freedom of exploring the coastline 
            and surrounding destinations by scooter, we bring together authentic experiences, local knowledge and genuine hospitality. 
            Whether you're discovering the wilderness on a safari jeep or travelling at your own pace on two wheels, 
            we're here to make your journey memorable.
          </p>

          <div className="mt-8 grid max-w-xl gap-8 sm:grid-cols-2">
            {services.map((item, i) => (
              <div key={i}>
                {item.icon}
                <h3 className="mt-3 font-poppins text-base font-semibold text-canopy-deep">
                  {item.title}
                </h3>
                <p className="mt-1 font-poppins text-sm leading-6 text-ink/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <YellowBtn text="More About Us" btnHeight="py-3" />
            <a
              href="tel:+94754540123"
              className="flex items-center gap-2 font-poppins text-sm font-medium text-canopy-deep"
            >
              <PiPhone className="size-5" />
              +94 754540123
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 font-poppins text-sm font-semibold text-canopy-line">
            <PiMapPinLine className="size-6" />
            Kumana, Yala and more of Sri Lanka&apos;s wild places.
          </div>
        </div>
      </div>
      <VideoFrame
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        url="https://www.youtube.com/watch?v=n4xzVr6nRTI&pp=ygULc2FmYXJpIHJpZGU%3D"
        title="Canopy Safaris"
      />
    </section>
  );
}
