import { Link } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  variant?: "stay" | "event" | "default";
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  variant = "default",
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className={`page-hero variant-${variant}`}>
      <div className="hero-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden />
      <div className="hero-overlay" aria-hidden />
      <div className="container hero-content">
        {eyebrow && <span className="eyebrow hero-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p className="hero-sub">{subtitle}</p>
        {(primaryCta || secondaryCta) && (
          <div className="hero-ctas">
            {primaryCta && (
              <Link to={primaryCta.to} className="btn btn-primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.to} className="btn btn-ghost">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
      <style>{`
        .page-hero {
          position: relative;
          min-height: clamp(420px, 72vh, 620px);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          color: white;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.82) 0%,
            rgba(29, 78, 216, 0.45) 45%,
            rgba(59, 130, 246, 0.18) 100%
          );
        }
        .variant-stay .hero-overlay {
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.88) 0%,
            rgba(30, 58, 138, 0.5) 50%,
            rgba(96, 165, 250, 0.2) 100%
          );
        }
        .variant-event .hero-overlay {
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.86) 0%,
            rgba(37, 99, 235, 0.48) 50%,
            rgba(147, 197, 253, 0.22) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 1;
          padding: 3rem 0 4rem;
          max-width: 720px;
        }
        .hero-eyebrow { color: var(--gold); text-shadow: 0 1px 8px rgba(59, 130, 246, 0.5); }
        .page-hero h1 {
          font-size: clamp(2rem, 5.5vw, 3.5rem);
          margin-bottom: 0.85rem;
          text-shadow: 0 2px 16px rgba(15, 23, 42, 0.35);
        }
        .hero-sub {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.88);
          margin-bottom: 1.75rem;
          max-width: 52ch;
        }
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
      `}</style>
    </section>
  );
}
