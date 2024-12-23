import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropZoneProps {
    onFileSelect: (files: FileList) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach(file => dataTransfer.items.add(file));
        onFileSelect(dataTransfer.files);
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors
        ${isDragActive
                    ? 'border-white bg-zinc-800/50'
                    : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'}`
            }
        >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
            <p className="text-zinc-400">
                {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag & drop a file here, or click to select'}
            </p>
            <p className="text-sm text-zinc-500 mt-2">
                Supported formats: PDF, DOCX, TXT
            </p>
        </div>
    );
};

export default DropZone;