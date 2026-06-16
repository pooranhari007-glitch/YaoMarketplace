import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Blocked {
  start_date: string;
  end_date: string;
  reason: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AvailabilityDashboard() {
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Blocked[]>("/calendar/blocked")
      .then(setBlocked)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  function isBlocked(day: number) {
    const d = new Date(year, month, day);
    const ds = d.toISOString().slice(0, 10);
    return blocked.some((b) => ds >= b.start_date && ds <= b.end_date);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const openDays = Array.from({ length: daysInMonth }, (_, i) => i + 1).filter((d) => !isBlocked(d)).length;

  return (
    <div className="avail-cal">
      <div className="avail-cal-head">
        <strong>{MONTHS[month]} {year}</strong>
        <span className="avail-live">{openDays} dates open</span>
      </div>

      <div className="avail-dow">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="avail-grid">
        {Array.from({ length: firstDow }).map((_, i) => (
          <span key={`e-${i}`} className="avail-cell empty" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const blockedDay = isBlocked(day);
          const isToday = day === today.getDate();
          return (
            <span
              key={day}
              className={`avail-cell ${blockedDay ? "blocked" : "open"} ${isToday ? "today" : ""}`}
              title={blockedDay ? "Unavailable" : "Available"}
            >
              {day}
            </span>
          );
        })}
      </div>

      {loading && <p className="avail-loading">Syncing calendar…</p>}

      <div className="avail-legend">
        <span><i className="dot open" /> Available</span>
        <span><i className="dot blocked" /> Booked</span>
      </div>

      <style>{`
        .avail-cal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .avail-cal-head strong {
          font-family: var(--font-display);
          font-size: 1.1rem;
        }
        .avail-live {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--green);
        }
        .avail-dow {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 4px;
        }
        .avail-dow span {
          text-align: center;
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .avail-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .avail-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 500;
          border-radius: 8px;
        }
        .avail-cell.empty { visibility: hidden; }
        .avail-cell.open { background: rgba(61, 122, 95, 0.1); color: var(--green); }
        .avail-cell.blocked { background: var(--surface-muted); color: var(--text-muted); text-decoration: line-through; opacity: 0.6; }
        .avail-cell.today { outline: 2px solid var(--forest); outline-offset: 1px; font-weight: 700; }
        .avail-loading { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.75rem; }
        .avail-legend {
          display: flex;
          gap: 1.25rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .avail-legend span { display: flex; align-items: center; gap: 0.35rem; }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          display: inline-block;
        }
        .dot.open { background: rgba(61, 122, 95, 0.35); }
        .dot.blocked { background: var(--border); }
      `}</style>
    </div>
  );
}
