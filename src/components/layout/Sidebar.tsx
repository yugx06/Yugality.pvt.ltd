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
  { icon: Users, label: "Profile", path: "/profile" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  };

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  return (
    <motion.aside
      initial={false}
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col shadow-[var(--shadow-card)]"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 overflow-hidden group">
          <motion.img 
            src={logo} 
            alt="Yugality" 
            className="w-10 h-10 rounded-lg object-cover shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold text-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-200"
              >
                Yugality.
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
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
                    relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ease-out
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                    ${!isActive && "hover:translate-x-1"}
                    group
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full 
                   flex items-center justify-center text-muted-foreground hover:text-foreground
                   hover:bg-muted transition-colors duration-200 shadow-[var(--shadow-card)]"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-3 h-3" />
        </motion.div>
      </motion.button>
    </motion.aside>
  );
};