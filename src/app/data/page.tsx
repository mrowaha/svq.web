"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const AddDataSource = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [connectionType, setConnectionType] = useState('');
    const [connectionUrl, setConnectionUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [processingOptions, setProcessingOptions] = useState({
        enableOcr: false,
        extractTables: false
    });

    const handleProcessingOptionChange = (option) => {
        setProcessingOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleCreateDataSource = () => {
        // Handle data source creation
        console.log('Creating data source...');
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
                            <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 mb-6">
                                <div className="text-center">
                                    <p className="text-zinc-400 mb-2">Drag and drop your files here, or click to browse</p>
                                    <p className="text-sm text-zinc-500">Supports PDF, DOCX, TXT (up to 100MB each)</p>
                                </div>
                            </div>

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
                    >
                        Create Data Source
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddDataSource;