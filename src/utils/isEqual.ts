function isEqual(a: object, b: object): boolean {
  return deepEqual(a, b, new WeakMap());
}

function deepEqual(
  a: unknown,
  b: unknown,
  seen: WeakMap<object, object>,
): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a === "number" && typeof b === "number") {
    return Number.isNaN(a) && Number.isNaN(b);
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  if (a === null || b === null) {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  if (seen.get(a) === b) {
    return true;
  }
  seen.set(a, b);

  if (a instanceof Date || b instanceof Date) {
    return (
      a instanceof Date && b instanceof Date && a.getTime() === b.getTime()
    );
  }

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (!deepEqual(objA[key], objB[key], seen)) {
      return false;
    }
  }
  return true;
}

export default isEqual;
