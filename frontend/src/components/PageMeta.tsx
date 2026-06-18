import { useEffect } from "react";

export default function PageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    const el = document.querySelector('meta[name="description"]');
    if (el && description) el.setAttribute("content", description);
  }, [title, description]);
  return null;
}
