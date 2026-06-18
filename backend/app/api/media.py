from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import MediaAsset
from app.schemas import MediaOut

router = APIRouter(prefix="/media", tags=["media"])


@router.get("", response_model=list[MediaOut])
def list_media(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(MediaAsset).order_by(MediaAsset.sort_order, MediaAsset.id)
    if category:
        q = q.filter(MediaAsset.category == category)
    return q.all()
