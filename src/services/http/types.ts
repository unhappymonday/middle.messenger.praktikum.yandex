export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type TRequestData = Record<string, unknown> | FormData;

export interface IRequestOptions {
  data?: TRequestData;
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
}
