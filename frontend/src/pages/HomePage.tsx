import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO, SITE } from "../data/demo";

const pathways = [
  {
    type: "stay",
    title: "Overnight Stays",
    desc: "Private suites, coastal views, and the calm of a boutique retreat — book nightly without platform markups.",
    image: IMAGES.stayInterior,
    to: "/stay",
    cta: "Explore stays",
    accent: "var(--accent-light)",
  },
  {
    type: "event",
    title: "Events & Gatherings",
    desc: "Weddings, corporate retreats, and celebrations with flexible layouts, on-site coordination, and COI support.",
    image: IMAGES.eventTable,
    to: "/events",
    cta: "Plan your event",
    accent: "var(--accent)",
  },
];

const features = [
  {
    title: "One property, two experiences",
    body: "Whether guests need a restorative weekend or a full-day celebration, the estate adapts — with separate booking paths and pricing.",
  },
  {
    title: "Direct booking, full transparency",
    body: "Guests see real-time availability, instant quotes, and secure checkout. You keep more revenue and control the guest relationship.",
  },
  {
    title: "Professionally managed",
    body: "Calendar sync with Airbnb, VRBO, and Peerspace prevents double bookings. Insurance review and admin tools keep operations smooth.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={SITE.location}
        title="Where stays and celebrations feel unmistakably yours"
        subtitle={`${SITE.name} welcomes overnight guests and event clients under one roof — with the trust of a professional venue and the warmth of a private estate. Book direct for the best rate.`}
        image={IMAGES.home}
        primaryCta={{ label: "Check availability", to: "/book" }}
        secondaryCta={{ label: "Explore the estate", to: "/stay" }}
      />
      <TrustBar />

      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <div>
              <span className="eyebrow">Two ways to experience</span>
              <h2>Built for overnight guests and event clients alike</h2>
              <p className="lead">
                Your property isn&apos;t just a rental — it&apos;s a destination. The site makes that
                clear from the first screen, with dedicated journeys for each audience.
              </p>
            </div>
            <div className="stat-row">
              <div className="stat">
                <strong>From ${PRICING_DEMO.stayNightly}</strong>
                <span>per night · stays</span>
              </div>
              <div className="stat">
                <strong>From ${PRICING_DEMO.eventFrom}</strong>
                <span>event packages</span>
              </div>
              <div className="stat">
                <strong>{PRICING_DEMO.depositPercent}%</strong>
                <span>deposit to confirm</span>
              </div>
            </div>
          </div>

          <div className="pathway-grid">
            {pathways.map((p) => (
              <Link key={p.type} to={p.to} className="pathway-card">
                <div className="pathway-img" style={{ backgroundImage: `url(${p.image})` }} />
                <div className="pathway-body">
                  <span className="pathway-tag" style={{ color: p.accent }}>
                    {p.type === "stay" ? "Stays" : "Events"}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="pathway-link">{p.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Why book direct</span>
          <h2 className="section-title">Trust, clarity, and flexibility — by design</h2>
          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Ready to reserve your dates?</h2>
            <p>Instant quotes, secure deposit, and confirmation — no middleman.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/book?type=stay" className="btn btn-primary">Book a stay</Link>
            <Link to="/book?type=event" className="btn btn-event">Host an event</Link>
          </div>
        </div>
      </section>

      <style>{`
        .intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: end;
          margin-bottom: 3rem;
        }
        .intro-grid h2 { font-size: clamp(1.55rem, 3.5vw, 2.2rem); margin-bottom: 0.85rem; }
        .stat-row { display: flex; flex-direction: column; gap: 0.75rem; }
        .stat {
          padding: 0.85rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
        }
        .stat strong { display: block; font-size: 1.15rem; font-family: "Playfair Display", serif; color: var(--accent-deep); }
        .stat span { font-size: 0.78rem; color: var(--muted); }
        .pathway-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .pathway-card {
          display: grid;
          grid-template-rows: 180px 1fr;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
          color: inherit;
          box-shadow: var(--shadow-shine);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .pathway-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.95) inset,
            0 16px 36px rgba(29, 78, 216, 0.14),
            0 4px 12px rgba(15, 23, 42, 0.06);
        }
        .pathway-img {
          background-size: cover;
          background-position: center;
        }
        .pathway-body { padding: 1.15rem; }
        .pathway-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pathway-body h3 { font-size: 1.2rem; margin: 0.35rem 0 0.5rem; }
        .pathway-body p { color: var(--muted); font-size: 0.88rem; margin-bottom: 0.85rem; }
        .pathway-link { font-weight: 700; font-size: 0.78rem; color: var(--red); }
        .section-title { font-size: clamp(1.45rem, 3vw, 2rem); margin-bottom: 1.5rem; }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .feature-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
        .feature-card p { color: var(--muted); font-size: 0.88rem; }
        .cta-banner {
          background: linear-gradient(135deg, var(--accent-deep) 0%, var(--accent) 55%, #3b82f6 100%);
          color: white;
          padding: 2.75rem 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .cta-banner-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .cta-banner h2 { font-size: clamp(1.4rem, 2.8vw, 1.85rem); margin-bottom: 0.4rem; }
        .cta-banner p { color: rgba(255,255,255,0.85); font-size: 0.9rem; }
        .cta-banner-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .intro-grid, .pathway-grid, .feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
