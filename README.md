# Direct Booking Platform

Fresh **Milestone 1** build — public site + API + PostgreSQL.

## Stack

| Layer | Tech | Port |
|-------|------|------|
| Public site | React + Vite | 5173 |
| API | FastAPI | 8000 |
| Database | PostgreSQL 16 (Docker) | 5434 |

## Quick start

```bash
# 1. Database
docker compose up -d db

# 2. API
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload

# 3. Public site
cd frontend
npm install
npm run dev
```

- **Site:** http://localhost:5173  
- **API docs:** http://localhost:8000/docs  
- **Admin login:** `admin@example.com` / `admin123`

## Milestone plan

See [docs/MILESTONES.md](docs/MILESTONES.md) — 3 milestones, M1 in progress.

## M1 scope

- PostgreSQL: users, settings, content pages, media
- CMS API + JWT admin auth
- Public pages: Home, Stay, Events, Gallery, Policies, FAQ
- SEO meta from API
- Staging: GitHub Pages (frontend)

**M2 adds:** booking engine, Stripe, admin dashboard  
**M3 adds:** AI chat, polish, production launch
