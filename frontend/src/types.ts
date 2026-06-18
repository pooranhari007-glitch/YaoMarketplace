export type PageSlug = "home" | "stay" | "events" | "gallery" | "policies" | "faq";

export interface ContentPage {
  slug: PageSlug;
  title: string;
  body: string;
  meta_description: string;
  hero_image_url: string;
}

export interface SiteConfig {
  site_name: string;
  short_name: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  hero_headline: string;
  hero_subline: string;
  stay_nightly: number;
  event_from: number;
  deposit_percent: number;
  min_stay: number;
  bedrooms: number;
  sleeps: number;
  event_capacity: number;
  acres: number;
  rating: number;
  reviews: number;
  trust_items: string[];
  highlights: { title: string; desc: string }[];
  amenities_stay: string[];
  event_types: { title: string; desc: string; capacity: number }[];
}

export interface MediaItem {
  id: number;
  title: string;
  alt_text: string;
  url: string;
  category: string;
  sort_order: number;
}
