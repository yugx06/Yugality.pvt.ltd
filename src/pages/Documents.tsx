import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FileText, Upload, Search, Filter, Grid, List, FileCheck, FileClock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const documents = [
  { id: 1, name: "Counter Affidavit - Patel Industries", case: "Patel Industries vs. SEBI", type: "Affidavit", status: "pending", date: "Jan 2, 2026", size: "2.4 MB" },
  { id: 2, name: "Evidence Bundle Vol. 1", case: "Singh vs. State of Maharashtra", type: "Evidence", status: "filed", date: "Jan 1, 2026", size: "15.8 MB" },
  { id: 3, name: "Legal Opinion - Property Rights", case: "Verma Property Dispute", type: "Opinion", status: "urgent", date: "Dec 30, 2025", size: "845 KB" },
  { id: 4, name: "Settlement Agreement Draft v3", case: "Kumar vs. Kumar", type: "Agreement", status: "filed", date: "Dec 28, 2025", size: "1.2 MB" },
  { id: 5, name: "Witness Statement - Sharma", case: "Sharma vs. National Bank", type: "Statement", status: "pending", date: "Dec 26, 2025", size: "520 KB" },
  { id: 6, name: "Court Order - Interim Relief", case: "Patel Industries vs. SEBI", type: "Order", status: "filed", date: "Dec 22, 2025", size: "340 KB" },
];

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "filed":
        return <span className="status-filed flex items-center gap-1"><FileCheck className="w-3 h-3" /> Filed</span>;
      case "pending":
        return <span className="status-pending flex items-center gap-1"><FileClock className="w-3 h-3" /> Pending</span>;
      case "urgent":
        return <span className="status-urgent flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Urgent</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage and organize your legal documents</p>
          </div>
          <Button className="yugality-button-gold gap-2">
            <Upload className="w-4 h-4" /> Upload Document
          </Button>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card p-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10 bg-muted/30 border-border/50" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-border/50 text-muted-foreground hover:text-foreground">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <div className="flex border border-border/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="border-2 border-dashed border-border/50 rounded-xl p-8 hover:border-primary/50 
                     hover:bg-primary/5 transition-all duration-200 cursor-pointer"
        >
          <div className="flex flex-col items-center text-center">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-foreground font-medium mb-1">Drop files here or click to upload</p>
            <p className="text-muted-foreground text-sm">Supports PDF, DOC, DOCX up to 50MB</p>
          </div>
        </motion.div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="yugality-card overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Document</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Case</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Type</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {documents.map((doc, index) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{doc.case}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{doc.case}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
