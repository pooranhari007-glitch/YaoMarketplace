# Visual Direction — Client Demo

**Property demo name:** Harborview Estate *(replace with your property name)*

This document explains the design choices behind the four demo pages for client review.

---

## Design goals

Your property serves **two audiences** with different expectations:

| Audience | They need to feel… | Design response |
|----------|-------------------|-----------------|
| **Overnight guests** | Calm, clean, restorative | Forest green palette, interior photography, amenity lists |
| **Event clients** | Capable, professional, organized | Warm bronze accent, capacity info, COI/insurance section |
| **Both** | Trust to book direct | Trust bar, transparent pricing, secure checkout messaging |

---

## Brand & typography

- **Headings:** Playfair Display (serif) — elegance, estate/hospitality feel  
- **Body:** DM Sans (sans) — modern, readable, professional  
- **Colors:**
  - **Stays:** Sage / forest green (`#2f4f46`) — nature, calm  
  - **Events:** Warm bronze (`#6b4e3d`) — celebration, sophistication  
  - **Background:** Warm cream (`#f7f4ef`) — approachable, not clinical  
  - **Accent gold:** Eyebrow labels — subtle premium touch  

---

## Page-by-page

### Home
- Full-bleed hero with dual CTAs (availability + explore)
- Trust bar immediately below hero
- **Two pathway cards** — equal weight for Stays vs Events
- “Why book direct” feature grid
- Closing CTA banner with both booking types

### Stay
- Green-tinted hero, interior-focused imagery
- Amenity checklist + stacked photo composition
- Gallery preview → full gallery
- Cross-link to Events for combined bookings

### Events / Gatherings
- Bronze-tinted hero, celebration imagery
- Event type grid (weddings, corporate, etc.)
- Pricing callout card
- **Insurance (COI) section** — builds planner confidence
- Included services list

### Booking
- Compact hero + stepper (Dates → Details → Insurance → Payment)
- **Sidebar:** stay/event toggle, live quote, trust bullets
- Event flow includes COI upload step
- Deposit-first checkout messaging

---

## Demo URLs (local)

| Page | URL |
|------|-----|
| Home | http://localhost:5173/ |
| Stay | http://localhost:5173/stay |
| Events | http://localhost:5173/events |
| Book | http://localhost:5173/book |

Run: `cd frontend && npm run dev` (API on :8000 for live quotes)

---

## Customization for your property

1. **Name & copy** — edit `frontend/src/data/demo.ts`  
2. **Photos** — replace Unsplash URLs with your professional shots  
3. **Rates** — update `PRICING_DEMO` or admin pricing when live  
4. **Colors** — adjust CSS variables in `frontend/src/index.css`  

---

## What this demo proves to the client

- Clear **dual-audience** positioning (not a generic rental template)  
- **Professional** enough for corporate events and weddings  
- **Warm** enough for leisure stays  
- **Direct booking** CTAs throughout — not buried  
- Real booking flow with quotes tied to the API  

---

*Demo imagery via Unsplash (placeholder). Replace before production launch.*
