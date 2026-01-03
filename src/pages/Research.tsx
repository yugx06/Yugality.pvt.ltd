import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BookOpen, Search, Bookmark, Clock, ExternalLink, Plus, Scale, FileText, Gavel, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const savedResearch = [
  { id: 1, title: "Landmark Judgments on Property Rights", source: "Supreme Court of India", date: "Dec 28, 2025", category: "Property Law", saved: true, reads: 245 },
  { id: 2, title: "Recent Amendments to IPC Sections 498A", source: "Law Commission Report", date: "Dec 25, 2025", category: "Criminal Law", saved: true, reads: 189 },
  { id: 3, title: "SEBI Regulations 2024 - Key Changes", source: "SEBI Circular", date: "Dec 20, 2025", category: "Corporate Law", saved: true, reads: 312 },
  { id: 4, title: "Arbitration Act Interpretations", source: "Delhi High Court", date: "Dec 18, 2025", category: "Arbitration", saved: false, reads: 156 },
];

const recentSearches = [
  "Section 138 NI Act precedents",
  "Land acquisition compensation cases",
  "RERA builder liability",
  "Divorce alimony calculation",
];

const quickCategories = [
  { name: "Supreme Court", icon: Scale, count: 1240, color: "bg-primary/10 text-primary" },
  { name: "High Courts", icon: Gavel, count: 3560, color: "bg-tech/10 text-tech" },
  { name: "Tribunals", icon: FileText, count: 890, color: "bg-destructive/10 text-destructive" },
  { name: "Statutes", icon: BookOpen, count: 450, color: "bg-tech/10 text-tech" },
];

const trendingTopics = [
  { topic: "PMLA Act Amendments", searches: "+45%" },
  { topic: "Digital Personal Data Protection", searches: "+38%" },
  { topic: "Arbitration Reforms", searches: "+27%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const Research = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Legal Research</h1>
            <p className="text-muted-foreground text-sm mt-1">Search case law, statutes, and legal resources</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="yugality-button-gold gap-2">
              <Plus className="w-4 h-4" /> New Research
            </Button>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="yugality-card-gold p-6 relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tech/5 pointer-events-none" />
          
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search case law, judgments, statutes..."
                className="pl-12 h-14 text-lg bg-card border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-md"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">AI Search</span>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Recent:</span>
              {recentSearches.map((search, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground 
                             hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Access & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access Categories */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="yugality-card-interactive p-5 text-center group"
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-xl ${category.color} mx-auto mb-3 flex items-center justify-center`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <category.icon className="w-6 h-6" />
                  </motion.div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{category.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{category.count.toLocaleString()} cases</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div variants={itemVariants} className="yugality-card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">Trending Topics</h3>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {trendingTopics.map((item, index) => (
                <motion.div 
                  key={item.topic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between py-2 cursor-pointer group"
                >
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item.topic}</span>
                  <span className="text-xs text-tech font-medium">{item.searches}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Saved Research */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Saved Research</h3>
            <motion.button 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              whileHover={{ x: 3 }}
            >
              View all
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedResearch.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="yugality-card-interactive p-5 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span 
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.category}
                      </motion.span>
                      {item.saved && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Bookmark className="w-4 h-4 text-primary fill-primary" />
                        </motion.div>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.source}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {item.reads} reads
                      </span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Research;