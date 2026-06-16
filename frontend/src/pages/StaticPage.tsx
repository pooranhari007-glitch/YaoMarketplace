import ContentPageView from "../components/ContentPageView";
import type { PageSlug } from "../types";

export default function StaticPage({ slug }: { slug: PageSlug }) {
  return <ContentPageView slug={slug} />;
}
