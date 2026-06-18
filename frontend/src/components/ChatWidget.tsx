import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site-chat">
      {open && (
        <div className="site-chat-panel card">
          <div className="site-chat-head">
            <span>Concierge</span>
            <button type="button" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="site-chat-msgs">
            <p>AI guest chat launches in Milestone 3. Email us for questions in the meantime.</p>
          </div>
        </div>
      )}
      <button type="button" className="btn btn-primary site-chat-btn" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Ask us anything"}
      </button>
      <style>{`
        .site-chat { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 300; }
        .site-chat-panel { width: min(320px, calc(100vw - 2rem)); margin-bottom: 0.75rem; padding: 0; overflow: hidden; }
        .site-chat-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.85rem 1.15rem; border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
        }
        .site-chat-head button { background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted); }
        .site-chat-msgs { padding: 1rem; font-size: 0.88rem; color: var(--text-soft); line-height: 1.5; }
        .site-chat-btn { font-size: 0.82rem; box-shadow: var(--shadow); }
      `}</style>
    </div>
  );
}
