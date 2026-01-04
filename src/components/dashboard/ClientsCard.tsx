import { motion } from "framer-motion";
import { Users, Phone, Mail, MapPin, MoreVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const clients = [
  { id: 1, name: "Patel Industries Pvt Ltd", type: "Corporate", cases: 3, email: "legal@patelindustries.com", phone: "+91 98765 43210", starred: true },
  { id: 2, name: "Mr. Rajesh Sharma", type: "Individual", cases: 1, email: "rajesh.sharma@email.com", phone: "+91 98765 43211", starred: true },
  { id: 3, name: "Singh Family", type: "Family", cases: 2, email: "singh.family@email.com", phone: "+91 98765 43212", starred: false },
  { id: 4, name: "Tech Solutions Inc", type: "Corporate", cases: 1, email: "legal@techsolutions.com", phone: "+91 98765 43213", starred: false },
];

export const ClientsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="yugality-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
          >
            <Users className="w-5 h-5 text-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground">Key Clients</h3>
        </div>
        <motion.button
          whileHover={{ x: 3 }}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all
        </motion.button>
      </div>

      <div className="space-y-3">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + index * 0.06 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary"
                >
                  {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {client.name}
                    </h4>
                    {client.starred && (
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{client.type} • {client.cases} active case{client.cases > 1 ? 's' : ''}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${client.phone}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${client.email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-tech transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};