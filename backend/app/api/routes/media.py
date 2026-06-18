from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.media import MediaAsset
from app.schemas.media import MediaAssetCreate, MediaAssetResponse, MediaAssetUpdate

router = APIRouter(prefix="/media", tags=["media"])


@router.get("", response_model=list[MediaAssetResponse])
def list_media(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(MediaAsset).order_by(MediaAsset.sort_order, MediaAsset.id)
    if category:
        q = q.filter(MediaAsset.category == category)
    return q.all()


@router.post("", response_model=MediaAssetResponse)
def create_media(
    payload: MediaAssetCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    asset = MediaAsset(**payload.model_dump())
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@router.patch("/{asset_id}", response_model=MediaAssetResponse)
def update_media(
    asset_id: int,
    payload: MediaAssetUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Media not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(asset, field, value)
    db.commit()
    db.refresh(asset)
    return asset


@router.delete("/{asset_id}")
def delete_media(
    asset_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Media not found")
    db.delete(asset)
    db.commit()
    return {"ok": True}
