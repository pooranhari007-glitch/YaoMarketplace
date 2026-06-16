from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.booking import Booking, BookingStatus
from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
    CheckoutResponse,
    QuoteRequest,
    QuoteResponse,
)
from app.services.pricing import calculate_quote
from app.services.stripe_service import create_checkout_session

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("/quote", response_model=QuoteResponse)
def get_quote(payload: QuoteRequest, db: Session = Depends(get_db)):
    nights, subtotal, deposit, total = calculate_quote(
        db, payload.booking_type, payload.start_date, payload.end_date, payload.guest_count
    )
    return QuoteResponse(
        nights=nights,
        subtotal=subtotal,
        deposit_amount=deposit,
        total_amount=total,
    )


@router.post("", response_model=CheckoutResponse)
def create_booking(
    payload: BookingCreate,
    db: Session = Depends(get_db),
    success_url: str = Query(default="http://localhost:5173/book/success"),
    cancel_url: str = Query(default="http://localhost:5173/book"),
):
    nights, subtotal, deposit, total = calculate_quote(
        db, payload.booking_type, payload.start_date, payload.end_date, payload.guest_count
    )
    booking = Booking(
        booking_type=payload.booking_type,
        status=BookingStatus.AWAITING_PAYMENT,
        guest_name=payload.guest_name,
        guest_email=payload.guest_email,
        guest_phone=payload.guest_phone,
        guest_count=payload.guest_count,
        notes=payload.notes,
        start_date=payload.start_date,
        end_date=payload.end_date,
        subtotal=subtotal,
        deposit_amount=deposit,
        total_amount=total,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    checkout_url = create_checkout_session(
        booking_id=booking.id,
        amount_cents=int(deposit * 100),
        customer_email=payload.guest_email,
        description=f"Booking deposit #{booking.id}",
        success_url=f"{success_url}?booking_id={booking.id}",
        cancel_url=cancel_url,
    )
    return CheckoutResponse(booking_id=booking.id, checkout_url=checkout_url)


@router.get("", response_model=list[BookingResponse])
def list_bookings(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking
