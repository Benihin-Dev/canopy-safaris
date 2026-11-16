export type SafariPackage = {
  slug: string;
  // card + slider
  badge: string;
  title: string; // first word = big, the rest = small grey on the card
  tagline: string;
  desc: string; // keep it about 140–150 characters so it fits 4 lines
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
  "i* need to knw where it going to change leo.";

const baseIncluded = [
  "Private open-air jeep",
  "Expert naturalist guide",
  "Park entrance fees",
  "Bottled water",
];
const baseExcluded = [
  "Personal expenses",
  "Tips & gratuities",
  "Travel insurance",
];

export const packages: SafariPackage[] = [
  {
    slug: "kumana-safari",
    badge: "Wildlife Experience",
    title: "Kumana Safari",
    tagline: "Birds, elephants and quiet wetlands",
    desc: "A quiet jeep safari through Kumana’s wetlands with fewer vehicles on the track, peaceful birdlife and a high chance of spotting a leopard.",
    img: "/images/safari/kumana.jpg",
    highlights: ["Less crowded", "High chance for leopard"],
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
    desc: "Watch the sun set at Elephant Rock, then follow the park after dark to observe the night behaviour of its animals and meet wild elephants.",
    img: "/images/safari/night.jpg",
    highlights: [
      "Sunset at Elephant Rock",
      "Observing night behaviour of animals",
      "Elephant encounters",
    ],
    duration: "Evening · 4 hrs",
    groupSize: "2 – 6 guests",
    bestTime: "All year",
    price: "From $95",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Spotlight & night-vision gear"],
    excluded: baseExcluded,
    itinerary: [
      { time: "17:00", title: "Pickup & briefing", text: lorem },
      { time: "18:00", title: "Sunset at Elephant Rock", text: lorem },
      { time: "19:30", title: "Nocturnal wildlife spotting", text: lorem },
      { time: "21:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "adventure-safari",
    badge: "Outdoor Adventure",
    title: "Adventure Safari",
    tagline: "Beyond the jeep track",
    desc: "Go beyond the jeep track with hiking, surfing and a night safari around the buffer zone, all in one adventure-packed experience.",
    img: "/images/safari/adventure.jpg",
    highlights: ["Hiking", "Surfing", "Night safari around buffer zone"],
    duration: "Full day",
    groupSize: "2 – 8 guests",
    bestTime: "May – Sep",
    price: "From $150",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Lunch", "Local activity guide"],
    excluded: baseExcluded,
    itinerary: [
      { time: "Morning", title: "Hiking", text: lorem },
      { time: "Afternoon", title: "Surfing", text: lorem },
      { time: "Evening", title: "Night safari around buffer zone", text: lorem },
    ],
  },
  {
    slug: "wilpattu-safari",
    badge: "National Park",
    title: "Wilpattu Safaris",
    tagline: "Sri Lanka’s largest national park",
    desc: "Explore Sri Lanka’s largest national park, the best place to observe the island’s dry zone environment, from forest tracks to natural lakes.",
    img: "/images/safari/wilpattu.jpg",
    highlights: [
      "Largest national park in Sri Lanka",
      "Best place to observe dry zone environment",
    ],
    duration: "Full day",
    groupSize: "2 – 6 guests",
    bestTime: "Feb – Oct",
    price: "On request",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Breakfast or packed lunch"],
    excluded: baseExcluded,
    itinerary: [
      { time: "05:30", title: "Hotel pickup", text: lorem },
      { time: "07:00", title: "Enter Wilpattu National Park", text: lorem },
      { time: "12:00", title: "Lunch break", text: lorem },
      { time: "16:00", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "yala-safari",
    badge: "National Park",
    title: "Yala Safari",
    tagline: "A classic Sri Lankan safari",
    desc: "Visit one of Sri Lanka’s oldest and most popular national parks, known for its rich wildlife and the classic safari experience.",
    img: "/images/safari/yala.jpg",
    highlights: ["Very popular national park", "One of the oldest national parks"],
    duration: "Half / Full day",
    groupSize: "2 – 6 guests",
    bestTime: "Feb – Jul",
    price: "On request",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Breakfast or packed lunch"],
    excluded: baseExcluded,
    itinerary: [
      { time: "05:00", title: "Hotel pickup", text: lorem },
      { time: "06:00", title: "Enter Yala National Park", text: lorem },
      { time: "10:30", title: "Wildlife & viewpoint stop", text: lorem },
      { time: "12:30", title: "Return transfer", text: lorem },
    ],
  },
  {
    slug: "udawalawe-safari",
    badge: "National Park",
    title: "Udawalawe Safari",
    tagline: "Elephants up close",
    desc: "A peaceful, relaxed safari across open grasslands, especially good for close encounters with wild elephants in their natural habitat.",
    img: "/images/safari/udawalawe.jpg",
    highlights: ["Peaceful safari", "Especially for elephant encounters"],
    duration: "Half / Full day",
    groupSize: "2 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview: lorem + " " + lorem,
    included: [...baseIncluded, "Breakfast or packed lunch"],
    excluded: baseExcluded,
    itinerary: [
      { time: "05:30", title: "Hotel pickup", text: lorem },
      { time: "06:30", title: "Enter Udawalawe National Park", text: lorem },
      { time: "10:30", title: "Elephant viewing stop", text: lorem },
      { time: "12:30", title: "Return transfer", text: lorem },
    ],
  },
];

export const getPackage = (slug: string) =>
  packages.find((p) => p.slug === slug);
