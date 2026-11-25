import type { IChatMessageGroup, TChatCard } from "@/features/Chat";
import type { TChatDTO } from "@/services/api/Chats/types";
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

export function mapChatsToProps(state: Indexed) {
  const { chats, activeChatId, user } = state as TStoreState;

  const cards = chats.map((chat) => toCard(chat, activeChatId, user?.login));
  const active = cards.find((card) => card.isActive);
  const messageGroups: IChatMessageGroup[] = [];

  return {
    chats: cards,
    isActiveChat: Boolean(active),
    userName: active?.name,
    avatar: active?.avatar,
    messageGroups,
  };
}
