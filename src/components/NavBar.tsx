"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiPhoneThin } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
import YellowBtn from "./Elements/YellowBtn";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Tours", link: "#packages" },
    { name: "Gallery", link: "#gallery" },
    { name: "Blog", link: "#" },
    { name: "Contact", link: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full pt-4 font-poppins text-white">
      <div className="mx-auto w-full px-5 sm:w-11/12 sm:px-0 lg:max-w-350">
        {/* Curved (pill) bar: transparent at the top, dark glass after scrolling */}
        <div
          className={`flex items-center justify-between rounded-[64px] border px-5 py-2 transition-all duration-300 ${
            scrolled || open
              ? "border-transparent bg-black/85 shadow-xl backdrop-blur-md"
              : "border-white/25 bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="size-11 object-contain"
              src="/images/logo.png"
              alt="Canofy logo"
              width={44}
              height={44}
              priority
            />
            <span className="font-libertinus_Math text-2xl font-semibold">
              Canofy
            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors duration-300 hover:bg-white/15"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+94754540123"
              className="hidden items-center gap-1.5 text-sm xl:flex"
            >
              <PiPhoneThin className="size-5" />
              +94 754540123
            </a>
            <div className="hidden sm:block">
              <YellowBtn text="Plan Your Safari" />
            </div>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="cursor-pointer lg:hidden"
            >
              {open ? (
                <IoClose className="size-8" />
              ) : (
                <IoMenu className="size-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (rounded panel under the bar) */}
        {open && (
          <nav className="mt-3 flex flex-col gap-1 rounded-3xl bg-black/90 p-4 backdrop-blur-md lg:hidden">
            {navLinks.map((item, i) => (
              <a
                key={i}
                href={item.link}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-base font-semibold uppercase hover:bg-white/15"
              >
                {item.name}
              </a>
            ))}
            <div className="px-4 pt-2 sm:hidden">
              <YellowBtn text="Plan Your Safari" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
