export type TMessageSender = "own" | "other";

export type TMessages = {
  sender: TMessageSender;
  content: string;
  sent_at: string;
  attached?: string;
  isOwnMessage?: boolean;
};

export type TChat = {
  userName: string;
  avatar?: string;
  messages: TMessages[];
};

export type TChatCard = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  chat: TChat;
  isOwnMessage?: boolean;
  avatar?: string;
  unreadCount?: number;
  isActive?: boolean;
};

export interface IChatMessageGroup {
  label: string;
  messages: TMessages[];
}
