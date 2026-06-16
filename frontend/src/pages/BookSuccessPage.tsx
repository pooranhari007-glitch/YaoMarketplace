import { Link, useSearchParams } from "react-router-dom";

export default function BookSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("booking_id");

  return (
    <div className="container success-page">
      <div className="success-card card">
        <div className="success-icon">✓</div>
        <h1>You're all set</h1>
        <p>
          {id
            ? `Reservation #${id} is confirmed. Check your email for details.`
            : "Your reservation has been received. Check your email for confirmation."}
        </p>
        <div className="success-actions">
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/faq" className="btn btn-outline">Questions? Read FAQ</Link>
        </div>
      </div>

      <style>{`
        .success-page {
          display: flex;
          justify-content: center;
          padding: 4rem 0 6rem;
        }
        .success-card {
          max-width: 480px;
          width: 100%;
          text-align: center;
          padding: 3rem 2rem;
        }
        .success-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: rgba(61, 122, 95, 0.12);
          color: var(--green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
        }
        .success-card h1 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .success-card p {
          color: var(--text-soft);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .success-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
