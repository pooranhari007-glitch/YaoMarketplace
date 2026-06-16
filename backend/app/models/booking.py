import enum
from datetime import date, datetime, timezone
from decimal import Decimal
from typing import Optional

from sqlalchemy import Date, DateTime, Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class BookingType(str, enum.Enum):
    STAY = "stay"
    EVENT = "event"


class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    AWAITING_PAYMENT = "awaiting_payment"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    REJECTED = "rejected"


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(primary_key=True)
    booking_type: Mapped[BookingType] = mapped_column(Enum(BookingType))
    status: Mapped[BookingStatus] = mapped_column(Enum(BookingStatus), default=BookingStatus.PENDING)

    guest_name: Mapped[str] = mapped_column(String(255))
    guest_email: Mapped[str] = mapped_column(String(255))
    guest_phone: Mapped[str] = mapped_column(String(50), default="")
    guest_count: Mapped[int] = mapped_column(default=1)
    notes: Mapped[str] = mapped_column(Text, default="")

    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)

    subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0)
    deposit_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0)
    total_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0)

    stripe_payment_intent_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    stripe_session_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    insurance_document_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("insurance_documents.id"), nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
