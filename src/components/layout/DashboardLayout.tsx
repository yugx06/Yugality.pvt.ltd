import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

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
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pt-16 min-h-screen"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>

      {/* Emergency Mode Overlay */}
      {emergencyMode && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-t from-destructive/5 to-transparent" />
        </div>
      )}
    </div>
  );
};
