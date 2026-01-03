import { motion } from "framer-motion";
import { HearingsCard } from "@/components/dashboard/HearingsCard";
import { CasesCard } from "@/components/dashboard/CasesCard";
import { DeadlinesCard } from "@/components/dashboard/DeadlinesCard";
import { CalendarCard } from "@/components/dashboard/CalendarCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { DocumentsCard } from "@/components/dashboard/DocumentsCard";
import { BillingCard } from "@/components/dashboard/BillingCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Advocate</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what's happening with your practice today
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Friday, January 3</p>
          <p className="text-2xl font-bold text-gradient-gold">2026</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Active Cases", value: "24", change: "+3 this week" },
          { label: "Pending Hearings", value: "8", change: "2 today" },
          { label: "Documents", value: "156", change: "12 pending review" },
          { label: "Revenue (MTD)", value: "₹12.4L", change: "+12.5% vs last month" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="yugality-card p-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            <p className="text-xs text-primary mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HearingsCard />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CasesCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <DeadlinesCard />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DocumentsCard />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <CalendarCard />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <AIInsightsCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <BillingCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
