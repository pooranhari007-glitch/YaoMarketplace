from decimal import Decimal

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.booking import BookingType
from app.models.content import ContentPage, PageSlug
from app.models.pricing import PricingRule
from app.models.user import AdminUser

DEFAULT_PAGES = {
    PageSlug.HOME: {
        "title": "Welcome",
        "body": "Book your stay or host your next event directly with us.",
        "meta_description": "Direct booking for stays and private events.",
    },
    PageSlug.STAY: {
        "title": "Stay With Us",
        "body": "Comfortable accommodations with flexible nightly rates.",
        "meta_description": "Book a stay at our property.",
    },
    PageSlug.EVENTS: {
        "title": "Events & Gatherings",
        "body": "Host weddings, retreats, and celebrations in a beautiful setting.",
        "meta_description": "Book your private event.",
    },
    PageSlug.GALLERY: {
        "title": "Gallery",
        "body": "Explore photos of the property and past events.",
        "meta_description": "Property photo gallery.",
        "extra_data": {"images": []},
    },
    PageSlug.POLICIES: {
        "title": "Policies",
        "body": "Cancellation, house rules, and booking policies.",
        "meta_description": "Booking and cancellation policies.",
    },
    PageSlug.FAQ: {
        "title": "FAQ",
        "body": "Frequently asked questions about stays and events.",
        "meta_description": "Frequently asked questions.",
    },
    PageSlug.BOOK: {
        "title": "Book Now",
        "body": "Select your dates and complete your reservation.",
        "meta_description": "Book a stay or event.",
    },
}


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
        if not db.query(ContentPage).first():
            for slug, data in DEFAULT_PAGES.items():
                db.add(
                    ContentPage(
                        slug=slug,
                        title=data["title"],
                        body=data["body"],
                        meta_description=data["meta_description"],
                        extra_data=data.get("extra_data", {}),
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
