import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../api/client";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await api<{ access_token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(res.access_token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="login-page">
      <form className="card login-form" onSubmit={handleSubmit}>
        <h1>Owner Login</h1>
        <p className="sub">Manage bookings, content, and calendar</p>
        <div style={{ marginTop: "1.5rem" }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: "#f87171", marginTop: "0.75rem" }}>{error}</p>}
        <button type="submit" className="btn" style={{ width: "100%", marginTop: "1.25rem" }}>
          Sign in
        </button>
      </form>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .login-form { width: min(400px, 100%); }
        .login-form h1 { font-size: 1.5rem; }
        .sub { color: var(--muted); font-size: 0.875rem; margin-top: 0.25rem; }
      `}</style>
    </div>
  );
}
