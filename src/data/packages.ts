export type SafariPackage = {
  slug: string;
  // card + slider
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  img: string;
  highlights: string[];
  duration: string;
  groupSize: string;
  bestTime: string;
  price: string;
  // detail page
  overview: string;
  included: string[];
  excluded: string[];
  itinerary: { time: string; title: string; text: string }[];
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";

const baseIncluded = [
  "Open-air jeep",
  "Park entry fees",
  "Expert naturalist guide",
];
const baseExcluded = ["Flights", "Personal expenses"];

export const packages: SafariPackage[] = [
  {
    slug: "kumana-safari",
    badge: "Wildlife Experience",
    title: "Kumana Safari",
    tagline: "Birds, elephants and quiet wetlands",
    desc: lorem,
    img: "/images/safari/kumana.jpg",
    highlights: ["Half day safari", "Full day safari"],
    duration: "Half / Full day",
    groupSize: "2 – 6 guests",
    bestTime: "Apr – Jul",
    price: "From $120",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Breakfast or packed lunch"],
    excluded: baseExcluded,
    itinerary: [
      { time: "05:30", title: "Hotel pickup", text: lorem },
      { time: "06:30", title: "Enter Kumana National Park", text: lorem },
      { time: "11:00", title: "Wetland & birdlife stop", text: lorem },
      { time: "13:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "night-safari",
    badge: "After Dark",
    title: "Night Safari",
    tagline: "The wild after sunset",
    desc: lorem,
    img: "/images/safari/night.jpg",
    highlights: ["Sunset", "Nocturnal animal"],
    duration: "Evening · 4 hrs",
    groupSize: "2 – 6 guests",
    bestTime: "All year",
    price: "From $95",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Spotlight & night-vision gear"],
    excluded: baseExcluded,
    itinerary: [
      { time: "17:00", title: "Pickup & briefing", text: lorem },
      { time: "18:00", title: "Sunset drive", text: lorem },
      { time: "19:30", title: "Nocturnal wildlife spotting", text: lorem },
      { time: "21:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "outdoor-safari",
    badge: "Outdoor Adventure",
    title: "Outdoor Safari",
    tagline: "Beyond the jeep track",
    desc: lorem,
    img: "/images/safari/outdoor.jpg",
    highlights: ["Kudumbigala", "Crocodile and elephants encounter"],
    duration: "Full day",
    groupSize: "2 – 8 guests",
    bestTime: "May – Sep",
    price: "From $150",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Lunch", "Trail guide at Kudumbigala"],
    excluded: baseExcluded,
    itinerary: [
      { time: "06:00", title: "Departure", text: lorem },
      { time: "08:00", title: "Kudumbigala trail", text: lorem },
      { time: "12:00", title: "Lunch in the wild", text: lorem },
      { time: "15:00", title: "Crocodile & elephant encounter", text: lorem },
    ],
  },
  {
    slug: "tailor-made",
    badge: "Made For You",
    title: "Tailor Made",
    tagline: "Your safari, designed around you",
    desc: lorem,
    img: "/images/safari/tailor-made.jpg",
    highlights: [
      "Morning or evening",
      "Meals package",
      "Destinations",
      "Buffer zone dinner",
      "Under bonfire dinner",
    ],
    duration: "Flexible",
    groupSize: "Any size",
    bestTime: "All year",
    price: "On request",
    overview: lorem + " " + lorem,
    included: [
      ...baseIncluded,
      "Custom meals package",
      "Choice of destinations",
    ],
    excluded: baseExcluded,
    itinerary: [
      { time: "Step 1", title: "Tell us your plan", text: lorem },
      { time: "Step 2", title: "We design the route", text: lorem },
      { time: "Step 3", title: "Confirm & enjoy", text: lorem },
    ],
  },
];

export const getPackage = (slug: string) =>
  packages.find((p) => p.slug === slug);
