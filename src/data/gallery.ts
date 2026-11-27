export type ParkSlug = "kumana" | "yala" | "wilpattu" | "udawalawe";
export type Category = "Wildlife" | "Landscapes" | "Night" | "Rentals" | "Guests";

export type Park = {
  slug: ParkSlug;
  name: string;
  lat: number; // real latitude
  lng: number; // real longitude
  side: "left" | "right"; // which side of the pin the name sits
  bookType: string; // slug from packages.ts, used by the Book button
};

export type GalleryItem = {
  src: string;
  alt: string;
  park: ParkSlug;
  category: Category;
  ratio: number; // width / height, e.g. 4/3, 3/4, 1
};

/* ---------- the parks on the map ---------- */
export const parks: Park[] = [
  { slug: "wilpattu", name: "Wilpattu", lat: 8.4667, lng: 80.0167, side: "left", bookType: "wilpattu-safari" },
  { slug: "udawalawe", name: "Udawalawe", lat: 6.4333, lng: 80.9, side: "left", bookType: "udawalawe-safari" },
  { slug: "yala", name: "Yala", lat: 6.3736, lng: 81.5, side: "left", bookType: "yala-safari" },
  { slug: "kumana", name: "Kumana", lat: 6.5667, lng: 81.6667, side: "right", bookType: "kumana-safari" },
];

/* order the sections appear in, and the heading shown for each */
export const categoryOrder: Category[] = [
  "Wildlife",
  "Landscapes",
  "Night",
  "Rentals",
  "Guests",
];
export const categoryLabels: Record<Category, string> = {
  Wildlife: "Wildlife",
  Landscapes: "Landscapes",
  Night: "Night safari",
  Rentals: "Rentals",
  Guests: "Guests",
};

/* ---------- THE PHOTOS: add a line here and it appears on the page ----------
   park     = kumana | yala | wilpattu | udawalawe
   category = Wildlife | Landscapes | Night | Rentals | Guests
   A park or category with no photos is hidden automatically. */
export const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/1.jpg", alt: "Leopard resting on a branch", park: "kumana", category: "Wildlife", ratio: 3 / 4 },
  { src: "/images/gallery/2.jpg", alt: "Elephants at the waterhole", park: "kumana", category: "Wildlife", ratio: 4 / 3 },
  { src: "/images/gallery/7.jpg", alt: "Crocodile by the lagoon", park: "kumana", category: "Wildlife", ratio: 4 / 3 },
  { src: "/images/gallery/12.jpg", alt: "Peacock displaying", park: "kumana", category: "Wildlife", ratio: 16 / 10 },
  { src: "/images/gallery/3.jpg", alt: "Sunset over Kumana", park: "kumana", category: "Landscapes", ratio: 16 / 10 },
  { src: "/images/gallery/8.jpg", alt: "Misty morning plains", park: "kumana", category: "Landscapes", ratio: 3 / 4 },
  { src: "/images/gallery/4.jpg", alt: "Night drive spotlight", park: "kumana", category: "Night", ratio: 3 / 4 },
  { src: "/images/gallery/9.jpg", alt: "Owl at dusk", park: "kumana", category: "Night", ratio: 1 },
  { src: "/images/gallery/11.jpg", alt: "Bonfire dinner", park: "kumana", category: "Night", ratio: 3 / 4 },
  { src: "/images/gallery/5.jpg", alt: "Scooter on the coast road", park: "kumana", category: "Rentals", ratio: 1 },
  { src: "/images/gallery/10.jpg", alt: "Tuk-tuk adventure", park: "kumana", category: "Rentals", ratio: 4 / 3 },
  { src: "/images/gallery/6.jpg", alt: "Guests in the jeep", park: "kumana", category: "Guests", ratio: 4 / 3 },

  /* example for another park (remove the comment marks when you have the photo):
  { src: "/images/gallery/yala-1.jpg", alt: "Leopard in Yala", park: "yala", category: "Wildlife", ratio: 4 / 3 },
  */
];
