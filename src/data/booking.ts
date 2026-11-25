/* Put this file at: src/data/booking.ts

   THIS IS THE ONLY FILE YOU EDIT FOR PRICES.
   All prices are in USD. Every number marked SAMPLE is a placeholder:
   replace it with your real price. */

import { packages } from "@/data/packages";
import { rentals } from "@/data/rentals";

export type ServiceKey = "safari" | "rental" | "camping";

/* how a line is charged
   person      = price x number of guests it is for
   personNight = price x guests x nights (camping)
   group       = one flat price
   day         = price x number of days (rental) */
export type Mode = "person" | "personNight" | "group" | "day";

export type Line = {
  key: string;
  label: string;
  hint: string; // small grey text under the label
  price: number;
  mode: Mode;
  required?: boolean; // always included, guest cannot untick it
};

export type TypeOption = { slug: string; label: string };

export type Service = {
  key: ServiceKey;
  label: string;
  tagline: string;
  typeTitle: string; // "Choose a safari"
  dateLabel: string;
  hasGuests: boolean;
  periodLabel: string | null; // "Days" / "Nights" (null = not used)
  lines: Line[];
  types: TypeOption[];
};

export const MAX_GUESTS = 12;
export const MAX_PERIOD = 30;

export const services: Record<ServiceKey, Service> = {
  /* ------------------------------ SAFARI ------------------------------ */
  safari: {
    key: "safari",
    label: "Safari",
    tagline: "Jeep tours in the national parks",
    typeTitle: "Choose a safari",
    dateLabel: "Safari date",
    hasGuests: true,
    periodLabel: null,
    types: packages.map((p) => ({ slug: p.slug, label: p.title })),
    lines: [
      {
        key: "park",
        label: "Park ticket",
        hint: "Set by the park. Per guest.",
        price: 15, // SAMPLE (park prices differ: see typeOverrides below)
        mode: "person",
        required: true,
      },
      {
        key: "jeep",
        label: "Private jeep",
        hint: "One jeep for your group.",
        price: 60, // SAMPLE
        mode: "group",
        required: true,
      },
      {
        key: "guide",
        label: "Naturalist guide",
        hint: "Included with the jeep.",
        price: 0,
        mode: "group",
        required: true,
      },
      {
        key: "meal",
        label: "Meal or packed lunch",
        hint: "Per guest. Choose how many.",
        price: 8, // SAMPLE
        mode: "person",
      },
      {
        key: "snack",
        label: "Snack",
        hint: "Per guest. Choose how many.",
        price: 3, // SAMPLE
        mode: "person",
      },
      {
        key: "beverage",
        label: "Beverage",
        hint: "Per guest. Choose how many.",
        price: 2, // SAMPLE
        mode: "person",
      },
      {
        key: "water",
        label: "Bottled water",
        hint: "Per guest. Choose how many.",
        price: 1, // SAMPLE
        mode: "person",
      },
      {
        key: "pickup",
        label: "Hotel pickup",
        hint: "One price for the group.",
        price: 10, // SAMPLE
        mode: "group",
      },
    ],
  },

  /* ------------------------------ RENTAL ------------------------------ */
  rental: {
    key: "rental",
    label: "Rental",
    tagline: "Scooters and tuk-tuks",
    typeTitle: "Choose a vehicle",
    dateLabel: "Pickup date",
    hasGuests: false,
    periodLabel: "Days",
    types: rentals
      .filter((r) => r.priceLkr !== null)
      .map((r) => ({ slug: r.slug, label: r.title })),
    lines: [
      {
        key: "vehicle",
        label: "Vehicle rental",
        hint: "Per day. Insurance, 2 helmets and 24/7 support included.",
        price: 0, // the real price is read from src/data/rentals.ts
        mode: "day",
        required: true,
      },
      {
        key: "cover",
        label: "Extra damage cover",
        hint: "Per day.",
        price: 3, // SAMPLE
        mode: "day",
      },
      {
        key: "helmet",
        label: "Extra helmet",
        hint: "Per day.",
        price: 1, // SAMPLE
        mode: "day",
      },
      {
        key: "delivery",
        label: "Delivery to your hotel",
        hint: "One time.",
        price: 8, // SAMPLE
        mode: "group",
      },
    ],
  },

  /* ------------------------------ CAMPING ----------------------------- */
  camping: {
    key: "camping",
    label: "Camping",
    tagline: "Sleep inside Kumana National Park",
    typeTitle: "Choose a stay",
    dateLabel: "Check-in date",
    hasGuests: true,
    periodLabel: "Nights",
    types: [{ slug: "tent-stay", label: "Tent stay" }],
    lines: [
      {
        key: "tent",
        label: "Tent and bedding",
        hint: "Per guest, per night.",
        price: 25, // SAMPLE
        mode: "personNight",
        required: true,
      },
      {
        key: "dinner",
        label: "Campfire dinner",
        hint: "Per guest, per night. Choose how many.",
        price: 10, // SAMPLE
        mode: "personNight",
      },
      {
        key: "breakfast",
        label: "Breakfast",
        hint: "Per guest, per night. Choose how many.",
        price: 5, // SAMPLE
        mode: "personNight",
      },
      {
        key: "walk",
        label: "Sunrise birdwatching walk",
        hint: "Per guest. Choose how many.",
        price: 8, // SAMPLE
        mode: "person",
      },
      {
        key: "transport",
        label: "Transport to camp",
        hint: "One time.",
        price: 12, // SAMPLE
        mode: "group",
      },
    ],
  },
};

/* Price changes for ONE safari / rental / stay (use the slug).
   Example: Kumana park ticket is $20, Yala is $25.
   Slugs come from src/data/packages.ts and src/data/rentals.ts. */
export const typeOverrides: Record<string, Record<string, number>> = {
  "kumana-safari": { park: 15 }, // SAMPLE
  "yala-safari": { park: 20 }, // SAMPLE
  "wilpattu-safari": { park: 20 }, // SAMPLE
  "udawalawe-safari": { park: 15 }, // SAMPLE
};

/* the lines for one service + type, with the right prices */
export function getLines(service: ServiceKey, typeSlug: string): Line[] {
  const over = typeOverrides[typeSlug] ?? {};
  return services[service].lines.map((line) => {
    let price = over[line.key] ?? line.price;
    let mode = line.mode;
    if (service === "rental" && line.key === "vehicle") {
      const r = rentals.find((x) => x.slug === typeSlug);
      if (r?.priceLkr) {
        price = Math.round((r.priceLkr / FALLBACK_RATE) * 100) / 100; // rupees -> dollars
        if (r.priceUnit === "trip") mode = "group"; // one flat price, not per day
      }
    }
    return { ...line, price, mode };
  });
}

export const isService = (v: string | null | undefined): v is ServiceKey =>
  !!v && v in services;

export const hasType = (service: ServiceKey, slug: string | null | undefined) =>
  !!slug && services[service].types.some((t) => t.slug === slug);

/* shown on the PDF and the success screen */
export const PAYMENT_NOTE =
  "Payment details are confirmed by our team when we reply to your booking."; // EDIT

/* used only if the live rate cannot be loaded (same as the rental pages) */
export const FALLBACK_RATE = 300;
