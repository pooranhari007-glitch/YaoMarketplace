import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    api<Inquiry[]>("/inquiries").then(setInquiries).catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Inquiries</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {inquiries.map((i) => (
          <div key={i.id} className="card">
            <strong>{i.name}</strong> · {i.email}
            {i.subject && <span> · {i.subject}</span>}
            <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>{i.message}</p>
            <small style={{ color: "var(--muted)" }}>{new Date(i.created_at).toLocaleString()}</small>
          </div>
        ))}
        {inquiries.length === 0 && <p style={{ color: "var(--muted)" }}>No inquiries yet.</p>}
      </div>
    </div>
  );
}
