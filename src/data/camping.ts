/* DRAFT camping page content. Edit the words here, the page reads them.
   Put this file at: src/data/camping.ts
   Prices for the booking come from src/data/booking.ts (camping section). */

export type Camping = {
  slug: string; // used in /book?service=camping&type=<slug>
  badge: string;
  title: string;
  tagline: string;
  img: string; // hero picture (replace with a camping photo later)
  duration: string;
  groupSize: string;
  bestTime: string;
  price: string; // "Starting at" price, per guest per night
  overview: string; // words wrapped in **double stars** are highlighted
  highlights: string[];
  included: string[];
  excluded: string[];
  notes?: string[];
  schedule: { time: string; title: string; text: string }[];
};

export const camping: Camping = {
  slug: "tent-stay",
  badge: "Overnight Stay",
  title: "Tent Stay",
  tagline: "Sleep under the wild sky",
  img: "/images/SafariPackages/safarihero.jpg", // DRAFT: replace with a camping photo
  duration: "1+ nights",
  groupSize: "Up to 10 guests",
  bestTime: "May to October",
  price: "$25",
  overview:
    "Spend a night **inside the wild** near Kumana National Park, away from the crowds. Your tent is set up with beds and bedding, dinner is shared by the campfire, and the morning starts with birdsong and a guided sunrise walk. A simple, comfortable way to feel the park at its quietest.",
  highlights: [
    "Tent with beds and bedding",
    "Campfire dinner",
    "Sunrise birdwatching walk",
    "Away from the crowds",
  ],
  included: [
    "Tent stay with beds and bedding",
    "Local camp host and guide",
    "Drinking water",
    "24/7 support",
  ],
  excluded: [
    "Campfire dinner and breakfast (optional extras)",
    "Sunrise birdwatching walk (optional extra)",
    "Transport to camp (optional extra)",
    "Personal expenses",
  ],
  notes: [
    "DRAFT text. Menu, timings and what is provided can be changed to match the real camp.",
  ],
  schedule: [
    { time: "03:00 PM", title: "Arrive at camp", text: "Meet your host, settle into your tent and relax." },
    { time: "05:30 PM", title: "Sunset at the camp", text: "Enjoy the evening light and the first sounds of the night." },
    { time: "07:30 PM", title: "Campfire dinner", text: "Share dinner by the fire under the stars." },
    { time: "09:30 PM", title: "Rest", text: "Fall asleep to the sounds of the wild." },
    { time: "05:30 AM", title: "Sunrise walk", text: "Wake up to birdsong and walk with a guide to see the birds." },
    { time: "08:00 AM", title: "Breakfast and check-out", text: "Have breakfast, pack up and head back." },
  ],
};
