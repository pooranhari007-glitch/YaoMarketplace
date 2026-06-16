const items = [
  { icon: "✓", label: "Book direct — no platform fees" },
  { icon: "🔒", label: "Secure Stripe payments" },
  { icon: "📅", label: "Real-time availability" },
  { icon: "★", label: "Professionally managed" },
];

export default function TrustBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`trust-bar ${light ? "light" : ""}`}>
      <div className="container trust-inner">
        {items.map((item) => (
          <div key={item.label} className="trust-item">
            <span className="trust-icon" aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        .trust-bar {
          background: linear-gradient(90deg, var(--accent-deep), var(--accent));
          color: rgba(255,255,255,0.95);
          padding: 0.65rem 0;
          font-size: 0.72rem;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(29, 78, 216, 0.2);
        }
        .trust-bar.light {
          background: var(--surface);
          color: var(--accent-deep);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .trust-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.85rem 1.5rem;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .trust-icon { opacity: 0.95; font-size: 0.7rem; }
        @media (max-width: 640px) {
          .trust-inner { flex-direction: column; align-items: center; gap: 0.4rem; }
        }
      `}</style>
    </div>
  );
}
