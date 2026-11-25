"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import LegalPopup from "@/components/LegalPopup";
import { privacy, terms } from "@/data/legal";

type Which = "privacy" | "terms" | null;

/* Footer links. A normal click opens the popup. Right-click, middle-click or
   Ctrl/Cmd-click still opens the full /privacy or /terms page. */
export default function FooterLegalLinks() {
  const [open, setOpen] = useState<Which>(null);
  const close = useCallback(() => setOpen(null), []);

  const click =
    (which: Exclude<Which, null>) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setOpen(which);
    };

  return (
    <>
      <div className="flex gap-6 font-semibold text-white">
        <Link
          href="/privacy"
          onClick={click("privacy")}
          className="transition hover:text-[#e77b2a]"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          onClick={click("terms")}
          className="transition hover:text-[#e77b2a]"
        >
          Terms and Condition
        </Link>
      </div>

      {open && <LegalPopup doc={open === "privacy" ? privacy : terms} onClose={close} />}
    </>
  );
}
