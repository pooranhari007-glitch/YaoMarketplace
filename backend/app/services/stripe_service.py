from typing import Optional

import stripe

from app.config import settings

stripe.api_key = settings.stripe_secret_key


def create_checkout_session(
    booking_id: int,
    amount_cents: int,
    customer_email: str,
    description: str,
    success_url: str,
    cancel_url: str,
) -> Optional[str]:
    if not settings.stripe_secret_key:
        return None
    session = stripe.checkout.Session.create(
        mode="payment",
        customer_email=customer_email,
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": description},
                    "unit_amount": amount_cents,
                },
                "quantity": 1,
            }
        ],
        metadata={"booking_id": str(booking_id)},
        success_url=success_url,
        cancel_url=cancel_url,
    )
    return session.url
