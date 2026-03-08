import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Scale, TrendingUp, AlertCircle, CheckCircle, Clock, ChevronRight, BarChart3, PieChart, Activity, Gavel } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar, Legend
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

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
  {
    id: 5,
    name: "Reddy Enterprises vs. Tax Department",
    type: "Tax Appeal",
    court: "ITAT Mumbai",
    stage: "Final Arguments",
    progress: 85,
    nextDate: "Jan 8, 2026",
    status: "active",
    risk: "low",
  },
  {
    id: 6,
    name: "Gupta vs. Real Estate Corp",
    type: "Property Dispute",
    court: "High Court Delhi",
    stage: "Evidence",
    progress: 55,
    nextDate: "Jan 12, 2026",
    status: "active",
    risk: "medium",
  },
  {
    id: 7,
    name: "Tech Solutions Inc vs. Competitor Ltd",
    type: "IP Litigation",
    court: "IPAB Chennai",
    stage: "Cross Examination",
    progress: 60,
    nextDate: "Jan 15, 2026",
    status: "active",
    risk: "high",
  },
  {
    id: 8,
    name: "Mehta vs. State Insurance Co",
    type: "Insurance Claim",
    court: "Consumer Forum",
    stage: "Mediation",
    progress: 40,
    nextDate: "Jan 18, 2026",
    status: "active",
    risk: "low",
  },
];

// Chart data
const casesByMonth = [
  { month: "Aug", won: 4, ongoing: 8 },
  { month: "Sep", won: 3, ongoing: 10 },
  { month: "Oct", won: 5, ongoing: 12 },
  { month: "Nov", won: 2, ongoing: 15 },
  { month: "Dec", won: 4, ongoing: 18 },
  { month: "Jan", won: 0, ongoing: 24 },
];

const caseTypeDistribution = [
  { name: "Civil", value: 35, color: "hsl(43, 55%, 48%)" },
  { name: "Criminal", value: 25, color: "hsl(4, 74%, 52%)" },
  { name: "Corporate", value: 20, color: "hsl(215, 25%, 55%)" },
  { name: "Family", value: 12, color: "hsl(150, 50%, 45%)" },
  { name: "Others", value: 8, color: "hsl(280, 40%, 55%)" },
];

const courtDistribution = [
  { name: "High Court", cases: 12, fill: "hsl(43, 55%, 48%)" },
  { name: "District Court", cases: 8, fill: "hsl(215, 25%, 55%)" },
  { name: "Supreme Court", cases: 2, fill: "hsl(4, 74%, 52%)" },
  { name: "Tribunals", cases: 2, fill: "hsl(150, 50%, 45%)" },
];

const successRateData = [
  { name: "Success Rate", value: 85, fill: "hsl(43, 55%, 48%)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const CaseAnalysis = () => {
  const { t } = useLanguage();
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
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-primary/10 border-primary/20";
      case "low": return "bg-tech/10 border-tech/20";
      default: return "bg-muted/10 border-border";
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("Case Analysis")}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t("Track progress and insights for all your cases")}</p>
          </div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20"
            whileHover={{ scale: 1.02 }}
          >
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("Live Analytics")}</span>
          </motion.div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Cases Won", value: "18", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Total Clients", value: "8", icon: Scale, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Documents Filed", value: "14", icon: Gavel, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Years of Practice", value: "15", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="yugality-card-interactive p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{t(stat.label)}</p>
                  <motion.p 
                    className="text-2xl font-bold text-foreground mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases Trend Chart */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 yugality-card-interactive p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <BarChart3 className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t("Case Trends")}</h3>
                  <p className="text-xs text-muted-foreground">{t("Last 6 months performance")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tech" />
                  <span className="text-muted-foreground">{t("Won")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{t("Ongoing")}</span>
                </div>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={casesByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(150, 50%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(150, 50%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOngoing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(43, 55%, 48%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(43, 55%, 48%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 15%, 88%)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px -2px hsl(220 25% 20% / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ongoing" 
                    stroke="hsl(43, 55%, 48%)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorOngoing)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="won" 
                    stroke="hsl(150, 50%, 45%)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorWon)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Success Rate Radial */}
          <motion.div 
            variants={itemVariants}
            className="yugality-card-interactive p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-tech/10 flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5 text-tech" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Success Rate</h3>
                <p className="text-xs text-muted-foreground">Overall performance</p>
              </div>
            </div>
            
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  barSize={12} 
                  data={successRateData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: 'hsl(220, 14%, 94%)' }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <motion.span 
                  className="text-4xl font-bold text-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  78%
                </motion.span>
                <span className="text-xs text-muted-foreground">Win Rate</span>
              </div>
            </div>

            <div className="mt-4">
              <motion.div 
                className="p-4 rounded-lg bg-tech/10 text-center"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-2xl font-bold text-tech">18</p>
                <p className="text-xs text-muted-foreground">Cases Won</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case Type Distribution */}
          <motion.div variants={itemVariants} className="yugality-card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <PieChart className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Case Distribution</h3>
                <p className="text-xs text-muted-foreground">By case type</p>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={caseTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {caseTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 15%, 88%)',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {caseTypeDistribution.map((item) => (
                <motion.div 
                  key={item.name} 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Court Distribution Bar */}
          <motion.div variants={itemVariants} className="yugality-card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-tech/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Gavel className="w-5 h-5 text-tech" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Court Distribution</h3>
                <p className="text-xs text-muted-foreground">Cases by court level</p>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courtDistribution} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 12 }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 11 }}
                    width={90}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 15%, 88%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="cases" radius={[0, 6, 6, 0]}>
                    {courtDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Active Cases List */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Active Cases</h3>
            <motion.button 
              className="text-sm text-primary flex items-center gap-1"
              whileHover={{ x: 3 }}
            >
              View All <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              whileHover={{ x: 4, scale: 1.01 }}
              className="yugality-card-interactive p-6 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {caseItem.name}
                    </h4>
                    <motion.span 
                      className={`text-xs px-2.5 py-1 rounded-full border ${getRiskBg(caseItem.risk)} ${getRiskColor(caseItem.risk)}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      URGENT
                    </motion.span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{caseItem.type}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{caseItem.court}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-primary font-medium">Stage: {caseItem.stage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="min-w-[200px]">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{caseItem.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${caseItem.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          caseItem.progress >= 70 ? "bg-tech" :
                          caseItem.progress >= 40 ? "bg-primary" : "bg-tech"
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="text-right min-w-[80px]">
                    <p className="text-xs text-muted-foreground">Next Date</p>
                    <p className="text-sm font-medium text-foreground">{caseItem.nextDate}</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CaseAnalysis;