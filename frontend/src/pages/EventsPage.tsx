import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO } from "../data/demo";

const eventTypes = [
  { title: "Weddings & elopements", cap: "Up to 80 guests", icon: "💍" },
  { title: "Corporate retreats", cap: "Teams of 12–40", icon: "🏢" },
  { title: "Milestone celebrations", cap: "Flexible layouts", icon: "🎉" },
  { title: "Workshops & photo shoots", cap: "Half or full day", icon: "📸" },
];

const included = [
  "Dedicated event coordinator",
  "Tables, chairs & basic AV",
  "On-site parking for 30 vehicles",
  "COI upload & review workflow",
  "Calendar holds until deposit received",
  "Optional overnight stay add-on",
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events & gatherings"
        title="Celebrate with confidence in a setting that delivers"
        subtitle="From intimate dinners to full-weekend weddings — flexible spaces, professional coordination, and a clear booking process including insurance verification."
        image={IMAGES.events}
        variant="event"
        primaryCta={{ label: "Request event dates", to: "/book?type=event" }}
        secondaryCta={{ label: "Read policies", to: "/policies" }}
      />
      <TrustBar light />

      <section className="section">
        <div className="container">
          <div className="events-intro">
            <div>
              <span className="eyebrow">Professional & flexible</span>
              <h2>A venue that earns trust from day one</h2>
              <p className="lead">
                Event clients need clarity — capacity, pricing, insurance, and availability.
                This page speaks their language while staying warm and inviting, not corporate
                or cold.
              </p>
            </div>
            <div className="price-callout card">
              <span className="eyebrow">Starting at</span>
              <div className="price-big">${PRICING_DEMO.eventFrom}</div>
              <p>Event package · {PRICING_DEMO.depositPercent}% deposit to hold dates</p>
              <Link to="/book?type=event" className="btn btn-event" style={{ width: "100%", marginTop: "1rem" }}>
                Get a quote
              </Link>
            </div>
          </div>

          <div className="event-type-grid">
            {eventTypes.map((e) => (
              <div key={e.title} className="event-type card">
                <span className="event-icon" aria-hidden>{e.icon}</span>
                <h3>{e.title}</h3>
                <p>{e.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-section">
          <div className="image-stack event-stack">
            <img src={IMAGES.eventTable} alt="Event setup" className="stack-main" />
            <img src={IMAGES.eventGarden} alt="Garden ceremony" className="stack-accent" />
          </div>
          <div>
            <span className="eyebrow">What&apos;s included</span>
            <h2>Everything planners ask about — upfront</h2>
            <ul className="amenity-list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="insurance-banner card">
            <div>
              <span className="eyebrow">Insurance</span>
              <h3>Certificate of Insurance (COI) made simple</h3>
              <p>
                Event bookings include an optional step to upload your COI or purchase coverage
                through our partner link. You review and approve documents from your admin
                dashboard before confirming the event.
              </p>
            </div>
            <Link to="/book?type=event" className="btn btn-event">Start event booking</Link>
          </div>
        </div>
      </section>

      <style>{`
        .events-intro {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          align-items: start;
        }
        .events-intro h2 { font-size: clamp(1.7rem, 3.5vw, 2.4rem); margin-bottom: 1rem; }
        .price-callout {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(160deg, var(--event-soft), var(--surface));
          border-color: var(--border);
          box-shadow: var(--shadow-shine);
        }
        .price-big {
          font-family: "Playfair Display", serif;
          font-size: 2.25rem;
          color: var(--accent-deep);
          line-height: 1;
          margin: 0.25rem 0 0.5rem;
        }
        .price-callout p { font-size: 0.88rem; color: var(--muted); }
        .event-type-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .event-type { text-align: center; padding: 1.5rem 1rem; }
        .event-icon { font-size: 1.75rem; display: block; margin-bottom: 0.75rem; }
        .event-type h3 { font-size: 1rem; margin-bottom: 0.35rem; }
        .event-type p { font-size: 0.85rem; color: var(--muted); }
        .split-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .split-section h2 { font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 1rem; }
        .image-stack { position: relative; min-height: 360px; }
        .stack-main {
          width: 85%;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          display: block;
        }
        .stack-accent {
          position: absolute;
          right: 0;
          bottom: -1rem;
          width: 55%;
          border-radius: var(--radius);
          border: 4px solid var(--bg);
          box-shadow: var(--shadow);
        }
        .amenity-list {
          list-style: none;
          display: grid;
          gap: 0.55rem;
        }
        .amenity-list li {
          padding-left: 1.4rem;
          position: relative;
          color: var(--muted);
          font-size: 0.95rem;
        }
        .amenity-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent-light);
          font-weight: 700;
        }
        .insurance-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 1.5rem;
          background: linear-gradient(135deg, var(--accent-soft), var(--surface));
          box-shadow: var(--shadow-shine);
        }
        .insurance-banner h3 { font-size: 1.3rem; margin: 0.35rem 0 0.6rem; }
        .insurance-banner p { color: var(--muted); max-width: 52ch; font-size: 0.95rem; }
        @media (max-width: 900px) {
          .events-intro, .event-type-grid, .split-section { grid-template-columns: 1fr; }
          .event-stack { order: -1; }
        }
      `}</style>
    </>
  );
}
