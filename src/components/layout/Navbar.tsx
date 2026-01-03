import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User, AlertTriangle, Globe } from "lucide-react";
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        fixed top-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-30
        flex items-center justify-between px-6
        ${emergencyMode ? "border-destructive/50" : ""}
      `}
      style={{ left: sidebarWidth }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className={`
          relative transition-all duration-300
          ${searchFocused ? "scale-[1.02]" : ""}
        `}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents, cases, clients..."
            className="pl-10 bg-card border-border/50 focus:border-primary/50 focus:ring-primary/20 
                       h-10 text-sm placeholder:text-muted-foreground/60"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Emergency Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onEmergencyToggle}
          className={`
            gap-2 transition-all duration-300
            ${emergencyMode 
              ? "bg-destructive/20 text-destructive hover:bg-destructive/30 animate-pulse-glow" 
              : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            }
          `}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-medium">
            {emergencyMode ? "EMERGENCY" : "Alert"}
          </span>
        </Button>

        {/* Language Toggle */}
        <div className="flex items-center bg-card rounded-lg border border-border/50 p-1">
          <button
            onClick={() => setLanguage("EN")}
            className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200
              ${language === "EN" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("HI")}
            className={`px-2 py-1 text-xs font-medium rounded transition-all duration-200
              ${language === "HI" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            HI
          </button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-muted-foreground">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};
