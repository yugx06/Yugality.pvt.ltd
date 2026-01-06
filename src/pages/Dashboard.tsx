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
import { TrendingUp, Users, FileText, Scale, ArrowUpRight, ArrowDownRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const stats = [
  { label: "Active Cases", value: "24", change: "+3", trend: "up", icon: Scale, color: "text-primary bg-primary/10" },
  { label: "Pending Hearings", value: "8", change: "2 today", trend: "neutral", icon: FileText, color: "text-tech bg-tech/10" },
  { label: "Clients", value: "42", change: "+5", trend: "up", icon: Users, color: "text-green-600 bg-green-500/10" },
  { label: "Revenue (MTD)", value: "₹12.4L", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-purple-600 bg-purple-500/10" },
];

const Dashboard = () => {
  return (
    <motion.div 
      className="space-y-6"
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
          <motion.h1 
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Welcome back, Advocate
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what's happening with your practice today
          </p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-sm text-muted-foreground">Saturday, January 4</p>
          <p className="text-2xl font-bold text-gradient-gold">2026</p>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="yugality-card-interactive p-4 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <motion.p 
                  className="text-2xl font-bold text-foreground mt-1"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3 text-green-500" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3 text-destructive" />}
                  <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-destructive" : "text-primary"}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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