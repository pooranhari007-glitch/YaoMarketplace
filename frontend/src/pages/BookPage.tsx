import { useSearchParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import LiveQuoteWidget from "../components/public/LiveQuoteWidget";
import { useSite } from "../hooks/useSite";

export default function BookPage() {
  const site = useSite();
  const [params] = useSearchParams();
  const type = params.get("type") === "event" ? "event" : "stay";

  return (
    <div className="container">
      <PageMeta title="Book" description="Reserve your stay or event at Harborview Estate." />
      <section className="page-hero">
        <span className="eyebrow">Reserve</span>
        <h1>Book your dates</h1>
        <p>Instant quote and secure checkout — full payment flow launches in Milestone 2.</p>
      </section>
      <div style={{ maxWidth: 420, margin: "0 auto 4rem" }}>
        <LiveQuoteWidget defaultType={type} />
        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "1rem" }}>
          {site.deposit_percent}% deposit · From ${site.stay_nightly}/night
        </p>
      </div>
    </div>
  );
}
