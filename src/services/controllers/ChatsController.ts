import ChatsAPI from "@/services/api/Chats/ChatsAPI";
import UserAPI from "@/services/api/Users/UserAPI";
import { handleApiError } from "@/services/controllers/helpers/handleApiError";
import store from "@/services/store/Store";

class ChatsController {
  private readonly api = new ChatsAPI();

  private readonly userApi = new UserAPI();

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
        store.setState("activeChatId", null);
        store.setState("activeChatUsers", []);
      }

      return await this.fetchChats();
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async selectChat(chatId: number): Promise<string | null> {
    store.setState("activeChatId", chatId);

    return this.fetchUsers(chatId);
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
