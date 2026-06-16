import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Panel, StatCard } from "../components/DashboardCharts";
import { api } from "../api/client";
import { PRICING_DEMO } from "../data/demo";
import type { BookingType, CheckoutResult, Quote } from "../types";

export default function BookPage() {
  const [params] = useSearchParams();
  const [bookingType, setBookingType] = useState<BookingType>(
    (params.get("type") as BookingType) || "stay"
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"dates" | "guest" | "insurance">("dates");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coiFile, setCoiFile] = useState<File | null>(null);

  useEffect(() => {
    const t = params.get("type");
    if (t === "stay" || t === "event") setBookingType(t);
  }, [params]);

  async function fetchQuote() {
    if (!startDate || !endDate) return;
    setError("");
    try {
      const q = await api<Quote>("/bookings/quote", {
        method: "POST",
        body: JSON.stringify({
          booking_type: bookingType,
          start_date: startDate,
          end_date: endDate,
          guest_count: guestCount,
        }),
      });
      setQuote(q);
      setStep("guest");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not get quote");
    }
  }

  async function submitBooking() {
    setLoading(true);
    setError("");
    try {
      const result = await api<CheckoutResult>(
        `/bookings?success_url=${encodeURIComponent(window.location.origin + "/book/success")}&cancel_url=${encodeURIComponent(window.location.origin + "/book")}`,
        {
          method: "POST",
          body: JSON.stringify({
            booking_type: bookingType,
            start_date: startDate,
            end_date: endDate,
            guest_name: guestName,
            guest_email: guestEmail,
            guest_phone: guestPhone,
            guest_count: guestCount,
            notes,
          }),
        }
      );
      if (coiFile) {
        const form = new FormData();
        form.append("guest_email", guestEmail);
        form.append("booking_id", String(result.booking_id));
        form.append("file", coiFile);
        await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"}/insurance/upload`,
          { method: "POST", body: form }
        );
      }
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        setError("Booking created (#" + result.booking_id + "). Stripe activates when keys are set.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="book-dash">
      <div className="book-dash-stats">
        <StatCard label="Type" value={bookingType === "stay" ? "Stay" : "Event"} icon="◆" />
        <StatCard
          label="Quote"
          value={quote ? `$${quote.total_amount}` : "—"}
          icon="💵"
        />
        <StatCard
          label="Deposit"
          value={quote ? `$${quote.deposit_amount}` : `${PRICING_DEMO.depositPercent}%`}
          icon="🔒"
        />
      </div>

      <div className="book-dash-grid">
        <Panel title="Booking wizard" subtitle={`Step ${step === "dates" ? 1 : step === "guest" ? 2 : 3} of 3`}>
          <div className="type-tabs">
            <button type="button" className={bookingType === "stay" ? "on" : ""} onClick={() => { setBookingType("stay"); setQuote(null); setStep("dates"); }}>Stay</button>
            <button type="button" className={bookingType === "event" ? "on" : ""} onClick={() => { setBookingType("event"); setQuote(null); setStep("dates"); }}>Event</button>
          </div>

          {step === "dates" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Start</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>End</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>{bookingType === "stay" ? "Guests" : "Attendees"}</label>
                <input type="number" min={1} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
              </div>
              {error && <p className="err">{error}</p>}
              <button type="button" className="btn btn-primary" onClick={fetchQuote}>Get quote →</button>
            </>
          )}

          {step === "guest" && quote && (
            <>
              <div className="form-group"><label>Name</label><input value={guestName} onChange={(e) => setGuestName(e.target.value)} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} /></div>
              <div className="form-group"><label>Phone</label><input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} /></div>
              <div className="form-group"><label>Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} /></div>
              <div className="btn-row">
                <button type="button" className="btn btn-ghost" onClick={() => setStep("dates")}>Back</button>
                {bookingType === "event" && <button type="button" className="btn btn-ghost" onClick={() => setStep("insurance")}>COI</button>}
                <button type="button" className="btn btn-primary" disabled={loading || !guestName || !guestEmail} onClick={submitBooking}>
                  {loading ? "…" : `Pay $${quote.deposit_amount}`}
                </button>
              </div>
              {error && <p className="err">{error}</p>}
            </>
          )}

          {step === "insurance" && (
            <>
              <p className="hint">Upload Certificate of Insurance (PDF)</p>
              <div className="form-group">
                <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => setCoiFile(e.target.files?.[0] || null)} />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep("guest")}>Back</button>
            </>
          )}
        </Panel>

        <Panel title="Quote breakdown" subtitle="Live pricing">
          {quote ? (
            <div className="quote-lines">
              <div className="ql"><span>Subtotal</span><strong>${quote.total_amount}</strong></div>
              <div className="ql accent"><span>Deposit now</span><strong>${quote.deposit_amount}</strong></div>
              {bookingType === "stay" && <div className="ql dim"><span>Nights</span><strong>{quote.nights}</strong></div>}
            </div>
          ) : (
            <p className="hint">Select dates to generate a live quote from the API.</p>
          )}
        </Panel>
      </div>

      <style>{`
        .book-dash-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .book-dash-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1rem;
        }
        .type-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .type-tabs button {
          flex: 1;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-panel);
          color: var(--muted);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
        }
        .type-tabs button.on {
          background: rgba(99,102,241,0.2);
          border-color: var(--primary);
          color: var(--primary-hover);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .btn-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .err { color: var(--red); font-size: 0.82rem; margin: 0.5rem 0; }
        .hint { font-size: 0.82rem; color: var(--dim); margin-bottom: 1rem; }
        .quote-lines { display: grid; gap: 0.75rem; }
        .ql {
          display: flex;
          justify-content: space-between;
          padding: 0.65rem 0.75rem;
          background: var(--bg-panel);
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .ql strong { color: var(--text); font-size: 1.1rem; }
        .ql.accent strong { color: var(--cyan); }
        .ql.dim strong { color: var(--dim); font-size: 0.9rem; }
        @media (max-width: 800px) {
          .book-dash-stats, .book-dash-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
