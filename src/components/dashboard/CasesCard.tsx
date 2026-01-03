import { motion } from "framer-motion";
import { Briefcase, TrendingUp, TrendingDown, Minus } from "lucide-react";

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
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-primary" />;
      case "down": return <TrendingDown className="w-3 h-3 text-destructive" />;
      default: return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="yugality-card-gold p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Active Cases</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {cases.map((item, index) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 rounded-lg bg-muted/30"
          >
            <p className="text-2xl font-bold text-foreground">{item.count}</p>
            <p className="text-xs text-muted-foreground mb-1">{item.status}</p>
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
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent Activity</p>
        {recentCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center justify-between py-2 border-b border-border/30 last:border-0
                       hover:bg-muted/20 -mx-2 px-2 rounded transition-colors cursor-pointer"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{caseItem.name}</p>
              <p className="text-xs text-muted-foreground">{caseItem.type}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-0.5 rounded-full
                ${caseItem.status === "Active" ? "status-filed" : "status-pending"}`}>
                {caseItem.status}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{caseItem.lastUpdate}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
