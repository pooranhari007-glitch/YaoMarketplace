import { Link, useSearchParams } from "react-router-dom";
import { StatCard } from "../components/DashboardCharts";

export default function BookSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("booking_id");

  return (
    <div className="success-dash">
      <div className="success-card card">
        <div className="success-icon">✓</div>
        <h2>Booking confirmed</h2>
        <p>{id ? `Reservation #${id} is on the books.` : "Your reservation has been received."}</p>
        <div className="success-stats">
          <StatCard label="Status" value="Confirmed" icon="✓" />
          <StatCard label="Next" value="Email sent" icon="✉" />
        </div>
        <Link to="/" className="btn btn-primary">Back to dashboard</Link>
      </div>
      <style>{`
        .success-dash {
          display: flex;
          justify-content: center;
          padding: 2rem 0;
        }
        .success-card {
          max-width: 480px;
          width: 100%;
          text-align: center;
          padding: 2rem;
        }
        .success-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 1rem;
          background: rgba(52, 211, 153, 0.15);
          color: var(--green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .success-card h2 { margin-bottom: 0.5rem; }
        .success-card p { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .success-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
