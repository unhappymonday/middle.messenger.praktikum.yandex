export type TMessageSender = "own" | "other";

export type TMessages = {
  sender: TMessageSender;
  content: string;
  attached?: string;
  sent_at: string;
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
  avatar?: string;
  unreadCount?: number;
  isOwnMessage?: boolean;
};

export interface IChatMessageGroup {
  label: string;
  messages: TMessages[];
}
