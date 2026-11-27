const PING_INTERVAL = 25_000;

export interface IWSHandlers {
  onMessage?: (data: unknown) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: () => void;
}

export default class WSTransport {
  private socket: WebSocket | null = null;

  private pingTimer: number | undefined;

  constructor(
    private readonly url: string,
    private readonly handlers: IWSHandlers = {},
  ) {}

  public connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(this.url);
      this.socket = socket;

      let isOpened = false;

      socket.addEventListener("open", () => {
        isOpened = true;
        this.startPing();
        resolve();
      });

      socket.addEventListener("message", (event: MessageEvent<string>) => {
        try {
          this.handlers.onMessage?.(JSON.parse(event.data));
        } catch {
          console.log("non json");
        }
      });

      socket.addEventListener("error", () => {
        if (!isOpened) {
          reject(new Error("WebSocket connection error"));
          return;
        }

        this.handlers.onError?.();
      });

      socket.addEventListener("close", (event) => {
        this.stopPing();

        if (!isOpened) {
          reject(new Error("WebSocket closed before opening"));
          return;
        }

        this.handlers.onClose?.(event);
      });
    });
  }

  public send(data: object): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }

    this.socket.send(JSON.stringify(data));
  }

  public close(): void {
    this.stopPing();
    this.socket?.close(1000);
    this.socket = null;
  }

  private startPing(): void {
    this.stopPing();

    this.pingTimer = window.setInterval(() => {
      try {
        this.send({ type: "ping" });
      } catch {
        this.stopPing();
      }
    }, PING_INTERVAL);
  }

  private stopPing(): void {
    window.clearInterval(this.pingTimer);
    this.pingTimer = undefined;
  }
}
