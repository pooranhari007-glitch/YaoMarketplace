import stripe
from fastapi import APIRouter, HTTPException, Request

from app.config import settings
from app.core.database import SessionLocal
from app.models.booking import Booking, BookingStatus

router = APIRouter(prefix="/webhooks", tags=["webhooks"])
stripe.api_key = settings.stripe_secret_key


@router.post("/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=503, detail="Webhook not configured")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        booking_id = session.get("metadata", {}).get("booking_id")
        if booking_id:
            db = SessionLocal()
            try:
                booking = db.query(Booking).filter(Booking.id == int(booking_id)).first()
                if booking:
                    booking.status = BookingStatus.CONFIRMED
                    booking.stripe_session_id = session.get("id")
                    db.commit()
            finally:
                db.close()
    return {"received": True}
