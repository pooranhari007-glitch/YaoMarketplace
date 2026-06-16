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

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">H</span>
            <span>
              <strong>{SITE.name}</strong>
              <small>{SITE.tagline}</small>
            </span>
          </Link>
          <nav className="nav">
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
          <Link to="/book" className="btn btn-primary header-cta">
            Book direct
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong className="footer-brand">{SITE.name}</strong>
            <p>Overnight stays & private events · {SITE.location}</p>
          </div>
          <div className="footer-links">
            <Link to="/stay">Stays</Link>
            <Link to="/events">Events</Link>
            <Link to="/book">Book</Link>
            <Link to="/policies">Policies</Link>
          </div>
          <div className="footer-cta">
            <Link to="/book?type=stay" className="btn btn-outline btn-sm">Book a stay</Link>
            <Link to="/book?type=event" className="btn btn-event btn-sm">Plan an event</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.name}. Book direct — no platform fees.</p>
        </div>
      </footer>
      <ChatWidget />
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(29, 78, 216, 0.06);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0;
          gap: 1rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: var(--text);
          min-width: 0;
        }
        .logo-mark {
          width: 2rem;
          height: 2rem;
          border-radius: 7px;
          background: linear-gradient(145deg, var(--accent-light), var(--accent-deep));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
        }
        .logo strong {
          display: block;
          font-family: "Playfair Display", serif;
          font-size: 1.05rem;
          line-height: 1.2;
        }
        .logo small {
          display: block;
          font-size: 0.68rem;
          color: var(--muted);
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .nav {
          display: flex;
          gap: 1.1rem;
          flex-wrap: wrap;
        }
        .nav a {
          color: var(--muted);
          font-size: 0.8rem;
          font-weight: 600;
        }
        .nav a.active, .nav a:hover { color: var(--accent); }
        .header-cta { padding: 0.48rem 0.95rem; font-size: 0.75rem; }
        .site-footer {
          margin-top: 0;
          background: linear-gradient(180deg, var(--accent-deep) 0%, #0f172a 100%);
          color: rgba(255,255,255,0.78);
          padding: 2.5rem 0 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .footer-brand {
          display: block;
          font-family: "Playfair Display", serif;
          font-size: 1.2rem;
          color: white;
          margin-bottom: 0.35rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .footer-links a { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
        .footer-links a:hover { color: white; }
        .footer-cta { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .btn-sm { padding: 0.55rem 1rem; font-size: 0.82rem; }
        .footer-cta .btn-outline {
          border-color: rgba(255,255,255,0.45);
          color: white;
          background: rgba(255,255,255,0.06);
        }
        .footer-cta .btn-outline:hover { background: rgba(255,255,255,0.14); color: white; }
        .footer-bottom {
          padding: 1.25rem 0;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
        }
        @media (max-width: 768px) {
          .nav, .logo small { display: none; }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
