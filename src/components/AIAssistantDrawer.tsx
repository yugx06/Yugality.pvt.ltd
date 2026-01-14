import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, FileText, Scale, BookOpen, Lightbulb, X, Minimize2, Plus, Paperclip, Mic, MessageSquare, Search, PenTool, ChevronDown, Settings, History, Star, Clock, Users, Wand2 } from "lucide-react";
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
  { 
    category: "Document Drafting", 
    icon: PenTool,
    prompts: [
      "Draft a comprehensive legal notice for payment recovery with statutory provisions",
      "Create a detailed employment contract with non-compete and confidentiality clauses",
      "Prepare a partnership deed with profit-sharing and dissolution terms",
      "Draft a power of attorney for property transactions",
      "Write a cease and desist letter for trademark infringement",
      "Create a memorandum of understanding for business collaboration",
      "Draft a rental agreement with maintenance and termination clauses"
    ] 
  },
  { 
    category: "Legal Research", 
    icon: Search,
    prompts: [
      "Analyze recent Supreme Court judgments on property disputes and adverse possession",
      "Research amendments to labor laws regarding employee termination",
      "Find precedents for trademark infringement cases in the IT sector",
      "Analyze case laws on Section 138 NI Act for cheque bounce cases",
      "Research judicial interpretation of Force Majeure in contract law",
      "Find relevant citations for domestic violence protection orders",
      "Analyze recent cyber crime legislation and landmark judgments"
    ] 
  },
  { 
    category: "Contract Review", 
    icon: FileText,
    prompts: [
      "Analyze this contract for potential risks, liabilities, and unfavorable clauses",
      "Review this NDA for loopholes and suggest improvements",
      "Examine this service agreement and identify areas of concern",
      "Redline this partnership agreement with suggested modifications",
      "Review this licensing agreement for intellectual property protection",
      "Analyze this loan agreement for hidden charges and penalties",
      "Check this employment contract for compliance with labor laws"
    ] 
  },
  { 
    category: "Case Strategy", 
    icon: Lightbulb,
    prompts: [
      "Develop a comprehensive litigation strategy for a property dispute case",
      "Create a defense strategy for a criminal case with circumstantial evidence",
      "Plan a negotiation approach for an out-of-court settlement",
      "Design a mediation strategy for a family law dispute",
      "Formulate arguments for anticipatory bail application",
      "Create examination and cross-examination questions for key witnesses",
      "Develop a strategy for challenging an arbitral award"
    ] 
  },
  { 
    category: "Case Analysis", 
    icon: Scale,
    prompts: [
      "Analyze the strengths and weaknesses of my civil suit case",
      "Evaluate the probability of success in this criminal appeal",
      "Identify potential challenges in this divorce settlement case",
      "Assess the risk factors in this corporate litigation",
      "Analyze the evidence quality in this insurance claim dispute",
      "Evaluate the legal grounds for filing a writ petition",
      "Review the chances of success in this consumer complaint"
    ] 
  },
  { 
    category: "Client Communication", 
    icon: Users,
    prompts: [
      "Draft an email to client explaining case status and next steps",
      "Write a formal letter to opposing counsel for settlement discussions",
      "Create a client advisory on recent legal developments affecting their business",
      "Prepare a fee agreement letter with payment terms and scope of work",
      "Draft a notice to client regarding upcoming court hearing",
      "Write a status update on pending litigation matters",
      "Create a client briefing document for complex legal procedures"
    ] 
  },
  { 
    category: "Recent Client Requests", 
    icon: Clock,
    prompts: [
      "Summarize key provisions of the new Data Protection Act 2023",
      "Explain the process of filing a PIL in High Court with requirements",
      "Guide on trademark registration process and timeline in India",
      "Explain GST implications for e-commerce businesses",
      "Summarize rights of accused under criminal procedure code",
      "Explain the procedure for company incorporation under Companies Act",
      "Guide on property registration and stamp duty requirements"
    ] 
  },
  { 
    category: "Most Popular", 
    icon: Star,
    prompts: [
      "Create a comprehensive case brief with facts, issues, arguments, and precedents",
      "Draft a petition for anticipatory bail with grounds and case laws",
      "Prepare written submissions for final arguments in civil suit",
      "Analyze this judgment and extract key legal principles and ratios",
      "Draft a reply to legal notice with point-by-point rebuttal",
      "Create a detailed chronology of events for case documentation",
      "Prepare a legal opinion on contractual obligations and breach"
    ] 
  }
];

const sampleMessages = [
  { role: "assistant", content: "Welcome to Yugality AI Legal Assistant. I'm here to help you with legal research, document drafting, and case analysis. How may I assist you today?" },
];

export const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEnhancePrompt = () => {
    if (!input.trim()) return;
    
    // Enhance the prompt by making it more detailed and professional
    const enhancements = [
      `Please provide a comprehensive analysis of: ${input}. Include relevant statutory provisions, case law precedents, and practical implications.`,
      `I need detailed guidance on: ${input}. Please cover all legal aspects, applicable laws, procedural requirements, and strategic recommendations.`,
      `Regarding ${input}, please provide an in-depth legal analysis with citations, precedents, risk assessment, and step-by-step guidance.`,
      `I require professional assistance with: ${input}. Please include relevant sections of law, landmark judgments, compliance requirements, and best practices.`
    ];
    
    const enhanced = enhancements[Math.floor(Math.random() * enhancements.length)];
    setInput(enhanced);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Based on your query, I've analyzed the relevant legal provisions. The key points to consider are the applicable statutes, recent amendments, and their interpretations in similar cases. Would you like me to elaborate on any specific aspect?",
        "I've reviewed this matter carefully. Here's a comprehensive analysis with relevant case law references, statutory provisions, and practical recommendations for proceeding with your case.",
        "After analyzing your request, I can provide detailed guidance. This involves multiple legal considerations including procedural requirements, substantive law provisions, and strategic approaches. Let me break this down for you."
      ];
      setMessages(prev => [...prev, {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 2000);
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
                  <Bot className="w-6 h-6 text-primary" />
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
                <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs border-border/50 hover:bg-muted hidden md:flex">
                  <Bot className="w-3.5 h-3.5" />
                  Get Lawyer Support
                </Button>
                <Button size="sm" className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 hidden md:flex">
                  <Plus className="w-3.5 h-3.5" />
                  New Draft
                </Button>
                <div className="w-px h-6 bg-border mx-1 hidden md:block" />
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
                          <Bot className="w-3 h-3 text-primary" />
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
                          <Bot className="w-3 h-3 text-primary" />
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
                  placeholder="Ask anything about your legal matters..."
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
                
                {/* Enhance Prompt Button */}
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={handleEnhancePrompt}
                  disabled={!input.trim()}
                  className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Enhance your prompt"
                >
                  <Wand2 className="w-4 h-4" />
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
                <Sparkles className="w-3 h-3 text-primary/50" />
                <p className="text-[10px] text-muted-foreground">
                  Powered by <span className="font-semibold text-primary">Yugality AI</span> • Private & Secure
                </p>
                <Sparkles className="w-3 h-3 text-primary/50" />
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
