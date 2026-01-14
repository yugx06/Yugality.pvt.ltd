import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bot, Send, Sparkles, FileText, Scale, BookOpen, Lightbulb, MessageSquare, Search, PenTool, ChevronDown, Settings, History, Star, Paperclip, Mic, Clock, Users, Wand2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

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

const AIAssistant = () => {
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
        "I've conducted comprehensive research on this matter. Here are the relevant Supreme Court and High Court decisions that may be applicable to your case. I've also identified potential arguments and counter-arguments based on precedents.",
        "I've prepared a detailed draft based on your requirements. The document includes all necessary legal provisions, standard clauses, and customizable sections. Please review and let me know if you need any modifications.",
        "Based on the case facts provided, here's a strategic analysis: The strengths of your position include [X, Y, Z], while potential challenges involve [A, B]. I recommend focusing on these key legal arguments...",
        "I've reviewed the document thoroughly. Key observations: [1] Risk areas identified, [2] Suggested amendments, [3] Additional clauses recommended for protection. Would you like detailed explanations for any section?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        role: "assistant",
        content: randomResponse
      }]);
    }, 1500);
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setShowPromptLibrary(false);
  };


  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-tech/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20"
              animate={{ 
                boxShadow: ["0 0 15px rgba(var(--primary), 0.2)", "0 0 25px rgba(var(--primary), 0.3)", "0 0 15px rgba(var(--primary), 0.2)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-5 h-5 text-primary" />
              <motion.div 
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-card"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                Yugality AI
                <Sparkles className="w-4 h-4 text-primary" />
              </h1>
              <p className="text-muted-foreground text-xs">Your Royal Legal Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-9 border-border/50 hover:bg-muted">
              <Bot className="w-4 h-4" />
              Get Lawyer Support
            </Button>
            <Button size="sm" className="gap-2 h-9 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Draft
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/10">
              <History className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 relative yugality-card flex flex-col overflow-hidden bg-gradient-to-b from-card via-card to-background border-2 border-primary/30"
        >
          {/* Royal Decorative Header Border */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-gradient-to-b from-transparent to-muted/10">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-lg
                  ${message.role === "user"
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md"
                    : "bg-gradient-to-br from-card via-card to-muted/30 text-foreground border border-primary/20 rounded-bl-md"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-[11px] font-semibold text-primary">Yugality AI</span>
                      <Star className="w-2.5 h-2.5 text-primary/50" />
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
                  <div className="bg-gradient-to-br from-card via-card to-muted/30 text-foreground border border-primary/20 rounded-2xl rounded-bl-md p-3.5 shadow-lg">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-[11px] font-semibold text-primary">Yugality AI</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
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
            <div className="px-4 pb-2.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Quick Actions</p>
                <button 
                  onClick={() => setShowPromptLibrary(!showPromptLibrary)}
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3 h-3" />
                  Prompt Library
                  <ChevronDown className={`w-3 h-3 transition-transform ${showPromptLibrary ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Enhanced Prompt Library Dropdown */}
              <AnimatePresence>
                {showPromptLibrary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-3 p-3 rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 border border-primary/20 overflow-hidden shadow-inner"
                  >
                    {promptLibrary.map((category, idx) => (
                      <div key={idx} className="mb-3 last:mb-0">
                        <div className="flex items-center gap-1.5 mb-2">
                          <category.icon className="w-3.5 h-3.5 text-primary" />
                          <p className="text-[11px] font-bold text-foreground tracking-wide">{category.category}</p>
                        </div>
                        <div className="space-y-1.5">
                          {category.prompts.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handlePromptSelect(prompt)}
                              className="w-full text-left px-3 py-2 text-[11px] rounded-lg bg-card/80 border border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all flex items-start gap-2 group"
                            >
                              <Sparkles className="w-3 h-3 text-primary/60 group-hover:text-primary mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{prompt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInput(suggestion.prompt)}
                    className="p-2.5 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-muted/20 hover:from-primary/10 hover:to-primary/5 
                               transition-all text-left group shadow-sm hover:shadow-md hover:shadow-primary/10"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5 group-hover:bg-primary/20 transition-colors">
                      <suggestion.icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-[11px] font-medium text-foreground leading-tight">{suggestion.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-border/30 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30">
            {/* Input Row */}
            <div className="flex items-end gap-2">
              <div className="flex-1 flex items-center gap-2 p-1.5 rounded-xl bg-card border border-border/50 shadow-inner">
                {/* Attachment Button */}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg shrink-0"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </Button>
                
                {/* Input Field */}
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything about law, cases, or documents..."
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/60 h-9"
                />
                
                {/* Mic Button */}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg shrink-0"
                >
                  <Mic className="w-3.5 h-3.5" />
                </Button>
                
                {/* Enhance Prompt Button */}
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={handleEnhancePrompt}
                  disabled={!input.trim()}
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Enhance your prompt"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              
              {/* Send Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                <Button 
                  onClick={handleSend} 
                  size="icon" 
                  className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Sparkles className="w-2.5 h-2.5 text-primary/50" />
              <p className="text-[10px] text-muted-foreground">
                Powered by <span className="font-semibold text-primary">Yugality AI</span> • Private & Secure
              </p>
              <Sparkles className="w-2.5 h-2.5 text-primary/50" />
            </div>
          </div>

          {/* Royal Decorative Footer Border */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
