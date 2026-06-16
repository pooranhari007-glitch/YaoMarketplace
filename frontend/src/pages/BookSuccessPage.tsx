import { useSearchParams, Link } from "react-router-dom";

export default function BookSuccessPage() {
  const [params] = useSearchParams();
  const id = params.get("booking_id");

  return (
    <div className="container page" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1>Thank you!</h1>
      <p style={{ color: "var(--muted)", margin: "1rem 0 2rem" }}>
        {id ? `Your booking #${id} is confirmed.` : "Your booking has been received."}
      </p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
