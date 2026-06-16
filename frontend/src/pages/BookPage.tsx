import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { IMAGES, PRICING_DEMO, SITE } from "../data/demo";
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
      setError(e instanceof Error ? e.message : "Could not retrieve quote");
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
        setError("Reservation received. Payment portal activates upon configuration.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reservation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lux-book">
      <div className="lux-book-hero" style={{ backgroundImage: `url(${IMAGES.book})` }}>
        <div className="lux-book-overlay" />
        <div className="container lux-book-hero-text">
          <span className="eyebrow">Reservation</span>
          <h1>{SITE.name}</h1>
        </div>
      </div>

      <div className="container lux-book-layout">
        <aside className="lux-book-aside reveal">
          <span className="eyebrow">Experience</span>
          <div className="lux-type-select">
            <button
              type="button"
              className={bookingType === "stay" ? "active" : ""}
              onClick={() => { setBookingType("stay"); setQuote(null); setStep("dates"); }}
            >
              Private stay
            </button>
            <button
              type="button"
              className={bookingType === "event" ? "active" : ""}
              onClick={() => { setBookingType("event"); setQuote(null); setStep("dates"); }}
            >
              Private event
            </button>
          </div>

          {quote ? (
            <div className="lux-quote">
              <div className="lux-quote-row">
                <span>Total</span>
                <strong>${quote.total_amount}</strong>
              </div>
              <div className="lux-quote-row accent">
                <span>Retainer due</span>
                <strong>${quote.deposit_amount}</strong>
              </div>
              {bookingType === "stay" && (
                <p className="lux-quote-meta">{quote.nights} nights</p>
              )}
            </div>
          ) : (
            <p className="lux-aside-note">
              {bookingType === "stay"
                ? `From $${PRICING_DEMO.stayNightly} per evening`
                : `From $${PRICING_DEMO.eventFrom.toLocaleString()} per event`}
            </p>
          )}

          <ul className="lux-aside-list">
            <li>Secure payment</li>
            <li>Instant confirmation</li>
            <li>Concierge support</li>
          </ul>
        </aside>

        <div className="lux-book-form-wrap reveal">
          <div className="lux-steps">
            {["Dates", "Details", "Complete"].map((s, i) => (
              <span key={s} className={`lux-step ${i <= (step === "dates" ? 0 : step === "guest" ? 1 : 2) ? "on" : ""}`}>
                {s}
              </span>
            ))}
          </div>

          {step === "dates" && (
            <div className="lux-form-panel">
              <h2>Select your dates</h2>
              <div className="lux-form-row">
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Arrival" : "Event begins"}</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Departure" : "Event concludes"}</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>{bookingType === "stay" ? "Guests" : "Attendees"}</label>
                <input type="number" min={1} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
              </div>
              {error && <p className="lux-error">{error}</p>}
              <button type="button" className="btn btn-primary" onClick={fetchQuote}>
                Continue
              </button>
            </div>
          )}

          {step === "guest" && quote && (
            <div className="lux-form-panel">
              <h2>Your details</h2>
              <div className="form-group">
                <label>Full name</label>
                <input value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telephone</label>
                <input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Special requests</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
              <div className="lux-form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep("dates")}>Back</button>
                {bookingType === "event" && (
                  <button type="button" className="btn btn-outline" onClick={() => setStep("insurance")}>Add COI</button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={loading || !guestName || !guestEmail}
                  onClick={submitBooking}
                >
                  {loading ? "Processing…" : `Pay $${quote.deposit_amount} retainer`}
                </button>
              </div>
              {error && <p className="lux-error">{error}</p>}
            </div>
          )}

          {step === "insurance" && (
            <div className="lux-form-panel">
              <h2>Certificate of insurance</h2>
              <p className="lux-form-note">
                Upload your COI or{" "}
                <a href="https://www.eventhelper.com" target="_blank" rel="noreferrer">obtain coverage</a>.
              </p>
              <div className="form-group">
                <label>Document</label>
                <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => setCoiFile(e.target.files?.[0] || null)} />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep("guest")}>Return</button>
            </div>
          )}

          <p className="lux-form-footer">
            Enquiries · <Link to="/faq">FAQ</Link>
          </p>
        </div>
      </div>

      <style>{`
        .lux-book-hero {
          height: 40vh;
          min-height: 280px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          margin-top: 72px;
        }
        .lux-book-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.9), rgba(8,8,8,0.3));
        }
        .lux-book-hero-text {
          position: relative;
          padding-bottom: 3rem;
          color: var(--white);
        }
        .lux-book-hero h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--white);
        }
        .lux-book-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 4rem;
          padding: 4rem 0 6rem;
          align-items: start;
        }
        .lux-type-select {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--line);
          margin: 1rem 0 2rem;
        }
        .lux-type-select button {
          padding: 1rem 1.25rem;
          border: none;
          border-bottom: 1px solid var(--line);
          background: transparent;
          text-align: left;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--stone);
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .lux-type-select button:last-child { border-bottom: none; }
        .lux-type-select button.active {
          background: var(--black);
          color: var(--white);
        }
        .lux-quote {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 1.5rem 0;
          margin-bottom: 2rem;
        }
        .lux-quote-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.75rem;
        }
        .lux-quote-row strong {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.5rem;
          color: var(--black);
          letter-spacing: 0;
          text-transform: none;
        }
        .lux-quote-row.accent strong { color: var(--gold); }
        .lux-quote-meta { font-size: 0.75rem; color: var(--muted); }
        .lux-aside-note {
          font-weight: 300;
          color: var(--stone);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .lux-aside-list {
          list-style: none;
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .lux-aside-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--line);
        }
        .lux-steps {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .lux-step {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .lux-step.on { color: var(--black); }
        .lux-step.on::after {
          content: "";
          display: block;
          width: 100%;
          height: 1px;
          background: var(--gold);
          margin-top: 0.5rem;
        }
        .lux-form-panel h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .lux-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .lux-form-note {
          font-weight: 300;
          color: var(--stone);
          margin-bottom: 1.5rem;
          font-size: 0.92rem;
        }
        .lux-form-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .lux-error { color: #9b2c2c; font-size: 0.88rem; margin-top: 1rem; }
        .lux-form-footer {
          margin-top: 2rem;
          font-size: 0.75rem;
          color: var(--muted);
          letter-spacing: 0.08em;
        }
        @media (max-width: 860px) {
          .lux-book-layout { grid-template-columns: 1fr; }
          .lux-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
