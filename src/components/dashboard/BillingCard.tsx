import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const billingStats = {
  totalRevenue: "₹12,45,000",
  pending: "₹3,20,000",
  collected: "₹9,25,000",
  growth: "+12.5%",
};

const recentInvoices = [
  { id: 1, client: "Patel Industries", amount: "₹75,000", status: "paid", date: "Jan 2" },
  { id: 2, client: "Sharma & Associates", amount: "₹1,20,000", status: "pending", date: "Dec 28" },
  { id: 3, client: "Kumar Family Trust", amount: "₹45,000", status: "overdue", date: "Dec 15" },
];

export const BillingCard = () => {
  return (
    <motion.div 
      className="yugality-card-interactive p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <IndianRupee className="w-5 h-5 text-primary" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Billing Overview</h3>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="p-4 rounded-lg bg-primary/5 border border-primary/20"
          whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.4)" }}
        >
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <motion.p 
            className="text-xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {billingStats.totalRevenue}
          </motion.p>
          <motion.div 
            className="flex items-center gap-1 mt-1 text-xs text-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TrendingUp className="w-3 h-3" />
            {billingStats.growth}
          </motion.div>
        </motion.div>
        <div className="space-y-3">
          <motion.div 
            className="p-3 rounded-lg bg-muted/40 border border-border/50 hover:border-border transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs text-muted-foreground">Collected</p>
            <p className="text-sm font-semibold text-foreground">{billingStats.collected}</p>
          </motion.div>
          <motion.div 
            className="p-3 rounded-lg bg-muted/40 border border-border/50 hover:border-border transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-sm font-semibold text-foreground">{billingStats.pending}</p>
          </motion.div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Recent Invoices
        </p>
        <div className="space-y-2">
          {recentInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              whileHover={{ x: 4, backgroundColor: "hsl(var(--muted) / 0.5)" }}
              className="flex items-center justify-between p-3 rounded-lg
                         transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center
                    ${invoice.status === "paid" ? "bg-primary/10" : 
                      invoice.status === "pending" ? "bg-tech/10" : "bg-destructive/10"}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {invoice.status === "paid" ? (
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  ) : (
                    <ArrowDownRight className={`w-4 h-4 
                      ${invoice.status === "overdue" ? "text-destructive" : "text-tech"}`} />
                  )}
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {invoice.client}
                  </p>
                  <p className="text-xs text-muted-foreground">{invoice.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{invoice.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full
                  ${invoice.status === "paid" ? "status-filed" : 
                    invoice.status === "pending" ? "status-pending" : "status-urgent"}`}>
                  {invoice.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};