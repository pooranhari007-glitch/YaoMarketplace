from datetime import date

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.models.calendar import BlockedDate, ExternalCalendar
from app.services.ical_service import merge_ical_into_blocked

router = APIRouter(prefix="/calendar", tags=["calendar"])


class BlockedDateCreate(BaseModel):
    start_date: date
    end_date: date
    reason: str = ""


class BlockedDateResponse(BaseModel):
    id: int
    start_date: date
    end_date: date
    reason: str

    model_config = {"from_attributes": True}


class ExternalCalendarCreate(BaseModel):
    name: str
    platform: str
    ical_url: str


class ExternalCalendarResponse(BaseModel):
    id: int
    name: str
    platform: str
    ical_url: str
    is_active: bool

    model_config = {"from_attributes": True}


@router.get("/blocked", response_model=list[BlockedDateResponse])
def list_blocked(db: Session = Depends(get_db)):
    return db.query(BlockedDate).order_by(BlockedDate.start_date).all()


@router.post("/blocked", response_model=BlockedDateResponse)
def create_blocked(
    payload: BlockedDateCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    blocked = BlockedDate(**payload.model_dump())
    db.add(blocked)
    db.commit()
    db.refresh(blocked)
    return blocked


@router.delete("/blocked/{blocked_id}")
def delete_blocked(blocked_id: int, db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    blocked = db.query(BlockedDate).filter(BlockedDate.id == blocked_id).first()
    if blocked:
        db.delete(blocked)
        db.commit()
    return {"ok": True}


@router.get("/availability")
def check_availability(
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
):
    conflicts = (
        db.query(BlockedDate)
        .filter(BlockedDate.start_date <= end_date, BlockedDate.end_date >= start_date)
        .count()
    )
    return {"available": conflicts == 0, "conflicts": conflicts}


@router.post("/external", response_model=ExternalCalendarResponse)
def add_external_calendar(
    payload: ExternalCalendarCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    cal = ExternalCalendar(**payload.model_dump())
    db.add(cal)
    db.commit()
    db.refresh(cal)
    return cal


@router.post("/external/{cal_id}/sync")
def sync_external_calendar(
    cal_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    from datetime import datetime, timezone

    cal = db.query(ExternalCalendar).filter(ExternalCalendar.id == cal_id).first()
    if not cal:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Calendar not found")
    count = merge_ical_into_blocked(db, cal.ical_url, cal.platform)
    cal.last_synced_at = datetime.now(timezone.utc)
    db.commit()
    return {"synced_events": count}
