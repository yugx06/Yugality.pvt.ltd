import { motion } from "framer-motion";
import { Briefcase, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const cases = [
  { status: "Active", count: 24, trend: "up", change: "+3" },
  { status: "Pending", count: 12, trend: "down", change: "-2" },
  { status: "Resolved", count: 156, trend: "up", change: "+8" },
];

const recentCases = [
  { name: "Sharma vs. National Bank", type: "Civil", status: "Active", lastUpdate: "2h ago" },
  { name: "State vs. Mehta", type: "Criminal", status: "Pending", lastUpdate: "5h ago" },
  { name: "Verma Property Dispute", type: "Property", status: "Active", lastUpdate: "1d ago" },
];

export const CasesCard = () => {
  const { t } = useLanguage();
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-primary" />;
      case "down": return <TrendingDown className="w-3 h-3 text-destructive" />;
      default: return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <motion.div 
      className="yugality-card-gold p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Briefcase className="w-5 h-5 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground">{t("Active Cases")}</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {cases.map((item, index) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="text-center p-3 rounded-lg bg-muted/40 border border-border/50 hover:border-primary/30 
                       hover:shadow-[var(--shadow-card)] transition-all duration-200 cursor-pointer"
          >
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
            >
              {item.count}
            </motion.p>
            <p className="text-xs text-muted-foreground mb-1">{t(item.status)}</p>
            <div className="flex items-center justify-center gap-1 text-xs">
              {getTrendIcon(item.trend)}
              <span className={item.trend === "up" ? "text-primary" : "text-destructive"}>
                {item.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Cases */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("Recent Activity")}</p>
        {recentCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.08 }}
            whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.4)" }}
            className="flex items-center justify-between py-3 px-3 -mx-3 border-b border-border/30 last:border-0
                       rounded-lg transition-all duration-200 cursor-pointer group"
          >
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{caseItem.name}</p>
              <p className="text-xs text-muted-foreground">{caseItem.type}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-0.5 rounded-full
                ${caseItem.status === "Active" ? "status-filed" : "status-pending"}`}>
                {t(caseItem.status)}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{caseItem.lastUpdate}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};