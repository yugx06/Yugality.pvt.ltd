import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuickActionsButton } from "@/components/QuickActionsButton";
import { UrgentAlertMap } from "@/components/dashboard/UrgentAlertMap";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface AlertContextType {
  showAlertPanel: boolean;
  setShowAlertPanel: (show: boolean) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlertPanel = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertPanel must be used within DashboardLayout');
  }
  return context;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [showAlertPanel, setShowAlertPanel] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 80 : 260;

  const handleEmergencyToggle = () => {
    const newState = !emergencyMode;
    setEmergencyMode(newState);
    setShowAlertPanel(newState); // Open alert panel when emergency mode is enabled
  };

  return (
    <AlertContext.Provider value={{ showAlertPanel, setShowAlertPanel }}>
      <div className={`min-h-screen bg-background relative ${emergencyMode ? "emergency-mode-active" : ""}`}>
        {/* Video Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200, 152, 56, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(200, 152, 56, 0.15) 0%, transparent 50%)'
            }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 dark:from-background/90 dark:via-background/85 dark:to-background/90" />
        </div>

        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Navbar
          sidebarWidth={sidebarWidth}
          emergencyMode={emergencyMode}
          onEmergencyToggle={handleEmergencyToggle}
          onAIAssistantToggle={setIsAIAssistantOpen}
        />
      
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="pt-16 min-h-screen relative z-10"
      >
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </motion.main>

      {/* Floating Buttons */}
      <WhatsAppButton />
      {!isAIAssistantOpen && <QuickActionsButton />}

      {/* Urgent Alert Map - Available everywhere */}
      <UrgentAlertMap />

      {/* Emergency Mode Overlay */}
      <AnimatePresence>
        {emergencyMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-destructive/3 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
};