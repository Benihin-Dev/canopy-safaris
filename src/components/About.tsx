"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bebas_Neue,
  Dancing_Script,
  Libertinus_Serif,
  Poppins,
} from "next/font/google";
import VideoFrame from "./Elements/VideoFrame";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "600" });
const libertinus = Libertinus_Serif({ subsets: ["latin"], weight: "600" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* Put a cover picture for the video here, e.g. "/images/aboutImg.png".
   Leave it empty to show the dark brown frame only. */
const POSTER = "";

const parks = [
  { n: "01", name: "Yala" },
  { n: "02", name: "Udawalawe" },
  { n: "03", name: "Wilpattu" },
];

const css = `
.ab-card{transition:transform .3s ease}
.ab-card:hover{transform:translateY(-5px)}
@keyframes ab-ud{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes ab-lr{0%,100%{transform:translateX(0)}50%{transform:translateX(-14px)}}
.ab-fl-a{animation:ab-ud 4s ease-in-out infinite}
.ab-fl-b{animation:ab-lr 5s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.ab-fl-a,.ab-fl-b{animation:none}.ab-card{transition:none}}
`;

function JeepIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 15v-4l2-4h9l3 4h4v4" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  );
}

function ScooterIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M9 17h6l-2-8h-3M13 9h3" />
    </svg>
  );
}

function ArrowButton() {
  return (
    <span className="absolute bottom-5 right-5 flex size-[38px] items-center justify-center rounded-full border border-white/45">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17L17 7M17 7H8M17 7V16" />
      </svg>
    </span>
  );
}

export default function About() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="about"
      className={`${poppins.className} relative w-full scroll-mt-20 overflow-hidden px-5 py-24 text-[#3d2c1b] sm:px-12`}
      style={{
        background:
          "radial-gradient(700px circle at 8% 12%, rgba(217,130,43,.16), transparent 60%), radial-gradient(800px circle at 95% 90%, rgba(161,95,33,.12), transparent 60%), linear-gradient(180deg, #F4EBDD 0%, #f0eee5 100%)",
      }}
    >
      <style>{css}</style>

      <div className="mx-auto grid max-w-[1280px] items-stretch gap-16 lg:grid-cols-2 lg:gap-[72px]">
        {/* Left: video frame (height follows the content on the right) */}
        <div className="relative mx-auto min-h-[460px] w-full max-w-xl lg:mx-0 lg:min-h-0 lg:max-w-none">
          {/* dashed outline behind the frame */}
          <div className="absolute bottom-0 left-7 right-0 top-7 rounded-[36px] border-2 border-dashed border-[#a15f21] opacity-50" />

          {/* the frame */}
          <div
            className="absolute bottom-7 left-0 right-7 top-0 flex items-center justify-center overflow-hidden rounded-[32px]"
            style={{
              background:
                "linear-gradient(155deg, #4a3320 0%, #2b1d10 60%, #a15f21 140%)",
              boxShadow: "0 30px 60px -30px rgba(97,61,29,.6)",
            }}
          >
            {POSTER && (
              <Image
                src={POSTER}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-label="Play video"
              className="relative z-10 flex size-[92px] cursor-pointer items-center justify-center rounded-full bg-[#a15f21] text-white transition-transform duration-300 hover:scale-110"
              style={{ boxShadow: "0 0 0 14px rgba(161,95,33,.3)" }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className="absolute left-6 top-6 z-10 rounded-full bg-white/15 px-3.5 py-2 text-xs font-medium uppercase tracking-[.12em] text-white">
              Kumana National Park
            </span>
          </div>

          {/* floating card: jeep (moves up and down) */}
          <div
            className="ab-fl-a absolute bottom-[70px] left-2 z-20 flex items-center gap-3.5 rounded-[20px] border border-[#c9a36a] bg-[#fffaf2] px-5 py-3.5 sm:-left-7"
            style={{ boxShadow: "0 20px 40px -18px rgba(97,61,29,.5)" }}
          >
            <span className="flex size-[46px] items-center justify-center rounded-full bg-[#a15f21] text-white">
              <JeepIcon />
            </span>
            <span>
              <b className="block text-[15px] text-[#2b1d10]">Safari Jeep</b>
              <span className="text-[12.5px] text-[#7a6550]">
                Open-air · Expert guides
              </span>
            </span>
          </div>

          {/* floating card: scooter (moves left and right) */}
          <div
            className="ab-fl-b absolute right-0 top-12 z-20 flex items-center gap-3.5 rounded-[20px] bg-[#2b1d10] px-5 py-3.5 text-white"
            style={{ boxShadow: "0 20px 40px -18px rgba(97,61,29,.6)" }}
          >
            <span className="flex size-[46px] items-center justify-center rounded-full bg-[#a15f21]">
              <ScooterIcon />
            </span>
            <span>
              <b className="block text-[15px]">Scooter Rent</b>
              <span className="text-[12.5px] text-[#e8d9bf]">
                Arugam Bay region
              </span>
            </span>
          </div>
        </div>

        {/* Right: content */}
        <div>
          <p
            className={`${dancing.className} text-[34px] leading-[1.1] text-[#a15f21]`}
          >
            Explore Sri Lanka
          </p>
          <h2
            className={`${libertinus.className} mt-2.5 text-[40px] leading-[1.08] text-[#2b1d10] md:text-[52px]`}
          >
            Sri Lanka&apos;s Wild Side, by{" "}
            <span
              className={`${dancing.className} text-[48px] text-[#a15f21] md:text-[64px]`}
            >
              Safari Jeep
            </span>{" "}
            &amp; Scooter
          </h2>
          <p className="mt-6 max-w-[620px] text-justify text-base leading-[1.8] text-[#5b4733]">
            Welcome to The Canofy, your gateway to Sri Lanka’s unforgettable
            experiences. From wildlife safaris in Yala, Udawalawe, Wilpattu and
            Kumana National Parks to exploring the coastline and surrounding
            destinations by scooter, we bring together local expertise,
            authentic adventures and genuine hospitality to make every journey
            memorable.
          </p>

          <div className="mt-8 grid max-w-[620px] gap-4 sm:grid-cols-2">
            {/* Kumana Safari */}
            <Link
              href="/packages"
              className="ab-card relative flex min-h-[176px] flex-col justify-between overflow-hidden rounded-[26px] p-[22px] text-white"
              style={{
                background: "linear-gradient(150deg, #4a3320, #2b1d10)",
                boxShadow: "0 26px 40px -26px rgba(43,29,16,.8)",
              }}
            >
              <span className="absolute -right-[46px] -top-[46px] size-[150px] rounded-full bg-[#a15f21]/40" />
              <div className="relative flex items-center gap-2.5">
                <span className="flex size-[50px] items-center justify-center rounded-2xl bg-white/15">
                  <JeepIcon />
                </span>
                <span className="rounded-full bg-[#a15f21] px-3 py-[5px] text-[11px] font-semibold uppercase tracking-[.12em]">
                  Main
                </span>
              </div>
              <div className="relative">
                <div
                  className={`${bebas.className} text-[34px] uppercase leading-none tracking-[.04em]`}
                >
                  Kumana Safari
                </div>
                <div className="mt-1.5 text-[13.5px] text-[#e8d9bf]">
                  Jeep tours, day &amp; night
                </div>
              </div>
              <ArrowButton />
            </Link>

            {/* Scooter Rental */}
            <Link
              href="/rentals"
              className="ab-card relative flex min-h-[176px] flex-col justify-between overflow-hidden rounded-[26px] p-[22px] text-white"
              style={{
                background: "linear-gradient(150deg, #c27a33, #a15f21)",
                boxShadow: "0 26px 40px -26px rgba(161,95,33,.9)",
              }}
            >
              <span className="absolute -right-[46px] -top-[46px] size-[150px] rounded-full bg-white/15" />
              <div className="relative flex items-center gap-2.5">
                <span className="flex size-[50px] items-center justify-center rounded-2xl bg-white/15">
                  <ScooterIcon />
                </span>
              </div>
              <div className="relative">
                <div
                  className={`${bebas.className} text-[34px] uppercase leading-none tracking-[.04em]`}
                >
                  Scooter Rental
                </div>
                <div className="mt-1.5 text-[13.5px] text-[#fbe9cf]">
                  Arugam Bay region
                </div>
              </div>
              <ArrowButton />
            </Link>

            {/* Also safaris in */}
            <div
              className="relative overflow-hidden rounded-[28px] border border-[#c9a36a] p-[22px] sm:col-span-2"
              style={{
                background: "linear-gradient(135deg, #fffaf2 0%, #f3e3c7 100%)",
                boxShadow: "0 22px 38px -26px rgba(97,61,29,.65)",
              }}
            >
              <span className="absolute -right-[50px] -top-[60px] size-[180px] rounded-full bg-[#a15f21]/[.14]" />
              <div className="relative mb-4 flex items-center gap-3">
                <span className="h-0.5 w-[34px] bg-[#a15f21]" />
                <span className="text-xs font-semibold uppercase tracking-[.2em] text-[#a15f21]">
                  Also safaris in
                </span>
              </div>
              <div className="relative grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                {parks.map((p) => (
                  <div
                    key={p.name}
                    className="ab-card relative flex items-center gap-3 overflow-hidden rounded-[18px] py-4 pl-5 pr-4"
                    style={{
                      background: "linear-gradient(150deg, #4a3320, #2b1d10)",
                    }}
                  >
                    <span className="absolute bottom-3.5 left-0 top-3.5 w-1 rounded-r bg-[#a15f21]" />
                    <span
                      className={`${bebas.className} text-[34px] leading-none text-white/20`}
                    >
                      {p.n}
                    </span>
                    <span>
                      <span
                        className={`${bebas.className} block text-[26px] uppercase leading-none tracking-[.04em] text-white`}
                      >
                        {p.name}
                      </span>
                      <span className="mt-[3px] block text-[11.5px] text-[#e8d9bf]">
                        National Park
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
