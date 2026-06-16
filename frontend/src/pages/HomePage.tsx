import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO, SITE } from "../data/demo";

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={SITE.location}
        title="An address reserved for the exceptional"
        subtitle={`${SITE.name} is a private estate where overnight guests and celebration hosts experience the same standard — understated, impeccable, and entirely yours.`}
        image={IMAGES.home}
        primaryCta={{ label: "Reserve", to: "/book" }}
        secondaryCta={{ label: "Discover", to: "/stay" }}
      />
      <TrustBar />

      <section className="section section-cream">
        <div className="container lux-split reveal">
          <div>
            <span className="eyebrow">The estate</span>
            <h2>Two experiences.<br />One uncompromising standard.</h2>
            <div className="divider" />
            <p className="lead">
              Whether arriving for a restorative escape or orchestrating a private
              celebration, every detail is considered — from arrival to departure.
            </p>
          </div>
          <div className="lux-stats">
            <div className="lux-stat">
              <span className="lux-stat-num">${PRICING_DEMO.stayNightly}</span>
              <span className="lux-stat-label">From per night</span>
            </div>
            <div className="lux-stat">
              <span className="lux-stat-num">${PRICING_DEMO.eventFrom}</span>
              <span className="lux-stat-label">Events from</span>
            </div>
            <div className="lux-stat">
              <span className="lux-stat-num">{PRICING_DEMO.depositPercent}%</span>
              <span className="lux-stat-label">Deposit to confirm</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="lux-duo">
            <Link to="/stay" className="lux-duo-card">
              <div className="lux-duo-img" style={{ backgroundImage: `url(${IMAGES.stayInterior})` }} />
              <div className="lux-duo-body">
                <span className="eyebrow">Stay</span>
                <h3>Private residence</h3>
                <p>Curated suites, uninterrupted privacy, and the quiet luxury of time well spent.</p>
                <span className="lux-link">Explore →</span>
              </div>
            </Link>
            <Link to="/events" className="lux-duo-card">
              <div className="lux-duo-img" style={{ backgroundImage: `url(${IMAGES.eventTable})` }} />
              <div className="lux-duo-body">
                <span className="eyebrow">Gather</span>
                <h3>Private events</h3>
                <p>Weddings, retreats, and milestone celebrations in a setting worthy of the occasion.</p>
                <span className="lux-link">Explore →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container lux-manifesto reveal">
          <span className="eyebrow">Philosophy</span>
          <blockquote>
            &ldquo;Luxury is not excess. It is the absence of compromise — in space,
            in service, and in the certainty that every moment belongs to you.&rdquo;
          </blockquote>
          <div className="lux-manifesto-grid">
            <div>
              <h4>Direct reservation</h4>
              <p>No intermediaries. Transparent pricing. Immediate confirmation.</p>
            </div>
            <div>
              <h4>Discreet management</h4>
              <p>Calendar synchronisation, concierge support, and white-glove coordination.</p>
            </div>
            <div>
              <h4>Lasting impression</h4>
              <p>An environment designed to be remembered — and returned to.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section lux-cta-final">
        <div className="container lux-cta-final-inner reveal">
          <h2>Your dates await</h2>
          <p>Reserve directly. Experience without compromise.</p>
          <div className="lux-ctas-row">
            <Link to="/book?type=stay" className="btn btn-primary">Book a stay</Link>
            <Link to="/book?type=event" className="btn btn-gold">Plan an event</Link>
          </div>
        </div>
      </section>

      <style>{`
        .lux-split {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: end;
        }
        .lux-split h2 { font-size: clamp(2rem, 4vw, 3.2rem); }
        .lux-stats {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          border-left: 1px solid var(--line);
          padding-left: 3rem;
        }
        .lux-stat-num {
          display: block;
          font-family: "Cormorant Garamond", serif;
          font-size: 2.5rem;
          color: var(--black);
          line-height: 1;
        }
        .lux-stat-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 0.5rem;
        }
        .lux-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--line);
        }
        .lux-duo-card {
          display: grid;
          grid-template-rows: 320px 1fr;
          background: var(--white);
          color: inherit;
          transition: background 0.5s var(--ease);
          overflow: hidden;
        }
        .lux-duo-card:hover { background: var(--cream); }
        .lux-duo-img {
          background-size: cover;
          background-position: center;
          transition: transform 0.8s var(--ease);
        }
        .lux-duo-card:hover .lux-duo-img { transform: scale(1.04); }
        .lux-duo-body { padding: 2.5rem; }
        .lux-duo-body h3 { font-size: 1.75rem; margin-bottom: 0.75rem; }
        .lux-duo-body p {
          font-weight: 300;
          color: var(--stone);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        .lux-link {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
        }
        .lux-manifesto blockquote {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.5;
          color: var(--cream);
          max-width: 28ch;
          margin: 1.5rem 0 4rem;
        }
        .lux-manifesto-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          padding-top: 3rem;
          border-top: 1px solid var(--line-light);
        }
        .lux-manifesto-grid h4 {
          font-family: "Inter", sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .lux-manifesto-grid p {
          font-weight: 300;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
        }
        .lux-cta-final {
          text-align: center;
          background: var(--cream);
        }
        .lux-cta-final h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 0.75rem; }
        .lux-cta-final p {
          font-weight: 300;
          color: var(--stone);
          margin-bottom: 2.5rem;
        }
        .lux-ctas-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .lux-split, .lux-duo, .lux-manifesto-grid { grid-template-columns: 1fr; }
          .lux-stats { border-left: none; padding-left: 0; flex-direction: row; flex-wrap: wrap; gap: 2rem; }
        }
      `}</style>
    </>
  );
}
