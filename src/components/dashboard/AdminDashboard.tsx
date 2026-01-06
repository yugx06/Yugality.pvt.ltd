import { motion } from "framer-motion";
import { 
  Users, Shield, Activity, Settings, Database, Server,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, FileText,
  UserPlus, UserMinus, Eye, BarChart3, Cpu, HardDrive
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const systemStats = [
  { label: "Total Users", value: "234", change: "+12 this week", icon: Users, color: "text-purple-500 bg-purple-500/10" },
  { label: "Active Sessions", value: "89", change: "Live now", icon: Activity, color: "text-violet-500 bg-violet-500/10" },
  { label: "System Health", value: "99.9%", change: "All systems go", icon: Shield, color: "text-green-500 bg-green-500/10" },
  { label: "Storage Used", value: "67%", change: "340 GB / 500 GB", icon: Database, color: "text-indigo-500 bg-indigo-500/10" },
];

const recentUsers = [
  { name: "Adv. Meera Patel", email: "meera@law.com", role: "lawyer", status: "active", joined: "2 hours ago" },
  { name: "Rahul Verma", email: "rahul@client.com", role: "client", status: "active", joined: "5 hours ago" },
  { name: "Adv. Suresh Kumar", email: "suresh@law.com", role: "lawyer", status: "pending", joined: "1 day ago" },
  { name: "Anita Sharma", email: "anita@client.com", role: "client", status: "active", joined: "2 days ago" },
];

const securityLogs = [
  { action: "Failed login attempt", user: "unknown@test.com", time: "10 min ago", severity: "warning" },
  { action: "Password changed", user: "adv.rajesh@law.com", time: "1 hour ago", severity: "info" },
  { action: "New device login", user: "priya@client.com", time: "2 hours ago", severity: "info" },
  { action: "Permission updated", user: "admin@system.com", time: "3 hours ago", severity: "info" },
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-500">Admin Console</span>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-foreground">
            System Overview
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor and manage your legal practice platform</p>
        </div>
        <motion.div className="text-right">
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {today.getFullYear()}
          </p>
        </motion.div>
      </motion.div>

      {/* System Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-4 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Management */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  User Management
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-4 h-4 mr-1" /> Add User
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map((u, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                          ${u.role === 'lawyer' ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'}`}
                        >
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="capitalize">
                          {u.role}
                        </Badge>
                        <Badge variant={u.status === 'active' ? 'default' : 'secondary'}
                               className={u.status === 'active' ? 'bg-green-500' : ''}>
                          {u.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{u.joined}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analytics Overview */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-500" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Cases Created", value: "156", trend: "+12%" },
                    { label: "Documents Uploaded", value: "1.2K", trend: "+8%" },
                    { label: "Hearings Scheduled", value: "89", trend: "+15%" },
                    { label: "Revenue Generated", value: "₹45L", trend: "+22%" },
                  ].map((metric, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-muted/30 border border-border">
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                      <p className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {metric.trend}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Resources */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-500" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "CPU Usage", value: 45, icon: Cpu },
                  { label: "Memory", value: 62, icon: Activity },
                  { label: "Storage", value: 67, icon: HardDrive },
                ].map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <resource.icon className="w-4 h-4" /> {resource.label}
                      </span>
                      <span className="font-medium text-foreground">{resource.value}%</span>
                    </div>
                    <Progress value={resource.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Logs */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Security Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                      ${log.severity === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}
                    >
                      {log.severity === 'warning' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{log.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="border-border bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
              <CardHeader>
                <CardTitle className="text-base">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "System Settings", icon: Settings },
                  { label: "Backup Database", icon: Database },
                  { label: "View Reports", icon: FileText },
                  { label: "Manage Permissions", icon: Shield },
                ].map((action, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start gap-2 hover:border-purple-500/30">
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
