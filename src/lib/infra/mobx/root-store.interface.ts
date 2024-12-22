import { AuthService } from "@/lib/frontend/domain/service/auth-service/auth-service";
import { EchoService } from "../../frontend/domain/service";
import { DataSourceService } from "../../frontend/domain/service/datasource-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface IRootStore {
  router: AppRouterInstance;
  echoService: EchoService;
  dataSourceService: DataSourceService;
  authService: AuthService;
}
