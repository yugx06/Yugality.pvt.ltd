import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Phone, Video, Mail, Calendar, Crown, Sparkles } from "lucide-react";

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { icon: Phone, label: "Call Client", color: "from-green-500/20 to-green-500/5", iconColor: "text-green-600 dark:text-green-400", borderColor: "border-green-500/30" },
    { icon: Video, label: "Video Call", color: "from-tech/20 to-tech/5", iconColor: "text-tech", borderColor: "border-tech/30" },
    { icon: Mail, label: "Send Email", color: "from-primary/20 to-primary/5", iconColor: "text-primary", borderColor: "border-primary/30" },
    { icon: Calendar, label: "Schedule", color: "from-royal/20 to-royal/5", iconColor: "text-royal", borderColor: "border-royal/30" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
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

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute bottom-20 left-0 w-64 bg-card border-2 border-green-500/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.3)] overflow-hidden"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quick Contact</p>
                  <Sparkles className="w-3 h-3 text-green-500" />
                </div>
                
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center border ${action.borderColor} group-hover:border-green-500/50 transition-colors shadow-sm`}>
                        <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/10 transition-all duration-300 group border-t border-border/50 mt-2 pt-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      WhatsApp Direct
                    </span>
                  </motion.a>
                </div>
              </div>

              {/* Bottom decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        className={`relative w-14 h-14 rounded-2xl shadow-[0_8px_30px_rgba(34,197,94,0.4)] flex items-center justify-center overflow-hidden transition-colors duration-300 ${
          isOpen ? "bg-card border-2 border-green-500/50" : "bg-gradient-to-br from-green-500 to-green-600"
        }`}
      >
        {/* Crown decoration */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card flex items-center justify-center border-2 border-green-500 shadow-lg z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-3 h-3 text-green-500" />
        </motion.div>

        {isOpen ? (
          <X className="w-6 h-6 text-green-600 dark:text-green-400" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(34,197,94,0.4)",
              "0 0 0 15px rgba(34,197,94,0)",
              "0 0 0 0 rgba(34,197,94,0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};
