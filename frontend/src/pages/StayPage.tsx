import { Link } from "react-router-dom";
import { Panel, StatCard } from "../components/DashboardCharts";
import { AMENITIES_STAY, PRICING_DEMO, STATS } from "../data/demo";

export default function StayPage() {
  return (
    <div className="dash-page">
      <div className="dash-stats-grid">
        <StatCard label="Nightly rate" value={`$${PRICING_DEMO.stayNightly}`} icon="⌂" />
        <StatCard label="Avg stay" value={`${STATS.avgStayLength} nights`} icon="🌙" />
        <StatCard label="Occupancy" value={`${STATS.occupancyRate}%`} change="+12%" up icon="📈" />
        <StatCard label="Min deposit" value={`${PRICING_DEMO.depositPercent}%`} icon="🔒" />
      </div>

      <div className="dash-two-col">
        <Panel title="Stay amenities" subtitle="What overnight guests receive">
          <ul className="dash-checklist">
            {AMENITIES_STAY.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <Link to="/book?type=stay" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Check availability
          </Link>
        </Panel>

        <Panel title="Availability snapshot" subtitle="Next 30 days">
          <div className="avail-grid">
            {Array.from({ length: 28 }, (_, i) => {
              const blocked = [3, 4, 5, 12, 13, 20, 21].includes(i);
              return (
                <div key={i} className={`avail-cell ${blocked ? "blocked" : "open"}`} title={`Day ${i + 1}`}>
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="avail-legend">
            <span><i className="open" /> Available</span>
            <span><i className="blocked" /> Booked</span>
          </div>
        </Panel>
      </div>

      <style>{`
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .dash-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dash-checklist {
          list-style: none;
          display: grid;
          gap: 0.5rem;
        }
        .dash-checklist li {
          font-size: 0.88rem;
          color: var(--muted);
          padding-left: 1.25rem;
          position: relative;
        }
        .dash-checklist li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--green);
          font-weight: 700;
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
          font-size: 0.7rem;
          border-radius: 6px;
          font-weight: 600;
        }
        .avail-cell.open { background: rgba(52, 211, 153, 0.15); color: var(--green); }
        .avail-cell.blocked { background: rgba(248, 113, 113, 0.12); color: var(--red); }
        .avail-legend {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          font-size: 0.75rem;
          color: var(--dim);
        }
        .avail-legend i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 3px;
          margin-right: 0.35rem;
          vertical-align: middle;
        }
        .avail-legend i.open { background: rgba(52, 211, 153, 0.4); }
        .avail-legend i.blocked { background: rgba(248, 113, 113, 0.4); }
        @media (max-width: 900px) {
          .dash-stats-grid, .dash-two-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
