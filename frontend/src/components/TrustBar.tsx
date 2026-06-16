const items = [
  "Direct reservation",
  "Secure payment",
  "Private calendar",
  "Concierge service",
];

export default function TrustBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`lux-trust ${dark ? "dark" : ""}`}>
      <div className="container lux-trust-inner">
        {items.map((label, i) => (
          <span key={label} className="lux-trust-item">
            {i > 0 && <span className="lux-dot" aria-hidden>·</span>}
            {label}
          </span>
        ))}
      </div>
      <style>{`
        .lux-trust {
          border-bottom: 1px solid var(--line);
          background: var(--white);
          padding: 1.1rem 0;
        }
        .lux-trust.dark {
          background: var(--charcoal);
          border-color: var(--line-light);
        }
        .lux-trust-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.5rem 0;
        }
        .lux-trust-item {
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .lux-trust.dark .lux-trust-item { color: rgba(255,255,255,0.45); }
        .lux-dot {
          margin: 0 1.25rem;
          color: var(--gold-dim);
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
