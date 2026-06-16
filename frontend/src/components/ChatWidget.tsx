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
      setMessages([
        ...next,
        { role: "assistant", content: "Our concierge is momentarily unavailable. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`lux-chat ${open ? "open" : ""}`}>
      {open && (
        <div className="lux-chat-panel">
          <div className="lux-chat-head">
            <span>Concierge</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="lux-chat-body">
            {messages.length === 0 && (
              <p className="lux-chat-empty">How may we assist you?</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`lux-msg ${m.role}`}>{m.content}</div>
            ))}
          </div>
          <div className="lux-chat-foot">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Your message"
              disabled={loading}
            />
            <button type="button" className="btn btn-primary" onClick={send} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
      <button type="button" className="lux-chat-toggle btn btn-primary" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Concierge"}
      </button>
      <style>{`
        .lux-chat {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 300;
        }
        .lux-chat-panel {
          width: min(340px, calc(100vw - 2rem));
          margin-bottom: 0.75rem;
          background: var(--white);
          border: 1px solid var(--line);
        }
        .lux-chat-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: var(--black);
          color: var(--white);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .lux-chat-head button {
          background: none;
          border: none;
          color: var(--white);
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.6;
        }
        .lux-chat-body {
          height: 260px;
          overflow-y: auto;
          padding: 1.25rem;
        }
        .lux-chat-empty {
          font-size: 0.88rem;
          font-weight: 300;
          color: var(--muted);
          font-style: italic;
        }
        .lux-msg {
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--line);
        }
        .lux-msg.user { color: var(--black); }
        .lux-msg.assistant { color: var(--stone); }
        .lux-chat-foot {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid var(--line);
        }
        .lux-chat-foot input { flex: 1; font-size: 0.85rem; }
        .lux-chat-foot .btn { padding: 0.65rem 1rem; font-size: 0.58rem; }
        .lux-chat-toggle { font-size: 0.6rem; padding: 0.7rem 1.1rem; }
      `}</style>
    </div>
  );
}
