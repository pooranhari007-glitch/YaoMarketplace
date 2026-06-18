import { useEffect, useState } from "react";
import PageMeta from "../components/PageMeta";
import { useGallery } from "../hooks/useSiteConfig";
import { api } from "../api/client";
import { FALLBACK_GALLERY } from "../data/demo";
import type { ContentPage, PageSlug } from "../types";

export default function StaticPage({ slug }: { slug: PageSlug }) {
  const [page, setPage] = useState<ContentPage | null>(null);
  const gallery = useGallery();

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
    const images = gallery.length ? gallery : FALLBACK_GALLERY.map((g, i) => ({ ...g, id: i, alt_text: g.title, category: "gallery", sort_order: i }));
    return (
      <div className="container">
        <PageMeta title={page.title} description={page.meta_description} />
        <section className="page-hero">
          <span className="eyebrow">Gallery</span>
          <h1>{page.title}</h1>
          <p>{page.meta_description || page.body}</p>
        </section>
        <div className="gallery-full">
          {images.map((g) => (
            <div key={g.id ?? g.title} className="gallery-full-tile" style={{ backgroundImage: `url("${g.url}")`, backgroundSize: "cover", backgroundPosition: "center" }}>
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
            text-shadow: 0 1px 4px rgba(0,0,0,0.5);
            background-color: var(--forest);
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
      <PageMeta title={page.title} description={page.meta_description} />
      <section className="page-hero">
        <h1>{page.title}</h1>
        {page.meta_description && <p>{page.meta_description}</p>}
      </section>
      <div
        className="static-body card"
        dangerouslySetInnerHTML={{ __html: page.body.replace(/\n/g, "<br/>") }}
      />
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
