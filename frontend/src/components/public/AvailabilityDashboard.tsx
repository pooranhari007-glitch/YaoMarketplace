const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AvailabilityDashboard() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();

  return (
    <div className="avail-cal">
      <div className="avail-cal-head">
        <strong>{MONTHS[month]} {year}</strong>
        <span className="avail-live">Live in Milestone 2</span>
      </div>
      <div className="avail-dow">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="avail-grid">
        {Array.from({ length: firstDow }).map((_, i) => <span key={`e${i}`} className="avail-cell empty" />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const blocked = day % 7 === 0 || day % 5 === 0;
          return (
            <span key={day} className={`avail-cell ${blocked ? "blocked" : "open"} ${day === today.getDate() ? "today" : ""}`}>
              {day}
            </span>
          );
        })}
      </div>
      <style>{`
        .avail-cal-head { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .avail-cal-head strong { font-family: var(--font-display); }
        .avail-live { font-size: 0.78rem; font-weight: 600; color: var(--green); }
        .avail-dow { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; margin-bottom: 4px; }
        .avail-dow span { text-align: center; font-size: 0.68rem; font-weight: 600; color: var(--text-muted); }
        .avail-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
        .avail-cell {
          aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; border-radius: 8px;
        }
        .avail-cell.empty { visibility: hidden; }
        .avail-cell.open { background: rgba(61,122,95,0.1); color: var(--green); }
        .avail-cell.blocked { background: var(--surface-muted); color: var(--text-muted); opacity: 0.6; }
        .avail-cell.today { outline: 2px solid var(--forest); font-weight: 700; }
      `}</style>
    </div>
  );
}
