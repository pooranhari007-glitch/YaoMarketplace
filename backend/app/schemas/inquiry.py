from datetime import datetime

from pydantic import BaseModel, EmailStr


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    subject: str = ""
    message: str


class InquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    subject: str
    message: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
