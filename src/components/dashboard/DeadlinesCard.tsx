import { motion } from "framer-motion";
import { AlertCircle, Calendar, Plus, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const deadlines = [
  {
    id: 1,
    title: "File Counter Affidavit",
    case: "Patel Industries vs. SEBI",
    dueDate: "Jan 4, 2026",
    daysLeft: 1,
    urgent: true,
  },
  {
    id: 2,
    title: "Submit Evidence Documents",
    case: "Singh vs. State of Maharashtra",
    dueDate: "Jan 6, 2026",
    daysLeft: 3,
    urgent: true,
  },
  {
    id: 3,
    title: "Written Arguments",
    case: "Sharma vs. National Bank",
    dueDate: "Jan 10, 2026",
    daysLeft: 7,
    urgent: false,
  },
  {
    id: 4,
    title: "Client Meeting Prep",
    case: "Kumar vs. Kumar",
    dueDate: "Jan 12, 2026",
    daysLeft: 9,
    urgent: false,
  },
];


export const DeadlinesCard = ({ emergencyMode }: { emergencyMode?: boolean }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [localDeadlines, setLocalDeadlines] = useState(deadlines);
  const [newDeadline, setNewDeadline] = useState({ title: "", case: "", date: "" });

  const handleAddDeadline = () => {
    if (newDeadline.title && newDeadline.case && newDeadline.date) {
      const dateObj = new Date(newDeadline.date);
      const today = new Date();
      const diffTime = Math.abs(dateObj.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      const deadline = {
        id: localDeadlines.length + 1,
        title: newDeadline.title,
        case: newDeadline.case,
        dueDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysLeft: diffDays,
        urgent: diffDays <= 3
      };
      
      setLocalDeadlines([...localDeadlines, deadline]);
      setNewDeadline({ title: "", case: "", date: "" });
      setShowAddDialog(false);
    }
  };

  const filteredDeadlines = localDeadlines.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.case.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const urgentDeadlines = filteredDeadlines.filter(d => d.urgent);
  const normalDeadlines = filteredDeadlines.filter(d => !d.urgent);
  
  const sortedDeadlines = emergencyMode 
    ? [...urgentDeadlines, ...normalDeadlines]
    : filteredDeadlines;

  return (
    <motion.div 
      className={`yugality-card p-6 ${emergencyMode && urgentDeadlines.length > 0 ? "yugality-card-emergency" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center
              ${urgentDeadlines.length > 0 ? "bg-destructive/10" : "bg-tech/10"}`}
            animate={urgentDeadlines.length > 0 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className={`w-5 h-5 ${urgentDeadlines.length > 0 ? "text-destructive" : "text-tech"}`} />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t("Critical Deadlines")}</h3>
            <p className="text-xs text-muted-foreground">
              {urgentDeadlines.length} {t("urgent")}, {normalDeadlines.length} {t("upcoming")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="relative w-32 md:w-40 hidden sm:block">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input 
              className="h-8 pl-7 text-xs" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedDeadlines.map((deadline, index) => (
          <motion.div
            key={deadline.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`
              p-3 rounded-lg border transition-all duration-200 cursor-pointer
              ${deadline.urgent 
                ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/50" 
                : "border-border bg-card hover:bg-muted/50 hover:border-border"
              }
            `}
          >
            {deadline.urgent && (
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate
                  ${deadline.urgent ? "text-destructive" : "text-foreground"}`}>
                  {deadline.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{deadline.case}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {deadline.dueDate}
                </div>
                <p className={`text-xs font-medium mt-1
                  ${deadline.daysLeft <= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                  {deadline.daysLeft === 1 ? t("Tomorrow") : `${deadline.daysLeft} ${t("days left")}`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>


      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Critical Deadline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input 
                placeholder="e.g. File Counter Affidavit" 
                value={newDeadline.title}
                onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Case Name</Label>
              <Input 
                placeholder="e.g. Patel Industries vs. SEBI" 
                value={newDeadline.case}
                onChange={(e) => setNewDeadline({...newDeadline, case: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input 
                type="date"
                value={newDeadline.date}
                onChange={(e) => setNewDeadline({...newDeadline, date: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddDeadline} disabled={!newDeadline.title || !newDeadline.date}>Add Deadline</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};