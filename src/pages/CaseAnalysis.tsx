import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Scale, TrendingUp, AlertCircle, CheckCircle, Clock, ChevronRight } from "lucide-react";

const cases = [
  {
    id: 1,
    name: "Singh vs. State of Maharashtra",
    type: "Criminal Appeal",
    court: "Bombay High Court",
    stage: "Arguments",
    progress: 75,
    nextDate: "Jan 3, 2026",
    status: "active",
    risk: "medium",
  },
  {
    id: 2,
    name: "Patel Industries vs. SEBI",
    type: "Securities Appeal",
    court: "SAT",
    stage: "Evidence",
    progress: 45,
    nextDate: "Jan 4, 2026",
    status: "active",
    risk: "high",
  },
  {
    id: 3,
    name: "Kumar vs. Kumar",
    type: "Family Dispute",
    court: "Family Court Delhi",
    stage: "Mediation",
    progress: 30,
    nextDate: "Jan 5, 2026",
    status: "active",
    risk: "low",
  },
  {
    id: 4,
    name: "Sharma vs. National Bank",
    type: "Civil Suit",
    court: "District Court",
    stage: "Pre-trial",
    progress: 15,
    nextDate: "Jan 10, 2026",
    status: "active",
    risk: "medium",
  },
];

const CaseAnalysis = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive";
      case "medium": return "text-primary";
      case "low": return "text-tech";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case "high": return "bg-destructive/10";
      case "medium": return "bg-primary/10";
      case "low": return "bg-tech/10";
      default: return "bg-muted/10";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Case Analysis</h1>
          <p className="text-muted-foreground text-sm mt-1">Track progress and insights for all your cases</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Cases", value: "24", icon: Scale, color: "text-primary" },
            { label: "Won This Year", value: "18", icon: CheckCircle, color: "text-tech" },
            { label: "High Risk", value: "3", icon: AlertCircle, color: "text-destructive" },
            { label: "Pending Verdict", value: "5", icon: Clock, color: "text-secondary" },
          ].map((stat, index) => (
            <div key={stat.label} className="yugality-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cases Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-foreground">Active Cases</h3>
          
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="yugality-card p-6 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {caseItem.name}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskBg(caseItem.risk)} ${getRiskColor(caseItem.risk)}`}>
                      {caseItem.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{caseItem.type}</span>
                    <span>•</span>
                    <span>{caseItem.court}</span>
                    <span>•</span>
                    <span className="text-primary">Stage: {caseItem.stage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="min-w-[200px]">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{caseItem.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${caseItem.progress}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className={`h-full rounded-full ${
                          caseItem.progress >= 70 ? "bg-tech" :
                          caseItem.progress >= 40 ? "bg-primary" : "bg-secondary"
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Next Date</p>
                    <p className="text-sm font-medium text-foreground">{caseItem.nextDate}</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CaseAnalysis;
