import React from 'react';
import DocumentViewer from '@/components/document/DocumentViewer';
import ChatInterface from '@/components/chat/ChatInterface';

const DocumentChatPage = () => {
    return (
        <div className="h-screen bg-black">
            <DocumentViewer />
            <ChatInterface />
        </div>
    );
};

export default DocumentChatPage;