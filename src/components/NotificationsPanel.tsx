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
    title: "🚨 URGENT: Bail Hearing Tomorrow",
    message: "Mr. Rohit Khanna bail application hearing at 11:00 AM, Sessions Court Room 2. Documents ready?",
    time: "2 min ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "urgent",
    title: "Emergency Court Notice Received",
    message: "High Court issued urgent notice in Constitutional Petition WP/2025/12345. Response required within 48 hours.",
    time: "15 min ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "deadline",
    title: "⚠️ Critical Filing Deadline - TODAY",
    message: "Appeal filing deadline at 4:00 PM for case HC/2024/5678. All documents must be submitted by 3:30 PM.",
    time: "45 min ago",
    read: false,
    icon: Clock,
  },
  {
    id: 4,
    type: "urgent",
    title: "Client Emergency Contact Request",
    message: "Mr. Vikram Rao (Criminal Appeal) needs immediate consultation regarding arrest warrant. Contact: +91 98765 44444",
    time: "1 hour ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 5,
    type: "deadline",
    title: "Counter Affidavit Due Tomorrow",
    message: "Counter affidavit submission due for Singh vs. State case. Draft pending final review.",
    time: "2 hours ago",
    read: false,
    icon: Clock,
  },
  {
    id: 6,
    type: "urgent",
    title: "Arbitration Emergency Meeting",
    message: "Opposing counsel requested emergency arbitration hearing. Mehta & Associates partnership dispute - urgent strategy needed.",
    time: "3 hours ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 7,
    type: "document",
    title: "Urgent Document Signature Required",
    message: "Settlement Agreement Draft v3 needs your immediate signature. M&A transaction closing pending.",
    time: "4 hours ago",
    read: false,
    icon: FileText,
  },
  {
    id: 8,
    type: "deadline",
    title: "Evidence Submission - 2 Days Left",
    message: "Banking fraud case evidence must be filed by Feb 5. Forensic reports still pending from expert.",
    time: "5 hours ago",
    read: false,
    icon: Clock,
  },
  {
    id: 9,
    type: "urgent",
    title: "Court Date Preponed - Action Needed",
    message: "Supreme Court hearing for SLP/2024/12345 preponed from Feb 10 to Feb 7. Travel arrangements needed urgently.",
    time: "6 hours ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 10,
    type: "calendar",
    title: "Multiple Hearings Tomorrow",
    message: "3 hearings scheduled tomorrow: 10:00 AM High Court, 2:00 PM District Court, 4:00 PM Tribunal. Confirm attendance.",
    time: "8 hours ago",
    read: false,
    icon: Calendar,
  },
  {
    id: 11,
    type: "urgent",
    title: "Police Investigation Notice",
    message: "Client Online Retail Corp received cyber crime investigation notice. Immediate response strategy meeting required.",
    time: "10 hours ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 12,
    type: "deadline",
    title: "Trademark Opposition Filing - 3 Days",
    message: "Trademark opposition for TM/2025/6789 must be filed by Feb 7. Draft ready for review.",
    time: "12 hours ago",
    read: false,
    icon: Clock,
  },
  {
    id: 13,
    type: "document",
    title: "Bail Application Documents Ready",
    message: "All documents prepared for bail hearing. Client affidavit, surety documents, and address proofs attached.",
    time: "Yesterday",
    read: true,
    icon: FileText,
  },
  {
    id: 14,
    type: "case",
    title: "Case Status Update - Favorable",
    message: "Judge indicated positive inclination in Verma Land Acquisition case. Next hearing for final arguments.",
    time: "Yesterday",
    read: true,
    icon: Scale,
  },
  {
    id: 15,
    type: "calendar",
    title: "Client Meeting Rescheduled",
    message: "Mr. Sharma requested to reschedule 3:00 PM consultation to 5:00 PM. Confirmed.",
    time: "Yesterday",
    read: true,
    icon: Calendar,
  },
  {
    id: 16,
    type: "urgent",
    title: "Witness Unavailable - Urgent",
    message: "Key witness for Mishra criminal trial unable to attend. Alternative witness arrangement needed immediately.",
    time: "2 days ago",
    read: false,
    icon: AlertCircle,
  },
  {
    id: 17,
    type: "deadline",
    title: "GST Compliance Filing Due",
    message: "Quarterly GST filing deadline approaching. Manufacturing Company client needs immediate attention.",
    time: "2 days ago",
    read: true,
    icon: Clock,
  },
  {
    id: 18,
    type: "document",
    title: "Court Order Received",
    message: "Interim order received in defamation suit HC/2026/234. Injunction granted in favor of client.",
    time: "2 days ago",
    read: true,
    icon: FileText,
  },
  {
    id: 19,
    type: "case",
    title: "Mediation Successful",
    message: "Shareholder dispute mediation resulted in settlement. Documentation for court approval in progress.",
    time: "3 days ago",
    read: true,
    icon: Scale,
  },
  {
    id: 20,
    type: "urgent",
    title: "Client Payment Overdue",
    message: "Patel Industries Ltd. payment of ₹2,50,000 overdue by 15 days. Follow-up required before next hearing.",
    time: "3 days ago",
    read: true,
    icon: AlertCircle,
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