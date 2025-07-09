import { NotionRenderer } from "../components/NotionRenderer";
import { NotionAPI } from "notion-client";

export default async function TodoPage() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("894025db3cfc43529eb4ffaba556852d");
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">shi to do</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <NotionRenderer recordMap={recordMap} />
      </div>
    </section>
  );
}
