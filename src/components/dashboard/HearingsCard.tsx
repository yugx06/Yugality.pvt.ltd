import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Crown, Calendar } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const HearingsCard = () => {
  return (
    <motion.div 
      className="yugality-card-interactive p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <Crown className="w-full h-full text-primary" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upcoming Hearings</h3>
            <p className="text-xs text-muted-foreground">Next 48 hours</p>
          </div>
        </div>
        <motion.button 
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors font-medium"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          View all <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {hearings.map((hearing) => (
          <motion.div
            key={hearing.id}
            variants={itemVariants}
            whileHover={{ 
              x: 4,
              backgroundColor: "hsl(var(--muted) / 0.5)",
            }}
            className={`
              relative pl-5 pr-4 py-4 rounded-xl transition-all duration-300 cursor-pointer group
              ${hearing.urgent 
                ? "border border-destructive/30 bg-destructive/5 hover:bg-destructive/10" 
                : "border border-border/50 hover:border-primary/30 bg-card/50"
              }
            `}
          >
            {/* Left border indicator */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full
              ${hearing.urgent 
                ? "bg-gradient-to-b from-destructive to-destructive/50" 
                : "bg-gradient-to-b from-primary to-primary/50"
              }`} 
            />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                    ${hearing.urgent ? "status-urgent" : "status-filed"}`}>
                    {hearing.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{hearing.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {hearing.case}
                </h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {hearing.court}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {hearing.time}
                  </span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
