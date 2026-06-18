from decimal import Decimal

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.booking import BookingType
from app.models.content import ContentPage, PageSlug
from app.models.media import MediaAsset
from app.models.pricing import PricingRule
from app.models.settings import SiteSetting
from app.models.user import AdminUser

DEFAULT_SETTINGS = {
    "site_name": "Harborview Estate",
    "short_name": "Harborview",
    "tagline": "Where the forest meets the sea",
    "location": "Pacific Northwest Coast",
    "email": "hello@harborview.example",
    "phone": "(555) 234-8901",
    "hero_headline": "Your private escape on six acres of coastal woodland",
    "hero_subline": (
        "Overnight stays for families and friends. Private events for weddings, "
        "retreats, and celebrations — all booked direct with no platform fees."
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
        {"title": "Sleeps 10", "desc": "Four ensuite suites with forest & water views"},
        {"title": "120 guests", "desc": "Indoor-outdoor event spaces with full catering prep"},
        {"title": "6 acres", "desc": "Trails, fire pit, meadow & private shoreline access"},
        {"title": "4.97 ★", "desc": "84 verified guest reviews"},
    ],
    "amenities_stay": [
        "Private suites with ensuite baths",
        "Chef-ready kitchen & dining for 12",
        "High-speed Wi‑Fi throughout",
        "Contactless check-in",
        "Fire pit & outdoor dining",
        "Trail access to shoreline",
    ],
    "event_types": [
        {"title": "Weddings", "desc": "Ceremony meadow, reception barn, overnight guest suites", "capacity": 80},
        {"title": "Corporate retreats", "desc": "Breakout spaces, A/V setup, team dining", "capacity": 40},
        {"title": "Celebrations", "desc": "Birthdays, reunions, milestone gatherings", "capacity": 60},
        {"title": "Wellness retreats", "desc": "Yoga lawn, quiet rooms, nature immersion", "capacity": 24},
    ],
}

DEFAULT_PAGES = {
    PageSlug.HOME: {
        "title": "Harborview Estate",
        "body": "Book your stay or host your next event directly with us.",
        "meta_description": "Direct booking for stays and private events on the Pacific Northwest coast.",
        "hero_image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    },
    PageSlug.STAY: {
        "title": "Overnight Stays",
        "body": (
            "Four ensuite suites on six acres — wake to forest light, cook together, "
            "walk to the shoreline. Book direct and skip the platform markup."
        ),
        "meta_description": "Private overnight stays at Harborview Estate. Sleeps 10, chef's kitchen, trails & fire pit.",
        "hero_image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    },
    PageSlug.EVENTS: {
        "title": "Private Events",
        "body": (
            "Weddings, corporate retreats, reunions, and milestone gatherings — "
            "indoor-outdoor spaces for up to 120 guests on six private acres."
        ),
        "meta_description": "Host weddings, corporate events, and celebrations at Harborview Estate.",
        "hero_image_url": "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=1200&q=80",
    },
    PageSlug.GALLERY: {
        "title": "Gallery",
        "body": "Explore the estate — residence, event meadow, coastal trails, and interiors.",
        "meta_description": "Photo gallery of Harborview Estate.",
        "extra_data": {"images": []},
    },
    PageSlug.POLICIES: {
        "title": "Policies",
        "body": (
            "Cancellation: Full refund 30+ days before check-in. 50% refund 14–29 days. "
            "No refund within 14 days.\n\n"
            "House rules: Quiet hours 10pm–8am. No smoking indoors. Events require COI. "
            "Maximum occupancy as listed per booking type."
        ),
        "meta_description": "Booking, cancellation, and house policies.",
    },
    PageSlug.FAQ: {
        "title": "FAQ",
        "body": (
            "Q: What is the minimum stay?\nA: 2 nights for overnight bookings.\n\n"
            "Q: Do you sync with Airbnb and VRBO?\nA: Yes — our calendar blocks dates booked on other platforms.\n\n"
            "Q: Is insurance required for events?\nA: Yes. Upload your COI during the booking process.\n\n"
            "Q: How does payment work?\nA: 50% deposit at booking via Stripe. Balance due before arrival."
        ),
        "meta_description": "Frequently asked questions about stays and events.",
    },
    PageSlug.BOOK: {
        "title": "Book Now",
        "body": "Select your dates, get an instant quote, and secure your reservation with a deposit.",
        "meta_description": "Book a stay or private event at Harborview Estate.",
    },
}

DEFAULT_GALLERY = [
    ("Main residence", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"),
    ("Event meadow", "https://images.unsplash.com/photo-1519167758481-83f29da8c2f2?w=800&q=80"),
    ("Coastal trail", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"),
    ("Suite interior", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"),
    ("Fire pit evenings", "https://images.unsplash.com/photo-1478144592107-5f397ed3d2f3?w=800&q=80"),
    ("Dining room", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"),
]


def seed_database():
    db = SessionLocal()
    try:
        if not db.query(AdminUser).first():
            db.add(
                AdminUser(
                    email="admin@example.com",
                    hashed_password=hash_password("admin123"),
                    full_name="Property Owner",
                )
            )
        if not db.query(SiteSetting).filter(SiteSetting.key == "public").first():
            db.add(SiteSetting(key="public", value=DEFAULT_SETTINGS))
        if not db.query(ContentPage).first():
            for slug, data in DEFAULT_PAGES.items():
                db.add(
                    ContentPage(
                        slug=slug,
                        title=data["title"],
                        body=data["body"],
                        meta_description=data["meta_description"],
                        hero_image_url=data.get("hero_image_url", ""),
                        extra_data=data.get("extra_data", {}),
                    )
                )
        if not db.query(MediaAsset).first():
            for i, (title, url) in enumerate(DEFAULT_GALLERY):
                db.add(
                    MediaAsset(
                        title=title,
                        alt_text=title,
                        url=url,
                        category="gallery",
                        sort_order=i,
                    )
                )
        if not db.query(PricingRule).first():
            db.add(
                PricingRule(
                    booking_type=BookingType.STAY,
                    name="Standard Stay",
                    nightly_rate=Decimal("250"),
                    deposit_percent=Decimal("50"),
                    min_nights=2,
                )
            )
            db.add(
                PricingRule(
                    booking_type=BookingType.EVENT,
                    name="Event Gathering",
                    event_rate=Decimal("1500"),
                    deposit_percent=Decimal("50"),
                )
            )
        db.commit()
    finally:
        db.close()
