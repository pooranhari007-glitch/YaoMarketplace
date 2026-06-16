import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Booking {
  id: number;
  booking_type: string;
  status: string;
  guest_name: string;
  guest_email: string;
  start_date: string;
  end_date: string;
  total_amount: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api<Booking[]>("/bookings").then(setBookings).catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Bookings</h1>
      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.booking_type}</td>
                <td>{b.guest_name}<br /><span style={{ color: "var(--muted)" }}>{b.guest_email}</span></td>
                <td>{b.start_date} → {b.end_date}</td>
                <td>${b.total_amount}</td>
                <td><span className={`badge badge-${b.status === "confirmed" ? "confirmed" : "pending"}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
