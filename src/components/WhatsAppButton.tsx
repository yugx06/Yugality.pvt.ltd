import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919142402816?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20Yugality"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 group"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      
      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none"
        animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute left-full ml-3 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-xl pointer-events-none"
      >
        Chat with us on WhatsApp
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
      </motion.div>
    </motion.a>
  );
};