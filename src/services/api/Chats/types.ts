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

export interface IChatTokenResponse {
  token: string;
}

export interface IChatFileDTO {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export type TChatMessageType = "message" | "file" | "sticker";

export interface IChatMessageDTO {
  id?: number | string;
  chat_id?: number;
  time: string;
  type: TChatMessageType;
  user_id: number | string;
  content: string;
  file?: IChatFileDTO;
}
