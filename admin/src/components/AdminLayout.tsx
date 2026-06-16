import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../api/client";

const links = [
  { to: "/", label: "Overview" },
  { to: "/content", label: "Content" },
  { to: "/bookings", label: "Bookings" },
  { to: "/inquiries", label: "Inquiries" },
  { to: "/insurance", label: "Insurance" },
  { to: "/calendar", label: "Calendar" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function logout() {
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">Admin</div>
        <nav>
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="btn-ghost logout" onClick={logout}>
          Log out
        </button>
      </aside>
      <main className="main">
        <Outlet />
      </main>
      <style>{`
        .admin-shell { display: flex; min-height: 100vh; }
        .sidebar {
          width: 220px;
          background: var(--sidebar);
          border-right: 1px solid var(--border);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }
        .brand { font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem; }
        .sidebar nav { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
        .sidebar a {
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
        }
        .sidebar a.active, .sidebar a:hover {
          background: var(--surface);
          color: var(--text);
        }
        .logout { margin-top: auto; width: 100%; padding: 0.5rem; }
        .main { flex: 1; padding: 1.5rem 2rem; overflow: auto; }
      `}</style>
    </div>
  );
}
