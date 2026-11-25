import type { Indexed } from "@/utils/types";

function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (object === null || typeof object !== "object") {
    return object;
  }

  const keys = path.split(".");
  let current = object;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
      break;
    }

    if (
      !Object.prototype.hasOwnProperty.call(current, key) ||
      typeof current[key] !== "object" ||
      current[key] === null
    ) {
      current[key] = {};
    }

    current = current[key] as Indexed;
  }

  return object;
}

export default set;
