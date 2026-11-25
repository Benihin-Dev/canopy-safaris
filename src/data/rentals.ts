export type Rental = {
  slug: string;
  // slider + listing card
  ribbon: string;
  badge: string;
  title: string;
  sub: string;
  desc: string;
  img: string;
  price: string; // "$12" (pages append "/ day")
  features: string[];
  cta: string;
  // detail page
  overview: string;
  specs: { label: string; value: string }[];
  included: string[];
  excluded: string[];
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";

const scooterIncluded = ["2 helmets", "Insurance", "24/7 support"];
const tuktukIncluded = ["Insurance", "24/7 support", "Route suggestions"];
const baseExcluded = ["Fuel", "Personal expenses"];

export const rentals: Rental[] = [
  {
    slug: "scooter-one",
    ribbon: "Ribbon text one",
    badge: "Automatic",
    title: "Card title one",
    sub: "Small line under the title",
    desc: lorem,
    img: "/images/peek/scooter1.jpg",
    price: "$12",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    overview: lorem + " " + lorem,
    specs: [
      { label: "Engine", value: "110cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: scooterIncluded,
    excluded: baseExcluded,
  },
  {
    slug: "scooter-two",
    ribbon: "Ribbon text two",
    badge: "Badge",
    title: "Card title two",
    sub: "Small line under the title",
    desc: lorem,
    img: "/images/peek/scooter2.jpg",
    price: "$14",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    overview: lorem + " " + lorem,
    specs: [
      { label: "Engine", value: "125cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: scooterIncluded,
    excluded: baseExcluded,
  },
  {
    slug: "tuktuk-one",
    ribbon: "Ribbon text three",
    badge: "Badge",
    title: "Card title three",
    sub: "Small line under the title",
    desc: lorem,
    img: "/images/peek/tuktuk1.jpg",
    price: "$25",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    overview: lorem + " " + lorem,
    specs: [
      { label: "Engine", value: "200cc" },
      { label: "Transmission", value: "Manual" },
      { label: "Seats", value: "3" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: tuktukIncluded,
    excluded: baseExcluded,
  },
  {
    slug: "tuktuk-two",
    ribbon: "Ribbon text four",
    badge: "Badge",
    title: "Card title four",
    sub: "Small line under the title",
    desc: lorem,
    img: "/images/peek/tuktuk2.jpg",
    price: "$28",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    overview: lorem + " " + lorem,
    specs: [
      { label: "Engine", value: "200cc" },
      { label: "Transmission", value: "Manual" },
      { label: "Seats", value: "3" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: tuktukIncluded,
    excluded: baseExcluded,
  },
];

export const getRental = (slug: string) => rentals.find((r) => r.slug === slug);
