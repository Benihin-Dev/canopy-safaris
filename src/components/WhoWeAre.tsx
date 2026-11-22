import React from "react";
import Image from "next/image";
import { Dancing_Script, Libertinus_Serif, Poppins } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "600" });
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: "600" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ----- the 3 collage photos (put the files in /public/images/WhoWeAre/) -----
   left / top / w / h are in % of the collage box, rot = tilt in degrees.
   z = which photo sits on top. Change the src to use your own photos. */
const photos = [
  {
    src: "/images/WhoWeAre/collage-1.jpg",
    alt: "Safari jeep in Kumana National Park",
    left: 7.9,
    top: 11.1,
    w: 51.5,
    h: 50.9,
    rot: -7,
    z: 1,
  },
  {
    src: "/images/WhoWeAre/collage-2.jpg",
    alt: "Leopard in the wild",
    left: 39.1,
    top: 30.2,
    w: 53.5,
    h: 51.8,
    rot: 4,
    z: 2,
  },
  {
    src: "/images/WhoWeAre/collage-3.jpg",
    alt: "Our safari guide",
    left: 11.2,
    top: 59.5,
    w: 50.3,
    h: 38,
    rot: -3,
    z: 3,
  },
];

/* ----- the numbers row (change the words / numbers here) ----- */
const stats = [
  { value: "18k+", label: "Travellers" },
  { value: "4", label: "National Parks" },
  { value: "24/7", label: "Support" },
  { value: "10+", label: "Years" }, // <- replace with your real number
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className=" w-full relative overflow-hidden py-20 scroll-mt-20">
      <div className=" w-full sm:w-11/12 mx-auto px-5 lg:max-w-350 sm:px-0 lg:flex items-center justify-center relative z-10">
        {/* ---------- left: photo collage ---------- */}
        <div className=" w-full h-full lg:w-3/8">
          <div className="relative mx-auto lg:mx-0 lg:ml-10 w-full max-w-[360px] aspect-[340/440] mb-12 lg:mb-0">
            {photos.map((p) => (
              <div
                key={p.src}
                className="absolute overflow-hidden border-[5px] border-white bg-[#d9c7a8] shadow-[0_8px_18px_rgba(0,0,0,0.2)]"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.w}%`,
                  height: `${p.h}%`,
                  transform: `rotate(${p.rot}deg)`,
                  zIndex: p.z,
                }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 40vw, 200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- right: text + numbers ---------- */}
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

          <p className={`${poppins.className} mt-6 max-w-[620px] text-justify text-base leading-[1.8] text-[#5b4733]`}>
            At The Canofy, we bring together a passion for wildlife, authentic nature experiences 
            and genuine hospitality to create unforgettable safari journeys across Sri Lanka.
          </p>

          {/* numbers row */}
          <div className="mt-8 grid max-w-[620px] grid-cols-4 border-y border-[#d9c7a8] py-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-1.5 text-center ${i > 0 ? "border-l border-[#d9c7a8]" : ""}`}
              >
                <div
                  className={`${libertinus.className} text-[26px] leading-[1.1] text-[#2b1d10] md:text-[30px]`}
                >
                  {s.value}
                </div>
                <div className={`${poppins.className} mt-0.5 text-[11px] text-[#5b4733] md:text-xs`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* start booking button (same hover effect as before) */}
          <div className=" w-full mt-8">
            <div className={`${poppins.className} px-8 h-12 w-fit text-center flex items-center justify-center cursor-pointer bg-[#D9822B] text-[#2B1D14] text-sm rounded-full relative group overflow-hidden`}>
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
