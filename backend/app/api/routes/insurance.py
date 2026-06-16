import os
from typing import Optional
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.config import settings
from app.core.database import get_db
from app.models.insurance import InsuranceDocument, InsuranceStatus
from app.schemas.insurance import InsuranceDocumentResponse, InsuranceReview

router = APIRouter(prefix="/insurance", tags=["insurance"])


@router.post("/upload", response_model=InsuranceDocumentResponse)
async def upload_insurance(
    guest_email: str = Form(...),
    booking_id: Optional[int] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    upload_path = Path(settings.upload_dir)
    upload_path.mkdir(parents=True, exist_ok=True)
    ext = Path(file.filename or "doc.pdf").suffix
    filename = f"{uuid.uuid4()}{ext}"
    dest = upload_path / filename
    content = await file.read()
    dest.write_bytes(content)

    doc = InsuranceDocument(
        booking_id=booking_id,
        guest_email=guest_email,
        file_path=str(dest),
        original_filename=file.filename or filename,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("", response_model=list[InsuranceDocumentResponse])
def list_insurance(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(InsuranceDocument).order_by(InsuranceDocument.uploaded_at.desc()).all()


@router.patch("/{doc_id}", response_model=InsuranceDocumentResponse)
def review_insurance(
    doc_id: int,
    payload: InsuranceReview,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    from datetime import datetime, timezone

    doc = db.query(InsuranceDocument).filter(InsuranceDocument.id == doc_id).first()
    if not doc:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Document not found")
    doc.status = payload.status
    doc.review_notes = payload.review_notes
    doc.reviewed_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(doc)
    return doc
