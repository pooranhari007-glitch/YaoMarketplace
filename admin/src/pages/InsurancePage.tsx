import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Doc {
  id: number;
  guest_email: string;
  original_filename: string;
  status: string;
  uploaded_at: string;
}

export default function InsurancePage() {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    api<Doc[]>("/insurance").then(setDocs).catch(() => {});
  }

  async function review(id: number, status: "approved" | "rejected") {
    await api(`/insurance/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, review_notes: "" }),
    });
    load();
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Insurance Documents</h1>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Guest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td>{d.original_filename}</td>
                <td>{d.guest_email}</td>
                <td><span className="badge badge-pending">{d.status}</span></td>
                <td>
                  {d.status === "pending" && (
                    <>
                      <button type="button" className="btn" style={{ marginRight: 8 }} onClick={() => review(d.id, "approved")}>Approve</button>
                      <button type="button" className="btn-ghost" onClick={() => review(d.id, "rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
