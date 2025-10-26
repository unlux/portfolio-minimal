export const revalidate = 3600;

import { NotionRenderer } from "@/components/NotionRenderer";
import { NotionAPI } from "notion-client";
import Reveal from "@/components/animation/Reveal";

export default async function TodoPage() {
  const notion = new NotionAPI();
  let recordMap = null;
  let error = null;
  try {
    recordMap = await notion.getPage("22cca11c6d65808b8453ca55e4032397");
  } catch (e) {
    error = e;
  }
  return (
    <section>
      <Reveal animation="fadeUp" className="prose prose-neutral dark:prose-invert">
        {error ? (
          <div className="text-red-500">Failed to load Notion data.</div>
        ) : (
          <NotionRenderer recordMap={recordMap} />
        )}
      </Reveal>
    </section>
  );
}
