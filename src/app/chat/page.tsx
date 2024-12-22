import React from 'react';
import DocumentViewer from '@/components/document/DocumentViewer';
import ChatInterface from '@/components/chat/ChatInterface';
import DocumentList from '@/components/document/DocumentList';

const DocumentChatPage = () => {
    return (
        <div className="h-[calc(100vh-64px)] flex bg-black">
            <DocumentList />
            <div className="flex-1 flex flex-col">
                <DocumentViewer />
                <ChatInterface />
            </div>
        </div>
    );
};

export default DocumentChatPage;