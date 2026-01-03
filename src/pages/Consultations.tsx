import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Plus, Phone, Video, Calendar, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultations = [
  { id: 1, client: "Mr. Rajesh Sharma", type: "In-Person", date: "Jan 3, 2026", time: "3:00 PM", status: "upcoming", emergency: true, matter: "Criminal Appeal" },
  { id: 2, client: "Priya Industries Pvt Ltd", type: "Video Call", date: "Jan 4, 2026", time: "11:00 AM", status: "scheduled", emergency: false, matter: "Corporate Dispute" },
  { id: 3, client: "Mrs. Anita Verma", type: "Phone", date: "Jan 4, 2026", time: "2:30 PM", status: "scheduled", emergency: false, matter: "Property Rights" },
  { id: 4, client: "Kumar Family", type: "In-Person", date: "Jan 5, 2026", time: "10:00 AM", status: "scheduled", emergency: false, matter: "Family Settlement" },
  { id: 5, client: "Tech Solutions Inc", type: "Video Call", date: "Jan 6, 2026", time: "4:00 PM", status: "scheduled", emergency: false, matter: "IP Litigation" },
];

const Consultations = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call": return <Video className="w-4 h-4" />;
      case "Phone": return <Phone className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Consultations</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage client meetings and appointments</p>
          </div>
          <Button className="yugality-button-gold gap-2">
            <Plus className="w-4 h-4" /> Schedule Consultation
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Today", value: "3", icon: Calendar },
            { label: "This Week", value: "12", icon: Clock },
            { label: "Pending", value: "5", icon: Users },
            { label: "Emergency", value: "1", icon: AlertCircle },
          ].map((stat, index) => (
            <div key={stat.label} className="yugality-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.label === "Emergency" ? "text-destructive" : "text-muted-foreground"}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Consultations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Upcoming</h3>
          
          {consultations.map((consult, index) => (
            <motion.div
              key={consult.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`yugality-card p-5 hover:shadow-xl transition-all cursor-pointer
                ${consult.emergency ? "border-destructive/30 yugality-card-emergency" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${consult.emergency ? "bg-destructive/10" : "bg-primary/10"}`}>
                    {getTypeIcon(consult.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{consult.client}</h4>
                      {consult.emergency && (
                        <span className="status-urgent flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{consult.matter}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {consult.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {consult.time}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full
                        ${consult.type === "Video Call" ? "bg-tech/10 text-tech" :
                          consult.type === "Phone" ? "bg-secondary/10 text-secondary" :
                          "bg-primary/10 text-primary"}`}>
                        {getTypeIcon(consult.type)}
                        {consult.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {consult.type === "Video Call" && (
                    <Button size="sm" variant="outline" className="border-tech/30 text-tech hover:bg-tech/10">
                      <Video className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground">
                    Reschedule
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
