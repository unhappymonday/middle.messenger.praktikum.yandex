import { HTTPError } from "@/services/http/HTTPError";

export function getErrorReason(error: unknown): string {
  if (
    error instanceof HTTPError &&
    typeof error.body === "object" &&
    error.body !== null &&
    "reason" in error.body &&
    typeof error.body.reason === "string"
  ) {
    return error.body.reason;
  }

  return error instanceof Error ? error.message : "Unknown error";
}
