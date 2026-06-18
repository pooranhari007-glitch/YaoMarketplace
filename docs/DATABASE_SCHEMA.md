# Database Schema — M1

Database: `direct_booking` (PostgreSQL)

## Tables

### admin_users
| Column | Type |
|--------|------|
| id | serial PK |
| email | varchar unique |
| hashed_password | varchar |
| full_name | varchar |
| is_active | boolean |
| created_at | timestamptz |

### site_settings
| Column | Type |
|--------|------|
| key | varchar PK (`public`) |
| value | jsonb |
| updated_at | timestamptz |

### content_pages
| Column | Type |
|--------|------|
| id | serial PK |
| slug | enum (home, stay, events, gallery, policies, faq) |
| title | varchar |
| body | text |
| meta_description | varchar |
| hero_image_url | varchar |
| updated_at | timestamptz |

### media_assets
| Column | Type |
|--------|------|
| id | serial PK |
| title, alt_text | varchar |
| url | varchar |
| category | varchar |
| sort_order | int |
| created_at | timestamptz |

## API

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | — |
| POST | `/api/v1/auth/login` | — |
| GET | `/api/v1/settings/public` | — |
| PATCH | `/api/v1/settings/public` | Admin |
| GET | `/api/v1/content` | — |
| GET | `/api/v1/content/{slug}` | — |
| PATCH | `/api/v1/content/{slug}` | Admin |
| GET | `/api/v1/media` | — |
