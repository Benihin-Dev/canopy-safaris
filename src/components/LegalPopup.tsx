"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBack, IoClose } from "react-icons/io5";
import LegalBody from "@/components/LegalBody";
import type { LegalDoc } from "@/data/legal";

/* Centered popup over a dimmed page. Close with the orange button, the Escape
   key, or by clicking outside the card. */
export default function LegalPopup({
  doc,
  onClose,
}: {
  doc: LegalDoc;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const titleId = "legal-popup-title";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    /* stop the page behind from scrolling while the popup is open */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  /* close, then go to the top of the home page */
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    if (pathname === "/") {
      document
        .getElementById("home")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#home");
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 text-[14px] leading-relaxed text-[#344054] shadow-xl shadow-[#313131] sm:p-8 sm:text-[15px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="group absolute right-4 top-4 flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#FD853A] text-white shadow-[0_4px_12px_rgba(253,133,58,0.45)] ring-4 ring-[#FD853A]/20 transition-all duration-300 hover:scale-110 hover:bg-[#e46e24] hover:ring-[#FD853A]/40 focus-visible:outline-none focus-visible:ring-[#171717]/30 active:scale-95"
        >
          <IoClose
            size={26}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </button>

        <LegalBody doc={doc} titleId={titleId} />

        <div className="mt-6 border-t border-[#EAECF0] pt-4">
          <Link
            href="/#home"
            onClick={goHome}
            className="group inline-flex items-center gap-2 font-inter font-semibold text-[#FD853A] underline underline-offset-4 transition-colors duration-300 hover:text-[#e46e24]"
          >
            <IoArrowBack
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Go back to Home
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
