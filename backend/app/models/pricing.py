from decimal import Decimal
from typing import Optional

from sqlalchemy import Boolean, Enum, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.booking import BookingType


class PricingRule(Base):
    __tablename__ = "pricing_rules"

    id: Mapped[int] = mapped_column(primary_key=True)
    booking_type: Mapped[BookingType] = mapped_column(Enum(BookingType))
    name: Mapped[str] = mapped_column(String(100))
    nightly_rate: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    event_rate: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    deposit_percent: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=50)
    min_nights: Mapped[int] = mapped_column(default=1)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
