import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel, StatCard } from "../components/DashboardCharts";
import { EVENT_TYPES, PRICING_DEMO, STATS } from "../data/demo";

export default function EventsPage() {
  const chartData = EVENT_TYPES.map((e) => ({ name: e.title, bookings: e.bookings }));

  return (
    <div className="dash-page">
      <div className="dash-stats-grid">
        <StatCard label="From" value={`$${PRICING_DEMO.eventFrom.toLocaleString()}`} icon="◈" />
        <StatCard label="Event bookings" value={String(STATS.eventBookings)} change="YTD" up icon="📋" />
        <StatCard label="Deposit" value={`${PRICING_DEMO.depositPercent}%`} icon="🔒" />
        <StatCard label="Max capacity" value="120" icon="👥" />
      </div>

      <div className="dash-two-col">
        <Panel title="Bookings by event type" subtitle="Last 12 months">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="bookings" fill="#22d3ee" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Event types" subtitle="Capacity & demand">
          <div className="event-cards">
            {EVENT_TYPES.map((e) => (
              <div key={e.title} className="event-card">
                <div>
                  <strong>{e.title}</strong>
                  <span>Up to {e.capacity} guests</span>
                </div>
                <span className="event-count">{e.bookings}</span>
              </div>
            ))}
          </div>
          <Link to="/book?type=event" className="btn btn-cyan" style={{ marginTop: "1rem", width: "100%" }}>
            Request event dates
          </Link>
        </Panel>
      </div>

      <Panel title="Insurance workflow" subtitle="COI upload & admin approval">
        <div className="flow-steps">
          <div className="flow-step"><span>1</span> Guest uploads COI during booking</div>
          <div className="flow-step"><span>2</span> Admin reviews in dashboard</div>
          <div className="flow-step"><span>3</span> Approve or reject with notes</div>
          <div className="flow-step"><span>4</span> Event confirmed upon approval</div>
        </div>
      </Panel>

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
          margin-bottom: 1rem;
        }
        .event-cards { display: grid; gap: 0.5rem; }
        .event-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.75rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .event-card strong { display: block; font-size: 0.88rem; }
        .event-card span { font-size: 0.72rem; color: var(--dim); }
        .event-count {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--cyan);
        }
        .flow-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .flow-step {
          padding: 0.85rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.78rem;
          color: var(--muted);
        }
        .flow-step span {
          display: inline-flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          margin-right: 0.4rem;
        }
        @media (max-width: 900px) {
          .dash-stats-grid, .dash-two-col, .flow-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
