import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Scale, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const caseDates = {
  4: { title: "Kumar vs State", time: "10:30 AM", court: "High Court, Delhi" },
  8: { title: "Property Dispute", time: "2:00 PM", court: "District Court" },
  15: { title: "Corporate Case", time: "11:00 AM", court: "Supreme Court" },
  22: { title: "Family Matter", time: "3:30 PM", court: "Family Court" },
};

const emergencyDates = {
  6: { title: "Urgent Hearing", time: "9:00 AM", court: "High Court, Delhi" },
};

export const CalendarCard = () => {
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
    setSelectedDate(null);
  };

  const getDayClass = (day: number) => {
    const isSelected = selectedDate === day;
    const today = new Date();
    const isToday = day === today.getDate() && 
                    currentMonth.getMonth() === today.getMonth() && 
                    currentMonth.getFullYear() === today.getFullYear();
    
    if (emergencyDates[day as keyof typeof emergencyDates]) {
      return `bg-red-100 text-red-700 font-semibold ${isSelected ? 'ring-2 ring-red-500' : 'hover:bg-red-200'}`;
    }
    if (caseDates[day as keyof typeof caseDates]) {
      return `bg-black text-white font-semibold ${isSelected ? 'ring-2 ring-black' : 'hover:bg-gray-900'}`;
    }
    if (isToday) {
      return "ring-2 ring-black text-black bg-gray-100 font-semibold";
    }
    return "hover:bg-gray-100 text-gray-700";
  };

  const getCaseInfo = (day: number) => {
    if (emergencyDates[day as keyof typeof emergencyDates]) {
      return emergencyDates[day as keyof typeof emergencyDates];
    }
    return caseDates[day as keyof typeof caseDates];
  };

  const handleDateClick = (day: number) => {
    if (caseDates[day as keyof typeof caseDates] || emergencyDates[day as keyof typeof emergencyDates]) {
      setSelectedDate(selectedDate === day ? null : day);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">{t("Calendar")}</h3>
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </motion.button>
          <span className="text-sm font-medium text-black min-w-[100px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <motion.button 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
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
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDateClick(day)}
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

      {/* Case details for selected date */}
      {selectedDate && getCaseInfo(selectedDate) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-black">{getCaseInfo(selectedDate)?.title}</h4>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-black text-white">
                {emergencyDates[selectedDate as keyof typeof emergencyDates] ? 'Urgent' : 'Scheduled'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{getCaseInfo(selectedDate)?.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{getCaseInfo(selectedDate)?.court}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-black border border-gray-700"></div>
          <span className="text-xs text-gray-600">Court Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
          <span className="text-xs text-gray-600">Urgent</span>
        </div>
      </div>
    </motion.div>
  );
};