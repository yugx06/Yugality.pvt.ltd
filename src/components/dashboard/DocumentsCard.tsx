import { motion } from "framer-motion";
import { FileText, Upload, ChevronRight, FileCheck, FileClock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filed": return <FileCheck className="w-4 h-4 text-primary" />;
      case "pending": return <FileClock className="w-4 h-4 text-tech" />;
      default: return <FileText className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <motion.div 
      className="yugality-card-interactive p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <FileText className="w-5 h-5 text-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground">{t("Recent Documents")}</h3>
        </div>
        <motion.button 
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          whileHover={{ x: 3 }}
        >
          {t("View all")} <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Upload Zone */}
      <motion.div 
        className="mb-4 p-4 border-2 border-dashed border-border rounded-lg 
                   hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 
                   cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Upload className="w-5 h-5" />
          </motion.div>
          <span className="text-sm">{t("Drop files here or click to upload")}</span>
        </div>
      </motion.div>

      {/* Document List */}
      <div className="space-y-2">
        {recentDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.08 }}
            whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.5)" }}
            className="flex items-center gap-3 p-3 rounded-lg
                       transition-all duration-200 cursor-pointer group"
          >
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
              {getStatusIcon(doc.status)}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {doc.name}
              </p>
              <p className="text-xs text-muted-foreground">{doc.type} • {doc.date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${doc.status === "filed" ? "status-filed" : 
                doc.status === "pending" ? "status-pending" : "status-urgent"}`}>
              {t(doc.status)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};