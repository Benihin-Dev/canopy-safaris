export type GalleryItem = {
  src: string;
  alt: string;
  category: "Wildlife" | "Landscapes" | "Night" | "Rentals" | "Guests";
  ratio: number; // width / height, e.g. 4/3, 3/4, 1
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/1.jpg",
    alt: "Leopard resting on a branch",
    category: "Wildlife",
    ratio: 3 / 4,
  },
  {
    src: "/images/gallery/2.jpg",
    alt: "Elephants at the waterhole",
    category: "Wildlife",
    ratio: 4 / 3,
  },
  {
    src: "/images/gallery/3.jpg",
    alt: "Sunset over Kumana",
    category: "Landscapes",
    ratio: 16 / 10,
  },
  {
    src: "/images/gallery/4.jpg",
    alt: "Night drive spotlight",
    category: "Night",
    ratio: 3 / 4,
  },
  {
    src: "/images/gallery/5.jpg",
    alt: "Scooter on the coast road",
    category: "Rentals",
    ratio: 1,
  },
  {
    src: "/images/gallery/6.jpg",
    alt: "Guests in the jeep",
    category: "Guests",
    ratio: 4 / 3,
  },
  {
    src: "/images/gallery/7.jpg",
    alt: "Crocodile by the lagoon",
    category: "Wildlife",
    ratio: 4 / 3,
  },
  {
    src: "/images/gallery/8.jpg",
    alt: "Misty morning plains",
    category: "Landscapes",
    ratio: 3 / 4,
  },
  {
    src: "/images/gallery/9.jpg",
    alt: "Owl at dusk",
    category: "Night",
    ratio: 1,
  },
  {
    src: "/images/gallery/10.jpg",
    alt: "Tuk-tuk adventure",
    category: "Rentals",
    ratio: 4 / 3,
  },
  {
    src: "/images/gallery/11.jpg",
    alt: "Bonfire dinner",
    category: "Guests",
    ratio: 3 / 4,
  },
  {
    src: "/images/gallery/12.jpg",
    alt: "Peacock displaying",
    category: "Wildlife",
    ratio: 16 / 10,
  },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((g) => g.category))),
];
