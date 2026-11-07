import React from "react";
import Heading from "./Elements/Heading";
import Image from "next/image";
import Divider from "./Elements/Divider";

export default function About() {
  return (
    <section className=" w-full relative overflow-hidden pt-16">
      <div className=" w-full relative -translate-y-16 translate-x-10 rotate-180 z-10">
        <Divider />
      </div>
      <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 lg:flex items-center justify-center gap-5 relative z-10">
        <div className=" w-full lg:w-7/12 xl:w-1/2 lg:pr-10">
          <div className=" lg:w-fit">
            <Heading
              title="About"
              textColor="text-[#000000]"
              lineColor="from-[#000000]"
            />
          </div>
          <h1 className=" font-libertinus_Math  text-5xl w-full text-center lg:text-left md:text-4xl  font-medium mt-2">
            The Canofy Safari
          </h1>

          <div className=" w-full flex items-center justif y-center gap-2 my-5">
            <div className=" h-10 border border-red-400 hidden lg:block"></div>
            <h2 className=" w-1/2 mx-auto lg:mx-0 text-black lg:w-2/3 font-poppins font-medium text-center lg:text-left">
              Rooted in Sri Lanka's wilderness, crafted for your next adventure.
            </h2>
          </div>
          <div className=" w-20 border border-red-400 lg:hidden mx-auto -translate-y-3 block"></div>
          <p className=" font-poppins  text-xs leading-4.5 lg:text-justify text-center">
            Welcome to The Canofy, where nature, adventure, and heartfelt
            hospitality come together to create unforgettable safari and camping
            experiences in Sri Lanka. We specialize in Kumana and Yala National
            Park safaris and mobile camping experiences. Our experienced drivers
            and knowledgeable wildlife guides bring first-hand knowledge of the
            landscapes, wildlife, and local ecosystems we explore.
          </p>
          <p className=" font-poppins text-xs leading-4 text-center lg:text-justify mt-3">
            Our goal is not simply to show you wildlife, but to help you truly
            experience Sri Lanka&apos;s wilderness—the early morning calls of
            birds, the thrill of spotting elephants and leopards, and the
            peaceful moments under the open sky at camp. Every safari and
            camping night is thoughtfully designed to combine comfort,
            adventure, and discovery. Choose The Canofy, and journey with us
            into the heart of Sri Lanka&apos;s wild beauty.
          </p>
        </div>
        <div className=" w-full lg:w-5/12 xl:w-1/2  ">
          <div className=" w-full aspect-square rounded-full lg:-translate-y-1/12  xl:-translate-y-1/10  scale-75 lg:scale-105 xl:scale-85 flex items-center justify-center relative overflow-hidden">
            <div
              className="w-11/12 absolute z-10 aspect-square rounded-full flex items-center justify-center"
              style={{
                background: `repeating-conic-gradient(
      white 2deg 6deg,
      transparent 6deg 14deg
    )`,
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 5px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
              }}
            ></div>
            <div className="  w-[87%] border-8 border-dotted border-white aspect-square rounded-full flex items-center justify-center relative z-10">
              <div className="  w-[98%] border-8 border-dotted border-white aspect-square rounded-full flex items-center justify-center">
                <div className="  w-[87%] border-8 border-dotted border-white aspect-square rounded-full flex items-center justify-center">
                  <div className="  w-[98%] border-8 border-dotted border-white aspect-square rounded-full flex items-center justify-center"></div>
                </div>
              </div>
            </div>
            <div className=" absolute top-0 left-0 w-full h-full ">
              <Image
                className="object-cover"
                src="/images/aboutRound.png"
                alt="bg image"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full absolute top-0 left-0 h-full z-0">
        <div className=" w-full relative h-full scale-x-[-1] xl:-translate-y-10">
          <Image
            className="object-cover"
            src="/images/aboutBG1.png"
            alt="bg image"
            fill
            priority
          />
          <div className=" w-full h-full absolute top-0 left-0 bg-[#c5b49c77]"></div>
          {/* <div className=" w-full h-full absolute top-0 left-0 bg-[#ffe77da7]"></div> */}
        </div>
      </div>
      <div className=" w-full relative  xl:-translate-y-10">
        <Divider />
      </div>
    </section>
  );
}
