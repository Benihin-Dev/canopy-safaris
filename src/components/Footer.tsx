import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMailOpenOutline, IoLocationOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTripadvisor,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import FooterLegalLinks from "@/components/FooterLegalLinks";

/* ---- EDIT THESE ---- */
const PHONE = "+94 754540123";
const PHONE_LINK = "tel:+94754540123";
const EMAIL = "jastanric@outlook.com";
const ADDRESS = ["Kumana", "Sri Lanka"]; // one string per line. Put your real address here.

/* Replace the Facebook, Instagram, YouTube, TikTok and TripAdvisor links with your real pages. */
const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "WhatsApp", href: "https://wa.me/94754540123", Icon: FaWhatsapp },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: FaYoutube },
  { label: "TikTok", href: "https://www.tiktok.com/", Icon: FaTiktok },
  { label: "TripAdvisor", href: "https://www.tripadvisor.com/", Icon: FaTripadvisor },
];

/* Same sections and order as the top menu, so every link goes to a real place */
const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About us", href: "/#about" },
  { label: "Safari", href: "/#packages" },
  { label: "Rental", href: "/#rentals" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#guestbook" },
  { label: "Book Now", href: "/book" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full scroll-mt-20 overflow-hidden text-white"
    >
      <Image
        src="/images/footer/footer-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-top"
      />

      {/* Fades the photo into solid brown toward the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-[#4a3520]/70 to-[#4a3520]" />

      <div className="relative mx-auto w-full px-5 sm:w-11/12 sm:px-0 lg:max-w-350">
        {/* Call to action */}
        <div className="flex flex-col items-center gap-6 pb-40 pt-16 text-center sm:pb-56 sm:pt-20">
          <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
            Ready to Start Your Next Adventure?
          </h2>
          <Link
            href="/book"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#3b2a17] transition hover:bg-[#e77b2a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Plan Your Safari Now
          </Link>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="pb-6">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-[#e77b2a]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/30" />

        {/* Contact (left) / Logo (middle) / Social (right) */}
        <div className="grid grid-cols-1 gap-8 py-8 text-sm font-semibold sm:grid-cols-3 sm:gap-0">
          {/* Contact us */}
          <div className="flex flex-col justify-center gap-3 sm:pr-6">
            <h3 className="text-base">Contact us</h3>
            <a
              href={PHONE_LINK}
              className="flex items-center gap-2 transition hover:text-[#e77b2a]"
            >
              <MdOutlinePhoneInTalk className="size-5 shrink-0 text-[#e77b2a]" />
              <span>{PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition hover:text-[#e77b2a]"
            >
              <IoMailOpenOutline className="size-5 shrink-0 text-[#e77b2a]" />
              <span className="break-all">{EMAIL}</span>
            </a>
            <div className="flex items-start gap-2">
              <IoLocationOutline className="mt-0.5 size-5 shrink-0 text-[#e77b2a]" />
              <p>
                {ADDRESS.map((line, i) => (
                  <React.Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>

          {/* Logo: centered, white, no text */}
          <div className="order-first flex items-center justify-center border-white/30 sm:order-0 sm:border-x">
            <Link href="/" aria-label="Canopy Safaris home">
              <Image
                className="size-28 object-contain brightness-0 invert sm:size-64"
                src="/images/logo.png"
                alt="Canopy Safaris logo"
                width={250}
                height={250}
              />
            </Link>
          </div>

          {/* Social media */}
          <div className="flex flex-col justify-center gap-3 sm:items-end sm:pl-6 sm:text-right">
            <h3 className="text-base">Follow us</h3>
            <ul className="flex flex-wrap gap-3 sm:justify-end">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-[#e77b2a] hover:bg-[#e77b2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30" />

        {/* Copyright + popup links */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/80 sm:flex-row">
          <p>© {new Date().getFullYear()}, All Rights Reserved by Canopy Safaris</p>
          <FooterLegalLinks />
        </div>
      </div>
    </footer>
  );
}
