import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO } from "../data/demo";

const amenities = [
  "Private suites with ensuite marble baths",
  "Temperature-controlled wine cellar",
  "Infinity-edge pool & sun terrace",
  "Chef's kitchen with premium appointments",
  "Dedicated concierge on request",
  "Discreet, contactless arrival",
];

export default function StayPage() {
  return (
    <>
      <PageHero
        eyebrow="Private stay"
        title="Sanctuary, refined"
        subtitle="An intimate residence for those who measure luxury in silence, space, and the quality of what surrounds them."
        image={IMAGES.stay}
        primaryCta={{ label: "Reserve", to: "/book?type=stay" }}
        secondaryCta={{ label: "Gallery", to: "/gallery" }}
        compact
      />
      <TrustBar />

      <section className="section">
        <div className="container lux-editorial">
          <div className="lux-editorial-text reveal">
            <span className="eyebrow">The residence</span>
            <h2>Where every detail<br />speaks quietly</h2>
            <div className="divider" />
            <p className="lead">
              Aurelia&apos;s private suites are appointed with the same care one expects
              from the world&apos;s finest addresses — natural materials, curated art,
              and light that moves through the day with intention.
            </p>
            <ul className="lux-list">
              {amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Link to="/book?type=stay" className="btn btn-primary" style={{ marginTop: "2.5rem" }}>
              From ${PRICING_DEMO.stayNightly} per night
            </Link>
          </div>
          <div className="lux-editorial-visual reveal">
            <img src={IMAGES.stayInterior} alt="" className="lux-img-main" />
            <img src={IMAGES.stayBedroom} alt="" className="lux-img-accent" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container lux-banner reveal">
          <div>
            <span className="eyebrow">Also considering</span>
            <h2>A private celebration?</h2>
            <p className="lead">Many guests extend their stay into an unforgettable gathering.</p>
          </div>
          <Link to="/events" className="btn btn-gold">View events</Link>
        </div>
      </section>

      <style>{`
        .lux-editorial {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .lux-editorial h2 { font-size: clamp(2rem, 4vw, 3rem); }
        .lux-list {
          list-style: none;
          margin-top: 2rem;
          display: grid;
          gap: 0.85rem;
        }
        .lux-list li {
          font-size: 0.92rem;
          font-weight: 300;
          color: var(--stone);
          padding-left: 1.5rem;
          position: relative;
        }
        .lux-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 24px;
          height: 1px;
          background: var(--gold);
        }
        .lux-editorial-visual { position: relative; min-height: 480px; }
        .lux-img-main {
          width: 78%;
          display: block;
          filter: brightness(0.95);
        }
        .lux-img-accent {
          position: absolute;
          right: 0;
          bottom: -2rem;
          width: 52%;
          border: 4px solid var(--ivory);
        }
        .lux-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .lux-banner h2 { font-size: 2rem; color: var(--cream); margin: 0.5rem 0; }
        @media (max-width: 800px) {
          .lux-editorial { grid-template-columns: 1fr; }
          .lux-editorial-visual { min-height: 320px; }
        }
      `}</style>
    </>
  );
}
