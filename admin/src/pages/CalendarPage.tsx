import { FormEvent, useEffect, useState } from "react";
import { api } from "../api/client";

interface Blocked {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
}

export default function CalendarPage() {
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [icalUrl, setIcalUrl] = useState("");
  const [platform, setPlatform] = useState("airbnb");

  function load() {
    api<Blocked[]>("/calendar/blocked").then(setBlocked).catch(() => {});
  }

  useEffect(() => {
    load();
  }, []);

  async function addBlock(e: FormEvent) {
    e.preventDefault();
    await api("/calendar/blocked", {
      method: "POST",
      body: JSON.stringify({ start_date: start, end_date: end, reason }),
    });
    setStart("");
    setEnd("");
    setReason("");
    load();
  }

  async function addExternal(e: FormEvent) {
    e.preventDefault();
    const cal = await api<{ id: number }>("/calendar/external", {
      method: "POST",
      body: JSON.stringify({ name: platform, platform, ical_url: icalUrl }),
    });
    await api(`/calendar/external/${cal.id}/sync`, { method: "POST" });
    setIcalUrl("");
    load();
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Calendar</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <form className="card" onSubmit={addBlock}>
          <h3 style={{ marginBottom: "0.75rem" }}>Block dates</h3>
          <div style={{ marginBottom: "0.75rem" }}><label>Start</label><input type="date" value={start} onChange={(e) => setStart(e.target.value)} required /></div>
          <div style={{ marginBottom: "0.75rem" }}><label>End</label><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} required /></div>
          <div style={{ marginBottom: "0.75rem" }}><label>Reason</label><input value={reason} onChange={(e) => setReason(e.target.value)} /></div>
          <button type="submit" className="btn">Add block</button>
        </form>
        <form className="card" onSubmit={addExternal}>
          <h3 style={{ marginBottom: "0.75rem" }}>Sync iCal (Airbnb / VRBO / Peerspace)</h3>
          <div style={{ marginBottom: "0.75rem" }}>
            <label>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="airbnb">Airbnb</option>
              <option value="vrbo">VRBO</option>
              <option value="peerspace">Peerspace</option>
            </select>
          </div>
          <div style={{ marginBottom: "0.75rem" }}><label>iCal URL</label><input value={icalUrl} onChange={(e) => setIcalUrl(e.target.value)} placeholder="https://..." required /></div>
          <button type="submit" className="btn">Add & sync</button>
        </form>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Start</th><th>End</th><th>Reason</th></tr></thead>
          <tbody>
            {blocked.map((b) => (
              <tr key={b.id}><td>{b.start_date}</td><td>{b.end_date}</td><td>{b.reason}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
