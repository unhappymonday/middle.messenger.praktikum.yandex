import type {
  TChangePasswordRequest,
  TFindUserRequest,
  TUpdateProfileRequest,
  TUserDTO,
} from "@/services/api/Users/types";
import BaseAPI from "@/services/http/BaseApi";

export default class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  public updateProfile(data: TUpdateProfileRequest): Promise<TUserDTO> {
    return this.http.put<TUserDTO>("/profile", { data });
  }

  public updateAvatar(file: File): Promise<TUserDTO> {
    const data = new FormData();
    data.append("avatar", file);

    return this.http.put<TUserDTO>("/profile/avatar", { data });
  }

  public updatePassword(data: TChangePasswordRequest): Promise<void> {
    return this.http.put<void>("/password", { data });
  }

  public getById(id: number): Promise<TUserDTO> {
    return this.http.get<TUserDTO>(`/${id}`);
  }

  public search(data: TFindUserRequest): Promise<TUserDTO[]> {
    return this.http.post<TUserDTO[]>("/search", { data });
  }
}
