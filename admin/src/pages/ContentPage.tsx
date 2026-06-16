import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Page {
  slug: string;
  title: string;
  body: string;
  meta_description: string;
}

export default function ContentPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selected, setSelected] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<Page[]>("/content").then(setPages).catch(() => {});
  }, []);

  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await api<Page>(`/content/${selected.slug}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: selected.title,
          body: selected.body,
          meta_description: selected.meta_description,
        }),
      });
      setPages((p) => p.map((x) => (x.slug === updated.slug ? updated : x)));
      setSelected(updated);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Content Management</h1>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1rem" }}>
        <div className="card" style={{ padding: "0.5rem" }}>
          {pages.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSelected(p)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.5rem",
                background: selected?.slug === p.slug ? "var(--bg)" : "transparent",
                border: "none",
                color: "var(--text)",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              {p.slug}
            </button>
          ))}
        </div>
        {selected && (
          <div className="card">
            <div style={{ marginBottom: "1rem" }}>
              <label>Title</label>
              <input value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Meta description</label>
              <input value={selected.meta_description} onChange={(e) => setSelected({ ...selected, meta_description: e.target.value })} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Body</label>
              <textarea rows={12} value={selected.body} onChange={(e) => setSelected({ ...selected, body: e.target.value })} />
            </div>
            <button type="button" className="btn" onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
