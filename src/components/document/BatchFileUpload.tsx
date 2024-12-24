import React, { useState, useCallback } from 'react';
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, X, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';

interface FileWithPreview extends File {
    preview?: string;
}

interface UploadQueueItem {
    file: FileWithPreview;
    status: 'pending' | 'uploading' | 'success' | 'error';
    error?: string;
}

const BatchFileUpload = () => {
    const store = useServiceStore();
    const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [processingOptions, setProcessingOptions] = useState({
        enableOcr: false,
        extractTables: false
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            status: 'pending' as const
        }));

        setUploadQueue(current => {
            // Filter out duplicates based on file name
            const existingNames = new Set(current.map(item => item.file.name));
            const uniqueNewFiles = newFiles.filter(item => !existingNames.has(item.file.name));
            return [...current, ...uniqueNewFiles];
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        multiple: true
    });

    const handleRemoveFile = (fileName: string) => {
        setUploadQueue(current => current.filter(item => item.file.name !== fileName));
    };

    const handleProcessingOptionChange = (option: string) => {
        setProcessingOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleUploadAll = async () => {
        if (uploadQueue.length === 0 || isUploading) return;

        setIsUploading(true);

        try {
            // Update all files to uploading status
            setUploadQueue(current =>
                current.map(item => ({
                    ...item,
                    status: 'uploading'
                }))
            );

            // Upload files in parallel
            const uploadPromises = uploadQueue.map(async (item) => {
                try {
                    await store.dataSourceService.uploadFile(
                        item.file,
                        processingOptions.enableOcr ? 'ocr' : 'standard'
                    );
                    setUploadQueue(current =>
                        current.map(queueItem =>
                            queueItem.file.name === item.file.name
                                ? { ...queueItem, status: 'success' }
                                : queueItem
                        )
                    );
                } catch (error) {
                    setUploadQueue(current =>
                        current.map(queueItem =>
                            queueItem.file.name === item.file.name
                                ? { ...queueItem, status: 'error', error: error.message }
                                : queueItem
                        )
                    );
                }
            });

            await Promise.all(uploadPromises);
        } catch (error) {
            console.error('Batch upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive
                        ? 'border-white bg-zinc-800/50'
                        : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'
                    }`}
            >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
                <p className="text-zinc-400">
                    {isDragActive
                        ? 'Drop the files here...'
                        : 'Drag & drop files here, or click to select'}
                </p>
                <p className="text-sm text-zinc-500 mt-2">
                    Supported formats: PDF, DOCX, TXT
                </p>
            </div>

            {/* File Queue */}
            {uploadQueue.length > 0 && (
                <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                    <div className="space-y-4">
                        {uploadQueue.map((item) => (
                            <div
                                key={item.file.name}
                                className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-zinc-400" />
                                    <div>
                                        <p className="text-sm text-white">{item.file.name}</p>
                                        <p className="text-xs text-zinc-400">
                                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {item.status === 'uploading' && (
                                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                    )}
                                    {item.status === 'success' && (
                                        <div className="text-green-500 text-sm">Uploaded</div>
                                    )}
                                    {item.status === 'error' && (
                                        <div className="text-red-500 text-sm">{item.error || 'Error'}</div>
                                    )}
                                    {item.status === 'pending' && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-zinc-400 hover:text-white"
                                            onClick={() => handleRemoveFile(item.file.name)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Processing Options */}
            <div>
                <h3 className="text-white mb-4">Processing Options</h3>
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-zinc-400">
                        <input
                            type="checkbox"
                            className="rounded-sm bg-zinc-800 border-zinc-700"
                            checked={processingOptions.enableOcr}
                            onChange={() => handleProcessingOptionChange('enableOcr')}
                        />
                        Enable OCR for scanned documents
                    </label>
                    <label className="flex items-center gap-2 text-zinc-400">
                        <input
                            type="checkbox"
                            className="rounded-sm bg-zinc-800 border-zinc-700"
                            checked={processingOptions.extractTables}
                            onChange={() => handleProcessingOptionChange('extractTables')}
                        />
                        Extract tables and figures
                    </label>
                </div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-end gap-3">
                <Button
                    variant="ghost"
                    className="bg-zinc-800 text-white hover:bg-zinc-700"
                >
                    Cancel
                </Button>
                <Button
                    className="bg-white text-black hover:bg-zinc-200"
                    onClick={handleUploadAll}
                    disabled={uploadQueue.length === 0 || isUploading}
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>Create Data Source</>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default observer(BatchFileUpload);