export const revalidate = 3600;

import { NotionRenderer } from "../components/NotionRenderer";
import { NotionAPI } from "notion-client";

export default async function TodoPage() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("22cca11c6d65808b8453ca55e4032397?");
  return (
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <NotionRenderer recordMap={recordMap} />
      </div>
    </section>
  );
}
