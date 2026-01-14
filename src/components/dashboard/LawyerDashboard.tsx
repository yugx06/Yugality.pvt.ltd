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
import { TrendingUp, Users, FileText, Scale, ArrowUpRight, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const { t } = useLanguage();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Advocate Name",
    specialization: "Corporate Law",
    barCouncilId: "BAR/2015/12345",
    experience: "12",
  });
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleProfileUpdate = () => {
    // Save profile data (implement API call here)
    setShowProfileEdit(false);
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">{t("Advocate Portal")}</span>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-foreground">
            {t("Welcome back")},
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">{t("Here's what's happening with your cases today")}</p>
        </div>
        <motion.div className="flex flex-col items-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowProfileEdit(!showProfileEdit)}>
            <UserCircle className="w-4 h-4 mr-2" />
            {t("My Profile")}
          </Button>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {today.getFullYear()}
          </p>
        </motion.div>
      </motion.div>

      {/* Quick Profile Edit */}
      {showProfileEdit && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCircle className="w-5 h-5 text-amber-500" />
                {t("Quick Edit Profile")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lawyer-name">{t("Name")}</Label>
                  <Input
                    id="lawyer-name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lawyer-spec">{t("Specialization")}</Label>
                  <Input
                    id="lawyer-spec"
                    value={profileData.specialization}
                    onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lawyer-bar">{t("Bar Council ID")}</Label>
                  <Input
                    id="lawyer-bar"
                    value={profileData.barCouncilId}
                    onChange={(e) => setProfileData({ ...profileData, barCouncilId: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lawyer-exp">{t("Experience")} ({t("years")})</Label>
                  <Input
                    id="lawyer-exp"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleProfileUpdate} className="bg-amber-500 hover:bg-amber-600">{t("Update Profile")}</Button>
                <Button variant="outline" onClick={() => setShowProfileEdit(false)}>{t("Cancel")}</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t(stat.label)}</p>
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
