import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dancing_Script, Libertinus_Serif, Poppins } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "600" });
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: "600" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ----- the 3 collage photos (put the files in /public/images/WhoWeAre/) -----
   left / top / w / h are in % of the collage box, rot = tilt in degrees.
   z = which photo sits on top. Change the src to use your own photos. */
/* ----- portfolio link (shown as a luggage tag on one photo) ----- */
const PORTFOLIO_URL = "https://jastanric.vercel.app/"; // portfolio link
const PORTFOLIO_LABEL = "My Portfolio";

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
    float: "7s",
    delay: "0s",
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
    float: "8s",
    delay: "-2s",
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
    float: "9s",
    delay: "-4s",
    link: true, // the portfolio tag sits on this photo
    label: "Naturalist", // small word shown on the photo
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
                className="who-frame absolute"
                style={
                  {
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.w}%`,
                    height: `${p.h}%`,
                    zIndex: p.z,
                    "--rot": `${p.rot}deg`,
                    "--float": p.float,
                    "--delay": p.delay,
                  } as React.CSSProperties
                }
              >
                <div className="relative size-full overflow-hidden border-[5px] border-white bg-[#d9c7a8] shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 200px"
                    className="object-cover"
                  />
                  {p.label && (
                    <>
                      <span aria-hidden="true" className="who-label-fade" />
                      <span className={`${poppins.className} who-label`}>
                        {p.label}
                      </span>
                    </>
                  )}
                </div>
                {p.link && (
                  <a
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${poppins.className} who-tag`}
                  >
                    {PORTFOLIO_LABEL} <span aria-hidden="true">↗</span>
                  </a>
                )}
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

          {/* start booking button */}
          <div className="mt-8 w-full">
            <Link href="/book" className={`${poppins.className} who-book group`}>
              <span className="who-book-label">Start Booking</span>
              <span className="who-book-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
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
