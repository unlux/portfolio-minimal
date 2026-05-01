import type { Block, Collection, Decoration, ExtendedRecordMap } from "notion-types";
import { getBlockTitle, getBlockValue, getTextContent } from "notion-utils";

type CollectionQuery =
  NonNullable<ExtendedRecordMap["collection_query"]>[string][string];

type ReadingItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  status: string;
  tags: string[];
};

type PropertyMap = Record<string, unknown>;

function propertyText(properties: PropertyMap | undefined, propertyId: string) {
  const value = properties?.[propertyId];

  if (!Array.isArray(value)) {
    return "";
  }

  return getTextContent(value as Decoration[]);
}

function findPropertyId(collection: Collection, name: string) {
  return Object.entries(collection.schema).find(
    ([, property]) => property.name === name
  )?.[0];
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getQueryBlockIds(query: CollectionQuery | undefined) {
  return query?.collection_group_results?.blockIds ?? query?.blockIds ?? [];
}

function getReadingItems(recordMap: ExtendedRecordMap) {
  const collection = Object.values(recordMap.collection)
    .map((record) => getBlockValue(record))
    .find((value) => value?.schema && findPropertyId(value, "URL"));

  if (!collection) {
    return [];
  }

  const urlPropertyId = findPropertyId(collection, "URL");
  const statusPropertyId = findPropertyId(collection, "Status");
  const tagsPropertyId = findPropertyId(collection, "Tags");
  const collectionQueries = recordMap.collection_query[collection.id] ?? {};
  const blockIds = Array.from(
    new Set(Object.values(collectionQueries).flatMap(getQueryBlockIds))
  );

  return blockIds
    .map((blockId): ReadingItem | null => {
      const block = getBlockValue(recordMap.block[blockId]) as Block | undefined;
      const properties = block?.properties as PropertyMap | undefined;
      const url = urlPropertyId ? propertyText(properties, urlPropertyId) : "";

      if (!block || !url) {
        return null;
      }

      const status = statusPropertyId
        ? propertyText(properties, statusPropertyId)
        : "";
      const tags = tagsPropertyId
        ? propertyText(properties, tagsPropertyId)
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];
      const domain = getDomain(url);
      const title = getBlockTitle(block, recordMap) || domain;

      return {
        id: block.id,
        title,
        url,
        domain,
        status,
        tags,
      };
    })
    .filter((item): item is ReadingItem => Boolean(item));
}

function ReadingCard({ item }: { item: ReadingItem }) {
  return (
    <a
      className="group block rounded-md border border-neutral-800 bg-neutral-950/60 p-3 no-underline transition-colors hover:border-neutral-700 hover:bg-neutral-900"
      href={item.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="text-sm font-medium leading-5 text-neutral-100 group-hover:text-sky-200">
        {item.title}
      </div>
      <div className="mt-2 text-xs text-neutral-500">{item.domain}</div>
      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              className="rounded-sm border border-neutral-800 px-1.5 py-0.5 text-[0.7rem] leading-4 text-neutral-400"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

export function ReadingCollection({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  const items = getReadingItems(recordMap);
  const toRead = items.filter((item) => item.status === "to-read");
  const read = items.filter((item) => item.status === "read");
  const loose = items.filter((item) => !item.status);
  const sections = [
    { title: "To read", items: toRead },
    { title: "Read", items: read },
    { title: "Loose links", items: loose },
  ].filter((section) => section.items.length > 0);

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-neutral-800 bg-neutral-950/60 p-4 text-sm text-neutral-400">
        No reading links found in Notion.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 border-y border-neutral-800 py-4 text-sm">
        <div>
          <div className="text-lg font-semibold text-neutral-100">
            {items.length}
          </div>
          <div className="mt-1 text-xs text-neutral-500">tracked</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-neutral-100">
            {toRead.length}
          </div>
          <div className="mt-1 text-xs text-neutral-500">queued</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-neutral-100">
            {read.length}
          </div>
          <div className="mt-1 text-xs text-neutral-500">read</div>
        </div>
      </div>

      {sections.map((section) => (
        <section key={section.title}>
          <div className="mb-3 flex items-baseline justify-between border-b border-neutral-800 pb-2">
            <h2 className="text-base font-semibold text-neutral-100">
              {section.title}
            </h2>
            <span className="text-xs text-neutral-500">
              {section.items.length}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <ReadingCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
