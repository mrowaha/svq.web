import { _async, _await, Model, model, modelFlow } from "mobx-keystone";
import { IChatService } from "./chat-service.interface";
import { chatApi } from "@/lib/frontend/api/chat/chat.api";
import { observable, action } from "mobx";
import { Message } from "@/lib/frontend/api/chat/chat.api";

const create = () => {
    return new ChatService({});
};

@model("@svq/ChatService")
export class ChatService extends Model({}) implements IChatService {
    static create = create;

    @observable.shallow messages: Map<string, Message[]> = new Map();

    @modelFlow
    sendMessage = _async(function* (
        this: ChatService,
        message: string,
        documentId?: string
    ) {
        const response = yield* _await(chatApi.sendMessage({ message, documentId }));

        if (response.ok && documentId) {
            this.addMessageToHistory(documentId, response.message);
        }

        return response;
    });

    @modelFlow
    getChatHistory = _async(function* (
        this: ChatService,
        documentId: string
    ) {
        const messages = yield* _await(chatApi.getChatHistory(documentId));
        this.setMessages(documentId, messages);
        return messages;
    });

    @action
    private addMessageToHistory(documentId: string, message: Message) {
        const currentMessages = this.messages.get(documentId) || [];
        this.messages.set(documentId, [...currentMessages, message]);
    }

    @action
    private setMessages(documentId: string, messages: Message[]) {
        this.messages.set(documentId, messages);
    }
}