import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Scale } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const courtDates = [4, 8, 15, 22];
const emergencyDates = [6];

export const CalendarCard = () => {
  const { t } = useLanguage();
  const [currentMonth] = useState(new Date(2026, 0, 1));
  
  const daysInMonth = 31;
  const firstDayOfMonth = 3; // Wednesday for January 2026
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDayClass = (day: number) => {
    if (emergencyDates.includes(day)) {
      return "bg-destructive text-destructive-foreground shadow-sm";
    }
    if (courtDates.includes(day)) {
      return "bg-primary text-primary-foreground shadow-sm";
    }
    if (day === 3) {
      return "ring-2 ring-primary text-primary bg-primary/5";
    }
    return "hover:bg-muted";
  };

  return (
    <motion.div 
      className="yugality-card-interactive p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{t("Calendar")}</h3>
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </motion.button>
          <span className="text-sm font-medium text-foreground min-w-[100px] text-center">
            January 2026
          </span>
          <motion.button 
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {/* Day cells */}
        {days.map((day, index) => (
          <motion.button
            key={day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.008, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.15, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              transition-all duration-150 cursor-pointer font-medium
              ${getDayClass(day)}
            `}
          >
            {day}
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center" 
            whileHover={{ scale: 1.3 }}
          >
            <Scale className="w-3 h-3 text-primary" />
          </motion.div>
          <span className="text-xs text-muted-foreground">Court Date</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-destructive shadow-sm"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-muted-foreground">Urgent</span>
        </div>
      </div>
    </motion.div>
  );
};