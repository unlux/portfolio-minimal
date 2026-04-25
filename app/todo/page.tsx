export const dynamic = "force-dynamic";

import { NotionRenderer } from "@/components/NotionRenderer";
import { NotionAPI } from "notion-client";
import Reveal from "@/components/animation/Reveal";
import { normalizeNotionRecordMap } from "@/lib/notion";
import type { ExtendedRecordMap } from "notion-types";

export default async function TodoPage() {
  const notion = new NotionAPI();
  let recordMap: ExtendedRecordMap | null = null;
  let error: unknown = null;
  try {
    recordMap = normalizeNotionRecordMap(
      await notion.getPage("22cca11c6d65808b8453ca55e4032397")
    );
  } catch (e) {
    error = e;
  }
  return (
    <section>
      <Reveal animation="fadeUp" className="prose prose-neutral dark:prose-invert">
        {error || !recordMap ? (
          <div className="text-red-500">Failed to load Notion data.</div>
        ) : (
          <NotionRenderer recordMap={recordMap} />
        )}
      </Reveal>
    </section>
  );
}
