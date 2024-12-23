import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatSelectionButtonProps {
    onSelectionChat?: (selectedText: string) => void;
}

const ChatSelectionButton = ({ onSelectionChat }: ChatSelectionButtonProps) => {
    const [selection, setSelection] = useState({
        text: '',
        position: { x: 0, y: 0 },
        isVisible: false
    });

    useEffect(() => {
        const handleMouseUp = () => {
            // Small delay to ensure selection is available
            setTimeout(() => {
                const selectedText = window.getSelection()?.toString().trim();

                if (selectedText) {
                    const range = window.getSelection()?.getRangeAt(0);
                    const rect = range?.getBoundingClientRect();

                    if (rect) {
                        setSelection({
                            text: selectedText,
                            position: {
                                x: rect.x + (rect.width / 2),
                                y: rect.y - 40 // Position above the selection
                            },
                            isVisible: true
                        });
                    }
                }
            }, 10);
        };

        const handleClick = (e: MouseEvent) => {
            // Hide the button if clicking outside, unless it's the button itself
            if (!e.target || !(e.target as Element).closest('.selection-chat-button')) {
                setSelection(prev => ({ ...prev, isVisible: false }));
            }
        };

        // Handle new selections starting
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed) {
                setSelection(prev => ({ ...prev, isVisible: false }));
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('click', handleClick);
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, []);

    const handleChatClick = () => {
        if (onSelectionChat) {
            onSelectionChat(selection.text);
        }
        setSelection(prev => ({ ...prev, isVisible: false }));
    };

    if (!selection.isVisible) return null;

    return (
        <div
            className="selection-chat-button fixed z-50 transform -translate-x-1/2"
            style={{
                left: selection.position.x,
                top: Math.max(0, selection.position.y), // Prevent negative top position
            }}
        >
            <button
                onClick={handleChatClick}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shadow-lg text-sm font-medium transition-colors"
            >
                <MessageSquare className="w-4 h-4" />
                Chat with selection
            </button>
        </div>
    );
};

export default ChatSelectionButton;