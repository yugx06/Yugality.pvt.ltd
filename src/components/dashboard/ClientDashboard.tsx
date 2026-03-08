import { motion } from "framer-motion";
import { 
  FileText, MessageSquare, Clock, Scale, 
  AlertCircle, CheckCircle2, User, ArrowRight, Gavel,
  Download, Eye, Phone, CreditCard, Check, Zap, Crown, Calendar, UserCircle
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const activeCases = [
  { id: 1, title: "Property Dispute - Plot #247", status: "In Progress", progress: 65, nextHearing: "Jan 15, 2026", advocate: "Adv. Rajesh Kumar" },
  { id: 2, title: "Consumer Complaint - Electronics", status: "Under Review", progress: 30, nextHearing: "Jan 22, 2026", advocate: "Adv. Priya Sharma" },
  { id: 3, title: "Insurance Claim Settlement", status: "Pending", progress: 15, nextHearing: "Feb 5, 2026", advocate: "Adv. Rajesh Kumar" },
];

const recentDocuments = [
  { name: "Property Sale Agreement", date: "Dec 28, 2025", type: "PDF", status: "Submitted" },
  { name: "Court Summons Notice", date: "Dec 20, 2025", type: "PDF", status: "Awaiting Upload" },
  { name: "Legal Opinion Letter", date: "Dec 15, 2025", type: "DOCX", status: "Submitted" },
];

const upcomingHearings = [
  { case: "Property Dispute", date: "Jan 15, 2026", time: "10:30 AM", court: "District Court, Mumbai" },
  { case: "Consumer Complaint", date: "Jan 22, 2026", time: "2:00 PM", court: "Consumer Forum" },
];

export const ClientDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Client Name",
    email: user?.email || "client@example.com",
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
            <User className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">{t("Client Portal")}</span>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-foreground">
            {t("Welcome back")}, {user?.name?.split(' ')[0] || 'Client'}
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">{t("Track your legal matters")}</p>
        </div>
        <motion.div className="flex flex-col items-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowProfileEdit(!showProfileEdit)}>
            <UserCircle className="w-4 h-4 mr-2" />
            {t("My Profile")}
          </Button>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
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
                <UserCircle className="w-5 h-5 text-blue-500" />
                {t("Quick Edit Profile")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="client-name">{t("Name")}</Label>
                  <Input
                    id="client-name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="client-email">{t("Email")}</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="client-phone">Phone</Label>
                  <Input
                    id="client-phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">{t("Update Profile")}</Button>
                <Button variant="outline" onClick={() => setShowProfileEdit(false)}>{t("Cancel")}</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Active Cases", value: "3", icon: Scale, color: "text-blue-500 bg-blue-500/10" },
          { label: "Upcoming Hearings", value: "2", icon: Gavel, color: "text-teal-500 bg-teal-500/10" },
          { label: "Documents", value: "24", icon: FileText, color: "text-cyan-500 bg-cyan-500/10" },
          { label: "Total Revenue", value: "₹32,450", icon: CreditCard, color: "text-green-500 bg-green-500/10" },
          { label: "Outstanding", value: "₹12,800", icon: CreditCard, color: "text-orange-500 bg-orange-500/10" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-4 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t(stat.label)}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cases */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Cases */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  {t("Active Cases")}
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCases.map((caseItem) => (
                  <motion.div
                    key={caseItem.id}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{caseItem.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Advocate: {caseItem.advocate}
                        </p>
                      </div>
                      <Badge variant={caseItem.status === "In Progress" ? "default" : "secondary"} 
                             className={caseItem.status === "In Progress" ? "bg-blue-500" : ""}>
                        {caseItem.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{caseItem.progress}%</span>
                      </div>
                      <Progress value={caseItem.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Next Hearing: <span className="font-medium text-foreground">{caseItem.nextHearing}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Documents */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  Recent Documents
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-teal-500">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDocuments.map((doc, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-teal-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-teal-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date} • {doc.type}</p>
                        </div>
                        <Badge 
                          className={
                            doc.status === "Submitted" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 ml-3">
                        {doc.status === "Awaiting Upload" && (
                          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
                            Upload Document
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Hearings */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-cyan-500" />
                  Upcoming Hearings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingHearings.map((hearing, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium text-foreground text-sm">{hearing.case}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Scale className="w-3 h-3" /> {hearing.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {hearing.time}
                      </p>
                      <p className="text-foreground">{hearing.court}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Advocate */}
          <motion.div variants={itemVariants}>
            <Card className="border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" 
                    alt="Adv. Rajesh Kumar"
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-blue-500"
                  />
                  <h3 className="font-semibold text-foreground">Adv. Rajesh Kumar</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your Primary Advocate</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" /> Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Request Document", icon: FileText },
                  { label: "Schedule Consultation", icon: Calendar },
                ].map((action, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start gap-2">
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
