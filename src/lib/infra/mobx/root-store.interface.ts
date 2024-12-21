import { DatasourceService } from "@/lib/frontend/domain/service/datasource-service";
import { EchoService } from "../../frontend/domain/service";

export interface IRootStore {
  echoService: EchoService;
  datasourceService: DatasourceService;
}
