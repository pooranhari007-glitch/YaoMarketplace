import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import TrustBar from "../components/TrustBar";
import { IMAGES, PRICING_DEMO } from "../data/demo";

const eventTypes = [
  { title: "Weddings", detail: "Up to 120 guests" },
  { title: "Corporate", detail: "Executive retreats" },
  { title: "Celebrations", detail: "Milestones & galas" },
  { title: "Intimate", detail: "Dinners for 24" },
];

const included = [
  "Dedicated event director",
  "Premium tableware & linens",
  "Climate-controlled pavilion",
  "Valet parking for 40 vehicles",
  "Certificate of insurance workflow",
  "Overnight stay packages available",
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Private events"
        title="Occasions, elevated"
        subtitle="A setting where architecture, landscape, and impeccable service converge — for celebrations that demand nothing less than extraordinary."
        image={IMAGES.events}
        primaryCta={{ label: "Enquire", to: "/book?type=event" }}
        secondaryCta={{ label: "Policies", to: "/policies" }}
        compact
      />
      <TrustBar />

      <section className="section section-cream">
        <div className="container lux-events-intro reveal">
          <div>
            <span className="eyebrow">Gatherings</span>
            <h2>Designed for those<br />who expect more</h2>
            <div className="divider" />
            <p className="lead">
              From intimate dinners to grand celebrations, Aurelia provides the
              canvas. You bring the vision — we ensure flawless execution.
            </p>
          </div>
          <div className="lux-price-panel">
            <span className="eyebrow">Investment from</span>
            <div className="lux-price">${PRICING_DEMO.eventFrom.toLocaleString()}</div>
            <p className="lux-price-note">{PRICING_DEMO.depositPercent}% retainer to secure dates</p>
            <Link to="/book?type=event" className="btn btn-primary" style={{ marginTop: "2rem", width: "100%" }}>
              Request proposal
            </Link>
          </div>
        </div>

        <div className="container lux-event-types reveal">
          {eventTypes.map((e) => (
            <div key={e.title} className="lux-event-type">
              <h3>{e.title}</h3>
              <p>{e.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container lux-editorial lux-editorial-reverse">
          <div className="lux-editorial-visual reveal">
            <img src={IMAGES.eventTable} alt="" className="lux-img-main" />
            <img src={IMAGES.eventGarden} alt="" className="lux-img-accent" />
          </div>
          <div className="lux-editorial-text reveal">
            <span className="eyebrow">Included</span>
            <h2>Every consideration,<br />anticipated</h2>
            <div className="divider" />
            <ul className="lux-list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container lux-insurance reveal">
          <span className="eyebrow">Compliance</span>
          <h2>Insurance, handled with discretion</h2>
          <p className="lead">
            Event hosts may upload a Certificate of Insurance during reservation.
            Our team reviews and confirms prior to your celebration — seamlessly,
            and without unnecessary correspondence.
          </p>
          <Link to="/book?type=event" className="btn btn-gold" style={{ marginTop: "2rem" }}>
            Begin reservation
          </Link>
        </div>
      </section>

      <style>{`
        .lux-events-intro {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 4rem;
          margin-bottom: 4rem;
          align-items: end;
        }
        .lux-events-intro h2 { font-size: clamp(2rem, 4vw, 3rem); }
        .lux-price-panel {
          border: 1px solid var(--line);
          padding: 2.5rem;
          background: var(--white);
        }
        .lux-price {
          font-family: "Cormorant Garamond", serif;
          font-size: 3.5rem;
          line-height: 1;
          color: var(--black);
        }
        .lux-price-note {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 0.5rem;
        }
        .lux-event-types {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
        }
        .lux-event-type {
          background: var(--white);
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .lux-event-type h3 {
          font-size: 1.35rem;
          margin-bottom: 0.35rem;
        }
        .lux-event-type p {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .lux-editorial {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .lux-editorial-reverse .lux-editorial-visual { order: -1; }
        .lux-editorial h2 { font-size: clamp(1.8rem, 3.5vw, 2.5rem); }
        .lux-list {
          list-style: none;
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
        .lux-editorial-visual { position: relative; min-height: 440px; }
        .lux-img-main { width: 78%; display: block; }
        .lux-img-accent {
          position: absolute;
          right: 0;
          bottom: -2rem;
          width: 52%;
          border: 4px solid var(--ivory);
        }
        .lux-insurance { max-width: 560px; }
        .lux-insurance h2 { font-size: 2rem; color: var(--cream); margin: 0.5rem 0 1rem; }
        @media (max-width: 900px) {
          .lux-events-intro, .lux-event-types, .lux-editorial { grid-template-columns: 1fr; }
          .lux-editorial-reverse .lux-editorial-visual { order: 0; }
        }
      `}</style>
    </>
  );
}
