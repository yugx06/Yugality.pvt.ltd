import { motion } from "framer-motion";
import { Bot, Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const insights = [
  {
    id: 1,
    type: "reminder",
    title: "Document Review Pending",
    description: "3 documents from the Patel case haven't been reviewed yet.",
    action: "Review Now",
  },
  {
    id: 2,
    type: "insight",
    title: "Similar Case Found",
    description: "A 2024 Supreme Court ruling may be relevant to Singh vs. State.",
    action: "View Details",
  },
  {
    id: 3,
    type: "suggestion",
    title: "Deadline Optimization",
    description: "Consider filing early for Kumar case - court backlog expected.",
    action: "Learn More",
  },
];

export const AIInsightsCard = () => {
  return (
    <motion.div 
      className="yugality-card-interactive p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Subtle tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech/5 via-transparent to-primary/3 pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="w-10 h-10 rounded-lg bg-tech/10 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bot className="w-5 h-5 text-tech" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-xs text-tech flex items-center gap-1">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3" />
              </motion.span>
              Powered by Yugality AI
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="p-4 rounded-lg bg-muted/30 border border-tech/10 
                         hover:border-tech/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-tech/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                >
                  <Lightbulb className="w-4 h-4 text-tech" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-tech transition-colors">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{insight.description}</p>
                  <motion.button 
                    className="mt-2 text-xs text-tech hover:text-tech-light flex items-center gap-1 
                               transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {insight.action}
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          className="mt-4 w-full py-3 rounded-lg bg-tech/10 text-tech text-sm font-medium
                     hover:bg-tech/20 transition-all duration-200 flex items-center justify-center gap-2
                     border border-tech/20 hover:border-tech/40"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Bot className="w-4 h-4" />
          Open AI Assistant
        </motion.button>
      </div>
    </motion.div>
  );
};