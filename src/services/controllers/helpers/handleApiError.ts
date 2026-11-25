import { ROUTES } from "@/services/config/api";
import { getErrorReason } from "@/services/http/helpers/getErrorReason";
import { HTTPError } from "@/services/http/HTTPError";
import Router from "@/services/router/Router";

const SERVER_ERROR_FROM = 500;

export function handleApiError(error: unknown): string {
  if (error instanceof HTTPError && error.status >= SERVER_ERROR_FROM) {
    new Router().go(ROUTES.SERVER_ERROR);
  }

  return getErrorReason(error);
}
