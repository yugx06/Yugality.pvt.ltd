import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Search, Trash2, Plus, Calendar, ArrowUpDown, Filter, 
  FileText, Download, MoreHorizontal, MessageSquare, Link as LinkIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
interface ChronologyEvent {
  id: string;
  date: Date;
  displayDate: string;
  description: string;
  source: string;
  issues: string[];
}

const initialEvents: ChronologyEvent[] = [
  {
    id: "1",
    date: new Date("1960-10-05"),
    displayDate: "October 5, 1960",
    description: "Hakam Singh agreed to perform certain construction work for M/S. Gammon (India) Ltd. under a written tender. The tender included clauses specifying arbitration and jurisdiction, stating that disputes would be referred to arbitration under the Arbitration Act of 1940 and that the courts in Bombay would have jurisdiction.",
    source: "Hakam Singh v. Gammon (India) Ltd.",
    issues: ["Order 7 Rule 10- Territorial jurisdiction"]
  },
  {
    id: "2",
    date: new Date("1961-05-04"),
    displayDate: "May 4, 1961",
    description: "The decision in the case of Hira Lal Patni v. Kali Nath was delivered by the Supreme Court of India. The bench comprised B.P. Sinha, C.J., and Justices K. Subba Rao, Raghubar Dayal, and J.R. Mudholkar. This case addressed the nature and scope of Section 21 of the Civil Procedure Code, 1908.",
    source: "Hira Lal Patni v. Kali Nath",
    issues: ["Order 7 Rule 10- Territorial jurisdiction"]
  },
  {
    id: "3",
    date: new Date("1962-09-12"),
    displayDate: "September 12, 1962",
    description: "In the landmark judgment of Globe Transport Corporation v. Triveni Engineering Works, the court held that where the parties purely by agreement confer jurisdiction on a court which otherwise does not have jurisdiction, such agreement is void.",
    source: "Globe Transport Corp. v. Triveni Engineering",
    issues: ["Jurisdiction", "Contract Law"]
  },
  {
    id: "4",
    date: new Date("1971-03-22"),
    displayDate: "March 22, 1971",
    description: "The appellant filed a suit for recovery of damages for breach of contract. The respondent raised a preliminary objection regarding the territorial jurisdiction of the court based on the exclusion clause in the contract.",
    source: "ABC Laminart Pvt. Ltd. v. AP Agencies",
    issues: ["Breach of Contract"]
  }
];

const Chronology = () => {
  const [events, setEvents] = useState<ChronologyEvent[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter Logic
  const filteredEvents = events.filter(event => 
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.issues.some(issue => issue.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort Logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return sortOrder === "asc" 
      ? a.date.getTime() - b.date.getTime() 
      : b.date.getTime() - a.date.getTime();
  });

  const toggleSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === sortedEvents.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedEvents.map(e => e.id));
    }
  };

  const handleDelete = (id?: string) => {
    if (id) {
      setEvents(events.filter(e => e.id !== id));
    } else {
      // Delete selected
      setEvents(events.filter(e => !selectedRows.includes(e.id)));
      setSelectedRows([]);
    }
  };

  const handleAddIssue = (id: string) => {
    // Mock functionality
    alert(`Add issue for event ${id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-2rem)] p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Chronologies</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Project Epidote - 10/06/2025</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Project Epidote - 10/06/2025</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" /> Documents
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Results
              </Button>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search" 
                  className="pl-9 h-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <Button variant="destructive" size="sm" onClick={() => handleDelete()} className="gap-2">
                <Trash2 className="w-4 h-4" /> Delete ({selectedRows.length})
              </Button>
            )}
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add Issues
            </Button>
            <Button variant="secondary" size="sm" className="gap-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">
              <Calendar className="w-4 h-4" /> Consolidate Dates
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card overflow-hidden flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
              <tr>
                <th className="p-4 w-12">
                  <Checkbox 
                    checked={selectedRows.length === sortedEvents.length && sortedEvents.length > 0} 
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="p-4 w-40 cursor-pointer hover:text-foreground" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  <div className="flex items-center gap-2">
                    Date
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4">Event</th>
                <th className="p-4 w-48">Source</th>
                <th className="p-4 w-48">Issue</th>
                <th className="p-4 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {sortedEvents.map((event) => (
                  <motion.tr 
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`hover:bg-muted/30 transition-colors group ${selectedRows.includes(event.id) ? "bg-muted/30" : ""}`}
                  >
                    <td className="p-4 align-top">
                      <Checkbox 
                        checked={selectedRows.includes(event.id)}
                        onCheckedChange={() => toggleSelection(event.id)}
                      />
                    </td>
                    <td className="p-4 align-top font-medium whitespace-nowrap">
                      {event.displayDate}
                    </td>
                    <td className="p-4 align-top">
                      <p className="leading-relaxed text-foreground/90">
                        {event.description}
                      </p>
                    </td>
                    <td className="p-4 align-top">
                      <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary gap-1 decoration-blue-500/30 underline-offset-4">
                        <LinkIcon className="w-3 h-3" />
                        <span className="truncate max-w-[150px] inline-block align-bottom">{event.source}</span>
                      </Button>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col gap-2 items-start">
                        {event.issues.map((issue, idx) => (
                          <Badge key={idx} variant="outline" className="bg-background font-normal border-border/60 text-muted-foreground whitespace-normal text-left">
                            {issue}
                          </Badge>
                        ))}
                        <button 
                          onClick={() => handleAddIssue(event.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {sortedEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>No events found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chronology;
