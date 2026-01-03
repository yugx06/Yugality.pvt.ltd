import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IndianRupee, TrendingUp, Plus, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  { id: 1, client: "Patel Industries Pvt Ltd", amount: "₹2,50,000", status: "paid", date: "Jan 2, 2026", matter: "Corporate Litigation" },
  { id: 2, client: "Sharma & Associates", amount: "₹1,20,000", status: "pending", date: "Dec 28, 2025", matter: "Property Dispute" },
  { id: 3, client: "Kumar Family Trust", amount: "₹75,000", status: "overdue", date: "Dec 15, 2025", matter: "Family Settlement" },
  { id: 4, client: "Tech Solutions Inc", amount: "₹3,00,000", status: "paid", date: "Dec 10, 2025", matter: "IP Licensing" },
  { id: 5, client: "Singh Enterprises", amount: "₹50,000", status: "pending", date: "Dec 5, 2025", matter: "Contract Review" },
];

const Billing = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-tech" />;
      case "pending": return <Clock className="w-4 h-4 text-secondary" />;
      case "overdue": return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid": return "status-filed";
      case "pending": return "status-pending";
      case "overdue": return "status-urgent";
      default: return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage invoices and track payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button className="yugality-button-gold gap-2">
              <Plus className="w-4 h-4" /> New Invoice
            </Button>
          </div>
        </motion.div>

        {/* Revenue Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="yugality-card-gold p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue (FY)</p>
                <p className="text-2xl font-bold text-foreground">₹48,75,000</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-tech">
              <TrendingUp className="w-4 h-4" />
              <span>+18.5% from last year</span>
            </div>
          </div>

          <div className="yugality-card p-6">
            <p className="text-xs text-muted-foreground mb-2">Outstanding</p>
            <p className="text-2xl font-bold text-foreground">₹5,45,000</p>
            <p className="text-sm text-secondary mt-2">8 pending invoices</p>
          </div>

          <div className="yugality-card p-6">
            <p className="text-xs text-muted-foreground mb-2">Overdue</p>
            <p className="text-2xl font-bold text-destructive">₹75,000</p>
            <p className="text-sm text-destructive/70 mt-2">1 invoice overdue</p>
          </div>
        </motion.div>

        {/* Invoices Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="yugality-card overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">Recent Invoices</h3>
          </div>
          <table className="w-full">
            <thead className="bg-muted/20">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Client</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase hidden md:table-cell">Matter</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {invoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{invoice.client}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{invoice.matter}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{invoice.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${getStatusClass(invoice.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
