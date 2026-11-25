import type { StringIndexed } from "@/utils/types";

function queryStringify(data: StringIndexed): string | never {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("input must be an object");
  }
  return collect(data).join("&");
}

function collect(value: StringIndexed, prefix = ""): string[] {
  const result: string[] = [];

  for (const key of Object.keys(value)) {
    const item = value[key];
    const path = prefix ? `${prefix}[${key}]` : key;

    if (isStringIndexed(item)) {
      result.push(...collect(item, path));
    } else {
      result.push(`${path}=${item}`);
    }
  }

  return result;
}

function isStringIndexed(value: unknown): value is StringIndexed {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export default queryStringify;
