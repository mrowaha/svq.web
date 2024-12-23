"use client";
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { FileText, Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';

interface DocumentListProps {
    onDocumentSelect: (document: Document) => void;
    selectedDocument: Document | null;
}

const DocumentList = ({ onDocumentSelect, selectedDocument }: DocumentListProps) => {
    const store = useServiceStore();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await store.dataSourceService.listDocuments('standard');

                if (response.ok && response.documents) {
                    setDocuments(response.documents);
                } else {
                    throw new Error(response.error || 'Failed to fetch documents');
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, [store]);

    const filteredDocuments = documents.filter(doc =>
        doc.originalFilename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-72 bg-black border-r border-zinc-800 flex flex-col h-full">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search documents..."
                        className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    </div>
                ) : filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                        <div
                            key={doc.name}
                            className={`flex items-center px-4 py-2 cursor-pointer transition-colors ${selectedDocument?.name === doc.name ? 'bg-zinc-800' : 'hover:bg-zinc-900'
                                }`}
                            onClick={() => onDocumentSelect(doc)}
                        >
                            <FileText className="h-4 w-4 text-zinc-400 mr-3" />
                            <div className="flex flex-col">
                                <span className="text-zinc-300 text-sm truncate">
                                    {doc.originalFilename}
                                </span>
                                <span className="text-zinc-500 text-xs">
                                    {new Date(doc.lastModified).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 px-4 text-center">
                        <FileText className="h-8 w-8 text-zinc-600 mb-2" />
                        <p className="text-zinc-500 text-sm">
                            {searchQuery ? 'No matching documents found' : 'No documents uploaded yet'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(DocumentList);