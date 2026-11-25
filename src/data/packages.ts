export type SafariPackage = {
  slug: string;
  // card + slider
  badge: string;
  title: string; // first word = big, the rest = small grey on the card
  tagline: string;
  desc: string; // keep it short (about 150–190 characters) so it fits the card
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
  notes?: string[]; // optional "Note" box on the detail page
  itinerary: { time: string; title: string; text: string }[]; // half-day (or the only itinerary)
  fullItinerary?: { time: string; title: string; text: string }[]; // full-day, optional
  // optional: any number of itineraries with your own labels (replaces itinerary/fullItinerary on the page)
  itineraryOptions?: { label: string; steps: { time: string; title: string; text: string }[] }[];
};

type Step = { time: string; title: string; text: string };

const kumanaHalfDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Kumana National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "11:30 AM", title: "Return to Hotel", text: "Conclude your half-day safari experience and return to your hotel." },
];

const kumanaFullDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Kumana National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "12:30 PM", title: "Lunch Break", text: "Enjoy a relaxing lunch surrounded by the natural beauty of the wilderness." },
  { time: "03:30 PM", title: "Refreshment Break", text: "Take another short break to enjoy refreshments, beverages or snacks." },
  { time: "05:30 PM", title: "Exit Kumana National Park", text: "Conclude your wildlife exploration and exit the national park." },
  { time: "06:30 PM", title: "Return to Hotel", text: "Arrive back at your hotel after a memorable full-day safari experience." },
];

const wilpattuHalfDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Wilpattu National Park (Hunuwilagama Entrance)", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Return to Hotel", text: "Conclude your half-day safari experience and return to your hotel." },
];

const wilpattuFullDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Wilpattu National Park (Hunuwilagama Entrance)", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "12:30 PM", title: "Lunch Break", text: "Enjoy a relaxing lunch surrounded by the natural beauty of the wilderness." },
  { time: "03:30 PM", title: "Refreshment Break", text: "Take another short break to enjoy refreshments, beverages or snacks." },
  { time: "05:30 PM", title: "Exit Wilpattu National Park", text: "Conclude your wildlife exploration and exit the national park." },
  { time: "06:00 PM", title: "Return to Hotel", text: "Arrive back at your hotel after a memorable full-day safari experience." },
];

const yalaHalfDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Yala National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Return to Hotel", text: "Conclude your half-day safari experience and return to your hotel." },
];

const yalaFullDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Yala National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "12:30 PM", title: "Lunch Break", text: "Enjoy a relaxing lunch surrounded by the natural beauty of the wilderness." },
  { time: "03:30 PM", title: "Refreshment Break", text: "Take another short break to enjoy refreshments, beverages or snacks." },
  { time: "05:30 PM", title: "Exit Yala National Park", text: "Conclude your wildlife exploration and exit the national park." },
  { time: "06:00 PM", title: "Return to Hotel", text: "Arrive back at your hotel after a memorable full-day safari experience." },
];

const udawalaweThreeHour: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Udawalawe National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "09:00 AM", title: "Return to Hotel", text: "Conclude your half-day safari experience and return to your hotel." },
];

const udawalaweSixHour: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Udawalawe National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "12:00 PM", title: "Return to Hotel", text: "Conclude your half-day safari experience and return to your hotel." },
];

const udawalaweFullDay: Step[] = [
  { time: "05:30 AM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
  { time: "06:00 AM", title: "Enter Udawalawe National Park", text: "Begin your safari adventure and explore the park's diverse landscapes and wildlife." },
  { time: "08:00 AM", title: "Breakfast Break", text: "Enjoy a breakfast break with a selection of food and fresh fruits." },
  { time: "10:30 AM", title: "Refreshment Break", text: "Take a short break to enjoy refreshments, beverages or snacks." },
  { time: "12:30 PM", title: "Lunch Break", text: "Enjoy a relaxing lunch surrounded by the natural beauty of the wilderness." },
  { time: "03:30 PM", title: "Refreshment Break", text: "Take another short break to enjoy refreshments, beverages or snacks." },
  { time: "05:30 PM", title: "Exit Udawalawe National Park", text: "Conclude your wildlife exploration and exit the national park." },
  { time: "06:00 PM", title: "Return to Hotel", text: "Arrive back at your hotel after a memorable full-day safari experience." },
];

export const packages: SafariPackage[] = [
  {
    slug: "kumana-safari",
    badge: "National Park",
    title: "Kumana Safari",
    tagline: "Beyond The Crowds",
    desc: "Explore Kumana National Park's rich biodiversity and diverse birdlife with unforgettable Half-Day or Full-Day safari experiences in a peaceful wilderness.",
    img: "/images/safari/kumana.jpg",
    highlights: ["Fewer Crowds", "Leopard Sightings", "Rich Biodiversity"],
    duration: "Half / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "From $120",
    overview: "Discover the natural beauty and incredible wildlife of **Kumana National Park** with an unforgettable safari experience. Known for its rich biodiversity, diverse birdlife and exciting wildlife encounters, Kumana offers a rewarding experience in a peaceful and less crowded setting. Choose between our **Half-Day and Full-Day Safari** options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with complimentary bottled drinking water. With flexible packages and competitive rates, enjoy a comfortable and memorable safari experience tailored to your preferences.",
    included: [
      "4×4 Safari Jeep",
      "Bottled Drinking Water",
      "Experienced Naturalist Guide (Selected Option)",
      "National Park Entrance Fees (Selected Option)",
      "Breakfast or Packed Lunch (Selected Option)",
    ],
    excluded: [
      "Personal Expenses",
      "Additional Meals Not Specified in the Package",
      "Additional Beverages Not Specified in the Package",
    ],
    itinerary: kumanaHalfDay,
    fullItinerary: kumanaFullDay,
  },
  {
    slug: "night-safari",
    badge: "After Dark",
    title: "Night Safari",
    tagline: "Wilderness After Dark",
    desc: "Enjoy sunset views at Elephant Rock, followed by a night safari in the Kumana buffer zone and an optional traditional bonfire dinner under the stars.",
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
      "Experience the beauty of Sri Lanka's eastern wilderness with an unforgettable Night Safari adventure. Begin your evening at **Elephant Rock**, enjoying breathtaking sunset views over the **ocean** and **lagoon**. As night falls, venture into the surrounding **Kumana National Park** buffer zone for a unique night safari, where you can explore the wilderness and discover nocturnal wildlife. To make your evening even more special, enjoy an optional bonfire dinner upon request, surrounded by the peaceful atmosphere of the night sky.",
    included: ["4×4 Safari Jeep", "Bottled Drinking Water", "Local Safari Guide"],
    excluded: [
      "Personal Expenses",
      "Meals and Refreshments",
      "Optional Bonfire Dinner",
    ],
    notes: [
      "The bonfire dinner is optional, is not included in the package price, and can be arranged upon request according to your preferences.",
      "In accordance with applicable government regulations, night safari activities take place in the surrounding buffer zone rather than inside Kumana National Park.",
      "Upon request, we can also arrange a hike at Kudumbigala Mountain, a visit to Uhana Murugan Kovil, or a visit to Muhudu Maha Viharaya Temple.",
    ],
    itinerary: [
      { time: "05:00 PM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
      { time: "05:15 PM", title: "Elephant Rock Viewpoint", text: "Enjoy a beautiful sunset with breathtaking views of the ocean and lagoon." },
      { time: "06:00 PM", title: "Night Safari", text: "Explore the Kumana buffer zone on a night safari and spot nocturnal wildlife." },
      { time: "09:00 PM", title: "Return to Hotel", text: "Return to your hotel after an exciting evening of adventure." },
      { time: "09:30 PM", title: "Optional Bonfire Dinner", text: "End your adventure with a relaxing bonfire dinner featuring traditional Tamil dishes. Enjoy authentic local flavours and discover dishes you may not have tried before." },
    ],
  },
  {
    slug: "adventure-safari",
    badge: "Outdoor Adventure",
    title: "Adventure Safari",
    tagline: "Beyond Jeep Track",
    desc: "Enjoy an unforgettable hike at Kudumbigala Mountain, surfing at Peanut Farm and an exciting night safari in the Kumana buffer zone, with opportunities to discover nocturnal wildlife and elephants.",
    img: "/images/safari/adventure.jpg",
    highlights: ["Scenic Hiking", "Ocean Surfing", "Night Exploration"],
    duration: "5 Hours",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "From $150",
    overview:
      "Discover the perfect blend of nature, adventure and exploration with our unforgettable Adventure Safari experience. Enjoy a scenic hike up Kudumbigala Mountain, offering breathtaking views of the ocean, Kumana National Park and Yala National Park. Experience the thrill of ocean surfing at Peanut Farm, one of the area's beautiful coastal destinations. As evening falls, embark on a Night Safari in the Kumana National Park buffer zone, discovering nocturnal wildlife and experiencing the wilderness after dark.",
    included: ["4×4 Safari Jeep", "Bottled Drinking Water", "Local Activity Guide"],
    excluded: [
      "Personal expenses",
      "Surfboard Rental or Surfing Lessons",
      "Optional Bonfire Dinner",
    ],
    notes: [
      "The bonfire dinner is optional and not included in the package. It can be arranged upon request according to your preferences.",
      "As per government regulations, night safari activities take place in the surrounding buffer zone rather than inside Kumana National Park.",
      "Upon request, we can arrange a sunset visit to Elephant Rock, a visit to Uhana Murugan Kovil, or a visit to Muhudu Maha Viharaya Temple.",
    ],
    itinerary: [
      { time: "04:00 PM", title: "Hotel Pickup", text: "Pickup from your hotel or preferred meeting point." },
      { time: "04:15 PM", title: "Kudumbigala Mountain Climb", text: "Enjoy a scenic hike up Kudumbigala Mountain with breathtaking views." },
      { time: "05:30 PM", title: "Peanut Farm Surfing", text: "Experience the excitement of ocean surfing at Peanut Farm." },
      { time: "06:30 PM", title: "Night Safari", text: "Explore the Kumana buffer zone on a night safari and spot nocturnal wildlife." },
      { time: "08:30 PM", title: "Return to Hotel", text: "Return to your hotel after an exciting evening of adventure." },
      { time: "09:00 PM", title: "Optional Bonfire Dinner", text: "End your adventure with a relaxing bonfire dinner featuring traditional Tamil food. Enjoy authentic local dishes and discover flavors you may not have experienced before." },
    ],
  },
  {
    slug: "wilpattu-safari",
    badge: "National Park",
    title: "Wilpattu Safaris",
    tagline: "Explore Untamed Wilderness",
    desc: "Explore Wilpattu National Park, Sri Lanka’s largest national park, through the Hunuwilagama Entrance, discovering natural lakes, dense forests and diverse wildlife.",
    img: "/images/safari/wilpattu.jpg",
    highlights: ["Largest Park", "Dry Landscapes", "Wildlife Diversity"],
    duration: "Half/Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of **Wilpattu National Park** with an unforgettable safari experience. Known as Sri Lanka's largest national park, Wilpattu features vast wilderness, dense forests, natural lakes and diverse wildlife, offering a peaceful and immersive safari experience. Our safaris operate through the **Hunuwilagama Entrance**, providing access to explore the park's remarkable landscapes and wildlife. Choose between our **Half-Day or Full-Day Safari** options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with complimentary bottled drinking water. With flexible packages and competitive pricing, enjoy a comfortable and memorable safari experience tailored to your preferences.",
    included: [
      "4×4 Safari Jeep",
      "Bottled Drinking Water",
      "Experienced Naturalist Guide (Selected Option)",
      "National Park Entrance Fees (Selected Option)",
      "Breakfast or Packed Lunch (Selected Option)",
    ],
    excluded: [
      "Personal Expenses",
      "Additional Meals Not Specified in the Package",
      "Additional Beverages Not Specified in the Package",
    ],
    itinerary: wilpattuHalfDay,
    fullItinerary: wilpattuFullDay,
  },
  {
    slug: "yala-safari",
    badge: "National Park",
    title: "Yala Safari",
    tagline: "Classic Sri Lankan Safari",
    desc: "Explore Yala National Park, famous for leopard sightings, diverse wildlife and breathtaking landscapes, with our unforgettable Half-Day or Full-Day safari experiences.",
    img: "/images/safari/yala.jpg",
    highlights: ["Famous Destination", "Leopard Encounters", "Rich Biodiversity"],
    duration: "Half / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of **Yala National Park** with an unforgettable safari experience. Renowned as one of Sri Lanka's most iconic wildlife destinations, Yala is particularly famous for its leopard sightings, diverse wildlife and stunning natural landscapes. Choose between our **Half-Day or Full-Day Safari** options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with complimentary bottled drinking water. With flexible packages and competitive pricing, enjoy a comfortable and memorable safari experience tailored to your preferences.",
    included: [
      "4×4 Safari Jeep",
      "Bottled Drinking Water",
      "Experienced Naturalist Guide (Selected Option)",
      "National Park Entrance Fees (Selected Option)",
      "Breakfast or Packed Lunch (Selected Option)",
    ],
    excluded: [
      "Personal Expenses",
      "Additional Meals Not Specified in the Package",
      "Additional Beverages Not Specified in the Package",
    ],
    itinerary: yalaHalfDay,
    fullItinerary: yalaFullDay,
  },
  {
    slug: "udawalawe-safari",
    badge: "National Park",
    title: "Udawalawe Safari",
    tagline: "Meet Gentle Giants",
    desc: "Explore Udawalawe National Park, renowned for its large elephant population and unforgettable opportunities to observe elephants in their natural habitat.",
    img: "/images/safari/udawalawe.jpg",
    highlights: ["Peaceful safari", "Elephant Sightings", "Wildlife Watching"],
    duration: "3 hrs / 6 hrs / Full day",
    groupSize: "1 – 6 guests",
    bestTime: "All year",
    price: "On request",
    overview:
      "Discover the natural beauty and incredible wildlife of **Udawalawe National Park** with an unforgettable safari experience. Famous for its large elephant population and frequent elephant sightings, Udawalawe offers wonderful opportunities to observe these majestic animals in their natural habitat. Choose between our **Half-Day or Full-Day Safari** options to suit your preferences. Enhance your adventure with flexible meal options, including breakfast, lunch, snacks and beverages, along with complimentary bottled drinking water. With flexible packages and competitive pricing, enjoy a comfortable and memorable safari experience tailored to your preferences.",
    included: [
      "4×4 Safari Jeep",
      "Bottled Drinking Water",
      "Experienced Naturalist Guide (Selected Option)",
      "National Park Entrance Fees (Selected Option)",
      "Breakfast or Packed Lunch (Selected Option)",
    ],
    excluded: [
      "Personal Expenses",
      "Additional Meals Not Specified in the Package",
      "Additional Beverages Not Specified in the Package",
    ],
    itinerary: udawalaweThreeHour,
    itineraryOptions: [
      { label: "3 hours", steps: udawalaweThreeHour },
      { label: "6 hours", steps: udawalaweSixHour },
      { label: "Full-day", steps: udawalaweFullDay },
    ],
  },
];

export const getPackage = (slug: string) =>
  packages.find((p) => p.slug === slug);
