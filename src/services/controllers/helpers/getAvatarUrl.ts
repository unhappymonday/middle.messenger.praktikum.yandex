import { RESOURCES_URL } from "@/services/config/routes";

export function getAvatarUrl(avatar: string | null): string | undefined {
  return avatar ? `${RESOURCES_URL}${avatar}` : undefined;
}
