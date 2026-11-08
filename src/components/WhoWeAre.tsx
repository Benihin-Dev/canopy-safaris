import React from "react";
import Image from "next/image";
import { FaMapSigns } from "react-icons/fa";
import { GiJeep, GiPawPrint } from "react-icons/gi";
import { TbCertificate2 } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";

export default function WhoWeAre() {
  const features = [
    {
      title: "Hotel Pickups",
      description:
        "Pick-up and drop-off available from your hotel or preferred location in Arugam Bay and Whisky Point.",
      icon: FaMapSigns,
    },
    {
      title: "Customized Jeeps",
      description:
        "Experience the wilderness in our comfortable, open-air safari jeeps, offering a smooth and immersive way to discover wildlife.",
      icon: GiJeep,
    },
    {
      title: "Best Leopard Tracking",
      description:
        "Ethical and responsible wildlife tracking guided by experienced local naturalists.",
      icon: GiPawPrint,
    },
    {
      title: "Expert Naturalists",
      description:
        "Guided by experienced naturalists with in-depth field knowledge, making every safari journey informative and memorable.",
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
            <div className="absolute -top-5.5 w-9/10 h-8/10 lg:h-9/10 left-14 border border-dashed rounded-2xl border-[#D9822B]  "></div>
            <div className="w-25 aspect-square rounded-full bg-[#F4EBDD] absolute bottom-0 right-0 translate-x-1/4 -translate-y-3/4 lg:translate-y-2 z-10 flex items-center justify-center">
              <div className="w-18 relative bg-[#2B1D14] aspect-square rounded-full flex items-center justify-center cursor-pointer overflow-hidden group">
                {/* Arrow 1 - visible by default, slides up on hover */}
                <IoArrowBackOutline
                  className="text-[#D9822B] rotate-135 size-10 absolute z-10
                 translate-y-0 group-hover:-translate-y-30
                 group-hover:transition-transform group-hover:duration-400"
                />

                {/* Arrow 2 - starts below, slides into place on hover */}
                <IoArrowBackOutline
                  className="text-[#D9822B] rotate-135 size-10 absolute z-10
                 translate-y-30 group-hover:translate-y-0
                 group-hover:transition-transform group-hover:duration-400"
                />

                <div className="absolute top-1 left-1 w-16 border-[#D9822B] aspect-square rounded-full border-[1.5px] border-dashed flex items-center justify-center animate-spin scale-x-[-1] [animation-duration:4s]"></div>
              </div>
            </div>
            <div className=" absolute w-2/6 h-[35%] lg:h-2/5  top-1/8 -right-1/5 z-10 ">
              <Image
                className="object-cover w-full rounded-full border-2 border-white upDownAnimation"
                src="/images/Jastan.jpg"
                alt="bg image"
                fill
                priority
              />
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-5/8">
          <div className=" w-full flex items-center gap-1s">
            <h1 className=" font-caveat text-3xl font-semibold text-[#B5651D]">
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
          <h2 className=" text-5xl text-[#2B1D14] pt-2 font-geologica font-bold">
            Sri Lanka&apos;s Safari Experts
          </h2>
          <p className=" pt-2 text-[#5A4636] font-poppins text-xl xl:pr-10">
            Welcome to The Canofy — where nature, adventure, and heartfelt
            hospitality meet to create unforgettable safari experiences across
            Sri Lanka.
          </p>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="w-full flex gap-3 pr-10">
                  <div className="relative size-fit translate-y-2">
                    <div className="absolute -top-1.5 left-1.5 h-full w-full rounded-lg border border-dashed border-[#D9822B]" />
                    <div className="relative flex items-center justify-center rounded-lg bg-[#2B1D14] p-2.5">
                      <Icon
                        className={`text-[#D9822B] size-6 ${i === 1 ? " scale-130" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-[#2B1D14] text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-4 text-[#5A4636]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-full md:flex items-center gap-5 mt-10">
            <div className=" px-8 h-12 text-center flex items-center justify-center cursor-pointer bg-[#D9822B] text-[#2B1D14] text-sm font-poppins rounded-full relative group overflow-hidden">
              <div
                className=" relative z-20 translate-y-0 group-hover:-translate-y-30
                 group-hover:transition-transform group-hover:duration-600"
              >
                Start Booking
              </div>
              <p
                className="  absolute text-[#F4EBDD] group-hover:translate-y-0 translate-y-30
                 group-hover:transition-transform group-hover:duration-500 z-20 ease-in-out delay-100"
              >
                Start Booking
              </p>
              <div className=" absolute w-full  aspect-square rounded-full group-hover:scale-120 bg-[#2B1D14] top-full group-hover:-translate-y-2/5 left-0  group-hover:transition-transform group-hover:duration-300 delay-100"></div>
              <div className=" absolute -top-full left-0 w-full h-full bg-[#2B1D14] group-hover:translate-y-full duration-200 delay-300 rotate-180"></div>
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
                <div className="w-12.5 aspect-square object-cover rounded-full border-2 border-[#ffffff] translate-x-[-150%] flex items-center justify-center bg-[#F6DDBE] text-[#B5651D] ">
                  <p className=" text-2xl leading-0 -translate-y-1 w-fit text-center">
                    +
                  </p>
                </div>
              </div>
              <div className=" -translate-x-15 leading-0">
                <h3 className=" text-2xl font-semibold text-[#2B1D14]">18k+ </h3>
                <p className=" text-[#2B1D14] text-base">
                  Individual Travellers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full absolute top-0 left-0 bg-[#F4EBDD] z-0">
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
