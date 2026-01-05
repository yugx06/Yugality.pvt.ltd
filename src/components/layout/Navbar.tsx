import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, AlertTriangle, Bot, Crown, Sparkles, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { AIAssistantDrawer } from "@/components/AIAssistantDrawer";

interface NavbarProps {
  sidebarWidth: number;
  emergencyMode: boolean;
  onEmergencyToggle: () => void;
}

export const Navbar = ({ sidebarWidth, emergencyMode, onEmergencyToggle }: NavbarProps) => {
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`
          fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b z-30
          flex items-center justify-between px-6 shadow-[var(--shadow-sm)]
          ${emergencyMode ? "border-destructive/50 bg-destructive/5" : "border-border/50"}
        `}
        style={{ left: sidebarWidth }}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <motion.div 
            animate={{ 
              scale: searchFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${searchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
            <Input
              type="text"
              placeholder="Search documents, cases, clients..."
              className={`pl-11 pr-12 bg-muted/30 border-border/50 h-11 text-sm placeholder:text-muted-foreground/50 
                         transition-all duration-300 rounded-xl
                         ${searchFocused 
                           ? 'border-primary/50 ring-2 ring-primary/10 bg-card shadow-[var(--shadow-gold-glow)]' 
                           : 'hover:border-primary/30'
                         }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded-md bg-muted/50 border border-border/50">
              <Command className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">K</span>
            </div>
          </motion.div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAIAssistant(true)}
              className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl h-10 px-3 group relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Bot className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              </motion.div>
              <span className="hidden sm:inline text-xs font-semibold">AI Assistant</span>
              <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>

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
                gap-2 transition-all duration-300 relative overflow-hidden rounded-xl h-10
                ${emergencyMode 
                  ? "bg-destructive/15 text-destructive hover:bg-destructive/25 shadow-[0_0_20px_hsl(var(--destructive)/0.2)]" 
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
              <span className="hidden sm:inline text-xs font-semibold relative z-10">
                {emergencyMode ? "EMERGENCY" : "Alert"}
              </span>
            </Button>
          </motion.div>

          {/* Divider */}
          <div className="h-6 w-px bg-border/50 mx-1" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Toggle */}
          <div className="hidden md:flex items-center bg-muted/30 rounded-xl border border-border/50 p-1">
            {["EN", "HI"].map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setLanguage(lang as "EN" | "HI")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 relative
                  ${language === lang 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {language === lang && (
                  <motion.div
                    layoutId="langIndicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--gradient-gold)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{lang}</span>
              </motion.button>
            ))}
          </div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl h-10 w-10"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card"
              />
            </Button>
          </motion.div>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="h-10 gap-2 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/30">
                    <Crown className="w-4 h-4 text-primary" />
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-xs font-semibold text-foreground">Advocate</span>
                    <span className="text-[10px] text-muted-foreground">Pro Plan</span>
                  </div>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border/50 shadow-[var(--shadow-elevated)] animate-fade-scale-in rounded-xl p-2">
              <div className="px-2 py-3 border-b border-border/50 mb-2">
                <p className="text-sm font-semibold text-foreground">Advocate Kumar</p>
                <p className="text-xs text-muted-foreground">advocate@yugality.com</p>
              </div>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-lg">
                <User className="w-4 h-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-lg">
                <Crown className="w-4 h-4 mr-2" /> Upgrade Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 my-2" />
              <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 rounded-lg">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </>
  );
};
