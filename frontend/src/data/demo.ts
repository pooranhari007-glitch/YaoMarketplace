/** Demo data — replace with live API metrics in production */

export const SITE = {
  name: "Harborview Estate",
  shortName: "Harborview",
  tagline: "Direct booking dashboard",
  location: "Pacific Northwest",
};

export const PRICING_DEMO = {
  stayNightly: 250,
  eventFrom: 1500,
  depositPercent: 50,
};

export const STATS = {
  occupancyRate: 78,
  occupancyChange: 12,
  monthlyRevenue: 18400,
  revenueChange: 8.4,
  upcomingBookings: 14,
  pendingInquiries: 3,
  avgStayLength: 2.4,
  eventBookings: 6,
};

export const OCCUPANCY_CHART = [
  { month: "Jan", stays: 62, events: 28 },
  { month: "Feb", stays: 58, events: 35 },
  { month: "Mar", stays: 71, events: 42 },
  { month: "Apr", stays: 75, events: 38 },
  { month: "May", stays: 82, events: 55 },
  { month: "Jun", stays: 88, events: 48 },
  { month: "Jul", stays: 91, events: 62 },
];

export const REVENUE_CHART = [
  { month: "Jan", revenue: 9200 },
  { month: "Feb", revenue: 8400 },
  { month: "Mar", revenue: 11200 },
  { month: "Apr", revenue: 12800 },
  { month: "May", revenue: 15600 },
  { month: "Jun", revenue: 17200 },
  { month: "Jul", revenue: 18400 },
];

export const BOOKING_MIX = [
  { name: "Stays", value: 68, color: "#6366f1" },
  { name: "Events", value: 32, color: "#22d3ee" },
];

export const AMENITIES_STAY = [
  "Private suites & ensuite baths",
  "Chef-ready kitchen",
  "High-speed Wi‑Fi",
  "Contactless check-in",
];

export const EVENT_TYPES = [
  { title: "Weddings", bookings: 12, capacity: 80 },
  { title: "Corporate", bookings: 8, capacity: 40 },
  { title: "Celebrations", bookings: 15, capacity: 60 },
  { title: "Retreats", bookings: 6, capacity: 24 },
];
