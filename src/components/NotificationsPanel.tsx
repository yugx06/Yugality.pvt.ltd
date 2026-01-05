import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertCircle, Calendar, FileText, Scale, Clock, CheckCheck, Crown, Sparkles } from "lucide-react";
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
      case "urgent": return "text-destructive bg-destructive/10 border-destructive/30";
      case "deadline": return "text-primary bg-primary/10 border-primary/30";
      case "document": return "text-tech bg-tech/10 border-tech/30";
      case "calendar": return "text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/30";
      case "case": return "text-royal bg-royal/10 border-royal/30";
      default: return "text-muted-foreground bg-muted border-border";
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
            className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-4 top-20 w-full max-w-sm bg-card border-2 border-primary/20 rounded-2xl shadow-[var(--shadow-royal)] z-50 overflow-hidden"
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bell className="w-5 h-5 text-primary" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-card"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    Notifications
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Stay updated</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary/80 hover:bg-primary/10 gap-1 rounded-lg"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all
                </Button>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-1.5 p-3 border-b border-border/30 overflow-x-auto scrollbar-thin">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? "text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  style={activeCategory === category ? { background: "var(--gradient-gold)" } : {}}
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
                  whileHover={{ backgroundColor: "hsl(var(--primary) / 0.05)", x: 4 }}
                  className={`p-4 border-b border-border/30 cursor-pointer transition-all duration-300 relative ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.read && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full"
                      style={{ background: "var(--gradient-gold)" }}
                    />
                  )}
                  <div className="flex gap-3 pl-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${getTypeColor(notification.type)}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-semibold truncate ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border/50 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30">
              <Button className="w-full yugality-button-gold gap-2">
                <Crown className="w-4 h-4" />
                View all notifications
              </Button>
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
