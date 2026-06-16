import { Link, Outlet, useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";
import { SITE } from "../data/demo";

const nav = [
  { to: "/", label: "Overview", icon: "▦" },
  { to: "/stay", label: "Stays", icon: "⌂" },
  { to: "/events", label: "Events", icon: "◈" },
  { to: "/book", label: "Book", icon: "＋" },
  { to: "/gallery", label: "Gallery", icon: "▣" },
  { to: "/policies", label: "Policies", icon: "≡" },
  { to: "/faq", label: "FAQ", icon: "?" },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <Link to="/" className="dash-brand">
          <span className="dash-brand-icon">◆</span>
          <div>
            <strong>{SITE.shortName}</strong>
            <small>Booking OS</small>
          </div>
        </Link>
        <nav className="dash-side-nav">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={pathname === item.to ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dash-side-footer">
          <Link to="/book" className="btn btn-primary" style={{ width: "100%" }}>
            New booking
          </Link>
        </div>
      </aside>

      <div className="dash-main-wrap">
        <header className="dash-topbar">
          <div>
            <h1 className="dash-page-title">{SITE.name}</h1>
            <p className="dash-page-sub">{SITE.location} · Direct booking platform</p>
          </div>
          <div className="dash-topbar-actions">
            <span className="dash-live">
              <span className="dash-live-dot" /> Live
            </span>
            <Link to="/book?type=stay" className="btn btn-ghost">Book stay</Link>
            <Link to="/book?type=event" className="btn btn-cyan">Book event</Link>
          </div>
        </header>
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
      <ChatWidget />
      <style>{`
        .dash-shell {
          display: flex;
          min-height: 100vh;
        }
        .dash-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: var(--bg-panel);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 1rem 0.75rem;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
        }
        .dash-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 0.75rem 1.25rem;
          color: var(--text);
          border-bottom: 1px solid var(--border);
          margin-bottom: 0.75rem;
        }
        .dash-brand-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          border-radius: 8px;
          font-size: 0.85rem;
          color: white;
        }
        .dash-brand strong { display: block; font-size: 0.9rem; }
        .dash-brand small { font-size: 0.68rem; color: var(--dim); }
        .dash-side-nav {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }
        .dash-side-nav a {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--muted);
          transition: background 0.15s, color 0.15s;
        }
        .dash-side-nav a:hover { background: var(--surface); color: var(--text); }
        .dash-side-nav a.active {
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary-hover);
        }
        .nav-icon { font-size: 0.75rem; opacity: 0.8; width: 1rem; text-align: center; }
        .dash-side-footer { padding-top: 0.75rem; border-top: 1px solid var(--border); }
        .dash-main-wrap {
          flex: 1;
          margin-left: 220px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .dash-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
          background: var(--bg-panel);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .dash-page-title { font-size: 1.15rem; font-weight: 600; }
        .dash-page-sub { font-size: 0.78rem; color: var(--dim); margin-top: 0.15rem; }
        .dash-topbar-actions { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .dash-live {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: var(--green);
          font-weight: 600;
          padding: 0.35rem 0.65rem;
          background: rgba(52, 211, 153, 0.1);
          border-radius: 999px;
        }
        .dash-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .dash-main {
          padding: 1.5rem;
          flex: 1;
        }
        @media (max-width: 768px) {
          .dash-sidebar { display: none; }
          .dash-main-wrap { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}
