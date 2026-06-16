import enum
from datetime import datetime, timezone

from sqlalchemy import DateTime, Enum, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class PageSlug(str, enum.Enum):
    HOME = "home"
    STAY = "stay"
    EVENTS = "events"
    GALLERY = "gallery"
    POLICIES = "policies"
    FAQ = "faq"
    BOOK = "book"


class ContentPage(Base):
    __tablename__ = "content_pages"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[PageSlug] = mapped_column(Enum(PageSlug), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    body: Mapped[str] = mapped_column(Text, default="")
    meta_description: Mapped[str] = mapped_column(String(500), default="")
    hero_image_url: Mapped[str] = mapped_column(String(500), default="")
    extra_data: Mapped[dict] = mapped_column(JSON, default=dict)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
