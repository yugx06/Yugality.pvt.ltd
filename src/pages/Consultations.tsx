import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Plus, Phone, Video, Calendar, AlertCircle, Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const consultations = [
  { id: 1, client: "Mr. Rajesh Sharma", type: "In-Person", date: "Jan 3, 2026", time: "3:00 PM", status: "upcoming", emergency: true, matter: "Criminal Appeal", location: "Office - Conference Room A", avatar: "RS" },
  { id: 2, client: "Priya Industries Pvt Ltd", type: "Video Call", date: "Jan 4, 2026", time: "11:00 AM", status: "scheduled", emergency: false, matter: "Corporate Dispute", location: "Virtual Meeting", avatar: "PI" },
  { id: 3, client: "Mrs. Anita Verma", type: "Phone", date: "Jan 4, 2026", time: "2:30 PM", status: "scheduled", emergency: false, matter: "Property Rights", location: "Phone Call", avatar: "AV" },
  { id: 4, client: "Kumar Family", type: "In-Person", date: "Jan 5, 2026", time: "10:00 AM", status: "scheduled", emergency: false, matter: "Family Settlement", location: "Office - Conference Room B", avatar: "KF" },
  { id: 5, client: "Tech Solutions Inc", type: "Video Call", date: "Jan 6, 2026", time: "4:00 PM", status: "scheduled", emergency: false, matter: "IP Litigation", location: "Virtual Meeting", avatar: "TS" },
];

const timelineEvents = [
  { time: "9:00 AM", event: "Morning briefing", type: "internal" },
  { time: "10:00 AM", event: "Kumar Family - Family Settlement", type: "meeting" },
  { time: "12:00 PM", event: "Lunch Break", type: "break" },
  { time: "2:00 PM", event: "Court appearance - High Court", type: "court" },
  { time: "4:00 PM", event: "Tech Solutions Inc - IP Litigation", type: "meeting" },
  { time: "5:30 PM", event: "Document review", type: "work" },
];

const Consultations = () => {
  const [activeView, setActiveView] = useState<"cards" | "timeline">("cards");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call": return <Video className="w-4 h-4" />;
      case "Phone": return <Phone className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video Call": return "bg-tech/10 text-tech border-tech/20";
      case "Phone": return "bg-green-500/10 text-green-600 border-green-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-primary";
      case "court": return "bg-destructive";
      case "break": return "bg-muted-foreground/30";
      case "work": return "bg-tech";
      default: return "bg-muted-foreground";
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
          <div className="flex gap-3">
            <div className="flex border border-border/50 rounded-lg overflow-hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("cards")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeView === "cards" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cards
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("timeline")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeView === "timeline" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Timeline
              </motion.button>
            </div>
            <Button className="yugality-button-gold gap-2">
              <Plus className="w-4 h-4" /> Schedule
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Today", value: "3", icon: Calendar, color: "text-primary" },
            { label: "This Week", value: "12", icon: Clock, color: "text-tech" },
            { label: "Pending", value: "5", icon: Users, color: "text-muted-foreground" },
            { label: "Emergency", value: "1", icon: AlertCircle, color: "text-destructive" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="yugality-card-interactive p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <motion.p 
                    className="text-2xl font-bold text-foreground mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {activeView === "cards" ? (
          /* Consultations Cards View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Upcoming Consultations</h3>
            
            {consultations.map((consult, index) => (
              <motion.div
                key={consult.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`yugality-card p-5 cursor-pointer transition-all
                  ${consult.emergency ? "border-destructive/30 bg-destructive/5" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold
                        ${consult.emergency ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
                    >
                      {consult.avatar}
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{consult.client}</h4>
                        {consult.emergency && (
                          <motion.span 
                            className="status-urgent flex items-center gap-1"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <AlertCircle className="w-3 h-3" /> Emergency
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{consult.matter}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" /> {consult.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" /> {consult.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" /> {consult.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getTypeColor(consult.type)}`}
                    >
                      {getTypeIcon(consult.type)}
                      {consult.type}
                    </motion.span>
                    <div className="flex gap-2 mt-2">
                      {consult.type === "Video Call" && (
                        <Button size="sm" className="bg-tech hover:bg-tech/90 text-white gap-1">
                          <Video className="w-3.5 h-3.5" /> Join
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground gap-1">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Timeline View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="yugality-card p-6"
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">Today's Schedule</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-border/50" />

              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    {/* Time */}
                    <div className="w-16 text-right">
                      <span className="text-sm font-medium text-muted-foreground">{event.time}</span>
                    </div>

                    {/* Dot */}
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-3 h-3 rounded-full ${getTimelineColor(event.type)} ring-4 ring-card z-10`}
                    />

                    {/* Event Card */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex-1 p-4 rounded-lg border transition-all cursor-pointer
                        ${event.type === "court" 
                          ? "bg-destructive/5 border-destructive/20 hover:border-destructive/40" 
                          : event.type === "meeting"
                            ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                            : "bg-muted/30 border-border/50 hover:border-border"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          event.type === "court" ? "text-destructive" : 
                          event.type === "meeting" ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {event.event}
                        </p>
                        {event.type === "meeting" && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Consultations;