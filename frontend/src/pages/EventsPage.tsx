import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { useGallery, usePage, useSite } from "../hooks/useSite";

export default function EventsPage() {
  const site = useSite();
  const page = usePage("events");
  const gallery = useGallery();

  return (
    <div className="container">
      <PageMeta title={page?.title || "Events"} description={page?.meta_description} />
      <section className="page-hero">
        <span className="eyebrow">Private events</span>
        <h1>{page?.title || "Your celebration, your way"}</h1>
        <p>{page?.body}</p>
      </section>
      <div className="events-hero card" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.2fr 1fr", marginBottom: "2rem" }}>
        <div style={{ minHeight: 280, backgroundImage: `url("${page?.hero_image_url || gallery[1]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.75rem" }}>From ${site.event_from.toLocaleString()}</h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "1.5rem" }}>{site.deposit_percent}% deposit · COI required for events</p>
          <Link to="/book?type=event" className="btn btn-accent">Request your date</Link>
        </div>
      </div>
      <div className="stay-layout">
        <div className="stay-main">
          <section className="card">
            <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>Event types we host</h2>
            {site.event_types.map((e) => (
              <div key={e.title} style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <strong style={{ fontFamily: "var(--font-display)" }}>{e.title}</strong>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-soft)" }}>{e.desc}</p>
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--forest)" }}>Up to {e.capacity}</span>
              </div>
            ))}
          </section>
          <section className="card"><h2 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>Availability</h2><AvailabilityDashboard /></section>
        </div>
        <aside className="stay-sidebar"><LiveQuoteWidget defaultType="event" /></aside>
      </div>
      <style>{`
        .stay-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; padding-bottom: 4rem; align-items: start; }
        .stay-main { display: flex; flex-direction: column; gap: 1.5rem; }
        .stay-sidebar { position: sticky; top: 5rem; }
        @media (max-width: 900px) {
          .stay-layout, .events-hero { grid-template-columns: 1fr !important; }
          .stay-sidebar { position: static; }
        }
      `}</style>
    </div>
  );
}
