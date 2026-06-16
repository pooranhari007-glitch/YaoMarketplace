import { Link } from "react-router-dom";
import { Panel, StatCard } from "../components/DashboardCharts";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { EVENT_TYPES, PRICING_DEMO, PROPERTY } from "../data/demo";

export default function EventsPage() {
  return (
    <div className="public-dash">
      <div className="pub-kpi">
        <StatCard label="From" value={`$${PRICING_DEMO.eventFrom.toLocaleString()}`} icon="◈" />
        <StatCard label="Capacity" value={String(PROPERTY.eventCapacity)} icon="👥" />
        <StatCard label="Deposit" value={`${PRICING_DEMO.depositPercent}%`} icon="🔒" />
        <StatCard label="Acres" value={String(PROPERTY.acres)} icon="🌿" />
      </div>

      <div className="pub-main-grid">
        <div className="pub-col-left">
          <LiveQuoteWidget defaultType="event" />
          <Panel title="Event types" subtitle="Weddings, corporate, retreats & more">
            <div className="event-cards">
              {EVENT_TYPES.map((e) => (
                <div key={e.title} className="event-card">
                  <div>
                    <strong>{e.title}</strong>
                    <span>Up to {e.capacity} guests</span>
                  </div>
                  <Link to="/book?type=event" className="btn btn-ghost btn-sm">Quote</Link>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <div className="pub-col-right">
          <Panel title="Event dates" subtitle="Live calendar — synced channels">
            <AvailabilityDashboard />
          </Panel>
          <Panel title="Insurance" subtitle="Certificate of insurance (COI)">
            <div className="flow-steps">
              <div className="flow-step"><span>1</span> Upload COI when booking</div>
              <div className="flow-step"><span>2</span> Team reviews within 24h</div>
              <div className="flow-step"><span>3</span> Approve or request changes</div>
              <div className="flow-step"><span>4</span> Event confirmed</div>
            </div>
          </Panel>
        </div>
      </div>

      <style>{`
        .pub-kpi {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .pub-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 1rem;
        }
        .pub-col-left, .pub-col-right { display: flex; flex-direction: column; gap: 1rem; }
        .event-cards { display: grid; gap: 0.5rem; }
        .event-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .event-card strong { display: block; font-size: 0.88rem; }
        .event-card span { font-size: 0.72rem; color: var(--dim); }
        .btn-sm { padding: 0.35rem 0.75rem; font-size: 0.75rem; }
        .flow-steps { display: grid; gap: 0.5rem; }
        .flow-step {
          padding: 0.65rem 0.85rem;
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
          background: var(--cyan);
          color: var(--bg);
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          margin-right: 0.4rem;
        }
        @media (max-width: 900px) {
          .pub-kpi, .pub-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
