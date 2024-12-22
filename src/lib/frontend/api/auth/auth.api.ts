import { BaseApi } from "../base.api";

class AuthApi extends BaseApi {
  constructor() {
    super("/auth");
  }

  async me() {
    return await this.get("/me");
  }

  async login(username: string, password: string) {
    return await this.post("/login", {
      username,
      password,
    });
  }
}

export const authApi = new AuthApi();
