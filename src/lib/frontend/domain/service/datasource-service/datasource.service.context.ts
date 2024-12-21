import { createContext } from "mobx-keystone";
import { IDatasourceService } from "./datasource.service.interface";

export const datasourceServiceContext = createContext<IDatasourceService>();

export const getFileSystemService = (self: object) => {
  const datasourceService = datasourceServiceContext.get(self);
  if (!datasourceService) {
    throw new Error("datasourceService is not defined");
  }
  return datasourceService;
};
