import ChatsAPI from "@/services/api/Chats/ChatsAPI";
import type { IChatMessageDTO } from "@/services/api/Chats/types";
import type { TUserDTO } from "@/services/api/Users/types";
import { WS_BASE_URL } from "@/services/config/routes";

import { handleApiError } from "@/services/controllers/helpers/handleApiError";
import store from "@/services/store/Store";
import WSTransport from "@/services/ws/WSTransport";

const HISTORY_PAGE_SIZE = 20;
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY = 2_000;
const MESSAGE_TYPES = ["message", "file", "sticker"];

function isChatMessage(value: unknown): value is IChatMessageDTO {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { type, content } = value as Record<string, unknown>;

  return (
    typeof type === "string" &&
    MESSAGE_TYPES.includes(type) &&
    typeof content === "string"
  );
}

class MessagesController {
  private readonly api = new ChatsAPI();

  private socket: WSTransport | null = null;

  private chatId: number | null = null;

  private historyOffset = 0;

  private reconnectAttempts = 0;

  private reconnectTimer: number | undefined;

  public async connect(chatId: number): Promise<string | null> {
    this.disconnect();

    this.chatId = chatId;
    store.setState("messages", []);

    return this.open(chatId);
  }

  public disconnect(): void {
    window.clearTimeout(this.reconnectTimer);

    this.socket?.close();
    this.socket = null;
    this.chatId = null;
    this.historyOffset = 0;
    this.reconnectAttempts = 0;
  }

  public sendMessage(text: string): string | null {
    const content = text.trim();

    if (!content) {
      return null;
    }

    if (!this.socket) {
      return "Chat is not connected";
    }

    try {
      this.socket.send({ type: "message", content });

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  private async open(chatId: number): Promise<string | null> {
    const user = store.getState().user as TUserDTO | null;

    if (!user) {
      return "User is not authorized";
    }

    try {
      const { token } = await this.api.getToken(chatId);

      if (this.chatId !== chatId) {
        return null;
      }

      const socket: WSTransport = new WSTransport(
        `${WS_BASE_URL}/${user.id}/${chatId}/${token}`,
        {
          onMessage: (data) => this.handleMessage(socket, data),
          onClose: (event) => this.handleClose(socket, chatId, event),
        },
      );

      this.socket = socket;
      await socket.connect();

      if (this.socket !== socket) {
        return null;
      }

      this.reconnectAttempts = 0;
      this.historyOffset = 0;
      this.requestOld(0);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  private requestOld(offset: number): void {
    try {
      this.socket?.send({ type: "get old", content: String(offset) });
    } catch (error) {
      console.error(handleApiError(error));
    }
  }

  private handleMessage(socket: WSTransport, data: unknown): void {
    if (socket !== this.socket) {
      return;
    }

    if (Array.isArray(data)) {
      this.handleHistory(data);
      return;
    }

    if (isChatMessage(data)) {
      const current = store.getState().messages as IChatMessageDTO[];

      store.setState("messages", [...current, data]);
    }
  }

  private handleHistory(items: unknown[]): void {
    const current = store.getState().messages as IChatMessageDTO[];

    const chunk = items.filter(isChatMessage).reverse();

    store.setState("messages", [...chunk, ...current]);

    this.historyOffset += items.length;

    if (items.length >= HISTORY_PAGE_SIZE) {
      this.requestOld(this.historyOffset);
    }
  }

  private handleClose(
    socket: WSTransport,
    chatId: number,
    event: CloseEvent,
  ): void {
    if (socket !== this.socket || event.code === 1000) {
      return;
    }

    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error("WebSocket connection lost");
      return;
    }

    this.reconnectAttempts += 1;

    this.reconnectTimer = window.setTimeout(() => {
      if (this.chatId !== chatId) {
        return;
      }

      store.setState("messages", []);

      void this.open(chatId).then((error) => {
        if (error) {
          console.error(error);
        }
      });
    }, RECONNECT_DELAY);
  }
}

export default new MessagesController();
