from typing import Optional

from pydantic import BaseModel

from app.models.content import PageSlug


class ContentPageResponse(BaseModel):
    slug: PageSlug
    title: str
    body: str
    meta_description: str
    hero_image_url: str
    extra_data: dict

    model_config = {"from_attributes": True}


class ContentPageUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    meta_description: Optional[str] = None
    hero_image_url: Optional[str] = None
    extra_data: Optional[dict] = None
