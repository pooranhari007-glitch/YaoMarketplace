from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import AdminUser, ContentPage, MediaAsset, PageSlug, SiteSetting

SITE = {
    "site_name": "Harborview Estate",
    "short_name": "Harborview",
    "tagline": "Where the forest meets the sea",
    "location": "Pacific Northwest Coast",
    "email": "hello@harborview.example",
    "phone": "(555) 234-8901",
    "hero_headline": "Your private escape on six acres of coastal woodland",
    "hero_subline": (
        "Overnight stays and private events — book direct with no platform fees."
    ),
    "stay_nightly": 250,
    "event_from": 1500,
    "deposit_percent": 50,
    "min_stay": 2,
    "bedrooms": 4,
    "sleeps": 10,
    "event_capacity": 120,
    "acres": 6,
    "rating": 4.97,
    "reviews": 84,
    "trust_items": [
        "Book direct — save platform fees",
        "Instant confirmation",
        "Secure Stripe checkout",
        "Calendar synced with Airbnb & VRBO",
        "COI workflow for events",
    ],
    "highlights": [
        {"title": "Sleeps 10", "desc": "Four ensuite suites"},
        {"title": "120 guests", "desc": "Indoor-outdoor event spaces"},
        {"title": "6 acres", "desc": "Trails, fire pit & shoreline"},
        {"title": "4.97 ★", "desc": "84 guest reviews"},
    ],
    "amenities_stay": [
        "Private suites with ensuite baths",
        "Chef-ready kitchen",
        "High-speed Wi‑Fi",
        "Contactless check-in",
        "Fire pit & outdoor dining",
        "Trail access to shoreline",
    ],
    "event_types": [
        {"title": "Weddings", "desc": "Ceremony meadow & reception barn", "capacity": 80},
        {"title": "Corporate", "desc": "Retreats with A/V & dining", "capacity": 40},
        {"title": "Celebrations", "desc": "Reunions & milestones", "capacity": 60},
        {"title": "Wellness", "desc": "Yoga lawn & quiet rooms", "capacity": 24},
    ],
}

PAGES = {
    PageSlug.HOME: {
        "title": "Harborview Estate",
        "body": "Book your stay or host your next event directly with us.",
        "meta_description": "Direct booking for stays and private events.",
        "hero_image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    },
    PageSlug.STAY: {
        "title": "Overnight Stays",
        "body": "A private home on six acres — suites, kitchen, trails, and fire pit.",
        "meta_description": "Book an overnight stay at Harborview Estate.",
        "hero_image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
    PageSlug.EVENTS: {
        "title": "Private Events",
        "body": "Weddings, retreats, and celebrations for up to 120 guests.",
        "meta_description": "Host your event at Harborview Estate.",
        "hero_image_url": "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=1200&q=80",
    },
    PageSlug.GALLERY: {
        "title": "Gallery",
        "body": "Explore the estate — residence, meadow, trails, and interiors.",
        "meta_description": "Property photo gallery.",
        "hero_image_url": "",
    },
    PageSlug.POLICIES: {
        "title": "Policies",
        "body": (
            "Cancellation: Full refund 30+ days before check-in.\n"
            "House rules: Quiet hours 10pm–8am. No smoking indoors."
        ),
        "meta_description": "Booking and cancellation policies.",
        "hero_image_url": "",
    },
    PageSlug.FAQ: {
        "title": "FAQ",
        "body": (
            "Q: Minimum stay?\nA: 2 nights.\n\n"
            "Q: Calendar sync?\nA: Airbnb & VRBO iCal supported in Milestone 2."
        ),
        "meta_description": "Frequently asked questions.",
        "hero_image_url": "",
    },
}

GALLERY = [
    ("Main residence", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"),
    ("Event meadow", "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=800&q=80"),
    ("Coastal trail", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"),
    ("Suite interior", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"),
    ("Fire pit", "https://images.unsplash.com/photo-1478144592107-5f397ed3d2f3?w=800&q=80"),
    ("Dining room", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"),
]


def seed():
    db = SessionLocal()
    try:
        if not db.query(AdminUser).first():
            db.add(AdminUser(
                email="admin@example.com",
                hashed_password=hash_password("admin123"),
                full_name="Property Owner",
            ))
        if not db.query(SiteSetting).filter(SiteSetting.key == "public").first():
            db.add(SiteSetting(key="public", value=SITE))
        if not db.query(ContentPage).first():
            for slug, data in PAGES.items():
                db.add(ContentPage(slug=slug, **data))
        if not db.query(MediaAsset).first():
            for i, (title, url) in enumerate(GALLERY):
                db.add(MediaAsset(title=title, alt_text=title, url=url, sort_order=i))
        db.commit()
    finally:
        db.close()
