import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';
import PDFViewer from './PDFViewer';

interface DocumentViewerProps {
    document: Document | null;
}

const DocumentViewer = ({ document }: DocumentViewerProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [zoom, setZoom] = useState(100);

    if (!document) {
        return (
            <div className="flex-1 flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                    <FileText className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-500">Select a document to view</p>
                </div>
            </div>
        );
    }

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    return (
        <div className="flex-1 flex flex-col bg-zinc-900">
            {/* Top Bar */}
            <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white"
                        onClick={handleZoomOut}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-zinc-400 text-sm">{zoom}%</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white"
                        onClick={handleZoomIn}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-zinc-300 text-sm">Page {currentPage}/{totalPages}</span>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="h-full" style={{ zoom: `${zoom}%` }}>
                    <PDFViewer document={document} />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-14 border-t border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-sm">
                        {document.originalFilename}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-sm">
                        {(document.size / 1024).toFixed(2)} KB
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;