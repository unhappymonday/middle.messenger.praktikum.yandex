import { PLACEHOLDER_REGEX } from "@/shared/constants";

export const getPlaceholderIds = (content: unknown): string[] => {
  if (content === undefined || content === null) {
    return [];
  }

  return [...String(content).matchAll(PLACEHOLDER_REGEX)].map(
    (match) => match[1],
  );
};
