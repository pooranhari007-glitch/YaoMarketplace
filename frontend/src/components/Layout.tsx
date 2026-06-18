import { Link, Outlet, useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";
import { useSiteConfig } from "../hooks/useSiteConfig";

const nav = [
  { to: "/", label: "Home" },
  { to: "/stay", label: "Stay" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { site } = useSiteConfig();

  return (
    <div className="site">
      <header className={`site-header ${isHome ? "site-header--hero" : ""}`}>
        <div className="container site-header-inner">
          <Link to="/" className="site-logo">
            <span className="site-logo-mark">{site.short_name.charAt(0)}</span>
            <span>{site.short_name}</span>
          </Link>
          <nav className="site-nav">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className={pathname === item.to ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/book" className="btn btn-primary site-cta">Reserve</Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer-grid">
          <div>
            <strong className="site-footer-brand">{site.site_name}</strong>
            <p>{site.location}</p>
            <p className="site-footer-contact">{site.email} · {site.phone}</p>
          </div>
          <div className="site-footer-links">
            <Link to="/stay">Overnight stays</Link>
            <Link to="/events">Private events</Link>
            <Link to="/book">Book direct</Link>
            <Link to="/policies">Policies</Link>
          </div>
        </div>
        <div className="container site-footer-bottom">
          <span>© {new Date().getFullYear()} {site.site_name}</span>
          <span>No platform fees · Direct booking only</span>
        </div>
      </footer>

      <ChatWidget />

      <style>{`
        .site { min-height: 100vh; display: flex; flex-direction: column; }
        .site-header {
          position: sticky;
          top: 0;
          z-index: 200;
          background: rgba(250, 247, 242, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .site-header--hero {
          position: absolute;
          left: 0; right: 0;
          background: transparent;
          border-bottom: none;
        }
        .site-header--hero .site-nav a { color: rgba(255,255,255,0.85); }
        .site-header--hero .site-nav a:hover,
        .site-header--hero .site-nav a.active { color: #fff; }
        .site-header--hero .site-logo { color: #fff; }
        .site-header--hero .site-logo-mark { background: rgba(255,255,255,0.15); color: #fff; }
        .site-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1rem 0;
        }
        .site-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text);
        }
        .site-logo-mark {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--forest);
          color: #fff;
          border-radius: 50%;
          font-size: 0.95rem;
        }
        .site-nav { display: flex; gap: 1.75rem; }
        .site-nav a {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-soft);
          transition: color 0.15s;
        }
        .site-nav a:hover,
        .site-nav a.active { color: var(--forest); }
        .site-cta { padding: 0.6rem 1.25rem; font-size: 0.82rem; }
        .site-footer {
          margin-top: auto;
          background: var(--forest);
          color: rgba(255,255,255,0.85);
          padding: 3rem 0 0;
        }
        .site-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .site-footer-brand {
          display: block;
          font-family: var(--font-display);
          font-size: 1.35rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .site-footer p { font-size: 0.9rem; opacity: 0.8; }
        .site-footer-contact { margin-top: 0.75rem; font-size: 0.82rem !important; }
        .site-footer-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .site-footer-links a { color: rgba(255,255,255,0.75); font-size: 0.88rem; }
        .site-footer-links a:hover { color: #fff; }
        .site-footer-bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 1.25rem 0;
          font-size: 0.78rem;
          opacity: 0.6;
        }
        @media (max-width: 768px) {
          .site-nav { display: none; }
          .site-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
