import { motion } from "framer-motion";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-16 h-8 rounded-full bg-gradient-to-r from-muted/80 to-muted border border-border/50 p-1 transition-all duration-300 group hover:border-primary/30 hover:shadow-[var(--shadow-gold-glow)]"
    >
      {/* Track glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark 
            ? "radial-gradient(circle at 80%, hsl(var(--primary) / 0.15), transparent 60%)"
            : "radial-gradient(circle at 20%, hsl(var(--primary) / 0.15), transparent 60%)"
        }}
      />
      
      {/* Icons on track */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun className={`w-3.5 h-3.5 transition-colors duration-300 ${isDark ? 'text-muted-foreground/30' : 'text-primary'}`} />
        <Moon className={`w-3.5 h-3.5 transition-colors duration-300 ${isDark ? 'text-primary' : 'text-muted-foreground/30'}`} />
      </div>

      {/* Sliding thumb */}
      <motion.div
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10"
        style={{ background: "var(--gradient-gold)" }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-primary-foreground" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-primary-foreground" />
          )}
        </motion.div>
        
        {/* Thumb glow */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ 
            boxShadow: [
              "0 0 10px hsl(var(--primary) / 0.3)",
              "0 0 20px hsl(var(--primary) / 0.5)",
              "0 0 10px hsl(var(--primary) / 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Sparkle decoration */}
      <motion.div
        className="absolute -top-0.5 -right-0.5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-2.5 h-2.5 text-primary" />
      </motion.div>
    </motion.button>
  );
};
