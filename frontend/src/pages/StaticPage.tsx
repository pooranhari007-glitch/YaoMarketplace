import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Panel } from "../components/DashboardCharts";
import type { ContentPage, PageSlug } from "../types";

export default function StaticPage({ slug }: { slug: PageSlug }) {
  const [page, setPage] = useState<ContentPage | null>(null);

  useEffect(() => {
    api<ContentPage>(`/content/${slug}`).then(setPage).catch(() => {});
  }, [slug]);

  if (!page) return <div className="card"><p style={{ color: "var(--muted)" }}>Loading…</p></div>;

  return (
    <Panel title={page.title} subtitle={page.meta_description || slug}>
      <div className="static-body" dangerouslySetInnerHTML={{ __html: page.body.replace(/\n/g, "<br/>") }} />
      <style>{`
        .static-body {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 65ch;
        }
      `}</style>
    </Panel>
  );
}
