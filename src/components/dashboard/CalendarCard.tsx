import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const courtDates = [4, 8, 15, 22];
const emergencyDates = [6];

export const CalendarCard = () => {
  const [currentMonth] = useState(new Date(2026, 0, 1));
  
  const daysInMonth = 31;
  const firstDayOfMonth = 3; // Wednesday for January 2026
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDayClass = (day: number) => {
    if (emergencyDates.includes(day)) {
      return "bg-destructive text-destructive-foreground";
    }
    if (courtDates.includes(day)) {
      return "bg-primary text-primary-foreground";
    }
    if (day === 3) {
      return "ring-2 ring-primary text-primary";
    }
    return "hover:bg-muted/50";
  };

  return (
    <div className="yugality-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Calendar</h3>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-muted/50 rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[100px] text-center">
            January 2026
          </span>
          <button className="p-1 hover:bg-muted/50 rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
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
            transition={{ delay: index * 0.01 }}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              transition-all duration-200 cursor-pointer
              ${getDayClass(day)}
            `}
          >
            {day}
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Court Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Urgent</span>
        </div>
      </div>
    </div>
  );
};
