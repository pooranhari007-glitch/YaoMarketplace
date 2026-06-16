import { Link } from "react-router-dom";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { GALLERY, HERO, HIGHLIGHTS, PRICING_DEMO, SITE, TRUST } from "../data/demo";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{SITE.location}</span>
            <h1>{HERO.headline}</h1>
            <p>{HERO.subline}</p>
            <div className="hero-actions">
              <Link to="/book?type=stay" className="btn btn-accent">Book a stay</Link>
              <Link to="/events" className="btn btn-outline hero-outline">Plan an event</Link>
            </div>
            <div className="hero-price">
              From <strong>${PRICING_DEMO.stayNightly}</strong>/night · Events from <strong>${PRICING_DEMO.eventFrom.toLocaleString()}</strong>
            </div>
          </div>
          <div className="hero-book">
            <LiveQuoteWidget />
          </div>
        </div>
      </section>

      <section className="section highlights">
        <div className="container highlights-grid">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="highlight-item">
              <strong>{h.title}</strong>
              <span>{h.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Two ways to visit</span>
            <h2>Stay overnight or host your gathering</h2>
            <p>Whether you're escaping for a long weekend or planning a once-in-a-lifetime celebration, Harborview is yours to enjoy — privately, on your schedule.</p>
          </div>
          <div className="experience-grid">
            <Link to="/stay" className="experience-card">
              <div className="experience-img" style={{ background: GALLERY[3].tone }} />
              <div className="experience-body">
                <span className="eyebrow">Overnight</span>
                <h3>Private stays</h3>
                <p>Four suites, chef's kitchen, trails & fire pit. Minimum {PRICING_DEMO.minStay} nights.</p>
                <span className="experience-link">Explore the property →</span>
              </div>
            </Link>
            <Link to="/events" className="experience-card">
              <div className="experience-img" style={{ background: GALLERY[1].tone }} />
              <div className="experience-body">
                <span className="eyebrow">Events</span>
                <h3>Private gatherings</h3>
                <p>Weddings, corporate retreats, celebrations — up to 120 guests with full event support.</p>
                <span className="experience-link">View event spaces →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section gallery-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The estate</span>
            <h2>Six acres of coastal woodland</h2>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((g) => (
              <div key={g.title} className="gallery-tile" style={{ background: g.tone }}>
                <span>{g.title}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/gallery" className="btn btn-outline">View full gallery</Link>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          {TRUST.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          padding: 6rem 0 4rem;
          color: #fff;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(105deg, rgba(28,25,23,0.75) 0%, rgba(44,74,62,0.55) 45%, rgba(28,25,23,0.35) 100%),
            url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80") center/cover no-repeat;
          z-index: 0;
        }
        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-copy h1 {
          font-size: clamp(2.25rem, 5vw, 3.25rem);
          color: #fff;
          margin: 0.75rem 0 1.25rem;
          max-width: 14ch;
        }
        .hero-copy p {
          font-size: 1.05rem;
          line-height: 1.7;
          opacity: 0.9;
          max-width: 42ch;
          margin-bottom: 2rem;
        }
        .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .hero-outline {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }
        .hero-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
          color: #fff;
        }
        .hero-price {
          font-size: 0.88rem;
          opacity: 0.75;
        }
        .hero-price strong { color: #fff; font-weight: 600; }
        .hero-book { align-self: start; }
        .highlights { padding: 0; margin-top: -2.5rem; position: relative; z-index: 2; }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .highlight-item {
          background: var(--surface);
          padding: 1.5rem 1.25rem;
          text-align: center;
        }
        .highlight-item strong {
          display: block;
          font-family: var(--font-display);
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
        }
        .highlight-item span {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .experience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .experience-card {
          display: block;
          background: var(--surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
          color: inherit;
        }
        .experience-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }
        .experience-img { height: 220px; }
        .experience-body { padding: 1.75rem; }
        .experience-body h3 {
          font-size: 1.5rem;
          margin: 0.35rem 0 0.75rem;
        }
        .experience-body p {
          color: var(--text-soft);
          font-size: 0.92rem;
          margin-bottom: 1rem;
        }
        .experience-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
        }
        .gallery-preview { background: var(--bg-warm); }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .gallery-tile {
          aspect-ratio: 4/3;
          border-radius: var(--radius);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .trust-strip {
          padding: 2rem 0;
          border-top: 1px solid var(--border);
        }
        .trust-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem 2rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .trust-inner span::before {
          content: "✓ ";
          color: var(--green);
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .highlights-grid { grid-template-columns: 1fr 1fr; }
          .experience-grid, .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
