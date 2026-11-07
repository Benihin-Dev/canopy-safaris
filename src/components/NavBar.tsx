"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PiPhoneThin } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
import YellowBtn from "./Elements/YellowBtn";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Tours & Safaris", link: "#packages" },
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
    <header
      className={`fixed top-0 left-0 z-50 w-full font-poppins text-white transition-all duration-300 ${
        scrolled || open
          ? "bg-canopy-deep/95 py-2 shadow-lg backdrop-blur"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-5 sm:w-11/12 sm:px-0 lg:max-w-350">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Image
            className="size-12 object-contain"
            src="/images/logo.png"
            alt="Canofy logo"
            width={48}
            height={48}
            priority
          />
          <span className="font-libertinus_Math text-2xl font-semibold">
            Canofy
          </span>
        </a>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="text-sm font-medium transition-colors duration-300 hover:text-[#ffcd09]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right side: phone + button + mobile toggle */}
        <div className="flex items-center gap-5">
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
            {open ? <IoClose className="size-8" /> : <IoMenu className="size-8" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mx-auto mt-3 flex w-full flex-col gap-4 border-t border-white/20 px-5 py-5 sm:w-11/12 sm:px-0 lg:hidden">
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.link}
              onClick={() => setOpen(false)}
              className="text-base font-medium hover:text-[#ffcd09]"
            >
              {item.name}
            </a>
          ))}
          <div className="sm:hidden">
            <YellowBtn text="Plan Your Safari" />
          </div>
        </nav>
      )}
    </header>
  );
}
