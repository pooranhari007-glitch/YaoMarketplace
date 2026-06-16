from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.models.insurance import InsuranceStatus


class InsuranceDocumentResponse(BaseModel):
    id: int
    booking_id: Optional[int]
    guest_email: str
    original_filename: str
    status: InsuranceStatus
    review_notes: str
    uploaded_at: datetime

    model_config = {"from_attributes": True}


class InsuranceReview(BaseModel):
    status: InsuranceStatus
    review_notes: str = ""
