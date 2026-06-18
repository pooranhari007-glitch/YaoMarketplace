# Direct Booking Platform — Milestone Plan

**Total:** $480 USD (3 milestones × $160)  
**Stack:** React + FastAPI + PostgreSQL  
**Repo:** https://github.com/pooranhari007-glitch/direct-booking-platform

---

## Milestone 1 — Foundation & Public Site ✅ *current*

**Duration:** Weeks 1–2 · **Payment:** $160 (33%)

| Area | Delivered |
|------|-----------|
| PostgreSQL | Docker database with users, settings, content, media tables |
| Backend | FastAPI skeleton, JWT admin auth, CMS + settings + media APIs |
| Public site | React, mobile-responsive, CMS-driven pages |
| Pages | Home, Stay, Events, Gallery, Policies, FAQ |
| SEO | Page titles + meta descriptions from API |
| Staging | Public site on GitHub Pages + API via Docker/local |

**Sign-off:** Client approves look/feel, page structure, staging access.

---

## Milestone 2 — Booking Engine, Payments & Admin

**Duration:** Weeks 3–5 · **Payment:** $160 (33%)

Combines original proposal M2 + M3:

- Stay & event booking flows with live quotes
- Stripe deposit checkout + webhooks
- Full admin dashboard (CMS editor, bookings, calendar, insurance)
- iCal sync (Airbnb / VRBO / Peerspace)
- Inquiry handling
- API deployed to Render/Railway

**Sign-off:** End-to-end booking with test Stripe payment; admin can manage content and bookings.

---

## Milestone 3 — AI, Polish & Launch

**Duration:** Weeks 6–7 · **Payment:** $160 (34%)

- AI guest chat (OpenAI)
- COI upload workflow
- Email notifications
- Performance polish, client branding/photos
- Production domain + final launch checklist

**Sign-off:** Production-ready handoff with documentation and client training.

---

## Quick start (Milestone 1)

```bash
# 1. Start PostgreSQL
docker compose up -d db

# 2. API
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 3. Public site
cd frontend && npm install && npm run dev
```

- **Public site:** http://localhost:5173  
- **API docs:** http://localhost:8000/docs  
- **Admin login:** `admin@example.com` / `admin123`  
- **Live staging:** https://pooranhari007-glitch.github.io/YaoMarketplace/
