"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiPhoneThin } from "react-icons/pi";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import YellowBtn from "./Elements/YellowBtn";

const packageLinks = [
  { name: "Safari", link: "/packages" },
  { name: "Scooter Rentals", link: "/rentals" },
];

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Our Story", link: "/#about" },
  { name: "Packages", children: packageLinks },
  { name: "Gallery", link: "/gallery" },
  { name: "Our Team", link: "/#team" },
  { name: "Guestbook", link: "/guestbook" },
  { name: "Contact Us", link: "/#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobilePkg, setMobilePkg] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMobilePkg(false);
  }, [pathname]);

  const isActive = (link?: string) => link && link === pathname;
  const pkgActive =
    pathname.startsWith("/packages") || pathname.startsWith("/rentals");

  const linkCls = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors duration-300 hover:bg-white/15 ${
      active ? "bg-white/15" : ""
    }`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full animate-nav-in pt-4 font-poppins text-white">
      <div className="mx-auto w-full px-5 sm:w-11/12 sm:px-0 lg:max-w-350">
        <div
          className={`flex items-center justify-between rounded-[64px] border px-5 py-2 transition-all duration-300 ${
            scrolled || open
              ? "border-transparent bg-black/85 shadow-xl backdrop-blur-md"
              : "border-white/25 bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="size-11 object-contain"
              src="/images/logo.png"
              alt="Canopy logo"
              width={44}
              height={44}
              priority
            />
            <span className="font-libertinus_Math text-2xl font-semibold">
              Canopy
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.name} className="group relative">
                  <button
                    type="button"
                    className={`${linkCls(pkgActive)} flex cursor-pointer items-center gap-1`}
                    aria-haspopup="menu"
                  >
                    {item.name}
                    <IoChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  {/* pt-3 bridges the gap so hover isn't lost */}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-52 translate-y-2 overflow-hidden rounded-2xl bg-black/90 p-2 shadow-xl backdrop-blur-md transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                      {item.children.map((c) => (
                        <Link
                          key={c.name}
                          href={c.link}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/15"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.link!}
                  className={linkCls(!!isActive(item.link))}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+94754540123"
              className="hidden items-center gap-1.5 text-sm 2xl:flex"
            >
              <PiPhoneThin className="size-5" />
              +94 754540123
            </a>
            <div className="hidden sm:block">
              <YellowBtn text="Book Now" />
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

        {/* Mobile */}
        {open && (
          <nav className="mt-3 flex animate-fade-up flex-col gap-1 rounded-3xl bg-black/90 p-4 backdrop-blur-md lg:hidden">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    type="button"
                    onClick={() => setMobilePkg(!mobilePkg)}
                    aria-expanded={mobilePkg}
                    className="flex w-full items-center justify-between rounded-full px-4 py-3 text-base font-semibold uppercase hover:bg-white/15"
                  >
                    {item.name}
                    <IoChevronDown
                      className={`size-4 transition-transform ${mobilePkg ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobilePkg && (
                    <div className="ml-4 flex flex-col border-l border-white/20 pl-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.name}
                          href={c.link}
                          className="rounded-full px-4 py-2.5 text-sm hover:bg-white/15"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.link!}
                  className="rounded-full px-4 py-3 text-base font-semibold uppercase hover:bg-white/15"
                >
                  {item.name}
                </Link>
              ),
            )}
            <div className="px-4 pt-2 sm:hidden">
              <YellowBtn text="Book Now" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
