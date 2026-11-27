import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_TIMEOUT } from "@/services/http/constants";
import { HTTPError } from "@/services/http/HTTPError";
import HTTPTransport from "@/services/http/HTTPTrasport";

vi.mock("@/services/http/helpers/parseBody", () => ({
  parseBody: (xhr: { response: unknown }) => xhr.response,
}));

class MockXHR {
  static instances: MockXHR[] = [];

  public method = "";
  public url = "";
  public withCredentials = false;
  public timeout = 0;
  public responseType = "";
  public status = 0;
  public response: unknown = null;
  public headers: Record<string, string> = {};
  public sentBody: unknown;

  public onload: (() => void) | null = null;
  public onerror: (() => void) | null = null;
  public onabort: (() => void) | null = null;
  public ontimeout: (() => void) | null = null;

  constructor() {
    MockXHR.instances.push(this);
  }

  public open(method: string, url: string): void {
    this.method = method;
    this.url = url;
  }

  public setRequestHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  public send(body?: unknown): void {
    this.sentBody = body;
  }

  public respond(status: number, body: unknown): void {
    this.status = status;
    this.response = body;
    this.onload?.();
  }
}

const lastRequest = (): MockXHR =>
  MockXHR.instances[MockXHR.instances.length - 1];

describe("HTTPTransport", () => {
  let http: HTTPTransport;

  beforeEach(() => {
    MockXHR.instances = [];
    vi.stubGlobal("XMLHttpRequest", MockXHR);
    http = new HTTPTransport("https://api.test");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds the url from base url and path, sends cookies and default timeout", () => {
    void http.get("/chats");

    const xhr = lastRequest();

    expect(xhr.method).toBe("GET");
    expect(xhr.url).toBe("https://api.test/chats");
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.timeout).toBe(DEFAULT_TIMEOUT);
  });

  it("puts GET data into the query string and sends no body", () => {
    void http.get("/chats", { data: { limit: 10 } });

    const xhr = lastRequest();

    expect(xhr.url).toContain("?");
    expect(xhr.url).toContain("limit=10");
    expect(xhr.sentBody).toBeUndefined();
  });

  it.each([
    ["post", "POST"],
    ["put", "PUT"],
    ["delete", "DELETE"],
  ] as const)("%s uses the %s method", (name, method) => {
    void http[name]("/x");

    expect(lastRequest().method).toBe(method);
  });

  it("sends an object as JSON with a content-type header", () => {
    void http.post("/chats", { data: { title: "my chat" } });

    const xhr = lastRequest();

    expect(xhr.sentBody).toBe(JSON.stringify({ title: "my chat" }));
    expect(xhr.headers["Content-Type"]).toBe("application/json");
  });

  it("sends FormData as is, without a content-type header", () => {
    const data = new FormData();
    data.append("avatar", new File(["x"], "a.png"));

    void http.put("/avatar", { data });

    const xhr = lastRequest();

    expect(xhr.sentBody).toBe(data);
    expect(xhr.headers["Content-Type"]).toBeUndefined();
  });

  it("passes custom headers", () => {
    void http.get("/x", { headers: { "X-Test": "1" } });

    expect(lastRequest().headers["X-Test"]).toBe("1");
  });

  it("resolves with the parsed body on a 2xx status", async () => {
    const promise = http.get<{ id: number }>("/user");

    lastRequest().respond(200, { id: 1 });

    await expect(promise).resolves.toEqual({ id: 1 });
  });

  it("rejects with HTTPError containing status and body on a 4xx/5xx status", async () => {
    const promise = http.get("/user");

    lastRequest().respond(401, { reason: "Unauthorized" });

    const error = await promise.catch((e: unknown) => e);

    expect(error).toBeInstanceOf(HTTPError);
    expect((error as HTTPError).status).toBe(401);
    expect((error as HTTPError).body).toEqual({ reason: "Unauthorized" });
  });

  it("rejects with HTTPError on a network error", async () => {
    const promise = http.get("/x");

    lastRequest().onerror?.();

    await expect(promise).rejects.toBeInstanceOf(HTTPError);
  });

  it("rejects with HTTPError on timeout", async () => {
    const promise = http.get("/x");

    lastRequest().ontimeout?.();

    await expect(promise).rejects.toBeInstanceOf(HTTPError);
  });
});
