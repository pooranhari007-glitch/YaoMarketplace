import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TrustBar from "../components/TrustBar";
import { api } from "../api/client";
import { IMAGES, PRICING_DEMO, SITE } from "../data/demo";
import type { BookingType, CheckoutResult, Quote } from "../types";

const steps = ["Dates", "Details", "Insurance", "Payment"] as const;

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

  const stepIndex = step === "dates" ? 0 : step === "guest" ? 1 : 2;

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
        setError("Booking created. Stripe checkout will activate when payment keys are configured.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="book-hero" style={{ backgroundImage: `url(${IMAGES.book})` }}>
        <div className="book-hero-overlay" />
        <div className="container book-hero-content">
          <span className="eyebrow hero-eyebrow">Direct booking</span>
          <h1>Reserve {SITE.name}</h1>
          <p>Instant quote · Secure deposit · No platform fees</p>
        </div>
      </section>
      <TrustBar light />

      <div className="container book-layout">
        <aside className="book-sidebar card">
          <h3>Your reservation</h3>
          <div className="type-toggle">
            <button
              type="button"
              className={bookingType === "stay" ? "active stay" : ""}
              onClick={() => { setBookingType("stay"); setQuote(null); setStep("dates"); }}
            >
              Overnight stay
            </button>
            <button
              type="button"
              className={bookingType === "event" ? "active event" : ""}
              onClick={() => { setBookingType("event"); setQuote(null); setStep("dates"); }}
            >
              Event / gathering
            </button>
          </div>

          {quote ? (
            <div className="quote-box">
              <div className="quote-line">
                <span>Total</span>
                <strong>${quote.total_amount}</strong>
              </div>
              <div className="quote-line highlight">
                <span>Deposit due today</span>
                <strong>${quote.deposit_amount}</strong>
              </div>
              {bookingType === "stay" && (
                <p className="quote-note">{quote.nights} night(s) · from ${PRICING_DEMO.stayNightly}/night</p>
              )}
            </div>
          ) : (
            <p className="sidebar-hint">
              {bookingType === "stay"
                ? `Stays from $${PRICING_DEMO.stayNightly}/night · ${PRICING_DEMO.depositPercent}% deposit`
                : `Events from $${PRICING_DEMO.eventFrom} · ${PRICING_DEMO.depositPercent}% deposit`}
            </p>
          )}

          <ul className="sidebar-trust">
            <li>Secure Stripe checkout</li>
            <li>Synced calendar availability</li>
            <li>Confirmation by email</li>
          </ul>
        </aside>

        <div className="book-main">
          <div className="stepper">
            {steps.map((s, i) => (
              <div key={s} className={`step ${i <= stepIndex ? "done" : ""} ${i === stepIndex ? "current" : ""}`}>
                <span className="step-num">{i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {step === "dates" && (
            <div className="card book-form">
              <h2>Select your dates</h2>
              <p className="form-desc">
                {bookingType === "stay"
                  ? "Choose check-in and check-out. Minimum stay may apply."
                  : "Select your event start and end dates for an instant package quote."}
              </p>
              <div className="form-row">
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Check-in" : "Event start"}</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{bookingType === "stay" ? "Check-out" : "Event end"}</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>{bookingType === "stay" ? "Guests" : "Expected attendees"}</label>
                <input
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="button" className="btn btn-primary" onClick={fetchQuote}>
                Get instant quote →
              </button>
            </div>
          )}

          {step === "guest" && quote && (
            <div className="card book-form">
              <h2>Guest details</h2>
              <p className="form-desc">We&apos;ll send confirmation and arrival details to this email.</p>
              <div className="form-group">
                <label>Full name</label>
                <input value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Special requests</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Dietary needs, setup requests, arrival time..." />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep("dates")}>Back</button>
                {bookingType === "event" && (
                  <button type="button" className="btn btn-outline" onClick={() => setStep("insurance")}>
                    Add COI
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={loading || !guestName || !guestEmail}
                  onClick={submitBooking}
                >
                  {loading ? "Processing..." : `Pay $${quote.deposit_amount} deposit`}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
          )}

          {step === "insurance" && (
            <div className="card book-form">
              <h2>Certificate of Insurance</h2>
              <p className="form-desc">
                Required for most events. Upload your COI now or{" "}
                <a href="https://www.eventhelper.com" target="_blank" rel="noreferrer">purchase coverage</a>.
              </p>
              <div className="form-group">
                <label>Upload COI (PDF or image)</label>
                <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => setCoiFile(e.target.files?.[0] || null)} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep("guest")}>Back to details</button>
              </div>
            </div>
          )}

          <p className="book-footer-note">
            Questions? <Link to="/faq">Read FAQ</Link> or use the chat widget.
          </p>
        </div>
      </div>

      <style>{`
        .book-hero {
          position: relative;
          min-height: 220px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          color: white;
        }
        .book-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.88), rgba(37, 99, 235, 0.4));
        }
        .book-hero-content {
          position: relative;
          padding: 2.5rem 0;
        }
        .hero-eyebrow { color: var(--gold); }
        .book-hero h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 0.25rem 0; }
        .book-hero p { color: rgba(255,255,255,0.85); }
        .book-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2rem;
          padding: 2.5rem 0 4rem;
          align-items: start;
        }
        .book-sidebar h3 { font-size: 1.1rem; margin-bottom: 1rem; }
        .type-toggle { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
        .type-toggle button {
          padding: 0.65rem 1rem;
          border: 2px solid var(--border);
          border-radius: 10px;
          background: var(--bg);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.88rem;
          text-align: left;
          transition: all 0.15s;
        }
        .type-toggle button.active.stay,
        .type-toggle button.active.event {
          border-color: var(--accent-light);
          background: var(--accent-soft);
          color: var(--accent-deep);
          box-shadow: var(--shadow-sm);
        }
        .quote-box {
          background: var(--bg);
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .quote-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
        }
        .quote-line.highlight {
          padding-top: 0.5rem;
          border-top: 1px dashed var(--border);
          font-weight: 600;
        }
        .quote-line strong { font-family: "Playfair Display", serif; font-size: 1.2rem; }
        .quote-note { font-size: 0.8rem; color: var(--muted); margin-top: 0.5rem; }
        .sidebar-hint { font-size: 0.88rem; color: var(--muted); margin-bottom: 1rem; }
        .sidebar-trust {
          list-style: none;
          font-size: 0.82rem;
          color: var(--muted);
          display: grid;
          gap: 0.4rem;
        }
        .sidebar-trust li::before { content: "✓ "; color: var(--accent-light); font-weight: 700; }
        .stepper {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .step {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 500;
        }
        .step-num {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .step.done .step-num, .step.current .step-num {
          background: linear-gradient(180deg, var(--accent-light), var(--accent-deep));
          border-color: var(--accent-deep);
          color: white;
          box-shadow: 0 3px 10px rgba(29, 78, 216, 0.35);
        }
        .step.current { color: var(--text); font-weight: 600; }
        .book-form h2 { font-size: 1.5rem; margin-bottom: 0.35rem; }
        .form-desc { color: var(--muted); font-size: 0.92rem; margin-bottom: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .error { color: #b33; margin: 0.75rem 0 0; font-size: 0.9rem; }
        .book-footer-note { margin-top: 1rem; font-size: 0.88rem; color: var(--muted); }
        @media (max-width: 860px) {
          .book-layout { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
