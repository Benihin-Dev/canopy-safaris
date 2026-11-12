export type Review = {
  id: string;
  name: string;
  location: string; // country
  title: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  photo: string;
  tour: string; // match package titles, or "Scooter Rental"
  date: string;
  featured?: boolean; // shown in the home slider
};

// TODO: replace with REAL guest reviews and photos.
export const reviews: Review[] = [
  {
    id: "1",
    name: "Guest Name",
    location: "Country",
    title: "Unforgettable Safari!",
    text: "Globally architect client-centered system through products. Proactively formulate platform schemas focused collaboration idea-sharing. Collaboratively cross-media leadership travel leadership whereas cutting-edge convergence.",
    rating: 5,
    photo: "/images/person1.jpg",
    tour: "Kumana Safari",
    date: "March 2026",
    featured: true,
  },
  {
    id: "2",
    name: "Guest Name",
    location: "Country",
    title: "Amazing Guide!",
    text: "Strategically develop innovative solutions through customer-focused technologies. Proactively establish collaborative frameworks that encourage creativity, knowledge-sharing, and continuous improvement.",
    rating: 5,
    photo: "/images/person2.jpg",
    tour: "Night Safari",
    date: "February 2026",
    featured: true,
  },
  {
    id: "3",
    name: "Guest Name",
    location: "Country",
    title: "Wildlife Everywhere!",
    text: "Effectively transform complex ideas into scalable solutions. Proactively drive technological advancement through strategic partnerships, collaborative initiatives, and forward-thinking leadership.",
    rating: 5,
    photo: "/images/person3.jpg",
    tour: "Outdoor Safari",
    date: "February 2026",
    featured: true,
  },
  {
    id: "4",
    name: "Guest Name",
    location: "Country",
    title: "Highly Recommended!",
    text: "Dynamically enhance organizational capabilities through emerging technologies. Foster collaborative environments focused on innovation, strategic communication, and continuous business transformation.",
    rating: 4,
    photo: "/images/person1.jpg",
    tour: "Scooter Rental",
    date: "January 2026",
    featured: true,
  },
  {
    id: "5",
    name: "Guest Name",
    location: "Country",
    title: "Perfect Evening Drive",
    text: "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.",
    rating: 5,
    photo: "/images/person2.jpg",
    tour: "Tailor Made",
    date: "January 2026",
  },
  {
    id: "6",
    name: "Guest Name",
    location: "Country",
    title: "Worth Every Minute",
    text: "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.",
    rating: 5,
    photo: "/images/person3.jpg",
    tour: "Kumana Safari",
    date: "December 2025",
  },
];

export const reviewTours = [
  "All",
  ...Array.from(new Set(reviews.map((r) => r.tour))),
];
