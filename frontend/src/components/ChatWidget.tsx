import { useState } from "react";
import { api } from "../api/client";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await api<{ reply: string }>("/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next, context: "public" }),
      });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Unavailable right now. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`dash-chat ${open ? "open" : ""}`}>
      {open && (
        <div className="dash-chat-panel card">
          <div className="dash-chat-head">
            <span>AI Assistant</span>
            <button type="button" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="dash-chat-msgs">
            {messages.length === 0 && <p className="empty">Ask about stays, events, or booking.</p>}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.content}</div>
            ))}
          </div>
          <div className="dash-chat-foot">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message…" disabled={loading} />
            <button type="button" className="btn btn-primary" onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      <button type="button" className="btn btn-primary dash-chat-btn" onClick={() => setOpen(!open)}>
        {open ? "Close" : "AI Chat"}
      </button>
      <style>{`
        .dash-chat { position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 300; }
        .dash-chat-panel { width: min(320px, calc(100vw - 2rem)); margin-bottom: 0.5rem; padding: 0; overflow: hidden; }
        .dash-chat-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);
          font-size: 0.8rem; font-weight: 600;
        }
        .dash-chat-head button { background: none; border: none; color: var(--muted); font-size: 1.2rem; cursor: pointer; }
        .dash-chat-msgs { height: 220px; overflow-y: auto; padding: 0.75rem; }
        .empty { font-size: 0.8rem; color: var(--dim); }
        .msg { font-size: 0.82rem; margin-bottom: 0.5rem; padding: 0.5rem 0.65rem; border-radius: 8px; }
        .msg.user { background: rgba(99,102,241,0.2); margin-left: 1rem; }
        .msg.assistant { background: var(--bg-panel); color: var(--muted); }
        .dash-chat-foot { display: flex; gap: 0.4rem; padding: 0.6rem; border-top: 1px solid var(--border); }
        .dash-chat-foot input { flex: 1; font-size: 0.8rem; }
        .dash-chat-btn { font-size: 0.75rem; }
      `}</style>
    </div>
  );
}
