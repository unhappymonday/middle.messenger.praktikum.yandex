import type { Indexed } from "@/utils/types";

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs };

  for (const key of Object.keys(rhs)) {
    const lhsValue = lhs[key];
    const rhsValue = rhs[key];

    if (
      lhsValue !== null &&
      rhsValue !== null &&
      typeof lhsValue === "object" &&
      typeof rhsValue === "object" &&
      !Array.isArray(lhsValue) &&
      !Array.isArray(rhsValue)
    ) {
      result[key] = merge(lhsValue as Indexed, rhsValue as Indexed);
    } else {
      result[key] = rhsValue;
    }
  }
  return result;
}

export default merge;
