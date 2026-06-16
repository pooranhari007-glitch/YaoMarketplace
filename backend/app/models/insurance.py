import enum
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class InsuranceStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class InsuranceDocument(Base):
    __tablename__ = "insurance_documents"

    id: Mapped[int] = mapped_column(primary_key=True)
    booking_id: Mapped[Optional[int]] = mapped_column(ForeignKey("bookings.id"), nullable=True)
    guest_email: Mapped[str] = mapped_column(String(255))
    file_path: Mapped[str] = mapped_column(String(500))
    original_filename: Mapped[str] = mapped_column(String(255))
    status: Mapped[InsuranceStatus] = mapped_column(
        Enum(InsuranceStatus), default=InsuranceStatus.PENDING
    )
    review_notes: Mapped[str] = mapped_column(String(500), default="")
    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    reviewed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
