import { Message, ChatResponse } from "@/lib/frontend/api/chat/chat.api";

export interface IChatService {
    sendMessage(message: string, documentId?: string): Promise<ChatResponse>;
    getChatHistory(documentId: string): Promise<Message[]>;
}
