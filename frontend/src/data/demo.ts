/** Fallback when API is offline — CMS data lives in PostgreSQL */

export const FALLBACK_SITE = {
  site_name: "Harborview Estate",
  short_name: "Harborview",
  tagline: "Where the forest meets the sea",
  location: "Pacific Northwest Coast",
  email: "hello@harborview.example",
  phone: "(555) 234-8901",
  hero_headline: "Your private escape on six acres of coastal woodland",
  hero_subline:
    "Overnight stays for families and friends. Private events for weddings, retreats, and celebrations — all booked direct with no platform fees.",
  stay_nightly: 250,
  event_from: 1500,
  deposit_percent: 50,
  min_stay: 2,
  bedrooms: 4,
  sleeps: 10,
  event_capacity: 120,
  acres: 6,
  rating: 4.97,
  reviews: 84,
  trust_items: [
    "Book direct — save platform fees",
    "Instant confirmation",
    "Secure Stripe checkout",
    "Calendar synced with Airbnb & VRBO",
    "COI workflow for events",
  ],
  highlights: [
    { title: "Sleeps 10", desc: "Four ensuite suites with forest & water views" },
    { title: "120 guests", desc: "Indoor-outdoor event spaces with full catering prep" },
    { title: "6 acres", desc: "Trails, fire pit, meadow & private shoreline access" },
    { title: "4.97 ★", desc: "84 verified guest reviews" },
  ],
  amenities_stay: [
    "Private suites with ensuite baths",
    "Chef-ready kitchen & dining for 12",
    "High-speed Wi‑Fi throughout",
    "Contactless check-in",
    "Fire pit & outdoor dining",
    "Trail access to shoreline",
  ],
  event_types: [
    { title: "Weddings", desc: "Ceremony meadow, reception barn, overnight guest suites", capacity: 80 },
    { title: "Corporate retreats", desc: "Breakout spaces, A/V setup, team dining", capacity: 40 },
    { title: "Celebrations", desc: "Birthdays, reunions, milestone gatherings", capacity: 60 },
    { title: "Wellness retreats", desc: "Yoga lawn, quiet rooms, nature immersion", capacity: 24 },
  ],
};

export const FALLBACK_GALLERY = [
  { title: "Main residence", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { title: "Event meadow", url: "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=800&q=80" },
  { title: "Coastal trail", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { title: "Suite interior", url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80" },
  { title: "Fire pit evenings", url: "https://images.unsplash.com/photo-1478144592107-5f397ed3d2f3?w=800&q=80" },
  { title: "Dining room", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80";

export { HERO_IMAGE };
