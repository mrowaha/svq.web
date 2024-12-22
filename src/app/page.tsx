"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from "mobx-react-lite";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Users,
  Database,
  Activity,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';

function Home() {
  const router = useRouter();
  const store = useServiceStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await store.dataSourceService.listDocuments('standard');
      if (response.ok) {
        console.log('Documents response:', response.documents);
        setDocuments(response.documents);
        setFilteredDocs(response.documents);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = documents;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.originalFilename.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status/type filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => {
        if (doc.originalFilename) {
          const ext = doc.originalFilename.split('.').pop()?.toLowerCase();
          return ext === statusFilter;
        }
        return false;
      });
    }

    setFilteredDocs(filtered);
  }, [searchQuery, statusFilter, documents]);


  const stats = [
    {
      title: "Total Documents",
      value: documents.length.toString(),
      icon: FileText
    },
    {
      title: "Total Size",
      value: `${(documents.reduce((acc, doc) => acc + doc.size, 0) / (1024 * 1024)).toFixed(2)} MB`,
      icon: Database
    },
    {
      title: "Recent Uploads",
      value: documents.filter(doc => {
        const uploadDate = new Date(doc.lastModified);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }).length.toString(),
      subtext: "Last 7 days",
      icon: Activity
    },
    {
      title: "File Types",
      value: new Set(documents.map(doc => doc.contentType)).size.toString(),
      subtext: "Unique formats",
      icon: Users
    },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDocs(new Set(filteredDocs.map(doc => doc.name)));
    } else {
      setSelectedDocs(new Set());
    }
  };

  const handleSelectDoc = (docName: string) => {
    const newSelected = new Set(selectedDocs);
    if (selectedDocs.has(docName)) {
      newSelected.delete(docName);
    } else {
      newSelected.add(docName);
    }
    setSelectedDocs(newSelected);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>

          <div className="flex gap-1 bg-zinc-900/50 w-fit rounded-md p-1">
            <Button
              variant="ghost"
              className="text-sm px-3 py-1.5 h-auto text-white bg-zinc-800 rounded-sm"
            >
              Overview
            </Button>
            <Button
              variant="ghost"
              className="text-sm px-3 py-1.5 h-auto text-zinc-400 hover:text-white rounded-sm"
            >
              Analytics
            </Button>
            <Button
              variant="ghost"
              className="text-sm px-3 py-1.5 h-auto text-zinc-400 hover:text-white rounded-sm"
            >
              Reports
            </Button>
            <Button
              variant="ghost"
              className="text-sm px-3 py-1.5 h-auto text-zinc-400 hover:text-white rounded-sm"
            >
              Notifications
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-zinc-900/50 border-0 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-zinc-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{stat.value}</h3>
                  {stat.subtext && (
                    <p className="text-sm text-zinc-400 mt-1">{stat.subtext}</p>
                  )}
                </div>
                <stat.icon className="text-zinc-400" size={20} />
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex-1 max-w-lg">
            <Input
              placeholder="Search Documents..."
              className="bg-zinc-900/50 border-0 text-white placeholder:text-zinc-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-row space-x-3">
            <Button
              className="bg-white text-black hover:bg-zinc-200 gap-2"
              onClick={() => router.push('/data')}
            >
              <FileText className="h-4 w-4" />
              Add Document
            </Button>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-zinc-900/50 border-0 text-white">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="docx">DOCX</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden bg-zinc-900/50 mb-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableHead className="w-12 text-zinc-400 font-medium">
                    <input
                      type="checkbox"
                      className="rounded-sm bg-zinc-800 border-zinc-700"
                      checked={selectedDocs.size === filteredDocs.length && filteredDocs.length > 0}
                      onChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">Name</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Type</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Size</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Last Modified</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.name} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded-sm bg-zinc-800 border-zinc-700"
                        checked={selectedDocs.has(doc.name)}
                        onChange={() => handleSelectDoc(doc.name)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {doc.originalFilename}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {(() => {
                        if (doc.originalFilename) {
                          const ext = doc.originalFilename.split('.').pop()?.toLowerCase();
                          switch (ext) {
                            case 'pdf': return 'PDF';
                            case 'docx': return 'DOCX';
                            case 'txt': return 'TXT';
                            default: return ext ? ext.toUpperCase() : 'UNKNOWN';
                          }
                        }
                        return 'UNKNOWN';
                      })()}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {formatFileSize(doc.size)}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(doc.lastModified).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                        <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-zinc-400">
          <p>{selectedDocs.size} of {filteredDocs.length} row(s) selected.</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default observer(Home);