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
      setMessages([...next, { role: "assistant", content: "Unavailable right now. Try again or email us directly." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`site-chat ${open ? "open" : ""}`}>
      {open && (
        <div className="site-chat-panel card">
          <div className="site-chat-head">
            <span>Concierge</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="site-chat-msgs">
            {messages.length === 0 && (
              <p className="empty">Ask about stays, events, amenities, or booking.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.content}</div>
            ))}
          </div>
          <div className="site-chat-foot">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question…"
              disabled={loading}
            />
            <button type="button" className="btn btn-primary" onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      <button type="button" className="btn btn-primary site-chat-btn" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Ask us anything"}
      </button>
      <style>{`
        .site-chat { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 300; }
        .site-chat-panel {
          width: min(340px, calc(100vw - 2rem));
          margin-bottom: 0.75rem;
          padding: 0;
          overflow: hidden;
        }
        .site-chat-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.15rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 1rem;
        }
        .site-chat-head button {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.4rem;
          cursor: pointer;
          line-height: 1;
        }
        .site-chat-msgs {
          height: 240px;
          overflow-y: auto;
          padding: 1rem;
        }
        .empty { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
        .msg {
          font-size: 0.88rem;
          margin-bottom: 0.6rem;
          padding: 0.6rem 0.85rem;
          border-radius: 12px;
          line-height: 1.5;
        }
        .msg.user {
          background: var(--forest);
          color: #fff;
          margin-left: 1.5rem;
          border-bottom-right-radius: 4px;
        }
        .msg.assistant {
          background: var(--surface-muted);
          color: var(--text-soft);
          margin-right: 1.5rem;
          border-bottom-left-radius: 4px;
        }
        .site-chat-foot {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .site-chat-foot input { flex: 1; font-size: 0.85rem; }
        .site-chat-btn { font-size: 0.82rem; box-shadow: var(--shadow); }
      `}</style>
    </div>
  );
}
