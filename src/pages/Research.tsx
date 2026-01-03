import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BookOpen, Search, Bookmark, Clock, ExternalLink, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const savedResearch = [
  { id: 1, title: "Landmark Judgments on Property Rights", source: "Supreme Court of India", date: "Dec 28, 2025", category: "Property Law", saved: true },
  { id: 2, title: "Recent Amendments to IPC Sections 498A", source: "Law Commission Report", date: "Dec 25, 2025", category: "Criminal Law", saved: true },
  { id: 3, title: "SEBI Regulations 2024 - Key Changes", source: "SEBI Circular", date: "Dec 20, 2025", category: "Corporate Law", saved: true },
  { id: 4, title: "Arbitration Act Interpretations", source: "Delhi High Court", date: "Dec 18, 2025", category: "Arbitration", saved: false },
];

const recentSearches = [
  "Section 138 NI Act precedents",
  "Land acquisition compensation cases",
  "RERA builder liability",
  "Divorce alimony calculation",
];

const Research = () => {
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
            <h1 className="text-2xl font-bold text-foreground">Legal Research</h1>
            <p className="text-muted-foreground text-sm mt-1">Search case law, statutes, and legal resources</p>
          </div>
          <Button className="yugality-button-gold gap-2">
            <Plus className="w-4 h-4" /> New Research
          </Button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card-gold p-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search case law, judgments, statutes..."
              className="pl-12 h-14 text-lg bg-muted/30 border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-muted-foreground">Recent:</span>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-muted/30 text-muted-foreground 
                           hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {["Supreme Court", "High Courts", "Tribunals", "Statutes"].map((category, index) => (
            <button
              key={category}
              className="yugality-card p-4 text-center hover:border-primary/50 transition-colors"
            >
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">{category}</p>
            </button>
          ))}
        </motion.div>

        {/* Saved Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Saved Research</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedResearch.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="yugality-card p-5 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {item.category}
                      </span>
                      {item.saved && <Bookmark className="w-4 h-4 text-primary fill-primary" />}
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.source}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Research;
