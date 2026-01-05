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

  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  return (
    <div className={`min-h-screen bg-background royal-pattern ${emergencyMode ? "emergency-mode-active" : ""}`}>
      {/* Background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-royal/[0.02]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-royal/5 rounded-full blur-3xl" />
      </div>

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
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="pt-16 min-h-screen relative z-10"
      >
        <motion.div 
          className="p-6 lg:p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-destructive/5 to-transparent" />
            <div className="absolute inset-0 animate-pulse-subtle" style={{
              background: "radial-gradient(circle at center, transparent 30%, hsl(var(--destructive) / 0.03) 100%)"
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
