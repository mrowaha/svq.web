import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface TextViewerProps {
    documentUrl: string;
    className?: string;
}

const TextViewer: React.FC<TextViewerProps> = ({ documentUrl, className = '' }) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(documentUrl);
                if (!response.ok) {
                    throw new Error('Failed to load document');
                }
                const text = await response.text();
                setContent(text);
                setError(null);
            } catch (err) {
                setError(err.message || 'Error loading document');
            } finally {
                setLoading(false);
            }
        };

        if (documentUrl) {
            fetchContent();
        }
    }, [documentUrl]);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-full min-h-64">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full min-h-64 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <Card className={`bg-zinc-900/50 border-0 p-6 ${className}`}>
            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-200 overflow-auto">
                {content}
            </pre>
        </Card>
    );
};

export default TextViewer;