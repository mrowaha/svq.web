"use client";
import React, { useEffect, useState } from 'react';
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
  Loader2,
  Trash2,
  Download,
  Share2,
  ChevronDown
} from 'lucide-react';
import { useServiceStore } from '@/lib/infra/mobx/root-store.provider';
import { Document } from '@/lib/frontend/api/datasource/datasource.api';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const store = useServiceStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await store.dataSourceService.listDocuments('standard');
      if (response.ok) {
        setDocuments(response.documents);
        setFilteredDocs(response.documents);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics for the dashboard
  const stats = [
    {
      title: "Total Documents",
      value: documents.length.toString(),
      icon: FileText,
      change: "+12% from last month",
      trend: "up"
    },
    {
      title: "Storage Used",
      value: `${(documents.reduce((acc, doc) => acc + doc.size, 0) / (1024 * 1024)).toFixed(2)} MB`,
      icon: Database,
      change: "+2.3% from last week",
      trend: "up"
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
      icon: Activity,
      change: "-5% from last week",
      trend: "down"
    },
    {
      title: "Active Users",
      value: "12",
      icon: Users,
      change: "Same as last week",
      trend: "neutral"
    },
  ];

  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortDocuments = (docs: Document[]) => {
    return [...docs].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.originalFilename.localeCompare(b.originalFilename)
          : b.originalFilename.localeCompare(a.originalFilename);
      }
      if (sortConfig.key === 'size') {
        return sortConfig.direction === 'asc'
          ? a.size - b.size
          : b.size - a.size;
      }
      if (sortConfig.key === 'lastModified') {
        return sortConfig.direction === 'asc'
          ? new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
          : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
      return 0;
    });
  };

  useEffect(() => {
    let filtered = documents;

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.originalFilename.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const ext = doc.originalFilename.split('.').pop()?.toLowerCase();
        return ext === statusFilter;
      });
    }

    filtered = sortDocuments(filtered);
    setFilteredDocs(filtered);
  }, [searchQuery, statusFilter, documents, sortConfig]);

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

  const handleDeleteSelected = () => {
    // Implement delete functionality
    console.log('Deleting:', Array.from(selectedDocs));
  };

  const handleDownloadSelected = () => {
    // Implement download functionality
    console.log('Downloading:', Array.from(selectedDocs));
  };

  const handleShareSelected = () => {
    // Implement share functionality
    console.log('Sharing:', Array.from(selectedDocs));
  };

  // Pagination
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-black">
      <main className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-zinc-900/50 border-0 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-zinc-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{stat.value}</h3>
                  <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-500' :
                      stat.trend === 'down' ? 'text-red-500' :
                        'text-zinc-400'
                    }`}>
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="text-zinc-400" size={20} />
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex-1 max-w-lg">
            <Input
              placeholder="Search Documents..."
              className="bg-zinc-900/50 border-0 text-white placeholder:text-zinc-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
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

        {/* Bulk Actions Bar */}
        {selectedDocs.size > 0 && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-zinc-800/50 rounded-lg">
            <span className="text-sm text-zinc-400 ml-2">
              {selectedDocs.size} item{selectedDocs.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex-1"></div>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
              onClick={handleDownloadSelected}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white"
              onClick={handleShareSelected}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        )}

        {/* Documents Table */}
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
                  <TableHead
                    className="text-zinc-400 font-medium cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <ChevronDown className={`h-4 w-4 transition-transform ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                    </div>
                  </TableHead>
                  <TableHead className="text-zinc-400 font-medium">Type</TableHead>
                  <TableHead
                    className="text-zinc-400 font-medium cursor-pointer"
                    onClick={() => handleSort('size')}
                  >
                    <div className="flex items-center gap-2">
                      Size
                      <ChevronDown className={`h-4 w-4 transition-transform ${sortConfig.key === 'size' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-zinc-400 font-medium cursor-pointer"
                    onClick={() => handleSort('lastModified')}
                  >
                    <div className="flex items-center gap-2">
                      Last Modified
                      <ChevronDown className={`h-4 w-4 transition-transform ${sortConfig.key === 'lastModified' && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDocs.map((doc) => (
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
                        const ext = doc.originalFilename.split('.').pop()?.toLowerCase();
                        switch (ext) {
                          case 'pdf': return 'PDF';
                          case 'docx': return 'DOCX';
                          case 'txt': return 'TXT';
                          default: return ext ? ext.toUpperCase() : 'UNKNOWN';
                        }
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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center text-sm text-zinc-400">
          <p>
            {selectedDocs.size} of {filteredDocs.length} row(s) selected.
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDocs.length)} of {filteredDocs.length} documents
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant="outline"
                  size="sm"
                  className={`w-8 ${currentPage === pageNum
                      ? 'bg-zinc-800 text-white'
                      : 'bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800'
                    }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900/50 border-0 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Document Types Distribution</h3>
            <div className="space-y-4">
              {['pdf', 'docx', 'txt'].map(type => {
                const count = filteredDocs.filter(doc =>
                  doc.originalFilename.toLowerCase().endsWith(type)
                ).length;
                const percentage = (count / filteredDocs.length) * 100 || 0;

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">{type.toUpperCase()}</span>
                      <span className="text-zinc-400">{count} files</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-zinc-900/50 border-0 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {filteredDocs.slice(0, 5).map((doc) => (
                <div key={doc.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-zinc-400" />
                    <div>
                      <p className="text-sm text-white">{doc.originalFilename}</p>
                      <p className="text-xs text-zinc-400">
                        Added {new Date(doc.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-white"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default observer(Dashboard);