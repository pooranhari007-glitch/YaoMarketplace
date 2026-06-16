import { Link } from "react-router-dom";
import {
  BookingMixChart,
  OccupancyChart,
  Panel,
  RevenueChart,
  StatCard,
} from "../components/DashboardCharts";
import { PRICING_DEMO, STATS } from "../data/demo";

const recent = [
  { guest: "Sarah M.", type: "Stay", dates: "Jun 12–14", amount: "$500", status: "Confirmed" },
  { guest: "Apex Corp", type: "Event", dates: "Jun 18", amount: "$1,500", status: "Pending" },
  { guest: "James L.", type: "Stay", dates: "Jun 20–22", amount: "$750", status: "Confirmed" },
  { guest: "Rivera Wedding", type: "Event", dates: "Jul 4", amount: "$4,500", status: "Confirmed" },
];

export default function HomePage() {
  return (
    <div className="dash-page">
      <div className="dash-stats-grid">
        <StatCard label="Occupancy" value={`${STATS.occupancyRate}%`} change={`+${STATS.occupancyChange}%`} up icon="📊" />
        <StatCard label="Monthly revenue" value={`$${(STATS.monthlyRevenue / 1000).toFixed(1)}k`} change={`+${STATS.revenueChange}%`} up icon="💰" />
        <StatCard label="Upcoming" value={String(STATS.upcomingBookings)} change="3 this week" up icon="📅" />
        <StatCard label="Inquiries" value={String(STATS.pendingInquiries)} change="Needs reply" up={false} icon="✉" />
      </div>

      <div className="dash-charts-grid">
        <Panel title="Occupancy trend" subtitle="Stay vs event fill rate by month">
          <OccupancyChart />
        </Panel>
        <Panel title="Revenue" subtitle="Direct booking income">
          <RevenueChart />
        </Panel>
        <Panel title="Booking mix" subtitle="Stays vs events">
          <BookingMixChart />
        </Panel>
      </div>

      <div className="dash-bottom-grid">
        <Panel
          title="Recent reservations"
          subtitle="Latest activity"
          action={<Link to="/book" className="btn btn-ghost" style={{ fontSize: "0.75rem" }}>View all</Link>}
        >
          <table className="dash-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.guest + r.dates}>
                  <td>{r.guest}</td>
                  <td><span className={`type-pill ${r.type.toLowerCase()}`}>{r.type}</span></td>
                  <td>{r.dates}</td>
                  <td>{r.amount}</td>
                  <td><span className={`status-pill ${r.status.toLowerCase()}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <div className="dash-quick card">
          <h3>Quick book</h3>
          <p>From ${PRICING_DEMO.stayNightly}/night · Events from ${PRICING_DEMO.eventFrom}</p>
          <div className="dash-quick-btns">
            <Link to="/book?type=stay" className="btn btn-primary">Reserve stay</Link>
            <Link to="/book?type=event" className="btn btn-cyan">Reserve event</Link>
          </div>
          <ul className="dash-quick-list">
            <li>✓ Real-time availability</li>
            <li>✓ Stripe secure checkout</li>
            <li>✓ iCal sync (Airbnb / VRBO)</li>
          </ul>
        </div>
      </div>

      <style>{`
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .dash-charts-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.2fr 0.8fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .dash-bottom-grid {
          display: grid;
          grid-template-columns: 1.5fr 0.7fr;
          gap: 1rem;
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
        }
        .dash-table th {
          text-align: left;
          padding: 0.5rem 0.75rem;
          color: var(--dim);
          font-weight: 600;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border);
        }
        .dash-table td {
          padding: 0.65rem 0.75rem;
          border-bottom: 1px solid var(--border);
          color: var(--muted);
        }
        .type-pill, .status-pill {
          display: inline-block;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .type-pill.stay { background: rgba(99,102,241,0.2); color: #a5b4fc; }
        .type-pill.event { background: rgba(34,211,238,0.15); color: #67e8f9; }
        .status-pill.confirmed { background: rgba(52,211,153,0.15); color: var(--green); }
        .status-pill.pending { background: rgba(251,191,36,0.15); color: var(--amber); }
        .dash-quick h3 { font-size: 0.95rem; margin-bottom: 0.35rem; }
        .dash-quick p { font-size: 0.8rem; color: var(--muted); margin-bottom: 1rem; }
        .dash-quick-btns { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .dash-quick-btns .btn { width: 100%; }
        .dash-quick-list {
          list-style: none;
          font-size: 0.78rem;
          color: var(--dim);
          display: grid;
          gap: 0.35rem;
        }
        @media (max-width: 1100px) {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-charts-grid, .dash-bottom-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
