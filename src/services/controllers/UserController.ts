import type {
  TUpdateProfileRequest,
  TChangePasswordRequest,
} from "@/services/api/Users/types";
import UserAPI from "@/services/api/Users/UserAPI";
import { handleApiError } from "@/services/controllers/helpers/handleApiError";
import store from "@/services/store/Store";

class UserController {
  private readonly api = new UserAPI();

  public async updateProfile(
    data: TUpdateProfileRequest,
  ): Promise<string | null> {
    try {
      const user = await this.api.updateProfile(data);
      store.setState("user", user);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async updateAvatar(file: File): Promise<string | null> {
    try {
      const user = await this.api.updateAvatar(file);
      store.setState("user", user);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }

  public async updatePassword(
    data: TChangePasswordRequest,
  ): Promise<string | null> {
    try {
      await this.api.updatePassword(data);

      return null;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export default new UserController();
