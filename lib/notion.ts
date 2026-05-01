import type { ExtendedRecordMap } from "notion-types";
import type { NotionAPI } from "notion-client";
import { defaultMapImageUrl, getBlockValue, parsePageId } from "notion-utils";

type WrappedRecord<T> = {
  role?: unknown;
  value?: T | { value?: T };
};

type RecordTable<T> = Record<string, WrappedRecord<T>>;

function unwrapRecordTable<T>(table: RecordTable<T> | undefined) {
  if (!table) {
    return table;
  }

  return Object.fromEntries(
    Object.entries(table).map(([id, record]) => {
      const nestedValue = record.value;
      const nestedRecord =
        nestedValue && typeof nestedValue === "object" ? nestedValue : null;
      const value =
        nestedRecord && "value" in nestedRecord
          ? nestedRecord.value
          : nestedValue;
      const role =
        record.role ??
        (nestedRecord && "role" in nestedRecord ? nestedRecord.role : undefined);

      return [id, { ...record, role, value }];
    })
  );
}

export function normalizeNotionRecordMap(
  recordMap: ExtendedRecordMap
): ExtendedRecordMap {
  return {
    ...recordMap,
    block: (unwrapRecordTable(recordMap.block) ??
      recordMap.block) as ExtendedRecordMap["block"],
    collection:
      (unwrapRecordTable(recordMap.collection) ??
        recordMap.collection) as ExtendedRecordMap["collection"],
    collection_view:
      (unwrapRecordTable(recordMap.collection_view) ??
        recordMap.collection_view) as ExtendedRecordMap["collection_view"],
    notion_user:
      (unwrapRecordTable(recordMap.notion_user) ??
        recordMap.notion_user) as ExtendedRecordMap["notion_user"],
  };
}

export async function getNormalizedNotionPage(
  notion: NotionAPI,
  pageId: string
): Promise<ExtendedRecordMap> {
  return normalizeNotionRecordMap(await notion.getPage(pageId));
}

export function getNotionPageCover(
  recordMap: ExtendedRecordMap,
  pageId: string
) {
  const parsedPageId = parsePageId(pageId);
  const block = parsedPageId
    ? getBlockValue(recordMap.block[parsedPageId])
    : undefined;
  const cover = block?.format?.page_cover;

  if (!block || !cover) {
    return null;
  }

  const url = recordMap.signed_urls?.[block.id] ?? defaultMapImageUrl(cover, block);

  if (!url) {
    return null;
  }

  return {
    url,
    position:
      typeof block.format?.page_cover_position === "number"
        ? block.format.page_cover_position
        : 0.5,
  };
}
