import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const events = [
  { id: 1, title: "Singh vs. State Hearing", court: "Bombay High Court", time: "10:30 AM", type: "hearing" },
  { id: 2, title: "Patel Case Arguments", court: "SAT", time: "2:00 PM", type: "hearing" },
  { id: 3, title: "Client Meeting - Kumar", location: "Office", time: "4:00 PM", type: "meeting" },
];

const Calendar = () => {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <h1 className="text-2xl font-bold text-foreground min-w-[200px] text-center">
                January 2026
              </h1>
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-card rounded-lg border border-border/50 p-1">
              {["day", "week", "month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as typeof view)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-all capitalize
                    ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button className="yugality-button-gold gap-2">
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card overflow-hidden"
        >
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b border-border/50">
            <div className="p-4 border-r border-border/50" />
            {weekDays.map((day, i) => (
              <div key={day} className="p-4 text-center border-r border-border/50 last:border-0">
                <p className="text-xs text-muted-foreground uppercase">{day}</p>
                <p className={`text-lg font-semibold mt-1 ${i === 5 ? "text-primary" : "text-foreground"}`}>
                  {i + 1}
                </p>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="max-h-[600px] overflow-y-auto scrollbar-dark">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-border/30">
                <div className="p-2 text-xs text-muted-foreground text-right pr-4 border-r border-border/50">
                  {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                {weekDays.map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="min-h-[60px] border-r border-border/30 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer relative"
                  >
                    {/* Sample events */}
                    {hour === 10 && dayIndex === 5 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-x-1 top-1 bg-primary/20 border border-primary/40 rounded p-1.5"
                      >
                        <p className="text-xs font-medium text-primary truncate">Singh Hearing</p>
                        <p className="text-[10px] text-muted-foreground">10:30 AM</p>
                      </motion.div>
                    )}
                    {hour === 14 && dayIndex === 5 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-x-1 top-1 bg-destructive/20 border border-destructive/40 rounded p-1.5"
                      >
                        <p className="text-xs font-medium text-destructive truncate">Patel Arguments</p>
                        <p className="text-[10px] text-muted-foreground">2:00 PM</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Events Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="yugality-card p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`p-4 rounded-lg border-l-2 
                  ${event.type === "hearing" ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5"}
                  hover:bg-muted/30 transition-colors cursor-pointer`}
              >
                <p className="font-medium text-foreground">{event.title}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.court || event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
