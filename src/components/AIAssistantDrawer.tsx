import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, FileText, Scale, BookOpen, Lightbulb, X, Minimize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  { icon: FileText, label: "Summarize document", prompt: "Summarize the key points" },
  { icon: Scale, label: "Find case law", prompt: "Find relevant case law" },
  { icon: BookOpen, label: "Draft notice", prompt: "Help me draft a notice" },
  { icon: Lightbulb, label: "Get insights", prompt: "What are the key insights?" },
];

const sampleMessages = [
  { role: "assistant", content: "Hello! I'm your AI legal assistant. How can I help you today?" },
];

export const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I understand you're asking about legal matters. In a production environment, I would analyze your query and provide detailed, contextual legal assistance. How else can I help?"
      }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-tech/10 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Bot className="w-5 h-5 text-tech" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    AI Assistant
                    <Sparkles className="w-4 h-4 text-tech" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Your legal companion</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl
                    ${message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-tech/10 text-foreground border border-tech/20 rounded-bl-md"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1.5 text-tech">
                        <Bot className="w-3 h-3" />
                        <span className="text-[10px] font-medium">Yugality AI</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-tech/10 text-foreground border border-tech/20 rounded-2xl rounded-bl-md p-3">
                      <div className="flex items-center gap-2 mb-1.5 text-tech">
                        <Bot className="w-3 h-3" />
                        <span className="text-[10px] font-medium">Yugality AI</span>
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-tech"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInput(suggestion.prompt)}
                      className="p-2.5 rounded-lg border border-tech/20 bg-tech/5 hover:bg-tech/10 
                                 transition-colors text-left group"
                    >
                      <suggestion.icon className="w-3.5 h-3.5 text-tech mb-1.5 group-hover:scale-110 transition-transform" />
                      <p className="text-[11px] text-foreground">{suggestion.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="bg-card border-border/50 focus:border-tech/50 text-sm"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSend} size="icon" className="yugality-button-gold">
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              <p className="text-[9px] text-muted-foreground mt-2 text-center">
                Powered by Yugality AI • Private & secure
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};