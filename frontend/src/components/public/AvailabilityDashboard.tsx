import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Blocked {
  start_date: string;
  end_date: string;
  reason: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  const blockedDays = daysInMonth - openDays;
  const openPct = Math.round((openDays / daysInMonth) * 100);

  return (
    <div className="avail-dash">
      <div className="avail-metrics">
        <div className="am">
          <span className="am-val" style={{ color: "var(--green)" }}>{openDays}</span>
          <span className="am-lbl">Open days</span>
        </div>
        <div className="am">
          <span className="am-val" style={{ color: "var(--red)" }}>{blockedDays}</span>
          <span className="am-lbl">Booked</span>
        </div>
        <div className="am">
          <span className="am-val" style={{ color: "var(--cyan)" }}>{openPct}%</span>
          <span className="am-lbl">Available</span>
        </div>
      </div>

      <div className="avail-cal-head">
        <strong>{MONTHS[month]} {year}</strong>
        <span className="live-tag"><i /> Live calendar</span>
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

      <div className="avail-sync">
        <span>Synced with</span>
        <span className="sync-pill">Airbnb</span>
        <span className="sync-pill">VRBO</span>
        <span className="sync-pill">Peerspace</span>
      </div>

      <style>{`
        .avail-dash { }
        .avail-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .am {
          text-align: center;
          padding: 0.75rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .am-val { display: block; font-size: 1.5rem; font-weight: 700; }
        .am-lbl { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--dim); }
        .avail-cal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }
        .live-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          color: var(--green);
          font-weight: 600;
        }
        .live-tag i {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
        }
        .avail-dow {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 4px;
        }
        .avail-dow span {
          text-align: center;
          font-size: 0.65rem;
          color: var(--dim);
          font-weight: 600;
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
          font-size: 0.72rem;
          font-weight: 600;
          border-radius: 6px;
        }
        .avail-cell.empty { visibility: hidden; }
        .avail-cell.open { background: rgba(52,211,153,0.12); color: var(--green); }
        .avail-cell.blocked { background: rgba(248,113,113,0.1); color: var(--red); opacity: 0.7; }
        .avail-cell.today { outline: 2px solid var(--primary); outline-offset: 1px; }
        .avail-loading { font-size: 0.75rem; color: var(--dim); margin-top: 0.75rem; }
        .avail-sync {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          font-size: 0.72rem;
          color: var(--dim);
        }
        .sync-pill {
          padding: 0.2rem 0.5rem;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          font-weight: 600;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}
