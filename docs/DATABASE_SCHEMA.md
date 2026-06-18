# Database Schema — Milestone 1

PostgreSQL database: `booking_platform`

## Tables

### `admin_users`
| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | |
| email | varchar(255) unique | Login |
| hashed_password | varchar(255) | bcrypt |
| full_name | varchar(255) | |
| is_active | boolean | default true |
| created_at | timestamptz | |

### `site_settings`
| Column | Type | Notes |
|--------|------|-------|
| key | varchar(100) PK | e.g. `public` |
| value | jsonb | Branding, pricing display, amenities, event types |
| updated_at | timestamptz | |

### `content_pages`
| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | |
| slug | enum unique | home, stay, events, gallery, policies, faq, book |
| title | varchar(255) | |
| body | text | Page content (HTML/plain) |
| meta_description | varchar(500) | SEO |
| hero_image_url | varchar(500) | Hero/gallery images |
| extra_data | jsonb | Page-specific JSON |
| updated_at | timestamptz | |

### `media_assets`
| Column | Type | Notes |
|--------|------|-------|
| id | integer PK | |
| title | varchar(255) | |
| alt_text | varchar(500) | |
| url | varchar(1000) | Image URL |
| category | varchar(50) | gallery, hero, etc. |
| sort_order | integer | Display order |
| created_at | timestamptz | |

### `pricing_rules` *(seeded for M2)*
Stay/event rates and deposit rules.

### `bookings`, `blocked_dates`, `external_calendars`, `inquiries`, `insurance_documents`
Scaffolded for Milestones 2–3.

---

## API endpoints (M1)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | — | Health check |
| GET | `/api/v1/settings/public` | — | Site branding & config |
| GET | `/api/v1/content` | — | List all CMS pages |
| GET | `/api/v1/content/{slug}` | — | Single page |
| PATCH | `/api/v1/content/{slug}` | Admin | Update page |
| GET | `/api/v1/media` | — | Gallery images |
| POST | `/api/v1/auth/login` | — | Admin JWT |

Full docs: http://localhost:8000/docs

## Seed data

On first startup the API creates:
- Admin user `admin@example.com` / `admin123`
- All CMS pages with demo copy
- Site settings (Harborview Estate demo)
- 6 gallery images (Unsplash placeholders)
