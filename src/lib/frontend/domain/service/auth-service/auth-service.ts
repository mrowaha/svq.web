import {
  _async,
  _await,
  Model,
  modelFlow,
  model,
  prop,
  modelAction,
} from "mobx-keystone";
import { IAuthService } from "./auth-service.interface";
import { authApi } from "@/lib/frontend/api/auth/auth.api";
import { isMeDto } from "@/lib/frontend/dto/me.dto";
import { AxiosError } from "axios";
import { IRootStore } from "@/lib/infra/mobx/root-store.interface";
import { isTokenDto } from "@/lib/frontend/dto/login.dto";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
const create = () => {
  return new AuthService({});
};

@model("@svq/AuthService")
export class AuthService
  extends Model({
    authorized: prop<boolean>(false).withSetter(),
  })
  implements IAuthService
{
  static create = create;
  private router: AppRouterInstance;

  protected onAttachedToRootStore(rootStore: IRootStore): (() => void) | void {
    this.router = rootStore.router;
  }

  @modelFlow
  me = _async(function* (this: AuthService) {
    const res = yield* _await(authApi.me());
    if (isMeDto(res)) return res;
  });

  @modelFlow
  login = _async(function* (
    this: AuthService,
    username: string,
    password: string
  ) {
    const res = yield* _await(authApi.login("rowaha", "rowaha"));
    if (isTokenDto(res)) {
      // save to local storage
      // redirect to home
      localStorage.setItem("svq-token", res.access_token);
      this.router.push("/");
    }
  });
}
