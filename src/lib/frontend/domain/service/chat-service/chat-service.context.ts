import { createContext } from "mobx-keystone";
import { IChatService } from "./chat-service.interface";

export const chatServiceContext = createContext<IChatService>();

export const getChatService = (self: object) => {
    const service = chatServiceContext.get(self);
    if (!service) {
        throw new Error("chatService is not defined");
    }
    return service;
};
