import { createContext } from "mobx-keystone";
import { IDataSourceService } from "./datasource-service.interface";

export const dataSourceServiceContext = createContext<IDataSourceService>();

export const getDataSourceService = (self: object) => {
    const service = dataSourceServiceContext.get(self);
    if (!service) {
        throw new Error("dataSourceService is not defined");
    }
    return service;
};