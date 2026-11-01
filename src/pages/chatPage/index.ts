import { Page } from "@/pages/Page";
import chatPage from "./chatPage.hbs?raw";
import { CHAT_LIST } from "@/mocks";
import { formatTime, groupMessagesByDate } from "@/utils/date/date";

export class ChatPage extends Page {
  protected template = chatPage;
  private activeChatId: string | null = null;
  private root: HTMLElement | null = null;

  protected getContext() {
    const chats = CHAT_LIST.map((card) => {
      const last = card.chat.messages.at(-1);
      return {
        ...card,
        isActive: card.id === this.activeChatId,
        time: last ? formatTime(last.sent_at) : "",
        lastMessage: last?.content ?? "",
        isOwnMessage: last?.isOwn ?? false,
      };
    });

    const active = chats.find((c) => c.isActive);

    return {
      chats,
      isActiveChat: Boolean(active),
      userName: active?.chat.userName,
      avatar: active?.chat.avatar,
      messageGroups: active ? groupMessagesByDate(active.chat.messages) : [],
    };
  }

  afterRender(root: HTMLElement): void {
    console.log("afterRender", root);
    this.root = root;
    document.addEventListener("click", this.handleClick);
  }

  private handleClick = (event: Event) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-action="chat"]',
    );
    console.log("ID", item?.dataset.id);
    if (!item?.dataset.id) return;
    this.onChatSelect(item.dataset.id);
  };

  protected onChatSelect(id: string) {
    this.activeChatId = id;
    if (!this.root) return;

    this.root.innerHTML = this.render();
  }

  destroy(): void {
    this.root?.removeEventListener("click", this.handleClick);
    this.root = null;
    this.activeChatId = null;
  }
}
