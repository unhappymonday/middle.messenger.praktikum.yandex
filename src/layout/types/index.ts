import type { TFormField } from "@/components/types";

export type TFormCard = {
  title: string;
  formId: string;
  fields: TFormField[];
  submitText: string;
  link: { text: string; page: "auth" | "registration" };
};

export type TMessageSender = "own" | "other";

export type TMessageGroup = { label: string; messages: TMessages[] };

export type TMessages = {
  sender: TMessageSender;
  content: string;
  attached: string;
  sent_at: string;
  isOwn: boolean;
};

export type TChat = {
  userName: string;
  avatar: string;
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
  isActive?: boolean;
};
