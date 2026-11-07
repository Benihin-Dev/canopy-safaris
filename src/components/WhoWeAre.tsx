import React from "react";
import Image from "next/image";
import { BsSuitcaseFill } from "react-icons/bs";
import { FaMapSigns } from "react-icons/fa";
import { GiJeep } from "react-icons/gi";
import { TbCertificate2 } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";

export default function WhoWeAre() {
  const features = [
    {
      title: "Premium Locations",
      description:
        "Explore Yala, Kumana, Udawalawe, Bundala, and Wilpattu—Sri Lanka's most iconic and diverse safari parks.",
      icon: FaMapSigns,
    },
    {
      title: "Customized Jeeps",
      description:
        "Comfortable open-air jeeps designed for safe, smooth, and immersive wildlife viewing experiences.",
      icon: GiJeep,
    },
    {
      title: "Ethical Operations",
      description:
        "Eco-friendly safaris designed to minimize environmental impact and ensure utmost respect for wildlife.",
      icon: BsSuitcaseFill,
    },
    {
      title: "Expert Naturalists",
      description:
        "Experienced naturalists with deep field knowledge, guiding you through every safari journey.",
      icon: TbCertificate2,
    },
  ];
  return (
    <section className=" w-full relative overflow-hidden py-20">
      <div className=" w-full sm:w-11/12 mx-auto px-5 lg:max-w-350 sm:px-0 lg:flex items-center justify-center relative z-10">
        <div className=" w-full h-full lg:w-3/8">
          <div className=" w-2/3 2xl:w-1/2 mx-auto lg:mx-0 lg 2xl:ml-24 relative flex items-center justify-center -translate-x-5 lg:translate-x-0 pb-20 lg:pb-0">
            <Image
              className="w-full object-contain rounded-3xl relative z-10"
              src="/images/why-choose-one-1.webp"
              alt="bg image"
              width={500}
              height={100}
              priority
            />
            <div className="absolute -top-5.5 w-9/10 h-8/10 lg:h-9/10 left-14 border border-dashed rounded-2xl border-[#1bbc9b]  "></div>
            <div className="w-25 aspect-square rounded-full bg-[#f0f0f0] absolute bottom-0 right-0 translate-x-1/4 -translate-y-3/4 lg:translate-y-2 z-10 flex items-center justify-center">
              <div className="w-18 relative bg-[#1bbc9b] aspect-square rounded-full flex items-center justify-center cursor-pointer overflow-hidden group">
                {/* Arrow 1 - visible by default, slides up on hover */}
                <IoArrowBackOutline
                  className="text-white rotate-135 size-10 absolute
                 translate-y-0 group-hover:-translate-y-30
                 group-hover:transition-transform group-hover:duration-400"
                />

                {/* Arrow 2 - starts below, slides into place on hover */}
                <IoArrowBackOutline
                  className="text-white rotate-135 size-10 absolute
                 translate-y-30 group-hover:translate-y-0
                 group-hover:transition-transform group-hover:duration-400"
                />

                <div className="absolute top-1 left-1 w-16 border-white aspect-square rounded-full border-[1.5px] border-dashed flex items-center justify-center animate-spin scale-x-[-1] [animation-duration:4s]"></div>
              </div>
            </div>
            <div className=" absolute w-2/6 h-[35%] lg:h-2/5  top-1/8 -right-1/5 z-10 ">
              <Image
                className="object-cover w-full rounded-full border-2 border-white upDownAnimation"
                src="/images/why-choose-one-2.webp"
                alt="bg image"
                fill
                priority
              />
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-5/8">
          <div className=" w-full flex items-center gap-1s">
            <h1 className=" font-caveat text-3xl font-semibold text-[#1bbc9b]">
              Who we are
            </h1>
            <Image
              className=" object-contain -translate-y-3 leftRightAnimation translate-x-1"
              src="/images/title-shape.webp"
              alt="bg image"
              width={30}
              height={30}
              priority
            />
          </div>
          <h2 className=" text-5xl text-[#292929] pt-2 font-geologica font-bold">
            Sri Lanka&apos;s Safari Experts
          </h2>
          <p className=" pt-2 text-[#555555] font-poppins text-xl xl:pr-10">
            Welcome to The Canofy — where nature, adventure, and heartfelt
            hospitality meet to create unforgettable safari experiences across
            Sri Lanka.
          </p>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="w-full flex gap-3 pr-10">
                  <div className="bg-[#1bbc9b] rounded-lg p-2.5 size-fit translate-y-2 relative flex items-center justify-center">
                    <Icon
                      className={`text-white size-6 ${i === 1 ? " scale-130" : ""}`}
                    />
                    <div className="w-full h-full absolute border border-[#1bbc9b] border-dashed rounded-lg -top-1 left-1"></div>
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-[#292929] text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-4 text-[#555555]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-full md:flex items-center gap-5 mt-10">
            <div className=" px-8 h-12 text-center flex items-center justify-center cursor-pointer bg-[#1bbc9b] text-white text-sm font-  font-poppins rounded-full relative group overflow-hidden">
              <div
                className=" relative z-20 translate-y-0 group-hover:-translate-y-30
                 group-hover:transition-transform group-hover:duration-600"
              >
                Start Booking
              </div>
              <p
                className="  absolute text-[#ffffff] group-hover:translate-y-0 translate-y-30
                 group-hover:transition-transform group-hover:duration-500 z-20 ease-in-out delay-100"
              >
                Start Booking
              </p>
              <div className=" absolute w-full  aspect-square rounded-full group-hover:scale-120 bg-[#292929] top-full group-hover:-translate-y-2/5 left-0  group-hover:transition-transform group-hover:duration-300 delay-100"></div>
              <div className=" absolute -top-full left-0 w-full h-full bg-[#292929] group-hover:translate-y-full duration-200 delay-300 rotate-180"></div>
            </div>
            <div className=" flex items-center gap-5 mt-5 md:mt-0">
              <div className=" flex h-12.5 items-center justify-center">
                <Image
                  className=" w-12.5 object-cover rounded-full border-2 border-[#ffffff]"
                  src="/images/person1.jpg"
                  alt="bg image"
                  width={50}
                  height={50}
                  priority
                />
                <Image
                  className=" w-12.5 object-cover rounded-full border-2 border-[#ffffff] -translate-x-1/2"
                  src="/images/person2.jpg"
                  alt="bg image"
                  width={48}
                  height={48}
                  priority
                />
                <Image
                  className=" w-12.5 object-cover rounded-full border-2 border-[#ffffff] -translate-x-full"
                  src="/images/person3.jpg"
                  alt="bg image"
                  width={48}
                  height={48}
                  priority
                />
                <div className="w-12.5 aspect-square object-cover rounded-full border-2 border-[#ffffff] translate-x-[-150%] flex items-center justify-center bg-[#e0fffb] text-[#1bbc9b] ">
                  <p className=" text-2xl leading-0 -translate-y-1 w-fit text-center">
                    +
                  </p>
                </div>
              </div>
              <div className=" -translate-x-15 leading-0">
                <h3 className=" text-2xl font-semibold">18k+ </h3>
                <p className=" text-[#292929] text-base">
                  Individual Travellers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full absolute top-0 left-0 bg-[#f0f0f0] z-0">
        <Image
          className="object-cover"
          src="/images/why-choose-one-bg.webp"
          alt="bg image"
          fill
          priority
        />
      </div>
    </section>
  );
}
