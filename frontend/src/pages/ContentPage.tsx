import PageMeta from "../components/PageMeta";
import { useGallery, usePage } from "../hooks/useSite";
import type { PageSlug } from "../types";

export default function ContentPage({ slug }: { slug: Extract<PageSlug, "gallery" | "policies" | "faq"> }) {
  const page = usePage(slug);
  const gallery = useGallery();

  return (
    <div className="container">
      <PageMeta title={page?.title || slug} description={page?.meta_description} />
      <section className="page-hero">
        {slug === "gallery" && <span className="eyebrow">Gallery</span>}
        <h1>{page?.title}</h1>
        {slug !== "gallery" && page?.meta_description && <p>{page.meta_description}</p>}
        {slug === "gallery" && page?.body && <p>{page.body}</p>}
      </section>
      {slug === "gallery" ? (
        <div className="gallery-grid" style={{ paddingBottom: "4rem" }}>
          {gallery.map((g) => (
            <div key={g.id} className="gallery-tile" style={{ backgroundImage: `url("${g.url}")`, backgroundSize: "cover", backgroundPosition: "center", aspectRatio: "4/3", borderRadius: "var(--radius)", display: "flex", alignItems: "flex-end", padding: "1rem", color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>
              <span>{g.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ maxWidth: "65ch", marginBottom: "4rem" }} dangerouslySetInnerHTML={{ __html: (page?.body || "").replace(/\n/g, "<br/>") }} />
      )}
      <style>{`
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .card { color: var(--text-soft); line-height: 1.8; }
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}
