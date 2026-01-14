import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock, AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const initialTasks = [
  { id: 1, title: "Review Patel Industries affidavit", priority: "high", completed: false, dueTime: "Today, 2:00 PM" },
  { id: 2, title: "Prepare court appearance notes", priority: "high", completed: false, dueTime: "Today, 4:00 PM" },
  { id: 3, title: "Call Mr. Sharma for case update", priority: "medium", completed: true, dueTime: "Completed" },
  { id: 4, title: "File evidence bundle - Singh case", priority: "medium", completed: false, dueTime: "Tomorrow" },
  { id: 5, title: "Draft settlement proposal", priority: "low", completed: false, dueTime: "Jan 5, 2026" },
];

export const TasksCard = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="yugality-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 text-foreground" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t("Today's Tasks")}</h3>
            <p className="text-xs text-muted-foreground">{completedCount}/{tasks.length} {t("completed")}</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-1 border-border/50 text-muted-foreground hover:text-foreground">
          <Plus className="w-3.5 h-3.5" /> {t("Add")}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.06 }}
            whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.3)" }}
            onClick={() => toggleTask(task.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all group ${
              task.completed ? "opacity-60" : ""
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="mt-0.5"
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className={`w-5 h-5 ${getPriorityColor(task.priority)} group-hover:text-primary transition-colors`} />
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium transition-all ${
                task.completed ? "line-through text-muted-foreground" : "text-foreground"
              }`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{task.dueTime}</span>
                {task.priority === "high" && !task.completed && (
                  <span className="flex items-center gap-0.5 text-[10px] text-destructive">
                    <AlertCircle className="w-3 h-3" /> Urgent
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};