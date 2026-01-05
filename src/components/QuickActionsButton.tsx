import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, FileText, Calendar, Users, Scale, Bot, X, Crown, Sparkles } from "lucide-react";

export const QuickActionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: FileText, label: "New Document", color: "from-tech/20 to-tech/5", iconColor: "text-tech", borderColor: "border-tech/30" },
    { icon: Calendar, label: "Add Event", color: "from-primary/20 to-primary/5", iconColor: "text-primary", borderColor: "border-primary/30" },
    { icon: Users, label: "New Client", color: "from-green-500/20 to-green-500/5", iconColor: "text-green-600 dark:text-green-400", borderColor: "border-green-500/30" },
    { icon: Scale, label: "New Case", color: "from-royal/20 to-royal/5", iconColor: "text-royal", borderColor: "border-royal/30" },
    { icon: Bot, label: "Ask AI", color: "from-primary/20 to-primary/5", iconColor: "text-primary", borderColor: "border-primary/30" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/10 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Actions Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 right-0 w-64 bg-card border-2 border-primary/20 rounded-2xl shadow-[var(--shadow-royal)] overflow-hidden"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quick Actions</p>
                </div>
                
                <div className="space-y-2">
                  {actions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center border ${action.borderColor} group-hover:border-primary/50 transition-colors shadow-sm`}>
                        <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bottom decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </motion.div>
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
        className="relative w-14 h-14 rounded-2xl shadow-[var(--shadow-royal)] flex items-center justify-center overflow-hidden group"
        style={{ background: "var(--gradient-royal)" }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          animate={{ 
            boxShadow: [
              "0 0 20px hsl(var(--primary) / 0.3)",
              "0 0 40px hsl(var(--primary) / 0.5)",
              "0 0 20px hsl(var(--primary) / 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Crown decoration */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card flex items-center justify-center border-2 border-primary shadow-lg z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-3 h-3 text-primary" />
        </motion.div>

        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground relative z-10" />
        ) : (
          <Plus className="w-6 h-6 text-primary-foreground relative z-10" />
        )}
      </motion.button>
    </div>
  );
};
