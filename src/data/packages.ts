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
    badge: "National Park",
    title: "Kumana Safari",
    tagline: "Beyond The Crowds",
    desc: "Escape into the peaceful wilderness of Kumana, where fewer crowds offer a more intimate wildlife experience. Explore diverse habitats with exciting opportunities to encounter the elusive Sri Lankan leopard.",
    img: "/images/safari/kumana.jpg",
    highlights: ["Fewer Crowds", "Leopard Sightings", "Rich Biodiversity"],
    duration: "Half / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "From $120",
    overview: "Discover the natural beauty and incredible wildlife of Kumana National Park with an unforgettable safari experience. Known for its rich biodiversity, diverse birdlife and exciting wildlife encounters, Kumana offers a rewarding experience in a relatively peaceful and less crowded environment. Choose between our Half-Day or Full-Day Safari options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with a complimentary bottle of drinking water. With flexible packages and reasonable rate, enjoy a comfortable and memorable luxury safari experience tailored to your preferences.",
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
    tagline: "Wilderness After Dark",
    desc: "Discover a different side of nature as the wilderness transforms after sunset. Enjoy breathtaking sunset views at Elephant Rock, encounter elephants and observe the fascinating nocturnal behaviour of wildlife.",
    img: "/images/safari/night.jpg",
    highlights: [
      "Sunset Views",
      "Nocturnal Wildlife",
      "Elephant Encounters",
    ],
    duration: "Evening · 4 hrs",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "From $95",
        overview:
      "Experience the magic of the eastern wilderness with an unforgettable Night Safari adventure. Begin your evening at Elephant Rock, where you can enjoy a beautiful sunset overlooking the ocean. As darkness falls, continue your journey with a night safari through the Kumana National Park buffer zone, exploring the surroundings and discovering nocturnal wildlife in their natural habitat. For an even more memorable evening, a bonfire dinner can also be arranged upon request, allowing you to relax and enjoy the peaceful atmosphere under the starry sky.",
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
    tagline: "Beyond Jeep Track",
    desc: "Combine wildlife exploration with outdoor adventures for an unforgettable journey. Enjoy scenic hikes, surfing experiences and exciting night safaris around the buffer zone.",
    img: "/images/safari/adventure.jpg",
    highlights: ["Scenic Hiking", "Ocean Surfing", "Night Exploration"],
    duration: "4 Hours",
    groupSize: "1 – 6 guests",
    bestTime: "All Year",
    price: "From $150",
    overview:
      "Discover an exciting blend of nature, adventure and exploration with our unforgettable Adventure Safari experience. Enjoy scenic hiking through the wilderness of Kudumbigala, where breathtaking landscapes and natural surroundings create a memorable outdoor adventure. Experience the thrill of ocean surfing at Peanut Farm, one of the area's beautiful coastal spots, offering an exciting escape by the sea. As the day comes to an end, continue your adventure with a Night Safari in the Kumana National Park buffer zone, where you can explore the wilderness after dark and discover nocturnal wildlife in their natural surroundings. Combining scenic hiking, ocean surfing and night exploration, this experience offers a unique way to enjoy the adventurous side of Sri Lanka's eastern wilderness.",
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
    tagline: "Explore Untamed Wilderness",
    desc: "Discover the vast wilderness of Wilpattu, the largest national park in Sri Lanka. Experience its unique dry-zone landscapes, natural lakes and diverse wildlife in a remarkable setting.",
    img: "/images/safari/wilpattu.jpg",
    highlights: ["Largest Park", "Dry Landscapes", "Wildlife Diversity"],
    duration: "Half/Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All Years",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of Wilpattu National Park with an unforgettable safari experience. Known as Sri Lanka's largest national park, Wilpattu features vast wilderness, dense forests, natural lakes and diverse wildlife, offering a peaceful and immersive safari experience. Choose between our Half-Day or Full-Day Safari options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with a complimentary bottle of drinking water. With flexible packages and reasonable pricing, enjoy a comfortable and memorable luxury safari experience tailored to your preferences.",
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
    tagline: "Classic Sri Lankan Safari",
    desc: "Explore one of Sri Lanka's most celebrated national parks, renowned for its remarkable wildlife diversity and leopard sightings. Experience the beauty of Yala's wilderness on an unforgettable safari adventure.",
    img: "/images/safari/yala.jpg",
    highlights: ["Famous Destination", "Leopard Encounters", "Rich Biodiversity"],
    duration: "Half / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of Yala National Park with an unforgettable safari experience. Renowned as one of Sri Lanka's most iconic safari destinations, Yala is especially famous for its leopard sightings, diverse wildlife and rich natural landscapes. Choose between our Half-Day or Full-Day Safari options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with a complimentary bottle of drinking water. With flexible packages and reasonable pricing, enjoy a comfortable and memorable luxury safari experience tailored to your preferences.",
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
    tagline: "Meet Gentle Giants",
    desc: "Enjoy a peaceful safari through the beautiful landscapes of Udawalawe National Park. Famous for its remarkable elephant population, it offers wonderful opportunities to observe these magnificent animals in their natural habitat.",
    img: "/images/safari/udawalawe.jpg",
    highlights: ["Peaceful safari", "Elephant Sightings", "Wildlife Watching"],
    duration: "Half / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of Udawalawe National Park with an unforgettable safari experience. Especially renowned for its large elephant population and frequent elephant encounters, Udawalawe offers wonderful opportunities to observe these majestic animals in their natural habitat. Choose between our Half-Day or Full-Day Safari options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with a complimentary bottle of drinking water. With flexible packages and reasonable pricing, enjoy a comfortable and memorable luxury safari experience tailored to your preferences.",
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
