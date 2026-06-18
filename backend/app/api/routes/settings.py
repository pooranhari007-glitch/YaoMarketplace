from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.settings import SiteSetting
from app.schemas.settings import SiteSettingsResponse, SiteSettingsUpdate

SETTINGS_KEY = "public"
router = APIRouter(prefix="/settings", tags=["settings"])


def _load_settings(db: Session) -> dict:
    row = db.query(SiteSetting).filter(SiteSetting.key == SETTINGS_KEY).first()
    return row.value if row else {}


def _save_settings(db: Session, data: dict) -> dict:
    row = db.query(SiteSetting).filter(SiteSetting.key == SETTINGS_KEY).first()
    if row:
        row.value = {**row.value, **data}
    else:
        row = SiteSetting(key=SETTINGS_KEY, value=data)
        db.add(row)
    db.commit()
    db.refresh(row)
    return row.value


@router.get("/public", response_model=SiteSettingsResponse)
def get_public_settings(db: Session = Depends(get_db)):
    return SiteSettingsResponse(**_load_settings(db))


@router.patch("/public", response_model=SiteSettingsResponse)
def update_public_settings(
    payload: SiteSettingsUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    data = _save_settings(db, payload.model_dump(exclude_unset=True))
    return SiteSettingsResponse(**data)
