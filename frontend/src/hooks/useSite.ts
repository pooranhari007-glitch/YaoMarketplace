import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { ContentPage, MediaItem, PageSlug, SiteConfig } from "../types";

const FALLBACK: SiteConfig = {
  site_name: "Harborview Estate",
  short_name: "Harborview",
  tagline: "Where the forest meets the sea",
  location: "Pacific Northwest Coast",
  email: "hello@harborview.example",
  phone: "(555) 234-8901",
  hero_headline: "Your private escape on six acres",
  hero_subline: "Overnight stays and private events — book direct.",
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
  trust_items: ["Book direct", "No platform fees"],
  highlights: [],
  amenities_stay: [],
  event_types: [],
};

export function useSite() {
  const [site, setSite] = useState<SiteConfig>(FALLBACK);
  useEffect(() => {
    api<SiteConfig>("/settings/public").then(setSite).catch(() => {});
  }, []);
  return site;
}

export function usePage(slug: PageSlug) {
  const [page, setPage] = useState<ContentPage | null>(null);
  useEffect(() => {
    api<ContentPage>(`/content/${slug}`).then(setPage).catch(() => {});
  }, [slug]);
  return page;
}

export function useGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  useEffect(() => {
    api<MediaItem[]>("/media?category=gallery").then(setItems).catch(() => {});
  }, []);
  return items;
}
