import { createContext } from "mobx-keystone";
import { IAuthService } from "./auth-service.interface";

export const authServiceContext = createContext<IAuthService>();

export const getDataSourceService = (self: object) => {
  const service = authServiceContext.get(self);
  if (!service) {
    throw new Error("authService is not defined");
  }
  return service;
};
