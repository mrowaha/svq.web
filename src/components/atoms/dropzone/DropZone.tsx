import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
    onFileSelect: (files: FileList) => void;
    accept?: string;
    maxSize?: number;
}

export const DropZone: React.FC<DropZoneProps> = ({
    onFileSelect,
    accept = ".pdf,.docx,.txt",
    maxSize = 100 * 1024 * 1024, // 100MB
}) => {
    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Check file size
                if (files[0].size > maxSize) {
                    alert(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
                    return;
                }
                onFileSelect(files);
            }
        },
        [maxSize, onFileSelect]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                // Check file size
                if (e.target.files[0].size > maxSize) {
                    alert(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
                    return;
                }
                onFileSelect(e.target.files);
            }
        },
        [maxSize, onFileSelect]
    );

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-zinc-800 rounded-lg p-8 mb-6 cursor-pointer hover:border-zinc-600 transition-colors"
            onClick={() => document.getElementById('fileInput')?.click()}
        >
            <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
                <p className="text-zinc-400 mb-2">Drag and drop your files here, or click to browse</p>
                <p className="text-sm text-zinc-500">Supports PDF, DOCX, TXT (up to 100MB each)</p>
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={handleFileInput}
                />
            </div>
        </div>
    );
};