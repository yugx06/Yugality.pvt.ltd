import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Trash2, Save, FileText } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const Notepad = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notepad-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notepad-notes", JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    toast.success("New note created");
  };

  const handleUpdateNote = (field: keyof Note, value: string) => {
    if (!activeNoteId) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId
          ? { ...note, [field]: value, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(null);
      }
      toast.success("Note deleted");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] border rounded-lg overflow-hidden bg-background shadow-sm">
        <ResizablePanelGroup direction="horizontal">
          {/* Sidebar List */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <div className="h-full flex flex-col border-r bg-muted/30">
              <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight">My Notes</h2>
                  <Button onClick={handleCreateNote} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> New
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-1 p-2">
                  {filteredNotes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No notes found</p>
                    </div>
                  ) : (
                    filteredNotes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => setActiveNoteId(note.id)}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                          activeNoteId === note.id ? "bg-accent border-primary/50" : "bg-card border-transparent"
                        )}
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold line-clamp-1">
                                {note.title || "Untitled Note"}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => handleDeleteNote(note.id, e)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="line-clamp-2 text-xs text-muted-foreground w-full">
                            {note.content.substring(0, 300) || "No additional text"}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-2">
                            <span>
                              {format(new Date(note.updatedAt), "PP p")}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Editor Area */}
          <ResizablePanel defaultSize={70}>
            {activeNote ? (
              <div className="h-full flex flex-col bg-background">
                <div className="p-6 border-b">
                  <Input
                    value={activeNote.title}
                    onChange={(e) => handleUpdateNote("title", e.target.value)}
                    className="text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground/50"
                    placeholder="Note Title"
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>Last edited {format(new Date(activeNote.updatedAt), "PP p")}</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <Save className="w-3 h-3" />
                      Saved
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <Textarea
                    value={activeNote.content}
                    onChange={(e) => handleUpdateNote("content", e.target.value)}
                    className="w-full h-full resize-none border-none shadow-none focus-visible:ring-0 p-0 text-base leading-relaxed placeholder:text-muted-foreground/40"
                    placeholder="Start typing your note here..."
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <h3 className="text-lg font-medium">Select a note to view</h3>
                <p className="text-sm">Choose a note from the list or create a new one.</p>
                <Button onClick={handleCreateNote} variant="outline" className="mt-4 gap-2">
                  <Plus className="w-4 h-4" /> Create New Note
                </Button>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DashboardLayout>
  );
};

export default Notepad;
