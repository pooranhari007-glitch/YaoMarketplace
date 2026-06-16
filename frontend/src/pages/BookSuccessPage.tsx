import { Link, useSearchParams } from "react-router-dom";
import { SITE } from "../data/demo";

export default function BookSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("booking_id");

  return (
    <div className="lux-success">
      <div className="container lux-success-inner reveal">
        <span className="eyebrow">Confirmed</span>
        <h1>Thank you</h1>
        <div className="divider" />
        <p>
          {id
            ? `Your reservation ${id} has been received. A confirmation shall arrive shortly.`
            : "Your reservation has been received. We look forward to welcoming you."}
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "2.5rem" }}>
          Return to {SITE.shortName}
        </Link>
      </div>
      <style>{`
        .lux-success {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 0;
          margin-top: 72px;
          text-align: center;
        }
        .lux-success-inner { max-width: 480px; }
        .lux-success h1 { font-size: 3.5rem; margin-bottom: 0; }
        .lux-success p {
          font-weight: 300;
          color: var(--stone);
          line-height: 1.8;
          font-size: 1.05rem;
        }
      `}</style>
    </div>
  );
}
