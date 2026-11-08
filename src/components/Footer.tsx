import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMailOpenOutline, IoLocationOutline } from "react-icons/io5";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destination", href: "/destination" },
  { label: "Upcoming Tour", href: "/tours" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* Background image (replace the path with your own) */}
      <Image
        src="/images/footer-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-top"
      />

      {/* Fades the photo into solid brown toward the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-[#4a3520]/70 to-[#4a3520]" />

      <div className="relative w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0">
        {/* Call to action */}
        <div className="flex flex-col items-center text-center gap-6 pt-16 sm:pt-20 pb-40 sm:pb-56">
          <h2 className="max-w-xl text-3xl sm:text-5xl font-bold leading-tight">
            Ready to Start Your Next Adventure?
          </h2>
          <Link
            href="/contact"
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
                <Link
                  href={link.href}
                  className="transition hover:text-[#e77b2a]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/30" />

        {/* Contact / Logo / Office */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 py-8 text-sm font-semibold">
          {/* Contact */}
          <div className="flex flex-col justify-center gap-3 sm:pr-6">
            <h3 className="text-base">Contact us</h3>
            <a
              href="tel:+94754540123"
              className="flex items-center gap-2 transition hover:text-[#e77b2a]"
            >
              <MdOutlinePhoneInTalk className="size-5 shrink-0 text-[#e77b2a]" />
              <span>+94 754540123</span>
            </a>
            <a
              href="mailto:jastanric@outlook.com"
              className="flex items-center gap-2 transition hover:text-[#e77b2a]"
            >
              <IoMailOpenOutline className="size-5 shrink-0 text-[#e77b2a]" />
              <span className="break-all">jastanric@outlook.com</span>
            </a>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center sm:border-x border-white/30 order-first sm:order-0">
            <div className="w-16 aspect-square">
              <Image
                className="object-contain"
                src="/images/logo.png"
                alt="Canofy logo"
                width={250}
                height={250}
              />
            </div>
            <span className="text-3xl font-libertinus_Math font-semibold">
              Canofy
            </span>
          </div>

          {/* Office */}
          <div className="flex flex-col justify-center gap-3 sm:items-end sm:text-right sm:pl-6">
            <h3 className="text-base">Office</h3>
            <div className="flex items-start gap-2">
              <IoLocationOutline className="size-5 mt-0.5 shrink-0 text-[#e77b2a]" />
              <p>
                Brooklyn Heights, Los
                <br />
                Angeles, California
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-white/80">
          <p>© {new Date().getFullYear()}, All Rights Reserved by Canofy</p>
          <div className="flex gap-6 font-semibold text-white">
            <Link href="/privacy" className="hover:text-[#e77b2a]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#e77b2a]">
              Terms and Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
