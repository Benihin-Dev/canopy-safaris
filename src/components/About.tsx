import React from "react";
import {
  PiJeep,
  PiJeepThin,
  PiScooter,
  PiScooterThin,
  PiMapPinLine,
  PiPhone,
} from "react-icons/pi";
import YellowBtn from "./Elements/YellowBtn";
import VideoFrame from "./Elements/VideoFrame";

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

  return (
    <section
      id="about"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#e7e7db] py-20 lg:py-28"
    >
      <div className="mx-auto grid w-full items-center gap-16 px-5 sm:w-11/12 sm:px-0 lg:max-w-350 lg:grid-cols-2 lg:gap-10">
        {/* Left: video space with floating cards */}
        <div className="relative mx-auto w-full max-w-md px-4 sm:px-0">
          {/* dashed arch behind the video */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-4xl border-2 border-dashed border-canopy-line/50"></div>

          {/* ===== VIDEO GOES HERE: set src to "/videos/about.mp4" once uploaded ===== */}
          <VideoFrame />

          {/* floating card: jeep */}
          <div className="absolute bottom-10 -left-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-10">
            <div className="rounded-full bg-[#ffcd09] p-2">
              <PiJeep className="size-6" />
            </div>
            <div className="font-poppins">
              <p className="text-sm font-semibold">Safari Jeep</p>
              <p className="text-xs text-ink/60">Kumana &amp; Yala</p>
            </div>
          </div>

          {/* floating card: scooter */}
          <div className="absolute top-24 -right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-10">
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
          <p className="font-poppins text-base font-medium text-canopy-line">
            Explore Sri Lanka
          </p>
          <h2 className="mt-2 font-libertinus_Math text-4xl leading-tight text-canopy-deep md:text-5xl">
            Sri Lanka&apos;s Wild Side, by{" "}
            <span className="font-caveat text-5xl text-clay md:text-6xl">
              Safari Jeep
            </span>{" "}
            &amp; Scooter
          </h2>
          <p className="mt-6 max-w-xl font-poppins text-sm leading-7 text-ink/70">
            Welcome to The Canofy, where nature, adventure and heartfelt
            hospitality come together. We run Kumana National Park
            safaris*, and we rent scooters so you can explore
            the island freely. Our experienced drivers and wildlife guides know
            the landscapes, the wildlife and the local ecosystems first-hand.
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
    </section>
  );
}

