import AuthAPI from "@/services/api/Auth/AuthAPI";
import type { TSignInRequest, TSignUpRequest } from "@/services/api/Auth/types";
import type { TUserDTO } from "@/services/api/Users/types";
import { ROUTES } from "@/services/config/api";
import { handleApiError } from "@/services/controllers/helpers/handleApiError";
import { HTTPError } from "@/services/http/HTTPError";
import Router from "@/services/router/Router";
import store from "@/services/store/Store";

class AuthController {
  private readonly api = new AuthAPI();

  private readonly router = new Router();

  public async fetchUser(): Promise<TUserDTO | null> {
    try {
      const user = await this.api.getUser();
      store.setState("user", user);

      return user;
    } catch {
      store.setState("user", null);

      return null;
    }
  }

  public async signIn(data: TSignInRequest): Promise<string | null> {
    try {
      try {
        await this.api.signIn(data);
      } catch (error) {
        const isAlreadyIn =
          error instanceof HTTPError &&
          error.status === 400 &&
          JSON.stringify(error.body).includes("already in system");

        if (!isAlreadyIn) {
          throw error;
        }
      }

      const user = await this.fetchUser();

      if (!user) {
        throw new Error("Failed to load user");
      }

      this.router.go(ROUTES.MESSENGER);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async signUp(data: TSignUpRequest): Promise<string | null> {
    try {
      await this.api.signUp(data);

      const user = await this.fetchUser();

      if (!user) {
        throw new Error("Failed to load user");
      }

      this.router.go(ROUTES.MESSENGER);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async logout(): Promise<string | null> {
    try {
      console.log("LOGOUT API: sending POST");
      await this.api.logout();
      console.log("LOGOUT API: success");

      store.setState("user", null);
      store.setState("chats", []);
      store.setState("activeChatId", null);
      store.setState("activeChatUsers", []);

      this.router.go(ROUTES.LOGIN);
      return null;
    } catch (error) {
      console.error("LOGOUT API: error", error);
      return handleApiError(error);
    }
  }
}

export default new AuthController();
