from datetime import date
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.booking import BookingStatus, BookingType


class QuoteRequest(BaseModel):
    booking_type: BookingType
    start_date: date
    end_date: date
    guest_count: int = Field(ge=1, le=500)


class QuoteResponse(BaseModel):
    nights: int
    subtotal: Decimal
    deposit_amount: Decimal
    total_amount: Decimal
    currency: str = "usd"


class BookingCreate(BaseModel):
    booking_type: BookingType
    start_date: date
    end_date: date
    guest_name: str
    guest_email: EmailStr
    guest_phone: str = ""
    guest_count: int = Field(ge=1, le=500)
    notes: str = ""


class BookingResponse(BaseModel):
    id: int
    booking_type: BookingType
    status: BookingStatus
    guest_name: str
    guest_email: str
    guest_phone: str
    guest_count: int
    start_date: date
    end_date: date
    subtotal: Decimal
    deposit_amount: Decimal
    total_amount: Decimal

    model_config = {"from_attributes": True}


class CheckoutResponse(BaseModel):
    booking_id: int
    checkout_url: Optional[str] = None
    client_secret: Optional[str] = None
