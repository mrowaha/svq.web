"use client";
import React, { useState } from 'react';
import DocumentViewer from '@/components/document/DocumentViewer';
import ChatInterface from '@/components/chat/ChatInterface';
import DocumentList from '@/components/document/DocumentList';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';


const DocumentChatPage = () => {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [isDocumentOpen, setIsDocumentOpen] = useState(true);

    return (
        <div className="h-[calc(100vh-64px)] flex bg-black">
            <DocumentList
                onDocumentSelect={setSelectedDocument}
                selectedDocument={selectedDocument}
            />
            <div className="flex-1 flex flex-col">
                {isDocumentOpen && (
                    <DocumentViewer
                        document={selectedDocument}
                    />
                )}
                <ChatInterface
                    document={selectedDocument}
                    isDocumentOpen={isDocumentOpen}
                    onToggleDocument={setIsDocumentOpen}
                />
            </div>
        </div>
    );
};

export default DocumentChatPage;