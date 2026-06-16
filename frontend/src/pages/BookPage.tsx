import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
    const s = params.get("start");
    const e = params.get("end");
    const g = params.get("guests");
    if (s) setStartDate(s);
    if (e) setEndDate(e);
    if (g) setGuestCount(Number(g));
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
        `/bookings?success_url=${encodeURIComponent(window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "") + "/book/success")}&cancel_url=${encodeURIComponent(window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "") + "/book")}`,
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

  const stepNum = step === "dates" ? 1 : step === "guest" ? 2 : 3;

  return (
    <div className="container book-page">
      <section className="page-hero">
        <span className="eyebrow">Reserve</span>
        <h1>Book your dates</h1>
        <p>Instant quote, secure deposit, confirmation by email. No platform fees.</p>
      </section>

      <div className="book-steps">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`book-step ${stepNum >= n ? "done" : ""} ${stepNum === n ? "active" : ""}`}>
            <span>{n}</span>
            {n === 1 ? "Dates" : n === 2 ? "Details" : "Insurance"}
          </div>
        ))}
      </div>

      <div className="book-layout">
        <div className="book-form card">
          <div className="type-tabs">
            <button type="button" className={bookingType === "stay" ? "on" : ""} onClick={() => { setBookingType("stay"); setQuote(null); setStep("dates"); }}>Overnight stay</button>
            <button type="button" className={bookingType === "event" ? "on" : ""} onClick={() => { setBookingType("event"); setQuote(null); setStep("dates"); }}>Private event</button>
          </div>

          {step === "dates" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Check-in" : "Start date"}</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Check-out" : "End date"}</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>{bookingType === "stay" ? "Guests" : "Attendees"}</label>
                <input type="number" min={1} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
              </div>
              {error && <p className="err">{error}</p>}
              <button type="button" className="btn btn-primary" onClick={fetchQuote}>Get instant quote</button>
            </>
          )}

          {step === "guest" && quote && (
            <>
              <div className="form-group"><label>Full name</label><input value={guestName} onChange={(e) => setGuestName(e.target.value)} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} /></div>
              <div className="form-group"><label>Phone</label><input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} /></div>
              <div className="form-group"><label>Notes (optional)</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Arrival time, special requests…" /></div>
              <div className="btn-row">
                <button type="button" className="btn btn-ghost" onClick={() => setStep("dates")}>Back</button>
                {bookingType === "event" && <button type="button" className="btn btn-ghost" onClick={() => setStep("insurance")}>Upload COI</button>}
                <button type="button" className="btn btn-accent" disabled={loading || !guestName || !guestEmail} onClick={submitBooking}>
                  {loading ? "Processing…" : `Pay $${quote.deposit_amount} deposit`}
                </button>
              </div>
              {error && <p className="err">{error}</p>}
            </>
          )}

          {step === "insurance" && (
            <>
              <p className="hint">Upload your Certificate of Insurance (PDF or image). Required for all events.</p>
              <div className="form-group">
                <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => setCoiFile(e.target.files?.[0] || null)} />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep("guest")}>Continue</button>
            </>
          )}
        </div>

        <aside className="book-summary card">
          <h3>Your quote</h3>
          {quote ? (
            <>
              <div className="quote-line"><span>Total</span><strong>${quote.total_amount}</strong></div>
              <div className="quote-line accent"><span>Deposit today</span><strong>${quote.deposit_amount}</strong></div>
              {bookingType === "stay" && quote.nights && (
                <div className="quote-line dim"><span>{quote.nights} nights</span><span>${PRICING_DEMO.stayNightly}/night</span></div>
              )}
              <p className="quote-note">{PRICING_DEMO.depositPercent}% deposit due now. Balance before arrival.</p>
            </>
          ) : (
            <p className="hint">Select your dates to see live pricing.</p>
          )}
        </aside>
      </div>

      <style>{`
        .book-page { padding-bottom: 4rem; }
        .book-steps {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .book-step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--surface-muted);
          border-radius: var(--radius);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .book-step span {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--border);
          font-size: 0.75rem;
        }
        .book-step.active {
          background: var(--forest);
          color: #fff;
        }
        .book-step.active span { background: rgba(255,255,255,0.2); }
        .book-step.done { color: var(--forest); }
        .book-step.done span { background: var(--forest); color: #fff; }
        .book-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.5rem;
          align-items: start;
        }
        .type-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .type-tabs button {
          flex: 1;
          padding: 0.65rem;
          border-radius: var(--radius);
          border: 1.5px solid var(--border);
          background: var(--surface);
          color: var(--text-soft);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .type-tabs button.on {
          border-color: var(--forest);
          background: rgba(44, 74, 62, 0.08);
          color: var(--forest);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .btn-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .err { color: var(--red); font-size: 0.85rem; margin: 0.75rem 0; }
        .hint { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
        .book-summary h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .quote-line {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.92rem;
          color: var(--text-soft);
        }
        .quote-line strong { font-size: 1.15rem; color: var(--text); }
        .quote-line.accent strong { color: var(--accent); font-size: 1.35rem; }
        .quote-line.dim { font-size: 0.82rem; border-bottom: none; }
        .quote-note {
          margin-top: 1rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        @media (max-width: 800px) {
          .book-layout, .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
