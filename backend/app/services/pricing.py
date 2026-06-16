from datetime import date
from decimal import Decimal

from sqlalchemy.orm import Session

from app.models.booking import BookingType
from app.models.pricing import PricingRule


def calculate_quote(
    db: Session,
    booking_type: BookingType,
    start_date: date,
    end_date: date,
    guest_count: int,
) -> tuple[int, Decimal, Decimal, Decimal]:
    nights = max((end_date - start_date).days, 1)
    rule = (
        db.query(PricingRule)
        .filter(PricingRule.booking_type == booking_type, PricingRule.is_active.is_(True))
        .first()
    )

    nightly = Decimal(rule.nightly_rate or 0) if rule else Decimal("250")
    event_rate = Decimal(rule.event_rate or 0) if rule else Decimal("1500")
    deposit_pct = Decimal(rule.deposit_percent if rule else 50) / Decimal(100)

    if booking_type == BookingType.STAY:
        subtotal = nightly * nights
    else:
        subtotal = event_rate * max(guest_count, 1)

    deposit = (subtotal * deposit_pct).quantize(Decimal("0.01"))
    total = subtotal
    return nights, subtotal, deposit, total
