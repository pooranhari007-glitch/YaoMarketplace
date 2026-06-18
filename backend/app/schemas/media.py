from typing import Optional

from pydantic import BaseModel


class MediaAssetResponse(BaseModel):
    id: int
    title: str
    alt_text: str
    url: str
    category: str
    sort_order: int

    model_config = {"from_attributes": True}


class MediaAssetCreate(BaseModel):
    title: str = ""
    alt_text: str = ""
    url: str
    category: str = "gallery"
    sort_order: int = 0


class MediaAssetUpdate(BaseModel):
    title: Optional[str] = None
    alt_text: Optional[str] = None
    url: Optional[str] = None
    category: Optional[str] = None
    sort_order: Optional[int] = None
