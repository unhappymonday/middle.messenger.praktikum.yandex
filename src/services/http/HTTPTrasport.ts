import { DEFAULT_TIMEOUT } from "@/services/http/constants";
import { parseBody } from "@/services/http/helpers/parseBody";
import { HTTPError } from "@/services/http/HTTPError";
import type { IRequestOptions, THttpMethod } from "@/services/http/types";
import queryStringify from "@/utils/queryStringify";

export default class HTTPTransport {
  constructor(private readonly baseUrl: string = "") {}

  public get<T = unknown>(path: string, options?: IRequestOptions): Promise<T> {
    return this.request<T>("GET", path, options);
  }

  public post<T = unknown>(
    path: string,
    options?: IRequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", path, options);
  }

  public put<T = unknown>(path: string, options?: IRequestOptions): Promise<T> {
    return this.request<T>("PUT", path, options);
  }

  public delete<T = unknown>(
    path: string,
    options?: IRequestOptions,
  ): Promise<T> {
    return this.request<T>("DELETE", path, options);
  }

  private request<T>(
    method: THttpMethod,
    path: string,
    options: IRequestOptions = {},
  ): Promise<T> {
    const {
      data,
      headers = {},
      timeout = DEFAULT_TIMEOUT,
      responseType,
    } = options;
    const isGet = method === "GET";

    const query =
      isGet && data && !(data instanceof FormData) ? queryStringify(data) : "";
    const url = query
      ? `${this.baseUrl}${path}?${query}`
      : `${this.baseUrl}${path}`;

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        const body = parseBody(xhr);

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(body as T);
          return;
        }

        reject(
          new HTTPError(
            `Request failed with status ${xhr.status}`,
            xhr.status,
            body,
          ),
        );
      };

      xhr.onerror = () => reject(new HTTPError("Network error"));
      xhr.onabort = () => reject(new HTTPError("Request aborted"));
      xhr.ontimeout = () => reject(new HTTPError("Request timeout"));

      if (isGet || data === undefined) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        const hasContentType = Object.keys(headers).some(
          (key) => key.toLowerCase() === "content-type",
        );

        if (!hasContentType) {
          xhr.setRequestHeader("Content-Type", "application/json");
        }

        xhr.send(JSON.stringify(data));
      }
    });
  }
}
