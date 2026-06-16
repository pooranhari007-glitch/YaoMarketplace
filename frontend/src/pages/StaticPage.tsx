import { useEffect, useState } from "react";
import { GALLERY } from "../data/demo";
import { api } from "../api/client";
import type { ContentPage, PageSlug } from "../types";

export default function StaticPage({ slug }: { slug: PageSlug }) {
  const [page, setPage] = useState<ContentPage | null>(null);

  useEffect(() => {
    api<ContentPage>(`/content/${slug}`).then(setPage).catch(() => {});
  }, [slug]);

  if (!page) {
    return (
      <div className="container" style={{ padding: "4rem 0" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading…</p>
      </div>
    );
  }

  if (slug === "gallery") {
    return (
      <div className="container">
        <section className="page-hero">
          <span className="eyebrow">Gallery</span>
          <h1>{page.title}</h1>
          <p>{page.meta_description || "Explore the estate."}</p>
        </section>
        <div className="gallery-full">
          {GALLERY.map((g) => (
            <div key={g.title} className="gallery-full-tile" style={{ background: g.tone }}>
              <span>{g.title}</span>
            </div>
          ))}
        </div>
        <style>{`
          .gallery-full {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            padding-bottom: 4rem;
          }
          .gallery-full-tile {
            aspect-ratio: 4/3;
            border-radius: var(--radius);
            display: flex;
            align-items: flex-end;
            padding: 1rem;
            color: #fff;
            font-weight: 600;
            font-size: 0.88rem;
            text-shadow: 0 1px 4px rgba(0,0,0,0.3);
          }
          @media (max-width: 768px) {
            .gallery-full { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="page-hero">
        <h1>{page.title}</h1>
        {page.meta_description && <p>{page.meta_description}</p>}
      </section>
      <div className="static-body card" dangerouslySetInnerHTML={{ __html: page.body.replace(/\n/g, "<br/>") }} />
      <style>{`
        .static-body {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-soft);
          max-width: 65ch;
          margin-bottom: 4rem;
        }
      `}</style>
    </div>
  );
}
