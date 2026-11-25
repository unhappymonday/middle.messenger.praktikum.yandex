import type { TUserDTO } from "@/services/api/Users/types";

export type TLastMessageDTO = {
  user: Omit<TUserDTO, "id" | "second_name" | "display_name"> &
    Partial<Pick<TUserDTO, "id" | "second_name" | "display_name">>;
  time: string;
  content: string;
};

export type TChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: TLastMessageDTO | null;
};

export type TChatsQuery = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type TCreateChatRequest = {
  title: string;
};

export type TCreateChatResponse = {
  id: number;
};

export type TDeleteChatRequest = {
  chatId: number;
};

export type TDeleteChatResponse = {
  userId: number;
  result: Omit<TChatDTO, "unread_count" | "last_message">;
};

export type TChatUsersQuery = {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type TChatUserDTO = Omit<TUserDTO, "email" | "phone"> & {
  role: "admin" | "regular";
};

export type TChatUsersRequest = {
  users: number[];
  chatId: number;
};

export type TUnreadCountResponse = {
  unread_count: number;
};
