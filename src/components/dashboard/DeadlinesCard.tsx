import { motion } from "framer-motion";
import { AlertCircle, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const deadlines = [
  {
    id: 1,
    title: "File Counter Affidavit",
    case: "Patel Industries vs. SEBI",
    dueDate: "Jan 4, 2026",
    daysLeft: 1,
    urgent: true,
  },
  {
    id: 2,
    title: "Submit Evidence Documents",
    case: "Singh vs. State of Maharashtra",
    dueDate: "Jan 6, 2026",
    daysLeft: 3,
    urgent: true,
  },
  {
    id: 3,
    title: "Written Arguments",
    case: "Sharma vs. National Bank",
    dueDate: "Jan 10, 2026",
    daysLeft: 7,
    urgent: false,
  },
  {
    id: 4,
    title: "Client Meeting Prep",
    case: "Kumar vs. Kumar",
    dueDate: "Jan 12, 2026",
    daysLeft: 9,
    urgent: false,
  },
];

export const DeadlinesCard = ({ emergencyMode }: { emergencyMode?: boolean }) => {
  const { t } = useLanguage();
  const urgentDeadlines = deadlines.filter(d => d.urgent);
  const normalDeadlines = deadlines.filter(d => !d.urgent);
  
  const sortedDeadlines = emergencyMode 
    ? [...urgentDeadlines, ...normalDeadlines]
    : deadlines;

  return (
    <motion.div 
      className={`yugality-card p-6 ${emergencyMode && urgentDeadlines.length > 0 ? "yugality-card-emergency" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          className={`w-10 h-10 rounded-lg flex items-center justify-center
            ${urgentDeadlines.length > 0 ? "bg-destructive/10" : "bg-tech/10"}`}
          animate={urgentDeadlines.length > 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle className={`w-5 h-5 ${urgentDeadlines.length > 0 ? "text-destructive" : "text-tech"}`} />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("Critical Deadlines")}</h3>
          <p className="text-xs text-muted-foreground">
            {urgentDeadlines.length} {t("urgent")}, {normalDeadlines.length} {t("upcoming")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedDeadlines.map((deadline, index) => (
          <motion.div
            key={deadline.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`
              p-3 rounded-lg border transition-all duration-200 cursor-pointer
              ${deadline.urgent 
                ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/50" 
                : "border-border bg-card hover:bg-muted/50 hover:border-border"
              }
            `}
          >
            {deadline.urgent && (
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate
                  ${deadline.urgent ? "text-destructive" : "text-foreground"}`}>
                  {deadline.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{deadline.case}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {deadline.dueDate}
                </div>
                <p className={`text-xs font-medium mt-1
                  ${deadline.daysLeft <= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                  {deadline.daysLeft === 1 ? t("Tomorrow") : `${deadline.daysLeft} ${t("days left")}`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};