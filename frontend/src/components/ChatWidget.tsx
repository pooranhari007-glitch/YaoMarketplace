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
        { role: "assistant", content: "Sorry, I could not respond right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      {open && (
        <div className="chat-panel card">
          <div className="chat-header">
            <strong>Ask us anything</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <p className="muted">Questions about stays, events, or booking? Ask away.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button type="button" className="btn btn-primary" onClick={send} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
      <button type="button" className="chat-toggle btn btn-primary" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Chat"}
      </button>
      <style>{`
        .chat-widget {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 200;
        }
        .chat-panel {
          width: min(320px, calc(100vw - 2rem));
          margin-bottom: 0.6rem;
          padding: 0;
          overflow: hidden;
          box-shadow: var(--shadow-shine);
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0.9rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(90deg, var(--accent-deep), var(--accent));
          color: white;
        }
        .chat-header strong { font-size: 0.85rem; }
        .chat-header button {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: white;
        }
        .chat-messages {
          height: 240px;
          overflow-y: auto;
          padding: 0.85rem;
          background: var(--surface);
        }
        .msg {
          margin-bottom: 0.6rem;
          padding: 0.5rem 0.7rem;
          border-radius: 8px;
          font-size: 0.82rem;
        }
        .msg.user {
          background: linear-gradient(135deg, var(--accent-light), var(--accent-deep));
          color: white;
          margin-left: 1.5rem;
          box-shadow: 0 3px 10px rgba(29, 78, 216, 0.25);
        }
        .msg.assistant {
          background: var(--bg-blue);
          margin-right: 0.75rem;
          border: 1px solid var(--border);
        }
        .muted { color: var(--muted); font-size: 0.8rem; }
        .chat-input {
          display: flex;
          gap: 0.4rem;
          padding: 0.6rem;
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .chat-input input { flex: 1; font-size: 0.82rem; }
        .chat-toggle { border-radius: 8px; padding: 0.5rem 0.9rem; font-size: 0.75rem; }
      `}</style>
    </div>
  );
}
