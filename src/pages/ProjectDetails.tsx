import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  ArrowLeft, Search, MoreVertical, Folder, Plus, FileText, 
  Bot, Sparkles, Send, Paperclip, Mic, HelpCircle, Check,
  ChevronRight, ChevronDown, Split
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock Data
const projectData = {
  1: { name: "Property Dispute Cases", lastUpdated: "Jan 24, 2026", owner: "Intern1" },
  2: { name: "Corporate Agreements (Clean)", lastUpdated: "Jan 20, 2026", owner: "Intern1" },
  3: { name: "Family Law Matters", lastUpdated: "Jan 18, 2026", owner: "Intern1" },
  4: { name: "Criminal Defense Cases", lastUpdated: "Jan 15, 2026", owner: "Senior Partner" },
  5: { name: "Employment Contracts", lastUpdated: "Jan 12, 2026", owner: "Associate" },
  6: { name: "Real Estate Transactions", lastUpdated: "Jan 10, 2026", owner: "Senior Partner" },
  7: { name: "Intellectual Property Files", lastUpdated: "Jan 08, 2026", owner: "Intern1" },
  8: { name: "Tax Advisory Documents", lastUpdated: "Dec 30, 2025", owner: "Intern1" },
};

const mockDocuments = [
  { id: 1, name: "Case_Summary_v1.pdf", type: "PDF", date: "Jan 24, 2026", size: "2.4 MB" },
  { id: 2, name: "Evidence_List.xlsx", type: "Excel", date: "Jan 23, 2026", size: "1.1 MB" },
  { id: 3, name: "Witness_Statements.docx", type: "Word", date: "Jan 22, 2026", size: "856 KB" },
  { id: 4, name: "Property_Deed_Scan.pdf", type: "PDF", date: "Jan 20, 2026", size: "5.2 MB" },
  { id: 5, name: "Court_Notice_Reply.docx", type: "Word", date: "Jan 18, 2026", size: "124 KB" },
  { id: 6, name: "Hearing_Transcripts.txt", type: "Text", date: "Jan 15, 2026", size: "45 KB" },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = Number(id);
  const project = projectData[projectId as keyof typeof projectData] || { name: "Unknown Project", lastUpdated: "-", owner: "-" };

  const [activeTab, setActiveTab] = useState("documents");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: "assistant", content: "Hello! I've analyzed the documents in this project. You can ask me questions like 'Summarize the key evidence' or 'Draft a reply based on the court notice'. Select documents on the left to focus my answer." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggleDoc = (docId: number) => {
    setSelectedDocs(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Based on the selected documents, specifically 'Case_Summary_v1.pdf', the main point of contention is the boundary dispute on the northern side of the property.",
        "According to 'Witness_Statements.docx', the key witness mentioned seeing the agreement being signed on the 15th of June.",
        "I've drafted a rough response based on the styling in 'Court_Notice_Reply.docx'. It addresses the three main allegations raised.",
        "The 'Evidence_List.xlsx' shows we are missing the original stamped receipt for the transaction in 2020."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/briefcase')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              {project.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {project.lastUpdated} • Owner: {project.owner}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
             <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Add Document
            </Button>
            <Button className="yugality-button-gold gap-2">
              <Sparkles className="w-4 h-4" /> AI Insights
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-fit">
            <TabsTrigger value="documents" className="gap-2"><Folder className="w-4 h-4"/> Documents</TabsTrigger>
            <TabsTrigger value="notebook" className="gap-2"><Bot className="w-4 h-4"/> Notebook (AI)</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="flex-1 overflow-auto mt-4">
             <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Size</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{doc.name}</span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{doc.type}</td>
                        <td className="p-4 text-sm text-muted-foreground">{doc.date}</td>
                        <td className="p-4 text-sm text-muted-foreground">{doc.size}</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notebook" className="flex-1 flex gap-4 overflow-hidden mt-4">
            
            {/* Left Panel: Sources */}
            <Card className="w-1/3 flex flex-col overflow-hidden border-primary/20">
              <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Split className="w-4 h-4 text-primary" /> Sources
                  </h3>
                  <p className="text-xs text-muted-foreground">Select content for AI context</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {selectedDocs.length} Selected
                </Badge>
              </div>
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                  {mockDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedDocs.includes(doc.id) 
                          ? "bg-primary/5 border-primary/40 shadow-sm" 
                          : "bg-card border-border hover:bg-muted/50"
                      }`}
                      onClick={() => handleToggleDoc(doc.id)}
                    >
                      <Checkbox 
                        checked={selectedDocs.includes(doc.id)}
                        onCheckedChange={() => handleToggleDoc(doc.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 overflow-hidden">
                        <p className={`text-sm font-medium truncate ${selectedDocs.includes(doc.id) ? "text-primary" : "text-foreground"}`}>
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{doc.type}</Badge>
                          <span className="text-[10px] text-muted-foreground">{doc.date}</span>
                        </div>
                      </div>
                      {selectedDocs.includes(doc.id) && (
                        <Check className="w-4 h-4 text-primary mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Right Panel: AI Chat */}
            <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 bg-gradient-to-br from-card to-muted/10">
               <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                 <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Project Notebook AI
                  </h3>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                    <HelpCircle className="w-3 h-3" /> Guide
                  </Button>
               </div>

               {/* Messages Area */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.map((msg, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                     <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
                       msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-border rounded-bl-none"
                     }`}>
                       {msg.role === 'assistant' && (
                         <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-primary">
                           <Bot className="w-3 h-3" /> Yugality AI
                         </div>
                       )}
                       <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                     </div>
                   </motion.div>
                 ))}
                 {isTyping && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                     <div className="bg-card border border-border p-3 rounded-xl rounded-bl-none shadow-sm">
                       <div className="flex gap-1">
                         <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                         <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                         <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                       </div>
                     </div>
                   </motion.div>
                 )}
                 <div ref={messagesEndRef} />
               </div>

               {/* Input Area */}
               <div className="p-4 border-t border-border bg-background">
                 <div className="relative flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input 
                      placeholder="Ask questions about the selected sources..." 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="pr-10"
                    />
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {input.length}/2000
                    </div>
                    <Button 
                      onClick={handleSend} 
                      disabled={!input.trim()}
                      size="icon" 
                      className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {input.trim() ? <Send className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                 </div>
                 <div className="flex justify-center mt-2">
                   <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                     <Sparkles className="w-3 h-3 text-primary" /> AI responses are generated from project documents
                   </p>
                 </div>
               </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
