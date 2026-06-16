import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function DashboardPage() {
  const [stats, setStats] = useState({ bookings: 0, inquiries: 0, insurance: 0 });

  useEffect(() => {
    Promise.all([
      api<unknown[]>("/bookings"),
      api<unknown[]>("/inquiries"),
      api<unknown[]>("/insurance"),
    ]).then(([b, i, ins]) => {
      setStats({ bookings: b.length, inquiries: i.length, insurance: ins.length });
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        <div className="card"><div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Bookings</div><div style={{ fontSize: "2rem", fontWeight: 700 }}>{stats.bookings}</div></div>
        <div className="card"><div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Inquiries</div><div style={{ fontSize: "2rem", fontWeight: 700 }}>{stats.inquiries}</div></div>
        <div className="card"><div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Insurance pending</div><div style={{ fontSize: "2rem", fontWeight: 700 }}>{stats.insurance}</div></div>
      </div>
    </div>
  );
}
