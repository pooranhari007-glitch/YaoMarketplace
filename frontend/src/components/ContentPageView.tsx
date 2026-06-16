import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";
import type { ContentPage, PageSlug } from "../types";

interface Props {
  slug: PageSlug;
  children?: ReactNode;
}

export default function ContentPageView({ slug, children }: Props) {
  const [page, setPage] = useState<ContentPage | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Direct Booking";
    api<ContentPage>(`/content/${slug}`)
      .then((p) => {
        setPage(p);
        document.title = `${p.title} | Direct Booking`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta && p.meta_description) meta.setAttribute("content", p.meta_description);
      })
      .catch(() => setError("Content could not be loaded."));
  }, [slug]);

  if (error) return <div className="container page"><p>{error}</p></div>;
  if (!page) return <div className="container page"><p>Loading...</p></div>;

  return (
    <article className="container page">
      <header className="page-hero">
        {page.hero_image_url && (
          <img src={page.hero_image_url} alt="" className="hero-img" />
        )}
        <h1>{page.title}</h1>
      </header>
      <div className="page-body" dangerouslySetInnerHTML={{ __html: page.body.replace(/\n/g, "<br/>") }} />
      {children}
      <style>{`
        .page { padding: 2.5rem 0 3rem; }
        .page-hero h1 { font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1rem; }
        .page-body { color: var(--muted); max-width: 65ch; font-size: 1.05rem; }
        .hero-img {
          width: 100%;
          max-height: 320px;
          object-fit: cover;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
        }
      `}</style>
    </article>
  );
}
