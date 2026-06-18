import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { useGallery, usePage, useSite } from "../hooks/useSite";

export default function StayPage() {
  const site = useSite();
  const page = usePage("stay");
  const gallery = useGallery();

  return (
    <div className="container">
      <PageMeta title={page?.title || "Stay"} description={page?.meta_description} />
      <section className="page-hero">
        <span className="eyebrow">Overnight stays</span>
        <h1>{page?.title || "A private home, not a hotel"}</h1>
        <p>{page?.body}</p>
      </section>
      <div className="stay-layout">
        <div className="stay-main">
          <div className="stay-gallery">
            <div className="stay-gallery-main" style={{ backgroundImage: `url("${page?.hero_image_url || gallery[0]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="stay-gallery-side">
              <div style={{ backgroundImage: `url("${gallery[0]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ backgroundImage: `url("${gallery[5]?.url || gallery[1]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </div>
          <section className="card">
            <h2>The property</h2>
            <div className="stay-stats">
              <div><strong>{site.bedrooms}</strong> bedrooms</div>
              <div><strong>{site.sleeps}</strong> guests</div>
              <div><strong>{site.acres}</strong> acres</div>
              <div><strong>{site.rating}</strong> ★ ({site.reviews})</div>
            </div>
          </section>
          <section className="card">
            <h2>What's included</h2>
            <ul className="amenity-grid">
              {site.amenities_stay.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </section>
          <section className="card">
            <h2>Availability</h2>
            <AvailabilityDashboard />
          </section>
        </div>
        <aside className="stay-sidebar">
          <LiveQuoteWidget />
          <div className="card" style={{ textAlign: "center" }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>${site.stay_nightly}/night</strong>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.5rem 0 1rem" }}>
              {site.min_stay}-night min · {site.deposit_percent}% deposit
            </p>
            <Link to="/book?type=stay" className="btn btn-primary" style={{ width: "100%" }}>Check dates & book</Link>
          </div>
        </aside>
      </div>
      <style>{`
        .stay-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; padding-bottom: 4rem; align-items: start; }
        .stay-main { display: flex; flex-direction: column; gap: 1.5rem; }
        .stay-gallery { display: grid; grid-template-columns: 2fr 1fr; gap: 0.75rem; height: 360px; }
        .stay-gallery-main { border-radius: var(--radius-lg); }
        .stay-gallery-side { display: flex; flex-direction: column; gap: 0.75rem; }
        .stay-gallery-side div { flex: 1; border-radius: var(--radius); }
        .stay-stats { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 1rem; }
        .stay-stats strong { font-family: var(--font-display); font-size: 1.25rem; margin-right: 0.25rem; }
        .amenity-grid { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-top: 1rem; }
        .amenity-grid li { font-size: 0.92rem; color: var(--text-soft); padding-left: 1.25rem; position: relative; }
        .amenity-grid li::before { content: "✓"; position: absolute; left: 0; color: var(--green); font-weight: 700; }
        .stay-sidebar { position: sticky; top: 5rem; display: flex; flex-direction: column; gap: 1rem; }
        .card h2 { font-family: var(--font-display); font-size: 1.35rem; }
        @media (max-width: 900px) {
          .stay-layout { grid-template-columns: 1fr; }
          .stay-sidebar { position: static; }
          .stay-gallery { grid-template-columns: 1fr; height: auto; }
          .stay-gallery-main { height: 240px; }
        }
      `}</style>
    </div>
  );
}
