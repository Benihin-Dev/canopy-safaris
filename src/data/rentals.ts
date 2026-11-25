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
  priceLkr: number | null; // rupees per day (or per trip); null hides it from booking
  priceUnit?: "day" | "trip"; // defaults to "day"
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
    ribbon: "Quick Escape",
    badge: "Short Stay",
    title: "Scooter Rental - Short Stay",
    sub: "Explore at Your Own Pace",
    desc: "Explore Arugam Bay, nearby beaches and local attractions with the freedom of a scooter.",
    img: "/images/peek/scooter1.jpg",
    price: "$12",
    priceLkr: 3600,   // scooter-one
    priceUnit: "day",
    features: ["Flexible and convenient travel", "Ideal for rentals of less than 3 days"],
    cta: "Book now",
    overview: "Explore Arugam Bay and its beautiful surroundings at your own pace with our convenient scooter rental. Perfect for short stays, enjoy the freedom to discover nearby beaches, attractions and local highlights.",
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
    ribbon: "Extended Explorer",
    badge: "Long Stay",
    title: "Scooter Rental - Long Stay",
    sub: "More Days, More Adventures",
    desc: "Enjoy extended scooter rentals at a better daily rate while exploring at your own pace.",
    img: "/images/peek/scooter2.jpg",
    price: "$12",
    priceLkr: 3600,   // scooter-one
    priceUnit: "day",
    features: ["Perfect for extended stays", "Greater value for longer rentals"],
    cta: "Book now",
    overview: "Make the most of your time in Arugam Bay with our long-stay scooter rental. Enjoy the flexibility to explore nearby destinations independently while benefiting from a more affordable daily rate.",
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
    ribbon: "Tuk-Tuk Adventure",
    badge: "Daily Rental",
    title: "Tuk-Tuk Rental",
    sub: "Your Journey, Your Way",
    desc: "Discover Arugam Bay and nearby destinations with the freedom of your own tuk-tuk.",
    img: "/images/peek/tuktuk1.jpg",
    price: "$18",
    priceLkr: 5000,   // scooter-one
    priceUnit: "day",
    features: ["Convenient daily rental", "Ideal for independent travel"],
    cta: "Book now",
    overview: "Discover Arugam Bay and its surrounding attractions with the convenience of a tuk-tuk. Enjoy the freedom to travel at your own pace and experience the area with a flexible daily rental option.",
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
    ribbon: "Golden Hour Escape",
    badge: "Sunset Experience",
    title: "Elephant Rock - Sunset",
    sub: "Chase the Sunset",
    desc: "Enjoy breathtaking sunset views at Elephant Rock and create unforgettable coastal memories.",
    img: "/images/peek/tuktuk2.jpg",
    price: "$12",
    priceLkr: 3600,   // scooter-one
    priceUnit: "day",
    features: ["Visit Elephant Rock", "Enjoy beautiful sunset views"],
    cta: "Book now",
    overview: "Experience the beauty of an Arugam Bay sunset at the scenic Elephant Rock. Enjoy stunning coastal views and a memorable evening surrounded by the natural beauty of the coastline.",
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
    slug: "tuktuk-three",
    ribbon: "Point-to-Point Ride",
    badge: "One-Way Transfer",
    title: "Arugam Bay to Whisky Point",
    sub: "Easy Rides Between Two Destinations",
    desc: "Travel comfortably between Arugam Bay and Whisky Point with our convenient tuk-tuk service.",
    img: "/images/peek/scooter3.jpg",
    price: "$16",
    priceLkr: 4800,
    priceUnit: "day",
    features: ["Arugam Bay to Whisky Point", "Whisky Point to Arugam Bay"],
    cta: "Book now",
    overview: "Travel conveniently between Arugam Bay and Whisky Point with our reliable tuk-tuk transfer service. Whether you're heading to the beach or returning to your accommodation, enjoy an easy and comfortable journey.",
    specs: [
      { label: "Engine", value: "150cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: scooterIncluded,
    excluded: baseExcluded,
  },
  {
    slug: "tuktuk-four",
    ribbon: "Your Journey, Your Choice",
    badge: "Custom Experience",
    title: "Tailor-Made Tuk-Tuk Experience",
    sub: "A Journey Designed Around You",
    desc: "Explore your preferred destinations with a customised tuk-tuk journey.",
    img: "/images/rental/tuktuk3.jpg",
    price: "$16",
    priceLkr: 4800,
    priceUnit: "trip",
    features: ["Flexible travel arrangements", "Pricing based on your requirements"],
    cta: "Book now",
    overview: "Create a journey that suits your plans with our tailor-made tuk-tuk service. Choose your preferred destinations and travel requirements, and we will arrange a flexible experience with pricing based on your request.",
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
