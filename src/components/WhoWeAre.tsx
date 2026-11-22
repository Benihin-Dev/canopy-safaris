import React from "react";
import Image from "next/image";
import { FaMapSigns } from "react-icons/fa";
import { GiJeep, GiPawPrint } from "react-icons/gi";
import { TbCertificate2 } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";
import { Dancing_Script, Libertinus_Serif, Poppins } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "600" });
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: "600" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function WhoWeAre() {
  const features = [
    {
      title: "Hotel Pickups",
      description:
        "Pick-up and drop-off available from your hotel or preferred location in Arugam Bay and Whisky Point.",
      icon: FaMapSigns,
    },
    {
      title: "Comfortable Safari Jeeps",
      description:
        "Explore wildlife in our comfortable open-air safari jeeps for a smooth, immersive wilderness experience.",
      icon: GiJeep,
    },
    {
      title: "Responsible Wildlife Tracking",
      description:
        "Ethical and responsible wildlife tracking guided by experienced local naturalists.",
      icon: GiPawPrint,
    },
    {
      title: "Experienced Naturalists",
      description:
        "Experienced naturalists bringing expert field knowledge to every memorable safari journey.",
      icon: TbCertificate2,
    },
  ];
  return (
    <section id="who-we-are" className=" w-full relative overflow-hidden py-20 scroll-mt-20">
      <div className=" w-full sm:w-11/12 mx-auto px-5 lg:max-w-350 sm:px-0 lg:flex items-center justify-center relative z-10">
        <div className=" w-full h-full lg:w-3/8">
          <div className=" w-2/3 2xl:w-1/2 mx-auto lg:mx-0 lg 2xl:ml-24 relative flex items-center justify-center -translate-x-5 lg:translate-x-0 pb-20 lg:pb-0">
            <Image
              className="w-full object-contain rounded-3xl relative z-10"
              src="/images/WhoWeAre/why-choose-one-1.webp"
              alt="bg image"
              width={500}
              height={100}
              priority
            />
            <div className="absolute -top-5.5 w-9/10 h-8/10 lg:h-9/10 left-14 border border-dashed rounded-2xl border-[#D9822B]  "></div>
            <div className="w-25 aspect-square rounded-full bg-[#F4EBDD] absolute bottom-0 right-0 translate-x-1/4 -translate-y-3/4 lg:translate-y-2 z-10 flex items-center justify-center">
<a
  href="https://jastanric.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit our website"
  className="w-18.5 relative bg-[#2B1D14] aspect-square rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-110"
>
  <IoArrowBackOutline className="text-[#D9822B] rotate-135 size-10 absolute z-10" />

  <div className="absolute inset-0 m-auto size-15 border-[#D9822B] rounded-full border-[1.5px] border-dashed animate-spin scale-x-[-1] [animation-duration:4s]"></div>
</a>
            </div>
            <div className=" absolute w-2/6 h-[35%] lg:h-2/5  top-1/8 -right-1/5 z-10 ">
              <Image
                className="object-cover w-full rounded-full border-2 border-white upDownAnimation"
                src="/images/WhoWeAre/Jastan.jpg"
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
<span
  aria-hidden="true"
  className="inline-block size-7.5 bg-[#D9822B] -translate-y-3 leftRightAnimation translate-x-1"
  style={{
    WebkitMaskImage: "url(/images/WhoWeAre/title-shape.webp)",
    maskImage: "url(/images/WhoWeAre/title-shape.webp)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  }}
/>
          </div>
          <h2
            className={`${libertinus.className} pt-2 text-[40px] leading-[1.08] text-[#2b1d10] md:text-[52px]`}
          >
            Sri Lanka&apos;s{" "}
            <span
              className={`${dancing.className} text-[48px] text-[#a15f21] md:text-[64px]`}
            >
              Safari
            </span>{" "}
            Experts
          </h2>
          <p className={`${poppins.className} pt-2 text-[#5A4636] text-xl text-justify xl:pr-10`}>
            At The Canofy, we bring together a passion for wildlife, authentic nature experiences 
            and genuine hospitality to create unforgettable safari journeys across Sri Lanka.
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
                    <h3 className={`${libertinus.className} text-xl text-[#2B1D14]`}>
                      {item.title}
                    </h3>
                    <p className={`${poppins.className} text-sm leading-5 text-justify text-[#5A4636]`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-full md:flex items-center gap-5 mt-10">
            <div className={`${poppins.className} px-8 h-12 text-center flex items-center justify-center cursor-pointer bg-[#D9822B] text-[#2B1D14] text-sm rounded-full relative group overflow-hidden`}>
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
                <h3 className={`${libertinus.className} text-2xl text-[#2B1D14]`}>18k+ </h3>
                <p className={`${poppins.className} text-[#2B1D14] text-base`}>
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
          src="/images/WhoWeAre/why-choose-one-bg.webp"
          alt="bg image"
          fill
          priority
        />
      </div>
    </section>
  );
}
