import { motion } from "framer-motion";
import { 
  FileText, Calendar, MessageSquare, Clock, Scale, 
  AlertCircle, CheckCircle2, User, ArrowRight, Gavel,
  Download, Eye, Phone
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

const activeCases = [
  { id: 1, title: "Property Dispute - Plot #247", status: "In Progress", progress: 65, nextHearing: "Jan 15, 2026", advocate: "Adv. Rajesh Kumar" },
  { id: 2, title: "Consumer Complaint - Electronics", status: "Under Review", progress: 30, nextHearing: "Jan 22, 2026", advocate: "Adv. Priya Sharma" },
  { id: 3, title: "Insurance Claim Settlement", status: "Pending", progress: 15, nextHearing: "Feb 5, 2026", advocate: "Adv. Rajesh Kumar" },
];

const recentDocuments = [
  { name: "Property Sale Agreement", date: "Dec 28, 2025", type: "PDF" },
  { name: "Court Summons Notice", date: "Dec 20, 2025", type: "PDF" },
  { name: "Legal Opinion Letter", date: "Dec 15, 2025", type: "DOCX" },
];

const upcomingHearings = [
  { case: "Property Dispute", date: "Jan 15, 2026", time: "10:30 AM", court: "District Court, Mumbai" },
  { case: "Consumer Complaint", date: "Jan 22, 2026", time: "2:00 PM", court: "Consumer Forum" },
];

export const ClientDashboard = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.div className="flex items-center gap-2 mb-1">
            <User className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Client Portal</span>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-foreground">
            Welcome, {user?.name?.split(' ')[0] || 'Client'}
          </motion.h1>
          <p className="text-muted-foreground text-sm mt-1">Track your legal matters and stay updated</p>
        </div>
        <motion.div className="text-right">
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            {today.getFullYear()}
          </p>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Cases", value: "3", icon: Scale, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Upcoming Hearings", value: "2", icon: Gavel, color: "text-teal-500 bg-teal-500/10" },
          { label: "Documents", value: "24", icon: FileText, color: "text-cyan-500 bg-cyan-500/10" },
          { label: "Messages", value: "5", icon: MessageSquare, color: "text-blue-500 bg-blue-500/10" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
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
                  <Scale className="w-5 h-5 text-emerald-500" />
                  Your Active Cases
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-600">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCases.map((caseItem) => (
                  <motion.div
                    key={caseItem.id}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{caseItem.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Advocate: {caseItem.advocate}
                        </p>
                      </div>
                      <Badge variant={caseItem.status === "In Progress" ? "default" : "secondary"} 
                             className={caseItem.status === "In Progress" ? "bg-emerald-500" : ""}>
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
                      <Calendar className="w-3 h-3" />
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
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-teal-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date} • {doc.type}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
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
                        <Calendar className="w-3 h-3" /> {hearing.date}
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
            <Card className="border-border bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Adv. Rajesh Kumar</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your Primary Advocate</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
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
                  { label: "View Billing", icon: Scale },
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
