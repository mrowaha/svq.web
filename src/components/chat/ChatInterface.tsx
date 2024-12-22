"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';

interface ChatInterfaceProps {
    document: Document | null;
    isDocumentOpen: boolean;
    onToggleDocument: (isOpen: boolean) => void;
}

const ChatInterface = ({ document, isDocumentOpen, onToggleDocument }: ChatInterfaceProps) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (!message.trim()) return;

        // TODO: Implement chat functionality
        console.log('Sending message:', message, 'for document:', document?.originalFilename);
        setMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
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
                            disabled={!document}
                            className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white bg-zinc-900 hover:bg-zinc-800"
                            disabled={!document || !message.trim()}
                            onClick={handleSendMessage}
                        >
                            <Send className="h-4 w-4" />
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
};

export default ChatInterface;