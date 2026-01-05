import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bot,
  Users,
  BookOpen,
  Scale,
  Receipt,
  Share2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Bot, label: "AI Assistant", path: "/ai-assistant" },
  { icon: Users, label: "Consultations", path: "/consultations" },
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Scale, label: "Case Analysis", path: "/case-analysis" },
  { icon: Receipt, label: "Billing", path: "/billing" },
  { icon: Share2, label: "Referrals", path: "/referrals" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  return (
    <motion.aside
      initial={false}
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-sidebar z-40 flex flex-col shadow-[var(--shadow-elevated)] overflow-hidden"
    >
      {/* Royal decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none royal-pattern" />

      {/* Logo Section */}
      <div className="relative h-20 flex items-center justify-between px-4 border-b border-sidebar-border/50">
        <Link to="/" className="flex items-center gap-3 overflow-hidden group">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.img 
              src={logo} 
              alt="Yugality" 
              className="w-11 h-11 rounded-xl object-cover shadow-lg ring-2 ring-primary/30"
            />
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-2.5 h-2.5 text-primary-foreground" />
            </motion.div>
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-xl font-royal font-bold text-gradient-gold tracking-wide">
                  Yugality
                </span>
                <span className="text-[10px] text-sidebar-foreground/60 tracking-widest uppercase">
                  Legal Excellence
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-3 font-semibold"
            >
              Navigation
            </motion.p>
          )}
        </AnimatePresence>
        
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.li 
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <Link
                  to={item.path}
                  className={`
                    relative flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all duration-300 ease-out
                    ${isActive 
                      ? "bg-primary/15 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }
                    group overflow-hidden
                  `}
                >
                  {/* Active glow effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent)"
                      }}
                    />
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      style={{ background: "var(--gradient-gold)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative z-10"
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      isActive 
                        ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" 
                        : "group-hover:text-primary"
                    }`} />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`text-sm font-medium whitespace-nowrap overflow-hidden relative z-10 ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.05), transparent)"
                    }}
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Badge / Footer */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-sidebar-border/50"
          >
            <motion.div 
              className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <Crown className="w-full h-full text-primary" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Pro Features</span>
                </div>
                <p className="text-xs text-sidebar-foreground/60 mb-3">
                  Unlock advanced AI and analytics
                </p>
                <button className="w-full py-2 rounded-lg text-xs font-semibold yugality-button-gold">
                  Upgrade Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -right-3.5 top-24 w-7 h-7 bg-card border-2 border-primary/30 rounded-full 
                   flex items-center justify-center text-primary hover:text-primary-foreground
                   hover:bg-primary transition-all duration-300 shadow-lg z-50"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </motion.aside>
  );
};
