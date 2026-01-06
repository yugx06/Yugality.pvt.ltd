import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, FileText, Calendar, Users, Scale, Bot, X } from "lucide-react";

export const QuickActionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: FileText, label: "New Document", color: "bg-primary" },
    { icon: Calendar, label: "Add Event", color: "bg-tech" },
    { icon: Users, label: "New Client", color: "bg-green-500" },
    { icon: Scale, label: "New Case", color: "bg-purple-500" },
    { icon: Bot, label: "Ask AI", color: "bg-gradient-to-br from-tech to-purple-500" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: -(index + 1) * 60,
                  scale: 1 
                }}
                exit={{ opacity: 0, y: 0, scale: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 300,
                  delay: index * 0.05 
                }}
                whileHover={{ scale: 1.1, x: -8 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 flex items-center gap-3 group"
              >
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {action.label}
                </motion.span>
                <div className={`w-12 h-12 rounded-full ${action.color} shadow-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-14 h-14 rounded-full bg-primary shadow-[var(--shadow-gold-glow)] flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Plus className="w-6 h-6 text-primary-foreground" />
        )}
      </motion.button>
    </div>
  );
};