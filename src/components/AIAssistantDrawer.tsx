import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, FileText, Scale, BookOpen, Lightbulb, X, Minimize2, Plus, Paperclip, Mic, Crown, MessageSquare, Search, PenTool, ChevronDown, Settings, History, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  { icon: FileText, label: "Summarize document", prompt: "Summarize the key points of this document" },
  { icon: Scale, label: "Case law research", prompt: "Find relevant case law for property dispute" },
  { icon: BookOpen, label: "Draft legal notice", prompt: "Help me draft a legal notice" },
  { icon: Lightbulb, label: "Strategic advice", prompt: "What strategy should I use for my case?" },
];

const promptLibrary = [
  { category: "Document Analysis", prompts: ["Summarize this contract", "Find key clauses", "Check for risks"] },
  { category: "Case Research", prompts: ["Find similar cases", "Precedent analysis", "Court rulings"] },
  { category: "Drafting", prompts: ["Draft affidavit", "Reply to notice", "Legal opinion"] },
];

const actionModes = [
  { id: "ask", label: "Ask", icon: MessageSquare, description: "Get answers to your questions" },
  { id: "research", label: "Research", icon: Search, description: "Deep dive into legal research" },
  { id: "draft", label: "Draft", icon: PenTool, description: "Generate legal documents" },
];

const sampleMessages = [
  { role: "assistant", content: "Welcome to Yugality AI Legal Assistant. I'm here to help you with legal research, document drafting, and case analysis. How may I assist you today?" },
];

export const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [selectedMode, setSelectedMode] = useState("ask");
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const modeLabel = actionModes.find(m => m.id === selectedMode)?.label || "Ask";
    setMessages([...messages, { role: "user", content: `[${modeLabel}] ${input}` }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        ask: "Based on your query, I've analyzed the relevant legal provisions. The key points to consider are the applicable statutes and their interpretations in similar cases.",
        research: "I've conducted comprehensive research on this matter. Here are the relevant Supreme Court judgments and High Court decisions that may be applicable to your case.",
        draft: "I've prepared a draft based on your requirements. Please review the document structure and let me know if you'd like any modifications."
      };
      setMessages(prev => [...prev, {
        role: "assistant",
        content: responses[selectedMode]
      }]);
    }, 1500);
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setShowPromptLibrary(false);
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
            className="fixed inset-0 bg-foreground/20 backdrop-blur-md z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-gradient-to-b from-card via-card to-background border-l-2 border-primary/30 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Royal Decorative Header Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            {/* Header */}
            <div className="relative flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-tech/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20"
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(var(--primary), 0.2)", "0 0 30px rgba(var(--primary), 0.4)", "0 0 20px rgba(var(--primary), 0.2)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-6 h-6 text-primary" />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-card"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
                    Yugality AI
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Your Royal Legal Companion</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/10">
                  <History className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/10">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mode Selector Bar */}
            <div className="px-4 py-3 border-b border-border/30 bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Mode:</span>
                  <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                    <button
                      onClick={() => setIsAutomatic(true)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        isAutomatic 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Automatic
                    </button>
                    <button
                      onClick={() => setIsAutomatic(false)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        !isAutomatic 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Manual
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Mode Buttons */}
              <div className="flex gap-2">
                {actionModes.map((mode) => (
                  <motion.button
                    key={mode.id}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                      selectedMode === mode.id
                        ? "bg-primary/10 border-primary/50 text-primary shadow-md shadow-primary/10"
                        : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <mode.icon className={`w-5 h-5 ${selectedMode === mode.id ? "text-primary" : ""}`} />
                    <span className="text-xs font-semibold">{mode.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-gradient-to-b from-transparent to-muted/10">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg
                    ${message.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md"
                      : "bg-gradient-to-br from-card via-card to-muted/30 text-foreground border border-primary/20 rounded-bl-md"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-primary">Yugality AI</span>
                        <Star className="w-3 h-3 text-primary/50" />
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
                    <div className="bg-gradient-to-br from-card via-card to-muted/30 text-foreground border border-primary/20 rounded-2xl rounded-bl-md p-4 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Crown className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-primary">Yugality AI</span>
                      </div>
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-primary"
                            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
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
              <div className="px-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground">Quick Actions</p>
                  <button 
                    onClick={() => setShowPromptLibrary(!showPromptLibrary)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    Prompt Library
                    <ChevronDown className={`w-3 h-3 transition-transform ${showPromptLibrary ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                {/* Prompt Library Dropdown */}
                <AnimatePresence>
                  {showPromptLibrary && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 p-3 rounded-xl bg-muted/30 border border-border/50 overflow-hidden"
                    >
                      {promptLibrary.map((category, idx) => (
                        <div key={idx} className="mb-2 last:mb-0">
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">{category.category}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {category.prompts.map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handlePromptSelect(prompt)}
                                className="px-2.5 py-1 text-[11px] rounded-full bg-card border border-border/50 text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-all"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

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
                      className="p-3 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-muted/20 hover:from-primary/10 hover:to-primary/5 
                                 transition-all text-left group shadow-sm hover:shadow-md hover:shadow-primary/10"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                        <suggestion.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs font-medium text-foreground">{suggestion.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border/30 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30">
              {/* Input Row */}
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-card border border-border/50 shadow-inner">
                {/* Attachment Button */}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                {/* Input Field */}
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`${actionModes.find(m => m.id === selectedMode)?.label || 'Ask'} anything...`}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/60"
                />
                
                {/* Mic Button */}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl shrink-0"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                
                {/* Send Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                  <Button 
                    onClick={handleSend} 
                    size="icon" 
                    className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <Crown className="w-3 h-3 text-primary/50" />
                <p className="text-[10px] text-muted-foreground">
                  Powered by <span className="font-semibold text-primary">Yugality AI</span> • Private & Secure
                </p>
                <Crown className="w-3 h-3 text-primary/50" />
              </div>
            </div>

            {/* Royal Decorative Footer Border */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
