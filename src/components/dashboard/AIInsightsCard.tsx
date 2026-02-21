import { motion } from "framer-motion";
import { Bot, Sparkles, Search, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const recentSearches = [
  { id: 1, query: "BNS Sections", time: "1 hour ago" },
  { id: 2, query: "Civil Case Laws", time: "3 hours ago" },
  { id: 3, query: "UN and its bodies", time: "Yesterday" },
  { id: 4, query: "Procedural Law", time: "2 days ago" },
];

const previousSearches = [
  { id: 1, query: "Property dispute precedents", time: "2 hours ago" },
  { id: 2, query: "Section 138 NI Act case laws", time: "5 hours ago" },
  { id: 3, query: "Divorce settlement guidelines", time: "1 day ago" },
  { id: 4, query: "Corporate insolvency procedure", time: "2 days ago" },
];

export const AIInsightsCard = () => {
  const { t } = useLanguage();
  return (
    <motion.div 
      className="yugality-card-interactive p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Subtle tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech/5 via-transparent to-primary/3 pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="w-10 h-10 rounded-lg bg-tech/10 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bot className="w-5 h-5 text-tech" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t("AI Insights")}</h3>
            <p className="text-xs text-tech flex items-center gap-1">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3" />
              </motion.span>
              {t("Powered by Yugality AI")}
            </p>
          </div>
        </div>

        {/* Recent Searches Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-tech" />
            <h4 className="text-sm font-semibold text-foreground">{t("Recent Searches")}</h4>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <motion.div
                key={search.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.07 }}
                whileHover={{ x: 4 }}
                className="p-3 rounded-lg cursor-pointer transition-all duration-200 
                           flex items-center justify-between group
                           border border-transparent hover:border-tech/20 hover:bg-muted/30"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-foreground truncate group-hover:text-tech transition-colors">
                    {search.query}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">{search.time}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-tech transition-all duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Previous Search Section */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-tech" />
            <h4 className="text-sm font-semibold text-foreground">{t("Previous Search")}</h4>
          </div>
          <div className="space-y-1">
            {previousSearches.map((search, index) => (
              <motion.div
                key={search.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.07 }}
                whileHover={{ x: 4, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                className="p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-foreground truncate group-hover:text-tech transition-colors">
                    {search.query}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{search.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button 
          className="mt-4 w-full py-3 rounded-lg bg-tech/10 text-tech text-sm font-medium
                     hover:bg-tech/20 transition-all duration-200 flex items-center justify-center gap-2
                     border border-tech/20 hover:border-tech/40"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Bot className="w-4 h-4" />
          {t("Open AI Assistant")}
        </motion.button>
      </div>
    </motion.div>
  );
};