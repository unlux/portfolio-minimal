import type { ExtendedRecordMap } from "notion-types";

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
