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
    ribbon: "Quick Escape",
    badge: "Short Stay",
    title: "Scooter Rental – Short Stay",
    sub: "Explore at Your Own Pace",
    desc: "Enjoy the freedom to explore Arugambay and its surrounding attractions with a convenient scooter rental, perfect for short stays and quick adventures.",
    img: "/images/peek/scooter1.jpg",
    price: "$12",
    features: ["Ideal for rentals of less than 3 days", "Flexible and convenient travel", "Explore nearby beaches and attractions independently"],
    cta: "Book now",
    overview: "Explore Arugambay and its beautiful surroundings at your own pace with our convenient scooter rental. Perfect for short stays, enjoy the freedom to discover nearby beaches, attractions and local highlights.",
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
    slug: "Scooter Rental – Long Stay",
    ribbon: "Extended Explorer",
    badge: "Long Stay",
    title: "Card title two",
    sub: "More Days, More Adventures",
    desc: "Make the most of your stay with our long-term scooter rental option. Discover the area at your own pace while enjoying a lower daily rental rate.",
    img: "/images/peek/scooter2.jpg",
    price: "$14",
    features: ["Perfect for extended stays", "Greater value for longer rentals", "Available for rentals longer than 3 days"],
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
    slug: "Tuk-Tuk one",
    ribbon: "Tuk-Tuk Adventure",
    badge: "Daily Rental",
    title: "Tuk-Tuk Rental",
    sub: "Your Journey, Your Way",
    desc: "Explore Arugam Bay and beyond with the convenience of your own tuk-tuk. Enjoy a flexible way to travel and discover local attractions at your own pace.",
    img: "/images/peek/tuktuk1.jpg",
    price: "$25",
    features: ["Convenient daily rental", "Ideal for independent travel", "Freedom to explore nearby destinations"],
    cta: "Book now",
    overview: "Discover Arugambay and its surrounding attractions with the convenience of a tuk-tuk. Enjoy the freedom to travel at your own pace and experience the area with a flexible daily rental option.",
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
    slug: "Tuk-Tuk two",
    ribbon: "Golden Hour Escape",
    badge: "Sunset Experience",
    title: "Elephant Rock Sunset Experience",
    sub: "Experience the beautiful sunset at Elephant Rock and enjoy breathtaking coastal views in one of Arugambay's most scenic location",
    desc: "Explore Arugam Bay and beyond with the convenience of your own tuk-tuk. Enjoy a flexible way to travel and discover local attractions at your own pace.",
    img: "/images/peek/tuktuk1.jpg",
    price: "$25",
    features: ["Visit Elephant Rock", "Enjoy beautiful sunset views", "Perfect for a memorable evening"],
    cta: "Book now",
    overview: "Discover Arugambay and its surrounding attractions with the convenience of a tuk-tuk. Enjoy the freedom to travel at your own pace and experience the area with a flexible daily rental option.",
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
    slug: "Tuk-Tuk two",
    ribbon: "Tuk-Tuk Adventure",
    badge: "Daily Rental",
    title: "Arugambay – Whisky Point Transfer",
    sub: "Easy Rides Between Two Destinations",
    desc: "ravel conveniently between Arugambay and Whisky Point with our tuk-tuk transfer service, ideal for a simple and comfortable journey.",
    img: "/images/peek/tuktuk1.jpg",
    price: "$25",
    features: ["One-way transfer", "Whisky Point to Arugambay", "Arugambay to Whisky Point"],
    cta: "Book now",
    overview: "Travel conveniently between Arugam Bay and Whisky Point with our reliable tuk-tuk transfer service. Whether you're heading to the beach or returning to your accommodation, enjoy an easy and comfortable journey.",
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
    slug: "tuktuk three",
    ribbon: "Point-to-Point Ride",
    badge: "One-Way Transfer",
    title: "Arugam Bay – Whisky Point Transfer",
    sub: "Easy Rides Between Two Destinations",
    desc: "Travel conveniently between Arugambay and Whisky Point with our tuk-tuk transfer service, ideal for a simple and comfortable journey.",
    img: "/images/peek/tuktuk2.jpg",
    price: "$28",
    features: ["First feature line", "Second feature line"],
    cta: "Book now",
    overview: "Travel conveniently between Arugam Bay and Whisky Point with our reliable tuk-tuk transfer service. Whether you're heading to the beach or returning to your accommodation, enjoy an easy and comfortable journey.",
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
