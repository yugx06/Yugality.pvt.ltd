import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bot,
  Users,
  BookOpen,
  Scale,
  Receipt,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CreditCard,
  UserCircle,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const menuItems = [
  { icon: LayoutDashboard, labelKey: "Dashboard", path: "/dashboard", roles: ["lawyer", "client", "admin"] },
  { 
    icon: FileText, 
    labelKey: "Documents", 
    path: "/documents", 
    roles: ["lawyer", "client", "admin"],
    subItems: [
      { labelKey: "Contracts", path: "/documents#contracts" },
      { labelKey: "Policy Templates", path: "/documents#policies" }
    ]
  },
  { icon: Calendar, labelKey: "Calendar", path: "/calendar", roles: ["lawyer", "client"] },
  { icon: Bot, labelKey: "AI Assistant", path: "/ai-assistant", roles: ["lawyer", "client"] },
  { icon: Users, labelKey: "Consultations", path: "/consultations", roles: ["lawyer", "client"] },
  { icon: BookOpen, labelKey: "Research", path: "/research", roles: ["lawyer", "client"] },
  { icon: Scale, labelKey: "Case Analysis", path: "/case-analysis", roles: ["lawyer"] },
  { icon: Receipt, labelKey: "Billing", path: "/billing", roles: ["lawyer", "client", "admin"] },
  { icon: UserPlus, labelKey: "Referrals", path: "/referrals", roles: ["lawyer"] },
  { 
    icon: Shield, 
    labelKey: "User Management", 
    path: "/users", 
    roles: ["admin"],
    subItems: [
      { labelKey: "All Lawyers", path: "/users/lawyers" },
      { labelKey: "All Clients", path: "/users/clients" },
      { labelKey: "User Stats", path: "/users/stats" }
    ]
  },
  { icon: UserCircle, labelKey: "Profile", path: "/profile", roles: ["lawyer", "client", "admin"] },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role || "client")
  );

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

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
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden group">
          <motion.img 
            src={logo} 
            alt="Yugality" 
            className="w-10 h-10 object-cover shadow-sm"
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
                YUGALITY
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {filteredMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '#');
            const isExpanded = expandedItems.includes(item.path);
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <motion.li 
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <div className="space-y-1">
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (hasSubItems && !isCollapsed) {
                        toggleExpanded(item.path);
                      }
                    }}
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
                          className="text-sm font-medium whitespace-nowrap overflow-hidden flex-1"
                        >
                          {t(item.labelKey)}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Expand/Collapse Icon */}
                    {hasSubItems && !isCollapsed && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </Link>

                  {/* Sub Items */}
                  {hasSubItems && !isCollapsed && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 space-y-1 overflow-hidden"
                        >
                          {item.subItems?.map((subItem) => {
                            const subIsActive = location.hash === subItem.path.split('#')[1] ? `#${location.hash.split('#')[1]}` === subItem.path.split('#')[1] : false;
                            return (
                              <motion.li
                                key={subItem.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className={`
                                    flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                                    ${subIsActive
                                      ? "bg-primary/5 text-primary font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }
                                  `}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                  {t(subItem.labelKey)}
                                </Link>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </div>
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