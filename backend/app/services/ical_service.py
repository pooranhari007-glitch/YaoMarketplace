from datetime import date
from io import StringIO

import httpx
from icalendar import Calendar

from app.models.calendar import BlockedDate


def fetch_blocked_dates_from_ical(ical_url: str) -> list[tuple[date, date, str]]:
    """Parse an external iCal feed and return date ranges."""
    blocked: list[tuple[date, date, str]] = []
    try:
        response = httpx.get(ical_url, timeout=15.0)
        response.raise_for_status()
        cal = Calendar.from_ical(response.text)
        for component in cal.walk():
            if component.name != "VEVENT":
                continue
            dtstart = component.get("dtstart")
            dtend = component.get("dtend")
            if not dtstart or not dtend:
                continue
            start = dtstart.dt.date() if hasattr(dtstart.dt, "date") else dtstart.dt
            end = dtend.dt.date() if hasattr(dtend.dt, "date") else dtend.dt
            summary = str(component.get("summary", "External booking"))
            blocked.append((start, end, summary))
    except Exception:
        pass
    return blocked


def merge_ical_into_blocked(db, ical_url: str, platform: str) -> int:
    count = 0
    for start, end, reason in fetch_blocked_dates_from_ical(ical_url):
        exists = (
            db.query(BlockedDate)
            .filter(
                BlockedDate.start_date == start,
                BlockedDate.end_date == end,
                BlockedDate.reason.contains(platform),
            )
            .first()
        )
        if not exists:
            db.add(
                BlockedDate(
                    start_date=start,
                    end_date=end,
                    reason=f"[{platform}] {reason}",
                )
            )
            count += 1
    db.commit()
    return count
