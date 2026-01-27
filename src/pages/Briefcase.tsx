import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, Star, MoreVertical, Folder, Plus, Info, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: number;
  name: string;
  lastUpdated: string;
  owner: string;
  starred: boolean;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  lastUpdated: string;
  fileCount: number;
}

const initialProjects: Project[] = [
  { id: 1, name: "Property Dispute Cases [updated till 24.01.2026]", lastUpdated: "Jan 24, 2026", owner: "Intern1", starred: false },
  { id: 2, name: "Corporate Agreements (Clean)", lastUpdated: "Jan 20, 2026", owner: "Intern1", starred: false },
  { id: 3, name: "Family Law Matters", lastUpdated: "Jan 18, 2026", owner: "Intern1", starred: false },
  { id: 4, name: "Criminal Defense Cases", lastUpdated: "Jan 15, 2026", owner: "Senior Partner", starred: true },
  { id: 5, name: "Employment Contracts", lastUpdated: "Jan 12, 2026", owner: "Associate", starred: false },
  { id: 6, name: "Real Estate Transactions", lastUpdated: "Jan 10, 2026", owner: "Senior Partner", starred: false },
  { id: 7, name: "Intellectual Property Files [2024 - 24.01.2026]", lastUpdated: "Jan 08, 2026", owner: "Intern1", starred: false },
  { id: 8, name: "Tax Advisory Documents (2020 - 2026)", lastUpdated: "Dec 30, 2025", owner: "Intern1", starred: false },
];

const repositories: Repository[] = [
  { id: 1, name: "Supreme Court Cases", description: "Repository of all Supreme Court Cases.", lastUpdated: "30 Sep 2025", fileCount: 357 },
  { id: 2, name: "High Court Judgments", description: "Repository of all High Court Judgments till date.", lastUpdated: "08 Oct 2025", fileCount: 512 },
  { id: 3, name: "Legal Precedents Database", description: "All Legal Precedents, Case Laws and Citations", lastUpdated: "15 Jan 2026", fileCount: 1248 },
];

const Briefcase = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const toggleStar = (id: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, starred: !p.starred } : p));
  };

  const filteredProjects = projects
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => !showStarredOnly || p.starred)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const project: Project = {
        id: projects.length + 1,
        name: newProject.name,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        owner: "You",
        starred: false
      };
      setProjects([project, ...projects]);
      setNewProject({ name: "", description: "" });
      setShowNewProjectDialog(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Briefcase</h1>
          <p className="text-lg text-muted-foreground">
            Analyze all your documents to get insights and identify trends.
          </p>
        </div>

        {/* Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/50 border border-border/50 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>Action Required: Repositories are moving, migrate your queries now</span>
          </div>
        </motion.div>

        {/* Search and Actions Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Projects, Repositories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "name")}
            className="px-4 py-2 rounded-md border border-border bg-background text-sm"
          >
            <option value="date">Date (Newest first)</option>
            <option value="name">Name (A-Z)</option>
          </select>
          <Button
            variant={showStarredOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            className="gap-2"
          >
            <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-current' : ''}`} />
            Starred
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-primary/20 hover:bg-primary/5"
          >
            <ScanText className="w-4 h-4" />
            OCR Scan
          </Button>
          <Button
            onClick={() => setShowNewProjectDialog(true)}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="border-b border-border p-4">
                  <h2 className="text-lg font-semibold text-foreground">Your Projects</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/30">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Updated</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Owner</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <motion.tr
                          key={project.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-foreground">{project.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{project.lastUpdated}</td>
                          <td className="p-4">
                            <Badge variant="secondary" className="text-xs">{project.owner}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleStar(project.id)}
                                className="h-8 w-8"
                              >
                                <Star className={`w-4 h-4 ${project.starred ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Repositories Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">Repositories</h2>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{repo.name}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Star className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last updated on: {repo.lastUpdated}</span>
                      <span>• {repo.fileCount} Files</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Open
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description (Optional)</Label>
              <Textarea
                id="project-description"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={!newProject.name.trim()}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Briefcase;
