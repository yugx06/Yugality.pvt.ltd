import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Phone, Video, Mail, Calendar } from "lucide-react";

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { icon: Phone, label: "Call Client", color: "bg-green-500" },
    { icon: Video, label: "Video Call", color: "bg-tech" },
    { icon: Mail, label: "Send Email", color: "bg-primary" },
    { icon: Calendar, label: "Schedule", color: "bg-purple-500" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-16 left-0 mb-2"
          >
            <div className="bg-card border border-border rounded-xl shadow-[var(--shadow-elevated)] p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground px-2 mb-2">Quick Contact</p>
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              ))}
              
              {/* WhatsApp Link */}
              <motion.a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors group border-t border-border/50 pt-3 mt-1"
              >
                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-[#25D366] transition-colors">
                  WhatsApp
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-muted" : "bg-[#25D366]"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
          animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </div>
  );
};