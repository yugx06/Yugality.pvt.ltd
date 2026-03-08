import { motion } from "framer-motion";
import { 
  Users, Shield, Activity, Settings, Database, Server,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, FileText,
  UserPlus, UserMinus, Eye, BarChart3, Cpu, HardDrive, 
  DollarSign, Briefcase, MessageSquare, Calendar, FileQuestion,
  UserCog, Mail, Bell, Lock, ArrowRight, UserCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const systemStats = [
  { label: "Total Users", value: "1,234", change: "+45 this month", icon: Users, color: "text-purple-500 bg-purple-500/10" },
  { label: "Active Lawyers", value: "156", change: "+8 new", icon: Briefcase, color: "text-amber-500 bg-amber-500/10" },
  { label: "Total Revenue", value: "₹12.5L", change: "+23% growth", icon: DollarSign, color: "text-green-500 bg-green-500/10" },
  { label: "System Health", value: "99.9%", change: "All systems operational", icon: Shield, color: "text-indigo-500 bg-indigo-500/10" },
];

const userGrowthData = [
  { month: "Aug", users: 850, lawyers: 120, clients: 730 },
  { month: "Sep", users: 920, lawyers: 128, clients: 792 },
  { month: "Oct", users: 1010, lawyers: 138, clients: 872 },
  { month: "Nov", users: 1095, lawyers: 145, clients: 950 },
  { month: "Dec", users: 1180, lawyers: 152, clients: 1028 },
  { month: "Jan", users: 1234, lawyers: 156, clients: 1078 },
];

const subscriptionData = [
  { name: "Basic", value: 456, color: "hsl(215, 70%, 60%)" },
  { name: "Professional", value: 589, color: "hsl(142, 70%, 45%)" },
  { name: "Enterprise", value: 189, color: "hsl(280, 70%, 55%)" },
];

const recentUsers = [
  { name: "Adv. Meera Patel", email: "meera@law.com", role: "lawyer", status: "active", joined: "2 hours ago", plan: "Professional" },
  { name: "Rahul Verma", email: "rahul@client.com", role: "client", status: "active", joined: "5 hours ago", plan: "Basic" },
  { name: "Adv. Suresh Kumar", email: "suresh@law.com", role: "lawyer", status: "pending", joined: "1 day ago", plan: "Enterprise" },
  { name: "Anita Sharma", email: "anita@client.com", role: "client", status: "active", joined: "2 days ago", plan: "Professional" },
  { name: "Adv. Vikram Singh", email: "vikram@law.com", role: "lawyer", status: "active", joined: "3 days ago", plan: "Enterprise" },
];

const systemAlerts = [
  { type: "security", message: "3 failed login attempts detected", severity: "warning", time: "10 min ago" },
  { type: "update", message: "System update available (v2.3.1)", severity: "info", time: "2 hours ago" },
  { type: "storage", message: "Storage usage at 67%", severity: "info", time: "5 hours ago" },
  { type: "performance", message: "API response time optimal", severity: "success", time: "1 day ago" },
];

const recentActivities = [
  { action: "New lawyer registration", user: "Adv. Meera Patel", time: "2 hours ago", icon: UserPlus },
  { action: "Subscription upgraded", user: "Tech Solutions Inc", time: "4 hours ago", icon: TrendingUp },
  { action: "Document uploaded (2.4 MB)", user: "Rahul Verma", time: "6 hours ago", icon: FileText },
  { action: "Support ticket resolved", user: "Anita Sharma", time: "8 hours ago", icon: CheckCircle2 },
  { action: "Payment processed ₹5,999", user: "Kumar & Associates", time: "1 day ago", icon: DollarSign },
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@yugality.com",
    phone: "+91 98765 43210",
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
            <Shield className="w-5 h-5 text-purple-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("Admin Dashboard")}</h1>
          </motion.div>
          <p className="text-muted-foreground text-sm">{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowProfileEdit(!showProfileEdit)}>
            <UserCircle className="w-4 h-4 mr-2" />
            {t("My Profile")}
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            {t("Settings")}
          </Button>
          <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
            <Activity className="w-4 h-4 mr-2" />
            {t("System Status")}
          </Button>
        </div>
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
                <UserCircle className="w-5 h-5 text-purple-500" />
                {t("Quick Edit Profile")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="admin-name">{t("Name")}</Label>
                  <Input
                    id="admin-name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-email">{t("Email")}</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-phone">Phone</Label>
                  <Input
                    id="admin-phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleProfileUpdate}>{t("Update Profile")}</Button>
                <Button variant="outline" onClick={() => setShowProfileEdit(false)}>{t("Cancel")}</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t(stat.label)}</p>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-emerald-500">{t(stat.change)}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                {t("User Growth Trends")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(215, 70%, 60%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(215, 70%, 60%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="users" stroke="hsl(215, 70%, 60%)" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                {t("Subscription Distribution")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* User Management & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                  {t("Recent Users")}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  {t("View All")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsers.map((u, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      u.role === 'lawyer' ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                    }`}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{u.role}</Badge>
                    <Badge className="text-xs">{u.plan}</Badge>
                    <Badge variant={u.status === 'active' ? 'default' : 'secondary'} className="text-xs">{u.status}</Badge>
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-cyan-500" />
                {t("Recent Activities")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Alerts */}
      <motion.div variants={itemVariants}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              {t("System Alerts")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'warning' ? 'bg-amber-500/5 border-amber-500/20' :
                    alert.severity === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' :
                    'bg-blue-500/5 border-blue-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        alert.severity === 'warning' ? 'border-amber-500/30 text-amber-500' :
                        alert.severity === 'success' ? 'border-emerald-500/30 text-emerald-500' :
                        'border-blue-500/30 text-blue-500'
                      }`}
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;

