import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bot, Send, Sparkles, FileText, Scale, BookOpen, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const suggestions = [
  { icon: FileText, label: "Summarize a document", prompt: "Summarize the key points of my latest case document" },
  { icon: Scale, label: "Find relevant case law", prompt: "Find Supreme Court rulings related to property disputes" },
  { icon: BookOpen, label: "Draft a legal notice", prompt: "Help me draft a legal notice for breach of contract" },
  { icon: Lightbulb, label: "Strategy suggestions", prompt: "What are the best strategies for my current case?" },
];

const sampleMessages = [
  { role: "assistant", content: "Hello! I'm your AI legal assistant. I can help you with document summaries, case research, drafting, and strategic insights. How can I assist you today?" },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I understand you're asking about legal matters. In a production environment, I would analyze your query and provide detailed, contextual legal assistance. How else can I help?"
      }]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 rounded-xl bg-tech/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-tech" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              AI Assistant
              <Sparkles className="w-5 h-5 text-tech" />
            </h1>
            <p className="text-muted-foreground text-sm">Your intelligent legal companion</p>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 yugality-card flex flex-col overflow-hidden"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-dark">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl
                  ${message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-tech/10 text-foreground border border-tech/20 rounded-bl-md"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-tech">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs font-medium">Yugality AI</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground mb-3">Quick actions</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => setInput(suggestion.prompt)}
                    className="p-3 rounded-lg border border-tech/20 bg-tech/5 hover:bg-tech/10 
                               transition-colors text-left group"
                  >
                    <suggestion.icon className="w-4 h-4 text-tech mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-foreground">{suggestion.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your cases..."
                className="bg-card border-border/50 focus:border-tech/50"
              />
              <Button onClick={handleSend} className="yugality-button-gold px-6">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Powered by Yugality AI • Your conversations are private and secure
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
