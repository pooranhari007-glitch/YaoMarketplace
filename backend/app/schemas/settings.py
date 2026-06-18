from typing import Optional

from pydantic import BaseModel


class SiteSettingsResponse(BaseModel):
    site_name: str
    short_name: str
    tagline: str
    location: str
    email: str
    phone: str
    hero_headline: str
    hero_subline: str
    stay_nightly: int
    event_from: int
    deposit_percent: int
    min_stay: int
    bedrooms: int
    sleeps: int
    event_capacity: int
    acres: int
    rating: float
    reviews: int
    trust_items: list[str]
    highlights: list[dict]
    amenities_stay: list[str]
    event_types: list[dict]


class SiteSettingsUpdate(BaseModel):
    site_name: Optional[str] = None
    short_name: Optional[str] = None
    tagline: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    hero_headline: Optional[str] = None
    hero_subline: Optional[str] = None
    stay_nightly: Optional[int] = None
    event_from: Optional[int] = None
    deposit_percent: Optional[int] = None
    min_stay: Optional[int] = None
    bedrooms: Optional[int] = None
    sleeps: Optional[int] = None
    event_capacity: Optional[int] = None
    acres: Optional[int] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    trust_items: Optional[list[str]] = None
    highlights: Optional[list[dict]] = None
    amenities_stay: Optional[list[str]] = None
    event_types: Optional[list[dict]] = None
