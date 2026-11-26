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
  howItWorks?: { title: string; text: string }[];
};

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
    priceLkr: 3600,
    priceUnit: "day",
    features: ["Flexible and convenient travel", "Ideal for rentals of less than 3 days"],
    cta: "Book now",
    overview: "Explore Arugam Bay, its beautiful beaches and nearby attractions at your own pace with our convenient scooter rental service. Ideal for short stays, this option offers a flexible and comfortable way to discover the area, enjoy local experiences and travel independently during your visit.",
    specs: [
      { label: "Engine", value: "110cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Scooter rental", "Safety helmets", "Basic roadside assistance"],
    excluded: ["Fuel", "Personal expenses", "Traffic fines or penalties"],
    howItWorks: [
      {
        title: "Message us",
        text: "Share your preferred rental dates via WhatsApp or book directly through our online booking link.",
      },
      {
        title: "Show your documents",
        text: "Provide a valid driving license and a copy of your passport.",
      },
      {
        title: "Pick up and ride",
        text: "Collect your scooter, receive a brief safety introduction and enjoy your journey.",
      },
    ],
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
    priceLkr: 3600,
    priceUnit: "day",
    features: ["Perfect for extended stays", "Greater value for longer rentals"],
    cta: "Book now",
    overview: "Explore Arugam Bay and its surrounding attractions with the freedom and flexibility of an extended scooter rental. Perfect for stays of more than 3 days, enjoy special rental rates with better daily value, giving you more time to discover beautiful beaches, local attractions and hidden gems at your own pace.",
    specs: [
      { label: "Engine", value: "125cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Scooter rental for extended stays", "Safety helmets", "Basic roadside assistance"],
    excluded: ["Fuel", "Personal expenses", "Traffic fines or penalties"],
    howItWorks: [
      {
        title: "Message us",
        text: "Share your preferred rental dates via WhatsApp or book directly through our online booking link.",
      },
      {
        title: "Show your documents",
        text: "Provide a valid driving license and a copy of your passport.",
      },
      {
        title: "Pick up and ride",
        text: "Collect your scooter, receive a brief safety introduction and enjoy your journey.",
      },
    ],
  },
  {
    slug: "tuktuk-one",
    ribbon: "Tuk-Tuk Adventure",
    badge: "Daily Rental",
    title: "Tuk-Tuk Rental",
    sub: "Your Journey, Your Way",
    desc: "Discover Arugam Bay and nearby destinations with the freedom of your own tuk-tuk, effortlessly.",
    img: "/images/peek/tuktuk1.jpg",
    price: "$18",
    priceLkr: 5000,
    priceUnit: "day",
    features: ["Convenient daily rental", "Ideal for independent travel"],
    cta: "Book now",
    overview: "Discover Arugam Bay, its beautiful beaches and surrounding destinations with the freedom of your own tuk-tuk. Enjoy a unique and flexible way to explore local attractions, visit nearby villages and experience the area at your own pace. Perfect for travellers seeking convenience, independence and an authentic local travel experience.",
    specs: [
      { label: "Engine", value: "200cc" },
      { label: "Transmission", value: "Manual" },
      { label: "Seats", value: "3" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Tuk-tuk rental", "Basic safety equipment", "Basic roadside assistance"],
    excluded: ["Fuel", "Personal expenses", "Traffic fines or penalties"],
    howItWorks: [
      {
        title: "Message us",
        text: "Share your preferred rental dates via WhatsApp or book directly through our online booking link.",
      },
      {
        title: "Show your documents",
        text: "Provide the required valid driving licence and a copy of your passport for verification.",
      },
      {
        title: "Pick up and ride",
        text: "Collect your tuk-tuk, receive a brief safety introduction and enjoy exploring Arugam Bay and beyond.",
      },
    ],
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
    priceLkr: 3600,
    priceUnit: "day",
    features: ["Visit Elephant Rock", "Enjoy beautiful sunset views"],
    cta: "Book now",
    overview: "Experience the beauty of Arugam Bay with a memorable sunset visit to Elephant Rock. Enjoy a scenic journey to one of the area's most picturesque coastal viewpoints, where you can take in stunning ocean views and the peaceful atmosphere as the sun sets over the horizon. Perfect for couples, friends and nature lovers.",
    specs: [
      { label: "Engine", value: "200cc" },
      { label: "Transmission", value: "Manual" },
      { label: "Seats", value: "3" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Local driver assistance", "Hotel pick-up and drop-off", "Tuk-tuk transportation to Elephant Rock"],
    excluded: ["Personal expenses", "Food and beverages", "Additional activities or services"],
    howItWorks: [
      {
        title: "Book your experience",
        text: "Choose your preferred date and arrange your booking via WhatsApp or through our online booking link.",
      },
      {
        title: "Confirm your pick-up",
        text: "Share your accommodation details and confirm your preferred pick-up time",
      },
      {
        title: "Enjoy the sunset",
        text: "Travel to Elephant Rock, take in the beautiful coastal scenery and enjoy a memorable sunset experience",
      },
    ],
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
    overview: "Enjoy a convenient and comfortable tuk-tuk transfer between Arugam Bay and Whisky Point. Whether you're heading out to explore the coastline, enjoy the beach atmosphere or visit local attractions, our tuk-tuk service offers a simple and flexible way to travel between these popular destinations.",
    specs: [
      { label: "Engine", value: "150cc" },
      { label: "Transmission", value: "Automatic" },
      { label: "Seats", value: "2" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Tuk-tuk transportation", "Pick-up from Arugam Bay", "Drop-off at Whisky Point"],
    excluded: ["Personal expenses", "Food and beverages", "Additional stops or detours"],
    howItWorks: [
      {
        title: "Book your ride",
        text: "Arrange your transfer via WhatsApp or book directly through our online booking link.",
      },
      {
        title: "Confirm your journey",
        text: "Share your preferred pick-up time and location.",
      },
      {
        title: "Enjoy your ride",
        text: "Meet your driver and enjoy a comfortable journey from Arugam Bay to Whisky Point.",
      },
    ],
  },
  {
    slug: "tuktuk-four",
    ribbon: "Your Journey, Your Choice",
    badge: "Custom Experience",
    title: "Custom Tuk-Tuk Tour",
    sub: "A Journey Designed Around You",
    desc: "Explore your preferred destinations with a customised tuk-tuk journey tailored to your requirements.",
    img: "/images/rental/tuktuk3.jpg",
    price: "$16",
    priceLkr: 4800,
    priceUnit: "trip",
    features: ["Flexible travel arrangements", "Pricing based on your requirements"],
    cta: "Book now",
    overview: "Discover Arugam Bay and its surrounding attractions your way with a personalised tuk-tuk tour. Choose the destinations you wish to visit and enjoy a flexible journey tailored to your interests and schedule. Whether exploring beautiful beaches, local villages or hidden gems, create your own memorable experience at your own pace.",
    specs: [
      { label: "Engine", value: "200cc" },
      { label: "Transmission", value: "Manual" },
      { label: "Seats", value: "3" },
      { label: "Fuel", value: "Petrol" },
    ],
    included: ["Local driver assistance", "Tuk-tuk transportation", "Flexible destination selection"],
    excluded: ["Personal expenses", "Food and beverages", "Entrance fees (where applicable)"],
    howItWorks: [
      {
        title: "Share your plan",
        text: "Tell us your preferred destinations and travel plans via WhatsApp or through our online booking link.",
      },
      {
        title: "Customize your journey",
        text: "Discuss your itinerary, preferred schedule and travel requirements with us.",
      },
      {
        title: "Enjoy your tour",
        text: "Meet your driver and explore your selected destinations at your own pace.",
      },
    ],
  },
];

export const getRental = (slug: string) => rentals.find((r) => r.slug === slug);
