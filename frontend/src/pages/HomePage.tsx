import { Link } from "react-router-dom";
import { Panel, StatCard } from "../components/DashboardCharts";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { AvailabilityForecastChart, BookingPaths } from "../components/public/PublicWidgets";
import { PRICING_DEMO, PROPERTY, SITE } from "../data/demo";

export default function HomePage() {
  return (
    <div className="public-dash">
      {/* Hero banner */}
      <section className="pub-hero card">
        <div className="pub-hero-text">
          <span className="eyebrow">{SITE.location}</span>
          <h2>{SITE.name}</h2>
          <p>{SITE.tagline} — real-time availability, instant quotes, secure checkout.</p>
          <div className="pub-hero-actions">
            <Link to="/book?type=stay" className="btn btn-primary">Book a stay</Link>
            <Link to="/book?type=event" className="btn btn-cyan">Plan an event</Link>
          </div>
        </div>
        <div className="pub-hero-stats">
          <div className="phs"><strong>{PROPERTY.sleeps}</strong><span>Guests</span></div>
          <div className="phs"><strong>{PROPERTY.eventCapacity}</strong><span>Event cap.</span></div>
          <div className="phs"><strong>{PROPERTY.rating}</strong><span>★ {PROPERTY.reviews} reviews</span></div>
          <div className="phs"><strong>{PROPERTY.acres}</strong><span>Acres</span></div>
        </div>
      </section>

      {/* KPI row — guest-facing */}
      <div className="pub-kpi">
        <StatCard label="Nightly from" value={`$${PRICING_DEMO.stayNightly}`} icon="⌂" />
        <StatCard label="Events from" value={`$${PRICING_DEMO.eventFrom}`} icon="◈" />
        <StatCard label="Deposit" value={`${PRICING_DEMO.depositPercent}%`} icon="🔒" />
        <StatCard label="Book direct" value="Save fees" change="No Airbnb markup" up icon="✓" />
      </div>

      {/* Main dashboard grid */}
      <div className="pub-main-grid">
        <div className="pub-col-left">
          <LiveQuoteWidget />
          <Panel title="Availability forecast" subtitle="Open dates — next 8 weeks">
            <AvailabilityForecastChart />
          </Panel>
        </div>
        <div className="pub-col-right">
          <Panel title="Live calendar" subtitle="Synced with Airbnb, VRBO & Peerspace">
            <AvailabilityDashboard />
          </Panel>
          <Panel title="Choose your experience" subtitle="Two booking paths">
            <BookingPaths />
          </Panel>
        </div>
      </div>

      {/* Trust strip */}
      <div className="pub-trust card">
        {["Stripe secure pay", "Instant confirmation", "iCal calendar sync", "COI for events", "AI concierge chat"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <style>{`
        .pub-hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          margin-bottom: 1.25rem;
          background: linear-gradient(135deg, var(--surface) 0%, var(--bg-panel) 100%);
          flex-wrap: wrap;
        }
        .pub-hero h2 { font-size: 1.75rem; margin: 0.25rem 0 0.5rem; }
        .pub-hero p { font-size: 0.88rem; color: var(--muted); max-width: 42ch; margin-bottom: 1.25rem; }
        .pub-hero-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .pub-hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .phs {
          text-align: center;
          padding: 1rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
          min-width: 100px;
        }
        .phs strong { display: block; font-size: 1.5rem; font-weight: 700; }
        .phs span { font-size: 0.68rem; color: var(--dim); text-transform: uppercase; letter-spacing: 0.06em; }
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
          margin-bottom: 1.25rem;
        }
        .pub-col-left, .pub-col-right { display: flex; flex-direction: column; gap: 1rem; }
        .pub-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem 2rem;
          padding: 1rem 1.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--dim);
        }
        .pub-trust span::before { content: "✓ "; color: var(--green); }
        @media (max-width: 1000px) {
          .pub-kpi { grid-template-columns: repeat(2, 1fr); }
          .pub-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
