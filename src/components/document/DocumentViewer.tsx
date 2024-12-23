import React from 'react';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';
import PDFViewer from './PDFViewer';
import TextViewer from './TextViewer';

interface DocumentViewerProps {
    document: Document | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
    if (!document) {
        return (
            <div className="flex-1 flex items-center justify-center bg-zinc-900/50 text-zinc-400">
                Select a document to view
            </div>
        );
    }

    const documentUrl = `/api/v1/datasource/content/${document.name}?datasource=standard`;

    // Function to determine the viewer type based on content type and file extension
    const getViewerType = (doc: Document) => {
        // List of supported content types for each viewer
        const pdfTypes = [
            'application/pdf',
            'application/x-pdf',
            'application/acrobat',
            'application/vnd.pdf',
            'text/pdf',
            'text/x-pdf'
        ];

        const textTypes = [
            'text/plain',
            'text/txt',
            'text/text',
            '.txt',
            'application/txt'
        ];

        const contentType = doc.contentType?.toLowerCase() || '';
        const fileName = doc.name?.toLowerCase() || '';

        // Check file extension
        const fileExtension = fileName.split('.').pop()?.toLowerCase();

        // Determine viewer type based on content type and file extension
        if (pdfTypes.some(type => contentType.includes(type)) || fileExtension === 'pdf') {
            return 'pdf';
        }

        if (textTypes.some(type => contentType.includes(type)) || fileExtension === 'txt') {
            return 'text';
        }

        return 'unsupported';
    };

    // Get the appropriate viewer type
    const viewerType = getViewerType(document);

    // Render the appropriate viewer
    switch (viewerType) {
        case 'text':
            return (
                <div className="flex-1 overflow-hidden bg-zinc-900/50">
                    <TextViewer documentUrl={documentUrl} className="h-full" />
                </div>
            );
        case 'pdf':
            return (
                <div className="flex-1 overflow-hidden bg-zinc-900/50">
                    <PDFViewer document={document} />
                </div>
            );
        default:
            return (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-zinc-900/50 text-zinc-400 p-4">
                    <p>Unsupported document type: {document.contentType}</p>
                    <p className="text-sm text-zinc-500">File: {document.name}</p>
                    <p className="text-sm text-zinc-500">Currently supported formats: PDF, TXT</p>
                </div>
            );
    }
};

export default DocumentViewer;