"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Heading from "./Elements/Heading";

export default function WhyChooseUs() {
  const features = [
    {
      titel: "Tailor-Made Safari Expeditions",
      desc: "From luxury game drives to cultural immersions, journey is designed to match your adventurous spirit.",
      img: "/images/whyChooseUs/map.png",
    },
    {
      titel: "Safety & Expertise You Can Trust",
      desc: "Travel with confidence as our seasoned polar guides & top-tier safety protocols keep you secure,",
      img: "/images/whyChooseUs/travel.png",
    },
    {
      titel: "Unparalleled Safari Experiences",
      desc: "Gain access to remote wildlife reserves, vast savannas in Sri Lanka&apos;s iconic Big Five.",
      img: "/images/whyChooseUs/safari.png",
    },
    {
      titel: "Sustainable & Responsible Travel",
      desc: "Eco-conscious safaris ensuring minimal impact while supporting indigenous communities.",
      img: "/images/whyChooseUs/park.png",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25, 1] }, // only need the crossing point, not 101 steps
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" w-full relative overflow-hidden py-10"
    >
      <div className="w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0">
        <div className=" w-full">
          <Heading
            title="Why Choose Us"
            textColor="text-[#0e291c]"
            lineColor="from-[#0e291c]"
          />
        </div>
        <h1 className=" font-libertinus_Math text-5xl w-full text-center md:text-5xl md:w-2/3 lg:w-1/2 mx-auto pb-10 text-[#0a0e01] font-medium mt-2">
          Canofy: Your Partner for Unforgettable Memories
        </h1>
        <div className={` w-full grid grid-cols-1 lg:grid-cols-5 lg:gap-5 `}>
          <div
            className={` transition-all duration-700 ease-in-out z-20 relative   ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-1/2 opacity-0 lg:opacity-100"
            }  w-full md:col-span-2`}
          >
            <Image
              className="w-full object-cover rounded-xl relative"
              src="/images/whyChooseUs1.png"
              alt="bg image"
              width={500}
              height={10}
              priority
            />
          </div>
          <div className=" w-full md:col-span-3 grid grid-cols-1 mt-5 lg:mt-0 sm:grid-cols-2 gap-5 text-[#493726]">
            {features.map((item, i) => (
              <div
                key={i}
                className={` w-full h-full rounded-2xl relative overflow-hidden ${i > 1 ? "hidden" : ""} transition-transform duration-700 ease-in-out ${
                  isVisible
                    ? "translate-x-0"
                    : !isVisible && i === 1
                      ? "lg:translate-x-[-90%] translate-x-[-50%]"
                      : "-translate-x-1/3"
                }  `}
              >
                <div className=" w-full h-full flex flex-col justify-between p-5 relative  z-10 ">
                  <div className=" w-full">
                    <Image
                      className=" w-10 xl:w-15 2xl:w-17 aspect-square object-cover relative"
                      src={item.img}
                      alt="map image"
                      width={64}
                      height={64}
                      priority
                    />
                    <h2 className=" w-full pt-6 xl:pt-10 font-poppins font-medium text-lg xl:text-2xl lg:text-lg pr-8 2xl:pr-12 2xl:leading-10">
                      {item.titel}
                      {i}
                    </h2>
                  </div>
                  <div className=" w-full mt-5 lg:mt-0">
                    <p className=" font-poppins text-[12px] xl:text-base leading-5 xl:leading-7 2xl:leading-8">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className=" w-full h-full absolute top-0 left-0 bg-[#fef7e5]">
                  <div className=" w-full relative">
                    <div className=" w-full h-full relative translate-x-[90%] -translate-12 -rotate-20">
                      <div className=" w-1/2 aspect-square relative">
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden"></div>
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden absolute top-5 -left-5"></div>
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden absolute top-10 -left-10"></div>
                      </div>
                    </div>
                    <div className={` w-full relative   `}>
                      <Image
                        className="w-4/5 scale-125 translate-x-[-45%] object-cover rounded-xl -translate-y-1/2 lg:translate-y-0 relative rotate-120 scale-x-[-1]"
                        src="/images/whyChooseUs/paintStroke.png"
                        alt="paintStroke img"
                        width={500}
                        height={100}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full grid grid-cols-1  lg:grid-cols-5 lg:gap-5 lg:mt-5">
          <div className=" w-full md:col-span-3 grid grid-cols-1 mt-5 lg:mt-0 sm:grid-cols-2 gap-5 text-[#493726]">
            {features.map((item, i) => (
              <div
                key={i}
                className={` w-full h-full rounded-2xl relative overflow-hidden ${i < 2 ? " hidden" : ""} transition-transform duration-700 ease-in-out ${
                  isVisible
                    ? "translate-x-0"
                    : !isVisible && i === 2
                      ? "translate-x-[-90%] lg:translate-x-[70%]"
                      : "lg:translate-x-1/3 -translate-x-9/10"
                } `}
              >
                <div className=" w-full h-full flex flex-col justify-between p-5 relative  z-10 ">
                  <div className=" w-full">
                    <Image
                      className=" w-10 xl:w-15 2xl:w-17 aspect-square object-cover relative"
                      src={item.img}
                      alt="map image"
                      width={64}
                      height={64}
                      priority
                    />
                    <h2 className=" w-full pt-6 xl:pt-10 font-poppins font-medium text-lg xl:text-2xl lg:text-lg pr-8 2xl:pr-12 2xl:leading-10">
                      {item.titel}
                    </h2>
                  </div>
                  <div className=" w-full mt-5 lg:mt-0">
                    <p className=" font-poppins text-[12px] xl:text-base leading-5 xl:leading-7 2xl:leading-8">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className=" w-full h-full absolute top-0 left-0 bg-[#fef7e5]">
                  <div className=" w-full relative">
                    <div className=" w-full h-full relative translate-x-[90%] -translate-12 -rotate-20">
                      <div className=" w-1/2 aspect-square relative">
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden"></div>
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden absolute top-5 -left-5"></div>
                        <div className=" w-full aspect-square bg-[#613d1d5c] rounded-[40px] overflow-hidden absolute top-10 -left-10"></div>
                      </div>
                    </div>
                    <div className=" w-full relative">
                      <Image
                        className="w-4/5 scale-125 translate-x-[-45%] object-cover rounded-xl -translate-y-1/2 lg:translate-y-0 relative rotate-120 scale-x-[-1]"
                        src="/images/whyChooseUs/paintStroke.png"
                        alt="paintStroke img"
                        width={500}
                        height={100}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={` w-full md:col-span-2 mt-5 lg:mt-0 transition-all duration-700 ease-in-out  ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-1/2 opacity-0 lg:opacity-100"
            } `}
          >
            <Image
              className="w-full object-cover rounded-xl relative"
              src="/images/whyChooseUs2.png"
              alt="bg image"
              width={500}
              height={10}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
