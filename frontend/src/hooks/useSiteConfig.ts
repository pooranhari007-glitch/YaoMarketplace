import { useEffect, useState } from "react";
import { api } from "../api/client";
import { FALLBACK_SITE } from "../data/demo";
import type { ContentPage, PageSlug } from "../types";

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

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<SiteConfig>("/settings/public")
      .then(setConfig)
      .catch(() => setConfig(null))
      .finally(() => setLoading(false));
  }, []);

  const site = config ?? FALLBACK_SITE;
  return { site, loading, fromApi: !!config };
}

export function usePageContent(slug: PageSlug) {
  const [page, setPage] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<ContentPage>(`/content/${slug}`)
      .then(setPage)
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return { page, loading };
}

export function useGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    api<MediaItem[]>("/media?category=gallery")
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return items;
}
