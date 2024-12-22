"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileText, Archive, Trash2, Search, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const DocumentViewer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [documents] = useState([
        { id: 1, name: 'Climate_Change.pdf', type: 'pdf' },
        { id: 2, name: 'Privacy_Policy_Template.pdf', type: 'pdf' },
        { id: 3, name: 'Climate_Change.pdf', type: 'pdf' },
        { id: 4, name: 'Climate_Change.pdf', type: 'pdf' },
        { id: 5, name: 'Climate_Change.pdf', type: 'pdf' },
    ]);

    return (
        <div className="flex h-screen bg-zinc-950">
            {/* Left Sidebar */}
            <div className="w-72 bg-black border-r border-zinc-800 flex flex-col">
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="search in chat"
                            className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center px-4 py-2 hover:bg-zinc-900 cursor-pointer"
                        >
                            <FileText className="h-4 w-4 text-zinc-400 mr-3" />
                            <span className="text-zinc-300 text-sm">{doc.name}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-zinc-800">
                    <div className="flex items-center px-4 py-2 hover:bg-zinc-900 cursor-pointer">
                        <Trash2 className="h-4 w-4 text-zinc-400 mr-3" />
                        <span className="text-zinc-300 text-sm">Trash</span>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-zinc-900 cursor-pointer">
                        <Archive className="h-4 w-4 text-zinc-400 mr-3" />
                        <span className="text-zinc-300 text-sm">Archive</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
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
                        <span className="text-zinc-300 text-sm">Ref: {currentPage}/{totalPages}</span>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>

                {/* Document Content */}
                <div className="flex-1 overflow-y-auto bg-zinc-900 p-6">
                    <Card className="max-w-4xl mx-auto bg-white p-8">
                        <div className="space-y-4">
                            {/* Sample Document Content */}
                            <h2 className="text-xl font-semibold">Climate Change Mitigation Strategy</h2>
                            <p className="text-zinc-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis nisl
                                nec tortor malesuada, et aliquam neque fermentum.
                            </p>
                            <div className="space-y-2">
                                <h3 className="font-medium">Key Points:</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Confidentiality Period: Lorem ipsum dolor sit amet</li>
                                    <li>Permissible Disclosures: Ut enim ad minima veniam</li>
                                    <li>Penalties for Breach: Duis aute irure dolor</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom Bar */}
                <div className="h-14 border-t border-zinc-800 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                            Page 5
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                            Page 13
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                            Page 21
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-400 text-sm">Version: 2/2</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;