import { RESOURCES_URL } from "@/services/config/routes";

export function getAvatarUrl(path: string | null | undefined): string {
  return path ? `${RESOURCES_URL}${path}` : "";
}
