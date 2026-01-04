import { motion } from "framer-motion";
import { FileText, Scale, Calendar, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "document",
    title: "Document uploaded",
    description: "Counter Affidavit - Patel Industries",
    time: "2 min ago",
    icon: FileText,
    color: "text-primary bg-primary/10",
  },
  {
    id: 2,
    type: "case",
    title: "Case status updated",
    description: "Singh vs. State moved to hearing",
    time: "15 min ago",
    icon: Scale,
    color: "text-tech bg-tech/10",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting scheduled",
    description: "Client call with Priya Industries",
    time: "1 hour ago",
    icon: Calendar,
    color: "text-green-600 bg-green-500/10",
  },
  {
    id: 4,
    type: "message",
    title: "New message received",
    description: "From: Mr. Rajesh Sharma",
    time: "2 hours ago",
    icon: MessageSquare,
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    id: 5,
    type: "task",
    title: "Task completed",
    description: "Review settlement agreement",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "text-green-600 bg-green-500/10",
  },
];

export const RecentActivityCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="yugality-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
          >
            <Clock className="w-5 h-5 text-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <motion.button
          whileHover={{ x: 3 }}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.08 }}
            whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.3)" }}
            className="flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}
            >
              <activity.icon className="w-5 h-5" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.description}</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};