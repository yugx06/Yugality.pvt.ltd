import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertCircle, Calendar, FileText, Scale, Clock, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "Hearing Tomorrow",
    message: "Patel Industries vs. SEBI case hearing scheduled for 10:00 AM",
    time: "5 min ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "deadline",
    title: "Filing Deadline",
    message: "Counter affidavit submission due in 2 days",
    time: "1 hour ago",
    read: false,
    icon: Clock,
  },
  {
    id: 3,
    type: "document",
    title: "Document Updated",
    message: "Settlement Agreement Draft v3 has been updated",
    time: "3 hours ago",
    read: false,
    icon: FileText,
  },
  {
    id: 4,
    type: "calendar",
    title: "Meeting Reminder",
    message: "Client consultation with Mr. Sharma at 3:00 PM",
    time: "Yesterday",
    read: true,
    icon: Calendar,
  },
  {
    id: 5,
    type: "case",
    title: "Case Status Updated",
    message: "Singh vs. State of Maharashtra moved to next hearing",
    time: "Yesterday",
    read: true,
    icon: Scale,
  },
];

const categories = ["All", "Urgent", "Deadlines", "Documents", "Calendar"];

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const markAsRead = (id: number) => {
    setLocalNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent": return "text-destructive bg-destructive/10";
      case "deadline": return "text-primary bg-primary/10";
      case "document": return "text-tech bg-tech/10";
      case "calendar": return "text-green-600 bg-green-500/10";
      case "case": return "text-purple-600 bg-purple-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const unreadCount = localNotifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-4 top-20 w-full max-w-sm bg-card border border-border rounded-xl shadow-[var(--shadow-elevated)] z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-foreground" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-muted-foreground hover:text-foreground gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </Button>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-1 p-2 border-b border-border/30 overflow-x-auto scrollbar-thin">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
              {localNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                  className={`p-4 border-b border-border/30 cursor-pointer transition-colors relative ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.read && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                  <div className="flex gap-3 pl-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className={`text-sm font-medium truncate ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border/50 bg-muted/20">
              <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                View all notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};