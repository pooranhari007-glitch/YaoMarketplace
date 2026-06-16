from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


@router.post("", response_model=InquiryResponse)
def create_inquiry(payload: InquiryCreate, db: Session = Depends(get_db)):
    inquiry = Inquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("", response_model=list[InquiryResponse])
def list_inquiries(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()
