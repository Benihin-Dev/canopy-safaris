"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { FiPhone, FiCopy, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

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

/* ---------------- LOGO: change these lines ----------------
   LOGO         = path of your green logo (a PNG with a transparent background).
                  Files in /public are served from "/", so
                  public/images/logo.png  ->  "/images/logo.png"
   LOGO_WHITE   = null -> the same logo is turned WHITE by code at the top of
                  the page (no second file needed). Or put a path to a real
                  white logo file here.

   Each has a PHONE value and a DESKTOP value (desktop = screens 640px and wider):
   LOGO_HEIGHT_*   = logo height in px (the bar grows with it)
   LOGO_SHIFT_X_*  = move the logo sideways in px.
                     0 = normal, negative = move left, positive = move right. */
const LOGO = "/images/logo.png";
const LOGO_WHITE: string | null = null;
const LOGO_ALT = "Canopy Safaris";

const LOGO_HEIGHT_PHONE = 52;
const LOGO_HEIGHT_DESKTOP = 64;

const LOGO_SHIFT_X_PHONE = 0;
const LOGO_SHIFT_X_DESKTOP = 0;

/* ---------------- CONTACT NUMBER: change these lines ----------------
   PHONE_DISPLAY = how the number is shown to visitors
   PHONE_DIGITS  = country code + number, no "+", no spaces (used for the links) */
const PHONE_DISPLAY = "+94 75 454 0123";
const PHONE_DIGITS = "94754540123";
const WHATSAPP_MESSAGE = "Hi, I'd like to ask about a safari.";
const WHATSAPP_HREF = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const CALL_HREF = `tel:+${PHONE_DIGITS}`;

/* glossy cream glass look, used when the bar floats */
const GLASS: React.CSSProperties = {
  background:
    "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.45) 45%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,.82) 0%, rgba(255,250,242,.5) 55%, rgba(255,255,255,.62) 100%)",
  boxShadow:
    "0 10px 40px -10px rgba(43,29,16,.35), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.35)",
};

export default function NavBar() {
  const [atTop, setAtTop] = useState(true); // at the very top of the page
  const [activeId, setActiveId] = useState(""); // home section in view
  const [open, setOpen] = useState(false);
  const [mobilePkg, setMobilePkg] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false); // phone popup
  const [copied, setCopied] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cur = useRef(0); // where the bar is drawn now (px slid up)
  const target = useRef(0); // where it is heading
  const raf = useRef(0);
  const openRef = useRef(false);
  const touchInMenu = useRef(false);
  const pathname = usePathname();

  const fullHeight = () => (headerRef.current?.offsetHeight ?? 0) + 12;

  /* draw the bar `cur` px up. It also fades out a little as it leaves. */
  const draw = () => {
    const el = headerRef.current;
    if (!el) return;
    const full = fullHeight();
    const p = Math.min(1, cur.current / full); // 0 shown ... 1 hidden
    el.style.transform = `translate3d(0, ${-cur.current}px, 0)`;
    el.style.opacity = String(1 - p * p); // fades late, so the slide leads
    el.style.pointerEvents = p >= 0.98 ? "none" : "";
  };

  /* every frame the bar glides a fraction of the way to its target.
     This damping is what makes it feel silky instead of jumpy. */
  const tick = () => {
    const d = target.current - cur.current;
    if (Math.abs(d) < 0.15) {
      cur.current = target.current;
      draw();
      raf.current = 0;
      return;
    }
    cur.current += d * 0.14;
    draw();
    raf.current = requestAnimationFrame(tick);
  };

  const moveTo = (t: number) => {
    target.current = Math.max(0, Math.min(fullHeight(), t));
    if (!raf.current) raf.current = requestAnimationFrame(tick);
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
      if (Math.abs(diff) > 4) {
        setPhoneOpen(false); // any real scroll closes the popups
        if (openRef.current && !touchInMenu.current) {
          openRef.current = false;
          setOpen(false);
          setMobilePkg(false);
        }
      }

      if (y < 24 || openRef.current) {
        moveTo(0); // always shown at the top
      } else if (diff !== 0) {
        /* down: leaves with the scroll. up: comes back a bit quicker */
        moveTo(target.current + (diff > 0 ? diff : diff * 1.6));
      }

      /* scrolling stopped: scrolling up -> show; down -> finish hiding if past 35% */
      clearTimeout(idle);
      idle = setTimeout(() => {
        const hide = dir > 0 && target.current > fullHeight() * 0.35;
        moveTo(hide && !openRef.current ? fullHeight() : 0);
      }, 120);

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

    /* one update per screen frame */
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      clearTimeout(idle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* opening the mobile menu always shows the bar */
  useEffect(() => {
    openRef.current = open;
    if (open) moveTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* mobile menu: close on a tap outside it */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || menuBtnRef.current?.contains(t)) return;
      setOpen(false);
      setMobilePkg(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  /* mobile menu: remember if the finger started inside the menu,
     so scrolling/swiping inside it does not close it */
  useEffect(() => {
    if (!open) {
      touchInMenu.current = false;
      return;
    }
    const onStart = (e: TouchEvent) => {
      const t = e.target as Node;
      touchInMenu.current =
        !!menuRef.current?.contains(t) || !!menuBtnRef.current?.contains(t);
    };
    const onEnd = () => {
      // small delay so the last scroll event is still ignored
      setTimeout(() => (touchInMenu.current = false), 150);
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, [open]);

  /* phone popup: close on a click outside it, or on the Esc key */
  useEffect(() => {
    if (!phoneOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!phoneRef.current?.contains(e.target as Node)) setPhoneOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhoneOpen(false);
        phoneBtnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [phoneOpen]);

  /* desktop (mouse): the phone card opens when the cursor reaches the icon and
     closes shortly after it leaves. Touch screens keep the tap-to-open behaviour. */
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hoverOpen = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    setOpen(false);
    setPhoneOpen(true);
  };
  const hoverClose = () => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setPhoneOpen(false), 250);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(`+${PHONE_DIGITS}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not allowed: the number is still shown on screen */
    }
  };

  /* on the home page: smooth scroll to the section (or to the top) */
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    setOpen(false);
    setMobilePkg(false);
    setPhoneOpen(false);
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
    `inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold uppercase leading-none transition-colors duration-300 ${
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
      onFocusCapture={() => moveTo(0)}
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

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3 sm:px-12 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="ml-[var(--logo-x-phone)] flex items-center justify-self-start sm:ml-[var(--logo-x-desktop)]"
            style={
              {
                "--logo-x-phone": `${LOGO_SHIFT_X_PHONE}px`,
                "--logo-x-desktop": `${LOGO_SHIFT_X_DESKTOP}px`,
                "--logo-h-phone": `${LOGO_HEIGHT_PHONE}px`,
                "--logo-h-desktop": `${LOGO_HEIGHT_DESKTOP}px`,
              } as React.CSSProperties
            }
            aria-label="Canopy Safaris home"
          >
            <span className="grid h-[var(--logo-h-phone)] sm:h-[var(--logo-h-desktop)]">
              {/* normal logo (after scrolling). Without a separate white file it is turned white at the top. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO}
                alt={LOGO_ALT}
                className={`h-[var(--logo-h-phone)] w-auto object-contain [grid-area:1/1] transition duration-500 sm:h-[var(--logo-h-desktop)] ${
                  atTop
                    ? LOGO_WHITE
                      ? "opacity-0"
                      : "brightness-0 invert"
                    : "opacity-100"
                }`}
              />
              {LOGO_WHITE && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={LOGO_WHITE}
                  alt=""
                  aria-hidden
                  className={`h-[var(--logo-h-phone)] w-auto object-contain [grid-area:1/1] transition-opacity duration-500 sm:h-[var(--logo-h-desktop)] ${
                    atTop ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.name} className="group relative">
                  <button
                    type="button"
                    className={`${linkCls(groupActive(item.children))} cursor-pointer gap-1`}
                    aria-haspopup="menu"
                  >
                    {item.name}
                    <IoChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  {/* pt-3 bridges the gap so hover isn't lost */}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-52 translate-y-2 overflow-hidden rounded-2xl border border-white/70 text-[#3d2c1b] bg-[#fffaf2]/95 p-2 shadow-xl backdrop-blur-xl transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
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

          <div className="flex items-center justify-self-end gap-3">
            {/* phone icon: opens a small card with WhatsApp / Call */}
            <div
              ref={phoneRef}
              className="sm:relative"
              onMouseEnter={hoverOpen}
              onMouseLeave={hoverClose}
            >
              <button
                ref={phoneBtnRef}
                type="button"
                aria-label="Call or message us"
                aria-expanded={phoneOpen}
                aria-controls="phone-popup"
                onClick={() => {
                  setOpen(false);
                  setPhoneOpen((o) => (canHover() ? true : !o));
                }}
                className={`grid size-10 cursor-pointer place-items-center rounded-full border transition-colors duration-300 ${
                  phoneOpen
                    ? "border-[#a15f21] bg-[#a15f21] text-white"
                    : atTop
                      ? "border-white/60 bg-white/10 text-white hover:bg-white/20"
                      : "border-[#a15f21]/45 bg-white/55 text-[#7d4a19] hover:bg-white/80"
                }`}
              >
                <FiPhone className="size-[18px]" />
              </button>

              <div
                id="phone-popup"
                role="dialog"
                aria-label="Call or message us"
                className={`absolute inset-x-4 top-[calc(100%+12px)] z-20 origin-top-right rounded-[22px] border border-[#ead9bd] bg-[#fffaf2]/97 p-[18px] sm:inset-x-auto sm:right-0 sm:top-[calc(100%+18px)] sm:w-72 text-[#3d2c1b] shadow-[0_24px_50px_-16px_rgba(43,29,16,.45)] backdrop-blur-xl transition duration-200 ${
                  phoneOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                }`}
              >
                {/* little arrow pointing at the icon */}
                <span
                  aria-hidden
                  className="absolute -top-1.5 right-[62px] size-3 rotate-45 border-l border-t border-[#ead9bd] bg-[#fffaf2] sm:right-3.5"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#7a6550]">
                  Call or message us
                </p>
                <p className="mb-4 mt-1 font-bebas text-3xl leading-none tracking-wide">
                  {PHONE_DISPLAY}
                </p>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPhoneOpen(false)}
                  className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white transition-colors hover:bg-[#1fb957]"
                >
                  <FaWhatsapp className="size-5" />
                  WhatsApp
                </a>
                <a
                  href={CALL_HREF}
                  onClick={() => setPhoneOpen(false)}
                  className="mt-2 flex h-[42px] items-center justify-center gap-2 rounded-full bg-[#a15f21] text-sm font-semibold text-white transition-colors hover:bg-[#7d4a19]"
                >
                  <FiPhone className="size-[18px]" />
                  Call now
                </a>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="mx-auto mt-3 flex cursor-pointer items-center gap-1.5 text-xs text-[#7a6550] hover:text-[#3d2c1b]"
                >
                  {copied ? (
                    <FiCheck className="size-3.5" />
                  ) : (
                    <FiCopy className="size-3.5" />
                  )}
                  {copied ? "Copied" : "Copy number"}
                </button>
              </div>
            </div>

            <Link
              href="/book"
              onClick={(e) => handleNav(e, "/book")}
              className="hidden h-10 items-center rounded-full bg-[#a15f21] px-6 text-sm font-semibold uppercase leading-none text-white transition-colors duration-300 hover:bg-[#7d4a19] sm:inline-flex"
            >
              Book Now
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => {
                setPhoneOpen(false);
                setOpen(!open);
              }}
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
                <nav
          ref={menuRef}
          className="animate-fade-up mx-auto mt-2 flex w-[calc(100%-2rem)] max-w-[1400px] max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto overscroll-contain touch-pan-y rounded-3xl border border-white/70 bg-[#fffaf2]/95 p-4 text-[#3d2c1b] shadow-xl backdrop-blur-xl lg:hidden">
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
