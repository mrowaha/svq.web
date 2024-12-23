import React, { useState, useEffect } from 'react';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { Document as PDFDocument } from '@/lib/frontend/api/datasource/datasource.api';
import { Loader2 } from 'lucide-react';

const PDFViewer = ({ document }: { document: PDFDocument }) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const store = useServiceStore();

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/v1/datasource/content/${document.name}?datasource=standard`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (document) {
            fetchPDF();
        }

        // Cleanup
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [document]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
            </div>
        );
    }

    if (!pdfUrl) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-zinc-400">Failed to load PDF</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            <iframe
                src={pdfUrl + '#toolbar=0'}
                className="w-full h-full border-none"
                title={document.originalFilename}
            />
        </div>
    );
};

export default PDFViewer;