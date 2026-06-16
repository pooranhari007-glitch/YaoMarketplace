import { Link, Outlet, useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";
import { SITE } from "../data/demo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/stay", label: "Stay" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/policies", label: "Policies" },
  { to: "/faq", label: "FAQ" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const onHero = pathname === "/" || pathname === "/stay" || pathname === "/events";

  return (
    <>
      <header className={`lux-header ${onHero ? "on-hero" : ""}`}>
        <div className="container lux-header-inner">
          <Link to="/" className="lux-logo">
            <span className="lux-logo-mark">{SITE.shortName}</span>
          </Link>
          <nav className="lux-nav">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={pathname === item.to ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/book" className="btn btn-primary lux-reserve">
            Reserve
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="lux-footer">
        <div className="container lux-footer-top">
          <div className="lux-footer-brand">
            <span className="eyebrow">Est. MMXXIV</span>
            <h2>{SITE.name}</h2>
            <p>{SITE.tagline}</p>
          </div>
          <div className="lux-footer-col">
            <span className="footer-label">Experience</span>
            <Link to="/stay">Private stays</Link>
            <Link to="/events">Private events</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
          <div className="lux-footer-col">
            <span className="footer-label">Reserve</span>
            <Link to="/book?type=stay">Book a stay</Link>
            <Link to="/book?type=event">Plan an event</Link>
            <Link to="/policies">Policies</Link>
          </div>
        </div>
        <div className="container lux-footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p className="lux-footer-loc">{SITE.location}</p>
        </div>
      </footer>
      <ChatWidget />
      <style>{`
        .lux-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          transition: background 0.5s var(--ease), border-color 0.5s;
          border-bottom: 1px solid transparent;
        }
        .lux-header.on-hero {
          background: linear-gradient(to bottom, rgba(8,8,8,0.5), transparent);
        }
        .lux-header:not(.on-hero) {
          background: rgba(250, 249, 247, 0.92);
          backdrop-filter: blur(16px);
          border-bottom-color: var(--line);
        }
        .lux-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 2rem;
        }
        .lux-logo-mark {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--white);
          transition: color 0.5s;
        }
        .lux-header:not(.on-hero) .lux-logo-mark { color: var(--black); }
        .lux-nav {
          display: flex;
          gap: 2rem;
        }
        .lux-nav a {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          transition: color 0.3s;
        }
        .lux-header:not(.on-hero) .lux-nav a { color: var(--stone); }
        .lux-nav a:hover,
        .lux-nav a.active { color: var(--gold); }
        .lux-header:not(.on-hero) .lux-nav a.active { color: var(--black); }
        .lux-reserve {
          padding: 0.75rem 1.5rem;
          font-size: 0.62rem;
        }
        .lux-header.on-hero .btn-primary {
          background: transparent;
          border-color: rgba(255,255,255,0.4);
          color: var(--white);
        }
        .lux-header.on-hero .btn-primary:hover {
          background: var(--white);
          color: var(--black);
          border-color: var(--white);
        }
        .lux-footer {
          background: var(--black);
          color: rgba(255,255,255,0.45);
          padding-top: 5rem;
        }
        .lux-footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--line-light);
        }
        .lux-footer-brand h2 {
          font-size: 2.5rem;
          color: var(--cream);
          margin-bottom: 0.75rem;
        }
        .lux-footer-brand p {
          font-weight: 300;
          font-size: 0.95rem;
        }
        .footer-label {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.25rem;
        }
        .lux-footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .lux-footer-col a {
          font-size: 0.88rem;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          transition: color 0.3s;
        }
        .lux-footer-col a:hover { color: var(--cream); }
        .lux-footer-bottom {
          display: flex;
          justify-content: space-between;
          padding: 1.75rem 0;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }
        .lux-footer-loc { color: var(--gold); }
        @media (max-width: 768px) {
          .lux-nav { display: none; }
          .lux-footer-top { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </>
  );
}
