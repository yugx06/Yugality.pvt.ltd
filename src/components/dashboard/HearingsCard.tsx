import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const HearingsCard = () => {
  const { t } = useLanguage();
  return (
    <motion.div 
      className="yugality-card-interactive p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{t("Upcoming Hearings")}</h3>
        <motion.button 
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("View all")} <ChevronRight className="w-4 h-4" />
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
              relative pl-4 py-3 border-l-2 rounded-r-lg transition-colors cursor-pointer group
              ${hearing.urgent ? "border-destructive bg-destructive/5" : "border-primary/30 hover:border-primary/60"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${hearing.urgent ? "status-urgent" : "status-filed"}`}>
                    {t(hearing.type)}
                  </span>
                  <span className="text-xs text-muted-foreground">{t(hearing.date)}</span>
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
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};