"use client";
import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { DropZone } from '@/components/atoms/dropzone/DropZone';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { Loader2 } from 'lucide-react';
import UploadNotification from '@/components/ui/UploadNotification';

const AddDataSource = () => {
    const store = useServiceStore();
    const [activeTab, setActiveTab] = useState('upload');
    const [connectionType, setConnectionType] = useState('');
    const [connectionUrl, setConnectionUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [currentFileName, setCurrentFileName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [processingOptions, setProcessingOptions] = useState({
        enableOcr: false,
        extractTables: false
    });

    const handleProcessingOptionChange = (option: string) => {
        setProcessingOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleFileSelect = async (files: FileList) => {
        if (files.length > 0) {
            const file = files[0];
            setCurrentFileName(file.name);
            setUploadStatus('uploading');

            try {
                await store.dataSourceService.uploadFile(
                    file,
                    processingOptions.enableOcr ? 'ocr' : 'standard'
                );
                setUploadStatus('success');
                setTimeout(() => {
                    setUploadStatus('idle');
                    setCurrentFileName('');
                }, 3000);
            } catch (error) {
                console.error('Upload failed:', error);
                setErrorMessage(error.message || 'Failed to upload file. Please try again.');
                setUploadStatus('error');
                setTimeout(() => {
                    setUploadStatus('idle');
                    setErrorMessage('');
                    setCurrentFileName('');
                }, 5000);
            }
        }
    };

    const handleCreateDataSource = async () => {
        if (activeTab === 'connect') {
            // Handle database connection
            console.log({
                connectionType,
                connectionUrl,
                apiKey
            });
        }
    };

    const renderNotification = () => {
        if (uploadStatus === 'idle') return null;

        return (
            <UploadNotification
                status={uploadStatus === 'uploading' ? 'uploading' : uploadStatus === 'success' ? 'success' : 'error'}
                fileName={currentFileName}
                error={errorMessage}
            />
        );
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold text-white mb-6">Add New Data Source</h1>

                {/* Tab Buttons */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant="ghost"
                        className={`h-10 px-4 ${activeTab === 'upload'
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-900/50 text-zinc-400 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('upload')}
                    >
                        Upload Documents
                    </Button>
                    <Button
                        variant="ghost"
                        className={`h-10 px-4 ${activeTab === 'connect'
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-900/50 text-zinc-400 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('connect')}
                    >
                        Connect Database
                    </Button>
                </div>

                <Card className="bg-zinc-900/50 border-0 p-6">
                    {activeTab === 'upload' ? (
                        <div>
                            <h2 className="text-lg font-medium text-white mb-2">Upload Regulatory Documents</h2>
                            <p className="text-zinc-400 text-sm mb-4">
                                Upload PDF, Word, or text files containing regulatory information
                            </p>

                            {/* Upload Area */}
                            <DropZone onFileSelect={handleFileSelect} />

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
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-medium text-white mb-2">Connect to Database</h2>
                            <p className="text-zinc-400 text-sm mb-6">
                                Connect to your existing document management system
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-zinc-400 mb-2">Connection Type</label>
                                    <Select value={connectionType} onValueChange={setConnectionType}>
                                        <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                                            <SelectValue placeholder="SharePoint" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="sharepoint">SharePoint</SelectItem>
                                            <SelectItem value="dropbox">Dropbox</SelectItem>
                                            <SelectItem value="gdrive">Google Drive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-2">Connection URL</label>
                                    <Input
                                        type="text"
                                        placeholder="https://"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        value={connectionUrl}
                                        onChange={(e) => setConnectionUrl(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-2">API Key</label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your API key"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                    />
                                </div>

                                <Button
                                    variant="outline"
                                    className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                                >
                                    Test Connection
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        className="bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-white text-black hover:bg-zinc-200"
                        onClick={handleCreateDataSource}
                        disabled={uploadStatus === 'uploading'}
                    >
                        {uploadStatus === 'uploading' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Create Data Source'
                        )}
                    </Button>
                </div>
            </div>
            {renderNotification()}
        </div>
    );
};

export default observer(AddDataSource);