import type {
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
} from "@/services/api/Auth/types";
import type { TUserDTO } from "@/services/api/Users/types";
import BaseAPI from "@/services/http/BaseApi";

export default class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public signUp(data: TSignUpRequest): Promise<TSignUpResponse> {
    return this.http.post<TSignUpResponse>("/signup", { data });
  }

  public signIn(data: TSignInRequest): Promise<void> {
    return this.http.post<void>("/signin", { data });
  }

  public getUser(): Promise<TUserDTO> {
    return this.http.get<TUserDTO>("/user");
  }

  public logout(): Promise<void> {
    return this.http.post<void>("/logout");
  }
}
