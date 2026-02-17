import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  FileText, Upload, Search, Filter, Grid, List, FileCheck, FileClock, 
  AlertCircle, Eye, Download, Trash2, X, File, Image, FileSpreadsheet, Plus, Edit, Copy, ScanText, Folder, ChevronRight, Home, FolderPlus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

// Types
interface FolderType {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

interface DocumentType {
  id: string;
  name: string;
  case: string;
  type: string;
  status: string;
  date: string;
  size: string;
  fileType: string;
  submittedBy: string;
  submittedTo: string;
  folderId: string | null;
}

// Mock Data
const initialFolders: FolderType[] = [
  { id: "f1", name: "Client Cases", parentId: null, createdAt: new Date().toISOString() },
  { id: "f2", name: "Court Orders", parentId: null, createdAt: new Date().toISOString() },
  { id: "f3", name: "Patel Industries", parentId: "f1", createdAt: new Date().toISOString() },
  { id: "f4", name: "Sharma vs Bank", parentId: "f1", createdAt: new Date().toISOString() },
];

const initialDocuments: DocumentType[] = [
  { id: "1", name: "Counter Affidavit - Patel Industries", case: "Patel Industries vs. SEBI", type: "Affidavit", status: "pending", date: "Jan 2, 2026", size: "2.4 MB", fileType: "pdf", submittedBy: "Adv. Rajesh Kumar", submittedTo: "Client: Priya Sharma", folderId: "f3" },
  { id: "2", name: "Evidence Bundle Vol. 1", case: "Singh vs. State of Maharashtra", type: "Evidence", status: "filed", date: "Jan 1, 2026", size: "15.8 MB", fileType: "pdf", submittedBy: "Client: Amit Singh", submittedTo: "Adv. Neha Verma", folderId: "f1" },
  { id: "3", name: "Legal Opinion - Property Rights", case: "Verma Property Dispute", type: "Opinion", status: "urgent", date: "Dec 30, 2025", size: "845 KB", fileType: "docx", submittedBy: "Adv. Rajesh Kumar", submittedTo: "Client: Ravi Verma", folderId: null },
  { id: "4", name: "Settlement Agreement Draft v3", case: "Kumar vs. Kumar", type: "Agreement", status: "filed", date: "Dec 28, 2025", size: "1.2 MB", fileType: "pdf", submittedBy: "Client: Anjali Kumar", submittedTo: "Adv. Priya Sharma", folderId: null },
  { id: "5", name: "Witness Statement - Sharma", case: "Sharma vs. National Bank", type: "Statement", status: "pending", date: "Dec 26, 2025", size: "520 KB", fileType: "docx", submittedBy: "Adv. Neha Verma", submittedTo: "Court", folderId: "f4" },
  { id: "6", name: "Court Order - Interim Relief", case: "Patel Industries vs. SEBI", type: "Order", status: "filed", date: "Dec 22, 2025", size: "340 KB", fileType: "pdf", submittedBy: "Court", submittedTo: "Adv. Rajesh Kumar", folderId: "f2" },
];

const contracts = [
  { id: 1, name: "Service Agreement Template", description: "Standard service contract for client engagements", category: "Client Services", lastModified: "Jan 5, 2026", uses: 45 },
  { id: 2, name: "Non-Disclosure Agreement (NDA)", description: "Mutual and unilateral NDA templates", category: "Confidentiality", lastModified: "Jan 4, 2026", uses: 89 },
  { id: 3, name: "Employment Contract", description: "Employment agreement with standard terms", category: "Employment", lastModified: "Jan 3, 2026", uses: 23 },
  { id: 4, name: "Partnership Deed", description: "Partnership agreement for business entities", category: "Business", lastModified: "Jan 2, 2026", uses: 12 },
  { id: 5, name: "Lease Agreement", description: "Property lease contract template", category: "Property", lastModified: "Jan 1, 2026", uses: 34 },
  { id: 6, name: "Vendor Agreement", description: "Standard vendor/supplier contract", category: "Procurement", lastModified: "Dec 30, 2025", uses: 56 },
  { id: 7, name: "Sales Agreement", description: "Product/service sales contract", category: "Sales", lastModified: "Dec 29, 2025", uses: 67 },
  { id: 8, name: "Consultancy Agreement", description: "Independent consultant engagement contract", category: "Services", lastModified: "Dec 28, 2025", uses: 41 },
];

const policyTemplates = [
  { id: 1, name: "Privacy Policy", description: "GDPR and data protection compliant privacy policy", category: "Data Protection", lastModified: "Jan 6, 2026", uses: 120 },
  { id: 2, name: "Terms & Conditions", description: "Website/app terms of service template", category: "Legal", lastModified: "Jan 5, 2026", uses: 98 },
  { id: 3, name: "Refund Policy", description: "Product/service refund and return policy", category: "Commercial", lastModified: "Jan 4, 2026", uses: 76 },
  { id: 4, name: "Cookie Policy", description: "Website cookie usage and consent policy", category: "Data Protection", lastModified: "Jan 3, 2026", uses: 87 },
  { id: 5, name: "Workplace Policy", description: "Employee code of conduct and workplace rules", category: "HR", lastModified: "Jan 2, 2026", uses: 54 },
  { id: 6, name: "Anti-Harassment Policy", description: "Workplace harassment prevention policy", category: "HR", lastModified: "Jan 1, 2026", uses: 43 },
  { id: 7, name: "Data Retention Policy", description: "Data storage and deletion guidelines", category: "Data Protection", lastModified: "Dec 31, 2025", uses: 65 },
  { id: 8, name: "Acceptable Use Policy", description: "IT and internet usage policy for employees", category: "IT", lastModified: "Dec 30, 2025", uses: 52 },
  { id: 9, name: "Intellectual Property Policy", description: "IP ownership and protection guidelines", category: "Legal", lastModified: "Dec 29, 2025", uses: 38 },
  { id: 10, name: "Social Media Policy", description: "Employee social media usage guidelines", category: "HR", lastModified: "Dec 28, 2025", uses: 29 },
];

const filterOptions = ["All", "Affidavit", "Evidence", "Opinion", "Agreement", "Statement", "Order"];

const Documents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [activeSection, setActiveSection] = useState<"documents" | "contracts" | "policies">("documents");
  
  // Folder State
  const [folders, setFolders] = useState<FolderType[]>(initialFolders);
  const [documents, setDocuments] = useState<DocumentType[]>(initialDocuments);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash === "contracts") {
      setActiveSection("contracts");
    } else if (hash === "policies") {
      setActiveSection("policies");
    } else {
      setActiveSection("documents");
    }
  }, [location.hash]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Simulate file upload
      const newDocs = files.map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        case: "Unassigned",
        type: "Uploaded",
        status: "pending",
        date: format(new Date(), "MMM d, yyyy"),
        size: (file.size / 1024 / 1024).toFixed(1) + " MB",
        fileType: file.name.split('.').pop() || "unknown",
        submittedBy: "Me",
        submittedTo: "System",
        folderId: currentFolderId
      }));
      setDocuments(prev => [...newDocs, ...prev]);
      toast.success(`${files.length} file(s) uploaded successfully`);
    }
  }, [currentFolderId]);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: FolderType = {
      id: crypto.randomUUID(),
      name: newFolderName,
      parentId: currentFolderId,
      createdAt: new Date().toISOString()
    };
    setFolders([...folders, newFolder]);
    setNewFolderName("");
    setIsCreateFolderOpen(false);
    toast.success("Folder created successfully");
  };

  const getBreadcrumbs = () => {
    const crumbs = [];
    let current = folders.find(f => f.id === currentFolderId);
    while (current) {
      crumbs.unshift(current);
      current = folders.find(f => f.id === current.parentId);
    }
    return crumbs;
  };

  const getStatusBadge = (status: string) => {
    const isClient = user?.role === 'client';
    
    switch (status) {
      case "filed":
        return <span className="status-filed flex items-center gap-1">
          <FileCheck className="w-3 h-3" /> 
          {isClient ? "Submitted to Lawyer" : "Filed"}
        </span>;
      case "pending":
        return <span className="status-pending flex items-center gap-1">
          <FileClock className="w-3 h-3" /> 
          {isClient ? "Awaiting Upload" : "Pending Review"}
        </span>;
      case "urgent":
        return <span className="status-urgent flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> 
          {isClient ? "Urgent - Action Required" : "Urgent"}
        </span>;
      default:
        return null;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf": return <FileText className="w-5 h-5 text-destructive/70" />;
      case "docx": return <File className="w-5 h-5 text-tech" />;
      case "xlsx": return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case "image": return <Image className="w-5 h-5 text-primary" />;
      case "folder": return <Folder className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />;
      default: return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  // Filter Logic
  const currentFolders = folders.filter(f => f.parentId === currentFolderId);
  const currentDocs = documents.filter(d => d.folderId === currentFolderId);
  
  // Search Logic
  const isSearching = searchQuery.length > 0;
  
  const filteredFolders = isSearching 
    ? folders.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentFolders;

  const filteredDocs = isSearching
    ? documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              doc.case.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === "All" || doc.type === activeFilter;
        return matchesSearch && matchesFilter;
      })
    : currentDocs.filter(doc => {
        const matchesFilter = activeFilter === "All" || doc.type === activeFilter;
        return matchesFilter;
      });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {activeSection === "contracts" ? "Contract Templates" : 
               activeSection === "policies" ? "Policy Templates" : "Documents"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {activeSection === "contracts" ? "Ready-to-use contract templates for various legal needs" : 
               activeSection === "policies" ? "Standard policy templates for compliance and governance" : 
               "Manage and organize your legal documents"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
              <ScanText className="w-4 h-4" /> 
              OCR Scan
            </Button>
            {activeSection === "documents" && (
              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <FolderPlus className="w-4 h-4" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="folder-name">Folder Name</Label>
                    <Input
                      id="folder-name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Enter folder name..."
                      className="mt-2"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateFolder}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button className="yugality-button-gold gap-2">
              <Upload className="w-4 h-4" /> 
              {activeSection === "contracts" ? "New Contract" : 
               activeSection === "policies" ? "New Policy" : "Upload Document"}
            </Button>
          </div>
        </motion.div>

        {/* Section Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 border-b border-border pb-4"
        >
          <Button 
            variant={activeSection === "documents" ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate("/documents")}
            className={activeSection === "documents" ? "bg-primary" : ""}
          >
            <FileText className="w-4 h-4 mr-2" />
            All Documents
          </Button>
          <Button 
            variant={activeSection === "contracts" ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate("/documents#contracts")}
            className={activeSection === "contracts" ? "bg-primary" : ""}
          >
            <File className="w-4 h-4 mr-2" />
            Contracts
          </Button>
          <Button 
            variant={activeSection === "policies" ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate("/documents#policies")}
            className={activeSection === "policies" ? "bg-primary" : ""}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Policy Templates
          </Button>
        </motion.div>

        {/* Documents Section */}
        {activeSection === "documents" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
        {/* Filters & Search & Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="yugality-card p-4 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search documents and folders..." 
                className="pl-10 bg-muted/30 border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`gap-2 border-border/50 transition-colors ${showFilters ? 'bg-primary/10 text-primary border-primary/30' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <div className="flex border border-border/50 rounded-lg overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {!isSearching && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pb-2 overflow-x-auto">
              <button 
                onClick={() => setCurrentFolderId(null)}
                className="flex items-center hover:text-primary transition-colors whitespace-nowrap"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </button>
              {getBreadcrumbs().map((folder) => (
                <div key={folder.id} className="flex items-center whitespace-nowrap">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <button 
                    onClick={() => setCurrentFolderId(folder.id)}
                    className="hover:text-primary transition-colors"
                  >
                    {folder.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Filter Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30"
              >
                {filterOptions.map((filter, index) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeFilter === filter 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Upload Zone - Drag & Drop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
            ${isDragging 
              ? "border-primary bg-primary/10 scale-[1.02] shadow-[var(--shadow-gold-glow)]" 
              : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
            }`}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={isDragging ? { y: [0, -8, 0], scale: 1.1 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            >
              <Upload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </motion.div>
            <p className={`font-medium mb-1 transition-colors ${isDragging ? 'text-primary' : 'text-foreground'}`}>
              {isDragging ? "Drop files to upload" : "Drop files here or click to upload"}
            </p>
            <p className="text-muted-foreground text-sm">
              Uploading to: {currentFolderId ? folders.find(f => f.id === currentFolderId)?.name : "Home"}
            </p>
          </div>
        </motion.div>

        {/* Combined View (Folders + Files) */}
        {filteredFolders.length === 0 && filteredDocs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No items found in this location.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={viewMode === "list" ? "yugality-card overflow-hidden" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}
          >
            {/* List View */}
            {viewMode === "list" && (
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Type/Case</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {/* Folders */}
                  {filteredFolders.map((folder, index) => (
                    <motion.tr
                      key={folder.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                      className="transition-colors cursor-pointer group"
                      onClick={() => setCurrentFolderId(folder.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Folder className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                          <span className="text-sm font-medium text-foreground">{folder.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">Folder</span>
                      </td>
                      <td className="px-6 py-4">--</td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                         <span className="text-sm text-muted-foreground">{format(new Date(folder.createdAt), "MMM d, yyyy")}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <ChevronRight className="w-4 h-4" />
                         </Button>
                      </td>
                    </motion.tr>
                  ))}
                  {/* Documents */}
                  {filteredDocs.map((doc, index) => (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (filteredFolders.length * 0.05) + index * 0.05 }}
                      whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                      className="transition-colors cursor-pointer group"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.fileType)}
                          <div>
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{doc.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-muted-foreground">{doc.case}</p>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <p className="text-sm text-muted-foreground">{doc.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <>
                {filteredFolders.map((folder, index) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="yugality-card-interactive p-4 cursor-pointer bg-muted/20"
                    onClick={() => setCurrentFolderId(folder.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Folder className="w-10 h-10 text-yellow-500 fill-yellow-500/20" />
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">{folder.name}</h4>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Folder • {format(new Date(folder.createdAt), "MMM d, yyyy")}
                    </div>
                  </motion.div>
                ))}
                {filteredDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (filteredFolders.length * 0.05) + index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="yugality-card-interactive p-4 cursor-pointer"
                    onClick={() => setSelectedDoc(doc)}
                  >
                     <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        {getFileIcon(doc.fileType)}
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{doc.case}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>{doc.date}</span>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        )}

        {/* Document Preview Drawer */}
        <AnimatePresence>
          {selectedDoc && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
                onClick={() => setSelectedDoc(null)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Document Preview</h2>
                    <Button size="icon" variant="ghost" onClick={() => setSelectedDoc(null)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Document Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                        {getFileIcon(selectedDoc.fileType)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{selectedDoc.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedDoc.size}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Case</p>
                        <p className="text-sm font-medium text-foreground">{selectedDoc.case}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Type</p>
                        <p className="text-sm font-medium text-foreground">{selectedDoc.type}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <div>{getStatusBadge(selectedDoc.status)}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p className="text-sm font-medium text-foreground">{selectedDoc.date}</p>
                      </div>
                    </div>

                    {/* Preview Area */}
                    <div className="aspect-[3/4] rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Document preview would appear here</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button className="flex-1 yugality-button-gold gap-2">
                        <Download className="w-4 h-4" /> Download
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 border-border/50">
                        <Eye className="w-4 h-4" /> Open
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
          </motion.div>
        )}

        {/* Layout for Contracts/Policies remains the same (omitted for brevity, assume they handle their own sections) */}
        {activeSection === "contracts" && (
            // ... (Previous implementation for contracts)
             <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-5 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{contract.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{contract.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">{contract.category}</span>
                      <span className="text-muted-foreground">{contract.uses} uses</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Modified {contract.lastModified}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Create New Contract Template
              </Button>
            </div>
          </motion.div>
        )}

        {activeSection === "policies" && (
            // ... (Previous implementation for policies)
             <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {policyTemplates.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-5 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{policy.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{policy.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">{policy.category}</span>
                      <span className="text-muted-foreground">{policy.uses} uses</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Modified {policy.lastModified}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Create New Policy Template
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Documents;