import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { PRICING_DEMO } from "../../data/demo";
import type { BookingType, Quote } from "../../types";

export default function LiveQuoteWidget({ defaultType = "stay" }: { defaultType?: BookingType }) {
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
      setError("Could not fetch live quote. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const bookUrl = `/book?type=${type}&start=${start}&end=${end}&guests=${guests}`;

  return (
    <div className="live-quote card">
      <div className="lq-head">
        <div>
          <span className="eyebrow">Live calculator</span>
          <h3>Instant pricing</h3>
        </div>
        <div className="lq-tabs">
          <button type="button" className={type === "stay" ? "on" : ""} onClick={() => { setType("stay"); setQuote(null); }}>Stay</button>
          <button type="button" className={type === "event" ? "on" : ""} onClick={() => { setType("event"); setQuote(null); }}>Event</button>
        </div>
      </div>

      <div className="lq-fields">
        <div className="form-group">
          <label>Check-in / Start</label>
          <input type="date" value={start} onChange={(e) => { setStart(e.target.value); setQuote(null); }} />
        </div>
        <div className="form-group">
          <label>Check-out / End</label>
          <input type="date" value={end} onChange={(e) => { setEnd(e.target.value); setQuote(null); }} />
        </div>
        <div className="form-group">
          <label>{type === "stay" ? "Guests" : "Attendees"}</label>
          <input type="number" min={1} value={guests} onChange={(e) => { setGuests(Number(e.target.value)); setQuote(null); }} />
        </div>
      </div>

      <button type="button" className="btn btn-primary lq-calc" onClick={calculate} disabled={loading || !start || !end}>
        {loading ? "Calculating…" : "Calculate price"}
      </button>

      {error && <p className="lq-error">{error}</p>}

      {quote && (
        <div className="lq-result">
          <div className="lq-row">
            <span>Total</span>
            <strong>${quote.total_amount}</strong>
          </div>
          <div className="lq-row highlight">
            <span>Deposit today</span>
            <strong>${quote.deposit_amount}</strong>
          </div>
          {type === "stay" && <p className="lq-meta">{quote.nights} nights · ${PRICING_DEMO.stayNightly}/night base</p>}
          <Link to={bookUrl} className="btn btn-cyan" style={{ width: "100%", marginTop: "0.75rem" }}>
            Continue to book →
          </Link>
        </div>
      )}

      {!quote && !error && (
        <p className="lq-hint">From ${PRICING_DEMO.stayNightly}/night · Events from ${PRICING_DEMO.eventFrom}</p>
      )}

      <style>{`
        .live-quote { padding: 0; overflow: hidden; }
        .lq-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.25rem;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .lq-head h3 { font-size: 1rem; margin-top: 0.25rem; }
        .lq-tabs { display: flex; gap: 0.35rem; }
        .lq-tabs button {
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg-panel);
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        .lq-tabs button.on {
          background: rgba(99,102,241,0.2);
          border-color: var(--primary);
          color: var(--primary-hover);
        }
        .lq-fields {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 1.25rem;
        }
        .lq-calc { margin: 0 1.25rem; width: calc(100% - 2.5rem); }
        .lq-error { color: var(--red); font-size: 0.8rem; padding: 0.5rem 1.25rem; }
        .lq-result {
          margin: 1rem 1.25rem 1.25rem;
          padding: 1rem;
          background: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .lq-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .lq-row strong { font-size: 1.25rem; color: var(--text); }
        .lq-row.highlight strong { color: var(--cyan); }
        .lq-meta { font-size: 0.75rem; color: var(--dim); margin-top: 0.5rem; }
        .lq-hint { font-size: 0.75rem; color: var(--dim); padding: 0 1.25rem 1.25rem; }
        @media (max-width: 700px) {
          .lq-fields { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
