import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BOOKING_MIX, OCCUPANCY_CHART, REVENUE_CHART } from "../data/demo";

const tooltipStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 8,
  fontSize: 12,
};

export function OccupancyChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={OCCUPANCY_CHART} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="stays" name="Stays %" fill="#6366f1" radius={[4, 4, 0, 0]} />
        <Bar dataKey="events" name="Events %" fill="#22d3ee" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={REVENUE_CHART}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BookingMixChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={BOOKING_MIX} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3}>
          {BOOKING_MIX.map((e) => (
            <Cell key={e.name} fill={e.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Share"]} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface StatProps {
  label: string;
  value: string;
  change?: string;
  up?: boolean;
  icon?: string;
}

export function StatCard({ label, value, change, up, icon }: StatProps) {
  return (
    <div className="dash-stat card">
      <div className="dash-stat-top">
        <span className="eyebrow">{label}</span>
        {icon && <span className="dash-stat-icon">{icon}</span>}
      </div>
      <div className="dash-stat-value">{value}</div>
      {change && (
        <span className={`badge ${up ? "badge-up" : "badge-down"}`}>{change}</span>
      )}
      <style>{`
        .dash-stat { display: flex; flex-direction: column; gap: 0.35rem; }
        .dash-stat-top { display: flex; justify-content: space-between; align-items: center; }
        .dash-stat-icon { font-size: 1.1rem; opacity: 0.7; }
        .dash-stat-value { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; }
      `}</style>
    </div>
  );
}

export function Panel({ title, subtitle, children, action }: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="dash-panel card">
      <div className="dash-panel-head">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="dash-panel-body">{children}</div>
      <style>{`
        .dash-panel { padding: 0; overflow: hidden; }
        .dash-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
        }
        .dash-panel-head h3 { font-size: 0.95rem; }
        .dash-panel-head p { font-size: 0.78rem; color: var(--muted); margin-top: 0.2rem; }
        .dash-panel-body { padding: 1rem 1.25rem 1.25rem; }
      `}</style>
    </div>
  );
}
