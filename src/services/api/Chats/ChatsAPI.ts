import type {
  TChatsQuery,
  TChatDTO,
  TCreateChatRequest,
  TCreateChatResponse,
  TDeleteChatRequest,
  TDeleteChatResponse,
  TChatUsersQuery,
  TChatUserDTO,
  TUnreadCountResponse,
  TChatUsersRequest,
  IChatTokenResponse,
} from "@/services/api/Chats/types";
import BaseAPI from "@/services/http/BaseApi";

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  public getChats(query?: TChatsQuery): Promise<TChatDTO[]> {
    return this.http.get<TChatDTO[]>("", { data: query });
  }

  public createChat(data: TCreateChatRequest): Promise<TCreateChatResponse> {
    return this.http.post<TCreateChatResponse>("", { data });
  }

  public deleteChat(data: TDeleteChatRequest): Promise<TDeleteChatResponse> {
    return this.http.delete<TDeleteChatResponse>("", { data });
  }

  public getUsers(
    chatId: number,
    query?: TChatUsersQuery,
  ): Promise<TChatUserDTO[]> {
    return this.http.get<TChatUserDTO[]>(`/${chatId}/users`, { data: query });
  }

  public getNewCount(chatId: number): Promise<TUnreadCountResponse> {
    return this.http.get<TUnreadCountResponse>(`/new/${chatId}`);
  }

  public updateAvatar(chatId: number, file: File): Promise<TChatDTO> {
    const data = new FormData();
    data.append("chatId", String(chatId));
    data.append("avatar", file);

    return this.http.put<TChatDTO>("/avatar", { data });
  }

  public addUsers(data: TChatUsersRequest): Promise<void> {
    return this.http.put<void>("/users", { data });
  }

  public removeUsers(data: TChatUsersRequest): Promise<void> {
    return this.http.delete<void>("/users", { data });
  }

  public getToken(chatId: number): Promise<IChatTokenResponse> {
    return this.http.post<IChatTokenResponse>(`/token/${chatId}`);
  }
}
