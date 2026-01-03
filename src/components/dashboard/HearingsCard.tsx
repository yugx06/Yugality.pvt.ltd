import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const hearings = [
  {
    id: 1,
    case: "Singh vs. State of Maharashtra",
    court: "Bombay High Court",
    time: "10:30 AM",
    date: "Today",
    type: "Hearing",
    urgent: false,
  },
  {
    id: 2,
    case: "Patel Industries Ltd. vs. SEBI",
    court: "Securities Appellate Tribunal",
    time: "2:00 PM",
    date: "Today",
    type: "Arguments",
    urgent: true,
  },
  {
    id: 3,
    case: "Kumar vs. Kumar",
    court: "Family Court, Delhi",
    time: "11:00 AM",
    date: "Tomorrow",
    type: "Mediation",
    urgent: false,
  },
];

export const HearingsCard = () => {
  return (
    <div className="yugality-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Hearings</h3>
        <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {hearings.map((hearing, index) => (
          <motion.div
            key={hearing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative pl-4 py-3 border-l-2 
              ${hearing.urgent ? "border-destructive" : "border-primary/40"}
              hover:bg-muted/20 rounded-r-lg transition-colors cursor-pointer group
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${hearing.urgent ? "status-urgent" : "status-filed"}`}>
                    {hearing.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{hearing.date}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {hearing.case}
                </h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {hearing.court}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {hearing.time}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
