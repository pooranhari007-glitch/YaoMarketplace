import { Link } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  variant?: "stay" | "event" | "default";
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  compact?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  primaryCta,
  secondaryCta,
  compact = false,
}: Props) {
  return (
    <section className={`lux-hero ${compact ? "compact" : ""}`}>
      <div className="lux-hero-bg" style={{ backgroundImage: `url(${image})` }} aria-hidden />
      <div className="lux-hero-overlay" aria-hidden />
      <div className="container lux-hero-inner reveal">
        {eyebrow && <span className="eyebrow lux-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <div className="divider" />
        <p className="lux-sub">{subtitle}</p>
        {(primaryCta || secondaryCta) && (
          <div className="lux-ctas">
            {primaryCta && (
              <Link to={primaryCta.to} className="btn btn-light">
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
      <div className="lux-scroll" aria-hidden>
        <span>Scroll</span>
        <div className="lux-scroll-line" />
      </div>
      <style>{`
        .lux-hero {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: flex-end;
          color: var(--white);
          overflow: hidden;
        }
        .lux-hero.compact {
          min-height: 72vh;
        }
        .lux-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.04);
          animation: heroZoom 18s var(--ease) forwards;
        }
        @keyframes heroZoom {
          to { transform: scale(1); }
        }
        .lux-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8, 8, 8, 0.25) 0%,
            rgba(8, 8, 8, 0.55) 50%,
            rgba(8, 8, 8, 0.92) 100%
          );
        }
        .lux-hero-inner {
          position: relative;
          z-index: 1;
          padding: 0 0 6rem;
          max-width: 680px;
        }
        .lux-eyebrow { color: var(--gold-light); }
        .lux-hero h1 {
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 400;
          color: var(--white);
          margin-bottom: 0;
        }
        .lux-hero .divider { background: var(--gold); margin: 1.75rem 0; }
        .lux-sub {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.62);
          max-width: 44ch;
          margin-bottom: 2.5rem;
        }
        .lux-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .lux-scroll {
          position: absolute;
          right: 5vw;
          bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 1;
        }
        .lux-scroll span {
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          writing-mode: vertical-rl;
        }
        .lux-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--gold), transparent);
        }
        @media (max-width: 768px) {
          .lux-scroll { display: none; }
          .lux-hero-inner { padding-bottom: 4rem; }
        }
      `}</style>
    </section>
  );
}
