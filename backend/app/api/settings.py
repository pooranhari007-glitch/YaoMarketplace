from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models import SiteSetting
from app.schemas import SiteSettingsOut, SiteSettingsUpdate

KEY = "public"
router = APIRouter(prefix="/settings", tags=["settings"])


def _get(db: Session) -> dict:
    row = db.query(SiteSetting).filter(SiteSetting.key == KEY).first()
    return row.value if row else {}


def _save(db: Session, data: dict) -> dict:
    row = db.query(SiteSetting).filter(SiteSetting.key == KEY).first()
    if row:
        row.value = {**row.value, **data}
    else:
        row = SiteSetting(key=KEY, value=data)
        db.add(row)
    db.commit()
    db.refresh(row)
    return row.value


@router.get("/public", response_model=SiteSettingsOut)
def public_settings(db: Session = Depends(get_db)):
    return SiteSettingsOut(**_get(db))


@router.patch("/public", response_model=SiteSettingsOut)
def update_settings(
    payload: SiteSettingsUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return SiteSettingsOut(**_save(db, payload.model_dump(exclude_unset=True)))
