import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, FileText, Calendar, Users, Scale, Bot, X, StickyNote, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const QuickActionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const actions = [
    { icon: FileText, label: "New Document", color: "bg-blue-600", onClick: () => {} },
    { icon: Calendar, label: "Add Event", color: "bg-purple-600", onClick: () => {} },
    { icon: Users, label: "New Client", color: "bg-green-600", onClick: () => {} },
    { icon: Scale, label: "New Case", color: "bg-amber-600", onClick: () => {} },
    { icon: StickyNote, label: "Quick Note", color: "bg-yellow-500", onClick: () => { setShowNotepad(true); setIsOpen(false); } },
    { icon: Bot, label: "Ask AI", color: "bg-gradient-to-br from-indigo-600 to-purple-600", onClick: () => {} },
  ];

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      setSavedNotes([...savedNotes, noteContent]);
      setNoteContent("");
      setShowNotepad(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <>
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    y: -(index + 1) * 60,
                    scale: 1 
                  }}
                  exit={{ opacity: 0, y: 0, scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    damping: 20, 
                    stiffness: 300,
                    delay: index * 0.05 
                  }}
                  whileHover={{ scale: 1.1, x: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                  className="absolute bottom-0 right-0 flex items-center gap-3 group"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    {action.label}
                  </motion.span>
                  <div className={`w-12 h-12 rounded-full ${action.color} shadow-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-14 h-14 rounded-full bg-black shadow-lg flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Notepad Dialog */}
      <Dialog open={showNotepad} onOpenChange={setShowNotepad}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-black flex items-center gap-2">
              <StickyNote className="w-6 h-6 text-yellow-500" />
              Quick Notes
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Jot down quick notes, case reminders, or important points
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Textarea
              placeholder="Type your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[200px] border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 resize-none"
            />
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {noteContent.length} characters
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => { setShowNotepad(false); setNoteContent(""); }}
                  className="border-gray-300 text-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveNote}
                  disabled={!noteContent.trim()}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </div>

            {/* Saved Notes */}
            {savedNotes.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-black mb-3">Recent Notes</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {savedNotes.slice().reverse().map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700"
                    >
                      {note}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};