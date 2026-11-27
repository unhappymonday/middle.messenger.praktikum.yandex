import ChatsAPI from "@/services/api/Chats/ChatsAPI";
import type { TChatDTO } from "@/services/api/Chats/types";
import type { TUserDTO } from "@/services/api/Users/types";
import UserAPI from "@/services/api/Users/UserAPI";
import { handleApiError } from "@/services/controllers/helpers/handleApiError";
import MessagesController from "@/services/controllers/MessagesController";
import { activeChatStorage } from "@/services/storage/activeChatStorage";
import store from "@/services/store/Store";

class ChatsController {
  private readonly api = new ChatsAPI();

  private readonly userApi = new UserAPI();

  public async init(): Promise<string | null> {
    const error = await this.fetchChats();

    if (error || this.getActiveChatId() !== null) {
      return error;
    }

    const userId = this.getUserId();

    if (userId === null) {
      return null;
    }

    const savedId = activeChatStorage.get(userId);

    if (savedId === null) {
      return null;
    }

    const chats = store.getState().chats as TChatDTO[];

    if (!chats.some((chat) => chat.id === savedId)) {
      activeChatStorage.clear(userId);
      return null;
    }

    return this.selectChat(savedId);
  }

  public async fetchChats(): Promise<string | null> {
    try {
      const chats = await this.api.getChats();
      store.setState("chats", chats);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async createChat(title: string): Promise<string | null> {
    try {
      await this.api.createChat({ title });

      return await this.fetchChats();
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async deleteChat(chatId: number): Promise<string | null> {
    try {
      await this.api.deleteChat({ chatId });

      if (this.getActiveChatId() === chatId) {
        MessagesController.disconnect();
        store.setState("activeChatId", null);
        store.setState("activeChatUsers", []);
        store.setState("messages", []);

        const userId = this.getUserId();

        if (userId !== null) {
          activeChatStorage.clear(userId);
        }
      }

      return await this.fetchChats();
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async selectChat(chatId: number): Promise<string | null> {
    store.setState("activeChatId", chatId);

    const userId = this.getUserId();

    if (userId !== null) {
      activeChatStorage.set(userId, chatId);
    }

    const [usersError, socketError] = await Promise.all([
      this.fetchUsers(chatId),
      MessagesController.connect(chatId),
    ]);

    return usersError ?? socketError;
  }

  private getUserId(): number | null {
    return (store.getState().user as TUserDTO | null)?.id ?? null;
  }

  public async fetchUsers(chatId: number): Promise<string | null> {
    try {
      const users = await this.api.getUsers(chatId);
      store.setState("activeChatUsers", users);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async addUserByLogin(login: string): Promise<string | null> {
    const chatId = this.getActiveChatId();

    if (chatId === null) {
      return "Chat is not selected";
    }

    try {
      const found = (await this.userApi.search({ login })).find(
        (user) => user.login === login,
      );

      if (!found) {
        return "User not found";
      }

      await this.api.addUsers({ users: [found.id], chatId });

      return await this.fetchUsers(chatId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async removeUser(userId: number): Promise<string | null> {
    const chatId = this.getActiveChatId();

    if (chatId === null) {
      return "Chat is not selected";
    }

    try {
      await this.api.removeUsers({ users: [userId], chatId });

      return await this.fetchUsers(chatId);
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async updateAvatar(file: File): Promise<string | null> {
    const chatId = this.getActiveChatId();

    if (chatId === null) {
      return "Chat is not selected";
    }

    try {
      await this.api.updateAvatar(chatId, file);

      return await this.fetchChats();
    } catch (error) {
      return handleApiError(error);
    }
  }

  private getActiveChatId(): number | null {
    return store.getState().activeChatId as number | null;
  }
}

export default new ChatsController();
