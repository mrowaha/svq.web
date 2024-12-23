import { EchoService } from "../../frontend/domain/service";
import { DataSourceService } from "../../frontend/domain/service/datasource-service";

export interface IRootStore {
  chatService: any;
  echoService: EchoService;
  dataSourceService: DataSourceService;
}