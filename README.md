# Direct Booking Platform

A full-stack direct booking system for property stays and private events, based on the project proposal (React + Python).

## Architecture

| Layer | Stack | Port |
|-------|-------|------|
| Public site | React + Vite | 5173 |
| Admin dashboard | React + Vite | 5174 |
| API | FastAPI + PostgreSQL | 8000 |

## Features (MVP scaffold)

**Public site**
- Dynamic CMS pages: Home, Stay, Events, Gallery, Policies, FAQ, Book
- Stay vs event booking flows with live pricing quotes
- Stripe checkout (when keys are configured)
- COI upload + insurance purchase link
- AI chat assistant (OpenAI when key is set)

**Backend**
- REST API with JWT admin auth
- Booking & pricing engine (nightly + event rates, deposits)
- Stripe webhooks
- iCal sync for Airbnb / VRBO / Peerspace
- Inquiry & insurance document handling

**Admin dashboard**
- Owner login
- CMS content editor
- Bookings, inquiries, insurance approval
- Calendar blocking + external iCal sync

## Quick start

### 1. API (no Docker required)

Uses **SQLite** by default so you don't need Postgres or Docker running locally.

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

**Optional — Postgres via Docker** (start Docker Desktop first):

```bash
docker compose up -d db
# In backend/.env set:
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/booking_platform
```

Default admin: `admin@example.com` / `admin123`

### 2. Public site

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Admin dashboard

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

Or run everything with Docker:

```bash
docker compose up
```

## Environment variables

See `backend/.env.example`, `frontend/.env.example`, and `admin/.env.example`.

Required for production:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY`
- `OPENAI_API_KEY` (for AI chat)
- `SECRET_KEY` (strong random value)
- SMTP settings for email notifications (to be wired)

## API docs

With the API running: http://localhost:8000/docs

## Project structure

```
├── backend/          # FastAPI API
├── frontend/         # Public React site
├── admin/            # Owner admin dashboard
└── docker-compose.yml
```

## Next steps

- [ ] Email notification service (booking confirmations, inquiry alerts)
- [ ] Rich CMS (WYSIWYG, image gallery upload)
- [ ] Stripe Elements embedded checkout
- [ ] ID verification integration
- [ ] Analytics dashboard
