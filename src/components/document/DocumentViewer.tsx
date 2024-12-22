"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileText, Search, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';

interface DocumentViewerProps {
    document: Document | null;
}

const DocumentViewer = ({ document }: DocumentViewerProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3); // This would come from document metadata

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

    return (
        <div className="flex-1 flex flex-col bg-zinc-900">
            {/* Top Bar */}
            <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
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
            <div className="flex-1 overflow-y-auto p-6">
                <Card className="max-w-4xl mx-auto bg-white p-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{document.originalFilename}</h2>
                        <p className="text-zinc-600">Document content will be displayed here.</p>
                        <div className="space-y-2">
                            <h3 className="font-medium">Document Details:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Size: {(document.size / 1024).toFixed(2)} KB</li>
                                <li>Last Modified: {new Date(document.lastModified).toLocaleString()}</li>
                                <li>Type: {document.contentType || 'Not specified'}</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Bottom Bar */}
            <div className="h-14 border-t border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <Button
                            key={page}
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-white"
                            onClick={() => setCurrentPage(page)}
                        >
                            Page {page}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-sm">Version: 1/1</span>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;