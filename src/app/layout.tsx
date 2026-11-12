import type { Metadata } from "next";
import {
  Fraunces,
  Manrope,
  Playfair_Display,
  Poppins,
  Libertinus_Math,
  Caveat,
  Geologica,
  Plus_Jakarta_Sans,
  Yellowtail,
  Bebas_Neue,
  Inter,
} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfairDisplay",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const libertinus_Math = Libertinus_Math({
  variable: "--font-libertinus_Math",
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["serif"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: ["400"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Canopy Safaris — Exclusive Adventures in the Wild",
  description:
    "An exclusive luxury safari experience across Sri Lanka's most iconic parks. Seamless comfort, calm, and curated adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`...your font variables... h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="w-full flex-1">{children}</main>
        <Footer />
        <div className="fixed top-0 left-0 -z-10 h-full w-full">
          <Image
            className="object-cover"
            src="/images/fixedBg.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
      </body>
    </html>
  );
}
