"use client";
import React from 'react';
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
  UserCircle
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';

function Home() {
  const stats = [
    { title: "Total Documents", value: "231", icon: FileText },
    { title: "Queries Today", value: "+2350", subtext: "+180.1% from last month", icon: Users },
    { title: "Vector Embeddings", value: "+12,234", subtext: "+19% from last month", icon: Database },
    { title: "Active Sources", value: "+573", subtext: "+201 since last hour", icon: Activity },
  ];

  const documents = [
    { status: "Success", name: "FAA Guidelines", pages: "316" },
    { status: "Success", name: "DOT Standards", pages: "242" },
    { status: "Processing", name: "GSA Guidelines", pages: "837" },
    { status: "Success", name: "ICLG Report", pages: "874" },
    { status: "Failed", name: "TSA Updates", pages: "721" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-4">Dashboard</h1>

          {/* Navigation */}
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

        {/* Stats Grid */}
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

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search Documents..."
              className="bg-zinc-900/50 border-0 text-white placeholder:text-zinc-400"
            />
          </div>
          <Select>
            <SelectTrigger className="w-24 bg-zinc-900/50 border-0 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Documents Table */}
        <div className="rounded-lg overflow-hidden bg-zinc-900/50 mb-4">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="w-12 text-zinc-400 font-medium">
                  <input type="checkbox" className="rounded-sm bg-zinc-800 border-zinc-700" />
                </TableHead>
                <TableHead className="text-zinc-400 font-medium">Status</TableHead>
                <TableHead className="text-zinc-400 font-medium">Name</TableHead>
                <TableHead className="text-zinc-400 font-medium">Pages</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc, index) => (
                <TableRow key={index} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell>
                    <input type="checkbox" className="rounded-sm bg-zinc-800 border-zinc-700" />
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${doc.status === 'Success' ? 'bg-green-950/50 text-green-400' :
                        doc.status === 'Processing' ? 'bg-blue-950/50 text-blue-400' :
                          'bg-red-950/50 text-red-400'}`}>
                      {doc.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-white">{doc.name}</TableCell>
                  <TableCell className="text-zinc-400">{doc.pages}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                      <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-zinc-400">
          <p>0 of 5 row(s) selected.</p>
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