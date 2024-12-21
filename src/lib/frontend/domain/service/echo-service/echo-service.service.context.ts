import { createContext } from "mobx-keystone";
import { IEchoService } from "./echo-service.service.interface";

export const echoServiceContext = createContext<IEchoService>();

export const getFileSystemService = (self: object) => {
  const echoService = echoServiceContext.get(self);
  if (!echoService) {
    throw new Error("echoService is not defined");
  }
  return echoService;
};
