import React, { useState, useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from 'lucide-react';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { Message } from '@/lib/frontend/api/chat/chat.api';
import ChatSelectionButton from './ChatSelectionButton';


interface ChatInterfaceProps {
    document: Document | null;
    isDocumentOpen: boolean;
    onToggleDocument: (isOpen: boolean) => void;
}

const ChatInterface = observer(({ document, isDocumentOpen, onToggleDocument }: ChatInterfaceProps) => {
    const store = useServiceStore();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (document) {
            loadChatHistory();
        } else {
            setMessages([]);
        }
    }, [document?.name]);

    const loadChatHistory = async () => {
        if (!document) return;
        try {
            const history = await store.chatService.getChatHistory(document.name);
            setMessages(history);
            scrollToBottom();
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim() || !document) return;

        try {
            setIsLoading(true);

            // Add user message immediately
            const userMessage: Message = {
                id: Date.now().toString(),
                content: message,
                timestamp: new Date().toISOString(),
                role: 'user',
                documentId: document.name
            };
            setMessages(prev => [...prev, userMessage]);
            scrollToBottom();

            // Clear input
            setMessage('');

            // Send message to backend
            const response = await store.chatService.sendMessage(message, document.name);

            if (response.ok) {
                setMessages(prev => [...prev, response.message]);
                scrollToBottom();
            } else {
                // Handle error
                console.error('Error sending message:', response.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
            <ChatSelectionButton
                onSelectionChat={(selectedText) => {
                    setMessage((prev) => prev + (prev ? ' ' : '') + `"${selectedText}"`);
                }}
            />
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-800 text-zinc-100'
                                }`}
                        >
                            <p className="text-sm">{msg.content}</p>
                            <span className="text-xs opacity-50 mt-1 block">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder={document
                                ? `Ask about ${document.originalFilename}...`
                                : "Select a document to start chatting..."
                            }
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={!document || isLoading}
                            className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white bg-zinc-900 hover:bg-zinc-800"
                            disabled={!document || !message.trim() || isLoading}
                            onClick={handleSendMessage}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                            <span className="text-sm text-zinc-400">
                                {isDocumentOpen ? 'Hide' : 'Show'} Document
                            </span>
                            <div
                                className={`w-12 h-6 rounded-full bg-zinc-800 p-1 cursor-pointer transition-colors ${isDocumentOpen ? 'bg-zinc-700' : 'bg-zinc-800'
                                    }`}
                                onClick={() => onToggleDocument(!isDocumentOpen)}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white transition-transform ${isDocumentOpen ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ChatInterface;