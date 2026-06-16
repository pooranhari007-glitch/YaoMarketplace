import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO } from "../data/demo";

const amenities = [
  "Private suites with ensuite baths",
  "Chef-ready kitchen & dining for 12",
  "Coastal trails & fire pit",
  "High-speed Wi‑Fi throughout",
  "Contactless check-in",
  "Flexible 2-night minimum",
];

const gallery = [IMAGES.stayInterior, IMAGES.stayBedroom, IMAGES.stay];

export default function StayPage() {
  return (
    <>
      <PageHero
        eyebrow="Overnight stays"
        title="Rest, recharge, and wake up to the coast"
        subtitle="Thoughtfully appointed suites for couples, families, and small groups — book direct for transparent nightly rates and instant confirmation."
        image={IMAGES.stay}
        variant="stay"
        primaryCta={{ label: "Check dates & book", to: "/book?type=stay" }}
        secondaryCta={{ label: "View policies", to: "/policies" }}
      />
      <TrustBar light />

      <section className="section">
        <div className="container split-section">
          <div>
            <span className="eyebrow">The experience</span>
            <h2>A boutique stay, not a generic rental</h2>
            <p className="lead">
              Harborview Estate is designed for guests who value privacy, quality, and a
              personal touch. Every stay includes premium linens, locally sourced welcome
              amenities, and direct communication with your host.
            </p>
            <ul className="amenity-list">
              {amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link to="/book?type=stay" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
              From ${PRICING_DEMO.stayNightly}/night — book now
            </Link>
          </div>
          <div className="image-stack">
            <img src={IMAGES.stayInterior} alt="Living space" className="stack-main" />
            <img src={IMAGES.stayBedroom} alt="Bedroom" className="stack-accent" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Gallery preview</span>
          <h2>Spaces guests love</h2>
          <div className="photo-row">
            {gallery.map((src, i) => (
              <div key={i} className="photo-tile" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
          <Link to="/gallery" className="text-link">View full gallery →</Link>
        </div>
      </section>

      <section className="section">
        <div className="container card highlight-card">
          <div>
            <h3>Also hosting an event?</h3>
            <p>
              Many guests combine an overnight stay with a next-day gathering. Explore our
              events page for capacity, layouts, and insurance requirements.
            </p>
          </div>
          <Link to="/events" className="btn btn-outline">Events & gatherings</Link>
        </div>
      </section>

      <style>{`
        .split-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .split-section h2 { font-size: clamp(1.7rem, 3.5vw, 2.4rem); margin-bottom: 1rem; }
        .amenity-list {
          list-style: none;
          margin-top: 1.5rem;
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
        .image-stack { position: relative; min-height: 380px; }
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
        .photo-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .photo-tile {
          aspect-ratio: 4/3;
          border-radius: var(--radius);
          background-size: cover;
          background-position: center;
        }
        .text-link { font-weight: 600; font-size: 0.95rem; }
        .highlight-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 1.5rem;
          background: linear-gradient(135deg, var(--accent-soft), var(--surface));
          border-color: var(--border);
          box-shadow: var(--shadow-shine);
        }
        .highlight-card h3 { font-size: 1.3rem; margin-bottom: 0.4rem; }
        .highlight-card p { color: var(--muted); max-width: 48ch; }
        @media (max-width: 800px) {
          .split-section { grid-template-columns: 1fr; }
          .image-stack { min-height: 280px; }
          .photo-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
