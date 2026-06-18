import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import AvailabilityDashboard from "../components/public/AvailabilityDashboard";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { useGallery, usePageContent, useSiteConfig } from "../hooks/useSiteConfig";
import { FALLBACK_GALLERY } from "../data/demo";

export default function StayPage() {
  const { site } = useSiteConfig();
  const { page } = usePageContent("stay");
  const gallery = useGallery();
  const images = gallery.length ? gallery : FALLBACK_GALLERY;

  return (
    <div className="container">
      <PageMeta title={page?.title || "Overnight Stays"} description={page?.meta_description} />
      <section className="page-hero">
        <span className="eyebrow">Overnight stays</span>
        <h1>{page?.title || "A private home, not a hotel"}</h1>
        <p>{page?.body}</p>
      </section>

      <div className="stay-layout">
        <div className="stay-main">
          <div className="stay-gallery">
            <div className="stay-gallery-main" style={{ backgroundImage: `url("${page?.hero_image_url || images[0]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="stay-gallery-side">
              <div style={{ backgroundImage: `url("${images[0]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ backgroundImage: `url("${images[5]?.url || images[1]?.url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </div>

          <section className="stay-details card">
            <h2>The property</h2>
            <div className="stay-stats">
              <div><strong>{site.bedrooms}</strong> bedrooms</div>
              <div><strong>{site.sleeps}</strong> guests</div>
              <div><strong>{site.acres}</strong> acres</div>
              <div><strong>{site.rating}</strong> ★ ({site.reviews} reviews)</div>
            </div>
          </section>

          <section className="card">
            <h2>What's included</h2>
            <ul className="amenity-grid">
              {site.amenities_stay.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Availability</h2>
            <p className="avail-note">Live calendar synced with Airbnb & VRBO — book open dates direct.</p>
            <AvailabilityDashboard />
          </section>
        </div>

        <aside className="stay-sidebar">
          <LiveQuoteWidget />
          <div className="stay-sidebar-note card">
            <strong>${site.stay_nightly}/night</strong>
            <p>{site.min_stay}-night minimum · {site.deposit_percent}% deposit to confirm</p>
            <Link to="/book?type=stay" className="btn btn-primary" style={{ width: "100%" }}>Check dates & book</Link>
          </div>
        </aside>
      </div>

      <style>{`
        .stay-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
          padding-bottom: 4rem;
          align-items: start;
        }
        .stay-main { display: flex; flex-direction: column; gap: 1.5rem; }
        .stay-gallery {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0.75rem;
          height: 360px;
        }
        .stay-gallery-main { border-radius: var(--radius-lg); }
        .stay-gallery-side { display: flex; flex-direction: column; gap: 0.75rem; }
        .stay-gallery-side div { flex: 1; border-radius: var(--radius); }
        .stay-details h2, .card h2 { font-size: 1.35rem; margin-bottom: 1rem; }
        .stay-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .stay-stats strong {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-right: 0.25rem;
        }
        .amenity-grid {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem 1.5rem;
        }
        .amenity-grid li {
          font-size: 0.92rem;
          color: var(--text-soft);
          padding-left: 1.25rem;
          position: relative;
        }
        .amenity-grid li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--green);
          font-weight: 700;
        }
        .avail-note { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem; }
        .stay-sidebar {
          position: sticky;
          top: 5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .stay-sidebar-note { text-align: center; }
        .stay-sidebar-note strong {
          display: block;
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 0.35rem;
        }
        .stay-sidebar-note p { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem; }
        @media (max-width: 900px) {
          .stay-layout { grid-template-columns: 1fr; }
          .stay-sidebar { position: static; }
          .stay-gallery { grid-template-columns: 1fr; height: auto; }
          .stay-gallery-main { height: 240px; }
          .stay-gallery-side { flex-direction: row; height: 120px; }
          .amenity-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
