import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AVAILABILITY_FORECAST } from "../../data/demo";

export function AvailabilityForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={AVAILABILITY_FORECAST}>
        <defs>
          <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11 }} />
        <Area type="monotone" dataKey="open" name="Open %" stroke="#34d399" strokeWidth={2} fill="url(#openGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BookingPaths() {
  const paths = [
    { title: "Overnight stay", desc: "Nightly rates · 2 night min", rate: "$250", to: "/book?type=stay", color: "#6366f1" },
    { title: "Private event", desc: "Weddings · Corporate · Retreats", rate: "$1,500+", to: "/book?type=event", color: "#22d3ee" },
  ];

  return (
    <div className="paths-grid">
      {paths.map((p) => (
        <Link key={p.title} to={p.to} className="path-card">
          <div className="path-bar" style={{ background: p.color }} />
          <div className="path-body">
            <strong>{p.title}</strong>
            <span>{p.desc}</span>
            <em>From {p.rate}</em>
          </div>
          <span className="path-arrow">→</span>
        </Link>
      ))}
      <style>{`
        .paths-grid { display: grid; gap: 0.75rem; }
        .path-card {
          display: grid;
          grid-template-columns: 4px 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 1rem 1.25rem;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: inherit;
          transition: border-color 0.2s, transform 0.15s;
        }
        .path-card:hover { border-color: var(--primary); transform: translateX(4px); }
        .path-bar { align-self: stretch; border-radius: 4px; }
        .path-body strong { display: block; font-size: 0.9rem; margin-bottom: 0.2rem; }
        .path-body span { font-size: 0.75rem; color: var(--dim); }
        .path-body em { display: block; font-size: 0.8rem; color: var(--cyan); font-style: normal; font-weight: 600; margin-top: 0.35rem; }
        .path-arrow { color: var(--dim); font-size: 1.1rem; }
      `}</style>
    </div>
  );
}
