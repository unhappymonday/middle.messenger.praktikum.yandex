import type { IChatMessageGroup, TChatCard, TMessages } from "@/features/Chat";
import type { IChatMessageDTO, TChatDTO } from "@/services/api/Chats/types";
import type { TStoreState } from "@/services/store/types";
import { getAvatarUrl } from "@/utils/getAvatarUrl";
import type { Indexed } from "@/utils/types";

function formatCardTime(iso: string | undefined): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (date.toDateString() === new Date().toDateString()) {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

function toCard(
  chat: TChatDTO,
  activeChatId: number | null,
  userLogin: string | undefined,
): TChatCard {
  const avatar = getAvatarUrl(chat.avatar) || undefined;

  return {
    id: String(chat.id),
    name: chat.title,
    avatar,
    lastMessage: chat.last_message?.content ?? "",
    time: formatCardTime(chat.last_message?.time),
    unreadCount: chat.unread_count,
    isActive: chat.id === activeChatId,
    isOwnMessage:
      chat.last_message !== null && chat.last_message.user.login === userLogin,
    chat: { userName: chat.title, avatar, messages: [] },
  };
}

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toMessage(
  message: IChatMessageDTO,
  currentUserId: number | undefined,
): TMessages {
  const isOwn =
    currentUserId !== undefined &&
    String(message.user_id) === String(currentUserId);

  const date = new Date(message.time);
  const isValidDate = !Number.isNaN(date.getTime());

  return {
    sender: isOwn ? "own" : "other",
    isOwnMessage: isOwn,
    content:
      message.type === "message"
        ? message.content
        : (message.file?.filename ?? ""),
    sent_at: isValidDate ? formatMessageTime(date) : "",
  };
}

function toMessageGroups(
  messages: IChatMessageDTO[],
  currentUserId: number | undefined,
): IChatMessageGroup[] {
  const groups: IChatMessageGroup[] = [];

  messages.forEach((message) => {
    const date = new Date(message.time);
    const label = Number.isNaN(date.getTime()) ? "" : formatDateLabel(date);
    const last = groups[groups.length - 1];
    const item = toMessage(message, currentUserId);

    if (last && last.label === label) {
      last.messages.push(item);
      return;
    }

    groups.push({ label, messages: [item] });
  });

  return groups;
}

export function mapChatsToProps(state: Indexed) {
  const { chats, activeChatId, user, messages } = state as TStoreState;

  const cards = chats.map((chat) => toCard(chat, activeChatId, user?.login));
  const active = cards.find((card) => card.isActive);
  const messageGroups = toMessageGroups(messages, user?.id);

  return {
    chats: cards,
    isActiveChat: Boolean(active),
    userName: active?.name,
    avatar: active?.avatar,
    messageGroups,
  };
}
