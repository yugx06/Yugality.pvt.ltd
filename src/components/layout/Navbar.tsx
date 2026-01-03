import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  sidebarWidth: number;
  emergencyMode: boolean;
  onEmergencyToggle: () => void;
}

export const Navbar = ({ sidebarWidth, emergencyMode, onEmergencyToggle }: NavbarProps) => {
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: sidebarWidth }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`
        fixed top-0 right-0 h-16 bg-card/90 backdrop-blur-xl border-b z-30
        flex items-center justify-between px-6 shadow-[var(--shadow-sm)]
        ${emergencyMode ? "border-destructive/40" : "border-border"}
      `}
      style={{ left: sidebarWidth }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <motion.div 
          animate={{ 
            scale: searchFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${searchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
          <Input
            type="text"
            placeholder="Search documents, cases, clients..."
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:bg-card
                       h-10 text-sm placeholder:text-muted-foreground/60 transition-all duration-200"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </motion.div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Emergency Mode Toggle */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onEmergencyToggle}
            className={`
              gap-2 transition-all duration-300 relative overflow-hidden
              ${emergencyMode 
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
                : "text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              }
            `}
          >
            <AnimatePresence>
              {emergencyMode && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 bg-destructive/10 animate-pulse-subtle"
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={emergencyMode ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, repeat: emergencyMode ? Infinity : 0, repeatDelay: 2 }}
            >
              <AlertTriangle className="w-4 h-4 relative z-10" />
            </motion.div>
            <span className="hidden sm:inline text-xs font-medium relative z-10">
              {emergencyMode ? "EMERGENCY" : "Alert"}
            </span>
          </Button>
        </motion.div>

        {/* Language Toggle */}
        <div className="flex items-center bg-muted/50 rounded-lg border border-border/50 p-1">
          {["EN", "HI"].map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setLanguage(lang as "EN" | "HI")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 relative
                ${language === lang 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {language === lang && (
                <motion.div
                  layoutId="langIndicator"
                  className="absolute inset-0 bg-primary rounded-md"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{lang}</span>
            </motion.button>
          ))}
        </div>

        {/* Notifications */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted">
            <Bell className="w-5 h-5" />
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"
            />
          </Button>
        </motion.div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                <User className="w-5 h-5" />
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-[var(--shadow-elevated)] animate-fade-scale-in">
            <DropdownMenuItem className="cursor-pointer hover:bg-muted focus:bg-muted">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-muted focus:bg-muted">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="cursor-pointer text-muted-foreground hover:bg-muted focus:bg-muted">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};