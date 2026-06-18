import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { useGallery, usePageContent, useSiteConfig } from "../hooks/useSiteConfig";
import { FALLBACK_GALLERY } from "../data/demo";

export default function EventsPage() {
  const { site } = useSiteConfig();
  const { page } = usePageContent("events");
  const gallery = useGallery();
  const images = gallery.length ? gallery : FALLBACK_GALLERY;

  return (
    <div className="container">
      <PageMeta title={page?.title || "Private Events"} description={page?.meta_description} />
      <section className="page-hero">
        <span className="eyebrow">Private events</span>
        <h1>{page?.title || "Your celebration, your way"}</h1>
        <p>{page?.body}</p>
      </section>

      <div className="events-hero card">
        <div className="events-hero-img" style={{ backgroundImage: `url("${page?.hero_image_url || images[1]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="events-hero-copy">
          <h2>{`From $${site.event_from.toLocaleString()}`}</h2>
          <p>Full-day and multi-day packages. {site.deposit_percent}% deposit secures your date. Certificate of insurance required for all events.</p>
          <Link to="/book?type=event" className="btn btn-accent">Request your date</Link>
        </div>
      </div>

      <div className="events-layout">
        <div className="events-main">
          <section className="card">
            <h2>Event types we host</h2>
            <div className="event-list">
              {site.event_types.map((e) => (
                <div key={e.title} className="event-item">
                  <div>
                    <strong>{e.title}</strong>
                    <p>{e.desc}</p>
                  </div>
                  <span>Up to {e.capacity}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Insurance & approval</h2>
            <div className="coi-steps">
              <div><span>1</span> Upload your COI during booking</div>
              <div><span>2</span> Our team reviews within 24 hours</div>
              <div><span>3</span> We approve or request changes</div>
              <div><span>4</span> Your event is confirmed</div>
            </div>
          </section>

          <section className="card">
            <h2>Check availability</h2>
            <AvailabilityDashboard />
          </section>
        </div>

        <aside className="events-sidebar">
          <LiveQuoteWidget defaultType="event" />
        </aside>
      </div>

      <style>{`
        .events-hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          overflow: hidden;
          padding: 0;
          margin-bottom: 2rem;
        }
        .events-hero-img { min-height: 280px; }
        .events-hero-copy {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .events-hero-copy h2 { font-size: 1.75rem; margin-bottom: 0.75rem; }
        .events-hero-copy p { color: var(--text-soft); margin-bottom: 1.5rem; line-height: 1.7; }
        .events-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
          padding-bottom: 4rem;
          align-items: start;
        }
        .events-main { display: flex; flex-direction: column; gap: 1.5rem; }
        .card h2 { font-size: 1.35rem; margin-bottom: 1.25rem; }
        .event-list { display: grid; gap: 1rem; }
        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .event-item:last-child { border-bottom: none; padding-bottom: 0; }
        .event-item strong {
          display: block;
          font-family: var(--font-display);
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }
        .event-item p { font-size: 0.88rem; color: var(--text-soft); }
        .event-item span {
          flex-shrink: 0;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--forest);
          background: var(--bg-warm);
          padding: 0.35rem 0.65rem;
          border-radius: 999px;
        }
        .coi-steps { display: grid; gap: 0.75rem; }
        .coi-steps div {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-soft);
        }
        .coi-steps span {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--forest);
          color: #fff;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .events-sidebar { position: sticky; top: 5rem; }
        @media (max-width: 900px) {
          .events-hero { grid-template-columns: 1fr; }
          .events-layout { grid-template-columns: 1fr; }
          .events-sidebar { position: static; }
        }
      `}</style>
    </div>
  );
}
