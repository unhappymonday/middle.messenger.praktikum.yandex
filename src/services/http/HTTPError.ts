export class HTTPError extends Error {
  constructor(
    message: string,
    public readonly status: number = 0,
    public readonly body: unknown = null,
  ) {
    super(message);
    this.name = "HTTPError";
  }
}
