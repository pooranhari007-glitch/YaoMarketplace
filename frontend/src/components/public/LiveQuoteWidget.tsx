import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { useSiteConfig } from "../../hooks/useSiteConfig";
import type { BookingType, Quote } from "../../types";

export default function LiveQuoteWidget({ defaultType = "stay" }: { defaultType?: BookingType }) {
  const { site } = useSiteConfig();
  const [type, setType] = useState<BookingType>(defaultType);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [guests, setGuests] = useState(2);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function calculate() {
    if (!start || !end) return;
    setLoading(true);
    setError("");
    try {
      const q = await api<Quote>("/bookings/quote", {
        method: "POST",
        body: JSON.stringify({
          booking_type: type,
          start_date: start,
          end_date: end,
          guest_count: guests,
        }),
      });
      setQuote(q);
    } catch {
      setError("Could not fetch quote. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const bookUrl = `/book?type=${type}&start=${start}&end=${end}&guests=${guests}`;

  return (
    <div className="booking-widget card">
      <div className="bw-head">
        <h3>Check availability</h3>
        <div className="bw-tabs">
          <button type="button" className={type === "stay" ? "on" : ""} onClick={() => { setType("stay"); setQuote(null); }}>Stay</button>
          <button type="button" className={type === "event" ? "on" : ""} onClick={() => { setType("event"); setQuote(null); }}>Event</button>
        </div>
      </div>

      <div className="bw-fields">
        <div className="form-group">
          <label>{type === "stay" ? "Check-in" : "Start"}</label>
          <input type="date" value={start} onChange={(e) => { setStart(e.target.value); setQuote(null); }} />
        </div>
        <div className="form-group">
          <label>{type === "stay" ? "Check-out" : "End"}</label>
          <input type="date" value={end} onChange={(e) => { setEnd(e.target.value); setQuote(null); }} />
        </div>
        <div className="form-group">
          <label>{type === "stay" ? "Guests" : "Attendees"}</label>
          <input type="number" min={1} value={guests} onChange={(e) => { setGuests(Number(e.target.value)); setQuote(null); }} />
        </div>
      </div>

      <button type="button" className="btn btn-primary bw-calc" onClick={calculate} disabled={loading || !start || !end}>
        {loading ? "Calculating…" : "Get instant quote"}
      </button>

      {error && <p className="bw-error">{error}</p>}

      {quote ? (
        <div className="bw-result">
          <div className="bw-row">
            <span>Total</span>
            <strong>${quote.total_amount}</strong>
          </div>
          <div className="bw-row accent">
            <span>Deposit today</span>
            <strong>${quote.deposit_amount}</strong>
          </div>
          {type === "stay" && quote.nights && (
            <p className="bw-meta">{quote.nights} nights · ${site.stay_nightly}/night</p>
          )}
          <Link to={bookUrl} className="btn btn-accent" style={{ width: "100%", marginTop: "0.75rem" }}>
            Continue to book
          </Link>
        </div>
      ) : (
        <p className="bw-hint">From ${site.stay_nightly}/night · Events from ${site.event_from.toLocaleString()}</p>
      )}

      <style>{`
        .booking-widget {
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .bw-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          gap: 1rem;
        }
        .bw-head h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
        }
        .bw-tabs { display: flex; gap: 0.35rem; }
        .bw-tabs button {
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface-muted);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
        }
        .bw-tabs button.on {
          background: var(--forest);
          border-color: var(--forest);
          color: #fff;
        }
        .bw-fields { display: grid; gap: 0.75rem; margin-bottom: 1rem; }
        .bw-calc { width: 100%; }
        .bw-error { color: var(--red); font-size: 0.82rem; margin-top: 0.5rem; }
        .bw-result {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .bw-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--text-soft);
          margin-bottom: 0.5rem;
        }
        .bw-row strong { font-size: 1.2rem; color: var(--text); }
        .bw-row.accent strong { color: var(--accent); font-size: 1.35rem; }
        .bw-meta { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem; }
        .bw-hint { font-size: 0.78rem; color: var(--text-muted); margin-top: 1rem; text-align: center; }
      `}</style>
    </div>
  );
}
