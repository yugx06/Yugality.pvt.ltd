import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuickActionsButton } from "@/components/QuickActionsButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 80 : 260;

  return (
    <div className={`min-h-screen bg-background ${emergencyMode ? "emergency-mode-active" : ""}`}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Navbar
        sidebarWidth={sidebarWidth}
        emergencyMode={emergencyMode}
        onEmergencyToggle={() => setEmergencyMode(!emergencyMode)}
      />
      
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="pt-16 min-h-screen"
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
      <QuickActionsButton />

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
  );
};