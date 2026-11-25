"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiPhoneThin } from "react-icons/pi";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";

/* "About us" groups three sections of the home page */
const aboutLinks = [
  { name: "About us", link: "/#about" },
  { name: "Who we are", link: "/#who-we-are" },
  { name: "Reviews", link: "/#guestbook" },
];

/* same order as the home page, top to bottom */
const navLinks = [
  { name: "Home", link: "/#home" },
  { name: "About us", children: aboutLinks },
  { name: "Safari", link: "/#packages" },
  { name: "Rental", link: "/#rentals" },
  { name: "Gallery", link: "/#gallery" },
  { name: "Contact us", link: "/#contact" },
];

/* home page sections the nav can jump to (these ids must exist on the page) */
const SECTION_IDS = [
  "home",
  "about",
  "packages",
  "rentals",
  "gallery",
  "who-we-are",
  "guestbook",
  "contact",
];

/* Cream paper grain drawn with code (SVG noise), so no image file is needed.
   - FINE_GRAIN: tiny speckles, like the fibres in paper
   - SOFT_BLOTCH: very slow, wide variation so the cream is not perfectly flat */
const FINE_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .28  0 0 0 .55 -.18'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const SOFT_BLOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.006 .012' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 .6  0 0 0 0 .5  0 0 0 0 .35  0 0 0 .5 -.12'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E")`;

/* glossy glass + paper texture, used when the bar floats */
const GLASS: React.CSSProperties = {
  backgroundColor: "rgba(243,238,225,.84)",
  backgroundImage: `linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.4) 45%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,0) 55%), ${FINE_GRAIN}, ${SOFT_BLOTCH}`,
  backgroundSize: "auto, auto, 240px 240px, 600px 300px",
  boxShadow:
    "0 10px 40px -10px rgba(43,29,16,.35), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.35)",
};

/* same paper look for the dropdown and the mobile menu (a bit more solid so text stays crisp) */
const PAPER: React.CSSProperties = {
  backgroundColor: "rgba(243,238,225,.95)",
  backgroundImage: `${FINE_GRAIN}, ${SOFT_BLOTCH}`,
  backgroundSize: "240px 240px, 600px 300px",
};

export default function NavBar() {
  const [atTop, setAtTop] = useState(true); // at the very top of the page
  const [activeId, setActiveId] = useState(""); // home section in view
  const [open, setOpen] = useState(false);
  const [mobilePkg, setMobilePkg] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const offsetRef = useRef(0); // how far the bar has slid up (0 = fully shown)
  const openRef = useRef(false);
  const pathname = usePathname();

  /* slide the bar by `offset` px. While the finger/wheel is moving there is no
     transition (the bar follows the scroll 1:1). When scrolling stops, it
     eases the rest of the way open or closed. */
  const applyOffset = (offset: number, animate: boolean) => {
    const el = headerRef.current;
    if (!el) return;
    const full = el.offsetHeight + 12;
    offsetRef.current = Math.max(0, Math.min(full, offset));
    const p = offsetRef.current / full; // 0 shown ... 1 hidden
    el.style.transition = animate
      ? "transform 550ms cubic-bezier(.22,1,.36,1), opacity 450ms ease"
      : "none";
    el.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
    el.style.opacity = String(1 - p);
    el.style.pointerEvents = p >= 1 ? "none" : "";
  };

  useEffect(() => {
    let lastY = window.scrollY;
    let dir = 0;
    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const diff = y - lastY;
      lastY = y;
      setAtTop(y < 24);

      if (diff !== 0) dir = diff > 0 ? 1 : -1;

      if (y < 24 || openRef.current) {
        applyOffset(0, offsetRef.current !== 0); // always shown at the top
      } else if (diff !== 0) {
        /* going down hides 1:1 with the scroll, going up shows a bit faster */
        applyOffset(offsetRef.current + (diff > 0 ? diff : diff * 2), false);
      }

      /* when scrolling stops: scrolling up -> show; down -> finish hiding if past halfway */
      clearTimeout(idle);
      idle = setTimeout(() => {
        const full = (headerRef.current?.offsetHeight ?? 0) + 12;
        const hide = dir > 0 && offsetRef.current > full * 0.35;
        applyOffset(hide && !openRef.current ? full : 0, true);
      }, 110);

      /* which home section is in view (for the active link) */
      let current = "";
      if (window.location.pathname === "/") {
        let best = -Infinity;
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= window.innerHeight * 0.4 && top > best) {
            best = top;
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    /* one update per screen frame, so scrolling stays smooth */
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  /* opening the mobile menu always shows the bar */
  useEffect(() => {
    openRef.current = open;
    if (open) applyOffset(0, true);
  }, [open]);

  /* on the home page: smooth scroll to the section (or to the top) */
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    setOpen(false);
    setMobilePkg(false);
    if (pathname !== "/") return; // other pages: let Next.js navigate
    if (link === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else if (link.startsWith("/#")) {
      const el = document.getElementById(link.slice(2));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", link);
    }
  };

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") return pathname === "/" && activeId === "";
    if (link.startsWith("/#"))
      return pathname === "/" && activeId === link.slice(2);
    return pathname === link;
  };
  const groupActive = (children: { link: string }[]) =>
    children.some((c) => isActive(c.link));

  const linkCls = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold uppercase transition-colors duration-300 ${
      atTop ? "hover:bg-white/15" : "hover:bg-[#a15f21]/10"
    } ${
      active
        ? atTop
          ? "bg-white/20"
          : "bg-[#a15f21]/15 text-[#7d4a19]"
        : ""
    }`;

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => applyOffset(0, true)}
      className={`fixed inset-x-0 top-0 z-50 font-poppins transition-[padding,color] duration-500 will-change-transform ${
        atTop ? "px-0 pt-0 text-white" : "px-4 pt-3 text-[#3d2c1b]"
      }`}
    >
      {/* soft dark fade behind the white text so it stays readable on any photo */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent transition-opacity duration-500 ${
          atTop ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* the bar: flat full-width at the top, floating glass pill after scrolling */}
      <div
        className={`animate-nav-in relative mx-auto w-full transition-[max-width,border-radius] duration-500 ${
          atTop ? "max-w-full rounded-none" : "max-w-[1400px] rounded-[64px]"
        }`}
      >
        {/* glossy glass, only after scrolling (at the top the bar has no background) */}
        <span
          aria-hidden
          style={GLASS}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-white/70 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500 ${
            atTop ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="flex items-center"
            aria-label="Canopy Safaris home"
          >
            <Image
              className="h-12 w-auto object-contain"
              src="/images/logo.png"
              alt="Canopy Safaris"
              width={180}
              height={48}
              priority
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.name} className="group relative">
                  <button
                    type="button"
                    className={`${linkCls(groupActive(item.children))} flex cursor-pointer items-center gap-1`}
                    aria-haspopup="menu"
                  >
                    {item.name}
                    <IoChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  {/* pt-3 bridges the gap so hover isn't lost */}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div style={PAPER} className="min-w-52 translate-y-2 overflow-hidden rounded-2xl border border-white/70 text-[#3d2c1b] p-2 shadow-xl backdrop-blur-xl transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                      {item.children.map((c) => (
                        <Link
                          key={c.name}
                          href={c.link}
                          onClick={(e) => handleNav(e, c.link)}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#a15f21]/10"
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
                  onClick={(e) => handleNav(e, item.link!)}
                  className={linkCls(isActive(item.link))}
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
            <Link
              href="/book"
              onClick={(e) => handleNav(e, "/book")}
              className="hidden rounded-full bg-[#a15f21] px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#7d4a19] sm:block"
            >
              Book Now
            </Link>
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
      </div>

      {/* Mobile menu */}
      {open && (
        <nav style={PAPER} className="animate-fade-up mx-auto mt-2 flex w-[calc(100%-2rem)] text-[#3d2c1b] max-w-[1400px] flex-col gap-1 rounded-3xl border border-white/70 p-4 shadow-xl backdrop-blur-xl lg:hidden">
          {navLinks.map((item) =>
            item.children ? (
              <div key={item.name}>
                <button
                  type="button"
                  onClick={() => setMobilePkg(!mobilePkg)}
                  aria-expanded={mobilePkg}
                  className="flex w-full items-center justify-between rounded-full px-4 py-3 text-base font-semibold uppercase hover:bg-[#a15f21]/10"
                >
                  {item.name}
                  <IoChevronDown
                    className={`size-4 transition-transform ${mobilePkg ? "rotate-180" : ""}`}
                  />
                </button>
                {mobilePkg && (
                  <div className="ml-4 flex flex-col border-l border-[#a15f21]/30 pl-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.name}
                        href={c.link}
                        onClick={(e) => handleNav(e, c.link)}
                        className="rounded-full px-4 py-2.5 text-sm hover:bg-[#a15f21]/10"
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
                onClick={(e) => handleNav(e, item.link!)}
                className={`rounded-full px-4 py-3 text-base font-semibold uppercase hover:bg-[#a15f21]/10 ${
                  isActive(item.link) ? "bg-[#a15f21]/15 text-[#7d4a19]" : ""
                }`}
              >
                {item.name}
              </Link>
            ),
          )}
          <Link
            href="/book"
            onClick={(e) => handleNav(e, "/book")}
            className="mx-4 mt-2 rounded-full bg-[#a15f21] px-5 py-2.5 text-center text-sm font-semibold text-white sm:hidden"
          >
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
