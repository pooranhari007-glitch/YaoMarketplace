export type PageSlug =
  | "home"
  | "stay"
  | "events"
  | "gallery"
  | "policies"
  | "faq"
  | "book";

export interface ContentPage {
  slug: PageSlug;
  title: string;
  body: string;
  meta_description: string;
  hero_image_url: string;
  extra_data: Record<string, unknown>;
}

export type BookingType = "stay" | "event";

export interface Quote {
  nights: number;
  subtotal: string;
  deposit_amount: string;
  total_amount: string;
  currency: string;
}

export interface CheckoutResult {
  booking_id: number;
  checkout_url: string | null;
}
