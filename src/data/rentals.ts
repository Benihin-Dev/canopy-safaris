export type Rental = {
  slug: string;
  // slider + listing card
  ribbon: string; // "Card Heading" (top ribbon of the card)
  badge: string; // "Pricing Badge" (dark pill on the photo)
  title: string; // card title
  sub: string; // subheading
  desc: string; // description
  img: string;
  priceLkr: number | null; // price in rupees. null = "contact us for a quote"
  priceUnit: "day" | "trip" | null; // shown after the price: "/ day" or "/ trip"
  features: string[]; // key points
  cta: string;
  // detail page
  overview: string;
  specs: { label: string; value: string }[];
  included: string[];
  excluded: string[];
};

const scooterIncluded = ["2 helmets", "Insurance", "24/7 support"];
const tuktukIncluded = ["Insurance", "24/7 support", "Route suggestions"];
const baseExcluded = ["Fuel", "Personal expenses"];

export const rentals: Rental[] = [
  {
    slug: "scooter-short-stay",
    ribbon: "Quick Escape",
    badge: "Short Stay",
    title: "Scooter Rental – Short Stay",
    sub: "Explore at Your Own Pace",
    desc: "Enjoy the freedom to explore Arugam Bay and its surrounding attractions with a convenient scooter rental, perfect for short stays and quick adventures.",
    img: "/images/peek/scooter1.jpg",
    priceLkr: 2500,
    priceUnit: "day",
    features: [
      "Flexible and convenient travel",
      "Ideal for rentals of less than 3 days",
      "Explore nearby beaches and attractions independently",
    ],
    cta: "Book now",
    overview:
      "Explore Arugam Bay and its beautiful surroundings at your own pace with our convenient scooter rental. Perfect for short stays, enjoy the freedom to discover nearby beaches, attractions and local highlights.",
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
    slug: "scooter-long-stay",
    ribbon: "Extended Explorer",
    badge: "Long Stay",
    title: "Scooter Rental – Long Stay",
    sub: "More Days, More Adventures",
    desc: "Make the most of your stay with our long-term scooter rental option. Discover the area at your own pace while enjoying a lower daily rental rate.",
    img: "/images/peek/scooter2.jpg",
    priceLkr: 2000,
    priceUnit: "day",
    features: [
      "Perfect for extended stays",
      "Greater value for longer rentals",
      "Available for rentals longer than 3 days",
    ],
    cta: "Book now",
    overview:
      "Make the most of your time in Arugam Bay with our long-stay scooter rental. Enjoy the flexibility to explore nearby destinations independently while benefiting from a more affordable daily rate.",
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
    slug: "tuk-tuk-rental",
    ribbon: "Tuk-Tuk Adventure",
    badge: "Daily Rental",
    title: "Tuk-Tuk Rental",
    sub: "Your Journey, Your Way",
    desc: "Explore Arugam Bay and beyond with the convenience of your own tuk-tuk. Enjoy a flexible way to travel and discover local attractions at your own pace.",
    img: "/images/peek/tuktuk1.jpg",
    priceLkr: 5000,
    priceUnit: "day",
    features: [
      "Convenient daily rental",
      "Ideal for independent travel",
      "Freedom to explore nearby destinations",
    ],
    cta: "Book now",
    overview:
      "Discover Arugam Bay and its surrounding attractions with the convenience of a tuk-tuk. Enjoy the freedom to travel at your own pace and experience the area with a flexible daily rental option.",
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
    slug: "elephant-rock-sunset",
    ribbon: "Golden Hour Escape",
    badge: "Sunset Experience",
    title: "Elephant Rock Sunset Experience",
    sub: "Chase the Sunset",
    desc: "Experience the beautiful sunset at Elephant Rock and enjoy breathtaking coastal views in one of Arugam Bay's most scenic locations.",
    img: "/images/peek/sunset.jpg",
    priceLkr: 3500,
    priceUnit: "trip",
    features: [
      "Visit Elephant Rock",
      "Enjoy beautiful sunset views",
      "Perfect for a memorable evening",
    ],
    cta: "Book now",
    overview:
      "Experience the beauty of an Arugam Bay sunset at the scenic Elephant Rock. Enjoy stunning coastal views and a memorable evening surrounded by the natural beauty of the coastline.",
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
    slug: "whisky-point-transfer",
    ribbon: "Point-to-Point Ride",
    badge: "One-Way Transfer",
    title: "Arugam Bay – Whisky Point Transfer",
    sub: "Easy Rides Between Two Destinations",
    desc: "Travel conveniently between Arugam Bay and Whisky Point with our tuk-tuk transfer service, ideal for a simple and comfortable journey.",
    img: "/images/peek/transfer.jpg",
    priceLkr: 3000,
    priceUnit: "trip",
    features: [
      "One-way transfer",
      "Arugam Bay to Whisky Point",
      "Whisky Point to Arugam Bay",
    ],
    cta: "Book now",
    overview:
      "Travel conveniently between Arugam Bay and Whisky Point with our reliable tuk-tuk transfer service. Whether you're heading to the beach or returning to your accommodation, enjoy an easy and comfortable journey.",
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
    slug: "tailor-made-tuk-tuk",
    ribbon: "Your Journey, Your Choice",
    badge: "Custom Experience",
    title: "Tailor-Made Tuk-Tuk Experience",
    sub: "A Journey Designed Around You",
    desc: "Have a specific destination or travel plan in mind? Let us arrange a tailor-made tuk-tuk experience based on your preferred route and requirements.",
    img: "/images/peek/tuktuk2.jpg",
    priceLkr: null,
    priceUnit: null,
    features: [
      "Flexible travel arrangements",
      "Customised routes and destinations",
      "Pricing based on your requirements",
    ],
    cta: "Get a quote",
    overview:
      "Create a journey that suits your plans with our tailor-made tuk-tuk service. Choose your preferred destinations and travel requirements, and we will arrange a flexible experience with pricing based on your request.",
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

/* "Rs 2,500 / day", "Rs 3,500 / trip" or "Contact us" */
export const priceText = (r: Rental) =>
  r.priceLkr == null
    ? "Contact us"
    : `Rs ${r.priceLkr.toLocaleString("en-US")}${r.priceUnit ? ` / ${r.priceUnit}` : ""}`;
