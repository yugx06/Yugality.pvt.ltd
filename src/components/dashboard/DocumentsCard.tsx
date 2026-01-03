import { motion } from "framer-motion";
import { FileText, Upload, ChevronRight, FileCheck, FileClock } from "lucide-react";

const recentDocs = [
  {
    id: 1,
    name: "Counter Affidavit - Patel Case",
    type: "Affidavit",
    status: "pending",
    date: "Jan 2, 2026",
  },
  {
    id: 2,
    name: "Evidence Bundle - Singh Matter",
    type: "Evidence",
    status: "filed",
    date: "Jan 1, 2026",
  },
  {
    id: 3,
    name: "Legal Opinion - Property Dispute",
    type: "Opinion",
    status: "urgent",
    date: "Dec 30, 2025",
  },
  {
    id: 4,
    name: "Settlement Agreement Draft",
    type: "Agreement",
    status: "filed",
    date: "Dec 28, 2025",
  },
];

export const DocumentsCard = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filed": return <FileCheck className="w-4 h-4 text-primary" />;
      case "pending": return <FileClock className="w-4 h-4 text-secondary" />;
      default: return <FileText className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <div className="yugality-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Recent Documents</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Upload Zone */}
      <div className="mb-4 p-4 border-2 border-dashed border-border/50 rounded-lg 
                      hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 
                      cursor-pointer group">
        <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
          <Upload className="w-5 h-5" />
          <span className="text-sm">Drop files here or click to upload</span>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {recentDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 
                       transition-colors cursor-pointer group"
          >
            {getStatusIcon(doc.status)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {doc.name}
              </p>
              <p className="text-xs text-muted-foreground">{doc.type} • {doc.date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${doc.status === "filed" ? "status-filed" : 
                doc.status === "pending" ? "status-pending" : "status-urgent"}`}>
              {doc.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
