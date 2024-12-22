import { idProp, Model, model, prop } from "mobx-keystone";
import { IRootStore } from "./root-store.interface";
import { EchoService, echoServiceContext } from "../../frontend/domain/service";
import {
  DataSourceService,
  dataSourceServiceContext,
} from "../../frontend/domain/service/datasource-service";
import { AuthService } from "@/lib/frontend/domain/service/auth-service/auth-service";
import { authServiceContext } from "@/lib/frontend/domain/service/auth-service/auth-service.context";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const createRootStore = (router: AppRouterInstance) => {
  @model("@svq/RootStore")
  class RootStore
    extends Model({
      id: idProp,
      echoService: prop(EchoService.create),
      dataSourceService: prop(DataSourceService.create),
      authService: prop(AuthService.create),
    })
    implements IRootStore
  {
    public router: AppRouterInstance = router;

    protected override onInit(): void {
      echoServiceContext.set(this, this.echoService);
      dataSourceServiceContext.set(this, this.dataSourceService);
      authServiceContext.set(this, this.authService);
    }
  }

  return new RootStore({});
};
