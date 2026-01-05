import { motion } from "framer-motion";
import { HearingsCard } from "@/components/dashboard/HearingsCard";
import { CasesCard } from "@/components/dashboard/CasesCard";
import { DeadlinesCard } from "@/components/dashboard/DeadlinesCard";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { DocumentsCard } from "@/components/dashboard/DocumentsCard";
import { BillingCard } from "@/components/dashboard/BillingCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { ClientsCard } from "@/components/dashboard/ClientsCard";
import { TrendingUp, Users, FileText, Scale, ArrowUpRight, ArrowDownRight, Crown, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const stats = [
  { label: "Active Cases", value: "24", change: "+3", trend: "up", icon: Scale, color: "from-primary/20 to-primary/5", iconColor: "text-primary" },
  { label: "Pending Hearings", value: "8", change: "2 today", trend: "neutral", icon: FileText, color: "from-tech/20 to-tech/5", iconColor: "text-tech" },
  { label: "Clients", value: "42", change: "+5", trend: "up", icon: Users, color: "from-green-500/20 to-green-500/5", iconColor: "text-green-600 dark:text-green-400" },
  { label: "Revenue (MTD)", value: "₹12.4L", change: "+12.5%", trend: "up", icon: TrendingUp, color: "from-royal/20 to-royal/5", iconColor: "text-royal" },
];

const Dashboard = () => {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            >
              <Crown className="w-6 h-6 text-primary crown-icon" />
            </motion.div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-royal font-bold text-gradient-gold tracking-wide">
                Welcome back, Advocate
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                Here's what's happening with your practice today
                <Sparkles className="w-4 h-4 text-primary/50" />
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="text-right p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Today</p>
          <p className="text-lg font-semibold text-foreground">Saturday, January 4</p>
          <p className="text-2xl font-royal font-bold text-gradient-gold">2026</p>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="yugality-card-interactive p-5 cursor-pointer group relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                 style={{ background: "linear-gradient(135deg, transparent 40%, hsl(var(--primary) / 0.1) 50%, transparent 60%)" }} />
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</p>
                <motion.p 
                  className="text-3xl font-royal font-bold text-foreground mt-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center gap-1.5 mt-2">
                  {stat.trend === "up" && <ArrowUpRight className="w-4 h-4 text-green-500" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-4 h-4 text-destructive" />}
                  <p className={`text-xs font-semibold ${stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-destructive" : "text-primary"}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg`}
              >
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Royal Divider */}
      <div className="royal-divider" />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <HearingsCard />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CasesCard />
            <DeadlinesCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocumentsCard />
            <TasksCard />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CalendarCard />
          <AIInsightsCard />
          <RecentActivityCard />
          <ClientsCard />
          <BillingCard />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
