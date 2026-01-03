import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IndianRupee, TrendingUp, Plus, Download, Clock, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight, CreditCard, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

const invoices = [
  { id: 1, client: "Patel Industries Pvt Ltd", amount: "₹2,50,000", status: "paid", date: "Jan 2, 2026", matter: "Corporate Litigation" },
  { id: 2, client: "Sharma & Associates", amount: "₹1,20,000", status: "pending", date: "Dec 28, 2025", matter: "Property Dispute" },
  { id: 3, client: "Kumar Family Trust", amount: "₹75,000", status: "overdue", date: "Dec 15, 2025", matter: "Family Settlement" },
  { id: 4, client: "Tech Solutions Inc", amount: "₹3,00,000", status: "paid", date: "Dec 10, 2025", matter: "IP Licensing" },
  { id: 5, client: "Singh Enterprises", amount: "₹50,000", status: "pending", date: "Dec 5, 2025", matter: "Contract Review" },
];

const revenueData = [
  { month: "Jul", revenue: 320000, expenses: 80000 },
  { month: "Aug", revenue: 450000, expenses: 95000 },
  { month: "Sep", revenue: 380000, expenses: 70000 },
  { month: "Oct", revenue: 520000, expenses: 110000 },
  { month: "Nov", revenue: 480000, expenses: 90000 },
  { month: "Dec", revenue: 620000, expenses: 120000 },
  { month: "Jan", revenue: 550000, expenses: 100000 },
];

const paymentMethodData = [
  { method: "Bank Transfer", amount: 3200000, fill: "hsl(43, 55%, 48%)" },
  { method: "Cheque", amount: 1500000, fill: "hsl(215, 25%, 55%)" },
  { method: "Cash", amount: 175000, fill: "hsl(150, 50%, 45%)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const Billing = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-tech" />;
      case "pending": return <Clock className="w-4 h-4 text-tech" />;
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
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage invoices and track payments</p>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="yugality-button-gold gap-2">
                <Plus className="w-4 h-4" /> New Invoice
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Revenue Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div 
            className="yugality-card-gold p-6 md:col-span-2"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <IndianRupee className="w-7 h-7 text-primary" />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue (FY)</p>
                <motion.p 
                  className="text-3xl font-bold text-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  ₹48,75,000
                </motion.p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-tech">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <TrendingUp className="w-4 h-4" />
              </motion.div>
              <span>+18.5% from last year</span>
            </div>
          </motion.div>

          <motion.div 
            className="yugality-card-interactive p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <motion.div 
                className="w-8 h-8 rounded-lg bg-tech/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-4 h-4 text-tech" />
              </motion.div>
            </div>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ₹5,45,000
            </motion.p>
            <p className="text-sm text-tech mt-2">8 pending invoices</p>
          </motion.div>

          <motion.div 
            className="yugality-card-interactive p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Overdue</p>
              <motion.div 
                className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDownRight className="w-4 h-4 text-destructive" />
              </motion.div>
            </div>
            <motion.p 
              className="text-2xl font-bold text-destructive"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ₹75,000
            </motion.p>
            <p className="text-sm text-destructive/70 mt-2">1 invoice overdue</p>
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <motion.div variants={itemVariants} className="lg:col-span-2 yugality-card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <TrendingUp className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground">Last 7 months</p>
              </div>
            </div>
            
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(43, 55%, 48%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(43, 55%, 48%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 12 }}
                    tickFormatter={(value) => `₹${value/100000}L`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(220, 15%, 88%)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px -2px hsl(220 25% 20% / 0.1)'
                    }}
                    formatter={(value: number) => [`₹${(value/100000).toFixed(1)}L`, '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(43, 55%, 48%)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants} className="yugality-card-interactive p-6">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-tech/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <CreditCard className="w-5 h-5 text-tech" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
                <p className="text-xs text-muted-foreground">Distribution</p>
              </div>
            </div>
            
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMethodData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="method" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(220, 15%, 50%)', fontSize: 11 }}
                    width={85}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={20}>
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-4">
              {paymentMethodData.map((item, index) => (
                <motion.div 
                  key={item.method}
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.method}</span>
                  </div>
                  <span className="font-medium text-foreground">₹{(item.amount/100000).toFixed(1)}L</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Invoices Table */}
        <motion.div
          variants={itemVariants}
          className="yugality-card-interactive overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <Receipt className="w-5 h-5 text-foreground" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">Recent Invoices</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Client</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase hidden md:table-cell">Matter</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                    className="transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{invoice.client}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-sm text-muted-foreground">{invoice.matter}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{invoice.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <motion.span 
                        className={`${getStatusClass(invoice.status)} flex items-center gap-1.5 w-fit`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Billing;