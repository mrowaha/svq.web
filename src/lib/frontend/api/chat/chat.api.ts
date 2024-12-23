import { BaseApi } from "../base.api";

export interface Message {
    id: string;
    content: string;
    timestamp: string;
    role: 'user' | 'assistant';
    documentId?: string;
}

export interface ChatRequest {
    message: string;
    documentId?: string;
}

export interface ChatResponse {
    ok: boolean;
    message: Message;
    error?: string;
}

class ChatApi extends BaseApi {
    constructor() {
        super("/chat");
    }

    async sendMessage(request: ChatRequest): Promise<ChatResponse> {
        return await this.post<ChatResponse>("/send", request);
    }

    async getChatHistory(documentId: string): Promise<Message[]> {
        return await this.get<Message[]>(`/history/${documentId}`);
    }
}

export const chatApi = new ChatApi();