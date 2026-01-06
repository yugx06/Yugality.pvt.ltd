import { motion } from "framer-motion";
import { HearingsCard } from "./HearingsCard";
import { CasesCard } from "./CasesCard";
import { DeadlinesCard } from "./DeadlinesCard";
import { CalendarCard } from "./CalendarCard";
import { AIInsightsCard } from "./AIInsightsCard";
import { DocumentsCard } from "./DocumentsCard";
import { BillingCard } from "./BillingCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { TasksCard } from "./TasksCard";
import { ClientsCard } from "./ClientsCard";
import { TrendingUp, Users, FileText, Scale, ArrowUpRight, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const stats = [
  { label: "Active Cases", value: "24", change: "+3", trend: "up", icon: Scale, color: "text-amber-500 bg-amber-500/10" },
  { label: "Pending Hearings", value: "8", change: "2 today", trend: "neutral", icon: FileText, color: "text-orange-500 bg-orange-500/10" },
  { label: "Clients", value: "42", change: "+5", trend: "up", icon: Users, color: "text-yellow-600 bg-yellow-500/10" },
  { label: "Revenue (MTD)", value: "₹12.4L", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-amber-600 bg-amber-500/10" },
];

export const LawyerDashboard = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Advocate Portal</span>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'Advocate'}
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your practice today</p>
        </div>
        <motion.div className="text-right">
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {today.getFullYear()}
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-500">{stat.change}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
