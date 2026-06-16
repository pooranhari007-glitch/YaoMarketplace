import { Link } from "react-router-dom";
import { Panel, StatCard } from "../components/DashboardCharts";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { AMENITIES_STAY, PRICING_DEMO, PROPERTY } from "../data/demo";

export default function StayPage() {
  return (
    <div className="public-dash">
      <div className="pub-kpi">
        <StatCard label="Per night" value={`$${PRICING_DEMO.stayNightly}`} icon="⌂" />
        <StatCard label="Sleeps" value={String(PROPERTY.sleeps)} icon="👥" />
        <StatCard label="Bedrooms" value={String(PROPERTY.bedrooms)} icon="🛏" />
        <StatCard label="Rating" value={`${PROPERTY.rating} ★`} icon="★" />
      </div>

      <div className="pub-main-grid">
        <div className="pub-col-left">
          <LiveQuoteWidget />
          <Panel title="Amenities" subtitle="Included with every stay">
            <ul className="amenity-list">
              {AMENITIES_STAY.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link to="/gallery" className="btn btn-ghost" style={{ marginTop: "1rem" }}>View gallery</Link>
          </Panel>
        </div>
        <div className="pub-col-right">
          <Panel title="Availability" subtitle="Live calendar — book open dates">
            <AvailabilityDashboard />
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
        .amenity-list {
          list-style: none;
          display: grid;
          gap: 0.5rem;
        }
        .amenity-list li {
          font-size: 0.88rem;
          color: var(--muted);
          padding-left: 1.25rem;
          position: relative;
        }
        .amenity-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--green);
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .pub-kpi, .pub-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
