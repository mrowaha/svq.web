"use client";
import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import BatchFileUpload from '@/components/document/BatchFileUpload';

const AddDataSource = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [connectionType, setConnectionType] = useState('');
    const [connectionUrl, setConnectionUrl] = useState('');
    const [apiKey, setApiKey] = useState('');

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

                            <BatchFileUpload />
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
            </div>
        </div>
    );
};

export default observer(AddDataSource);